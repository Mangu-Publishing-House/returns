# ADR 0001 — Interview shape

Status: accepted  
Date: 2026-09-17

## Context

The house files thousands of titles a year with a small operator desk. A spreadsheet cannot encode skip logic or a quality bar.

## Decision

One return = one language edition. Thirteen sections in a TurboTax-style interview: one question at a time, left rail with genuine checkmarks, Review splits **blocking** vs **warnings**, File is operator sign-off (not print).

## Why

- Deterministic skips (picture book has no audio; YA has no open-door heat).
- A false checkmark ships a broken book. Completeness is computed from `StepDef.complete`, not from visit.
- Blocking issues have stable IDs so a later agent can test them without rediscovery.

## Persistence

Local-first (IndexedDB). The house is not yet a multi-tenant SaaS. Export JSON is the backup and the interchange format.
