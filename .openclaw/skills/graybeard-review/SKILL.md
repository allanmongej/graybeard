---
name: graybeard-review
description: "Review a diff for stack fit, boundary risks, missing proof, and needless complexity. Report only."
homepage: https://github.com/allanmongej/graybeard
license: MIT
---

# Graybeard Review

Review the current diff or requested target. Read the touched files, callers,
tests, manifests, and local instructions needed to prove each finding.

## Findings

Lead with active risks only:

- stack mismatch or framework misuse
- boundary leaks or one-off abstractions
- unexamined blast radius across contracts, consumers, jobs, migrations, UI states, or hidden flows
- missing durable constraints for data, auth, idempotency, or permissions
- API/schema contract drift: request/response shape, status codes, pagination, webhooks, events, or backwards compatibility
- unsafe migrations/backfills, missing indexes, rollback gaps, or stale old-code/data compatibility
- failure-mode gaps: timeout, retry, idempotency, partial failure, fallback, degraded behavior, or operational visibility
- security, privacy, secrets, PII/logging, data loss, accessibility, concurrency, or rollback risk
- UI workflow gaps: desktop/mobile, empty/loading/error states, disabled/focus behavior, overflow, console errors, or uninitialized JS components
- behavior changes without meaningful automated proof
- dependencies or background machinery that the current requirement does not earn, or new dependencies without maintenance/license/security scrutiny

## Output

Findings first, ordered by severity:

`[severity][confidence] file:line - issue. Fix: concrete action.`

If there are no findings, say that clearly and name any residual test gap.
Report only; do not edit files.
