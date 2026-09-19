export type Imprint =
  | "mangu"
  | "mangu_romance"
  | "mangu_children"
  | "mangu_comics"
  | "mangu_world";

export type ContentType =
  | "novel"
  | "novella"
  | "short_story"
  | "poetry"
  | "childrens"
  | "comics"
  | "academic"
  | "nonfiction"
  | "anthology";

export type WorkOrigin = "original" | "translation" | "public_domain" | "licensed";

export type Audience = "adult" | "ya" | "middle_grade" | "children" | "academic";

export type HeatLevel = "none" | "sweet" | "warm" | "steamy" | "explicit";

export type ManuscriptStatus = "idea" | "outline" | "draft" | "revised" | "final";

export type PassStatus = "not_started" | "in_progress" | "passed" | "skipped";

export type CoverStatus = "not_started" | "briefed" | "draft" | "final";

export type ReturnStatus = "in_progress" | "needs_info" | "ready_to_file" | "filed";

export type TrimSize = "pocket" | "trade" | "digest" | "letter" | "square" | "custom";

export type ChannelKey =
  | "kdp"
  | "ingram"
  | "apple"
  | "google"
  | "kobo"
  | "manguStore"
  | "libraries"
  | "d2d"
  | "barnesNoble";

export type CostKey =
  | "editorial"
  | "cover"
  | "isbn"
  | "interior"
  | "audio"
  | "marketing"
  | "other";

export interface EditorialPasses {
  developmental: PassStatus;
  line: PassStatus;
  copy: PassStatus;
  proof: PassStatus;
  indexing: PassStatus;
  factCheck: PassStatus;
}

export interface Channels {
  kdp: boolean;
  ingram: boolean;
  apple: boolean;
  google: boolean;
  kobo: boolean;
  manguStore: boolean;
  libraries: boolean;
  d2d: boolean;
  barnesNoble: boolean;
}

export interface Costs {
  editorial: number;
  cover: number;
  isbn: number;
  interior: number;
  audio: number;
  marketing: number;
  other: number;
}

export interface FilingReceipt {
  id: string;
  filedAt: string;
  operator: string;
  packetHash: string;
  filedSectionCount: number;
  skippedSectionCount: number;
  blockerCount: number;
  warningCount: number;
  warningIds: string[];
  title: string;
  imprint: string;
  language: string;
}

export interface AuditEvent {
  at: string;
  action: "create" | "file" | "unfile" | "export" | "restore" | "import" | "delete";
  returnId: string;
  operator: string;
  detail?: string;
}

export interface BookReturn {
  id: string;
  createdAt: string;
  updatedAt: string;
  currentStepId: string;
  status: ReturnStatus;
  filedAt?: string;
  visitedSteps: string[];

  imprint: Imprint | "";
  catalogSeason: string;
  operator: string;

  workingTitle: string;
  finalTitle: string;
  subtitle: string;
  seriesName: string;
  seriesNumber: number | null;
  hasSeries: boolean | null;
  authorName: string;
  authorPenName: string;
  language: string;
  isTranslation: boolean;
  sourceLanguage: string;
  sourceTitle: string;

  contentType: ContentType | "";
  fiction: boolean | null;
  primaryGenre: string;
  subgenres: string[];
  bisac: string[];
  lcgft: string[];
  audience: Audience | "";
  ageRange: string;
  readingLevel: string;
  heatLevel: HeatLevel;
  pageCountBand: string;
  wordCountBand: string;

  origin: WorkOrigin | "";
  territories: string[];
  exclusiveKdp: boolean | null;
  publicDomainYear: number | null;
  contractSigned: boolean | null;
  royaltyAuthorPct: number;
  copyrightHolder: string;
  audioRights: boolean | null;
  translationRights: boolean | null;
  filmRights: boolean | null;
  merchRights: boolean | null;
  firstSerial: boolean | null;
  termYears: number | null;
  reversionTrigger: string;
  rightsHolderChain: string;

  logline: string;
  synopsis: string;
  wordCount: number;
  chapterCount: number;
  outline: string;
  manuscriptStatus: ManuscriptStatus | "";
  manuscriptFileName: string;
  manuscriptVersion: string;
  manuscriptFormat: string;
  frontMatter: boolean | null;
  backMatter: boolean | null;
  copyrightPage: boolean | null;
  dedication: string;
  acknowledgements: string;
  contentWarnings: string[];

  editorial: EditorialPasses;
  sensitivityRead: boolean | null;
  legalReview: boolean | null;
  qualityBar: "pass" | "needs_work" | "unscored";
  qualityNotes: string;
  editorialMemo: string;
  revisionLog: string;
  approvalGate: boolean | null;

  isbnPrint: string;
  isbnEbook: string;
  isbnAudio: string;
  keywords: string[];
  description: string;
  shortDescription: string;
  authorBio: string;
  credits: string;
  publicationDate: string;
  onSaleDate: string;
  drm: boolean | null;
  digitalOnly: boolean | null;

  trimSize: TrimSize | "";
  interiorColor: "bw" | "color" | "";
  paperType: string;
  coverStatus: CoverStatus;
  coverBrief: string;
  coverDesigner: string;
  interiorTemplate: string;
  spineWidthMm: number | null;
  backCoverCopy: string;
  epubReady: boolean | null;
  printPdfReady: boolean | null;

  produceAudio: boolean | null;
  narrator: string;
  audioHours: number | null;
  audioMastered: boolean | null;
  studio: string;
  acxDistribution: boolean | null;
  audioRoyaltySplit: number | null;

  budgetCap: number;
  costs: Costs;
  printRoyaltyPct: number;
  ebookRoyaltyPct: number;
  audioRoyaltyPct: number;
  printCostPerUnit: number | null;

  channels: Channels;
  listPriceEbook: number | null;
  listPricePrint: number | null;
  listPriceAudio: number | null;
  preorder: boolean | null;
  territorialAvailability: string;

  launchDate: string;
  arcProgram: boolean | null;
  goodreads: boolean | null;
  marketingNotes: string;
  preorderWindow: string;
  reviewOutreach: boolean | null;
  bookbub: boolean | null;
  first30Target: string;
  first90Target: string;
  seriesReadthrough: string;
  backlistCrossPromo: string;
  paidAds: string;

  operatorSignoff: boolean;
  notes: string;
  filingReceipt: FilingReceipt | null;
}

export interface HouseState {
  operatorName: string;
  fiscalSeason: string;
  englishTarget: number;
  worldTarget: number;
  budgetPerTitle: number;
}

export interface ManguState {
  hydrated: boolean;
  house: HouseState;
  returns: BookReturn[];
}

export type PathValue =
  | string
  | number
  | boolean
  | null
  | string[]
  | EditorialPasses
  | Costs
  | Channels
  | FilingReceipt;

export type FieldPath =
  | keyof BookReturn
  | `editorial.${keyof EditorialPasses}`
  | `costs.${CostKey}`
  | `channels.${ChannelKey}`;
