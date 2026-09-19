# MANGU Return — Features

Legend: `[x]` done + tested · `[E]` enterprise-grade with evidence · `[~]` in progress · `[ ]` not started

## Interview (thirteen sections)

- [x] House — imprint picker (five imprints), operator, season, house rules surfacing
- [x] Title — working title, author, language (20), translation + source, series yes/no
- [x] Class — form, fiction, genre/BISAC/LCGFT, audience, age band, heat (gated)
- [x] Rights — origin, PD year, territory, KDP Select, contract, rights bundle
- [x] Manuscript — status, logline, synopsis, counts, outline, file-of-record
- [x] Editorial — four passes + indexing/fact-check (non-fiction), quality bar, legal
- [x] Metadata — final title, blurb, keywords, bio, digital-only, ISBNs, DRM, dates
- [x] Design — trim/color/paper, cover brief + status, interior template, files
- [x] Audio — produce yes/no, narrator/master; **auto-skipped** for picture books, graphic novels, no audio rights
- [x] Budget — cap, line items, over-cap is a **blocker**
- [x] Distribution — channels (incl. D2D, B&N), prices, pre-order, Select conflict
- [x] Market — launch date, ARC/Goodreads, 30/90 targets, series read-through
- [x] File — Review (block vs warn), operator sign-off, filing receipt, packet download

## Smart skip (tested in `src/lib/mangu/rules.test.ts`)

- [x] Picture book → audio skipped (visible in the rail as Skip, not a gap)
- [x] Graphic novel → audio skipped
- [x] No audio rights → audio skipped
- [x] Middle grade / picture book / children → heat skipped
- [x] Non-translation → source title skipped
- [x] Digital-only → print ISBN skipped
- [x] No print ISBN and not Ingram/libraries → Ingram rules skipped
- [x] No series → series fields skipped
- [x] Fiction → indexing / fact-check hidden

## Review / filing

- [x] Every blocker and warning has a stable rule ID, reason, field, step link
- [x] Clicking a blocker jumps to the field
- [x] Filing refused while any blocker remains
- [x] Warnings ride on the receipt and do not block
- [x] Operator checkbox required to file
- [x] Filing receipt: timestamp, operator, packet hash, section counts, warning IDs
- [x] $100 cap exceeded → `BLK-BUDGET`
- [x] YA + steamy/explicit → `BLK-YA-HEAT`
- [x] Copyedit not passed → `BLK-COPYEDIT` (in-flight is a block, not a warn)
- [x] Five imprints / twenty languages enforced
- [x] ISBN-13 checksum, house prefix 978-1-948200, uniqueness
- [x] Exact duplicate title blocks; near-duplicate warns

## Sample titles

- [x] **The Midnight Ledger** — Review shows `BLK-QUALITY`, `BLK-COPYEDIT`, `BLK-ISBN-PRINT`
- [x] **A Button for Bela** — no blockers, audio skipped, can file
- [x] **नदी का घर** — Hindi original, Devanagari, World imprint, draft
- [x] **Iron Feather** — graphic novel, cover briefed, audio skipped

## House view

- [x] English / world toward 6,000 / 6,000
- [x] Romance mix vs 60%
- [x] Imprint mix (five imprints)
- [x] Thirteen-section path for every title
- [x] Signed catalog JSON export (`mangu.catalog.v1`)
- [x] Import catalog JSON (signature verified)
- [x] Restore sample catalog

## House editor

- [x] Drafts on writing steps: titles, logline, synopsis, blurb, keywords, cover brief, outline, bio
- [x] Grounded in the packet snapshot
- [x] User-initiated, 8s timeout, graceful error, interview continues without it

## Persistence

- [x] IndexedDB for catalog (zustand persist `mangu-return-v2`)
- [x] localStorage fallback + memory fallback with banner
- [x] Schema migrate on hydrate (`blankReturn` merge)
- [x] Audit log of create/file/unfile/export/restore/import/delete (device-local, 200 events)

## Platform

- [x] Web responsive (desktop + mobile)
- [E] PWA install via platform injector
- [~] Offline-first interview (local persist; no multi-device sync)
- [ ] Native iOS / Android shells (PWA is the ship path)
- [ ] Desktop install beyond PWA

## Quality gates

- [x] Unit tests for skip, block, warn, ISBN, catalog round-trip, four samples
- [x] `tsc --noEmit` clean
- [~] E2E browser walk of samples (this run)
- [ ] 80% statement coverage report
