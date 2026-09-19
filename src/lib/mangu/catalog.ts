import type { ContentType, HeatLevel, Imprint } from "./types.ts";

export const IMPRINTS: { id: Imprint; name: string; blurb: string }[] = [
  {
    id: "mangu",
    name: "MANGU",
    blurb: "The flagship literary house. General fiction, nonfiction, poetry.",
  },
  {
    id: "mangu_romance",
    name: "MANGU Romance",
    blurb: "The commercial engine. Contemporary, historical, fantasy, suspense.",
  },
  {
    id: "mangu_children",
    name: "MANGU Children",
    blurb: "Picture books through middle grade. Color interiors, careful age bands.",
  },
  {
    id: "mangu_comics",
    name: "MANGU Comics",
    blurb: "Graphic novels, sequential art, and periodical issues.",
  },
  {
    id: "mangu_world",
    name: "MANGU World",
    blurb: "Translations and originals in the house languages, not English-first.",
  },
];

export const LANGUAGES: { code: string; name: string; native: string; script: string }[] = [
  { code: "en", name: "English", native: "English", script: "Latin" },
  { code: "hi", name: "Hindi", native: "हिन्दी", script: "Devanagari" },
  { code: "zh", name: "Mandarin", native: "中文", script: "Han" },
  { code: "es", name: "Spanish", native: "Español", script: "Latin" },
  { code: "fr", name: "French", native: "Français", script: "Latin" },
  { code: "ar", name: "Arabic", native: "العربية", script: "Arabic" },
  { code: "bn", name: "Bengali", native: "বাংলা", script: "Bengali" },
  { code: "pt", name: "Portuguese", native: "Português", script: "Latin" },
  { code: "ru", name: "Russian", native: "Русский", script: "Cyrillic" },
  { code: "ur", name: "Urdu", native: "اردو", script: "Arabic" },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia", script: "Latin" },
  { code: "de", name: "German", native: "Deutsch", script: "Latin" },
  { code: "ja", name: "Japanese", native: "日本語", script: "Japanese" },
  { code: "sw", name: "Swahili", native: "Kiswahili", script: "Latin" },
  { code: "mr", name: "Marathi", native: "मराठी", script: "Devanagari" },
  { code: "te", name: "Telugu", native: "తెలుగు", script: "Telugu" },
  { code: "ta", name: "Tamil", native: "தமிழ்", script: "Tamil" },
  { code: "tr", name: "Turkish", native: "Türkçe", script: "Latin" },
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt", script: "Latin" },
  { code: "ko", name: "Korean", native: "한국어", script: "Hangul" },
];

export const CONTENT_TYPES: { id: ContentType; label: string; blurb: string }[] = [
  { id: "novel", label: "Novel", blurb: "A full-length work of fiction, typically 70–110k words." },
  { id: "novella", label: "Novella", blurb: "A concentrated story, 17–40k. Fast to produce, sharp to sell." },
  { id: "short_story", label: "Short story", blurb: "A single piece or a collection built around one." },
  { id: "poetry", label: "Poetry", blurb: "A collection or long poem. Design-led interior." },
  { id: "childrens", label: "Children’s book", blurb: "Picture book, early reader, or middle grade." },
  { id: "comics", label: "Comics / graphic", blurb: "Sequential art. Page count and color drive cost." },
  { id: "nonfiction", label: "Nonfiction", blurb: "Memoir, history, how-to, faith, business." },
  { id: "academic", label: "Paper / academic", blurb: "A monograph or long paper with citations." },
  { id: "anthology", label: "Anthology", blurb: "Multiple contributors. Rights per piece." },
];

