import { GENRES } from "./catalog.ts";
import { isNonfiction, autoSkipsAudio, skipsHeat, skipsIndexing, skipsSeriesFields, skipsSourceTitle } from "./classify.ts";
import type { BookReturn, FieldPath } from "./types.ts";

export type Choice = {
  value: string;
  label: string;
  blurb?: string;
};

export type FormField = {
  path: FieldPath;
  label: string;
  kind: "text" | "number" | "textarea" | "select";
  placeholder?: string;
  optional?: boolean;
  options?: Choice[];
  visible?: (r: BookReturn) => boolean;
};

export type StepType =
  | "intro"
  | "choice"
  | "yesno"
  | "text"
  | "textarea"
  | "number"
  | "form"
  | "chips"
  | "checklist"
  | "budget"
  | "channels"
  | "ai"
  | "review"
  | "file";

export type AiKind =
  | "titles"
  | "logline"
  | "synopsis"
  | "blurb"
  | "keywords"
  | "coverBrief"
  | "outline"
  | "bio";

export interface StepDef {
  id: string;
  sectionId: string;
  title: string;
  prompt: string;
  why: string;
  type: StepType;
  path?: FieldPath;
  choices?: Choice[];
  fields?: FormField[];
  chipOptions?: Choice[];
  aiKind?: AiKind;
  placeholder?: string;
  optional?: boolean;
  visible?: (r: BookReturn) => boolean;
  complete: (r: BookReturn) => boolean;
}

export interface SectionDef {
  id: string;
  number: string;
  label: string;
  railLabel: string;
  visible?: (r: BookReturn) => boolean;
}

export const SECTIONS: SectionDef[] = [
  { id: "house", number: "01", label: "Your house", railLabel: "House" },
  { id: "title", number: "02", label: "This title", railLabel: "Title" },
  { id: "class", number: "03", label: "Classification", railLabel: "Class" },
  { id: "rights", number: "04", label: "Rights & contracts", railLabel: "Rights" },
  { id: "ms", number: "05", label: "Manuscript", railLabel: "Manuscript" },
  { id: "edit", number: "06", label: "Editorial gates", railLabel: "Editorial" },
  { id: "meta", number: "07", label: "Metadata packet", railLabel: "Metadata" },
  { id: "design", number: "08", label: "Design & production", railLabel: "Design" },
  { id: "audio", number: "09", label: "Audiobook", railLabel: "Audio" },
  { id: "budget", number: "10", label: "Budget", railLabel: "Budget" },
  { id: "dist", number: "11", label: "Distribution", railLabel: "Distribution" },
  { id: "market", number: "12", label: "Go to market", railLabel: "Market" },
  { id: "review", number: "13", label: "Review & file", railLabel: "File" },
];

const filled = (v: unknown) =>
  !(v === "" || v === null || v === undefined || (Array.isArray(v) && v.length === 0));

