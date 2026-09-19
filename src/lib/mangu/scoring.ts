import { issuesFor, blockingIssues, type Issue, type IssueLevel } from "./rules.ts";
import { SECTIONS, visibleSteps, type StepDef } from "./steps.ts";
import type { BookReturn, ReturnStatus } from "./types.ts";

export type { Issue, IssueLevel };

export { issuesFor, blockingIssues, SECTIONS };

export function completeness(r: BookReturn): number {
  const steps = visibleSteps(r).filter((s) => s.type !== "intro" && s.type !== "review" && s.type !== "file");
  if (steps.length === 0) return 0;
  const done = steps.filter((s) => s.complete(r)).length;
  return Math.round((done / steps.length) * 100);
}

export function deriveStatus(r: BookReturn, catalog: BookReturn[] = []): ReturnStatus {
  if (r.status === "filed" && r.operatorSignoff) return "filed";
  const blocking = blockingIssues(r, catalog);
  const pct = completeness(r);
  if (blocking.length === 0 && pct >= 85) return "ready_to_file";
  if (pct >= 50) return "needs_info";
  return "in_progress";
}

export function requiredIncomplete(r: BookReturn): StepDef[] {
  return visibleSteps(r).filter(
    (s) => !s.optional && !s.complete(r) && s.type !== "intro" && s.type !== "review" && s.type !== "file",
  );
}

export function canFile(r: BookReturn, catalog: BookReturn[] = []): boolean {
  return blockingIssues(r, catalog).length === 0 && r.qualityBar === "pass";
}

export function filedPacket(r: BookReturn, catalog: BookReturn[] = []) {
  const allIssues = issuesFor(r, catalog);
  return {
    house: "MANGU Publishers",
    schema: "mangu.catalog.return.v1",
    filedAt: r.filedAt ?? new Date().toISOString(),
    status: r.status,
    completeness: completeness(r),
    issues: allIssues,
    receipt: r.filingReceipt,
    title: r.finalTitle || r.workingTitle,
    author: r.authorPenName || r.authorName,
    imprint: r.imprint,
    language: r.language,
    return: r,
  };
}
