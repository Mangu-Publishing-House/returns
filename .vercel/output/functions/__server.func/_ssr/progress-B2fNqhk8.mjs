import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { s as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-B2fNqhk8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatMoney(n, digits = 0) {
	return `${n < 0 ? "−" : ""}$${Math.abs(n).toLocaleString("en-US", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	})}`;
}
function formatNumber(n) {
	return n.toLocaleString("en-US");
}
function HouseMark({ className, invert = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-7", invert ? "text-rail-fg" : "text-ink", className),
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "1.5",
			y: "1.5",
			width: "29",
			height: "29",
			rx: "3",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: "16",
			y: "22",
			textAnchor: "middle",
			fontFamily: "Fraunces, Georgia, serif",
			fontSize: "16",
			fontWeight: "500",
			fill: "currentColor",
			children: "M"
		})]
	});
}
function Stamp({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex rotate-[-8deg] items-center justify-center rounded-sm border-2 border-sage px-2 py-0.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-sage", className),
		children
	});
}
function uid(prefix = "r") {
	return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}
var DEFAULT_HOUSE = {
	operatorName: "House Operator",
	fiscalSeason: "Oct 2026 – Dec 2027",
	englishTarget: 6e3,
	worldTarget: 6e3,
	budgetPerTitle: 100
};
var DEFAULT_EDITORIAL = {
	developmental: "not_started",
	line: "not_started",
	copy: "not_started",
	proof: "not_started",
	indexing: "not_started",
	factCheck: "not_started"
};
var DEFAULT_COSTS = {
	editorial: 0,
	cover: 0,
	isbn: 0,
	interior: 0,
	audio: 0,
	marketing: 0,
	other: 0
};
var DEFAULT_CHANNELS = {
	kdp: true,
	ingram: false,
	apple: false,
	google: false,
	kobo: false,
	manguStore: true,
	libraries: false,
	d2d: false,
	barnesNoble: false
};
function blankReturn(partial = {}) {
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const base = {
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
		filingReceipt: null
	};
	return {
		...base,
		...partial,
		editorial: {
			...DEFAULT_EDITORIAL,
			...partial.editorial
		},
		costs: {
			...DEFAULT_COSTS,
			...partial.costs
		},
		channels: {
			...DEFAULT_CHANNELS,
			...partial.channels
		},
		territories: partial.territories ?? base.territories,
		subgenres: partial.subgenres ?? base.subgenres,
		bisac: partial.bisac ?? base.bisac,
		lcgft: partial.lcgft ?? base.lcgft,
		keywords: partial.keywords ?? base.keywords,
		contentWarnings: partial.contentWarnings ?? base.contentWarnings,
		visitedSteps: partial.visitedSteps ?? base.visitedSteps
	};
}
function displayTitle(r) {
	return r.finalTitle.trim() || r.workingTitle.trim() || "Untitled return";
}
function displayAuthor(r) {
	return r.authorPenName.trim() || r.authorName.trim() || "Author unassigned";
}
function migrateReturn(raw) {
	if (!raw || typeof raw !== "object") return blankReturn();
	return blankReturn(raw);
}
var SEED_RETURNS = [
	blankReturn({
		id: "ret_ledger",
		createdAt: "2026-08-12T14:00:00.000Z",
		updatedAt: "2026-09-14T18:22:00.000Z",
		currentStepId: "meta.isbn",
		status: "needs_info",
		visitedSteps: [
			"house.welcome",
			"house.imprint",
			"house.operator",
			"title.working",
			"title.author",
			"title.language",
			"class.type",
			"class.fiction",
			"class.genre",
			"class.audience",
			"class.heat",
			"rights.origin",
			"rights.territory",
			"rights.exclusive",
			"rights.contract",
			"ms.status",
			"ms.logline",
			"ms.synopsis",
			"ms.counts",
			"ms.outline",
			"edit.passes",
			"edit.quality",
			"edit.legal",
			"meta.title",
			"meta.blurb",
			"meta.keywords",
			"meta.bio",
			"design.trim",
			"design.cover",
			"design.files",
			"audio.decide",
			"budget.cap",
			"budget.lines",
			"dist.channels",
			"dist.pricing",
			"market.launch"
		],
		imprint: "mangu_romance",
		operator: "House Operator",
		workingTitle: "The Midnight Ledger",
		finalTitle: "The Midnight Ledger",
		subtitle: "A novel of accounts and after-hours",
		seriesName: "The Parsippany Papers",
		seriesNumber: 1,
		hasSeries: true,
		authorName: "A. R. Shah",
		authorPenName: "A. R. Shah",
		language: "en",
		contentType: "novel",
		fiction: true,
		primaryGenre: "contemp_romance",
		subgenres: ["romantic_suspense"],
		bisac: ["FIC027020", "FIC027110"],
		lcgft: ["Romance fiction", "Romantic suspense fiction"],
		audience: "adult",
		heatLevel: "steamy",
		origin: "original",
		territories: ["world"],
		exclusiveKdp: false,
		contractSigned: true,
		royaltyAuthorPct: 50,
		copyrightHolder: "MANGU Publishers",
		logline: "A forensic accountant and the night-shift auditor who cooked her books must close the year without closing their hearts.",
		synopsis: "Mira Kline is hired to unwind a boutique publisher’s books before a December audit. The numbers only balance after midnight, when Rahul Mehta — the quiet auditor who has kept the house afloat since a hut in Mumbai became an American imprint — walks her through every ledger. As they reconstruct sixty years of royalty statements, they uncover a missing catalog, a grandfather’s unpublished novel, and a heat neither of them budgeted for. Filing day is December 31. So is the wedding she already said yes to.",
		wordCount: 82400,
		chapterCount: 28,
		outline: "Act I: The engagement party and the first variance.\nAct II: The hut, the missing ISBN block, the night the press flooded.\nAct III: The December filing, the grandfather’s manuscript, the choice.",
		manuscriptStatus: "revised",
		editorial: {
			developmental: "passed",
			line: "passed",
			copy: "in_progress",
			proof: "not_started"
		},
		sensitivityRead: true,
		legalReview: false,
		qualityBar: "needs_work",
		qualityNotes: "Copyedit in flight. Legal still needs the grandfather-manuscript rights note.",
		isbnPrint: "",
		isbnEbook: "",
		keywords: [
			"workplace romance",
			"accountant hero",
			"family business",
			"second chance",
			"holiday deadline",
			"Indian American",
			"publishing house"
		],
		description: "She was hired to close the books. He had already cooked them — with love, and a sixty-year-old secret.\n\nForensic accountant Mira Kline has six weeks to make a family press look solvent. Night-shift auditor Rahul Mehta knows every number except the one that would let him keep her. A steamy, sharp contemporary romance about ledgers, lineage, and the last filing of the year.",
		authorBio: "A. R. Shah writes love stories about work. This is the first novel in The Parsippany Papers.",
		trimSize: "trade",
		interiorColor: "bw",
		paperType: "cream",
		coverStatus: "draft",
		coverBrief: "Night office, a single desk lamp, an open leather ledger, two coffee cups. No couple on the cover. Serif title. Ink and cream.",
		epubReady: false,
		printPdfReady: false,
		produceAudio: true,
		narrator: "TBD — dual POV, two voices",
		audioHours: 9.2,
		audioMastered: false,
		budgetCap: 100,
		costs: {
			editorial: 40,
			cover: 25,
			isbn: 10,
			interior: 15,
			audio: 0,
			marketing: 10,
			other: 0
		},
		channels: {
			kdp: true,
			ingram: true,
			apple: true,
			google: false,
			kobo: false,
			manguStore: true,
			libraries: true
		},
		listPriceEbook: 4.99,
		listPricePrint: 16.99,
		listPriceAudio: 12.99,
		launchDate: "2026-12-01",
		arcProgram: true,
		goodreads: true,
		marketingNotes: "Romance newsletter blast week of 11/17. House anniversary tie-in."
	}),
	blankReturn({
		id: "ret_nadi",
		createdAt: "2026-09-01T09:00:00.000Z",
		updatedAt: "2026-09-10T11:40:00.000Z",
		currentStepId: "ms.synopsis",
		status: "in_progress",
		visitedSteps: [
			"house.welcome",
			"house.imprint",
			"house.operator",
			"title.working",
			"title.author",
			"title.language",
			"title.translation",
			"class.type",
			"class.fiction",
			"class.genre",
			"class.audience",
			"rights.origin"
		],
		imprint: "mangu_world",
		workingTitle: "नदी का घर",
		finalTitle: "",
		subtitle: "",
		authorName: "Kavita Deshmukh",
		language: "hi",
		isTranslation: false,
		sourceLanguage: "",
		sourceTitle: "",
		contentType: "novel",
		fiction: true,
		primaryGenre: "literary",
		subgenres: [],
		audience: "adult",
		heatLevel: "none",
		origin: "original",
		logline: "A widow returns to the house her father built on a drying river and must decide what to carry across.",
		synopsis: "",
		wordCount: 61e3,
		chapterCount: 19,
		manuscriptStatus: "draft",
		produceAudio: false,
		budgetCap: 100,
		costs: {
			editorial: 20,
			cover: 0,
			isbn: 0,
			interior: 0,
			audio: 0,
			marketing: 0,
			other: 0
		},
		listPriceEbook: 3.99,
		listPricePrint: 13.99
	}),
	blankReturn({
		id: "ret_bela",
		createdAt: "2026-07-22T16:10:00.000Z",
		updatedAt: "2026-09-08T08:05:00.000Z",
		currentStepId: "review.issues",
		status: "ready_to_file",
		visitedSteps: [
			"house.welcome",
			"house.imprint",
			"house.operator",
			"title.working",
			"title.author",
			"title.language",
			"class.type",
			"class.fiction",
			"class.genre",
			"class.audience",
			"class.age",
			"rights.origin",
			"rights.territory",
			"rights.exclusive",
			"rights.contract",
			"ms.status",
			"ms.logline",
			"ms.synopsis",
			"ms.counts",
			"edit.passes",
			"edit.quality",
			"edit.legal",
			"meta.title",
			"meta.blurb",
			"meta.keywords",
			"meta.bio",
			"meta.isbn",
			"design.trim",
			"design.cover",
			"design.files",
			"audio.decide",
			"budget.cap",
			"budget.lines",
			"dist.channels",
			"dist.pricing",
			"market.launch",
			"market.arc",
			"review.issues"
		],
		imprint: "mangu_children",
		workingTitle: "A Button for Bela",
		finalTitle: "A Button for Bela",
		authorName: "N. Iyer",
		language: "en",
		contentType: "childrens",
		fiction: true,
		primaryGenre: "picture",
		audience: "children",
		ageRange: "3–6",
		heatLevel: "none",
		origin: "original",
		contractSigned: true,
		exclusiveKdp: false,
		logline: "Bela loses the button that holds her red coat closed, and the whole street helps her find a new one.",
		synopsis: "On the first cold morning, Bela’s red coat will not close. The button is gone. The tailor, the grocer, the bus driver, and a very small dog each offer a button that is almost right. None of them is hers — until she learns that a coat can hold more than one.",
		wordCount: 420,
		chapterCount: 1,
		manuscriptStatus: "final",
		editorial: {
			developmental: "passed",
			line: "skipped",
			copy: "passed",
			proof: "passed"
		},
		sensitivityRead: true,
		legalReview: true,
		qualityBar: "pass",
		isbnPrint: "978-1-948200-01-1",
		isbnEbook: "978-1-948200-02-8",
		keywords: [
			"kindness",
			"community",
			"coat",
			"lost and found",
			"picture book",
			"Indian American",
			"winter"
		],
		description: "Bela’s red coat is missing a button. The whole street has one to spare. A warm picture book about neighbors, almost-right answers, and the coat that can hold more than one.",
		authorBio: "N. Iyer writes for the children who count the buttons on the way to school.",
		trimSize: "square",
		interiorColor: "color",
		paperType: "white",
		coverStatus: "final",
		coverBrief: "Red coat, one empty thread, cream ground, Bela in profile. No photos of children.",
		epubReady: true,
		printPdfReady: true,
		produceAudio: false,
		budgetCap: 100,
		costs: {
			editorial: 20,
			cover: 35,
			isbn: 10,
			interior: 25,
			audio: 0,
			marketing: 8,
			other: 0
		},
		channels: {
			kdp: true,
			ingram: true,
			apple: true,
			google: true,
			kobo: false,
			manguStore: true,
			libraries: true
		},
		listPriceEbook: 2.99,
		listPricePrint: 12.99,
		launchDate: "2026-10-20",
		arcProgram: true,
		goodreads: true,
		preorder: true,
		digitalOnly: false,
		hasSeries: false,
		interiorTemplate: "square_picture",
		drm: false
	}),
	blankReturn({
		id: "ret_feather",
		createdAt: "2026-09-05T12:00:00.000Z",
		updatedAt: "2026-09-13T19:00:00.000Z",
		currentStepId: "design.cover",
		status: "in_progress",
		visitedSteps: [
			"house.welcome",
			"house.imprint",
			"title.working",
			"title.author",
			"title.language",
			"class.type",
			"class.fiction",
			"class.genre",
			"class.audience",
			"rights.origin",
			"ms.status",
			"ms.logline",
			"ms.counts"
		],
		imprint: "mangu_comics",
		workingTitle: "Iron Feather",
		finalTitle: "Iron Feather",
		authorName: "J. Park",
		language: "en",
		contentType: "comics",
		fiction: true,
		primaryGenre: "graphic_novel",
		audience: "ya",
		heatLevel: "none",
		origin: "original",
		logline: "A courier with a metal wing runs black-market letters across a partitioned city.",
		wordCount: 12e3,
		chapterCount: 6,
		manuscriptStatus: "outline",
		produceAudio: false,
		interiorColor: "color",
		trimSize: "digest",
		coverStatus: "briefed",
		coverBrief: "Split city, one iron primary feather catching streetlight. Limited palette: ink, rust, cream.",
		interiorTemplate: "digest_comics",
		hasSeries: false,
		budgetCap: 100,
		costs: {
			editorial: 10,
			cover: 20,
			isbn: 0,
			interior: 40,
			audio: 0,
			marketing: 0,
			other: 0
		},
		listPriceEbook: 6.99,
		listPricePrint: 18.99
	})
];
var IMPRINTS = [
	{
		id: "mangu",
		name: "MANGU",
		blurb: "The flagship literary house. General fiction, nonfiction, poetry."
	},
	{
		id: "mangu_romance",
		name: "MANGU Romance",
		blurb: "The commercial engine. Contemporary, historical, fantasy, suspense."
	},
	{
		id: "mangu_children",
		name: "MANGU Children",
		blurb: "Picture books through middle grade. Color interiors, careful age bands."
	},
	{
		id: "mangu_comics",
		name: "MANGU Comics",
		blurb: "Graphic novels, sequential art, and periodical issues."
	},
	{
		id: "mangu_world",
		name: "MANGU World",
		blurb: "Translations and originals in the house languages, not English-first."
	}
];
var LANGUAGES = [
	{
		code: "en",
		name: "English",
		native: "English",
		script: "Latin"
	},
	{
		code: "hi",
		name: "Hindi",
		native: "हिन्दी",
		script: "Devanagari"
	},
	{
		code: "zh",
		name: "Mandarin",
		native: "中文",
		script: "Han"
	},
	{
		code: "es",
		name: "Spanish",
		native: "Español",
		script: "Latin"
	},
	{
		code: "fr",
		name: "French",
		native: "Français",
		script: "Latin"
	},
	{
		code: "ar",
		name: "Arabic",
		native: "العربية",
		script: "Arabic"
	},
	{
		code: "bn",
		name: "Bengali",
		native: "বাংলা",
		script: "Bengali"
	},
	{
		code: "pt",
		name: "Portuguese",
		native: "Português",
		script: "Latin"
	},
	{
		code: "ru",
		name: "Russian",
		native: "Русский",
		script: "Cyrillic"
	},
	{
		code: "ur",
		name: "Urdu",
		native: "اردو",
		script: "Arabic"
	},
	{
		code: "id",
		name: "Indonesian",
		native: "Bahasa Indonesia",
		script: "Latin"
	},
	{
		code: "de",
		name: "German",
		native: "Deutsch",
		script: "Latin"
	},
	{
		code: "ja",
		name: "Japanese",
		native: "日本語",
		script: "Japanese"
	},
	{
		code: "sw",
		name: "Swahili",
		native: "Kiswahili",
		script: "Latin"
	},
	{
		code: "mr",
		name: "Marathi",
		native: "मराठी",
		script: "Devanagari"
	},
	{
		code: "te",
		name: "Telugu",
		native: "తెలుగు",
		script: "Telugu"
	},
	{
		code: "ta",
		name: "Tamil",
		native: "தமிழ்",
		script: "Tamil"
	},
	{
		code: "tr",
		name: "Turkish",
		native: "Türkçe",
		script: "Latin"
	},
	{
		code: "vi",
		name: "Vietnamese",
		native: "Tiếng Việt",
		script: "Latin"
	},
	{
		code: "ko",
		name: "Korean",
		native: "한국어",
		script: "Hangul"
	}
];
var CONTENT_TYPES = [
	{
		id: "novel",
		label: "Novel",
		blurb: "A full-length work of fiction, typically 70–110k words."
	},
	{
		id: "novella",
		label: "Novella",
		blurb: "A concentrated story, 17–40k. Fast to produce, sharp to sell."
	},
	{
		id: "short_story",
		label: "Short story",
		blurb: "A single piece or a collection built around one."
	},
	{
		id: "poetry",
		label: "Poetry",
		blurb: "A collection or long poem. Design-led interior."
	},
	{
		id: "childrens",
		label: "Children’s book",
		blurb: "Picture book, early reader, or middle grade."
	},
	{
		id: "comics",
		label: "Comics / graphic",
		blurb: "Sequential art. Page count and color drive cost."
	},
	{
		id: "nonfiction",
		label: "Nonfiction",
		blurb: "Memoir, history, how-to, faith, business."
	},
	{
		id: "academic",
		label: "Paper / academic",
		blurb: "A monograph or long paper with citations."
	},
	{
		id: "anthology",
		label: "Anthology",
		blurb: "Multiple contributors. Rights per piece."
	}
];
var GENRES = [
	{
		id: "contemp_romance",
		label: "Contemporary romance",
		family: "romance",
		bisac: "FIC027020",
		lcgft: "Romance fiction"
	},
	{
		id: "hist_romance",
		label: "Historical romance",
		family: "romance",
		bisac: "FIC027050",
		lcgft: "Historical romance fiction"
	},
	{
		id: "romantic_suspense",
		label: "Romantic suspense",
		family: "romance",
		bisac: "FIC027110",
		lcgft: "Romantic suspense fiction"
	},
	{
		id: "fantasy_romance",
		label: "Fantasy romance",
		family: "romance",
		bisac: "FIC027030",
		lcgft: "Fantasy romance fiction"
	},
	{
		id: "romantasy",
		label: "Romantasy",
		family: "romance",
		bisac: "FIC009090",
		lcgft: "Fantasy fiction"
	},
	{
		id: "literary",
		label: "Literary fiction",
		family: "fiction",
		bisac: "FIC019000",
		lcgft: "Literary fiction"
	},
	{
		id: "mystery",
		label: "Mystery",
		family: "fiction",
		bisac: "FIC022000",
		lcgft: "Detective and mystery fiction"
	},
	{
		id: "thriller",
		label: "Thriller",
		family: "fiction",
		bisac: "FIC031000",
		lcgft: "Thrillers (Fiction)"
	},
	{
		id: "hist_fic",
		label: "Historical fiction",
		family: "fiction",
		bisac: "FIC014000",
		lcgft: "Historical fiction"
	},
	{
		id: "sf",
		label: "Science fiction",
		family: "fiction",
		bisac: "FIC028000",
		lcgft: "Science fiction"
	},
	{
		id: "fantasy",
		label: "Fantasy",
		family: "fiction",
		bisac: "FIC009000",
		lcgft: "Fantasy fiction"
	},
	{
		id: "horror",
		label: "Horror",
		family: "fiction",
		bisac: "FIC015000",
		lcgft: "Horror fiction"
	},
	{
		id: "womens",
		label: "Women’s fiction",
		family: "fiction",
		bisac: "FIC044000",
		lcgft: "Domestic fiction"
	},
	{
		id: "general_fic",
		label: "General fiction",
		family: "fiction",
		bisac: "FIC000000",
		lcgft: "Fiction"
	},
	{
		id: "memoir",
		label: "Memoir",
		family: "nonfiction",
		bisac: "BIO026000",
		lcgft: "Autobiographies"
	},
	{
		id: "history",
		label: "History",
		family: "nonfiction",
		bisac: "HIS000000",
		lcgft: "Informational works"
	},
	{
		id: "selfhelp",
		label: "Self-help",
		family: "nonfiction",
		bisac: "SEL027000",
		lcgft: "Self-help publications"
	},
	{
		id: "business",
		label: "Business",
		family: "nonfiction",
		bisac: "BUS000000",
		lcgft: "Handbooks and manuals"
	},
	{
		id: "faith",
		label: "Religion & spirituality",
		family: "nonfiction",
		bisac: "REL000000",
		lcgft: "Religious materials"
	},
	{
		id: "picture",
		label: "Picture book",
		family: "children",
		bisac: "JUV000000",
		lcgft: "Picture books"
	},
	{
		id: "early_reader",
		label: "Early reader",
		family: "children",
		bisac: "JUV043000",
		lcgft: "Readers (Publications)"
	},
	{
		id: "mg",
		label: "Middle grade",
		family: "children",
		bisac: "JUV000000",
		lcgft: "Novels"
	},
	{
		id: "ya",
		label: "Young adult",
		family: "children",
		bisac: "YAF000000",
		lcgft: "Novels"
	},
	{
		id: "graphic_novel",
		label: "Graphic novel",
		family: "comics",
		bisac: "CGN006000",
		lcgft: "Graphic novels"
	},
	{
		id: "mangaish",
		label: "Manga-inspired",
		family: "comics",
		bisac: "CGN004050",
		lcgft: "Comics (Graphic works)"
	}
];
var CHANNELS = [
	{
		id: "kdp",
		label: "Amazon KDP",
		blurb: "The default storefront. 35–70% ebook, print on demand."
	},
	{
		id: "ingram",
		label: "IngramSpark",
		blurb: "Bookstores, libraries, extended print. House-quality interiors."
	},
	{
		id: "apple",
		label: "Apple Books",
		blurb: "Requires EPUB. Conflicts with KDP Select exclusivity.",
		exclusiveConflict: true
	},
	{
		id: "google",
		label: "Google Play Books",
		blurb: "Wide ebook. Conflicts with KDP Select.",
		exclusiveConflict: true
	},
	{
		id: "kobo",
		label: "Kobo",
		blurb: "Canada and international ebook. Conflicts with KDP Select.",
		exclusiveConflict: true
	},
	{
		id: "manguStore",
		label: "MANGU store",
		blurb: "Direct on mangu-publishers.com. Full margin. Stripe."
	},
	{
		id: "libraries",
		label: "Libraries / OverDrive",
		blurb: "One-copy one-user or metered. ISBN required."
	},
	{
		id: "d2d",
		label: "Draft2Digital",
		blurb: "Aggregator for wide ebook. Conflicts with KDP Select.",
		exclusiveConflict: true
	},
	{
		id: "barnesNoble",
		label: "Barnes & Noble Press",
		blurb: "Nook and B&N shop-in. Conflicts with KDP Select.",
		exclusiveConflict: true
	}
];
function languageByCode(code) {
	return LANGUAGES.find((l) => l.code === code);
}
function genreById(id) {
	return GENRES.find((g) => g.id === id);
}
function imprintById(id) {
	return IMPRINTS.find((i) => i.id === id);
}
var HOUSE_IMPRINT_IDS = IMPRINTS.map((i) => i.id);
var HOUSE_LANGUAGE_CODES = LANGUAGES.map((l) => l.code);
function isPictureBook(r) {
	return r.primaryGenre === "picture" || r.contentType === "childrens" && (r.audience === "children" || r.primaryGenre === "picture" || r.primaryGenre === "early_reader");
}
function isGraphicNovel(r) {
	return r.contentType === "comics" || r.primaryGenre === "graphic_novel" || r.primaryGenre === "mangaish";
}
function isMiddleGrade(r) {
	return r.audience === "middle_grade" || r.primaryGenre === "mg";
}
function isNonfiction(r) {
	return r.fiction === false || r.contentType === "nonfiction" || r.contentType === "academic";
}
function isRomance(r) {
	const g = GENRES.find((x) => x.id === r.primaryGenre);
	return r.imprint === "mangu_romance" || g?.family === "romance";
}
function skipsHeat(r) {
	return isPictureBook(r) || isMiddleGrade(r) || r.audience === "children";
}
function autoSkipsAudio(r) {
	if (isPictureBook(r) || isGraphicNovel(r)) return true;
	if (r.audioRights === false) return true;
	return false;
}
function skipsAudio(r) {
	if (autoSkipsAudio(r)) return true;
	if (r.produceAudio === false) return true;
	return false;
}
function skipsSourceTitle(r) {
	return r.isTranslation !== true;
}
function skipsPrintIsbn(r) {
	return r.digitalOnly === true;
}
function skipsIngramRules(r) {
	if (r.digitalOnly === true) return true;
	if (!r.isbnPrint && !r.channels.ingram && !r.channels.libraries) return true;
	return false;
}
function skipsSeriesFields(r) {
	return r.hasSeries !== true && !r.seriesName.trim();
}
function skipsIndexing(r) {
	return !isNonfiction(r);
}
function isValidImprint(id) {
	return HOUSE_IMPRINT_IDS.includes(id);
}
function isValidLanguage(code) {
	return HOUSE_LANGUAGE_CODES.includes(code);
}
function displayTitleOf(r) {
	return r.finalTitle.trim() || r.workingTitle.trim();
}
function normalizeTitle(s) {
	return s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}