export const STEPS: StepDef[] = [
  {
    id: "house.welcome",
    sectionId: "house",
    title: "Let’s file this title",
    prompt:
      "This is a return for one book — idea to market. We’ll ask only what this title needs, skip what it doesn’t, and stop you before you file a gap.",
    why: "A title that skips a gate becomes a catalog problem. One return, one book, every time.",
    type: "intro",
    complete: () => true,
  },
  {
    id: "house.imprint",
    sectionId: "house",
    title: "Which imprint carries it?",
    prompt: "Every title lives on one imprint. This decides the storefront, the cover language, and the quality bar.",
    why: "Romance, children, comics, world languages, and the flagship literary list do not share a cover system or a P&L.",
    type: "choice",
    path: "imprint",
    choices: [
      { value: "mangu", label: "MANGU", blurb: "Flagship literary house. Fiction, nonfiction, poetry." },
      { value: "mangu_romance", label: "MANGU Romance", blurb: "The commercial engine. Heat levels live here." },
      { value: "mangu_children", label: "MANGU Children", blurb: "Picture books through middle grade." },
      { value: "mangu_comics", label: "MANGU Comics", blurb: "Graphic novels and sequential art." },
      { value: "mangu_world", label: "MANGU World", blurb: "Not English-first. Translations and originals." },
    ],
    complete: (r) => filled(r.imprint),
  },
  {
    id: "house.operator",
    sectionId: "house",
    title: "Who is filing this return?",
    prompt: "Name the operator of record. Interns can draft. Only an operator files.",
    why: "The house is small. A named operator is how a title survives a handoff.",
    type: "form",
    fields: [
      { path: "operator", label: "Operator of record", kind: "text", placeholder: "Your name" },
      {
        path: "catalogSeason",
        label: "Catalog season",
        kind: "text",
        placeholder: "Oct 2026 – Dec 2027",
      },
    ],
    complete: (r) => filled(r.operator),
  },
  {
    id: "house.rules",
    sectionId: "house",
    title: "House rules that apply as we walk",
    prompt:
      "Five imprints. Twenty languages. About $100 a title. Six thousand English, six thousand world. About 60% romance. YA stays closed-door. KDP Select is a trade. Ingram needs a house ISBN.",
    why: "Rules surface at the moment they apply — not in a binder nobody opens.",
    type: "intro",
    complete: () => true,
  },
  {
    id: "title.working",
    sectionId: "title",
    title: "What’s the working title?",
    prompt: "Don’t wait for the perfect one. Working titles file. Final titles print.",
    why: "Every packet, cover brief, and ISBN request hangs off a name. You can change it later in Metadata.",
    type: "ai",
    path: "workingTitle",
    aiKind: "titles",
    placeholder: "The Midnight Ledger",
    complete: (r) => filled(r.workingTitle),
  },
  {
    id: "title.author",
    sectionId: "title",
    title: "Who is the author of record?",
    prompt: "Legal name on the contract, and the name on the cover if they differ.",
    why: "Contracts, copyright pages, and storefronts disagree the moment these two names drift.",
    type: "form",
    fields: [
      { path: "authorName", label: "Legal name", kind: "text", placeholder: "Kavita Deshmukh" },
      {
        path: "authorPenName",
        label: "Cover / pen name",
        kind: "text",
        placeholder: "Same as legal, if so",
        optional: true,
      },
    ],
    complete: (r) => filled(r.authorName),
  },
  {
    id: "title.series",
    sectionId: "title",
    title: "Is it part of a series?",
    prompt: "A series number without a series name is how book 2 never finds book 1.",
    why: "Storefronts, metadata, and the read-through plan all hang off this call.",
    type: "yesno",
    path: "hasSeries",
    complete: (r) => r.hasSeries === true || r.hasSeries === false,
  },
  {
    id: "title.language",
    sectionId: "title",
    title: "What language is this edition?",
    prompt: "One return, one language edition. A Hindi original and its English translation are two returns.",
    why: "The house target is 6,000 English and 6,000 across the other nineteen. Mixing editions in one packet breaks metadata.",
    type: "choice",
    path: "language",
    choices: [
      { value: "en", label: "English" },
      { value: "hi", label: "Hindi · हिन्दी" },
      { value: "zh", label: "Mandarin · 中文" },
      { value: "es", label: "Spanish · Español" },
      { value: "fr", label: "French · Français" },
      { value: "ar", label: "Arabic · العربية" },
      { value: "bn", label: "Bengali · বাংলা" },
      { value: "pt", label: "Portuguese · Português" },
      { value: "ru", label: "Russian · Русский" },
      { value: "ur", label: "Urdu · اردو" },
      { value: "id", label: "Indonesian" },
      { value: "de", label: "German · Deutsch" },
      { value: "ja", label: "Japanese · 日本語" },
      { value: "sw", label: "Swahili · Kiswahili" },
      { value: "mr", label: "Marathi · मराठी" },
      { value: "te", label: "Telugu · తెలుగు" },
      { value: "ta", label: "Tamil · தமிழ்" },
      { value: "tr", label: "Turkish · Türkçe" },
      { value: "vi", label: "Vietnamese · Tiếng Việt" },
      { value: "ko", label: "Korean · 한국어" },
    ],
    complete: (r) => filled(r.language),
  },
  {
    id: "title.translation",
    sectionId: "title",
    title: "Is this a translation of another edition?",
    prompt: "If yes, we’ll keep the source language and source title with the packet.",
    why: "Retailers, libraries, and the World imprint need the source to link editions.",
    type: "yesno",
    path: "isTranslation",
    complete: (r) => r.isTranslation === true || r.isTranslation === false,
  },
  {
    id: "title.source",
    sectionId: "title",
    title: "Name the source edition",
    prompt: "Source language and the title as it was first filed.",
    why: "Without this, the two editions never meet in the catalog.",
    type: "form",
    visible: (r) => r.isTranslation === true && !skipsSourceTitle(r),
    fields: [
      { path: "sourceLanguage", label: "Source language code", kind: "text", placeholder: "hi" },
      { path: "sourceTitle", label: "Source title", kind: "text", placeholder: "नदी का घर" },
    ],
    complete: (r) => filled(r.sourceTitle),
  },
  {
    id: "class.type",
    sectionId: "class",
    title: "What kind of book is it?",
    prompt: "Form first. Genre second. The form decides word count, trim, and cost.",
    why: "A picture book billed as a novel will blow the $100 cap before the cover is drawn.",
    type: "choice",
    path: "contentType",
    choices: [
      { value: "novel", label: "Novel", blurb: "Full-length fiction, typically 70–110k." },
      { value: "novella", label: "Novella", blurb: "17–40k. Fast, sharp, commercial." },
      { value: "short_story", label: "Short story", blurb: "A single piece, or a collection of one." },
      { value: "poetry", label: "Poetry", blurb: "Collection or long poem. Design-led." },
      { value: "childrens", label: "Children’s", blurb: "Picture book, early reader, middle grade." },
      { value: "comics", label: "Comics / graphic", blurb: "Sequential art. Color is a cost event." },
      { value: "nonfiction", label: "Nonfiction", blurb: "Memoir, history, how-to, faith, business." },
      { value: "academic", label: "Paper / academic", blurb: "Monograph or long paper." },
      { value: "anthology", label: "Anthology", blurb: "Many contributors. Rights per piece." },
    ],
    complete: (r) => filled(r.contentType),
  },
  {
    id: "class.fiction",
    sectionId: "class",
    title: "Fiction or not?",
    prompt: "Some forms sit on the line. Call it now so BISAC doesn’t fight LCGFT later.",
    why: "Retail shelves and library headings split here. Don’t leave it to the intern on upload day.",
    type: "yesno",
    path: "fiction",
    complete: (r) => r.fiction === true || r.fiction === false,
  },
  {
    id: "class.genre",
    sectionId: "class",
    title: "What’s the primary genre?",
    prompt: "Pick the one a bookseller would shelve it under. Subgenres can ride along.",
    why: "The catalog mix is about 60% romance and commercial fiction. Call it honestly.",
    type: "choice",
    path: "primaryGenre",
    choices: GENRES.map((g) => ({
      value: g.id,
      label: g.label,
      blurb: `${g.bisac} · ${g.lcgft}`,
    })),
    complete: (r) => filled(r.primaryGenre),
  },
  {
    id: "class.sub",
    sectionId: "class",
    title: "Any subgenres?",
    prompt: "Optional. Two is plenty. Three is a sign the primary is wrong.",
    why: "Keywords and BISAC #2/#3 come from here. More than three and Amazon ignores you.",
    type: "chips",
    path: "subgenres",
    optional: true,
    chipOptions: GENRES.map((g) => ({ value: g.id, label: g.label })),
    complete: () => true,
  },
  {
    id: "class.audience",
    sectionId: "class",
    title: "Who is it for?",
    prompt: "Audience is not a marketing mood. It is an age gate, a library heading, and a cover system.",
    why: "A steamy adult romance filed as YA is a recall. A picture book filed as adult is a waste.",
    type: "choice",
    path: "audience",
    choices: [
      { value: "adult", label: "Adult", blurb: "Default for the house." },
      { value: "ya", label: "Young adult", blurb: "Approx. 13–18. Heat stays closed-door." },
      { value: "middle_grade", label: "Middle grade", blurb: "Approx. 8–12." },
      { value: "children", label: "Children", blurb: "Picture and early reader." },
      { value: "academic", label: "Academic", blurb: "Cited, not shelved with novels." },
    ],
    complete: (r) => filled(r.audience),
  },
  {
    id: "class.age",
    sectionId: "class",
    title: "What age band prints on the cover?",
    prompt: "Children’s and middle grade need a printed band. Be specific.",
    why: "Buyers, teachers, and Amazon’s age filter all read this number.",
    type: "text",
    path: "ageRange",
    placeholder: "3–6  or  8–12",
    visible: (r) => r.audience === "children" || r.audience === "middle_grade",
    complete: (r) => filled(r.ageRange),
  },
  {
    id: "class.heat",
    sectionId: "class",
    title: "What’s the heat level?",
    prompt: "Say it in house language so the cover, blurb, and storefront agree.",
    why: "Romance without a heat call is how a sweet reader meets an explicit scene.",
    type: "choice",
    path: "heatLevel",
    visible: (r) => !skipsHeat(r),
    choices: [
      { value: "none", label: "None", blurb: "No romantic heat." },
      { value: "sweet", label: "Sweet", blurb: "Kissing, yearning, fade-to-black." },
      { value: "warm", label: "Warm", blurb: "Chemistry, one or two closed-door scenes." },
      { value: "steamy", label: "Steamy", blurb: "On-page, commercial romance default." },
      { value: "explicit", label: "Explicit", blurb: "Open-door, detailed. Age-gate it." },
    ],
    complete: (r) => filled(r.heatLevel),
  },
  {
    id: "rights.origin",
    sectionId: "rights",
    title: "Where does the work come from?",
    prompt: "Original, translation, public domain, or a licensed reprint. This is the rights spine.",
    why: "A public-domain text with a new translation is not a free-for-all. The translation is ours. The source is not.",
    type: "choice",
    path: "origin",
    choices: [
      { value: "original", label: "Original", blurb: "Created for this house, or acquired as original." },
      { value: "translation", label: "Translation", blurb: "A new language edition of an existing work." },
      { value: "public_domain", label: "Public domain", blurb: "Source is free. Our edition, notes, and design are not." },
      { value: "licensed", label: "Licensed", blurb: "We hold a term, a territory, a language — not the copyright." },
    ],
    complete: (r) => filled(r.origin),
  },
  {
    id: "rights.pd",
    sectionId: "rights",
    title: "When did the source enter the public domain?",
    prompt: "Year of death of the author plus the rule that applies. If you’re guessing, stop.",
    why: "A wrong PD call is a lawsuit. The house does not guess at 1959-era rights.",
    type: "number",
    path: "publicDomainYear",
    placeholder: "1998",
    visible: (r) => r.origin === "public_domain",
    complete: (r) => (r.publicDomainYear ?? 0) > 1800,
  },
  {
    id: "rights.territory",
    sectionId: "rights",
    title: "Which territories?",
    prompt: "World is the default. Narrow it only if the contract is narrow.",
    why: "Ingram, KDP, and the storefront all inherit this. A US-only title cannot quietly go world.",
    type: "chips",
    path: "territories",
    chipOptions: [
      { value: "world", label: "World" },
      { value: "us_can", label: "US & Canada" },
      { value: "uk_eu", label: "UK & EU" },
      { value: "in", label: "India" },
      { value: "latam", label: "Latin America" },
      { value: "mena", label: "MENA" },
      { value: "sea", label: "Southeast Asia" },
      { value: "africa", label: "Africa" },
    ],
    complete: (r) => r.territories.length > 0,
  },
  {
    id: "rights.exclusive",
    sectionId: "rights",
    title: "KDP Select exclusivity?",
    prompt: "Ninety days of Amazon ebook exclusivity. Higher royalty. No Apple, Google, or Kobo ebook.",
    why: "Select is a trade. Wide is a house preference. Don’t check both.",
    type: "yesno",
    path: "exclusiveKdp",
    complete: (r) => r.exclusiveKdp === true || r.exclusiveKdp === false,
  },
  {
    id: "rights.bundle",
    sectionId: "rights",
    title: "Which rights does the house hold?",
    prompt: "Audio, translation, film/TV, merchandising, first serial. Unchecked means we do not hold it — and we will skip the work that follows.",
    why: "A right we do not hold cannot appear on a cover, in ACX, or in a foreign deal sheet.",
    type: "form",
    fields: [
      {
        path: "audioRights",
        label: "Audio rights",
        kind: "select",
        options: [
          { value: "true", label: "House holds audio" },
          { value: "false", label: "We do not hold audio" },
        ],
      },
      {
        path: "translationRights",
        label: "Translation rights",
        kind: "select",
        options: [
          { value: "true", label: "House holds translation" },
          { value: "false", label: "We do not hold translation" },
        ],
      },
      {
        path: "filmRights",
        label: "Film / TV",
        kind: "select",
        optional: true,
        options: [
          { value: "true", label: "House holds film/TV" },
          { value: "false", label: "Not held / not yet" },
        ],
      },
      {
        path: "merchRights",
        label: "Merchandising",
        kind: "select",
        optional: true,
        options: [
          { value: "true", label: "House holds merch" },
          { value: "false", label: "Not held / not yet" },
        ],
      },
      {
        path: "termYears",
        label: "Term (years)",
        kind: "number",
        optional: true,
        placeholder: "7",
      },
      {
        path: "reversionTrigger",
        label: "Reversion trigger",
        kind: "text",
        optional: true,
        placeholder: "Out of print 18 months, or sales under 50 copies/year",
      },
      {
        path: "rightsHolderChain",
        label: "Rights-holder chain",
        kind: "textarea",
        optional: true,
        placeholder: "Author → MANGU Publishers (this edition)",
      },
    ],
    complete: () => true,
    optional: true,
  },
  {
    id: "rights.contract",
    sectionId: "rights",
    title: "Is the author contract signed?",
    prompt: "We do not file a title on a handshake. Public-domain editions can skip the author signature, not the house sign-off.",
    why: "Royalty statements, takedowns, and the intern’s first week all depend on a signed paper.",
    type: "form",
    fields: [
      {
        path: "contractSigned",
        label: "Contract signed",
        kind: "select",
        options: [
          { value: "true", label: "Yes, signed" },
          { value: "false", label: "Not yet" },
        ],
      },
      {
        path: "royaltyAuthorPct",
        label: "Author royalty % (net)",
        kind: "number",
        placeholder: "50",
      },
      {
        path: "copyrightHolder",
        label: "Copyright holder as printed",
        kind: "text",
        placeholder: "MANGU Publishers",
      },
    ],
    complete: (r) =>
      r.origin === "public_domain"
        ? filled(r.copyrightHolder)
        : r.contractSigned === true && filled(r.copyrightHolder),
  },
  {
    id: "ms.status",
    sectionId: "ms",
    title: "Where is the manuscript?",
    prompt: "Idea, outline, draft, revised, or final. Be grimly honest.",
    why: "A cover on an outline is a pretty lie. Production starts at revised, files at final.",
    type: "choice",
    path: "manuscriptStatus",
    choices: [
      { value: "idea", label: "Idea", blurb: "A sentence and a hunger. Not yet a book." },
      { value: "outline", label: "Outline", blurb: "Beats, chapters, a spine." },
      { value: "draft", label: "Draft", blurb: "A full pass exists. It is not done." },
      { value: "revised", label: "Revised", blurb: "Developmental work has landed." },
      { value: "final", label: "Final", blurb: "Copy is locked enough to typeset." },
    ],
    complete: (r) => filled(r.manuscriptStatus),
  },
  {
    id: "ms.logline",
    sectionId: "ms",
    title: "Give it a logline",
    prompt: "One or two sentences. Character, want, obstacle. No jacket poetry yet.",
    why: "The logline is how an intern, an agent, and a cover designer all mean the same book.",
    type: "ai",
    path: "logline",
    aiKind: "logline",
    placeholder: "She was hired to close the books. He had already cooked them.",
    complete: (r) => r.logline.trim().length >= 20,
  },
  {
    id: "ms.synopsis",
    sectionId: "ms",
    title: "Write the house synopsis",
    prompt: "A page, not a jacket. Spoil the ending. This is for editorial, not the store.",
    why: "Developmental editors cannot work from a blurb. The house synopsis is the working document.",
    type: "ai",
    path: "synopsis",
    aiKind: "synopsis",
    placeholder: "Start with the inciting incident. End with the last image.",
    complete: (r) => r.synopsis.trim().length >= 80,
  },
  {
    id: "ms.counts",
    sectionId: "ms",
    title: "Word count and chapters",
    prompt: "Current counts, not hoped-for counts.",
    why: "Page count, print cost, audio hours, and the $100 cap all start here.",
    type: "form",
    fields: [
      { path: "wordCount", label: "Word count", kind: "number", placeholder: "80000" },
      { path: "chapterCount", label: "Chapters / scenes", kind: "number", placeholder: "24" },
    ],
    complete: (r) => r.wordCount > 0,
  },
  {
    id: "ms.file",
    sectionId: "ms",
    title: "Manuscript file of record",
    prompt: "Name the file, the version, the format. We store the metadata on this device — the manuscript itself stays with production.",
    why: "A packet that cannot point at a file is a packet that cannot go to typesetting.",
    type: "form",
    optional: true,
    fields: [
      { path: "manuscriptFileName", label: "File name", kind: "text", optional: true, placeholder: "midnight-ledger-v4.docx" },
      { path: "manuscriptVersion", label: "Version", kind: "text", optional: true, placeholder: "4.2" },
      {
        path: "manuscriptFormat",
        label: "Format",
        kind: "select",
        optional: true,
        options: [
          { value: "docx", label: "DOCX" },
          { value: "md", label: "Markdown" },
          { value: "idml", label: "InDesign / IDML" },
          { value: "pdf", label: "PDF" },
          { value: "cbz", label: "CBZ / sequential" },
        ],
      },
      {
        path: "frontMatter",
        label: "Front matter present",
        kind: "select",
        optional: true,
        options: [
          { value: "true", label: "Yes" },
          { value: "false", label: "Not yet" },
        ],
      },
      {
        path: "copyrightPage",
        label: "Copyright page drafted",
        kind: "select",
        optional: true,
        options: [
          { value: "true", label: "Yes" },
          { value: "false", label: "Not yet" },
        ],
      },
      {
        path: "contentWarnings",
        label: "Content warnings (comma-separated)",
        kind: "text",
        optional: true,
        placeholder: "grief, alcohol, workplace power",
      },
    ],
    complete: () => true,
  },
  {
    id: "ms.outline",
    sectionId: "ms",
    title: "Paste or draft the outline",
    prompt: "Acts, issues, chapters — whatever the form uses. Optional once the manuscript is final.",
    why: "Comics and picture books live and die on the outline. Novels can travel lighter after revision.",
    type: "ai",
    path: "outline",
    aiKind: "outline",
    optional: true,
    placeholder: "Act I …",
    complete: (r) =>
      r.manuscriptStatus === "final" || r.manuscriptStatus === "revised" || r.outline.trim().length > 0,
  },
  {
    id: "edit.passes",
    sectionId: "edit",
    title: "Editorial passes",
    prompt: "Mark each gate. Skipped is allowed for picture books (line) and poetry (developmental) — not for copy and proof.",
    why: "The quality bar is not trash. Four named gates, none of them vibes.",
    type: "checklist",
    complete: (r) =>
      (r.editorial.copy === "passed" || r.editorial.copy === "in_progress") &&
      r.editorial.developmental !== "not_started",
  },
  {
    id: "edit.quality",
    sectionId: "edit",
    title: "Does it clear the quality bar?",
    prompt: "Pass, needs work, or unscored. Unscored cannot file.",
    why: "The house is not a slurry mill. Six thousand English titles still have to be books.",
    type: "choice",
    path: "qualityBar",
    choices: [
      { value: "pass", label: "Pass", blurb: "I would put this in a reader’s hand." },
      { value: "needs_work", label: "Needs work", blurb: "Do not file. Name the work in notes." },
      { value: "unscored", label: "Unscored", blurb: "Too early to call." },
    ],
    complete: (r) => r.qualityBar === "pass" || r.qualityBar === "needs_work",
  },
  {
    id: "edit.notes",
    sectionId: "edit",
    title: "What still needs work?",
    prompt: "Name the problem so the next intern does not have to guess.",
    why: "A needs-work stamp without a note is how titles rot in the drawer.",
    type: "textarea",
    path: "qualityNotes",
    visible: (r) => r.qualityBar === "needs_work",
    placeholder: "Copyedit in flight. Legal still needs the grandfather-manuscript note.",
    complete: (r) => r.qualityNotes.trim().length > 8,
  },
  {
    id: "edit.legal",
    sectionId: "edit",
    title: "Sensitivity and legal",
    prompt: "Not every title needs both. Children’s, memoir, and anything with a living third party usually do.",
    why: "A missed libel check is more expensive than the entire $100 budget.",
    type: "form",
    fields: [
      {
        path: "sensitivityRead",
        label: "Sensitivity read",
        kind: "select",
        options: [
          { value: "true", label: "Done" },
          { value: "false", label: "Not needed / not yet" },
        ],
      },
      {
        path: "legalReview",
        label: "Legal review",
        kind: "select",
        options: [
          { value: "true", label: "Done" },
          { value: "false", label: "Not needed / not yet" },
        ],
      },
    ],
    complete: (r) => r.sensitivityRead !== null && r.legalReview !== null,
  },
  {
    id: "edit.nonfiction",
    sectionId: "edit",
    title: "Indexing and fact-check",
    prompt: "Non-fiction only. Fiction hides this gate. A monograph without an index is a paper, not a book.",
    why: "Indexers and fact-checkers are how a $100 title still earns a library heading.",
    type: "form",
    visible: (r) => isNonfiction(r) && !skipsIndexing(r),
    fields: [
      {
        path: "editorial.indexing",
        label: "Indexing",
        kind: "select",
        options: [
          { value: "not_started", label: "Not started" },
          { value: "in_progress", label: "In progress" },
          { value: "passed", label: "Passed" },
          { value: "skipped", label: "Skipped" },
        ],
      },
      {
        path: "editorial.factCheck",
        label: "Fact-check",
        kind: "select",
        options: [
          { value: "not_started", label: "Not started" },
          { value: "in_progress", label: "In progress" },
          { value: "passed", label: "Passed" },
          { value: "skipped", label: "Skipped" },
        ],
      },
      {
        path: "editorialMemo",
        label: "Editorial memo",
        kind: "textarea",
        optional: true,
        placeholder: "What the next pass must fix.",
      },
    ],
    complete: () => true,
    optional: true,
  },
  {
    id: "meta.title",
    sectionId: "meta",
    title: "Lock the printed title",
    prompt: "Final title, subtitle, series. This is what Ingram and KDP will show.",
    why: "Working titles are for us. Final titles are for the catalog. Changing them after ISBN is pain.",
    type: "form",
    fields: [
      { path: "finalTitle", label: "Final title", kind: "text", placeholder: "The Midnight Ledger" },
      { path: "subtitle", label: "Subtitle", kind: "text", optional: true, placeholder: "A novel" },
      {
        path: "seriesName",
        label: "Series name",
        kind: "text",
        optional: true,
        visible: (r) => !skipsSeriesFields(r) || r.hasSeries === true,
      },
      {
        path: "seriesNumber",
        label: "Series number",
        kind: "number",
        optional: true,
        placeholder: "1",
        visible: (r) => !skipsSeriesFields(r) || r.hasSeries === true,
      },
    ],
    complete: (r) => filled(r.finalTitle) || filled(r.workingTitle),
  },
  {
    id: "meta.blurb",
    sectionId: "meta",
    title: "Jacket / Amazon description",
    prompt: "Sell the book. No spoilers past the first act. Short paragraphs.",
    why: "This is the conversion copy. The synopsis stays in-house.",
    type: "ai",
    path: "description",
    aiKind: "blurb",
    complete: (r) => r.description.trim().length >= 80,
  },
  {
    id: "meta.keywords",
    sectionId: "meta",
    title: "Seven keywords",
    prompt: "Amazon’s seven. Specific, searchable, not the title repeated.",
    why: "Categories get you in the door. Keywords get you found.",
    type: "ai",
    path: "keywords",
    aiKind: "keywords",
    complete: (r) => r.keywords.length >= 3,
  },
  {
    id: "meta.bio",
    sectionId: "meta",
    title: "Author bio for this edition",
    prompt: "50–90 words. For this book, not a CV.",
    why: "The bio is a merchandising field. Keep it short enough to print.",
    type: "ai",
    path: "authorBio",
    aiKind: "bio",
    complete: (r) => r.authorBio.trim().length >= 20,
  },
  {
    id: "meta.digital",
    sectionId: "meta",
    title: "Digital-only, or print as well?",
    prompt: "Digital-only skips the print ISBN and the Ingram rules. A print edition needs a house ISBN before Ingram will take it.",
    why: "No print ISBN, no Ingram. Do not check both.",
    type: "yesno",
    path: "digitalOnly",
    complete: (r) => r.digitalOnly === true || r.digitalOnly === false,
  },
  {
    id: "meta.isbn",
    sectionId: "meta",
    title: "ISBNs",
    prompt: "Print and ebook at minimum if this title will leave the house store. Audio if you’re producing it.",
    why: "Libraries, Ingram, and any bookstore require a print ISBN. KDP can issue an ASIN; the house prefers its own block.",
    type: "form",
    optional: true,
    fields: [
      {
        path: "isbnPrint",
        label: "Print ISBN",
        kind: "text",
        optional: true,
        placeholder: "978-1-948200-01-1",
        visible: (r) => r.digitalOnly !== true,
      },
      { path: "isbnEbook", label: "Ebook ISBN", kind: "text", optional: true, placeholder: "978-1-948200-02-8" },
      { path: "isbnAudio", label: "Audio ISBN", kind: "text", optional: true },
      { path: "drm", label: "DRM", kind: "select", optional: true, options: [
        { value: "true", label: "DRM on" },
        { value: "false", label: "DRM off (house default for EPUB)" },
      ] },
      { path: "publicationDate", label: "Publication date", kind: "text", optional: true, placeholder: "2026-12-01" },
      { path: "onSaleDate", label: "On-sale date", kind: "text", optional: true, placeholder: "2026-12-01" },
      { path: "credits", label: "Additional credits", kind: "textarea", optional: true, placeholder: "Cover, interior, translator…" },
    ],
    complete: () => true,
  },
  {
    id: "design.trim",
    sectionId: "design",
    title: "Trim, color, paper",
    prompt: "The physical object. Picture books are usually square and color. Novels are trade and cream.",
    why: "Trim and color are the two print-cost levers. Color is how a children’s book blows the cap.",
    type: "form",
    fields: [
      {
        path: "trimSize",
        label: "Trim",
        kind: "select",
        options: [
          { value: "pocket", label: "Mass-market pocket · 4.25 × 6.87" },
          { value: "trade", label: "Trade paperback · 5.5 × 8.5" },
          { value: "digest", label: "Digest · 5.25 × 8" },
          { value: "letter", label: "US Letter · 8.5 × 11" },
          { value: "square", label: "Square · 8.5 × 8.5" },
          { value: "custom", label: "Custom" },
        ],
      },
      {
        path: "interiorColor",
        label: "Interior",
        kind: "select",
        options: [
          { value: "bw", label: "Black & white" },
          { value: "color", label: "Color" },
        ],
      },
      {
        path: "paperType",
        label: "Paper",
        kind: "select",
        options: [
          { value: "cream", label: "Cream (novels)" },
          { value: "white", label: "White (art, children, comics)" },
        ],
      },
    ],
    complete: (r) => filled(r.trimSize) && filled(r.interiorColor),
  },
  {
    id: "design.cover",
    sectionId: "design",
    title: "Cover status and brief",
    prompt: "A brief even if the art is not started. Tell the designer the object, the palette, and what not to do.",
    why: "Stock-couple romance covers and AI sludge are how a 1959 house looks like a 2024 mill.",
    type: "ai",
    path: "coverBrief",
    aiKind: "coverBrief",
    complete: (r) => r.coverBrief.trim().length >= 20,
  },
  {
    id: "design.coverstatus",
    sectionId: "design",
    title: "How far is the cover?",
    prompt: "Not started, briefed, draft, or final.",
    why: "You cannot file a title with a blank rectangle where the shoppers look first.",
    type: "choice",
    path: "coverStatus",
    choices: [
      { value: "not_started", label: "Not started" },
      { value: "briefed", label: "Briefed" },
      { value: "draft", label: "Draft in review" },
      { value: "final", label: "Final" },
    ],
    complete: (r) => r.coverStatus === "draft" || r.coverStatus === "final" || r.coverStatus === "briefed",
  },
  {
    id: "design.production",
    sectionId: "design",
    title: "Interior template and cover designer",
    prompt: "Name the designer and the interior template. Spine width is computed from page count and paper.",
    why: "A graphic novel and a trade novel do not share a template. Iron Feather is digest; Bela is square.",
    type: "form",
    optional: true,
    fields: [
      { path: "coverDesigner", label: "Cover designer", kind: "text", optional: true, placeholder: "House / freelancer name" },
      {
        path: "interiorTemplate",
        label: "Interior template",
        kind: "select",
        optional: true,
        options: [
          { value: "trade_serif", label: "Trade serif (novels)" },
          { value: "square_picture", label: "Square picture book" },
          { value: "digest_comics", label: "Digest comics" },
          { value: "letter_academic", label: "US Letter academic" },
          { value: "custom", label: "Custom" },
        ],
      },
      { path: "backCoverCopy", label: "Back-cover copy", kind: "textarea", optional: true, placeholder: "Often the short description plus a blurb line." },
    ],
    complete: () => true,
  },
  {
    id: "design.files",
    sectionId: "design",
    title: "Interior files",
    prompt: "EPUB for every ebook channel. Print PDF for Ingram and KDP paperback.",
    why: "A Word file is not a book. The house files EPUBs and print PDFs.",
    type: "form",
    fields: [
      {
        path: "epubReady",
        label: "EPUB ready",
        kind: "select",
        options: [
          { value: "true", label: "Yes" },
          { value: "false", label: "Not yet" },
        ],
      },
      {
        path: "printPdfReady",
        label: "Print PDF ready",
        kind: "select",
        options: [
          { value: "true", label: "Yes" },
          { value: "false", label: "Not yet" },
        ],
      },
    ],
    complete: (r) => r.epubReady !== null && r.printPdfReady !== null,
  },
  {
    id: "audio.decide",
    sectionId: "audio",
    title: "Are we producing audio?",
    prompt: "Audio is a second product. Skip it cleanly if the budget or the form says no.",
    why: "A half-narrated file is worse than no audio. Picture books often skip; romance often doesn’t.",
    type: "yesno",
    path: "produceAudio",
    complete: (r) => r.produceAudio === true || r.produceAudio === false,
  },
  {
    id: "audio.cast",
    sectionId: "audio",
    title: "Narrator and mastering",
    prompt: "Name the voice. Dual POV needs two. Mastered means ready to upload, not ‘pretty good.’",
    why: "ACX and the house player both reject noisy rooms and mismatched loudness.",
    type: "form",
    visible: (r) => r.produceAudio === true,
    fields: [
      { path: "narrator", label: "Narrator / cast", kind: "text", placeholder: "Dual POV, two voices" },
      { path: "audioHours", label: "Finished hours", kind: "number", placeholder: "9.2" },
      {
        path: "audioMastered",
        label: "Mastered",
        kind: "select",
        options: [
          { value: "true", label: "Yes, mastered" },
          { value: "false", label: "Not yet" },
        ],
      },
    ],
    complete: (r) => filled(r.narrator) && r.audioMastered !== null,
  },
  {
    id: "budget.cap",
    sectionId: "budget",
    title: "What’s the cap for this title?",
    prompt: "The house default is $100. Raise it only with a reason in notes — color interiors, licensed art, union audio.",
    why: "Six thousand titles at $100 is a factory. Six thousand titles at $400 is a wish.",
    type: "number",
    path: "budgetCap",
    placeholder: "100",
    complete: (r) => r.budgetCap > 0,
  },
  {
    id: "budget.lines",
    sectionId: "budget",
    title: "Line the costs",
    prompt: "Put real dollars against editorial, cover, ISBN, interior, audio, marketing. Leave zero where you haven’t spent.",
    why: "A cap without lines is a slogan. The return shows you when the picture-book color already spent the year.",
    type: "budget",
    complete: (r) => true,
  },
  {
    id: "dist.channels",
    sectionId: "dist",
    title: "Where does it sell?",
    prompt: "KDP and the MANGU store are the default. Wide channels conflict with KDP Select.",
    why: "A Select title on Apple is a compliance letter. Check the boxes as if Amazon will audit them, because they will.",
    type: "channels",
    complete: (r) => r.channels.kdp || r.channels.manguStore || r.channels.ingram,
  },
  {
    id: "dist.pricing",
    sectionId: "dist",
    title: "List prices",
    prompt: "Ebook, print, audio. House defaults: $4.99 / $14.99 / $9.99. Children’s and comics differ.",
    why: "Price is a merchandising decision and a royalty decision. Don’t invent it on upload day.",
    type: "form",
    fields: [
      { path: "listPriceEbook", label: "Ebook USD", kind: "number", placeholder: "4.99" },
      { path: "listPricePrint", label: "Print USD", kind: "number", placeholder: "14.99" },
      { path: "listPriceAudio", label: "Audio USD", kind: "number", placeholder: "9.99", optional: true },
    ],
    complete: (r) => (r.listPriceEbook ?? 0) > 0 && (r.listPricePrint ?? 0) > 0,
  },
  {
    id: "dist.preorder",
    sectionId: "dist",
    title: "Pre-order?",
    prompt: "A pre-order window is how a launch date becomes a sales date. Optional. Warned if you skip it.",
    why: "Retailers want the ONIX live before the day. A date with no pre-order is a hard launch.",
    type: "yesno",
    path: "preorder",
    complete: (r) => r.preorder === true || r.preorder === false,
  },
  {
    id: "market.launch",
    sectionId: "market",
    title: "What’s the launch date?",
    prompt: "A real calendar day. Preorder windows need this six weeks out.",
    why: "Without a date, nothing downstream — ARC, newsletter, Goodreads — has a clock.",
    type: "text",
    path: "launchDate",
    placeholder: "2026-12-01",
    complete: (r) => filled(r.launchDate),
  },
  {
    id: "market.arc",
    sectionId: "market",
    title: "ARCs and Goodreads",
    prompt: "Advance copies and a Goodreads edition. Both are optional. Both are how romance actually sells.",
    why: "The house watches Goodreads popular lists. An edition that isn’t there cannot be ranked.",
    type: "form",
    fields: [
      {
        path: "arcProgram",
        label: "ARC / NetGalley / house list",
        kind: "select",
        options: [
          { value: "true", label: "Yes, sending ARCs" },
          { value: "false", label: "No ARC this title" },
        ],
      },
      {
        path: "goodreads",
        label: "Goodreads edition",
        kind: "select",
        options: [
          { value: "true", label: "Yes, create / claim" },
          { value: "false", label: "Not this title" },
        ],
      },
      {
        path: "marketingNotes",
        label: "Launch notes",
        kind: "textarea",
        optional: true,
        placeholder: "Newsletter, tropes, anniversary tie-in…",
      },
    ],
    complete: (r) => r.arcProgram !== null && r.goodreads !== null,
  },
  {
    id: "market.targets",
    sectionId: "market",
    title: "Launch targets and follow-on",
    prompt: "First 30 days, first 90, series read-through, backlist handoff, paid ads. Optional — warned if empty on a series.",
    why: "A title without a number is a title that cannot be run.",
    type: "form",
    optional: true,
    fields: [
      { path: "first30Target", label: "First-30-day target", kind: "text", optional: true, placeholder: "400 ebook / 80 print" },
      { path: "first90Target", label: "90-day target", kind: "text", optional: true, placeholder: "1,200 ebook" },
      {
        path: "seriesReadthrough",
        label: "Series read-through plan",
        kind: "textarea",
        optional: true,
        visible: (r) => !skipsSeriesFields(r) || Boolean(r.seriesName.trim()),
      },
      { path: "backlistCrossPromo", label: "Backlist cross-promo", kind: "textarea", optional: true },
      { path: "paidAds", label: "Paid ads / BookBub / Freebooksy", kind: "textarea", optional: true },
      {
        path: "bookbub",
        label: "BookBub / promo list",
        kind: "select",
        optional: true,
        options: [
          { value: "true", label: "Yes, queued" },
          { value: "false", label: "Not this title" },
        ],
      },
    ],
    complete: () => true,
  },
  {
    id: "review.issues",
    sectionId: "review",
    title: "We found some things to look at",
    prompt: "This is the house review. Blocking issues must be cleared before you file. Warnings can ride.",
    why: "TurboTax will not e-file a return with a missing SSN. We will not file a book with a missing quality call.",
    type: "review",
    complete: () => true,
  },
  {
    id: "review.file",
    sectionId: "review",
    title: "File this title",
    prompt: "Operator sign-off. After this, the packet is the record of the book as the house intends to publish it.",
    why: "Filing is not printing. It is the house saying: this return is complete enough to enter production.",
    type: "file",
    complete: (r) => r.status === "filed" && r.operatorSignoff,
  },
];

