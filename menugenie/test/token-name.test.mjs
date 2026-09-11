// The Cloudflare secret was created as GUMROAD_ACESS_TOKEN (one C).
// Prove the code finds it under either spelling, and that a real sale
// verifies with the misspelled binding.
import { gumroadToken, gumroadTokenSource, verifySale, checkToken } from '../api/src/gumroad.js';

let pass = 0, fail = 0;
const ok = (n, c, x = '') => { c ? (pass++, console.log(`  PASS  ${n}`)) : (fail++, console.log(`  FAIL  ${n}${x ? '  → ' + x : ''}`)); };

let calledWith = null;
globalThis.fetch = async (url) => {
  calledWith = String(url);
  if (calledWith.includes('/user')) return new Response(JSON.stringify({ success: true, user: { email: 'eshcharb@gmail.com' } }), { status: 200 });
  return new Response(JSON.stringify({ success: true, sale: { id: 'S1', email: 'b@x.com', product_id: 'P1' } }), { status: 200 });
};

console.log('\n=== token lookup ===');
ok('finds correct spelling', gumroadToken({ GUMROAD_ACCESS_TOKEN: 'aaa' }) === 'aaa');
ok('finds MISSPELLED spelling', gumroadToken({ GUMROAD_ACESS_TOKEN: 'bbb' }) === 'bbb');
ok('correct spelling wins if both present',
   gumroadToken({ GUMROAD_ACCESS_TOKEN: 'aaa', GUMROAD_ACESS_TOKEN: 'bbb' }) === 'aaa');
ok('empty when neither set', gumroadToken({}) === '');

console.log('\n=== reports which binding it used ===');
ok('names the misspelled binding',
   /misspelled/.test(gumroadTokenSource({ GUMROAD_ACESS_TOKEN: 'bbb' }) || ''),
   String(gumroadTokenSource({ GUMROAD_ACESS_TOKEN: 'bbb' })));
ok('null when absent', gumroadTokenSource({}) === null);

console.log('\n=== health deep-check with the misspelled secret ===');
const t = await checkToken({ GUMROAD_ACESS_TOKEN: 'bbb' });
ok('set true', t.set === true);
ok('valid true', t.valid === true, t.reason);
ok('sent the token to Gumroad', calledWith.includes('access_token=bbb'), calledWith);

console.log('\n=== a real sale verifies with the misspelled secret ===');
const v = await verifySale({ GUMROAD_ACESS_TOKEN: 'bbb' }, 'S1', 'P1');
ok('sale verified', v.ok === true, v.reason);
ok('NOT the unverified fallback', v.unverified !== true, 'it fell through to fail-open');

console.log('\n=== no token at all still fails open (never strand a buyer) ===');
const v2 = await verifySale({}, 'S1', 'P1');
ok('ok true but flagged unverified', v2.ok === true && v2.unverified === true);

console.log(`\n${'='.repeat(50)}\n  ${pass} passed, ${fail} failed\n${'='.repeat(50)}\n`);
process.exit(fail ? 1 : 0);
