# RESUME.md — handoff

## Repo state

MANGU Return is a TanStack Start + React 19 interview on `0.0.0.0:8080`. Auth/db off. Local-first catalog.

## FEATURES.md

Core interview, skips, review, four samples, house view, editor, persist, signed catalog: `[x]`. Native iOS/Android shells and coverage report: open.

## PROGRESS.md

Checkpoint 2026-09-17 05:15 EDT. 27 unit tests green, tsc clean. Browser verification next.

## ENTERPRISE.md

Correctness of the filing core is evidenced. Hosted SLA, 12k load test, store submissions, counsel-reviewed legal: gaps with exact next steps.

## RULES.md

Skip + block + warn registry matches `src/lib/mangu/rules.ts` and `classify.ts`.

## Exact next 3 tasks

1. `node scripts/browser-smoke.mjs http://127.0.0.1:8080/ /workspace/screenshots/app-builder-preview.png` then agent-browser walk of `/return/ret_ledger?step=review.issues` and `/return/ret_bela?step=review.file`.
2. `npm run build` then `npm run preview:restart` and smoke against `:8081` with the dev verdict as baseline.
3. If sample catalog looks stale in the preview, click **Restore sample catalog** on The house (persist key bumped to v2).

## Exact blockers

None on the filing core. Ledger must NOT file. Bela must file.

## Commands to resume

```
sh /workspace/startup.sh
node --experimental-strip-types --test src/lib/mangu/isbn.test.ts src/lib/mangu/rules.test.ts
npx tsc --noEmit
```

## Files to read first

1. `src/lib/mangu/rules.ts`
2. `src/lib/mangu/classify.ts`
3. `src/lib/mangu/seed.ts`
4. `RULES.md`
5. `src/routes/house.tsx`
