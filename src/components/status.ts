import type { ReturnStatus } from "@/lib/mangu/types";

export function statusTone(s: ReturnStatus): "sage" | "amber" | "brick" | "muted" {
  if (s === "filed") return "sage";
  if (s === "ready_to_file") return "sage";
  if (s === "needs_info") return "amber";
  return "muted";
}

export function statusLabel(s: ReturnStatus): string {
  if (s === "filed") return "Filed";
  if (s === "ready_to_file") return "Ready to file";
  if (s === "needs_info") return "Needs info";
  return "In progress";
}