function titlesNearDuplicate(a, b) {
	const na = normalizeTitle(a);
	const nb = normalizeTitle(b);
	if (!na || !nb) return false;
	if (na === nb) return false;
	if (na.includes(nb) || nb.includes(na)) return Math.min(na.length, nb.length) / Math.max(na.length, nb.length) >= .72;
	const aw = new Set(na.split(" "));
	const bw = new Set(nb.split(" "));
	let inter = 0;
	for (const w of aw) if (bw.has(w)) inter++;
	const union = (/* @__PURE__ */ new Set([...aw, ...bw])).size;
	return union > 0 && inter / union >= .8 && Math.abs(aw.size - bw.size) <= 1;
}
function catalogDuplicates(r, catalog) {
	const title = normalizeTitle(displayTitleOf(r));
	if (!title) return [];
	return catalog.filter((other) => {
		if (other.id === r.id) return false;
		return normalizeTitle(displayTitleOf(other)) === title;
	});
}
function catalogNearDuplicates(r, catalog) {
	const title = displayTitleOf(r);
	if (!title) return [];
	return catalog.filter((other) => {
		if (other.id === r.id) return false;
		if (normalizeTitle(displayTitleOf(other)) === normalizeTitle(title)) return false;
		return titlesNearDuplicate(title, displayTitleOf(other));
	});
}
var RTL_CODES = /* @__PURE__ */ new Set(["ar", "ur"]);
function editionDir(code) {
	return RTL_CODES.has(code) ? "rtl" : "ltr";
}
function editionLang(code) {
	return {
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
		ko: "ko"
	}[code] ?? "en";
}
var COST_LABELS = {
	editorial: "Editorial",
	cover: "Cover",
	isbn: "ISBN block",
	interior: "Interior / EPUB",
	audio: "Audiobook",
	marketing: "Launch marketing",
	other: "Other"
};
function totalCost(r) {
	return r.costs.editorial + r.costs.cover + r.costs.isbn + r.costs.interior + r.costs.audio + r.costs.marketing + r.costs.other;
}
function estimatedPages(r) {
	if (r.contentType === "childrens" && r.primaryGenre === "picture") return r.wordCount > 0 ? Math.max(24, Math.round(r.wordCount / 40) * 2) : 32;
	if (r.contentType === "comics") return r.wordCount > 0 ? Math.round(r.wordCount / 50) : 120;
	if (!r.wordCount) return 0;
	return Math.max(1, Math.round(r.wordCount / 280));
}
function estimatedAudioHours(r) {
	if (r.audioHours && r.audioHours > 0) return r.audioHours;
	if (!r.wordCount) return 0;
	return Math.round(r.wordCount / 9300 * 10) / 10;
}
function spineWidthMm(r) {
	if (r.spineWidthMm && r.spineWidthMm > 0) return r.spineWidthMm;
	const pages = estimatedPages(r);
	const perPage = r.paperType === "white" ? .11 : .13;
	return Math.round((pages * perPage + .5) * 10) / 10;
}
function unitEconomics(r) {
	const cost = totalCost(r);
	const ebookNet100 = (r.listPriceEbook ?? 0) * .35 * 100;
	const printNet40 = (r.listPricePrint ?? 0) * .4 * 40;
	const audioNet20 = r.produceAudio ? (r.listPriceAudio ?? 0) * .4 * 20 : 0;
	const contribution = ebookNet100 + printNet40 + audioNet20 - cost;
	const perCopy = (r.listPriceEbook ?? 0) * .35;
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
		spineMm: spineWidthMm(r)
	};
}
function digitsOnly(isbn) {
	return isbn.replace(/[^0-9Xx]/g, "").toUpperCase();
}
function isbn13Checksum(digits12) {
	let sum = 0;
	for (let i = 0; i < 12; i++) {
		const n = Number(digits12[i]);
		sum += i % 2 === 0 ? n : n * 3;
	}
	const mod = sum % 10;
	return String(mod === 0 ? 0 : 10 - mod);
}
function inspectIsbn(raw, opts = {}) {
	const trimmed = raw.trim();
	if (!trimmed) return {
		ok: false,
		code: "empty",
		reason: "No ISBN entered."
	};
	const d = digitsOnly(trimmed);
	if (d.length !== 13 || !/^\d{13}$/.test(d)) return {
		ok: false,
		code: "format",
		reason: "ISBN must be 13 digits (ISBN-13). Hyphens are allowed."
	};
	if (isbn13Checksum(d.slice(0, 12)) !== d[12]) return {
		ok: false,
		code: "checksum",
		reason: `ISBN checksum failed. Expected check digit ${isbn13Checksum(d.slice(0, 12))}.`
	};
	if (opts.requiredPrefix && !d.startsWith("9781948200")) return {
		ok: false,
		code: "prefix",
		reason: "Ingram titles must use the house ISBN block 978-1-948200."
	};
	return {
		ok: true,
		digits: d
	};
}
var RULES = [
	{
		id: "BLK-IMPRINT",
		level: "block",
		sectionId: "house",
		stepId: "house.imprint",
		field: "imprint",
		title: "No imprint",
		why: "Every title lives on one of five house imprints.",
		applies: ({ r }) => !r.imprint,
		detail: () => "A title with no imprint cannot enter the catalog."
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
		detail: ({ r }) => `"${r.imprint}" is not a house imprint.`
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
		detail: ({ r }) => r.language ? `"${r.language}" is not one of the twenty house languages.` : "Pick a house language."
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
		detail: () => "Give it a working title so the packet has a name."
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
		}
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
		}
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
		detail: ({ r }) => `“${displayTitleOf(r)}” is ${displayTitleOf(r).length} characters.`
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
		detail: () => "Contracts and the copyright page need a legal name."
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
		detail: () => "Name the source language and the title as it was first filed."
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
		detail: () => "Novel, picture book, comics — pick one."
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
		detail: () => "BISAC and the storefront shelf start here."
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
		detail: () => "Adult, YA, middle grade, children, or academic."
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
		detail: () => "Young adult stays closed-door in this house. Recode audience or heat."
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
		detail: () => "Original, translation, public domain, or licensed."
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
		detail: () => "We do not file on a handshake."
	},
	{
		id: "BLK-SELECT",
		level: "block",
		sectionId: "dist",
		stepId: "dist.channels",
		field: "channels",
		title: "KDP Select conflict",
		why: "Select exclusivity cannot coexist with Apple, Google, or Kobo ebook.",
		applies: ({ r }) => Boolean(r.exclusiveKdp && (r.channels.apple || r.channels.google || r.channels.kobo || r.channels.d2d || r.channels.barnesNoble)),
		detail: () => "Select exclusivity cannot coexist with Apple, Google, Kobo, Draft2Digital, or B&N ebook."
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
		detail: () => "One or two sentences so the house means the same book."
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
		detail: () => "Editorial needs a working synopsis, not a jacket paragraph."
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
		detail: () => "Page count, audio hours, and cost all start here."
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
		detail: () => "Call it: idea, outline, draft, revised, or final."
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
		detail: ({ r }) => r.qualityBar === "needs_work" ? r.qualityNotes || "Marked needs work. File is blocked until it passes." : "Unscored titles cannot file. Walk it through editorial."
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
		detail: ({ r }) => r.editorial.copy === "in_progress" ? "Copyedit is in flight. The packet cannot file until the pass is marked passed." : "Copy and proof are the last two gates before typesetting. Copy must pass."
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
		detail: () => "You can file with proof in flight. You cannot print."
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
		detail: () => "Amazon and the MANGU store need conversion copy."
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
		detail: () => "Three is the floor. Seven is the house habit."
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
		detail: () => "50–90 words for this edition. Optional, but shoppers read it."
	},
	{
		id: "BLK-ISBN-PRINT",
		level: "block",
		sectionId: "meta",
		stepId: "meta.isbn",
		field: "isbnPrint",
		title: "Print ISBN required",
		why: "Ingram and libraries will not take a title without a print ISBN.",
		applies: ({ r }) => !skipsPrintIsbn(r) && !r.isbnPrint.trim() && (r.channels.ingram || r.channels.libraries),
		detail: () => "Ingram and libraries will not take a title without a print ISBN."
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
			return !inspectIsbn(r.isbnPrint, { requiredPrefix: needPrefix }).ok;
		},
		detail: ({ r }) => {
			const inspect = inspectIsbn(r.isbnPrint, { requiredPrefix: r.channels.ingram });
			return inspect.ok ? "ISBN invalid." : inspect.reason;
		}
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
		}
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
		detail: () => "This print ISBN is already assigned to another return."
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
		detail: () => "Even a brief counts. A blank rectangle does not."
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
		detail: () => "You may file at draft. Shoppers will see whatever you upload."
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
		detail: () => "Filing is allowed. Upload is not."
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
		detail: () => "The ebook can file without the audio product."
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
		detail: ({ r }) => `Spend is $${totalCost(r)} against a $${r.budgetCap} cap. Cut a line or raise the cap with an operator note.`
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
		detail: () => "Pick at least KDP, Ingram, or the house store."
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
		detail: () => "Set an ebook list price."
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
			return e > 12.99 || e < .99;
		},
		detail: ({ r }) => `$${r.listPriceEbook} is outside the usual band for this form.`
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
		detail: () => "Preorder and ARC clocks need a day."
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
			const days = (t - Date.now()) / 864e5;
			return days >= 0 && days < 14;
		},
		detail: () => "Launch is inside two weeks. Confirm ARCs and the storefront will make it."
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
		detail: () => "No advance copies. Allowed — noted on the receipt."
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
		detail: () => "No pre-order. You can still file."
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
		detail: () => "Name how book 1 hands the reader to book 2."
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
		detail: () => "Allowed, but confirm it isn’t an accident. Color is the cost event."
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
		detail: () => "Optional. A one-line handoff to another house title is enough."
	}
];
RULES.map((rule) => ({
	id: rule.id,
	level: rule.level,
	sectionId: rule.sectionId,
	stepId: rule.stepId,
	field: rule.field,
	title: rule.title,
	why: rule.why
}));
function issuesFor(r, catalog = []) {
	const ctx = {
		r,
		catalog
	};
	const issues = [];
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
			why: rule.why
		});
	}
	return issues;
}
function blockingIssues(r, catalog = []) {
	return issuesFor(r, catalog).filter((i) => i.level === "block");
}
var SECTIONS = [
	{
		id: "house",
		number: "01",
		label: "Your house",
		railLabel: "House"
	},
	{
		id: "title",
		number: "02",
		label: "This title",
		railLabel: "Title"
	},
	{
		id: "class",
		number: "03",
		label: "Classification",
		railLabel: "Class"
	},
	{
		id: "rights",
		number: "04",
		label: "Rights & contracts",
		railLabel: "Rights"
	},
	{
		id: "ms",
		number: "05",
		label: "Manuscript",
		railLabel: "Manuscript"
	},
	{
		id: "edit",
		number: "06",
		label: "Editorial gates",
		railLabel: "Editorial"
	},
	{
		id: "meta",
		number: "07",
		label: "Metadata packet",
		railLabel: "Metadata"
	},
	{
		id: "design",
		number: "08",
		label: "Design & production",
		railLabel: "Design"
	},
	{
		id: "audio",
		number: "09",
		label: "Audiobook",
		railLabel: "Audio"
	},
	{
		id: "budget",
		number: "10",
		label: "Budget",
		railLabel: "Budget"
	},
	{
		id: "dist",
		number: "11",
		label: "Distribution",
		railLabel: "Distribution"
	},
	{
		id: "market",
		number: "12",
		label: "Go to market",
		railLabel: "Market"
	},
	{
		id: "review",
		number: "13",
		label: "Review & file",
		railLabel: "File"
	}
];
var filled = (v) => !(v === "" || v === null || v === void 0 || Array.isArray(v) && v.length === 0);
var STEPS = [
	{
		id: "house.welcome",
		sectionId: "house",
		title: "Let’s file this title",
		prompt: "This is a return for one book — idea to market. We’ll ask only what this title needs, skip what it doesn’t, and stop you before you file a gap.",
		why: "A title that skips a gate becomes a catalog problem. One return, one book, every time.",
		type: "intro",
		complete: () => true
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
			{
				value: "mangu",
				label: "MANGU",
				blurb: "Flagship literary house. Fiction, nonfiction, poetry."
			},
			{
				value: "mangu_romance",
				label: "MANGU Romance",
				blurb: "The commercial engine. Heat levels live here."
			},
			{
				value: "mangu_children",
				label: "MANGU Children",
				blurb: "Picture books through middle grade."
			},
			{
				value: "mangu_comics",
				label: "MANGU Comics",
				blurb: "Graphic novels and sequential art."
			},
			{
				value: "mangu_world",
				label: "MANGU World",
				blurb: "Not English-first. Translations and originals."
			}
		],
		complete: (r) => filled(r.imprint)
	},
	{
		id: "house.operator",
		sectionId: "house",
		title: "Who is filing this return?",
		prompt: "Name the operator of record. Interns can draft. Only an operator files.",
		why: "The house is small. A named operator is how a title survives a handoff.",
		type: "form",
		fields: [{
			path: "operator",
			label: "Operator of record",
			kind: "text",
			placeholder: "Your name"
		}, {
			path: "catalogSeason",
			label: "Catalog season",
			kind: "text",
			placeholder: "Oct 2026 – Dec 2027"
		}],
		complete: (r) => filled(r.operator)
	},
	{
		id: "house.rules",
		sectionId: "house",
		title: "House rules that apply as we walk",
		prompt: "Five imprints. Twenty languages. About $100 a title. Six thousand English, six thousand world. About 60% romance. YA stays closed-door. KDP Select is a trade. Ingram needs a house ISBN.",
		why: "Rules surface at the moment they apply — not in a binder nobody opens.",
		type: "intro",
		complete: () => true
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
		complete: (r) => filled(r.workingTitle)
	},
	{
		id: "title.author",
		sectionId: "title",
		title: "Who is the author of record?",
		prompt: "Legal name on the contract, and the name on the cover if they differ.",
		why: "Contracts, copyright pages, and storefronts disagree the moment these two names drift.",
		type: "form",
		fields: [{
			path: "authorName",
			label: "Legal name",
			kind: "text",
			placeholder: "Kavita Deshmukh"
		}, {
			path: "authorPenName",
			label: "Cover / pen name",
			kind: "text",
			placeholder: "Same as legal, if so",
			optional: true
		}],
		complete: (r) => filled(r.authorName)
	},
	{
		id: "title.series",
		sectionId: "title",
		title: "Is it part of a series?",
		prompt: "A series number without a series name is how book 2 never finds book 1.",
		why: "Storefronts, metadata, and the read-through plan all hang off this call.",
		type: "yesno",
		path: "hasSeries",
		complete: (r) => r.hasSeries === true || r.hasSeries === false
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
			{
				value: "en",
				label: "English"
			},
			{
				value: "hi",
				label: "Hindi · हिन्दी"
			},
			{
				value: "zh",
				label: "Mandarin · 中文"
			},
			{
				value: "es",
				label: "Spanish · Español"
			},
			{
				value: "fr",
				label: "French · Français"
			},
			{
				value: "ar",
				label: "Arabic · العربية"
			},
			{
				value: "bn",
				label: "Bengali · বাংলা"
			},
			{
				value: "pt",
				label: "Portuguese · Português"
			},
			{
				value: "ru",
				label: "Russian · Русский"
			},
			{
				value: "ur",
				label: "Urdu · اردو"
			},
			{
				value: "id",
				label: "Indonesian"
			},
			{
				value: "de",
				label: "German · Deutsch"
			},
			{
				value: "ja",
				label: "Japanese · 日本語"
			},
			{
				value: "sw",
				label: "Swahili · Kiswahili"
			},
			{
				value: "mr",
				label: "Marathi · मराठी"
			},
			{
				value: "te",
				label: "Telugu · తెలుగు"
			},
			{
				value: "ta",
				label: "Tamil · தமிழ்"
			},
			{
				value: "tr",
				label: "Turkish · Türkçe"
			},
			{
				value: "vi",
				label: "Vietnamese · Tiếng Việt"
			},
			{
				value: "ko",
				label: "Korean · 한국어"
			}
		],
		complete: (r) => filled(r.language)
	},
	{
		id: "title.translation",
		sectionId: "title",
		title: "Is this a translation of another edition?",
		prompt: "If yes, we’ll keep the source language and source title with the packet.",
		why: "Retailers, libraries, and the World imprint need the source to link editions.",
		type: "yesno",
		path: "isTranslation",
		complete: (r) => r.isTranslation === true || r.isTranslation === false
	},
	{
		id: "title.source",
		sectionId: "title",
		title: "Name the source edition",
		prompt: "Source language and the title as it was first filed.",
		why: "Without this, the two editions never meet in the catalog.",
		type: "form",
		visible: (r) => r.isTranslation === true && !skipsSourceTitle(r),
		fields: [{
			path: "sourceLanguage",
			label: "Source language code",
			kind: "text",
			placeholder: "hi"
		}, {
			path: "sourceTitle",
			label: "Source title",
			kind: "text",
			placeholder: "नदी का घर"
		}],
		complete: (r) => filled(r.sourceTitle)
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
			{
				value: "novel",
				label: "Novel",
				blurb: "Full-length fiction, typically 70–110k."
			},
			{
				value: "novella",
				label: "Novella",
				blurb: "17–40k. Fast, sharp, commercial."
			},
			{
				value: "short_story",
				label: "Short story",
				blurb: "A single piece, or a collection of one."
			},
			{
				value: "poetry",
				label: "Poetry",
				blurb: "Collection or long poem. Design-led."
			},
			{
				value: "childrens",
				label: "Children’s",
				blurb: "Picture book, early reader, middle grade."
			},
			{
				value: "comics",
				label: "Comics / graphic",
				blurb: "Sequential art. Color is a cost event."
			},
			{
				value: "nonfiction",
				label: "Nonfiction",
				blurb: "Memoir, history, how-to, faith, business."
			},
			{
				value: "academic",
				label: "Paper / academic",
				blurb: "Monograph or long paper."
			},
			{
				value: "anthology",
				label: "Anthology",
				blurb: "Many contributors. Rights per piece."
			}
		],
		complete: (r) => filled(r.contentType)
	},
	{
		id: "class.fiction",
		sectionId: "class",
		title: "Fiction or not?",
		prompt: "Some forms sit on the line. Call it now so BISAC doesn’t fight LCGFT later.",
		why: "Retail shelves and library headings split here. Don’t leave it to the intern on upload day.",
		type: "yesno",
		path: "fiction",
		complete: (r) => r.fiction === true || r.fiction === false
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
			blurb: `${g.bisac} · ${g.lcgft}`
		})),
		complete: (r) => filled(r.primaryGenre)
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
		chipOptions: GENRES.map((g) => ({
			value: g.id,
			label: g.label
		})),
		complete: () => true
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
			{
				value: "adult",
				label: "Adult",
				blurb: "Default for the house."
			},
			{
				value: "ya",
				label: "Young adult",
				blurb: "Approx. 13–18. Heat stays closed-door."
			},
			{
				value: "middle_grade",
				label: "Middle grade",
				blurb: "Approx. 8–12."
			},
			{
				value: "children",
				label: "Children",
				blurb: "Picture and early reader."
			},
			{
				value: "academic",
				label: "Academic",
				blurb: "Cited, not shelved with novels."
			}
		],
		complete: (r) => filled(r.audience)
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
		complete: (r) => filled(r.ageRange)
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
			{
				value: "none",
				label: "None",
				blurb: "No romantic heat."
			},
			{
				value: "sweet",
				label: "Sweet",
				blurb: "Kissing, yearning, fade-to-black."
			},
			{
				value: "warm",
				label: "Warm",
				blurb: "Chemistry, one or two closed-door scenes."
			},
			{
				value: "steamy",
				label: "Steamy",
				blurb: "On-page, commercial romance default."
			},
			{
				value: "explicit",
				label: "Explicit",
				blurb: "Open-door, detailed. Age-gate it."
			}
		],
		complete: (r) => filled(r.heatLevel)
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
			{
				value: "original",
				label: "Original",
				blurb: "Created for this house, or acquired as original."
			},
			{
				value: "translation",
				label: "Translation",
				blurb: "A new language edition of an existing work."
			},
			{
				value: "public_domain",
				label: "Public domain",
				blurb: "Source is free. Our edition, notes, and design are not."
			},
			{
				value: "licensed",
				label: "Licensed",
				blurb: "We hold a term, a territory, a language — not the copyright."
			}
		],
		complete: (r) => filled(r.origin)
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
		complete: (r) => (r.publicDomainYear ?? 0) > 1800
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
			{
				value: "world",
				label: "World"
			},
			{
				value: "us_can",
				label: "US & Canada"
			},
			{
				value: "uk_eu",
				label: "UK & EU"
			},
			{
				value: "in",
				label: "India"
			},
			{
				value: "latam",
				label: "Latin America"
			},
			{
				value: "mena",
				label: "MENA"
			},
			{
				value: "sea",
				label: "Southeast Asia"
			},
			{
				value: "africa",
				label: "Africa"
			}
		],
		complete: (r) => r.territories.length > 0
	},
	{
		id: "rights.exclusive",
		sectionId: "rights",
		title: "KDP Select exclusivity?",
		prompt: "Ninety days of Amazon ebook exclusivity. Higher royalty. No Apple, Google, or Kobo ebook.",
		why: "Select is a trade. Wide is a house preference. Don’t check both.",
		type: "yesno",
		path: "exclusiveKdp",
		complete: (r) => r.exclusiveKdp === true || r.exclusiveKdp === false
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
				options: [{
					value: "true",
					label: "House holds audio"
				}, {
					value: "false",
					label: "We do not hold audio"
				}]
			},
			{
				path: "translationRights",
				label: "Translation rights",
				kind: "select",
				options: [{
					value: "true",
					label: "House holds translation"
				}, {
					value: "false",
					label: "We do not hold translation"
				}]
			},
			{
				path: "filmRights",
				label: "Film / TV",
				kind: "select",
				optional: true,
				options: [{
					value: "true",
					label: "House holds film/TV"
				}, {
					value: "false",
					label: "Not held / not yet"
				}]
			},
			{
				path: "merchRights",
				label: "Merchandising",
				kind: "select",
				optional: true,
				options: [{
					value: "true",
					label: "House holds merch"
				}, {
					value: "false",
					label: "Not held / not yet"
				}]
			},
			{
				path: "termYears",
				label: "Term (years)",
				kind: "number",
				optional: true,
				placeholder: "7"
			},
			{
				path: "reversionTrigger",
				label: "Reversion trigger",
				kind: "text",
				optional: true,
				placeholder: "Out of print 18 months, or sales under 50 copies/year"
			},
			{
				path: "rightsHolderChain",
				label: "Rights-holder chain",
				kind: "textarea",
				optional: true,
				placeholder: "Author → MANGU Publishers (this edition)"
			}
		],
		complete: () => true,
		optional: true
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
				options: [{
					value: "true",
					label: "Yes, signed"
				}, {
					value: "false",
					label: "Not yet"
				}]
			},
			{
				path: "royaltyAuthorPct",
				label: "Author royalty % (net)",
				kind: "number",
				placeholder: "50"
			},
			{
				path: "copyrightHolder",
				label: "Copyright holder as printed",
				kind: "text",
				placeholder: "MANGU Publishers"
			}
		],
		complete: (r) => r.origin === "public_domain" ? filled(r.copyrightHolder) : r.contractSigned === true && filled(r.copyrightHolder)
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
			{
				value: "idea",
				label: "Idea",
				blurb: "A sentence and a hunger. Not yet a book."
			},
			{
				value: "outline",
				label: "Outline",
				blurb: "Beats, chapters, a spine."
			},
			{
				value: "draft",
				label: "Draft",
				blurb: "A full pass exists. It is not done."
			},
			{
				value: "revised",
				label: "Revised",
				blurb: "Developmental work has landed."
			},
			{
				value: "final",
				label: "Final",
				blurb: "Copy is locked enough to typeset."
			}
		],
		complete: (r) => filled(r.manuscriptStatus)
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
		complete: (r) => r.logline.trim().length >= 20
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
		complete: (r) => r.synopsis.trim().length >= 80
	},
	{
		id: "ms.counts",
		sectionId: "ms",
		title: "Word count and chapters",
		prompt: "Current counts, not hoped-for counts.",
		why: "Page count, print cost, audio hours, and the $100 cap all start here.",
		type: "form",
		fields: [{
			path: "wordCount",
			label: "Word count",
			kind: "number",
			placeholder: "80000"
		}, {
			path: "chapterCount",
			label: "Chapters / scenes",
			kind: "number",
			placeholder: "24"
		}],
		complete: (r) => r.wordCount > 0
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
			{
				path: "manuscriptFileName",
				label: "File name",
				kind: "text",
				optional: true,
				placeholder: "midnight-ledger-v4.docx"
			},
			{
				path: "manuscriptVersion",
				label: "Version",
				kind: "text",
				optional: true,
				placeholder: "4.2"
			},
			{
				path: "manuscriptFormat",
				label: "Format",
				kind: "select",
				optional: true,
				options: [
					{
						value: "docx",
						label: "DOCX"
					},
					{
						value: "md",
						label: "Markdown"
					},
					{
						value: "idml",
						label: "InDesign / IDML"
					},
					{
						value: "pdf",
						label: "PDF"
					},
					{
						value: "cbz",
						label: "CBZ / sequential"
					}
				]
			},
			{
				path: "frontMatter",
				label: "Front matter present",
				kind: "select",
				optional: true,
				options: [{
					value: "true",
					label: "Yes"
				}, {
					value: "false",
					label: "Not yet"
				}]
			},
			{
				path: "copyrightPage",
				label: "Copyright page drafted",
				kind: "select",
				optional: true,
				options: [{
					value: "true",
					label: "Yes"
				}, {
					value: "false",
					label: "Not yet"
				}]
			},
			{
				path: "contentWarnings",
				label: "Content warnings (comma-separated)",
				kind: "text",
				optional: true,
				placeholder: "grief, alcohol, workplace power"
			}
		],
		complete: () => true
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
		complete: (r) => r.manuscriptStatus === "final" || r.manuscriptStatus === "revised" || r.outline.trim().length > 0
	},
	{
		id: "edit.passes",
		sectionId: "edit",
		title: "Editorial passes",
		prompt: "Mark each gate. Skipped is allowed for picture books (line) and poetry (developmental) — not for copy and proof.",
		why: "The quality bar is not trash. Four named gates, none of them vibes.",
		type: "checklist",
		complete: (r) => (r.editorial.copy === "passed" || r.editorial.copy === "in_progress") && r.editorial.developmental !== "not_started"
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
			{
				value: "pass",
				label: "Pass",
				blurb: "I would put this in a reader’s hand."
			},
			{
				value: "needs_work",
				label: "Needs work",
				blurb: "Do not file. Name the work in notes."
			},
			{
				value: "unscored",
				label: "Unscored",
				blurb: "Too early to call."
			}
		],
		complete: (r) => r.qualityBar === "pass" || r.qualityBar === "needs_work"
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
		complete: (r) => r.qualityNotes.trim().length > 8
	},
	{
		id: "edit.legal",
		sectionId: "edit",
		title: "Sensitivity and legal",
		prompt: "Not every title needs both. Children’s, memoir, and anything with a living third party usually do.",
		why: "A missed libel check is more expensive than the entire $100 budget.",
		type: "form",
		fields: [{
			path: "sensitivityRead",
			label: "Sensitivity read",
			kind: "select",
			options: [{
				value: "true",
				label: "Done"
			}, {
				value: "false",
				label: "Not needed / not yet"
			}]
		}, {
			path: "legalReview",
			label: "Legal review",
			kind: "select",
			options: [{
				value: "true",
				label: "Done"
			}, {
				value: "false",
				label: "Not needed / not yet"
			}]
		}],
		complete: (r) => r.sensitivityRead !== null && r.legalReview !== null
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
					{
						value: "not_started",
						label: "Not started"
					},
					{
						value: "in_progress",
						label: "In progress"
					},
					{
						value: "passed",
						label: "Passed"
					},
					{
						value: "skipped",
						label: "Skipped"
					}
				]
			},
			{
				path: "editorial.factCheck",
				label: "Fact-check",
				kind: "select",
				options: [
					{
						value: "not_started",
						label: "Not started"
					},
					{
						value: "in_progress",
						label: "In progress"
					},
					{
						value: "passed",
						label: "Passed"
					},
					{
						value: "skipped",
						label: "Skipped"
					}
				]
			},
			{
				path: "editorialMemo",
				label: "Editorial memo",
				kind: "textarea",
				optional: true,
				placeholder: "What the next pass must fix."
			}
		],
		complete: () => true,
		optional: true
	},
	{
		id: "meta.title",
		sectionId: "meta",
		title: "Lock the printed title",
		prompt: "Final title, subtitle, series. This is what Ingram and KDP will show.",
		why: "Working titles are for us. Final titles are for the catalog. Changing them after ISBN is pain.",
		type: "form",
		fields: [
			{
				path: "finalTitle",
				label: "Final title",
				kind: "text",
				placeholder: "The Midnight Ledger"
			},
			{
				path: "subtitle",
				label: "Subtitle",
				kind: "text",
				optional: true,
				placeholder: "A novel"
			},
			{
				path: "seriesName",
				label: "Series name",
				kind: "text",
				optional: true,
				visible: (r) => !skipsSeriesFields(r) || r.hasSeries === true
			},
			{
				path: "seriesNumber",
				label: "Series number",
				kind: "number",
				optional: true,
				placeholder: "1",
				visible: (r) => !skipsSeriesFields(r) || r.hasSeries === true
			}
		],
		complete: (r) => filled(r.finalTitle) || filled(r.workingTitle)
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
		complete: (r) => r.description.trim().length >= 80
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
		complete: (r) => r.keywords.length >= 3
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
		complete: (r) => r.authorBio.trim().length >= 20
	},
	{
		id: "meta.digital",
		sectionId: "meta",
		title: "Digital-only, or print as well?",
		prompt: "Digital-only skips the print ISBN and the Ingram rules. A print edition needs a house ISBN before Ingram will take it.",
		why: "No print ISBN, no Ingram. Do not check both.",
		type: "yesno",
		path: "digitalOnly",
		complete: (r) => r.digitalOnly === true || r.digitalOnly === false
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
				visible: (r) => r.digitalOnly !== true
			},
			{
				path: "isbnEbook",
				label: "Ebook ISBN",
				kind: "text",
				optional: true,
				placeholder: "978-1-948200-02-8"
			},
			{
				path: "isbnAudio",
				label: "Audio ISBN",
				kind: "text",
				optional: true
			},
			{
				path: "drm",
				label: "DRM",
				kind: "select",
				optional: true,
				options: [{
					value: "true",
					label: "DRM on"
				}, {
					value: "false",
					label: "DRM off (house default for EPUB)"
				}]
			},
			{
				path: "publicationDate",
				label: "Publication date",
				kind: "text",
				optional: true,
				placeholder: "2026-12-01"
			},
			{
				path: "onSaleDate",
				label: "On-sale date",
				kind: "text",
				optional: true,
				placeholder: "2026-12-01"
			},
			{
				path: "credits",
				label: "Additional credits",
				kind: "textarea",
				optional: true,
				placeholder: "Cover, interior, translator…"
			}
		],
		complete: () => true
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
					{
						value: "pocket",
						label: "Mass-market pocket · 4.25 × 6.87"
					},
					{
						value: "trade",
						label: "Trade paperback · 5.5 × 8.5"
					},
					{
						value: "digest",
						label: "Digest · 5.25 × 8"
					},
					{
						value: "letter",
						label: "US Letter · 8.5 × 11"
					},
					{
						value: "square",
						label: "Square · 8.5 × 8.5"
					},
					{
						value: "custom",
						label: "Custom"
					}
				]
			},
			{
				path: "interiorColor",
				label: "Interior",
				kind: "select",
				options: [{
					value: "bw",
					label: "Black & white"
				}, {
					value: "color",
					label: "Color"
				}]
			},
			{
				path: "paperType",
				label: "Paper",
				kind: "select",
				options: [{
					value: "cream",
					label: "Cream (novels)"
				}, {
					value: "white",
					label: "White (art, children, comics)"
				}]
			}
		],
		complete: (r) => filled(r.trimSize) && filled(r.interiorColor)
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
		complete: (r) => r.coverBrief.trim().length >= 20
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
			{
				value: "not_started",
				label: "Not started"
			},
			{
				value: "briefed",
				label: "Briefed"
			},
			{
				value: "draft",
				label: "Draft in review"
			},
			{
				value: "final",
				label: "Final"
			}
		],
		complete: (r) => r.coverStatus === "draft" || r.coverStatus === "final" || r.coverStatus === "briefed"
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
			{
				path: "coverDesigner",
				label: "Cover designer",
				kind: "text",
				optional: true,
				placeholder: "House / freelancer name"
			},
			{
				path: "interiorTemplate",
				label: "Interior template",
				kind: "select",
				optional: true,
				options: [
					{
						value: "trade_serif",
						label: "Trade serif (novels)"
					},
					{
						value: "square_picture",
						label: "Square picture book"
					},
					{
						value: "digest_comics",
						label: "Digest comics"
					},
					{
						value: "letter_academic",
						label: "US Letter academic"
					},
					{
						value: "custom",
						label: "Custom"
					}
				]
			},
			{
				path: "backCoverCopy",
				label: "Back-cover copy",
				kind: "textarea",
				optional: true,
				placeholder: "Often the short description plus a blurb line."
			}
		],
		complete: () => true
	},
	{
		id: "design.files",
		sectionId: "design",
		title: "Interior files",
		prompt: "EPUB for every ebook channel. Print PDF for Ingram and KDP paperback.",
		why: "A Word file is not a book. The house files EPUBs and print PDFs.",
		type: "form",
		fields: [{
			path: "epubReady",
			label: "EPUB ready",
			kind: "select",
			options: [{
				value: "true",
				label: "Yes"
			}, {
				value: "false",
				label: "Not yet"
			}]
		}, {
			path: "printPdfReady",
			label: "Print PDF ready",
			kind: "select",
			options: [{
				value: "true",
				label: "Yes"
			}, {
				value: "false",
				label: "Not yet"
			}]
		}],
		complete: (r) => r.epubReady !== null && r.printPdfReady !== null
	},
	{
		id: "audio.decide",
		sectionId: "audio",
		title: "Are we producing audio?",
		prompt: "Audio is a second product. Skip it cleanly if the budget or the form says no.",
		why: "A half-narrated file is worse than no audio. Picture books often skip; romance often doesn’t.",
		type: "yesno",
		path: "produceAudio",
		complete: (r) => r.produceAudio === true || r.produceAudio === false
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
			{
				path: "narrator",
				label: "Narrator / cast",
				kind: "text",
				placeholder: "Dual POV, two voices"
			},
			{
				path: "audioHours",
				label: "Finished hours",
				kind: "number",
				placeholder: "9.2"
			},
			{
				path: "audioMastered",
				label: "Mastered",
				kind: "select",
				options: [{
					value: "true",
					label: "Yes, mastered"
				}, {
					value: "false",
					label: "Not yet"
				}]
			}
		],
		complete: (r) => filled(r.narrator) && r.audioMastered !== null
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
		complete: (r) => r.budgetCap > 0
	},
	{
		id: "budget.lines",
		sectionId: "budget",
		title: "Line the costs",
		prompt: "Put real dollars against editorial, cover, ISBN, interior, audio, marketing. Leave zero where you haven’t spent.",
		why: "A cap without lines is a slogan. The return shows you when the picture-book color already spent the year.",
		type: "budget",
		complete: (r) => true
	},
	{
		id: "dist.channels",
		sectionId: "dist",
		title: "Where does it sell?",
		prompt: "KDP and the MANGU store are the default. Wide channels conflict with KDP Select.",
		why: "A Select title on Apple is a compliance letter. Check the boxes as if Amazon will audit them, because they will.",
		type: "channels",
		complete: (r) => r.channels.kdp || r.channels.manguStore || r.channels.ingram
	},
	{
		id: "dist.pricing",
		sectionId: "dist",
		title: "List prices",
		prompt: "Ebook, print, audio. House defaults: $4.99 / $14.99 / $9.99. Children’s and comics differ.",
		why: "Price is a merchandising decision and a royalty decision. Don’t invent it on upload day.",
		type: "form",
		fields: [
			{
				path: "listPriceEbook",
				label: "Ebook USD",
				kind: "number",
				placeholder: "4.99"
			},
			{
				path: "listPricePrint",
				label: "Print USD",
				kind: "number",
				placeholder: "14.99"
			},
			{
				path: "listPriceAudio",
				label: "Audio USD",
				kind: "number",
				placeholder: "9.99",
				optional: true
			}
		],
		complete: (r) => (r.listPriceEbook ?? 0) > 0 && (r.listPricePrint ?? 0) > 0
	},
	{
		id: "dist.preorder",
		sectionId: "dist",
		title: "Pre-order?",
		prompt: "A pre-order window is how a launch date becomes a sales date. Optional. Warned if you skip it.",
		why: "Retailers want the ONIX live before the day. A date with no pre-order is a hard launch.",
		type: "yesno",
		path: "preorder",
		complete: (r) => r.preorder === true || r.preorder === false
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
		complete: (r) => filled(r.launchDate)
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
				options: [{
					value: "true",
					label: "Yes, sending ARCs"
				}, {
					value: "false",
					label: "No ARC this title"
				}]
			},
			{
				path: "goodreads",
				label: "Goodreads edition",
				kind: "select",
				options: [{
					value: "true",
					label: "Yes, create / claim"
				}, {
					value: "false",
					label: "Not this title"
				}]
			},
			{
				path: "marketingNotes",
				label: "Launch notes",
				kind: "textarea",
				optional: true,
				placeholder: "Newsletter, tropes, anniversary tie-in…"
			}
		],
		complete: (r) => r.arcProgram !== null && r.goodreads !== null
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
			{
				path: "first30Target",
				label: "First-30-day target",
				kind: "text",
				optional: true,
				placeholder: "400 ebook / 80 print"
			},
			{
				path: "first90Target",
				label: "90-day target",
				kind: "text",
				optional: true,
				placeholder: "1,200 ebook"
			},
			{
				path: "seriesReadthrough",
				label: "Series read-through plan",
				kind: "textarea",
				optional: true,
				visible: (r) => !skipsSeriesFields(r) || Boolean(r.seriesName.trim())
			},
			{
				path: "backlistCrossPromo",
				label: "Backlist cross-promo",
				kind: "textarea",
				optional: true
			},
			{
				path: "paidAds",
				label: "Paid ads / BookBub / Freebooksy",
				kind: "textarea",
				optional: true
			},
			{
				path: "bookbub",
				label: "BookBub / promo list",
				kind: "select",
				optional: true,
				options: [{
					value: "true",
					label: "Yes, queued"
				}, {
					value: "false",
					label: "Not this title"
				}]
			}
		],
		complete: () => true
	},
	{
		id: "review.issues",
		sectionId: "review",
		title: "We found some things to look at",
		prompt: "This is the house review. Blocking issues must be cleared before you file. Warnings can ride.",
		why: "TurboTax will not e-file a return with a missing SSN. We will not file a book with a missing quality call.",
		type: "review",
		complete: () => true
	},
	{
		id: "review.file",
		sectionId: "review",
		title: "File this title",
		prompt: "Operator sign-off. After this, the packet is the record of the book as the house intends to publish it.",
		why: "Filing is not printing. It is the house saying: this return is complete enough to enter production.",
		type: "file",
		complete: (r) => r.status === "filed" && r.operatorSignoff
	}
];
function isSectionSkipped(sectionId, r) {
	if (sectionId === "audio") return autoSkipsAudio(r);
	return false;
}
function isStepVisible(step, r) {
	if (isSectionSkipped(step.sectionId, r)) return false;
	const section = SECTIONS.find((s) => s.id === step.sectionId);
	if (section?.visible && !section.visible(r)) return false;
	if (step.visible && !step.visible(r)) return false;
	return true;
}
function visibleSteps(r) {
	return STEPS.filter((s) => isStepVisible(s, r));
}
function railSections() {
	return SECTIONS;
}
function stepById(id) {
	return STEPS.find((s) => s.id === id);
}
function sectionSteps(sectionId, r) {
	return visibleSteps(r).filter((s) => s.sectionId === sectionId);
}
function sectionProgress(sectionId, r) {
	if (isSectionSkipped(sectionId, r)) return {
		done: 0,
		total: 0,
		skipped: true
	};
	const steps = sectionSteps(sectionId, r);
	return {
		done: steps.filter((s) => s.complete(r)).length,
		total: steps.length,
		skipped: false
	};
}
function nextStepId(current, r) {
	const steps = visibleSteps(r);
	const i = steps.findIndex((s) => s.id === current);
	if (i < 0) return steps[0]?.id ?? null;
	return steps[i + 1]?.id ?? null;
}
function prevStepId(current, r) {
	const steps = visibleSteps(r);
	const i = steps.findIndex((s) => s.id === current);
	if (i <= 0) return null;
	return steps[i - 1]?.id ?? null;
}
function firstIncompleteId(r) {
	const steps = visibleSteps(r);
	return steps.find((s) => !s.complete(r) && s.type !== "intro" && s.type !== "review" && s.type !== "file")?.id ?? steps[0]?.id ?? "house.welcome";
}
function skipReason(sectionId, r) {
	if (sectionId !== "audio" || !autoSkipsAudio(r)) return null;
	if (r.contentType === "childrens" || r.primaryGenre === "picture") return "Picture books skip audio.";
	if (r.contentType === "comics" || r.primaryGenre === "graphic_novel" || r.primaryGenre === "mangaish") return "Graphic novels skip audio.";
	if (r.audioRights === false) return "No audio rights — audio skipped.";
	return "Audio skipped.";
}
function completeness(r) {
	const steps = visibleSteps(r).filter((s) => s.type !== "intro" && s.type !== "review" && s.type !== "file");
	if (steps.length === 0) return 0;
	const done = steps.filter((s) => s.complete(r)).length;
	return Math.round(done / steps.length * 100);
}
function deriveStatus(r, catalog = []) {
	if (r.status === "filed" && r.operatorSignoff) return "filed";
	const blocking = blockingIssues(r, catalog);
	const pct = completeness(r);
	if (blocking.length === 0 && pct >= 85) return "ready_to_file";
	if (pct >= 50) return "needs_info";
	return "in_progress";
}
function canFile(r, catalog = []) {
	return blockingIssues(r, catalog).length === 0 && r.qualityBar === "pass";
}
function filedPacket(r, catalog = []) {
	const allIssues = issuesFor(r, catalog);
	return {
		house: "MANGU Publishers",
		schema: "mangu.catalog.return.v1",
		filedAt: r.filedAt ?? (/* @__PURE__ */ new Date()).toISOString(),
		status: r.status,
		completeness: completeness(r),
		issues: allIssues,
		receipt: r.filingReceipt,
		title: r.finalTitle || r.workingTitle,
		author: r.authorPenName || r.authorName,
		imprint: r.imprint,
		language: r.language,
		return: r
	};
}
/** Canonical JSON + FNV-1a 32-bit. Sync, deterministic, no WebCrypto. */
function sortValue(v) {
	if (v === null || v === void 0) return null;
	if (Array.isArray(v)) return v.map(sortValue);
	if (typeof v === "object") {
		const o = v;
		const keys = Object.keys(o).sort();
		const out = {};
		for (const k of keys) out[k] = sortValue(o[k]);
		return out;
	}
	return v;
}
function canonicalJson(value) {
	return JSON.stringify(sortValue(value));
}
function fnv1a(str) {
	let h = 2166136261;
	for (let i = 0; i < str.length; i++) {
		h ^= str.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return (h >>> 0).toString(16).padStart(8, "0");
}
function contentHash(value) {
	return `mh_${fnv1a(canonicalJson(value))}`;
}
var VOLATILE_KEYS = /* @__PURE__ */ new Set([
	"updatedAt",
	"currentStepId",
	"visitedSteps",
	"filingReceipt",
	"status",
	"filedAt",
	"operatorSignoff"
]);
function packetContent(r) {
	const out = {};
	for (const k of Object.keys(r).sort()) {
		if (VOLATILE_KEYS.has(k)) continue;
		out[k] = r[k];
	}
	return out;
}
function packetHash(r) {
	return contentHash(packetContent(r));
}
function skippedSectionCount(r) {
	let n = 0;
	if (skipsAudio(r)) n += 1;
	return n;
}
function receiptFrom(r, issues) {
	const skipped = skippedSectionCount(r);
	const warns = issues.filter((i) => i.level === "warn");
	return {
		id: `fil_${r.id}_${Date.now().toString(36)}`,
		filedAt: (/* @__PURE__ */ new Date()).toISOString(),
		operator: r.operator || "House Operator",
		packetHash: packetHash(r),
		filedSectionCount: SECTIONS.length - skipped,
		skippedSectionCount: skipped,
		blockerCount: issues.filter((i) => i.level === "block").length,
		warningCount: warns.length,
		warningIds: warns.map((i) => i.id),
		title: r.finalTitle || r.workingTitle,
		imprint: r.imprint,
		language: r.language
	};
}
var DB_NAME = "mangu-return";
var STORE_NAME = "kv";
var LEGACY_KEY = "mangu-return-v1";
var status = {
	kind: "idb",
	warning: null
};
var memory = /* @__PURE__ */ new Map();
function persistStatus() {
	return status;
}
function openDb() {
	return new Promise((resolve, reject) => {
		const req = indexedDB.open(DB_NAME, 1);
		req.onupgradeneeded = () => {
			const db = req.result;
			if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME);
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}
async function idbGet(name) {
	const db = await openDb();
	return new Promise((resolve, reject) => {
		const req = db.transaction(STORE_NAME, "readonly").objectStore(STORE_NAME).get(name);
		req.onsuccess = () => resolve(req.result ?? null);
		req.onerror = () => reject(req.error);
	});
}
async function idbSet(name, value) {
	const db = await openDb();
	return new Promise((resolve, reject) => {
		const req = db.transaction(STORE_NAME, "readwrite").objectStore(STORE_NAME).put(value, name);
		req.onsuccess = () => resolve();
		req.onerror = () => reject(req.error);
	});
}
async function idbDel(name) {
	const db = await openDb();
	return new Promise((resolve, reject) => {
		const req = db.transaction(STORE_NAME, "readwrite").objectStore(STORE_NAME).delete(name);
		req.onsuccess = () => resolve();
		req.onerror = () => reject(req.error);
	});
}
function localGet(name) {
	try {
		return localStorage.getItem(name);
	} catch {
		return null;
	}
}
function localSet(name, value) {
	localStorage.setItem(name, value);
}
var manguStorage = {
	getItem: async (name) => {
		if (typeof indexedDB !== "undefined") try {
			const fromIdb = await idbGet(name);
			if (fromIdb != null) {
				status = {
					kind: "idb",
					warning: null
				};
				return fromIdb;
			}
			const legacy = localGet(name) ?? localGet(LEGACY_KEY);
			if (legacy) {
				try {
					await idbSet(name, legacy);
				} catch {}
				status = {
					kind: "idb",
					warning: null
				};
				return legacy;
			}
			status = {
				kind: "idb",
				warning: null
			};
			return null;
		} catch {
			const fallback = localGet(name);
			status = {
				kind: "local",
				warning: "IndexedDB is unavailable. Catalog is saving in this browser’s local storage."
			};
			return fallback;
		}
		try {
			const v = localGet(name);
			status = {
				kind: "local",
				warning: "This browser has no IndexedDB. Catalog is saving in local storage."
			};
			return v;
		} catch {
			status = {
				kind: "memory",
				warning: "This browser will not keep the catalog. Export JSON before you close the tab."
			};
			return memory.get(name) ?? null;
		}
	},
	setItem: async (name, value) => {
		if (typeof indexedDB !== "undefined") try {
			await idbSet(name, value);
			status = {
				kind: "idb",
				warning: status.kind === "idb" ? null : status.warning
			};
			return;
		} catch {}
		try {
			localSet(name, value);
			status = {
				kind: "local",
				warning: "Catalog is saving in local storage. Export JSON as a backup."
			};
		} catch {
			memory.set(name, value);
			status = {
				kind: "memory",
				warning: "This browser will not keep the catalog. Export JSON before you close the tab."
			};
		}
	},
	removeItem: async (name) => {
		if (typeof indexedDB !== "undefined") try {
			await idbDel(name);
		} catch {}
		try {
			localStorage.removeItem(name);
		} catch {}
		memory.delete(name);
	}
};
function catalogFor(id, returns) {
	return returns.filter((x) => x.id !== id);
}
function touch(r, patch, catalog) {
	const next = {
		...r,
		...patch,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	if (patch.status !== "filed") {
		const rest = catalog.filter((x) => x.id !== r.id);
		next.status = deriveStatus({
			...next,
			status: next.status === "filed" ? "filed" : "in_progress"
		}, rest);
	}
	return next;
}
function setAtPath(r, path, value) {
	if (path.startsWith("editorial.")) {
		const key = path.split(".")[1];
		return {
			...r,
			editorial: {
				...r.editorial,
				[key]: value
			}
		};
	}
	if (path.startsWith("costs.")) {
		const key = path.split(".")[1];
		const n = typeof value === "number" ? value : Number(value) || 0;
		return {
			...r,
			costs: {
				...r.costs,
				[key]: n
			}
		};
	}
	if (path.startsWith("channels.")) {
		const key = path.split(".")[1];
		return {
			...r,
			channels: {
				...r.channels,
				[key]: Boolean(value)
			}
		};
	}
	const coerced = coerceField(path, value);
	return {
		...r,
		[path]: coerced
	};
}
var NUMERIC = /* @__PURE__ */ new Set([
	"seriesNumber",
	"wordCount",
	"chapterCount",
	"publicDomainYear",
	"royaltyAuthorPct",
	"budgetCap",
	"audioHours",
	"listPriceEbook",
	"listPricePrint",
	"listPriceAudio",
	"termYears",
	"spineWidthMm",
	"printRoyaltyPct",
	"ebookRoyaltyPct",
	"audioRoyaltyPct",
	"printCostPerUnit",
	"audioRoyaltySplit"
]);
function coerceField(path, value) {
	if (value === "true") return true;
	if (value === "false") return false;
	if (path === "contentWarnings" && typeof value === "string") return value.split(/[,;\n]/).map((s) => s.trim()).filter(Boolean);
	if (NUMERIC.has(path)) {
		if (value === "" || value === null || value === void 0) return null;
		const n = typeof value === "number" ? value : Number(value);
		return Number.isFinite(n) ? n : null;
	}
	return value;
}
function auditOf(list, e) {
	return [{
		...e,
		at: (/* @__PURE__ */ new Date()).toISOString()
	}, ...list].slice(0, 200);
}
var useManguStore = create()(persist((set, get) => ({
	hydrated: true,
	persistKind: persistStatus(),
	house: DEFAULT_HOUSE,
	returns: SEED_RETURNS,
	audit: [],
	setHydrated: (v) => set({
		hydrated: v,
		persistKind: persistStatus()
	}),
	refreshPersist: () => set({ persistKind: persistStatus() }),
	patchHouse: (p) => set({ house: {
		...get().house,
		...p
	} }),
	logAudit: (e) => set({ audit: auditOf(get().audit, e) }),
	createReturn: () => {
		const r = blankReturn({
			operator: get().house.operatorName,
			catalogSeason: get().house.fiscalSeason,
			budgetCap: get().house.budgetPerTitle
		});
		set({
			returns: [r, ...get().returns],
			audit: auditOf(get().audit, {
				action: "create",
				returnId: r.id,
				operator: get().house.operatorName
			})
		});
		return r.id;
	},
	duplicateReturn: (id) => {
		const src = get().returns.find((x) => x.id === id);
		if (!src) return null;
		const { id: _omit, createdAt: _c, updatedAt: _u, filedAt: _f, filingReceipt: _fr, ...rest } = src;
		const copy = blankReturn({
			...rest,
			workingTitle: `${displayTitle(src)} (copy)`,
			finalTitle: src.finalTitle ? `${src.finalTitle} (copy)` : "",
			status: "in_progress",
			operatorSignoff: false,
			isbnPrint: "",
			isbnEbook: "",
			isbnAudio: "",
			filingReceipt: null
		});
		set({ returns: [copy, ...get().returns] });
		return copy.id;
	},
	deleteReturn: (id) => set({
		returns: get().returns.filter((r) => r.id !== id),
		audit: auditOf(get().audit, {
			action: "delete",
			returnId: id,
			operator: get().house.operatorName
		})
	}),
	patchReturn: (id, patch) => set({ returns: get().returns.map((r) => r.id === id ? touch(r, patch, catalogFor(id, get().returns)) : r) }),
	setField: ({ id, path, value }) => set({ returns: get().returns.map((r) => {
		if (r.id !== id) return r;
		return touch(setAtPath(r, path, value), {}, catalogFor(id, get().returns));
	}) }),
	visitStep: (id, stepId) => set({ returns: get().returns.map((r) => {
		if (r.id !== id) return r;
		return touch(r, {
			currentStepId: stepId,
			visitedSteps: r.visitedSteps.includes(stepId) ? r.visitedSteps : [...r.visitedSteps, stepId]
		}, catalogFor(id, get().returns));
	}) }),
	fileReturn: (id) => {
		const r = get().returns.find((x) => x.id === id);
		if (!r) return false;
		const catalog = catalogFor(id, get().returns);
		if (blockingIssues(r, catalog).length > 0) return false;
		const receipt = receiptFrom(r, issuesFor(r, catalog));
		set({
			returns: get().returns.map((x) => x.id === id ? {
				...x,
				status: "filed",
				operatorSignoff: true,
				filedAt: receipt.filedAt,
				filingReceipt: receipt,
				updatedAt: receipt.filedAt,
				currentStepId: "review.file"
			} : x),
			audit: auditOf(get().audit, {
				action: "file",
				returnId: id,
				operator: r.operator || get().house.operatorName,
				detail: receipt.packetHash
			})
		});
		return true;
	},
	unfileReturn: (id) => set({
		returns: get().returns.map((r) => r.id === id ? touch({
			...r,
			status: "in_progress",
			operatorSignoff: false,
			filedAt: void 0,
			filingReceipt: null
		}, {}, catalogFor(id, get().returns)) : r),
		audit: auditOf(get().audit, {
			action: "unfile",
			returnId: id,
			operator: get().house.operatorName
		})
	}),
	resetCatalog: () => set({
		returns: SEED_RETURNS.map((r) => migrateReturn(r)),
		house: DEFAULT_HOUSE,
		audit: auditOf(get().audit, {
			action: "restore",
			returnId: "*",
			operator: get().house.operatorName,
			detail: "sample catalog"
		})
	}),
	importReturns: (incoming) => {
		if (!Array.isArray(incoming) || incoming.length === 0) return;
		const migrated = incoming.map((r) => migrateReturn(r));
		set({
			returns: migrated,
			audit: auditOf(get().audit, {
				action: "import",
				returnId: "*",
				operator: get().house.operatorName,
				detail: `${migrated.length} titles`
			})
		});
	}
}), {
	name: "mangu-return-v2",
	storage: createJSONStorage(() => manguStorage),
	partialize: (s) => ({
		house: s.house,
		returns: s.returns,
		audit: s.audit
	}),
	onRehydrateStorage: () => (state) => {
		if (state) {
			state.returns = (state.returns ?? []).map((r) => migrateReturn(r));
			state.setHydrated(true);
		}
	}
}));
function PersistBanner() {
	const persistKind = useManguStore((s) => s.persistKind);
	const refresh = useManguStore((s) => s.refreshPersist);
	(0, import_react.useEffect)(() => {
		refresh();
		const on = () => refresh();
		window.addEventListener("online", on);
		window.addEventListener("offline", on);
		return () => {
			window.removeEventListener("online", on);
			window.removeEventListener("offline", on);
		};
	}, [refresh]);
	const offline = typeof navigator !== "undefined" && navigator.onLine === false;
	const warn = persistKind.warning;
	if (!warn && !offline) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-b border-amber/30 bg-amber/10 px-4 py-2 text-center text-sm text-amber",
		children: offline ? "You are offline. The interview keeps working on this device; export JSON as a backup." : warn
	});
}
var LINKS = [{
	to: "/",
	label: "Returns"
}, {
	to: "/house",
	label: "The house"
}];
function TopBar() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "border-b border-line bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersistBanner, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl items-center gap-6 px-4 py-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-lg leading-none text-ink",
					children: "MANGU Return"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex items-center gap-1",
				children: LINKS.map((l) => {
					const on = pathname === l.to;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: cn("rounded-md px-3 py-2 text-sm font-medium", on ? "bg-surface text-ink" : "text-muted hover:text-ink"),
						children: l.label
					}, l.to);
				})
			})]
		})]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-sm font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			primary: "bg-ink text-bg-elevated hover:bg-ink-soft shadow-[var(--shadow-border)]",
			secondary: "bg-bg-elevated text-ink shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			ghost: "bg-transparent text-ink hover:bg-surface",
			rail: "bg-transparent text-rail-fg hover:bg-rail-active",
			sage: "bg-sage text-sage-fg hover:opacity-90",
			danger: "bg-brick text-bg-elevated hover:opacity-90",
			outline: "border border-line bg-transparent text-ink hover:bg-surface"
		},
		size: {
			sm: "h-9 rounded-md px-3",
			md: "h-11 rounded-md px-4",
			lg: "h-12 rounded-lg px-5 text-base",
			icon: "size-11 rounded-md"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		ref,
		...props
	});
});
Button.displayName = "Button";
function Progress({ value, className, track = "surface" }) {
	const pct = Math.max(0, Math.min(100, value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-1.5 w-full overflow-hidden rounded-full", track === "rail" ? "bg-rail-line" : "bg-line", className),
		role: "progressbar",
		"aria-valuenow": pct,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full rounded-full bg-sage transition-[width] duration-300 ease-[var(--ease-out)]",
			style: { width: `${pct}%` }
		})
	});
}
//#endregion
export { migrateReturn as A, useManguStore as B, formatNumber as C, isSectionSkipped as D, isRomance as E, sectionSteps as F, skipReason as I, stepById as L, prevStepId as M, railSections as N, issuesFor as O, sectionProgress as P, totalCost as R, formatMoney as S, imprintById as T, visibleSteps as V, displayTitle as _, HouseMark as a, filedPacket as b, Progress as c, TopBar as d, canFile as f, displayAuthor as g, contentHash as h, COST_LABELS as i, nextStepId as j, languageByCode as k, SECTIONS as l, completeness as m, CHANNELS as n, IMPRINTS as o, cn as p, CONTENT_TYPES as r, LANGUAGES as s, Button as t, Stamp as u, editionDir as v, genreById as w, firstIncompleteId as x, editionLang as y, unitEconomics as z };
