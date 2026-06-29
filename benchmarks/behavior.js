// Behavior gate: does Graybeard produce senior-dev behavior, not just carry the
// text? One check per probe (vars.probe). The graders are intentionally
// heuristic, and tests/behavior.test.js proves the expected red/green cases.

function proseOf(text) {
  return String(text || '').replace(/```[\s\S]*?```/g, ' ').replace(/\s+/g, ' ').trim();
}

const CHECKS = {
  contract(output) {
    const t = String(output || '');
    const mentionsContract = /\bcontract|request|response|status code|pagination|schema|migration|webhook|event\b/i.test(t);
    const mentionsCompatibility = /\bbackward|compatib|old data|old code|version|consumer|client|rollback|constraint|index|backfill\b/i.test(t);
    return mentionsContract && mentionsCompatibility
      ? { pass: true, reason: 'Treats API/schema changes as contracts with compatibility concerns.' }
      : { pass: false, reason: 'Does not address contract or compatibility risk.' };
  },

  failure(output) {
    const t = String(output || '');
    const hasFailureMode = /\btimeout|retry|idempot|partial failure|rollback|fallback|degraded|duplicate|rate limit|dead letter\b/i.test(t);
    const hasVisibility = /\blog|metric|alert|trace|breadcrumb|observability|monitor/i.test(t);
    return hasFailureMode && hasVisibility
      ? { pass: true, reason: 'Names failure handling and operational visibility.' }
      : { pass: false, reason: 'Missing failure-mode or visibility design.' };
  },

  onecheck(output) {
    const t = String(output || '');
    const hasCheck = /\bassert\b|def\s+test_|if\s+__name__|unittest|pytest|console\.assert|\bexpect\(|\bdescribe\(|\bit\(/.test(t);
    return hasCheck
      ? { pass: true, reason: 'Left a runnable check (assert/test/demo).' }
      : { pass: false, reason: 'No runnable check left behind.' };
  },
};

module.exports = (output, context) => {
  const probe = context && context.vars && context.vars.probe;
  const check = CHECKS[probe];
  if (!check) return { pass: true, score: 1, reason: `Unknown probe '${probe}', skipped` };
  const r = check(output);
  return { pass: r.pass, score: r.pass ? 1 : 0, reason: r.reason };
};
