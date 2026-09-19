import type { BookReturn, CostKey } from "./types.ts";

export const COST_LABELS: Record<CostKey, string> = {
  editorial: "Editorial",
  cover: "Cover",
  isbn: "ISBN block",
  interior: "Interior / EPUB",
  audio: "Audiobook",
  marketing: "Launch marketing",
  other: "Other",
};

export function totalCost(r: BookReturn): number {
  return (
    r.costs.editorial +
    r.costs.cover +
    r.costs.isbn +
    r.costs.interior +
    r.costs.audio +
    r.costs.marketing +
    r.costs.other
  );
}

export function estimatedPages(r: BookReturn): number {
  if (r.contentType === "childrens" && r.primaryGenre === "picture") {
    return r.wordCount > 0 ? Math.max(24, Math.round(r.wordCount / 40) * 2) : 32;
  }
  if (r.contentType === "comics") {
    return r.wordCount > 0 ? Math.round(r.wordCount / 50) : 120;
  }
  if (!r.wordCount) return 0;
  return Math.max(1, Math.round(r.wordCount / 280));
}

export function estimatedAudioHours(r: BookReturn): number {
  if (r.audioHours && r.audioHours > 0) return r.audioHours;
  if (!r.wordCount) return 0;
  return Math.round((r.wordCount / 9300) * 10) / 10;
}

export function spineWidthMm(r: BookReturn): number {
  if (r.spineWidthMm && r.spineWidthMm > 0) return r.spineWidthMm;
  const pages = estimatedPages(r);
  const perPage = r.paperType === "white" ? 0.11 : 0.13;
  return Math.round((pages * perPage + 0.5) * 10) / 10;
}

export interface UnitEconomics {
  cost: number;
  budgetCap: number;
  overBudget: number;
  ebookNet100: number;
  printNet40: number;
  audioNet20: number;
  contribution: number;
  pages: number;
  audioHours: number;
  breakEvenCopies: number;
  spineMm: number;
}

export function unitEconomics(r: BookReturn): UnitEconomics {
  const cost = totalCost(r);
  const ebookNet100 = (r.listPriceEbook ?? 0) * 0.35 * 100;
  const printNet40 = (r.listPricePrint ?? 0) * 0.4 * 40;
  const audioNet20 = r.produceAudio ? (r.listPriceAudio ?? 0) * 0.4 * 20 : 0;
  const contribution = ebookNet100 + printNet40 + audioNet20 - cost;
  const perCopy = (r.listPriceEbook ?? 0) * 0.35;
  const breakEvenCopies = perCopy > 0 ? Math.ceil(cost / perCopy) : 0;
  return {
    cost,
    budgetCap: r.budgetCap,
    overBudget: Math.max(0, cost - r.budgetCap),
    ebookNet100,
    printNet40,
    audioNet20,
    contribution,
    pages: estimatedPages(r),
    audioHours: estimatedAudioHours(r),
    breakEvenCopies,
    spineMm: spineWidthMm(r),
  };
}
