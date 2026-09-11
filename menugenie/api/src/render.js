// Renders a pro analysis into standalone HTML. Used for the /report page, the
// emailed copy, and (when BROWSER is bound) the PDF.

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const CAT = {
  Star:      { emoji: '⭐', color: '#2D8B4E', label: 'Star',      blurb: 'Popular + high margin — protect and feature' },
  Plowhorse: { emoji: '🐴', color: '#D97706', label: 'Plowhorse', blurb: 'Popular + thin margin — reprice or engineer' },
  Puzzle:    { emoji: '🧩', color: '#7C3AED', label: 'Puzzle',    blurb: 'High margin + overlooked — promote or bundle' },
  Dog:       { emoji: '🐕', color: '#DC2626', label: 'Dog',       blurb: 'Low margin + unpopular — cut or reinvent' },
};

const money = (n) => (typeof n === 'number' ? n.toFixed(2) : esc(n));

export function renderReportHTML(analysis, meta = {}) {
  const items = analysis.items || [];
  const counts = items.reduce((a, i) => { a[i.category] = (a[i.category] || 0) + 1; return a; }, {});

  const itemRows = items.map((it) => {
    const c = CAT[it.category] || { emoji: '•', color: '#666', label: it.category || '—' };
    const tips = (it.tips || []).map((t) => `<li>${esc(t)}</li>`).join('');
    return `
      <div class="item">
        <div class="item-head">
          <div>
            <span class="item-name">${esc(it.name)}</span>
            ${it.price != null ? `<span class="item-price">${money(it.price)}</span>` : ''}
          </div>
          <span class="badge" style="background:${c.color}">${c.emoji} ${esc(c.label)}</span>
        </div>
        ${it.priceTip ? `<p class="pricetip"><strong>Pricing:</strong> ${esc(it.priceTip)}</p>` : ''}
        ${tips ? `<ul class="tips">${tips}</ul>` : ''}
      </div>`;
  }).join('');

  const gaps = (analysis.marketGaps || []).map((g) => `
    <tr>
      <td>${esc(g.category)}</td>
      <td>${money(g.yourAvg)}</td>
      <td>${esc(g.marketRange)}</td>
      <td class="${(g.gap || 0) < 0 ? 'neg' : 'pos'}">${g.gap != null ? (g.gap < 0 ? '' : '+') + money(g.gap) : '—'}</td>
      <td>${esc(g.verdict)}</td>
    </tr>
    <tr class="gap-action"><td colspan="5">${esc(g.action)}</td></tr>`).join('');

  const comp = analysis.competitorComparison;
  const compRows = (comp?.gaps || []).map((g) => `
    <tr>
      <td>${esc(g.category)}</td>
      <td>${money(g.yourAvg)}</td>
      <td>${esc(g.competitorRange)}</td>
      <td>${esc((g.competitorNames || []).join(', '))}</td>
      <td>${esc(g.verdict)}</td>
    </tr>
    <tr class="gap-action"><td colspan="5">${esc(g.action)}</td></tr>`).join('');

  const list = (arr) => (arr || []).map((a) => `<li>${esc(a)}</li>`).join('');

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>MenuGenie Pro Report${meta.restaurant ? ' — ' + esc(meta.restaurant) : ''}</title>
<style>
  :root{--ink:#1A1A1A;--muted:#666;--line:#E5E2DD;--bg:#FAF8F5;--accent:#E85D26}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:0}
  .wrap{max-width:820px;margin:0 auto;padding:32px 20px 64px}
  header{border-bottom:3px solid var(--accent);padding-bottom:20px;margin-bottom:28px}
  .eyebrow{color:var(--accent);font-weight:700;letter-spacing:.08em;text-transform:uppercase;font-size:12px}
  h1{margin:6px 0 4px;font-size:30px;letter-spacing:-.5px}
  .meta{color:var(--muted);font-size:13px}
  .lift{display:flex;gap:16px;flex-wrap:wrap;margin:24px 0}
  .stat{flex:1 1 140px;background:#fff;border:1px solid var(--line);border-radius:12px;padding:16px}
  .stat .n{font-size:26px;font-weight:800;letter-spacing:-.5px}
  .stat .l{font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.05em}
  h2{font-size:20px;margin:34px 0 12px;letter-spacing:-.3px}
  .summary{background:#fff;border-left:4px solid var(--accent);border-radius:0 10px 10px 0;padding:16px 18px}
  .item{background:#fff;border:1px solid var(--line);border-radius:12px;padding:16px 18px;margin-bottom:12px}
  .item-head{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
  .item-name{font-weight:700;font-size:17px}
  .item-price{color:var(--muted);margin-left:8px;font-variant-numeric:tabular-nums}
  .badge{color:#fff;border-radius:999px;padding:4px 11px;font-size:12px;font-weight:700;white-space:nowrap}
  .pricetip{margin:10px 0 6px}
  .tips{margin:6px 0 0;padding-left:20px}
  .tips li{margin:4px 0}
  table{width:100%;border-collapse:collapse;background:#fff;border:1px solid var(--line);border-radius:12px;overflow:hidden;font-size:14px}
  th,td{padding:10px 12px;text-align:left;border-bottom:1px solid var(--line)}
  th{background:#F3F0EB;font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted)}
  .gap-action td{color:var(--muted);font-size:13px;padding-top:0;border-bottom:2px solid var(--line)}
  .neg{color:#DC2626;font-weight:700}.pos{color:#2D8B4E;font-weight:700}
  ol,ul{padding-left:22px}ol li,ul li{margin:7px 0}
  footer{margin-top:44px;padding-top:18px;border-top:1px solid var(--line);color:var(--muted);font-size:12px}
  @media print{body{background:#fff}.wrap{padding:0}.item,table,.stat{break-inside:avoid}}
</style></head><body><div class="wrap">
<header>
  <div class="eyebrow">MenuGenie · Pro Report</div>
  <h1>${esc(meta.restaurant || 'Menu Engineering Analysis')}</h1>
  <div class="meta">Generated ${esc(new Date(meta.generatedAt || Date.now()).toUTCString())}${meta.orderId ? ` · Order ${esc(meta.orderId)}` : ''}</div>
</header>

<div class="lift">
  <div class="stat"><div class="n">${esc(analysis.lift ?? '—')}%</div><div class="l">Est. revenue lift</div></div>
  <div class="stat"><div class="n">${analysis.total_items_on_menu ?? items.length}</div><div class="l">Items analysed</div></div>
  <div class="stat"><div class="n">${counts.Plowhorse || 0}</div><div class="l">Plowhorses</div></div>
  <div class="stat"><div class="n">${counts.Star || 0}</div><div class="l">Stars</div></div>
</div>

<h2>Summary</h2>
<div class="summary">${esc(analysis.summary)}</div>

<h2>Do these first</h2>
<ol>${list(analysis.actions)}</ol>

<h2>Item-by-item breakdown</h2>
${itemRows || '<p>No items returned.</p>'}

${gaps ? `<h2>Market rate gaps</h2><table><thead><tr><th>Category</th><th>Your avg</th><th>Market</th><th>Gap</th><th>Verdict</th></tr></thead><tbody>${gaps}</tbody></table>` : ''}

${compRows ? `<h2>Local competitors${comp.location ? ' — ' + esc(comp.location) : ''}</h2><table><thead><tr><th>Category</th><th>Your avg</th><th>Their range</th><th>Who</th><th>Verdict</th></tr></thead><tbody>${compRows}</tbody></table>` : ''}

${(analysis.psychTips || []).length ? `<h2>Menu psychology</h2><ul>${list(analysis.psychTips)}</ul>` : ''}

<footer>
  MenuGenie Pro Report · menu-genie.com<br>
  Estimates are modelled from menu structure and industry cost benchmarks, not from your POS data. Validate against your own margins before repricing.
</footer>
</div></body></html>`;
}

/** Email the report. Returns true on success; never throws into the caller. */
export async function emailReport(env, { to, html, restaurant, jobId, reportUrl, pdf }) {
  if (!env.RESEND_API_KEY || !to) {
    console.warn('[delivery] cannot email — missing RESEND_API_KEY or recipient');
    return false;
  }
  const attachments = pdf
    ? [{ filename: `menugenie-pro-report${restaurant ? '-' + restaurant.replace(/[^a-z0-9]+/gi, '-').toLowerCase() : ''}.pdf`, content: pdf }]
    : [];

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.RESEND_API_KEY}` },
      body: JSON.stringify({
        from: env.MAIL_FROM || 'MenuGenie <hello@menu-genie.com>',
        to: [to],
        subject: `Your MenuGenie Pro Report${restaurant ? ' — ' + restaurant : ''}`,
        html: `<p>Your Pro Report is ready.</p>
               <p><a href="${reportUrl}" style="background:#E85D26;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;display:inline-block;font-weight:700">Open your report</a></p>
               <p style="color:#666;font-size:13px">Keep this email — the link stays live and the full report is attached${pdf ? ' as a PDF' : ' below'}.</p>
               <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
               ${pdf ? '' : html}`,
        attachments,
      }),
    });
    if (!res.ok) { console.error('[delivery] resend failed', res.status, await res.text()); return false; }
    return true;
  } catch (err) {
    console.error('[delivery] resend threw', err.message);
    return false;
  }
}

/** PDF via the Browser Rendering binding, if bound. Optional — never fatal. */
export async function renderPDF(env, html) {
  if (!env.BROWSER) return null;
  try {
    const puppeteer = await import('@cloudflare/puppeteer');
    const browser = await puppeteer.launch(env.BROWSER);
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const buf = await page.pdf({ format: 'A4', printBackground: true, margin: { top: '16mm', bottom: '16mm', left: '12mm', right: '12mm' } });
    await browser.close();
    return btoa(String.fromCharCode(...new Uint8Array(buf)));
  } catch (err) {
    console.error('[delivery] pdf failed', err.message);
    return null;
  }
}
