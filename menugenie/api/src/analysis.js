// Model-calling core. Ported from the deployed v2.1.0 Worker with the logic
// unchanged — only the `tier` gate moved out (see index.js), because in v2
// `tier` was read straight from the request body with no payment check.

import { SYSTEM_PROMPT, SYSTEM_PROMPT_FREE } from './prompts.js';

const LANG_NAMES = { fr: 'French', de: 'German', it: 'Italian', es: 'Spanish', nl: 'Dutch', pt: 'Portuguese' };

const FILE_INSTRUCTION = `CRITICAL INSTRUCTIONS:

PHASE 1 — EXTRACTION (you MUST do this first):
Carefully read every menu item and price visible in this document. List them internally before analyzing.
If you cannot read the text clearly, state what you cannot read.
Do NOT guess or infer items that are not visible in the document.

PHASE 2 — ANALYSIS:
Using ONLY the items you extracted in Phase 1, perform the full Star/Plowhorse/Puzzle/Dog matrix analysis.

If you cannot read ANY menu items from this document (blurry image, corrupted PDF, not a menu), respond with ONLY this JSON:
{"error": "Could not extract menu items from the uploaded document. Please try uploading a clearer image or PDF."}

ABSOLUTE RULE: Every single item in your "items" array MUST be literally visible in the uploaded document. Do NOT invent items. Do NOT use generic restaurant items from your training data.`;

export function detectCuisine(text) {
  const t = (text || '').toLowerCase();
  if (/pasta|risotto|pizza|tiramisu|gnocchi|carbonara|marinara|bruschetta|parmigiana/.test(t)) return 'Italian';
  if (/taco|burrito|enchilada|guacamole|quesadilla|carnitas|fajita|chimichanga/.test(t)) return 'Mexican';
  if (/sushi|ramen|udon|miso|teriyaki|tempura|edamame|tonkotsu|yakitori/.test(t)) return 'Japanese';
  if (/pad thai|pho|banh mi|tikka|masala|korma|curry|satay|kimchi|bibimbap/.test(t)) return 'Asian';
  if (/falafel|hummus|shawarma|pita|tahini|kebab|mezze|baba ganoush/.test(t)) return 'Middle Eastern';
  if (/fish.*chip|bangers|roast|sunday|scotch egg|battered|mushy pea/.test(t)) return 'British';
  if (/burger|wings|bbq|nachos|ribs|pulled pork|sliders|mac.*cheese/.test(t)) return 'American';
  if (/croissant|crêpe|escargot|coq au vin|steak frites|boeuf|confit/.test(t)) return 'French';
  if (/dim sum|char siu|dumpling|fried rice|kung pao|peking|wontons/.test(t)) return 'Chinese';
  return 'restaurant';
}

function extractPrices(text) {
  const hits = text.match(/(?:[\w &'-]{2,30}\s+)(?:\$|£|€)\d+(?:\.\d{2})?/g) || [];
  return hits.slice(0, 10).join('; ');
}

export async function fetchCompetitorData(cuisineType, location, env) {
  if (!env.SERPER_API_KEY || !location) return null;
  const isUK = /\b(uk|england|scotland|wales|london|manchester|birmingham|bristol|leeds|glasgow|edinburgh|liverpool)\b/i.test(location);
  try {
    const res = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: { 'X-API-KEY': env.SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: `${cuisineType} restaurant menu prices ${location}`, num: 8, gl: isUK ? 'gb' : 'us' }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const competitors = [];
    for (const r of (data.organic || []).slice(0, 7)) {
      const prices = extractPrices(`${r.title || ''} ${r.snippet || ''}`);
      if (!prices) continue;
      const name = (r.title || '').replace(/\s*[-|:–]\s*(Menu|Order|Delivery|Prices|Online|Restaurant|Reviews).*$/i, '').trim();
      if (name.length > 2) competitors.push({ name, prices });
    }
    return competitors.length >= 2 ? competitors : null;
  } catch {
    return null;
  }
}

function buildCompetitorContext(competitors, cuisineType, location) {
  const lines = [
    `## REAL LOCAL COMPETITOR DATA — ${location}`, '',
    `Retrieved from live online menus of ${cuisineType} restaurants in ${location}. USE THIS DATA to benchmark the user's prices — name specific restaurants when you find gaps.`, '',
  ];
  for (const c of competitors) lines.push(`**${c.name}**: ${c.prices}`);
  const names = competitors.slice(0, 2).map((c) => c.name).join(', ');
  lines.push('',
    `When you find a pricing gap, reference actual competitor names: "Nearby restaurants like ${names} charge $X for [category] — your [item] at $Y is underpriced vs. the local market." Only cite prices from the data above. For categories with no data, use industry benchmarks.`, '',
    `Add a "competitorComparison" field to your JSON output (in addition to "marketGaps"). See schema below.`);
  return lines.join('\n');
}

function parseDataUrl(dataUrl) {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/s);
  return match ? { mediaType: match[1], base64: match[2] } : null;
}

function fileBlocksAnthropic(mediaType, base64) {
  const blocks = [];
  if (mediaType === 'application/pdf') {
    blocks.push({ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: base64 } });
  } else if (mediaType.startsWith('image/')) {
    blocks.push({ type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 } });
  } else {
    throw new Error('Unsupported file type: ' + mediaType);
  }
  blocks.push({ type: 'text', text: FILE_INSTRUCTION });
  return blocks;
}

