# Landing page patch — `menu-genie-landing`

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
const API_URL = 'https://menugenie-api-v3.eshcharb.workers.dev';
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
| **Ping endpoint** | Settings → Advanced → Ping | `https://menugenie-api-v3.eshcharb.workers.dev/gumroad/ping` |
| **Custom Delivery / redirect** | Product → Content → Redirect | `https://menu-genie.com/report?__sale_info__` |

`__sale_info__` is a Gumroad literal — it expands to
`sale_id=…&product_id=…&product_permalink=…` on the download page. That is what
lets the report page find the purchase.

Also upload a one-page "your report is being generated, check your email" PDF to
the product's Content so the Gumroad page is never blank again, even if every
other layer fails.
