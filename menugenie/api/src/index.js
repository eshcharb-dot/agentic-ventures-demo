// MenuGenie API v3.
//
// Fixes, relative to the deployed v2.1.0:
//   1. Every analysis is persisted as a job, so a sale can be reconnected to
//      its menu. v2 kept the menu only in the buyer's localStorage.
//   2. `tier: "pro"` is no longer client-assertable. The pro report is only
//      ever produced by the verified-sale path.
//   3. A Gumroad Ping endpoint exists at all. v2 had none.
//   4. The report is stored and emailed, so it survives closing the tab.
//   5. Rate limiting is KV-backed, not an in-memory Map wiped on isolate recycle.

import { runAnalysis } from './analysis.js';
import { renderReportHTML, emailReport, renderPDF } from './render.js';
import { parsePing, verifySale, checkoutUrl, checkToken } from './gumroad.js';
import { createJob, getJob, putJob, bindSale, findJobBySale, loadMenuInput, isPaid, STATUS } from './jobs.js';

const ALLOWED_ORIGINS = [
  'https://menu-genie.com',
  'https://www.menu-genie.com',
  'https://menu-genie.pages.dev',
  'https://menu-genie-landing.eshcharb.workers.dev',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
  'http://localhost:8788',
];

const RATE_LIMIT_FREE = 5;
const RATE_LIMIT_WINDOW_S = 3600;

function cors(env, origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : (env.ALLOWED_ORIGIN || 'https://menu-genie.com');
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

const json = (body, status, headers) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...headers } });

/** KV-backed, so it survives isolate recycling. Applies to everyone. */
async function checkRateLimit(env, ip) {
  if (!env.RATE_LIMIT_KV) return true;
  const key = `rl:${ip}`;
  const cur = parseInt((await env.RATE_LIMIT_KV.get(key)) || '0', 10);
  if (cur >= RATE_LIMIT_FREE) return false;
  await env.RATE_LIMIT_KV.put(key, String(cur + 1), { expirationTtl: RATE_LIMIT_WINDOW_S });
  return true;
}

/**
 * Where the buyer opens their report. Defaults to whatever host served this
 * request, so it is correct on workers.dev out of the box. Only set
 * PUBLIC_BASE_URL to https://menu-genie.com once a Worker Route actually maps
 * menu-genie.com/report* and /api/report* to THIS Worker — menu-genie.com is
 * served by menu-genie-landing, which has no /report route.
 */
function reportUrlFor(env, job, request) {
  const base = env.PUBLIC_BASE_URL || new URL(request.url).origin;
  return `${base}/report?job=${job.id}`;
}

/**
 * Generate and deliver the pro report. Called from ctx.waitUntil() so the
 * ping can return 200 immediately — a slow response here makes Gumroad retry
 * hourly for 3 hours and duplicate the work.
 */