function fileBlocksOpenAI(mediaType, base64) {
  if (mediaType !== 'application/pdf' && !mediaType.startsWith('image/')) {
    throw new Error('Unsupported file type: ' + mediaType);
  }
  return [
    { type: 'image_url', image_url: { url: `data:${mediaType};base64,${base64}`, detail: 'high' } },
    { type: 'text', text: FILE_INSTRUCTION },
  ];
}

export async function fetchMenuFromUrl(url) {
  const parsed = new URL(url);
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') throw new Error('Only http/https URLs are supported');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const resp = await fetch(url, { signal: controller.signal, headers: { 'User-Agent': 'MenuGenie/3.0' }, redirect: 'follow' });
    if (!resp.ok) throw new Error(`Failed to fetch URL (HTTP ${resp.status})`);
    const contentType = (resp.headers.get('content-type') || '').toLowerCase();
    const urlPath = parsed.pathname.toLowerCase();
    if (contentType.includes('application/pdf') || (!contentType.includes('text/') && !contentType.includes('image/') && urlPath.endsWith('.pdf'))) {
      const buf = await resp.arrayBuffer();
      if (buf.byteLength > 10 * 1024 * 1024) throw new Error('PDF too large (max 10MB)');
      return { type: 'file', mediaType: 'application/pdf', base64: bufferToBase64(buf) };
    }
    if (contentType.includes('image/')) {
      const buf = await resp.arrayBuffer();
      if (buf.byteLength > 5 * 1024 * 1024) throw new Error('Image too large (max 5MB)');
      return { type: 'file', mediaType: contentType.split(';')[0].trim(), base64: bufferToBase64(buf) };
    }
    const text = await resp.text();
    if (text.length > 200000) throw new Error('Page too large to analyze');
    return { type: 'html', text };
  } finally {
    clearTimeout(timeout);
  }
}

function bufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

