import {
  catalogDuplicates,
  catalogNearDuplicates,
  displayTitleOf,
  isValidImprint,
  isValidLanguage,
  skipsAudio,
  skipsHeat,
  skipsIngramRules,
  skipsPrintIsbn,
} from "./classify.ts";
import { GENRES } from "./catalog.ts";
import { totalCost } from "./economics.ts";
import { inspectIsbn } from "./isbn.ts";
import type { BookReturn } from "./types.ts";

export type IssueLevel = "block" | "warn";

export interface Issue {
  id: string;
  level: IssueLevel;
  sectionId: string;
  stepId: string;
  field: string;
  title: string;
  detail: string;
  why: string;
}

type Ctx = { r: BookReturn; catalog: BookReturn[] };

type Rule = {
  id: string;
  level: IssueLevel;
  sectionId: string;
  stepId: string;
  field: string;
  title: string;
  why: string;
  applies: (ctx: Ctx) => boolean;
  detail: (ctx: Ctx) => string;
};

const RULES: Rule[] = [
  {
    id: "BLK-IMPRINT",
    level: "block",
    sectionId: "house",
    stepId: "house.imprint",
    field: "imprint",
    title: "No imprint",
    why: "Every title lives on one of five house imprints.",
    applies: ({ r }) => !r.imprint,
    detail: () => "A title with no imprint cannot enter the catalog.",
  },
  {
    id: "BLK-IMPRINT-INVALID",
    level: "block",
    sectionId: "house",
    stepId: "house.imprint",
    field: "imprint",
    title: "Imprint not in the house",
    why: "Only the five MANGU imprints may carry a title.",
    applies: ({ r }) => Boolean(r.imprint) && !isValidImprint(r.imprint),
    detail: ({ r }) => `"${r.imprint}" is not a house imprint.`,
  },
  {
    id: "BLK-LANGUAGE",
    level: "block",
    sectionId: "title",
    stepId: "title.language",
    field: "language",
    title: "Language not in the house",
    why: "The house files twenty languages. Anything else is a different house.",
    applies: ({ r }) => !r.language || !isValidLanguage(r.language),
    detail: ({ r }) =>
      r.language ? `"${r.language}" is not one of the twenty house languages.` : "Pick a house language.",
  },
  {
    id: "BLK-TITLE",
    level: "block",
    sectionId: "title",
    stepId: "title.working",
    field: "workingTitle",
    title: "Untitled",
    why: "Every packet hangs off a name.",
    applies: ({ r }) => !r.workingTitle && !r.finalTitle,
    detail: () => "Give it a working title so the packet has a name.",
  },
  {
    id: "BLK-DUP-TITLE",
    level: "block",
    sectionId: "title",
    stepId: "title.working",
    field: "workingTitle",
    title: "Duplicate title",
    why: "Two packets with the same title cannot both live in the catalog.",
    applies: ({ r, catalog }) => catalogDuplicates(r, catalog).length > 0,
    detail: ({ r, catalog }) => {
      const hit = catalogDuplicates(r, catalog)[0];
      return `“${displayTitleOf(r)}” already exists as ${hit ? displayTitleOf(hit) : "another return"}.`;
    },
  },
  {
    id: "WRN-NEAR-DUP",
    level: "warn",
    sectionId: "title",
    stepId: "title.working",
    field: "workingTitle",
    title: "Near-duplicate title",
    why: "Close titles confuse storefronts and the intern on upload day.",
    applies: ({ r, catalog }) => catalogNearDuplicates(r, catalog).length > 0,
    detail: ({ r, catalog }) => {
      const hit = catalogNearDuplicates(r, catalog)[0];
      return `Close to “${hit ? displayTitleOf(hit) : "another title"}”. Confirm it is a different book.`;
    },
  },
  {
    id: "WRN-TITLE-LENGTH",
    level: "warn",
    sectionId: "title",
    stepId: "title.working",
    field: "workingTitle",
    title: "Title is very long",
    why: "Cover spines and Amazon mobile truncate around 60–70 characters.",
    applies: ({ r }) => displayTitleOf(r).length > 70,
    detail: ({ r }) => `“${displayTitleOf(r)}” is ${displayTitleOf(r).length} characters.`,
  },
  {
    id: "BLK-AUTHOR",
    level: "block",
    sectionId: "title",
    stepId: "title.author",
    field: "authorName",
    title: "No author of record",
    why: "Contracts and the copyright page need a legal name.",
    applies: ({ r }) => !r.authorName.trim(),
    detail: () => "Contracts and the copyright page need a legal name.",
  },
  {
    id: "BLK-SOURCE",
    level: "block",
    sectionId: "title",
    stepId: "title.source",
    field: "sourceTitle",
    title: "Source edition missing",
    why: "A translation without a source never meets its original in the catalog.",
    applies: ({ r }) => r.isTranslation === true && !r.sourceTitle.trim(),
    detail: () => "Name the source language and the title as it was first filed.",
  },
  {
    id: "BLK-TYPE",
    level: "block",
    sectionId: "class",
    stepId: "class.type",
    field: "contentType",
    title: "Form not called",
    why: "Form decides word count, trim, and cost.",
    applies: ({ r }) => !r.contentType,
    detail: () => "Novel, picture book, comics — pick one.",
  },
  {
    id: "BLK-GENRE",
    level: "block",
    sectionId: "class",
    stepId: "class.genre",
    field: "primaryGenre",
    title: "No primary genre",
    why: "BISAC and the storefront shelf start here.",
    applies: ({ r }) => !r.primaryGenre,
    detail: () => "BISAC and the storefront shelf start here.",
  },
  {
    id: "BLK-AUDIENCE",
    level: "block",
    sectionId: "class",
    stepId: "class.audience",
    field: "audience",
    title: "Audience not called",
    why: "Audience is an age gate, a library heading, and a cover system.",
    applies: ({ r }) => !r.audience,
    detail: () => "Adult, YA, middle grade, children, or academic.",
  },
  {
    id: "BLK-YA-HEAT",
    level: "block",
    sectionId: "class",
    stepId: "class.heat",
    field: "heatLevel",
    title: "YA + open-door heat",
    why: "Young adult stays closed-door in this house.",
    applies: ({ r }) => r.audience === "ya" && (r.heatLevel === "steamy" || r.heatLevel === "explicit"),
    detail: () => "Young adult stays closed-door in this house. Recode audience or heat.",
  },
  {
    id: "BLK-ORIGIN",
    level: "block",
    sectionId: "rights",
    stepId: "rights.origin",
    field: "origin",
    title: "Rights origin missing",
    why: "Original, translation, public domain, or licensed — the rights spine.",
    applies: ({ r }) => !r.origin,
    detail: () => "Original, translation, public domain, or licensed.",
  },
  {
    id: "BLK-CONTRACT",
    level: "block",
    sectionId: "rights",
    stepId: "rights.contract",
    field: "contractSigned",
    title: "Unsigned contract",
    why: "We do not file on a handshake.",
    applies: ({ r }) => r.origin !== "public_domain" && r.contractSigned !== true,
    detail: () => "We do not file on a handshake.",
  },
  {
    id: "BLK-SELECT",
    level: "block",
    sectionId: "dist",
    stepId: "dist.channels",
    field: "channels",
    title: "KDP Select conflict",
    why: "Select exclusivity cannot coexist with Apple, Google, or Kobo ebook.",
    applies: ({ r }) =>
      Boolean(
        r.exclusiveKdp &&
          (r.channels.apple || r.channels.google || r.channels.kobo || r.channels.d2d || r.channels.barnesNoble),
      ),
    detail: () => "Select exclusivity cannot coexist with Apple, Google, Kobo, Draft2Digital, or B&N ebook.",
  },
  {
    id: "BLK-LOGLINE",
    level: "block",
    sectionId: "ms",
    stepId: "ms.logline",
    field: "logline",
    title: "No logline",
    why: "One or two sentences so the house means the same book.",
    applies: ({ r }) => !r.logline || r.logline.trim().length < 20,
    detail: () => "One or two sentences so the house means the same book.",
  },
  {
    id: "BLK-SYNOPSIS",
    level: "block",
    sectionId: "ms",
    stepId: "ms.synopsis",
    field: "synopsis",
    title: "Synopsis too thin",
    why: "Editorial needs a working synopsis, not a jacket paragraph.",
    applies: ({ r }) => !r.synopsis || r.synopsis.trim().length < 80,
    detail: () => "Editorial needs a working synopsis, not a jacket paragraph.",
  },
  {
    id: "BLK-WORDS",
    level: "block",
    sectionId: "ms",
    stepId: "ms.counts",
    field: "wordCount",
    title: "Word count missing",
    why: "Page count, audio hours, and cost all start here.",
    applies: ({ r }) => !r.wordCount,
    detail: () => "Page count, audio hours, and cost all start here.",
  },
  {
    id: "BLK-MS-STATUS",
    level: "block",
    sectionId: "ms",
    stepId: "ms.status",
    field: "manuscriptStatus",
    title: "Manuscript status missing",
    why: "Production starts at revised, files at final.",
    applies: ({ r }) => !r.manuscriptStatus,
    detail: () => "Call it: idea, outline, draft, revised, or final.",
  },
  {
    id: "BLK-QUALITY",
    level: "block",
    sectionId: "edit",
    stepId: "edit.quality",
    field: "qualityBar",
    title: "Quality bar not cleared",
    why: "Unscored or needs-work titles cannot file. The house is not a slurry mill.",
    applies: ({ r }) => r.qualityBar !== "pass",
    detail: ({ r }) =>
      r.qualityBar === "needs_work"
        ? r.qualityNotes || "Marked needs work. File is blocked until it passes."
        : "Unscored titles cannot file. Walk it through editorial.",
  },
  {
    id: "BLK-COPYEDIT",
    level: "block",
    sectionId: "edit",
    stepId: "edit.passes",
    field: "editorial.copy",
    title: "Copyedit not passed",
    why: "Copy in flight is a missing W-2. It blocks the file.",
    applies: ({ r }) => r.editorial.copy !== "passed",
    detail: ({ r }) =>
      r.editorial.copy === "in_progress"
        ? "Copyedit is in flight. The packet cannot file until the pass is marked passed."
        : "Copy and proof are the last two gates before typesetting. Copy must pass.",
  },
  {
    id: "WRN-PROOF",
    level: "warn",
    sectionId: "edit",
    stepId: "edit.passes",
    field: "editorial.proof",
    title: "Proofread open",
    why: "You can file with proof in flight. You cannot print.",
    applies: ({ r }) => r.editorial.proof !== "passed" && r.editorial.proof !== "skipped",
    detail: () => "You can file with proof in flight. You cannot print.",
  },
  {
    id: "BLK-BLURB",
    level: "block",
    sectionId: "meta",
    stepId: "meta.blurb",
    field: "description",
    title: "No storefront description",
    why: "Amazon and the MANGU store need conversion copy.",
    applies: ({ r }) => !r.description || r.description.trim().length < 80,
    detail: () => "Amazon and the MANGU store need conversion copy.",
  },
  {
    id: "WRN-KEYWORDS",
    level: "warn",
    sectionId: "meta",
    stepId: "meta.keywords",
    field: "keywords",
    title: "Thin keywords",
    why: "Three is the floor. Seven is the house habit.",
    applies: ({ r }) => r.keywords.length < 3,
    detail: () => "Three is the floor. Seven is the house habit.",
  },
  {
    id: "WRN-BIO",
    level: "warn",
    sectionId: "meta",
    stepId: "meta.bio",
    field: "authorBio",
    title: "Author bio missing",
    why: "The bio is a merchandising field. Not required to file.",
    applies: ({ r }) => r.authorBio.trim().length < 20,
    detail: () => "50–90 words for this edition. Optional, but shoppers read it.",
  },
  {
    id: "BLK-ISBN-PRINT",
    level: "block",
    sectionId: "meta",
    stepId: "meta.isbn",
    field: "isbnPrint",
    title: "Print ISBN required",
    why: "Ingram and libraries will not take a title without a print ISBN.",
    applies: ({ r }) =>
      !skipsPrintIsbn(r) && !r.isbnPrint.trim() && (r.channels.ingram || r.channels.libraries),
    detail: () => "Ingram and libraries will not take a title without a print ISBN.",
  },
  {
    id: "BLK-ISBN-INVALID",
    level: "block",
    sectionId: "meta",
    stepId: "meta.isbn",
    field: "isbnPrint",
    title: "Print ISBN invalid",
    why: "Ingram ISBN rules: format, prefix, checksum.",
    applies: ({ r }) => {
      if (skipsIngramRules(r) || skipsPrintIsbn(r) || !r.isbnPrint.trim()) return false;
      const needPrefix = r.channels.ingram;
      const inspect = inspectIsbn(r.isbnPrint, { requiredPrefix: needPrefix });
      return !inspect.ok;
    },
    detail: ({ r }) => {
      const inspect = inspectIsbn(r.isbnPrint, { requiredPrefix: r.channels.ingram });
      return inspect.ok ? "ISBN invalid." : inspect.reason;
    },
  },
  {
    id: "BLK-ISBN-EBOOK",
    level: "block",
    sectionId: "meta",
    stepId: "meta.isbn",
    field: "isbnEbook",
    title: "Ebook ISBN invalid",
    why: "If an ebook ISBN is present, it must checksum.",
    applies: ({ r }) => {
      if (!r.isbnEbook.trim()) return false;
      return !inspectIsbn(r.isbnEbook).ok;
    },
    detail: ({ r }) => {
      const inspect = inspectIsbn(r.isbnEbook);
      return inspect.ok ? "ISBN invalid." : inspect.reason;
    },
  },
  {
    id: "BLK-ISBN-DUP",
    level: "block",
    sectionId: "meta",
    stepId: "meta.isbn",
    field: "isbnPrint",
    title: "ISBN already in the catalog",
    why: "An ISBN uniquely identifies one edition.",
    applies: ({ r, catalog }) => {
      const d = r.isbnPrint.replace(/[^0-9]/g, "");
      if (d.length !== 13) return false;
      return catalog.some((o) => o.id !== r.id && o.isbnPrint.replace(/[^0-9]/g, "") === d);
    },
    detail: () => "This print ISBN is already assigned to another return.",
  },
  {
    id: "BLK-COVER",
    level: "block",
    sectionId: "design",
    stepId: "design.cover",
    field: "coverBrief",
    title: "Cover not briefed",
    why: "Even a brief counts. A blank rectangle does not.",
    applies: ({ r }) => r.coverStatus === "not_started" || !r.coverBrief.trim(),
    detail: () => "Even a brief counts. A blank rectangle does not.",
  },
  {
    id: "WRN-COVER-FINAL",
    level: "warn",
    sectionId: "design",
    stepId: "design.coverstatus",
    field: "coverStatus",
    title: "Cover not final",
    why: "You may file at draft. Shoppers will see whatever you upload.",
    applies: ({ r }) => r.coverStatus !== "final" && r.coverStatus !== "not_started",
    detail: () => "You may file at draft. Shoppers will see whatever you upload.",
  },
  {
    id: "WRN-EPUB",
    level: "warn",
    sectionId: "design",
    stepId: "design.files",
    field: "epubReady",
    title: "EPUB not ready",
    why: "Filing is allowed. Upload is not.",
    applies: ({ r }) => r.epubReady !== true,
    detail: () => "Filing is allowed. Upload is not.",
  },
  {
    id: "WRN-AUDIO",
    level: "warn",
    sectionId: "audio",
    stepId: "audio.cast",
    field: "audioMastered",
    title: "Audio not mastered",
    why: "The ebook can file without the audio product.",
    applies: ({ r }) => !skipsAudio(r) && r.produceAudio === true && r.audioMastered !== true,
    detail: () => "The ebook can file without the audio product.",
  },
  {
    id: "BLK-BUDGET",
    level: "block",
    sectionId: "budget",
    stepId: "budget.lines",
    field: "costs",
    title: "Over the per-title cap",
    why: "The house ~$100/title cap is a blocker, not a suggestion.",
    applies: ({ r }) => totalCost(r) > r.budgetCap,
    detail: ({ r }) =>
      `Spend is $${totalCost(r)} against a $${r.budgetCap} cap. Cut a line or raise the cap with an operator note.`,
  },
  {
    id: "BLK-CHANNEL",
    level: "block",
    sectionId: "dist",
    stepId: "dist.channels",
    field: "channels",
    title: "No sales channel",
    why: "Pick at least KDP, Ingram, or the house store.",
    applies: ({ r }) => !r.channels.kdp && !r.channels.manguStore && !r.channels.ingram,
    detail: () => "Pick at least KDP, Ingram, or the house store.",
  },
  {
    id: "BLK-PRICE",
    level: "block",
    sectionId: "dist",
    stepId: "dist.pricing",
    field: "listPriceEbook",
    title: "List price missing",
    why: "Price is a merchandising decision and a royalty decision.",
    applies: ({ r }) => !r.listPriceEbook || r.listPriceEbook <= 0,
    detail: () => "Set an ebook list price.",
  },
  {
    id: "WRN-PRICE-ODD",
    level: "warn",
    sectionId: "dist",
    stepId: "dist.pricing",
    field: "listPriceEbook",
    title: "Unusual price for class",
    why: "House defaults: $4.99 ebook / $14.99 print. Children’s and comics differ.",
    applies: ({ r }) => {
      const e = r.listPriceEbook ?? 0;
      if (e <= 0) return false;
      if (r.contentType === "childrens") return e > 9.99;
      if (r.contentType === "comics") return e > 14.99;
      return e > 12.99 || e < 0.99;
    },
    detail: ({ r }) => `$${r.listPriceEbook} is outside the usual band for this form.`,
  },
  {
    id: "WRN-LAUNCH",
    level: "warn",
    sectionId: "market",
    stepId: "market.launch",
    field: "launchDate",
    title: "No launch date",
    why: "Preorder and ARC clocks need a day.",
    applies: ({ r }) => !r.launchDate,
    detail: () => "Preorder and ARC clocks need a day.",
  },
  {
    id: "WRN-LAUNCH-SOON",
    level: "warn",
    sectionId: "market",
    stepId: "market.launch",
    field: "launchDate",
    title: "Launch date is very soon",
    why: "Preorder windows want six weeks. A date inside two weeks needs a reason.",
    applies: ({ r }) => {
      if (!r.launchDate) return false;
      const t = Date.parse(r.launchDate);
      if (!Number.isFinite(t)) return false;
      const days = (t - Date.now()) / 86400000;
      return days >= 0 && days < 14;
    },
    detail: () => "Launch is inside two weeks. Confirm ARCs and the storefront will make it.",
  },
  {
    id: "WRN-ARC",
    level: "warn",
    sectionId: "market",
    stepId: "market.arc",
    field: "arcProgram",
    title: "No ARC program",
    why: "Romance especially sells on early reads. Optional for the file.",
    applies: ({ r }) => r.arcProgram === false,
    detail: () => "No advance copies. Allowed — noted on the receipt.",
  },
  {
    id: "WRN-PREORDER",
    level: "warn",
    sectionId: "dist",
    stepId: "dist.preorder",
    field: "preorder",
    title: "No pre-order window",
    why: "A pre-order is how a launch date becomes a sales date.",
    applies: ({ r }) => r.preorder === false,
    detail: () => "No pre-order. You can still file.",
  },
  {
    id: "WRN-READTHROUGH",
    level: "warn",
    sectionId: "market",
    stepId: "market.targets",
    field: "seriesReadthrough",
    title: "Series read-through plan empty",
    why: "A series without a read-through plan leaves money on the table.",
    applies: ({ r }) => Boolean(r.seriesName.trim()) && !r.seriesReadthrough.trim(),
    detail: () => "Name how book 1 hands the reader to book 2.",
  },
  {
    id: "WRN-PICTURE-BW",
    level: "warn",
    sectionId: "design",
    stepId: "design.trim",
    field: "interiorColor",
    title: "Picture book in black and white",
    why: "Allowed, but confirm it isn’t an accident. Color is the cost event.",
    applies: ({ r }) => {
      const g = GENRES.find((x) => x.id === r.primaryGenre);
      return r.audience === "children" && r.contentType === "childrens" && r.interiorColor !== "color" && g?.id === "picture";
    },
    detail: () => "Allowed, but confirm it isn’t an accident. Color is the cost event.",
  },
  {
    id: "WRN-CROSSPROMO",
    level: "warn",
    sectionId: "market",
    stepId: "market.targets",
    field: "backlistCrossPromo",
    title: "Backlist cross-promo empty",
    why: "Every new title is a chance to sell the shelf behind it.",
    applies: ({ r }) => r.launchDate.length > 0 && !r.backlistCrossPromo.trim(),
    detail: () => "Optional. A one-line handoff to another house title is enough.",
  },
];

export const RULE_REGISTRY = RULES.map((rule) => ({
  id: rule.id,
  level: rule.level,
  sectionId: rule.sectionId,
  stepId: rule.stepId,
  field: rule.field,
  title: rule.title,
  why: rule.why,
}));

export function issuesFor(r: BookReturn, catalog: BookReturn[] = []): Issue[] {
  const ctx = { r, catalog };
  const issues: Issue[] = [];
  for (const rule of RULES) {
    if (!rule.applies(ctx)) continue;
    issues.push({
      id: rule.id,
      level: rule.level,
      sectionId: rule.sectionId,
      stepId: rule.stepId,
      field: rule.field,
      title: rule.title,
      detail: rule.detail(ctx),
      why: rule.why,
    });
  }
  return issues;
}

export function blockingIssues(r: BookReturn, catalog: BookReturn[] = []): Issue[] {
  return issuesFor(r, catalog).filter((i) => i.level === "block");
}

export function warningIssues(r: BookReturn, catalog: BookReturn[] = []): Issue[] {
  return issuesFor(r, catalog).filter((i) => i.level === "warn");
}

export { skipsHeat, skipsAudio };
