---
name: graybeard-gain
description: >
  Show Graybeard benchmark status and measured impact when results exist. Never
  reuse Ponytail's benchmark numbers as Graybeard claims. One-shot report,
  changes nothing.
license: MIT
---

# Graybeard Gain

Show the benchmark status honestly.

## Output

If `benchmarks/results/` contains Graybeard result files, summarize the newest
measured medians for:

- correctness / behavior gates
- real-life agentic task quality when measured
- code size where measured as a supporting bloat signal
- cost / latency where measured
- safety or regression failures
- limitations, invalidated runs, or negative findings

If no Graybeard result files exist, say:

`No published Graybeard benchmark medians yet. Run benchmarks/ to measure baseline vs graybeard; do not quote Ponytail's numbers as Graybeard results.`

Then list the runnable benchmark entry points:

- `python benchmarks/agentic/run.py --selftest`
- `python benchmarks/agentic/run.py --canonical --models haiku --runs 4`
- `npx promptfoo@latest eval -c benchmarks/promptfooconfig.yaml --repeat 10`
- `npx promptfoo@latest eval -c benchmarks/behavior.yaml --repeat 10`
- `python benchmarks/benchmark-local.py --model llama3.2 --repeat 3`

## Boundary

Ponytail's published benchmark results are upstream evidence for Ponytail, not
Graybeard. Graybeard needs its own run before claiming savings. If the newest
Graybeard run shows more code, worse latency, or missing correctness coverage,
say that plainly. Do not treat fewer lines as success unless the same result
also shows the implementation is correct, safe, and repo-appropriate.
