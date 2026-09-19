# MANGU Return — Enterprise readiness

Evidence, not aspiration. If it isn't here, it isn't done.

## Correctness — [E] for the filing core

| Requirement | Evidence |
|---|---|
| Deterministic skips | `src/lib/mangu/classify.ts` + `rules.test.ts` |
| Named blockers/warnings | `src/lib/mangu/rules.ts` `RULE_REGISTRY`; `RULES.md` |
| Click-to-field | Review panel `onJump(i.stepId)` |
| $100 cap blocker | `BLK-BUDGET` |
| Ingram ISBN | `isbn.ts` + `BLK-ISBN-*` |
| YA heat gate | `BLK-YA-HEAT` |
| 5 imprints / 20 languages | `BLK-IMPRINT-INVALID`, `BLK-LANGUAGE` |
| Filing receipt | `receipt.ts`, stored on the return |
| Catalog JSON signed + round-trip body | `schema.ts` tests |
| 6,000/6,000 and 60% romance live | `aggregations.ts` + House view |

## Reliability

| Requirement | Status | Evidence |
|---|---|---|
| Local-first interview | Done | IndexedDB persist, no network required to walk/file |
| House editor down | Done | Returns `{ok:false}`; toast; packet unchanged; 8s timeout |
| Persist unavailable | Done | localStorage then memory + banner |
| 99.99% SLA / multi-region | Not in this sandbox | Single-origin PWA; document as hosting target |
| RTO/RPO | Device-local | Restore sample catalog + JSON import is the DR path |

## Scale

| Requirement | Status |
|---|---|
| House aggregations O(n) | Done — `houseSnapshot` single pass |
| IndexedDB for catalog | Done |
| 12,000-title load test | Not run in this sandbox |

## Security

| Requirement | Status | Evidence |
|---|---|---|
| No hardcoded secrets | Done | `XAI_API_KEY` server-only |
| XSS | Done | User text rendered as React text, not HTML |
| Catalog signature | Done | FNV-1a content hash of canonical body |
| File upload | Metadata only | Filename/version/format stored; no binary upload |
| Threat model | Documented | `docs/threat-model.md` |
| GDPR/DSAR automation | N/A this build | Device-local; no cloud PII store |
| Audit log | Device-local 200 events | `store.audit` |

## Observability / performance / operability

Documented targets in `docs/runbooks/`. No hosted dashboards in this sandbox. Filing funnel can be derived from the audit log on-device.

## Honest gaps (exact next steps)

1. **Hosted metrics/alerting** — wire the audit log to a metrics backend when the house has one. File: `src/lib/mangu/store.ts` audit array.
2. **12k-title load test** — generate a synthetic catalog and measure House view render. File: `src/lib/mangu/aggregations.ts`.
3. **Native store shells** — PWA is the current iOS/Android path (`public/__grok`).
4. **Legal review of ToS/Privacy** — counsel, not code. Stub not published as if reviewed.
