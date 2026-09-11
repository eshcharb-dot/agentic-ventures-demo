# MenuGenie — paid-report delivery fix

## What was broken

A customer paid $49 on 2026-09-10 (order `hETPvO0Gnr4SRXjifoPruQ==`) and
received nothing. Root cause, in order:

1. `menu-genie-landing` stored the menu in the buyer's **localStorage** and
   redirected to Gumroad with `&success_url=…`.
2. **`success_url` is not a Gumroad parameter.** It was silently ignored, so the
   buyer stayed on Gumroad's "View content" page.
3. That page was blank because the product has no files attached.
4. The buyer therefore never returned to `menu-genie.com/?mg_purchased=1`, so
   `restoreAfterGumroad()` never ran and no report was ever generated.
5. Nothing server-side recorded the sale or the menu, so it was unrecoverable.
   The customer's menu existed only in her browser.

Two further holes found in the same pass:

- `menugenie-api-v2` read `tier` straight from the request body. Anyone could
  POST `{"tier":"pro"}` and get the $49 report free, unmetered against the
  OpenAI and Anthropic keys.
- `?test=mg_internal_2026` was live in production and did the same.

## What this changes

| | v2 (deployed) | v3 (here) |
|---|---|---|
| Menu persistence | buyer's localStorage | KV job record (R2 for uploads) |
| Sale → menu link | none | `job_id` through `url_params` |
| Purchase webhook | none | `POST /gumroad/ping`, verified + idempotent |
| Pro authorisation | client-asserted `tier` | verified sale only |
| Delivery | DOM only, lost on tab close | hosted page + emailed copy (+PDF) |
| Rate limit | in-memory Map | KV |
| Failure mode | blank screen | explicit status page + recovery path |

## Deploy

```bash
# 1. Job store
wrangler kv namespace create JOBS
#    put the id into api/wrangler.toml

# 2. Secrets
cd api
wrangler secret put OPENAI_API_KEY
wrangler secret put ANTHROPIC_API_KEY
wrangler secret put GUMROAD_ACCESS_TOKEN   # REQUIRED, else pings go unverified
wrangler secret put RESEND_API_KEY
wrangler secret put SERPER_API_KEY         # optional

# 3. Ship
wrangler deploy
curl https://menugenie-api-v3.eshcharb.workers.dev/health
```

`/health` reports every binding. Do not proceed while any of
`jobs`, `gumroad_verify`, `email` is `false`.

Optional, both improve things but neither blocks delivery:
- Enable **R2** in the dashboard, create `menugenie-uploads`, uncomment the
  binding. Without it, uploaded menus fall back to KV.
- Uncomment the **`[browser]`** binding to attach a PDF to the email.

## Gumroad settings

| Setting | Value |
|---|---|
| Settings → Advanced → **Ping** | `https://menugenie-api-v3.eshcharb.workers.dev/gumroad/ping` |
| Product → Content → **Redirect** | `https://menu-genie.com/report?__sale_info__` |

Then apply `landing/PATCH.md`.

## Test plan

Run in this order. Steps 1–3 need no money.

1. **Ping wiring.** Gumroad → Settings → Advanced → Ping → *Send test ping*.
   Expect `200 ok`. Then confirm `url_params` survives: hit
   `/analyze`, take the returned `checkout_url`, and check the `job_id` on it
   comes back in the test ping. **This one assumption carries the whole design
   — prove it before trusting anything else.**
2. **Pro gate.** `curl -X POST …/analyze -d '{"menuText":"…","tier":"pro"}'`
   must return a *free*-shaped report (5 items + `teaserItems`). If you get a
   full report, the gate is not working.
3. **Failure path.** Temporarily break `OPENAI_API_KEY`, drive a purchase, and
   confirm `/report` shows the failure card with the order id — not a blank page.
4. **Real purchase.** Buy your own product with a 100%-off code, end to end,
   with a real menu. Confirm: report page resolves, email arrives, PDF attaches.
5. **Idempotency.** Replay the same ping three times. Expect exactly one report
   and one email — Gumroad retries hourly for 3 hours on any non-200.
6. **Orphan purchase.** Buy directly from the Gumroad page with no `job_id`.
   Expect the "we need your menu" mail, not silence.

## Still open

- Payouts are blocked: Lemon Squeezy tax form unsigned since March, Gumroad
  photo ID requested in April. Fixing delivery does not get you paid.
- Secrets were found in plaintext in the "MenGen data" Google Doc. Rotate the
  OpenAI, Resend, X and Meta credentials as you set them here.
- `menugenie-api`, `menugenie-api-v3` (old), `menugenie-v2-test` are dead
  copies. Delete once v3 is live.
