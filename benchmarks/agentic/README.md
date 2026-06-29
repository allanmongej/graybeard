# Agentic Benchmark

This directory contains the heavier benchmark harness for running real
multi-file agent sessions against a template repo.

Graybeard keeps this harness because single-shot LOC benchmarks are not enough:
a senior-dev ruleset should be evaluated on repo fit, safety, tests, and hidden
workflow effects, not only output length.

No Graybeard agentic medians are published yet. Do not reuse Ponytail's
historical result files as Graybeard claims.

## Run

The harness expects a Claude CLI environment and provider credentials. Example:

```bash
python benchmarks/agentic/run.py \
  --arms baseline,caveman,graybeard,yagni-oneliner \
  --models haiku \
  --runs 4 \
  --workers 6
```

Use `benchmarks/agentic/complete.py` to complete or summarize interrupted runs.

## Report Policy

When publishing Graybeard results, include:

- exact model, CLI version, date, and repeat count
- tested arms and isolation settings
- LOC and test-file classification rules
- safety/correctness pass rates
- invalidated or superseded runs

Result files belong under `benchmarks/results/`.
