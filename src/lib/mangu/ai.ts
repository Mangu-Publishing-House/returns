import { createServerFn } from "@tanstack/react-start";
import type { AiKind } from "./steps.ts";

export type AiSnapshot = {
  workingTitle: string;
  finalTitle: string;
  authorName: string;
  language: string;
  imprint: string;
  contentType: string;
  primaryGenre: string;
  audience: string;
  heatLevel: string;
  origin: string;
  logline: string;
  synopsis: string;
  wordCount: number;
  outline: string;
  description: string;
  authorBio: string;
  coverBrief: string;
  isTranslation: boolean;
  sourceTitle: string;
};

const KIND_INSTRUCTIONS: Record<AiKind, string> = {
  titles:
    "Propose 6 working titles. Literary, specific, no clickbait colons if you can help it. Mix English with the edition language if it isn't English. Return a numbered list only.",
  logline:
    "Write 3 logline options. One or two sentences each. Character, want, obstacle. No jacket poetry. Return a numbered list.",
  synopsis:
    "Write a house synopsis (350–500 words). Spoil the ending. This is for editorial, not the store. Plain paragraphs, no headings.",
  blurb:
    "Write a storefront / Amazon description. 120–180 words. Short paragraphs. Sell the first act. No spoiler past the midpoint. No emoji.",
  keywords:
    "Return exactly 7 Amazon-style keywords or short phrases, comma-separated, no numbering. Specific and searchable. Do not repeat the title.",
  coverBrief:
    "Write a cover brief a designer can use: objects, setting, palette (ink, cream, slate — no purple, no gold, no neon), typography note, and what to avoid (no stock couples, no AI sludge, no photoreal children). 120–180 words.",
  outline:
    "Write a three-act outline with chapter or scene beats matching the form (novel, picture book, comics). Terse. Spoil everything.",
  bio: "Write a 60–90 word author bio for this edition. Third person. For this book, not a CV.",
};

export const generateCopy = createServerFn({ method: "POST" })
  .validator((input: { kind: AiKind; snapshot: AiSnapshot }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "House AI is not available in this environment." };
    }

    const system =
      "You are the senior editor at MANGU Publishers, a boutique American literary house founded in 1959 in Mumbai. Quality bar is not trash. Catalog mix is about 60% romance and commercial fiction; the rest is the full house. Budget is tight (~$100/title). Voice: calm, specific, editorial. No emoji. No purple marketing language. No 'delve', 'tapestry', or 'unforgettable journey'.";

    const user = `${KIND_INSTRUCTIONS[data.kind]}

Title packet:
${JSON.stringify(data.snapshot, null, 2)}`;

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          max_tokens: 900,
          temperature: 0.8,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) {
        return { ok: false as const, error: `Editor unavailable (${res.status}).` };
      }
      const body = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const text = body.choices?.[0]?.message?.content?.trim() ?? "";
      if (!text) return { ok: false as const, error: "The editor returned a blank page." };
      return { ok: true as const, text };
    } catch {
      return { ok: false as const, error: "Could not reach the house editor." };
    }
  });

export function snapshotFrom(r: {
  workingTitle: string;
  finalTitle: string;
  authorName: string;
  language: string;
  imprint: string;
  contentType: string;
  primaryGenre: string;
  audience: string;
  heatLevel: string;
  origin: string;
  logline: string;
  synopsis: string;
  wordCount: number;
  outline: string;
  description: string;
  authorBio: string;
  coverBrief: string;
  isTranslation: boolean;
  sourceTitle: string;
}): AiSnapshot {
  return {
    workingTitle: r.workingTitle,
    finalTitle: r.finalTitle,
    authorName: r.authorName,
    language: r.language,
    imprint: r.imprint,
    contentType: r.contentType,
    primaryGenre: r.primaryGenre,
    audience: r.audience,
    heatLevel: r.heatLevel,
    origin: r.origin,
    logline: r.logline,
    synopsis: r.synopsis,
    wordCount: r.wordCount,
    outline: r.outline,
    description: r.description,
    authorBio: r.authorBio,
    coverBrief: r.coverBrief,
    isTranslation: r.isTranslation,
    sourceTitle: r.sourceTitle,
  };
}
