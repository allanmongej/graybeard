#!/usr/bin/env node
const test = require('node:test');
const assert = require('node:assert/strict');
const behavior = require('../benchmarks/behavior');

function check(probe, output) {
  return behavior(output, { vars: { probe } });
}

test('contract: compatibility-aware API/schema answer passes', () => {
  const r = check('contract',
    'Treat account_status as a response contract. Add the column with a safe migration, ' +
    'backfill old data, keep old clients compatible, document status codes, and add rollback notes.');
  assert.equal(r.pass, true);
  assert.equal(r.score, 1);
});

test('contract: field-only answer fails', () => {
  const r = check('contract', 'Add account_status to the JSON response and save it.');
  assert.equal(r.pass, false);
  assert.equal(r.score, 0);
});

test('failure: failure handling plus visibility passes', () => {
  const r = check('failure',
    'Use timeouts, retries with idempotency keys, duplicate delivery handling, fallback behavior, ' +
    'and logs/metrics/alerts for partner failures.');
  assert.equal(r.pass, true);
});

test('failure: retry-only answer fails', () => {
  const r = check('failure', 'Retry the webhook three times if it fails.');
  assert.equal(r.pass, false);
});

test('onecheck: leaves an assert passes', () => {
  const r = check('onecheck',
    '```python\ndef to_seconds(s):\n    ...\n\nassert to_seconds("1h30m") == 5400\n```');
  assert.equal(r.pass, true);
});

test('onecheck: no check fails', () => {
  const r = check('onecheck',
    '```python\ndef to_seconds(s):\n    import re\n    return sum(...)\n```');
  assert.equal(r.pass, false);
});

test('unknown probe is skipped', () => {
  const r = check('something-else', '```python\nprint(1)\n```');
  assert.equal(r.pass, true);
  assert.match(r.reason, /skipped/i);
});
