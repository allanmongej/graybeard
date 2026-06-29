# Benchmarks

Graybeard keeps the benchmark harness so claims can be measured, not guessed.
The harness compares baseline prompts against Graybeard instructions on code
size, correctness, behavior gates, cost, and latency where the provider exposes
telemetry.

No Graybeard medians are published yet. Do not quote Ponytail's historical
numbers as Graybeard results; run this harness and publish fresh result files
under `benchmarks/results/` when measured.

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
- pass/fail rates for correctness and behavior gates
- median code size, cost, and latency when available
- known limitations or invalidated runs

Until such files exist, `/graybeard-gain` should report that no published
Graybeard medians exist.
