# Runbook — Filing

## Symptom: operator cannot file a cleared title

1. Open Review. If any `BLK-*` row exists, filing is correctly refused.
2. Confirm quality bar is `pass`.
3. Confirm the operator checkbox is ticked.
4. If the UI says cleared but File returns false, check `blockingIssues(r, catalog)` in the console against a stale persist: restore the sample catalog or import JSON.

## Symptom: Midnight Ledger files

This is a regression. Copyedit in flight (`editorial.copy === "in_progress"`) must emit `BLK-COPYEDIT`. Missing print ISBN with Ingram must emit `BLK-ISBN-PRINT`. Quality `needs_work` must emit `BLK-QUALITY`. Tests in `src/lib/mangu/rules.test.ts`.

## Symptom: Bela cannot file

1. Confirm ISBN `978-1-948200-01-1` (checksum 1, not 4).
2. Confirm Audio is **Skipped** in the rail, not missing.
3. Restore sample catalog.

## Symptom: catalog JSON import rejected

Signature is `contentHash(body)`. Tampering any return field invalidates `hash`. Legacy `{house, returns}` files still import.

## DR

Wipe IndexedDB `mangu-return` / localStorage `mangu-return-v2` → Restore sample catalog on The house, or import last export.
