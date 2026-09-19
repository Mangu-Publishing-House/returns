# PROGRESS — 2026-09-17 05:35 EDT

## Completed this checkpoint

- Rule engine with stable IDs. Copyedit-in-flight and over-cap are blockers.
- Smart skips visible in the rail as Skip (picture book, graphic novel, no audio rights).
- ISBN-13 + house prefix. Bela `978-1-948200-01-1`.
- Filing receipt (hash, operator, warning count). Operator checkbox required.
- IndexedDB persist v2, signed catalog JSON, 13-section house path.
- House editor 8s timeout.
- Devanagari/Arabic fonts; lang/dir on titles.
- 27 unit tests passing. `tsc` clean. Production build clean.
- Browser: Ledger Review shows BLK-QUALITY, BLK-COPYEDIT, BLK-ISBN-PRINT. Bela Audio skipped, 0 blockers, **filed** with receipt. Iron Feather Audio skipped, cover briefed. नदी का घर Devanagari. House path live. Production smoke matches dev (`divergesFromBaseline: false`).

## Commands run

```
node --experimental-strip-types --test src/lib/mangu/isbn.test.ts src/lib/mangu/rules.test.ts
# 27 pass

npx tsc --noEmit
# exit 0

npm run build
# client + ssr + nitro ok

node scripts/browser-smoke.mjs (dev and built)
# 200, 0 console errors, 0 brand warnings, no overflow
```

## Browser / device verification

| Title | Result |
|---|---|
| The Midnight Ledger / Review | 3 blocking (quality, copyedit, print ISBN), 6 warnings |
| A Button for Bela / File | Audio skipped, 0 blockers, filed, receipt issued |
| नदी का घर / Title | Devanagari working title |
| Iron Feather / Design | Cover briefed, Audio skipped |
| The house | 6,000/6,000 meters, romance mix, 13-section path |

## Next 3 tasks

1. 12,000-title synthetic catalog load test (`aggregations.ts`).
2. Native store shells if PWA is not enough.
3. Counsel-reviewed ToS/Privacy — not a code task.
