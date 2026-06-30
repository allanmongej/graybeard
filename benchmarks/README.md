# Benchmarks

Graybeard keeps the benchmark harness so claims can be measured, not guessed.
The harness compares baseline prompts against Graybeard instructions on code
size, correctness, behavior gates, cost, and latency where the provider exposes
telemetry.

Published Graybeard medians live under `benchmarks/results/`. Do not quote
Ponytail's historical numbers as Graybeard results.

## Published Results

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
- caveman: terse communication control
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

## Metrics

| File | Metric | Behavior |
|------|--------|----------|
| `loc.js` | `code_loc` | Measurement only; records non-comment code lines from fenced blocks. |
| `correctness.js` | `correct` | Gate; fails generated code that does not satisfy task checks. |
| `behavior.js` | `behavior` | Gate; checks Graybeard-specific senior-dev behaviors. |

`correctness.js` executes the email, debounce, and CSV tasks. The React
countdown and FastAPI rate-limit checks are structural, so they verify plausible
shape rather than full runtime behavior.

## Result Policy

Benchmark result files must say:

- model/provider and date
- exact config and repeat count
- pass/fail rates for correctness and behavior gates when measured
- median code size, cost, and latency when available
- known limitations or invalidated runs

`/graybeard-gain` should summarize the newest published result honestly,
including negative or inconclusive findings.
