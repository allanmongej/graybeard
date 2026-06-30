# Benchmarks

Graybeard keeps the benchmark harness so claims can be measured, not guessed.
The harness compares baseline prompts against Graybeard instructions on code
quality, correctness, repo fit, safety, test discipline, cost, and latency where
the provider exposes telemetry.

## Benchmark Philosophy

Graybeard is not primarily a "less code" plugin. It should be judged by whether
it produces the implementation a strong senior engineer would accept for the
repo in front of it.

That means real benchmark tasks must look like real technical work:

- fix a bug by tracing the shared root cause, not only the named failing caller
- reuse existing project helpers instead of reimplementing similar logic
- respect framework-native patterns, boundaries, and data ownership
- handle realistic unsafe input, permissions, and failure modes
- add the smallest meaningful test or runnable check for changed behavior
- keep scope tight without hiding required correctness work

LOC, cost, and latency are supporting metrics. They help detect bloat and
productivity regressions, but they are not the headline. A longer implementation
can win when it is safer, more correct, better tested, or better aligned with
the existing stack. A shorter implementation can lose when it is fragile,
untested, or solves only the happy path.

Published Graybeard medians live under `benchmarks/results/`. Do not quote
Ponytail's historical numbers as Graybeard results.

## Published Results

The current published results are single-shot snapshots. Treat them as
supporting evidence only; they do not prove Graybeard produces better
implementations until paired with correctness, safety, repo-fit, and test
discipline results from the agentic harness.

| Date | Harness | Model | Result |
|------|---------|-------|--------|
| 2026-06-30 | OpenCode Go LOC/cost/latency | `opencode-go/deepseek-v4-flash` | Graybeard produced 77 median LOC, 11% less than the 87 LOC baseline, with about 4% higher cost. See `results/2026-06-30-deepseek-v4-flash-opencode.md`. |
| 2026-06-29 | local Ollama LOC/latency | `llama3.2` | Graybeard produced 142 median LOC, 17% more than the 121 LOC baseline. See `results/2026-06-29-llama3.2-local.md`. |

## Reproduce

### Claude

Requires an Anthropic API key and Node.js compatible with promptfoo:

```bash
cp ../.env.example .env      # add ANTHROPIC_API_KEY
npx promptfoo@latest eval -c promptfooconfig.yaml --env-file ../.env --repeat 10
npx promptfoo@latest view
```

The default Claude config compares:

- baseline: no skill
- graybeard: `skills/graybeard/SKILL.md`

### Behavior Gates

Behavior gates check whether Graybeard changes agent judgment, not just prose:

```bash
npx promptfoo@latest eval -c benchmarks/behavior.yaml --repeat 10
```

The current gates cover API/schema contract discipline, failure-mode design, and
leaving a runnable check for non-trivial logic.

### Local Models

No API key or promptfoo required. Runs against any model served by Ollama:

```bash
ollama pull llama3.2
python benchmarks/benchmark-local.py --model llama3.2 --repeat 3
```

### Real-Life Agentic Problems

This is the primary benchmark direction. It runs agents against seeded codebase
tasks with deterministic scoring:

```bash
python benchmarks/agentic/run.py --selftest
python benchmarks/agentic/run.py --arms baseline,graybeard --models haiku --runs 4
```

The agentic task set should cover:

- **Security and safety:** path traversal, SQL injection, token verification,
  abusive clients, malformed payloads.
- **Root-cause repair:** fix the shared parser/helper that multiple flows use,
  not only the function named in the ticket.
- **Repo-fit and reuse:** call existing project utilities for slug, money,
  formatting, validation, auth, or persistence semantics.
- **Framework-native implementation:** use the stack's router, schema,
  component, migration, test, and state-management patterns.
- **Business-rule preservation:** avoid regressions in adjacent workflows when
  changing a feature.
- **Test discipline:** add focused checks where the change has behavior,
  persistence, permission, or integration risk.

Single-shot prompt benchmarks can stay as smoke tests for bloat and cost, but
they should not be used as the main claim that Graybeard is better.

## Metrics

| File | Metric | Behavior |
|------|--------|----------|
| `agentic/run.py` | `correct`, `safe`, source/test LOC | Primary harness; scores realistic repo-edit tasks. |
| `loc.js` | `code_loc` | Supporting measurement only; records non-comment code lines from fenced blocks. |
| `correctness.js` | `correct` | Gate; fails generated code that does not satisfy task checks. |
| `behavior.js` | `behavior` | Gate; checks Graybeard-specific senior-dev behaviors. |

`correctness.js` executes the email, debounce, and CSV tasks. The React
countdown and FastAPI rate-limit checks are structural, so they verify plausible
shape rather than full runtime behavior.

## Result Policy

Benchmark result files must say:

- model/provider and date
- exact config and repeat count
- task class: single-shot prompt, behavior gate, or real-life agentic problem
- correctness, safety, repo-fit, and test-discipline pass rates when measured
- pass/fail rates for correctness and behavior gates when measured
- median code size, cost, and latency when available
- known limitations or invalidated runs

`/graybeard-gain` should summarize the newest published result honestly,
including negative or inconclusive findings. It must not present LOC reduction
as Graybeard's main impact unless the same result also shows acceptable
implementation-quality scores.