export function isSectionSkipped(sectionId: string, r: BookReturn): boolean {
  if (sectionId === "audio") return autoSkipsAudio(r);
  return false;
}

export function isStepVisible(step: StepDef, r: BookReturn): boolean {
  if (isSectionSkipped(step.sectionId, r)) return false;
  const section = SECTIONS.find((s) => s.id === step.sectionId);
  if (section?.visible && !section.visible(r)) return false;
  if (step.visible && !step.visible(r)) return false;
  return true;
}

export function visibleSteps(r: BookReturn): StepDef[] {
  return STEPS.filter((s) => isStepVisible(s, r));
}

export function visibleSections(_r: BookReturn): SectionDef[] {
  return SECTIONS;
}

export function railSections(): SectionDef[] {
  return SECTIONS;
}

export function stepById(id: string): StepDef | undefined {
  return STEPS.find((s) => s.id === id);
}

export function sectionSteps(sectionId: string, r: BookReturn): StepDef[] {
  return visibleSteps(r).filter((s) => s.sectionId === sectionId);
}

export function sectionProgress(
  sectionId: string,
  r: BookReturn,
): { done: number; total: number; skipped: boolean } {
  if (isSectionSkipped(sectionId, r)) return { done: 0, total: 0, skipped: true };
  const steps = sectionSteps(sectionId, r);
  const done = steps.filter((s) => s.complete(r)).length;
  return { done, total: steps.length, skipped: false };
}

