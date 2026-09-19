# MANGU Return — Rule registry

If a rule exists in code but not here, it is not real. If it exists here but not in `src/lib/mangu/rules.ts` or `src/lib/mangu/classify.ts`, it is not implemented.

Tests: `src/lib/mangu/rules.test.ts`, `src/lib/mangu/isbn.test.ts`.

## Skip rules

| ID | Section | Condition | Effect | Test |
|---|---|---|---|---|
| SKIP-AUDIO-PICTURE | Audio | Picture book (`contentType=childrens` + picture/children) | Section skipped in rail (dash, not a gap) | rules.test.ts |
| SKIP-AUDIO-GRAPHIC | Audio | Graphic novel / comics | Section skipped | rules.test.ts |
| SKIP-AUDIO-NORIGHTS | Audio | `audioRights === false` | Section skipped | rules.test.ts |
| SKIP-AUDIO-DECLINED | Audio | `produceAudio === false` | Cast step hidden; section remains (user answered) | classify.ts |
| SKIP-HEAT-MG | Class | Middle grade | Heat step hidden | rules.test.ts |
| SKIP-HEAT-PICTURE | Class | Picture book / children audience | Heat step hidden | rules.test.ts |
| SKIP-SOURCE-NONTRANSLATION | Title | `isTranslation !== true` | Source language/title hidden | rules.test.ts |
| SKIP-PRINT-ISBN-DIGITAL | Metadata | `digitalOnly === true` | Print ISBN field hidden; Ingram ISBN rules off | rules.test.ts |
| SKIP-INGRAM-NOPRINT | Metadata | No print ISBN and not Ingram/libraries | ISBN format/prefix rules off | classify.ts |
| SKIP-SERIES | Title/Meta | `hasSeries !== true` and empty series name | Series name/number hidden | rules.test.ts |
| SKIP-INDEX-FICTION | Editorial | Fiction | Indexing + fact-check hidden | rules.test.ts |

## Blockers

| ID | Section | Field | Condition | Reason |
|---|---|---|---|---|
| BLK-IMPRINT | House | imprint | empty | No imprint |
| BLK-IMPRINT-INVALID | House | imprint | not one of five | Imprint not in the house |
| BLK-LANGUAGE | Title | language | not one of twenty | Language not in the house |
| BLK-TITLE | Title | workingTitle | empty working and final | Untitled |
| BLK-DUP-TITLE | Title | workingTitle | exact normalized match in catalog | Duplicate title |
| BLK-AUTHOR | Title | authorName | empty | No author of record |
| BLK-SOURCE | Title | sourceTitle | translation without source | Source edition missing |
| BLK-TYPE | Class | contentType | empty | Form not called |
| BLK-GENRE | Class | primaryGenre | empty | No primary genre |
| BLK-AUDIENCE | Class | audience | empty | Audience not called |
| BLK-YA-HEAT | Class | heatLevel | YA + steamy/explicit | YA stays closed-door |
| BLK-ORIGIN | Rights | origin | empty | Rights origin missing |
| BLK-CONTRACT | Rights | contractSigned | not PD and unsigned | Unsigned contract |
| BLK-SELECT | Dist | channels | Select + Apple/Google/Kobo/D2D/B&N | KDP Select conflict |
| BLK-LOGLINE | Manuscript | logline | < 20 chars | No logline |
| BLK-SYNOPSIS | Manuscript | synopsis | < 80 chars | Synopsis too thin |
| BLK-WORDS | Manuscript | wordCount | 0 | Word count missing |
| BLK-MS-STATUS | Manuscript | manuscriptStatus | empty | Manuscript status missing |
| BLK-QUALITY | Editorial | qualityBar | not `pass` | Quality bar not cleared |
| BLK-COPYEDIT | Editorial | editorial.copy | not `passed` | Copyedit not passed (in-flight blocks) |
| BLK-BLURB | Metadata | description | < 80 chars | No storefront description |
| BLK-ISBN-PRINT | Metadata | isbnPrint | Ingram/libraries and empty, not digital-only | Print ISBN required |
| BLK-ISBN-INVALID | Metadata | isbnPrint | present but bad checksum/format/prefix | Print ISBN invalid |
| BLK-ISBN-EBOOK | Metadata | isbnEbook | present but invalid | Ebook ISBN invalid |
| BLK-ISBN-DUP | Metadata | isbnPrint | same digits on another return | ISBN already in the catalog |
| BLK-COVER | Design | coverBrief | not started or empty brief | Cover not briefed |
| BLK-BUDGET | Budget | costs | total > budgetCap | Over the per-title cap |
| BLK-CHANNEL | Dist | channels | no KDP / Ingram / house store | No sales channel |
| BLK-PRICE | Dist | listPriceEbook | missing or ≤ 0 | List price missing |

## Warnings

| ID | Section | Field | Condition |
|---|---|---|---|
| WRN-NEAR-DUP | Title | workingTitle | near-duplicate in catalog |
| WRN-TITLE-LENGTH | Title | workingTitle | > 70 characters |
| WRN-PROOF | Editorial | editorial.proof | not passed and not skipped |
| WRN-KEYWORDS | Metadata | keywords | < 3 |
| WRN-BIO | Metadata | authorBio | < 20 chars |
| WRN-COVER-FINAL | Design | coverStatus | briefed/draft, not final |
| WRN-EPUB | Design | epubReady | not true |
| WRN-AUDIO | Audio | audioMastered | producing audio, not mastered |
| WRN-PRICE-ODD | Dist | listPriceEbook | outside class band |
| WRN-LAUNCH | Market | launchDate | empty |
| WRN-LAUNCH-SOON | Market | launchDate | inside 14 days |
| WRN-ARC | Market | arcProgram | false |
| WRN-PREORDER | Dist | preorder | false |
| WRN-READTHROUGH | Market | seriesReadthrough | series with empty plan |
| WRN-PICTURE-BW | Design | interiorColor | picture book not color |
| WRN-CROSSPROMO | Market | backlistCrossPromo | launch set, promo empty |

## Sample expected Review

**The Midnight Ledger** (must block like a missing W-2): `BLK-QUALITY`, `BLK-COPYEDIT`, `BLK-ISBN-PRINT`.

**A Button for Bela**: zero blockers. Audio skipped. File allowed.

Last verified: 2026-09-17 against `SEED_RETURNS`.