async function generateAndDeliver(env, job, reportUrl) {
  try {
    job.status = STATUS.GENERATING;
    await putJob(env, job);

    const input = await loadMenuInput(env, job);
    const analysis = await runAnalysis(env, {
      ...input,
      tier: 'pro', // authorised here, and ONLY here
      location: job.input.location,
      lang: job.input.lang,
    });

    const meta = {
      restaurant: job.input.restaurant || null,
      generatedAt: Date.now(),
      orderId: job.sale?.sale_id || null,
    };
    const html = renderReportHTML(analysis, meta);
    const pdf = await renderPDF(env, html);

    job.pro_analysis = analysis;
    job.report_html = html;
    job.status = STATUS.READY;
    await putJob(env, job);

    if (job.email) {
      const sent = await emailReport(env, {
        to: job.email,
        html,
        pdf,
        restaurant: meta.restaurant,
        jobId: job.id,
        reportUrl,
      });
      if (sent) { job.delivered_at = new Date().toISOString(); await putJob(env, job); }
    }
  } catch (err) {
    console.error('[generate] failed', job.id, err.message);
    job.status = STATUS.FAILED;
    job.error = err.message;
    await putJob(env, job);
  }
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') || '';
    const ch = cors(env, origin);
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (request.method === 'OPTIONS') return new Response(null, { headers: ch });

    // ── health ────────────────────────────────────────────────────────────
    if (request.method === 'GET' && path === '/health') {
      // ?deep=1 actually calls Gumroad to prove the token works, rather than
      // just confirming a secret exists. Returns no secret material.
      const deep = url.searchParams.get('deep') === '1'
        ? { gumroad_token: await checkToken(env) }
        : undefined;
      return json({
        status: 'ok',
        version: '3.0.0',
        ...(deep ? { deep } : {}),
        bindings: {
          jobs: !!env.JOBS,
          uploads_r2: !!env.UPLOADS,
          rate_limit: !!env.RATE_LIMIT_KV,
          browser_pdf: !!env.BROWSER,
          gumroad_verify: !!env.GUMROAD_ACCESS_TOKEN,
          email: !!env.RESEND_API_KEY,
        },
      }, 200, ch);
    }

    // ── Gumroad Ping ──────────────────────────────────────────────────────
    // Settings → Advanced → Ping → https://<worker>/gumroad/ping
    if (request.method === 'POST' && path === '/gumroad/ping') {
      let ping;
      try {
        ping = parsePing(await request.formData());
      } catch {
        return new Response('bad form', { status: 400 });
      }

      if (!ping.sale_id) return new Response('missing sale_id', { status: 400 });
      if (ping.refunded || ping.disputed) return new Response('ok (refunded)', { status: 200 });

      const verified = await verifySale(env, ping.sale_id, env.GUMROAD_PRODUCT_ID);
      if (!verified.ok) {
        console.error('[ping] rejected', ping.sale_id, verified.reason);
        // 200 on purpose: a forged or unverifiable ping should not be retried.
        return new Response('ok (unverified)', { status: 200 });
      }

      const email = ping.email || verified.sale?.email || '';
      const { job, alreadyProcessed } = await bindSale(env, {
        saleId: ping.sale_id,
        jobId: ping.job_id,
        email,
        raw: { product_permalink: ping.product_permalink, price: ping.price, currency: ping.currency, order_number: ping.order_number },
      });

      if (alreadyProcessed) return new Response('ok (duplicate)', { status: 200 });

      if (job.status === STATUS.NEEDS_MENU) {
        // Paid, but we have no menu. Ask for one instead of going silent.
        if (email && env.RESEND_API_KEY) {
          ctx.waitUntil(emailReport(env, {
            to: email,
            restaurant: null,
            jobId: job.id,
            reportUrl: reportUrlFor(env, job, request),
            html: `<p>Thanks for your purchase. We could not match it to a menu, so nothing was analysed yet.</p>
                   <p>Open the link above and upload your menu — your report generates immediately and this purchase is already credited.</p>`,
          }));
        }
        return new Response('ok (needs menu)', { status: 200 });
      }

      ctx.waitUntil(generateAndDeliver(env, job, reportUrlFor(env, job, request)));
      return new Response('ok', { status: 200 });
    }

    // ── report status (polled by the report page) ─────────────────────────
    if (request.method === 'GET' && path === '/api/report') {
      const job = url.searchParams.get('job')
        ? await getJob(env, url.searchParams.get('job'))
        : await findJobBySale(env, url.searchParams.get('sale_id'));

      if (!job) return json({ status: 'unknown' }, 404, ch);
      return json({
        status: job.status,
        paid: isPaid(job),
        job_id: job.id,
        error: job.error,
        analysis: job.status === STATUS.READY ? job.pro_analysis : null,
        delivered: !!job.delivered_at,
      }, 200, ch);
    }

    // ── the report itself ─────────────────────────────────────────────────
    if (request.method === 'GET' && path === '/report') {
      const job = url.searchParams.get('job')
        ? await getJob(env, url.searchParams.get('job'))
        : await findJobBySale(env, url.searchParams.get('sale_id'));

      if (job && job.status === STATUS.READY && job.report_html) {
        return new Response(job.report_html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
      }
      // Not ready yet — poll. The Gumroad redirect fires the instant payment
      // clears, well before generation finishes. Never render blank.
      return new Response(pollingPage(job, url.searchParams.get('sale_id') || '', env.API_BASE_URL || url.origin, env.LANDING_URL || 'https://menu-genie.com'), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    // ── attach a menu to an orphan purchase ───────────────────────────────
    if (request.method === 'POST' && path === '/attach-menu') {
      const body = await request.json().catch(() => ({}));
      const job = await getJob(env, body.job_id);
      if (!job) return json({ error: 'Unknown job' }, 404, ch);
      if (!isPaid(job)) return json({ error: 'This job has no verified purchase' }, 403, ch);

      const fresh = await createJob(env, {
        menuText: body.menuText, menuFile: body.menuFile, menuUrl: body.menuUrl,
        location: body.location || '', lang: body.lang || 'en', freeAnalysis: null,
      });
      fresh.sale = job.sale;
      fresh.email = job.email;
      fresh.status = STATUS.PAID;
      await putJob(env, fresh);
      ctx.waitUntil(generateAndDeliver(env, fresh, reportUrlFor(env, fresh, request)));
      return json({ job_id: fresh.id, status: 'generating' }, 200, ch);
    }

    // ── free analysis (also creates the job) ──────────────────────────────
    if (request.method === 'POST' && (path === '/analyze' || path === '/')) {
      const body = await request.json().catch(() => null);
      if (!body) return json({ error: 'Invalid JSON body' }, 400, ch);

      const { menuText, menuFile, menuUrl, location = '', lang = 'en' } = body;
      const ip = request.headers.get('cf-connecting-ip') || 'unknown';

      // NOTE: body.tier is deliberately ignored. In v2 it was honoured, which
      // handed out the $49 report to anyone who sent {"tier":"pro"}.
      if (!(await checkRateLimit(env, ip))) {
        return json({ error: 'Rate limit exceeded. Free tier allows 5 analyses per hour.', rateLimited: true }, 429, ch);
      }

      const inputs = [menuText, menuFile, menuUrl].filter(Boolean);
      if (inputs.length !== 1) return json({ error: 'Provide exactly one of: menuText, menuFile, or menuUrl' }, 400, ch);
      if (menuText && menuText.trim().length < 20) return json({ error: "Please include at least 3 menu items with prices (e.g., 'Burger $12.99')" }, 400, ch);
      if (menuText && menuText.length > 10000) return json({ error: 'Menu text too long (max 10,000 characters)' }, 400, ch);
      if (menuFile && menuFile.length > 15e6) return json({ error: 'File too large (max ~10MB)' }, 400, ch);
      if (menuUrl) { try { new URL(menuUrl); } catch { return json({ error: 'Invalid URL' }, 400, ch); } }

      try {
        const analysis = await runAnalysis(env, { menuText, menuFile, menuUrl, tier: 'free', location, lang });
        const job = await createJob(env, { menuText, menuFile, menuUrl, location, lang, freeAnalysis: analysis });

        return json({
          ...analysis,
          job_id: job.id,
          checkout_url: checkoutUrl(env, job.id), // ← the link that must be used
        }, 200, { ...ch, 'X-MenuGenie-Version': '3.0.0' });
      } catch (err) {
        console.error('[analyze] failed', err.message);
        const status = err.userFacing ? 422 : 500;
        return json({ error: err.userFacing ? err.message : 'Analysis failed — please try again.' }, status, ch);
      }
    }

    return json({ error: 'Not found' }, 404, ch);
  },
};

function pollingPage(job, saleId, apiBase, landingUrl) {
  const state = job?.status || (saleId ? 'pending' : 'unknown');
  const failed = state === 'failed';
  const needsMenu = state === 'needs_menu';
  const q = job ? `job=${job.id}` : `sale_id=${encodeURIComponent(saleId)}`;

  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Your MenuGenie Pro Report</title>
<style>
  body{margin:0;background:#FAF8F5;color:#1A1A1A;font:16px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
       display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px}
  .card{background:#fff;border:1px solid #E5E2DD;border-radius:16px;padding:36px;max-width:520px;width:100%;text-align:center}
  h1{font-size:22px;margin:0 0 8px}
  p{color:#555;margin:8px 0}
  .spin{width:38px;height:38px;border:4px solid #F0ECE6;border-top-color:#E85D26;border-radius:50%;margin:0 auto 18px;animation:s 1s linear infinite}
  @keyframes s{to{transform:rotate(360deg)}}
  .err{color:#DC2626;font-weight:600}
  a.btn{display:inline-block;margin-top:14px;background:#E85D26;color:#fff;padding:12px 22px;border-radius:9px;text-decoration:none;font-weight:700}
  code{background:#F3F0EB;padding:2px 6px;border-radius:4px;font-size:13px}
</style></head><body><div class="card">
${failed ? `
  <h1 class="err">Something went wrong building your report</h1>
  <p>Your purchase is recorded and safe — the analysis failed, not the payment.</p>
  <p>Email <a href="mailto:hello@menu-genie.com">hello@menu-genie.com</a> quoting <code>${saleId || job?.id || ''}</code> and we will fix it by hand.</p>
` : needsMenu ? `
  <h1>We need your menu</h1>
  <p>Your purchase is confirmed, but it wasn't linked to a menu — so there is nothing to analyse yet.</p>
  <p>Upload your menu and your report generates straight away.</p>
  <a class="btn" href="${landingUrl}/?attach=${job?.id || ''}">Upload my menu</a>
` : `
  <div class="spin"></div>
  <h1>Building your Pro Report…</h1>
  <p>This usually takes 30–60 seconds. Keep this page open.</p>
  <p style="font-size:13px;color:#888">We're also emailing you a copy, so you can close this safely.</p>
`}
</div>
${failed || needsMenu ? '' : `<script>
  let tries = 0;
  const poll = setInterval(async () => {
    tries++;
    try {
      const r = await fetch('${apiBase}/api/report?${q}');
      if (r.ok) {
        const d = await r.json();
        if (d.status === 'ready') { clearInterval(poll); location.reload(); return; }
        if (d.status === 'failed') { clearInterval(poll); location.reload(); return; }
      }
    } catch (e) {}
    if (tries > 90) { clearInterval(poll); location.reload(); }
  }, 3000);
</script>`}
</body></html>`;
}
