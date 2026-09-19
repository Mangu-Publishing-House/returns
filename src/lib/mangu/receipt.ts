import { packetHash } from "./hash.ts";
import { issuesFor, type Issue } from "./rules.ts";
import { SECTIONS } from "./steps.ts";
import { skipsAudio } from "./classify.ts";
import type { BookReturn, FilingReceipt } from "./types.ts";

export function skippedSectionCount(r: BookReturn): number {
  let n = 0;
  if (skipsAudio(r)) n += 1;
  return n;
}

export function makeReceipt(r: BookReturn, catalog: BookReturn[] = []): FilingReceipt {
  const issues = issuesFor(r, catalog);
  const blocks = issues.filter((i) => i.level === "block");
  const warns = issues.filter((i) => i.level === "warn");
  const skipped = skippedSectionCount(r);
  return {
    id: `fil_${r.id}_${Date.now().toString(36)}`,
    filedAt: r.filedAt ?? new Date().toISOString(),
    operator: r.operator || "House Operator",
    packetHash: packetHash(r as unknown as Record<string, unknown>),
    filedSectionCount: SECTIONS.length - skipped,
    skippedSectionCount: skipped,
    blockerCount: blocks.length,
    warningCount: warns.length,
    warningIds: warns.map((i) => i.id),
    title: r.finalTitle || r.workingTitle,
    imprint: r.imprint,
    language: r.language,
  };
}

export function receiptFrom(r: BookReturn, issues: Issue[]): FilingReceipt {
  const skipped = skippedSectionCount(r);
  const warns = issues.filter((i) => i.level === "warn");
  return {
    id: `fil_${r.id}_${Date.now().toString(36)}`,
    filedAt: new Date().toISOString(),
    operator: r.operator || "House Operator",
    packetHash: packetHash(r as unknown as Record<string, unknown>),
    filedSectionCount: SECTIONS.length - skipped,
    skippedSectionCount: skipped,
    blockerCount: issues.filter((i) => i.level === "block").length,
    warningCount: warns.length,
    warningIds: warns.map((i) => i.id),
    title: r.finalTitle || r.workingTitle,
    imprint: r.imprint,
    language: r.language,
  };
}
