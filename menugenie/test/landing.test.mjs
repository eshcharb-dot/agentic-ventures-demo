// Proves the patched landing Worker actually serves, and that the delivery
// bug is gone from the HTML it sends to browsers.
import worker from '../landing/src/index.js';

let pass = 0, fail = 0;
const ok = (n, c, x = '') => { c ? (pass++, console.log(`  PASS  ${n}`)) : (fail++, console.log(`  FAIL  ${n}${x ? '  → ' + x : ''}`)); };

const res = await worker.fetch(new Request('https://menu-genie.com/'), {}, { waitUntil() {} });
const html = await res.text();

console.log('\n=== Worker responds ===');
ok('200 OK', res.status === 200, `got ${res.status}`);
ok('serves HTML', (res.headers.get('Content-Type') || '').includes('text/html'));
ok('page is intact', html.length > 100000, `${html.length} bytes`);
ok('still a real page', html.includes('<!DOCTYPE html>') && html.includes('</html>'));

console.log('\n=== THE FIX ===');
ok('calls the v4 API', html.includes('menugenie-api-v4.eshcharb.workers.dev'));
ok('no longer calls v2', !html.includes('menugenie-api-v2.eshcharb.workers.dev'));
ok('uses server-issued checkout_url', html.includes('lastAnalysis.checkout_url'));
ok('the success_url bug is GONE from live code',
   !/window\.location\.href\s*=\s*'https:\/\/gumroad\.com/.test(html),
   'the hardcoded Gumroad URL is still being assigned');

console.log('\n=== Security ===');
ok('test bypass removed', !/params\.get\('test'\)\s*!==\s*'mg_internal_2026'/.test(html));
ok('no free-report override of goToGumroad', !/window\.goToGumroad\s*=\s*function/.test(html));

console.log('\n=== Recovery path ===');
ok('handles ?attach=', html.includes('MG_ATTACH_JOB'));

console.log('\n=== Other routes still work ===');
for (const [p, type] of [['/robots.txt', 'text/plain'], ['/sitemap.xml', 'application/xml'], ['/health', 'application/json']]) {
  const r = await worker.fetch(new Request('https://menu-genie.com' + p), {}, { waitUntil() {} });
  ok(`${p} → ${r.status}`, r.status === 200 && (r.headers.get('Content-Type') || '').includes(type.split('/')[1]));
}

console.log(`\n${'='.repeat(52)}\n  ${pass} passed, ${fail} failed\n${'='.repeat(52)}\n`);
process.exit(fail ? 1 : 0);
