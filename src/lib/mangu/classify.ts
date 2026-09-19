import { GENRES, IMPRINTS, LANGUAGES } from "./catalog.ts";
import type { BookReturn, Imprint } from "./types.ts";

export const HOUSE_IMPRINT_IDS: Imprint[] = IMPRINTS.map((i) => i.id);
export const HOUSE_LANGUAGE_CODES = LANGUAGES.map((l) => l.code);
export const HOUSE_ISBN_PREFIX = "9781948200";
export const HOUSE_BUDGET_DEFAULT = 100;
export const ENGLISH_TARGET = 6000;
export const WORLD_TARGET = 6000;
export const ROMANCE_MIX_TARGET = 0.6;

export function isPictureBook(r: BookReturn): boolean {
  return (
    r.primaryGenre === "picture" ||
    (r.contentType === "childrens" && (r.audience === "children" || r.primaryGenre === "picture" || r.primaryGenre === "early_reader"))
  );
}

export function isGraphicNovel(r: BookReturn): boolean {
  return r.contentType === "comics" || r.primaryGenre === "graphic_novel" || r.primaryGenre === "mangaish";
}

export function isMiddleGrade(r: BookReturn): boolean {
  return r.audience === "middle_grade" || r.primaryGenre === "mg";
}

export function isChildAudience(r: BookReturn): boolean {
  return r.audience === "children" || r.audience === "middle_grade";
}

export function isNonfiction(r: BookReturn): boolean {
  return r.fiction === false || r.contentType === "nonfiction" || r.contentType === "academic";
}

export function isRomance(r: BookReturn): boolean {
  const g = GENRES.find((x) => x.id === r.primaryGenre);
  return r.imprint === "mangu_romance" || g?.family === "romance";
}

export function skipsHeat(r: BookReturn): boolean {
  return isPictureBook(r) || isMiddleGrade(r) || r.audience === "children";
}

export function autoSkipsAudio(r: BookReturn): boolean {
  if (isPictureBook(r) || isGraphicNovel(r)) return true;
  if (r.audioRights === false) return true;
  return false;
}

export function skipsAudio(r: BookReturn): boolean {
  if (autoSkipsAudio(r)) return true;
  if (r.produceAudio === false) return true;
  return false;
}

export function skipsSourceTitle(r: BookReturn): boolean {
  return r.isTranslation !== true;
}

export function skipsPrintIsbn(r: BookReturn): boolean {
  return r.digitalOnly === true;
}

export function skipsIngramRules(r: BookReturn): boolean {
  if (r.digitalOnly === true) return true;
  if (!r.isbnPrint && !r.channels.ingram && !r.channels.libraries) return true;
  return false;
}

export function skipsSeriesFields(r: BookReturn): boolean {
  return r.hasSeries !== true && !r.seriesName.trim();
}

export function skipsTranslationFields(r: BookReturn): boolean {
  return r.translationRights === false && r.isTranslation !== true;
}

export function skipsIndexing(r: BookReturn): boolean {
  return !isNonfiction(r);
}

export function isValidImprint(id: string): id is Imprint {
  return HOUSE_IMPRINT_IDS.includes(id as Imprint);
}

export function isValidLanguage(code: string): boolean {
  return HOUSE_LANGUAGE_CODES.includes(code);
}

export function displayTitleOf(r: BookReturn): string {
  return r.finalTitle.trim() || r.workingTitle.trim();
}

export function normalizeTitle(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

export function titlesNearDuplicate(a: string, b: string): boolean {
  const na = normalizeTitle(a);
  const nb = normalizeTitle(b);
  if (!na || !nb) return false;
  if (na === nb) return false;
  if (na.includes(nb) || nb.includes(na)) {
    const ratio = Math.min(na.length, nb.length) / Math.max(na.length, nb.length);
    return ratio >= 0.72;
  }
  const aw = new Set(na.split(" "));
  const bw = new Set(nb.split(" "));
  let inter = 0;
  for (const w of aw) if (bw.has(w)) inter++;
  const union = new Set([...aw, ...bw]).size;
  return union > 0 && inter / union >= 0.8 && Math.abs(aw.size - bw.size) <= 1;
}

export function catalogDuplicates(r: BookReturn, catalog: BookReturn[]): BookReturn[] {
  const title = normalizeTitle(displayTitleOf(r));
  if (!title) return [];
  return catalog.filter((other) => {
    if (other.id === r.id) return false;
    return normalizeTitle(displayTitleOf(other)) === title;
  });
}

export function catalogNearDuplicates(r: BookReturn, catalog: BookReturn[]): BookReturn[] {
  const title = displayTitleOf(r);
  if (!title) return [];
  return catalog.filter((other) => {
    if (other.id === r.id) return false;
    if (normalizeTitle(displayTitleOf(other)) === normalizeTitle(title)) return false;
    return titlesNearDuplicate(title, displayTitleOf(other));
  });
}

export const RTL_CODES = new Set(["ar", "ur"]);

export function editionDir(code: string): "rtl" | "ltr" {
  return RTL_CODES.has(code) ? "rtl" : "ltr";
}

export function editionLang(code: string): string {
  const map: Record<string, string> = {
    en: "en",
    hi: "hi",
    zh: "zh-Hans",
    es: "es",
    fr: "fr",
    ar: "ar",
    bn: "bn",
    pt: "pt",
    ru: "ru",
    ur: "ur",
    id: "id",
    de: "de",
    ja: "ja",
    sw: "sw",
    mr: "mr",
    te: "te",
    ta: "ta",
    tr: "tr",
    vi: "vi",
    ko: "ko",
  };
  return map[code] ?? "en";
}