export const GENRES: { id: string; label: string; family: "romance" | "fiction" | "nonfiction" | "children" | "comics"; bisac: string; lcgft: string }[] = [
  { id: "contemp_romance", label: "Contemporary romance", family: "romance", bisac: "FIC027020", lcgft: "Romance fiction" },
  { id: "hist_romance", label: "Historical romance", family: "romance", bisac: "FIC027050", lcgft: "Historical romance fiction" },
  { id: "romantic_suspense", label: "Romantic suspense", family: "romance", bisac: "FIC027110", lcgft: "Romantic suspense fiction" },
  { id: "fantasy_romance", label: "Fantasy romance", family: "romance", bisac: "FIC027030", lcgft: "Fantasy romance fiction" },
  { id: "romantasy", label: "Romantasy", family: "romance", bisac: "FIC009090", lcgft: "Fantasy fiction" },
  { id: "literary", label: "Literary fiction", family: "fiction", bisac: "FIC019000", lcgft: "Literary fiction" },
  { id: "mystery", label: "Mystery", family: "fiction", bisac: "FIC022000", lcgft: "Detective and mystery fiction" },
  { id: "thriller", label: "Thriller", family: "fiction", bisac: "FIC031000", lcgft: "Thrillers (Fiction)" },
  { id: "hist_fic", label: "Historical fiction", family: "fiction", bisac: "FIC014000", lcgft: "Historical fiction" },
  { id: "sf", label: "Science fiction", family: "fiction", bisac: "FIC028000", lcgft: "Science fiction" },
  { id: "fantasy", label: "Fantasy", family: "fiction", bisac: "FIC009000", lcgft: "Fantasy fiction" },
  { id: "horror", label: "Horror", family: "fiction", bisac: "FIC015000", lcgft: "Horror fiction" },
  { id: "womens", label: "Women’s fiction", family: "fiction", bisac: "FIC044000", lcgft: "Domestic fiction" },
  { id: "general_fic", label: "General fiction", family: "fiction", bisac: "FIC000000", lcgft: "Fiction" },
  { id: "memoir", label: "Memoir", family: "nonfiction", bisac: "BIO026000", lcgft: "Autobiographies" },
  { id: "history", label: "History", family: "nonfiction", bisac: "HIS000000", lcgft: "Informational works" },
  { id: "selfhelp", label: "Self-help", family: "nonfiction", bisac: "SEL027000", lcgft: "Self-help publications" },
  { id: "business", label: "Business", family: "nonfiction", bisac: "BUS000000", lcgft: "Handbooks and manuals" },
  { id: "faith", label: "Religion & spirituality", family: "nonfiction", bisac: "REL000000", lcgft: "Religious materials" },
  { id: "picture", label: "Picture book", family: "children", bisac: "JUV000000", lcgft: "Picture books" },
  { id: "early_reader", label: "Early reader", family: "children", bisac: "JUV043000", lcgft: "Readers (Publications)" },
  { id: "mg", label: "Middle grade", family: "children", bisac: "JUV000000", lcgft: "Novels" },
  { id: "ya", label: "Young adult", family: "children", bisac: "YAF000000", lcgft: "Novels" },
  { id: "graphic_novel", label: "Graphic novel", family: "comics", bisac: "CGN006000", lcgft: "Graphic novels" },
  { id: "mangaish", label: "Manga-inspired", family: "comics", bisac: "CGN004050", lcgft: "Comics (Graphic works)" },
];

export const HEAT: { id: HeatLevel; label: string; blurb: string }[] = [
  { id: "none", label: "None", blurb: "No romantic heat. Closed door is not even on the table." },
  { id: "sweet", label: "Sweet", blurb: "Kissing, yearning, fade-to-black or none. Clean lists." },
  { id: "warm", label: "Warm", blurb: "On-page chemistry, one or two closed-door scenes." },
  { id: "steamy", label: "Steamy", blurb: "Multiple on-page scenes. Standard commercial romance." },
  { id: "explicit", label: "Explicit", blurb: "Open-door and detailed. Age-gate the storefront." },
];

export const TERRITORIES = [
  { id: "world", label: "World English + translation rights" },
  { id: "us_can", label: "United States & Canada" },
  { id: "uk_eu", label: "United Kingdom & EU" },
  { id: "in", label: "India" },
  { id: "latam", label: "Latin America" },
  { id: "mena", label: "Middle East & North Africa" },
  { id: "sea", label: "Southeast Asia" },
  { id: "africa", label: "Africa" },
];

export const TRIM_SIZES: { id: string; label: string; spec: string }[] = [
  { id: "pocket", label: "Mass-market pocket", spec: "4.25 × 6.87 in" },
  { id: "trade", label: "Trade paperback", spec: "5.5 × 8.5 in" },
  { id: "digest", label: "Digest", spec: "5.25 × 8 in" },
  { id: "letter", label: "US Letter", spec: "8.5 × 11 in" },
  { id: "square", label: "Square picture", spec: "8.5 × 8.5 in" },
  { id: "custom", label: "Custom", spec: "Specify in notes" },
];

export const CHANNELS: { id: keyof import("./types.ts").Channels; label: string; blurb: string; exclusiveConflict?: boolean }[] = [
  { id: "kdp", label: "Amazon KDP", blurb: "The default storefront. 35–70% ebook, print on demand." },
  { id: "ingram", label: "IngramSpark", blurb: "Bookstores, libraries, extended print. House-quality interiors." },
  { id: "apple", label: "Apple Books", blurb: "Requires EPUB. Conflicts with KDP Select exclusivity.", exclusiveConflict: true },
  { id: "google", label: "Google Play Books", blurb: "Wide ebook. Conflicts with KDP Select.", exclusiveConflict: true },
  { id: "kobo", label: "Kobo", blurb: "Canada and international ebook. Conflicts with KDP Select.", exclusiveConflict: true },
  { id: "manguStore", label: "MANGU store", blurb: "Direct on mangu-publishers.com. Full margin. Stripe." },
  { id: "libraries", label: "Libraries / OverDrive", blurb: "One-copy one-user or metered. ISBN required." },
  { id: "d2d", label: "Draft2Digital", blurb: "Aggregator for wide ebook. Conflicts with KDP Select.", exclusiveConflict: true },
  { id: "barnesNoble", label: "Barnes & Noble Press", blurb: "Nook and B&N shop-in. Conflicts with KDP Select.", exclusiveConflict: true },
];

export function languageByCode(code: string) {
  return LANGUAGES.find((l) => l.code === code);
}

export function genreById(id: string) {
  return GENRES.find((g) => g.id === id);
}

export function imprintById(id: Imprint) {
  return IMPRINTS.find((i) => i.id === id);
}