export function repairTruncatedJSON(text) {
  let repaired = text;
  const lastCompleteItem = repaired.lastIndexOf('}');
  if (lastCompleteItem > 0) repaired = repaired.substring(0, lastCompleteItem + 1);

  let openBraces = 0, openBrackets = 0, inString = false, escaped = false;
  for (let i = 0; i < repaired.length; i++) {
    const c = repaired[i];
    if (escaped) { escaped = false; continue; }
    if (c === '\\') { escaped = true; continue; }
    if (c === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (c === '{') openBraces++;
    if (c === '}') openBraces--;
    if (c === '[') openBrackets++;
    if (c === ']') openBrackets--;
  }
  while (openBrackets-- > 0) repaired += ']';
  while (openBraces-- > 0) repaired += '}';

  try {
    const parsed = JSON.parse(repaired);
    parsed._truncated = true;
    const itemCount = parsed.items?.length || 0;
    const cats = parsed.items?.reduce((a, i) => { a[i.category] = (a[i.category] || 0) + 1; return a; }, {}) || {};
    if (!parsed.summary) parsed.summary = `We analyzed ${itemCount} key items on this menu: ${cats.Star || 0} Stars, ${cats.Plowhorse || 0} Plowhorses, ${cats.Puzzle || 0} Puzzles, ${cats.Dog || 0} Dogs.`;
    if (!parsed.lift) parsed.lift = 15;
    if (!parsed.actions) parsed.actions = parsed.items?.slice(0, 5).filter((i) => i.tips?.[0]).map((i) => `${i.name}: ${i.tips[0]}`) || [];
    if (!parsed.psychTips) parsed.psychTips = [];
    if (!parsed.marketGaps) parsed.marketGaps = [];
    if (!parsed.competitorComparison) parsed.competitorComparison = null;
    return parsed;
  } catch {
    throw new Error('Could not parse or repair the analysis response');
  }
}

/**
 * Run one analysis. `tier` here is ALREADY authorised by the caller — this
 * function trusts it. index.js is the only place allowed to decide it.
 */
export async function runAnalysis(env, { menuText, menuFile, menuUrl, tier, location = '', lang = 'en' }) {
  let fetchedData = null;
  if (menuUrl) fetchedData = await fetchMenuFromUrl(menuUrl);

  let activePrompt = tier === 'pro' ? SYSTEM_PROMPT : SYSTEM_PROMPT_FREE;
  if (lang && LANG_NAMES[lang]) {
    activePrompt = `IMPORTANT: Respond entirely in ${LANG_NAMES[lang]}. All field values in the JSON must be in ${LANG_NAMES[lang]}, including summaries, tips, actions, and recommendations. Keep field names (keys) in English.\n\n` + activePrompt;
  }

  if (tier === 'pro' && location.trim()) {
    const competitors = await fetchCompetitorData(detectCuisine(menuText || ''), location.trim(), env);
    if (competitors && competitors.length >= 2) {
      activePrompt = activePrompt.replace(
        '### Rule 5.5: MARKET RATE BENCHMARKING',
        buildCompetitorContext(competitors, detectCuisine(menuText || ''), location.trim()) +
          '\n\n### Rule 5.5: MARKET RATE BENCHMARKING (use as fallback for categories not covered by the local data above)'
      );
    }
  }

  const isPDF = (menuFile && menuFile.startsWith('data:application/pdf')) || (fetchedData && fetchedData.mediaType === 'application/pdf');
  const useOpenAI = !!env.OPENAI_API_KEY && !isPDF;
  const maxTokens = tier === 'pro' ? 10000 : 4000;

  let content, stopReason, modelUsed;

  if (useOpenAI) {
    modelUsed = 'gpt-4o';
    let userContent;
    if (menuText) userContent = `Analyze this restaurant menu:\n\n${menuText}`;
    else if (menuFile) { const p = parseDataUrl(menuFile); if (!p) throw new Error('Invalid file data'); userContent = fileBlocksOpenAI(p.mediaType, p.base64); }
    else if (fetchedData?.type === 'html') userContent = `The following is the HTML source of a restaurant menu page. Extract ALL menu items with their prices from this HTML, then analyze the menu:\n\n${fetchedData.text}`;
    else if (fetchedData) userContent = fileBlocksOpenAI(fetchedData.mediaType, fetchedData.base64);
    else throw new Error('No valid input provided');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: modelUsed, max_tokens: maxTokens, response_format: { type: 'json_object' },
        messages: [{ role: 'system', content: activePrompt }, { role: 'user', content: userContent }],
      }),
    });
    if (!response.ok) throw new Error(`OpenAI ${response.status}: ${await response.text()}`);
    const data = await response.json();
    content = data.choices[0].message.content;
    stopReason = data.choices[0].finish_reason === 'length' ? 'max_tokens' : data.choices[0].finish_reason;
  } else {
    modelUsed = tier === 'pro' ? 'claude-sonnet-4-6' : 'claude-haiku-4-5-20251001';
    let userContent;
    if (menuText) userContent = `Analyze this restaurant menu:\n\n${menuText}`;
    else if (menuFile) { const p = parseDataUrl(menuFile); if (!p) throw new Error('Invalid file data'); userContent = fileBlocksAnthropic(p.mediaType, p.base64); }
    else if (fetchedData?.type === 'html') userContent = `The following is the HTML source of a restaurant menu page. Extract ALL menu items with their prices from this HTML, then analyze the menu:\n\n${fetchedData.text}`;
    else if (fetchedData) userContent = fileBlocksAnthropic(fetchedData.mediaType, fetchedData.base64);
    else throw new Error('No valid input provided');

    const reqHeaders = { 'Content-Type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' };
    if (isPDF) reqHeaders['anthropic-beta'] = 'pdfs-2024-09-25';

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST', headers: reqHeaders,
      body: JSON.stringify({ model: modelUsed, max_tokens: maxTokens, system: activePrompt, messages: [{ role: 'user', content: userContent }] }),
    });
    if (!response.ok) throw new Error(`Anthropic ${response.status}: ${await response.text()}`);
    const data = await response.json();
    content = data.content[0].text;
    stopReason = data.stop_reason;
  }

  content = content.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/, '');
  let analysis;
  try {
    analysis = JSON.parse(content);
  } catch (parseErr) {
    if (stopReason === 'max_tokens' || /Unterminated|Expected/.test(parseErr.message)) analysis = repairTruncatedJSON(content);
    else throw parseErr;
  }

  if (analysis.error && !analysis.items) {
    const e = new Error(analysis.error);
    e.userFacing = true;
    throw e;
  }

  const teaserItems = Array.isArray(analysis.teaserItems)
    ? analysis.teaserItems.filter((t) => t && typeof t.name === 'string' && typeof t.category === 'string').map((t) => ({ name: t.name, category: t.category }))
    : [];
  analysis.teaserItems = teaserItems;
  analysis.total_items_on_menu = (analysis.items?.length || 0) + teaserItems.length;
  analysis._meta = { version: '3.0.0', model: modelUsed, tier, timestamp: new Date().toISOString() };
  return analysis;
}
