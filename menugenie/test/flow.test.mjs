// End-to-end wiring test for the purchase → report flow.
// Network calls (OpenAI, Gumroad API, Resend) are stubbed; everything else —
// routing, job persistence, url_params threading, the pro gate, idempotency —
// is the real code from src/.

import worker from '../api/src/index.js';

let pass = 0, fail = 0;
const ok = (name, cond, extra = '') => {
  if (cond) { pass++; console.log(`  PASS  ${name}`); }
  else { fail++; console.log(`  FAIL  ${name}${extra ? '  → ' + extra : ''}`); }
};

// ── fake KV ───────────────────────────────────────────────────────────────
function fakeKV() {
  const m = new Map();
  return {
    _m: m,
    async get(k) { return m.has(k) ? m.get(k) : null; },
    async put(k, v) { m.set(k, v); },
    async delete(k) { m.delete(k); },
  };
}

// ── fake upstreams ────────────────────────────────────────────────────────
const calls = { openai: 0, resend: 0, gumroad: 0 };
const PRO_SHAPE = {
  items: [
    { name: 'Dry-Aged Ribeye', price: 34.0, category: 'Puzzle', priceTip: 'Hold at $34.', tips: ['Bundle with sides.'] },
    { name: 'Truffle Fries', price: 8.5, category: 'Star', priceTip: 'Raise to $9.50.', tips: ['Feature top-left.'] },
  ],
  summary: 'Analysed 2 items: 1 Star, 1 Puzzle.',
  lift: 14,
  actions: ['Raise Truffle Fries $8.50 → $9.50.'],
  psychTips: ['Anchor with the $34 Ribeye listed first.'],
  marketGaps: [{ category: 'Sides', yourAvg: 8.5, marketRange: '$9–$13', gap: -1.5, verdict: 'Underpriced', action: 'Raise to $9.50.' }],
};
const FREE_SHAPE = {
  items: [{ name: 'Truffle Fries', price: 8.5, category: 'Star', priceTip: 'Raise to $9.50.', tips: ['Feature it.'] }],
  summary: 'Preview covers 1 of 2 items.',
  lift: 12,
  actions: ['Raise Truffle Fries.'],
  psychTips: ['Anchor high.'],
  teaserItems: [{ name: 'Dry-Aged Ribeye', category: 'Puzzle' }],
};

globalThis.fetch = async (url, init) => {
  const u = String(url);
  if (u.includes('api.openai.com')) {
    calls.openai++;
    const body = JSON.parse(init.body);
    // The system prompt differs between tiers — detect which one was used.
    const isPro = body.messages[0].content.includes('MenuGenie v2, an elite');
    return new Response(JSON.stringify({
      choices: [{ message: { content: JSON.stringify(isPro ? PRO_SHAPE : FREE_SHAPE) }, finish_reason: 'stop' }],
    }), { status: 200 });
  }
  if (u.includes('api.gumroad.com')) {
    calls.gumroad++;
    return new Response(JSON.stringify({
      success: true,
      sale: { id: 'SALE123', email: 'buyer@example.com', product_id: 'PROD1', refunded: false, disputed: false },
    }), { status: 200 });
  }
  if (u.includes('api.resend.com')) {
    calls.resend++;
    return new Response(JSON.stringify({ id: 'email_1' }), { status: 200 });
  }
  throw new Error('unexpected fetch: ' + u);
};

// ── env + waitUntil that we can await ─────────────────────────────────────
const env = {
  JOBS: fakeKV(),
  RATE_LIMIT_KV: fakeKV(),
  OPENAI_API_KEY: 'sk-test',
  GUMROAD_ACCESS_TOKEN: 'gr-test',
  RESEND_API_KEY: 're-test',
  GUMROAD_PRODUCT_ID: 'PROD1',
  PUBLIC_BASE_URL: 'https://menu-genie.com',
};
const pending = [];
const ctx = { waitUntil: (p) => pending.push(p) };
const settle = async () => { while (pending.length) await pending.shift(); };

const MENU = `THE BUTCHER
Dry-Aged Ribeye 300g  $34.00
Truffle Fries         $8.50`;

console.log('\n=== 1. Free analysis creates a job and returns a checkout URL ===');
let res = await worker.fetch(
  new Request('https://api.test/analyze', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://menu-genie.com' },
    body: JSON.stringify({ menuText: MENU }),
  }), env, ctx);
let body = await res.json();

ok('200 OK', res.status === 200, `got ${res.status}`);
ok('returns job_id', typeof body.job_id === 'string' && body.job_id.length > 10);
ok('returns checkout_url', typeof body.checkout_url === 'string');
ok('checkout_url carries job_id', body.checkout_url.includes(`job_id=${body.job_id}`), body.checkout_url);
ok('free tier shape (has teaserItems)', Array.isArray(body.teaserItems) && body.teaserItems.length > 0);
ok('job persisted to KV', env.JOBS._m.has(`job:${body.job_id}`));
const jobId = body.job_id;

console.log('\n=== 2. THE PRO GATE: tier:"pro" in the body must be ignored ===');
res = await worker.fetch(
  new Request('https://api.test/analyze', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ menuText: MENU, tier: 'pro' }),
  }), env, ctx);
const sneaky = await res.json();
ok('still returns free shape', Array.isArray(sneaky.teaserItems) && sneaky.teaserItems.length > 0,
   'client-asserted tier:"pro" was honoured — the $49 hole is still open');
ok('did not return pro marketGaps', !sneaky.marketGaps || sneaky.marketGaps.length === 0);

