# ADR 0003 — Local-first persistence

Status: accepted  
Date: 2026-09-17

## Decision

Packets live on the operator’s device. IndexedDB (`mangu-return-v2`) is the catalog store. localStorage is the fallback. Memory + banner if both fail. Catalog JSON export is the interchange and the backup. The house editor is the only network call, and it is optional.

## Why

The desk is small. A title must be walkable on a plane. Cross-device sync is a later house, not this interview.
