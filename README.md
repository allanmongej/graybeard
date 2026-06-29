# Graybeard

Reads repo instructions and manifests, detects the stack, then pushes agents
toward stack-native patterns, YAGNI scope control, and real tests.

Graybeard is a fork of Ponytail's multi-agent plugin shell. Big thanks to
Ponytail and its maintainers for the original work and for putting a useful
idea into the open-source commons: agents do better when they are nudged toward
YAGNI, minimalism, code-review judgment, and productivity.

Graybeard exists because AI changes the cost model. When code is cheap to
generate, the scarce skill is no longer producing the shortest answer; it is
choosing the best answer for the repo's actual stack, contracts, failure modes,
and operating reality. Graybeard keeps Ponytail's bias against waste, but aims
it at the stack-native, maintainable, well-proven change rather than simply the
laziest one.

## What It Does

Before coding or advising, Graybeard tells the agent to:

1. read repo instructions, manifests, touched files, callers, and tests
2. identify the actual stack and framework conventions
3. reuse local patterns and durable constraints
4. map blast radius across contracts, consumers, jobs, migrations, UI states, and hidden flows
5. design failure modes: timeouts, retries, idempotency, rollback, degraded behavior, and operational visibility
6. avoid speculative abstractions and dependencies
7. require focused automated proof for behavior, data, auth, integrations, and UI flows

It also treats API shapes, event/webhook schemas, database migrations,
privacy/secrets handling, dependency risk, concurrency, and UI workflow states
as senior-engineering responsibilities rather than cleanup notes.

The lifecycle hooks add a short detected-stack hint from common manifests such
as `package.json`, `Gemfile`, `pyproject.toml`, `Cargo.toml`, `go.mod`, and
`Package.swift`. The hint is not authority; the agent still has to verify
against the repo.

## Modes

| Command | Behavior |
|---------|----------|
| `/graybeard advisory` | Recommend the stack-native path and name tradeoffs. |
| `/graybeard` or `/graybeard balanced` | Default. Choose the stack-native implementation and require focused proof. |
| `/graybeard strict` | Challenge weak requirements, missing tests, unsafe boundaries, and non-standard patterns. |
| `/graybeard off` | Stop injecting Graybeard guidance. |

Commands:

- `/graybeard-review` - review current changes for stack fit, blast radius, contracts, failure modes, risks, and missing proof
- `/graybeard-audit` - audit a repo for stack-practice, operational, contract, privacy, dependency, concurrency, UI, and maintainability risks
- `/graybeard-debt` - list deliberate `graybeard:` tradeoff markers and missing revisit triggers
- `/graybeard-gain` - show Graybeard benchmark status and measured impact when results exist
- `/graybeard-help` - quick reference

Set the default mode with `GRAYBEARD_DEFAULT_MODE` or
`~/.config/graybeard/config.json`:

```json
{ "defaultMode": "balanced" }
```

## Install

Claude Code:

```text
/plugin marketplace add allanmongej/graybeard
/plugin install graybeard@graybeard
```

Codex:

```bash
codex plugin marketplace add allanmongej/graybeard
codex
```

Open `/plugins`, select the Graybeard marketplace, install Graybeard, then
open `/hooks` and trust its lifecycle hooks.

OpenCode:

```json
{ "plugin": ["@allanmongej/graybeard"] }
```

Local checkout:

```json
{ "plugin": ["./.opencode/plugins/graybeard.mjs"] }
```

Gemini CLI:

```bash
gemini extensions install https://github.com/allanmongej/graybeard
```

Pi:

```bash
pi install git:github.com/allanmongej/graybeard
```

Hermes:

```bash
hermes plugins install allanmongej/graybeard --enable
```

## Development

Run:

```bash
node scripts/check-rule-copies.js
node scripts/check-versions.js
npm test
```

The repo keeps Ponytail's MIT license and plugin distribution machinery. The
Graybeard rules, commands, and docs are intentionally separate from Ponytail's
benchmark claims.
