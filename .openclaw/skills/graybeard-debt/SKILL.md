---
name: graybeard-debt
description: "List deliberate graybeard tradeoff markers and missing revisit triggers. Report only."
homepage: https://github.com/allanmongej/graybeard
license: MIT
---

# Graybeard Debt

Collect deliberate `graybeard:` markers into one ledger. Use this for scoped
tradeoffs that were intentionally left smaller than the ideal, not for ordinary
TODOs.

## Scan

Search the repo for comment markers, skipping dependency and build output:

`rg -n "(#|//|/\\*) ?graybeard:" -g '!node_modules' -g '!.git' -g '!dist' -g '!build'`

Each hit should name the ceiling and the trigger to revisit it.

## Output

One row per marker, grouped by file:

`<file>:<line>, <tradeoff>. ceiling: <limit>. revisit: <trigger>.`

Flag any marker with no trigger as `no-trigger`; those are the ones most likely
to rot.

End with `<N> markers, <M> with no trigger.` Nothing found:
`No graybeard: debt markers. Clean ledger.`

Report only; do not edit files unless the user explicitly asks for a persisted
ledger.
