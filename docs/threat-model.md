# Threat model — MANGU Return (device-local)

Assets: manuscript filenames, contributor names, rights terms, budget figures, market notes, catalog JSON.

## Trust boundary

The operator’s browser. There is no multi-tenant server for packets. The only server call is the house editor (`createServerFn` → xAI), which receives a packet **snapshot** (titles, logline, genre — not ISBNs, not costs, not contracts).

## Threats

| Threat | Mitigation |
|---|---|
| XSS via title/blurb/bio | React text nodes; no `dangerouslySetInnerHTML` |
| Secret leakage | `XAI_API_KEY` server-only; never `VITE_` |
| Catalog tamper in transit | Signed `mangu.catalog.v1` hash of canonical body |
| Cross-desk leakage | Persist namespaced `mangu-return-v2`; no accounts |
| Oversized file upload | No binary manuscript upload; metadata only |
| Editor prompt injection | Snapshot JSON in a constrained instruction; drafts are labeled and discardable |
| Lost device | Operator exports JSON; no cloud copy |

## Out of scope this build

SSO, RBAC, KMS at rest for IndexedDB (browser storage is origin-scoped, not AES-wrapped).
