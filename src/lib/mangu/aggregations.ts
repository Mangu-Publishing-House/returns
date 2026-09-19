import { GENRES, IMPRINTS, LANGUAGES } from "./catalog.ts";
import { isRomance } from "./classify.ts";
import { totalCost } from "./economics.ts";
import { completeness } from "./scoring.ts";
import { SECTIONS, isSectionSkipped, sectionProgress } from "./steps.ts";
import type { BookReturn, HouseState } from "./types.ts";

export type SectionDot = {
  id: string;
  label: string;
  skipped: boolean;
  complete: boolean;
  ratio: number;
};

export type TitlePath = {
  id: string;
  title: string;
  language: string;
  imprint: string;
  status: BookReturn["status"];
  completeness: number;
  sections: SectionDot[];
};

export type HouseSnapshot = {
  english: number;
  world: number;
  englishTarget: number;
  worldTarget: number;
  romance: number;
  romancePct: number;
  romanceTarget: number;
  filed: number;
  ready: number;
  open: number;
  spend: number;
  avgComplete: number;
  byImprint: { id: string; name: string; n: number }[];
  byLanguage: { code: string; name: string; native: string; n: number }[];
  paths: TitlePath[];
};

export function titlePath(r: BookReturn): TitlePath {
  return {
    id: r.id,
    title: r.finalTitle.trim() || r.workingTitle.trim() || "Untitled return",
    language: r.language,
    imprint: r.imprint,
    status: r.status,
    completeness: completeness(r),
    sections: SECTIONS.map((s) => {
      const skipped = isSectionSkipped(s.id, r);
      const { done, total } = sectionProgress(s.id, r);
      return {
        id: s.id,
        label: s.railLabel,
        skipped,
        complete: !skipped && total > 0 && done === total,
        ratio: skipped || total === 0 ? 0 : done / total,
      };
    }),
  };
}

export function houseSnapshot(house: HouseState, returns: BookReturn[]): HouseSnapshot {
  const english = returns.filter((r) => r.language === "en").length;
  const world = returns.length - english;
  const romance = returns.filter(isRomance).length;
  const filed = returns.filter((r) => r.status === "filed").length;
  const ready = returns.filter((r) => r.status === "ready_to_file").length;
  const spend = returns.reduce((a, r) => a + totalCost(r), 0);
  const avgComplete =
    returns.length === 0 ? 0 : Math.round(returns.reduce((a, r) => a + completeness(r), 0) / returns.length);

  return {
    english,
    world,
    englishTarget: house.englishTarget,
    worldTarget: house.worldTarget,
    romance,
    romancePct: returns.length ? Math.round((romance / returns.length) * 100) : 0,
    romanceTarget: 60,
    filed,
    ready,
    open: returns.length - filed,
    spend,
    avgComplete,
    byImprint: IMPRINTS.map((i) => ({
      id: i.id,
      name: i.name,
      n: returns.filter((r) => r.imprint === i.id).length,
    })),
    byLanguage: LANGUAGES.map((l) => ({
      code: l.code,
      name: l.name,
      native: l.native,
      n: returns.filter((r) => r.language === l.code).length,
    })),
    paths: returns.map(titlePath),
  };
}

export { GENRES };