console.log('\n=== 3. Report is not available before payment ===');
res = await worker.fetch(new Request(`https://api.test/api/report?job=${jobId}`), env, ctx);
body = await res.json();
ok('status is "free"', body.status === 'free', body.status);
ok('paid === false', body.paid === false);
ok('no analysis leaked', body.analysis === null);

console.log('\n=== 4. Gumroad ping binds the sale to the job and generates ===');
const form = new URLSearchParams({
  sale_id: 'SALE123', product_id: 'PROD1', product_permalink: 'menugenie-pro',
  email: 'buyer@example.com', price: '4900', currency: 'usd',
  'url_params[job_id]': jobId,          // ← the thread that was missing in v2
});
res = await worker.fetch(
  new Request('https://api.test/gumroad/ping', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: form.toString(),
  }), env, ctx);
ok('ping returns 200 immediately', res.status === 200, `got ${res.status}`);
ok('ping verified sale against Gumroad API', calls.gumroad === 1, `gumroad calls: ${calls.gumroad}`);
await settle();

console.log('\n=== 5. Report is ready, pro-shaped, and emailed ===');
res = await worker.fetch(new Request(`https://api.test/api/report?job=${jobId}`), env, ctx);
body = await res.json();
ok('status is "ready"', body.status === 'ready', body.status + (body.error ? ' err=' + body.error : ''));
ok('paid === true', body.paid === true);
ok('full item list returned', body.analysis?.items?.length === 2);
ok('pro-only marketGaps present', body.analysis?.marketGaps?.length > 0);
ok('report emailed', calls.resend === 1, `resend calls: ${calls.resend}`);
ok('marked delivered', body.delivered === true);

console.log('\n=== 6. Report page renders real HTML (not blank) ===');
res = await worker.fetch(new Request(`https://api.test/report?job=${jobId}`), env, ctx);
const html = await res.text();
ok('200 OK', res.status === 200);
ok('content-type html', (res.headers.get('Content-Type') || '').includes('text/html'));
ok('contains the actual item name', html.includes('Dry-Aged Ribeye'));
ok('contains the lift figure', html.includes('14%'));
ok('contains the order id', html.includes('SALE123'));
ok('is not blank', html.length > 2000, `${html.length} bytes`);

console.log('\n=== 7. Lookup by sale_id (the __sale_info__ redirect path) ===');
res = await worker.fetch(new Request('https://api.test/api/report?sale_id=SALE123'), env, ctx);
body = await res.json();
ok('found by sale_id', body.status === 'ready' && body.job_id === jobId);

console.log('\n=== 8. Idempotency: Gumroad retries the same ping ===');
const before = { openai: calls.openai, resend: calls.resend };
for (let i = 0; i < 3; i++) {
  res = await worker.fetch(new Request('https://api.test/gumroad/ping', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: form.toString(),
  }), env, ctx);
  await settle();
  ok(`retry ${i + 1} returns 200`, res.status === 200);
}
ok('no duplicate analysis', calls.openai === before.openai, `${calls.openai - before.openai} extra OpenAI calls`);
ok('no duplicate email', calls.resend === before.resend, `${calls.resend - before.resend} extra emails`);

console.log('\n=== 9. Forged ping (unknown sale) is rejected ===');
const prevFetch = globalThis.fetch;
globalThis.fetch = async (url, init) => {
  if (String(url).includes('api.gumroad.com')) {
    calls.gumroad++;
    return new Response(JSON.stringify({ success: false, message: 'The sale was not found.' }), { status: 404 });
  }
  return prevFetch(url, init);
};
const gumroadBefore = calls.gumroad;
const forged = new URLSearchParams({ sale_id: 'FORGED999', 'url_params[job_id]': jobId });
res = await worker.fetch(new Request('https://api.test/gumroad/ping', {
  method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: forged.toString(),
}), env, ctx);
await settle();
ok('returns 200 (no Gumroad retry storm)', res.status === 200);
ok('forged sale not bound', !env.JOBS._m.has('sale:FORGED999'));
ok('rejected because Gumroad said 404, not because the stub crashed',
   calls.gumroad === gumroadBefore + 1, `gumroad calls delta ${calls.gumroad - gumroadBefore}`);
ok('no report generated for forged sale', calls.openai === before.openai);

console.log('\n=== 10. Orphan purchase (bought with no job_id) ===');
const orphan = new URLSearchParams({ sale_id: 'SALE_ORPHAN', product_id: 'PROD1', email: 'lost@example.com' });
globalThis.fetch = async (url, init) => {
  const u = String(url);
  if (u.includes('api.gumroad.com')) return new Response(JSON.stringify({ success: true, sale: { id: 'SALE_ORPHAN', email: 'lost@example.com', product_id: 'PROD1' } }), { status: 200 });
  if (u.includes('api.resend.com')) { calls.resend++; return new Response('{}', { status: 200 }); }
  throw new Error('unexpected ' + u);
};
res = await worker.fetch(new Request('https://api.test/gumroad/ping', {
  method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: orphan.toString(),
}), env, ctx);
await settle();
ok('returns 200', res.status === 200);
const orphanJobId = await env.JOBS._m.get('sale:SALE_ORPHAN');
const orphanJob = JSON.parse(env.JOBS._m.get(`job:${orphanJobId}`));
ok('job created in needs_menu state', orphanJob.status === 'needs_menu', orphanJob.status);
ok('buyer emailed rather than ignored', calls.resend > before.resend);

console.log(`\n${'='.repeat(58)}\n  ${pass} passed, ${fail} failed\n${'='.repeat(58)}\n`);
process.exit(fail ? 1 : 0);
