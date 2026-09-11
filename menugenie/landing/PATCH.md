# Landing page patch — `menu-genie-landing`

## ✅ The patched file already exists: `src/index.js`

You no longer need to do the find/replace edits below by hand. I extracted the
deployed bundle, applied all five edits, and tested the result — the Worker
boots, serves the page, and 14/14 checks pass (`menugenie/test/landing.test.mjs`),
including "the success_url bug is GONE from live code".

**To apply it — one paste, not three edits:**

1. Cloudflare dashboard → Compute (Workers) → `menu-genie-landing` → **Edit code**
2. Select all in the editor and delete
3. Paste the entire contents of `menugenie/landing/src/index.js`
4. **Save and deploy**

Use the dashboard editor rather than `wrangler deploy`: this Worker's routes
(menu-genie.com) are dashboard-managed, and a wrangler deploy without a
`routes` block can detach them.

Roll back at any time via the Worker's **Deployments** tab — the previous
version stays available.

After deploying, confirm on menu-genie.com: run a free analysis, then open
devtools → Network and click the buy button. The request should go to
`gumroad.com/l/menugenie-pro?wanted=true&job_id=...` — **if there is no
`job_id` on that URL, the fix is not live.**

---

## What changed (reference)

The manual instructions below are kept for review — this is what was applied.

Three edits. The first is the actual bug fix.

The deployed Worker is a 139 KB bundle with the page inlined and no source in
git, so these are targeted replacements rather than a rebuilt file. Find each
snippet in the Worker editor and replace it.

---

## 1. Point at v3

```js
const API_URL = 'https://menugenie-api-v2.eshcharb.workers.dev';
```

becomes

```js
const API_URL = 'https://menugenie-api-v4.eshcharb.workers.dev';
```

---

## 2. `goToGumroad()` — THE FIX

The deployed version stashes the menu in `localStorage` and passes a
`success_url` query parameter that **Gumroad does not support and silently
ignores**. That is why order `hETPvO0Gnr4SRXjifoPruQ==` produced nothing: the
buyer was never returned to the site, so `restoreAfterGumroad()` never ran.

Replace the whole function:

```js
function goToGumroad() {
  // Save state, then redirect to Gumroad checkout
  localStorage.setItem('mg_activeTab', currentTab);
  if (currentTab === 'text') {
    localStorage.setItem('mg_menuText', document.getElementById('menuTextInput').value);
  } else if (currentTab === 'url') {
    localStorage.setItem('mg_menuUrl', document.getElementById('menuUrl').value);
  }
  localStorage.setItem('mg_paid', '1');
  window.location.href = 'https://gumroad.com/l/menugenie-pro?wanted=true&success_url=https%3A%2F%2Fmenu-genie.com%2F%3Fmg_purchased%3D1';
}
```

with:

```js
function goToGumroad() {
  // The menu is already persisted server-side by /analyze, which returned a
  // job_id. Carry it through checkout: Gumroad echoes unknown query params
  // back to the Ping webhook inside url_params, which is how the sale gets
  // reconnected to the menu. No localStorage, no same-browser assumption.
  if (!lastAnalysis || !lastAnalysis.checkout_url) {
    alert('Please run the free analysis first so we know which menu to work on.');
    return;
  }
  window.location.href = lastAnalysis.checkout_url;
}
```

`startPaymentFlow()` still opens the modal — leave it, but delete the four
`localStorage.setItem('mg_…')` lines from it. They are now dead weight.

---

## 3. Delete `restoreAfterGumroad()`

The entire `(function restoreAfterGumroad() { … })()` IIFE goes. Delivery no
longer depends on the buyer coming back in the same browser — the Ping
generates the report and it is emailed and hosted.

Keep the analytics calls by moving them into a small block that fires on the
report page instead, or drop them; conversion is already tracked by Gumroad.

---

## 4. Remove the production test bypass

```js
if (params.get('test') !== 'mg_internal_2026') return;
```

This is live on the public site and hands out full reports for free. Delete the
`testMode()` IIFE, or gate it behind a check that cannot be guessed from a URL.

---

## Gumroad dashboard — required, or none of the above matters

| Setting | Where | Value |
|---|---|---|
| **Ping endpoint** | Settings → Advanced → Ping | `https://menugenie-api-v4.eshcharb.workers.dev/gumroad/ping` |
| **Custom Delivery / redirect** | Product → Content → Redirect | `https://menugenie-api-v4.eshcharb.workers.dev/report?__sale_info__` |

`__sale_info__` is a Gumroad literal — it expands to
`sale_id=…&product_id=…&product_permalink=…` on the download page. That is what
lets the report page find the purchase.

Also upload a one-page "your report is being generated, check your email" PDF to
the product's Content so the Gumroad page is never blank again, even if every
other layer fails.

---

## 5. Handle `?attach=<job_id>` (orphan-purchase recovery)

When someone buys straight from the Gumroad page with no menu attached, the
Worker emails them a link back to `menu-genie.com/?attach=<job_id>`. The
landing page must honour it, or that recovery dead-ends.

Add near the other page-load IIFEs:

```js
// Someone paid without a menu attached — credit the purchase to their next analysis.
(function handleAttach() {
  const jobId = new URLSearchParams(window.location.search).get('attach');
  if (!jobId) return;
  window.MG_ATTACH_JOB = jobId;
  history.replaceState({}, '', '/');
  const b = document.createElement('div');
  b.style.cssText = 'background:#2D8B4E;color:#fff;padding:14px;text-align:center;font-weight:600;';
  b.textContent = 'Your purchase is credited — upload your menu below and your Pro Report generates immediately.';
  document.body.prepend(b);
  document.querySelector('.demo-input-area')?.scrollIntoView({ behavior: 'smooth' });
})();
```

Then, where `analyzeFree()` finishes, if `window.MG_ATTACH_JOB` is set, POST the
same menu to `${API_URL}/attach-menu` with `{ job_id: window.MG_ATTACH_JOB, menuText | menuUrl | menuFile }`
and send the user to the returned report URL instead of showing the paywall.

Lower priority than edits 1–3: it only fires for buyers who skip the site
entirely. Edits 1–3 stop the bleeding; this one recovers the stragglers.
