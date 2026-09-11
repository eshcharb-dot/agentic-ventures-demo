// Job store. THIS IS THE LAYER THAT WAS MISSING.
//
// Before this existed, a menu lived only in the buyer's localStorage, so a
// purchase could never be reconnected to the menu it was for. That is the
// defect that cost order hETPvO0Gnr4SRXjifoPruQ== on 2026-09-10.
//
// Storage: KV (JOBS) for state. R2 (UPLOADS) for raw uploads when bound,
// falling back to KV so the system works before R2 is enabled on the account.

const JOB_TTL_SECONDS = 60 * 60 * 24 * 90; // 90 days
const MAX_KV_INLINE_BYTES = 20 * 1024 * 1024; // KV value ceiling is 25MiB

export const STATUS = {
  FREE: 'free',         // free analysis done, not purchased
  PAID: 'paid',         // payment verified, pro report not yet generated
  GENERATING: 'generating',
  READY: 'ready',
  FAILED: 'failed',
  NEEDS_MENU: 'needs_menu', // bought with no menu attached
};

const jobKey = (id) => `job:${id}`;
const saleKey = (saleId) => `sale:${saleId}`;

export function newJobId() {
  return crypto.randomUUID().replace(/-/g, '');
}

/**
 * Persist the menu input at analysis time, before the user ever reaches
 * checkout. Returns the job id that must be threaded through Gumroad.
 */
export async function createJob(env, { menuText, menuFile, menuUrl, location, lang, freeAnalysis }) {
  const id = newJobId();
  const now = new Date().toISOString();

  let fileRef = null;
  if (menuFile) {
    const bytes = menuFile.length;
    if (env.UPLOADS) {
      const key = `uploads/${id}`;
      await env.UPLOADS.put(key, menuFile);
      fileRef = { store: 'r2', key };
    } else if (bytes <= MAX_KV_INLINE_BYTES) {
      await env.JOBS.put(`file:${id}`, menuFile, { expirationTtl: JOB_TTL_SECONDS });
      fileRef = { store: 'kv', key: `file:${id}` };
    } else {
      throw new Error('Uploaded file too large to persist. Enable R2 on this account.');
    }
  }

  const job = {
    id,
    status: STATUS.FREE,
    created_at: now,
    updated_at: now,
    input: { menuText: menuText || null, menuUrl: menuUrl || null, fileRef, location: location || '', lang: lang || 'en' },
    free_analysis: freeAnalysis || null,
    pro_analysis: null,
    sale: null,
    email: null,
    error: null,
    delivered_at: null,
  };

  await env.JOBS.put(jobKey(id), JSON.stringify(job), { expirationTtl: JOB_TTL_SECONDS });
  return job;
}

export async function getJob(env, id) {
  if (!id) return null;
  const raw = await env.JOBS.get(jobKey(id));
  return raw ? JSON.parse(raw) : null;
}

export async function putJob(env, job) {
  job.updated_at = new Date().toISOString();
  await env.JOBS.put(jobKey(job.id), JSON.stringify(job), { expirationTtl: JOB_TTL_SECONDS });
  return job;
}

/** Rehydrate the original menu input so the pro report analyses the SAME menu. */
export async function loadMenuInput(env, job) {
  const { menuText, menuUrl, fileRef } = job.input;
  if (menuText) return { menuText };
  if (menuUrl) return { menuUrl };
  if (fileRef) {
    if (fileRef.store === 'r2') {
      const obj = await env.UPLOADS.get(fileRef.key);
      if (!obj) throw new Error('Uploaded menu no longer available');
      return { menuFile: await obj.text() };
    }
    const val = await env.JOBS.get(fileRef.key);
    if (!val) throw new Error('Uploaded menu no longer available');
    return { menuFile: val };
  }
  throw new Error('Job has no menu input');
}

/**
 * Bind a Gumroad sale to a job. Idempotent on sale_id: Gumroad retries the
 * ping hourly for 3 hours on any non-200, so this WILL be called more than
 * once for the same sale.
 *
 * Returns { job, alreadyProcessed }.
 */
export async function bindSale(env, { saleId, jobId, email, raw }) {
  const existing = await env.JOBS.get(saleKey(saleId));
  if (existing) {
    const job = await getJob(env, existing);
    return { job, alreadyProcessed: true };
  }

  let job = await getJob(env, jobId);

  if (!job) {
    // Bought without a menu attached (straight from the Gumroad page, or the
    // job expired). Do NOT fail silently — that is the original bug.
    job = {
      id: newJobId(),
      status: STATUS.NEEDS_MENU,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      input: { menuText: null, menuUrl: null, fileRef: null, location: '', lang: 'en' },
      free_analysis: null,
      pro_analysis: null,
      sale: null,
      email: null,
      error: null,
      delivered_at: null,
    };
  }

  job.sale = { sale_id: saleId, email, at: new Date().toISOString(), raw: raw || null };
  job.email = email || job.email;
  if (job.status !== STATUS.NEEDS_MENU) job.status = STATUS.PAID;

  await putJob(env, job);
  await env.JOBS.put(saleKey(saleId), job.id, { expirationTtl: JOB_TTL_SECONDS });
  return { job, alreadyProcessed: false };
}

export async function findJobBySale(env, saleId) {
  if (!saleId) return null;
  const id = await env.JOBS.get(saleKey(saleId));
  return id ? getJob(env, id) : null;
}

/** A job is entitled to the pro report only if a verified sale is bound to it. */
export function isPaid(job) {
  return !!(job && job.sale && job.sale.sale_id);
}
