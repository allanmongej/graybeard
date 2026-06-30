# Agentic Benchmark

This directory contains the heavier benchmark harness for running real
multi-file agent sessions against a template repo.

Graybeard keeps this harness because single-shot LOC benchmarks are not enough:
a senior-dev ruleset should be evaluated on repo fit, safety, tests, and hidden
workflow effects, not only output length.

No Graybeard agentic medians are published yet. Do not reuse Ponytail's
historical result files as Graybeard claims.

## What Counts As A Real-Life Problem

Agentic benchmark tasks should read like tickets a developer would actually get,
not coding-exercise prompts. A good task has a seeded repo state, an observable
failure or feature request, and at least one way for a lazy implementation to
look plausible while still being wrong.

Prefer tasks in these categories:

- **Root-cause bug fixes:** the prompt names one failing behavior, but the correct
  fix belongs in shared code used by adjacent flows.
- **Repo reuse:** the repo already has a helper, formatter, validator, policy, or
  service boundary; reimplementation should fail the quality score.
- **Security and abuse resistance:** untrusted paths, SQL inputs, forged tokens,
  malformed payloads, cross-tenant access, and client-specific throttling.
- **Framework-native features:** additions that should follow the existing router,
  schema, component, migration, form, state, and test conventions.
- **Business-rule changes:** changes where preserving adjacent workflows matters
  as much as making the named case pass.
- **Test discipline:** behavior changes where an acceptable implementation leaves
  a focused runnable check.

Avoid benchmarks where the best answer is just shorter prose or fewer lines.
Those are useful smoke tests for bloat, not evidence that the plugin produces
better implementation decisions.

## Run

The harness expects a Claude CLI environment and provider credentials. Example:

```bash
python benchmarks/agentic/run.py \
  --canonical \
  --models haiku \
  --runs 4 \
  --workers 6
```

Each run writes `results.json`, `summary.json`, and `report.md` under
`benchmarks/agentic/runs/<timestamp>/`.

Use `benchmarks/agentic/complete.py` to complete or summarize interrupted runs.

## Report Policy

When publishing Graybeard results, include:

- exact model, CLI version, date, and repeat count
- tested arms and isolation settings
- task mix by category
- safety/correctness pass rates
- repo-fit, reuse, root-cause, and test-discipline pass rates when scored
- source LOC, test LOC, and file-count classification rules
- cost and latency when the runner exposes them
- invalidated or superseded runs

Result files belong under `benchmarks/results/`.
