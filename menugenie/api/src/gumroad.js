// Gumroad Ping (webhook) parsing and sale verification.
//
// Ping is an UNSIGNED x-www-form-urlencoded POST. Anyone who finds the
// endpoint can forge one, so every sale is re-verified against the Gumroad
// API before a $49 report is released.
//
// Docs: https://gumroad.com/ping  |  https://gumroad.com/help/article/270-url-parameters

const GUMROAD_API = 'https://api.gumroad.com/v2';

/**
 * Gumroad encodes pass-through params as `url_params[job_id]=abc`.
 * Pull them back out into a plain object.
 */
export function parsePing(form) {
  const urlParams = {};
  for (const [k, v] of form.entries()) {
    const m = k.match(/^url_params\[(.+)\]$/);
    if (m) urlParams[m[1]] = v;
  }

  return {
    sale_id: form.get('sale_id') || '',
    product_id: form.get('product_id') || '',
    product_permalink: form.get('product_permalink') || '',
    email: form.get('email') || '',
    full_name: form.get('full_name') || '',
    price: form.get('price') || '',
    currency: form.get('currency') || '',
    order_number: form.get('order_number') || '',
    test: form.get('test') === 'true',
    refunded: form.get('refunded') === 'true',
    disputed: form.get('disputed') === 'true',
    url_params: urlParams,
    job_id: urlParams.job_id || form.get('job_id') || '',
  };
}

/**
 * Confirm the sale actually exists and belongs to us. Returns:
 *   { ok: true, sale }             — verified
 *   { ok: false, reason }          — rejected; do NOT release the report
 *   { ok: true, sale: null, unverified: true } — no token configured
 */
export async function verifySale(env, saleId, expectedProductId) {
  if (!env.GUMROAD_ACCESS_TOKEN) {
    // Fail OPEN only so a misconfigured deploy still delivers to real buyers,
    // but shout about it. Set the secret; this is the free-report hole.
    console.warn('[gumroad] GUMROAD_ACCESS_TOKEN not set — sale NOT verified');
    return { ok: true, sale: null, unverified: true };
  }

  try {
    const res = await fetch(
      `${GUMROAD_API}/sales/${encodeURIComponent(saleId)}?access_token=${encodeURIComponent(env.GUMROAD_ACCESS_TOKEN)}`,
      { method: 'GET' }
    );
    if (!res.ok) return { ok: false, reason: `gumroad api ${res.status}` };

    const data = await res.json();
    if (!data.success || !data.sale) return { ok: false, reason: 'sale not found' };

    const sale = data.sale;
    if (sale.refunded || sale.disputed || sale.chargebacked) {
      return { ok: false, reason: 'sale refunded or disputed' };
    }
    if (expectedProductId && sale.product_id && sale.product_id !== expectedProductId) {
      return { ok: false, reason: 'product mismatch' };
    }
    return { ok: true, sale };
  } catch (err) {
    return { ok: false, reason: `verify failed: ${err.message}` };
  }
}

/** Checkout URL carrying the job id through to the ping. */
export function checkoutUrl(env, jobId) {
  const permalink = env.GUMROAD_PRODUCT_PERMALINK || 'menugenie-pro';
  return `https://gumroad.com/l/${permalink}?wanted=true&job_id=${encodeURIComponent(jobId)}`;
}
