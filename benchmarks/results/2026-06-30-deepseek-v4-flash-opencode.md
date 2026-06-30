# Graybeard OpenCode Benchmark - DeepSeek V4 Flash

Date: 2026-06-30

## Setup

- Harness: inline single-shot OpenCode runner
- Command shape: `opencode run -m opencode-go/deepseek-v4-flash --variant max --format json <prompt>`
- OpenCode version: `1.17.11`
- Provider: OpenCode Go
- Model: `opencode-go/deepseek-v4-flash`
- Variant: `max`
- Arms: `baseline`, `caveman`, `graybeard`
- Tasks: `email`, `debounce`, `csv-sum`, `countdown`, `rate-limit`
- Statistic: median of 3 runs per arm/task
- Raw responses: `benchmarks/results/2026-06-30-deepseek-v4-flash-opencode.json`

## Median Code LOC

| arm | email | debounce | csv-sum | countdown | rate-limit | total |
|---|---:|---:|---:|---:|---:|---:|
| baseline | 8 | 14 | 4 | 49 | 12 | 87 |
| caveman | 6 | 12 | 4 | 53 | 14 | 89 |
| graybeard | 14 | 14 | 5 | 30 | 14 | 77 |

## Median Latency

| arm | email | debounce | csv-sum | countdown | rate-limit | total |
|---|---:|---:|---:|---:|---:|---:|
| baseline | 69.1s | 70.4s | 69.7s | 71.5s | 71.2s | 351.9s |
| caveman | 70.3s | 70.8s | 69.1s | 11.4s | 73.5s | 295.1s |
| graybeard | 11.7s | 69.9s | 72.3s | 77.3s | 70.9s | 302.1s |

## Median Cost

| arm | email | debounce | csv-sum | countdown | rate-limit | total |
|---|---:|---:|---:|---:|---:|---:|
| baseline | $0.004461 | $0.004412 | $0.004400 | $0.004495 | $0.004432 | $0.022201 |
| caveman | $0.004531 | $0.004541 | $0.004517 | $0.004659 | $0.004561 | $0.022811 |
| graybeard | $0.004591 | $0.004569 | $0.004541 | $0.004775 | $0.004611 | $0.023086 |

## Result

On DeepSeek V4 Flash through OpenCode Go, Graybeard produced 77 median LOC,
which is 11% less than the 87 LOC baseline. Caveman produced 89 LOC, 2% more
than baseline.

Graybeard did not reduce token usage or cost in this run. Aggregate median cost
was $0.023086 for Graybeard versus $0.022201 for baseline, about 4% higher.
Aggregate median latency was lower than baseline, 302.1s versus 351.9s, but
latency had high per-cell variance and should not be treated as a stable win
without more provider runs.

## Limitations

- This single-shot harness measures generated code LOC, OpenCode-reported cost,
  token totals, and wall-clock latency.
- It does not execute the generated code or score semantic correctness.
- The prompts are small isolated tasks, not full repository edits.
- Provider latency was highly variable during the run.
- Results are model-specific; this does not supersede the local Ollama result.