export function nextStepId(current: string, r: BookReturn): string | null {
  const steps = visibleSteps(r);
  const i = steps.findIndex((s) => s.id === current);
  if (i < 0) return steps[0]?.id ?? null;
  return steps[i + 1]?.id ?? null;
}

export function prevStepId(current: string, r: BookReturn): string | null {
  const steps = visibleSteps(r);
  const i = steps.findIndex((s) => s.id === current);
  if (i <= 0) return null;
  return steps[i - 1]?.id ?? null;
}

export function firstIncompleteId(r: BookReturn): string {
  const steps = visibleSteps(r);
  const hit = steps.find((s) => !s.complete(r) && s.type !== "intro" && s.type !== "review" && s.type !== "file");
  return hit?.id ?? steps[0]?.id ?? "house.welcome";
}

export function skipReason(sectionId: string, r: BookReturn): string | null {
  if (sectionId !== "audio" || !autoSkipsAudio(r)) return null;
  if (r.contentType === "childrens" || r.primaryGenre === "picture") return "Picture books skip audio.";
  if (r.contentType === "comics" || r.primaryGenre === "graphic_novel" || r.primaryGenre === "mangaish") {
    return "Graphic novels skip audio.";
  }
  if (r.audioRights === false) return "No audio rights — audio skipped.";
  return "Audio skipped.";
}

