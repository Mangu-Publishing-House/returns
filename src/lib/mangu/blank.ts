import type { BookReturn, Channels, Costs, EditorialPasses, HouseState } from "./types.ts";

function uid(prefix = "r"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}

export const DEFAULT_HOUSE: HouseState = {
  operatorName: "House Operator",
  fiscalSeason: "Oct 2026 – Dec 2027",
  englishTarget: 6000,
  worldTarget: 6000,
  budgetPerTitle: 100,
};

export const DEFAULT_EDITORIAL: EditorialPasses = {
  developmental: "not_started",
  line: "not_started",
  copy: "not_started",
  proof: "not_started",
  indexing: "not_started",
  factCheck: "not_started",
};

export const DEFAULT_COSTS: Costs = {
  editorial: 0,
  cover: 0,
  isbn: 0,
  interior: 0,
  audio: 0,
  marketing: 0,
  other: 0,
};

export const DEFAULT_CHANNELS: Channels = {
  kdp: true,
  ingram: false,
  apple: false,
  google: false,
  kobo: false,
  manguStore: true,
  libraries: false,
  d2d: false,
  barnesNoble: false,
};

export type ReturnDraft = Partial<Omit<BookReturn, "editorial" | "costs" | "channels">> & {
  editorial?: Partial<EditorialPasses>;
  costs?: Partial<Costs>;
  channels?: Partial<Channels>;
};

export function blankReturn(partial: ReturnDraft = {}): BookReturn {
  const now = new Date().toISOString();
  const base: BookReturn = {
    id: uid("ret"),
    createdAt: now,
    updatedAt: now,
    currentStepId: "house.welcome",
    status: "in_progress",
    visitedSteps: ["house.welcome"],

    imprint: "",
    catalogSeason: DEFAULT_HOUSE.fiscalSeason,
    operator: DEFAULT_HOUSE.operatorName,

    workingTitle: "",
    finalTitle: "",
    subtitle: "",
    seriesName: "",
    seriesNumber: null,
    hasSeries: null,
    authorName: "",
    authorPenName: "",
    language: "en",
    isTranslation: false,
    sourceLanguage: "",
    sourceTitle: "",

    contentType: "",
    fiction: null,
    primaryGenre: "",
    subgenres: [],
    bisac: [],
    lcgft: [],
    audience: "",
    ageRange: "",
    readingLevel: "",
    heatLevel: "none",
    pageCountBand: "",
    wordCountBand: "",

    origin: "",
    territories: ["world"],
    exclusiveKdp: null,
    publicDomainYear: null,
    contractSigned: null,
    royaltyAuthorPct: 50,
    copyrightHolder: "MANGU Publishers",
    audioRights: null,
    translationRights: null,
    filmRights: null,
    merchRights: null,
    firstSerial: null,
    termYears: null,
    reversionTrigger: "",
    rightsHolderChain: "",

    logline: "",
    synopsis: "",
    wordCount: 0,
    chapterCount: 0,
    outline: "",
    manuscriptStatus: "",
    manuscriptFileName: "",
    manuscriptVersion: "1.0",
    manuscriptFormat: "",
    frontMatter: null,
    backMatter: null,
    copyrightPage: null,
    dedication: "",
    acknowledgements: "",
    contentWarnings: [],

    editorial: { ...DEFAULT_EDITORIAL },
    sensitivityRead: null,
    legalReview: null,
    qualityBar: "unscored",
    qualityNotes: "",
    editorialMemo: "",
    revisionLog: "",
    approvalGate: null,

    isbnPrint: "",
    isbnEbook: "",
    isbnAudio: "",
    keywords: [],
    description: "",
    shortDescription: "",
    authorBio: "",
    credits: "",
    publicationDate: "",
    onSaleDate: "",
    drm: null,
    digitalOnly: false,

    trimSize: "",
    interiorColor: "",
    paperType: "cream",
    coverStatus: "not_started",
    coverBrief: "",
    coverDesigner: "",
    interiorTemplate: "",
    spineWidthMm: null,
    backCoverCopy: "",
    epubReady: null,
    printPdfReady: null,

    produceAudio: null,
    narrator: "",
    audioHours: null,
    audioMastered: null,
    studio: "",
    acxDistribution: null,
    audioRoyaltySplit: null,

    budgetCap: DEFAULT_HOUSE.budgetPerTitle,
    costs: { ...DEFAULT_COSTS },
    printRoyaltyPct: 50,
    ebookRoyaltyPct: 70,
    audioRoyaltyPct: 25,
    printCostPerUnit: null,

    channels: { ...DEFAULT_CHANNELS },
    listPriceEbook: 4.99,
    listPricePrint: 14.99,
    listPriceAudio: 9.99,
    preorder: null,
    territorialAvailability: "world",

    launchDate: "",
    arcProgram: null,
    goodreads: null,
    marketingNotes: "",
    preorderWindow: "",
    reviewOutreach: null,
    bookbub: null,
    first30Target: "",
    first90Target: "",
    seriesReadthrough: "",
    backlistCrossPromo: "",
    paidAds: "",

    operatorSignoff: false,
    notes: "",
    filingReceipt: null,
  };

  return {
    ...base,
    ...partial,
    editorial: { ...DEFAULT_EDITORIAL, ...partial.editorial },
    costs: { ...DEFAULT_COSTS, ...partial.costs },
    channels: { ...DEFAULT_CHANNELS, ...partial.channels },
    territories: partial.territories ?? base.territories,
    subgenres: partial.subgenres ?? base.subgenres,
    bisac: partial.bisac ?? base.bisac,
    lcgft: partial.lcgft ?? base.lcgft,
    keywords: partial.keywords ?? base.keywords,
    contentWarnings: partial.contentWarnings ?? base.contentWarnings,
    visitedSteps: partial.visitedSteps ?? base.visitedSteps,
  };
}

export function displayTitle(r: BookReturn): string {
  return r.finalTitle.trim() || r.workingTitle.trim() || "Untitled return";
}

export function displayAuthor(r: BookReturn): string {
  return r.authorPenName.trim() || r.authorName.trim() || "Author unassigned";
}

export function migrateReturn(raw: unknown): BookReturn {
  if (!raw || typeof raw !== "object") return blankReturn();
  return blankReturn(raw as ReturnDraft);
}
