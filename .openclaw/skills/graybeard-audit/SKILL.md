---
name: graybeard-audit
description: "Audit the repo for stack-practice and maintainability risks. Report only."
homepage: https://github.com/allanmongej/graybeard
license: MIT
---

# Graybeard Audit

Audit the repository as a senior engineer. Start with local instructions,
manifests, framework entry points, and test setup. Then sample the highest-risk
flows instead of trying to read every file.

## Hunt

- framework patterns the repo is not following
- duplicated business rules that should live at one boundary
- high-blast-radius modules with weak contract ownership or hidden consumers
- missing database/type/permission constraints
- API/schema contracts without compatibility, pagination, status-code, webhook, or event-shape discipline
- migrations without constraints, indexes, backfills, cleanup, rollback, or old-code/data compatibility
- external calls without timeouts, retries, idempotency, fallback/degraded behavior, or one wrapper boundary
- weak operational visibility on critical paths: missing logs, metrics, alerts, or failure breadcrumbs
- privacy/secrets risks: PII in logs, broad token scope, unclear retention, or missing least privilege
- concurrency risks: uniqueness races, duplicate delivery, stale state, missing locks, or TOCTOU
- UI flows missing desktop/mobile, empty/loading/error, disabled/focus, overflow, console, or component-initialization checks
- behavior paths without meaningful tests
- one-implementation abstractions, speculative config, unnecessary dependencies, or dependencies with weak maintenance/license/security posture

## Output

Rank findings by production risk. For each finding include evidence, why it
matters, and the smallest stack-native fix. Report only; do not edit files.
