# ADR 0002 — Blocking vs warning

Status: accepted  
Date: 2026-09-17

## Decision

Review is two columns. A **blocker** (`BLK-*`) stops File. A **warning** (`WRN-*`) prints on the receipt and does not stop File.

Copyedit in flight is a blocker (`BLK-COPYEDIT`). Proof in flight is a warning (`WRN-PROOF`). Over the $100 cap is a blocker (`BLK-BUDGET`). Missing ARC is a warning.

## Why

A missing W-2 is not a “please note.” A picture-book color cost that already spent the year is not a note. Shoppers will not see a proofread status; they will see a missing ISBN.
