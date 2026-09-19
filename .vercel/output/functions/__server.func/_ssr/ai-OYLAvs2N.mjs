import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-OYLAvs2N.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var KIND_INSTRUCTIONS = {
	titles: "Propose 6 working titles. Literary, specific, no clickbait colons if you can help it. Mix English with the edition language if it isn't English. Return a numbered list only.",
	logline: "Write 3 logline options. One or two sentences each. Character, want, obstacle. No jacket poetry. Return a numbered list.",
	synopsis: "Write a house synopsis (350–500 words). Spoil the ending. This is for editorial, not the store. Plain paragraphs, no headings.",
	blurb: "Write a storefront / Amazon description. 120–180 words. Short paragraphs. Sell the first act. No spoiler past the midpoint. No emoji.",
	keywords: "Return exactly 7 Amazon-style keywords or short phrases, comma-separated, no numbering. Specific and searchable. Do not repeat the title.",
	coverBrief: "Write a cover brief a designer can use: objects, setting, palette (ink, cream, slate — no purple, no gold, no neon), typography note, and what to avoid (no stock couples, no AI sludge, no photoreal children). 120–180 words.",
	outline: "Write a three-act outline with chapter or scene beats matching the form (novel, picture book, comics). Terse. Spoil everything.",
	bio: "Write a 60–90 word author bio for this edition. Third person. For this book, not a CV."
};
var generateCopy_createServerFn_handler = createServerRpc({
	id: "ab61b8f2af6161b960ace87c70aa968477476c6ccec9e8bbe92b2918a4db4286",
	name: "generateCopy",
	filename: "src/lib/mangu/ai.ts"
}, (opts) => generateCopy.__executeServer(opts));
var generateCopy = createServerFn({ method: "POST" }).validator((input) => input).handler(generateCopy_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "House AI is not available in this environment."
	};
	const system = "You are the senior editor at MANGU Publishers, a boutique American literary house founded in 1959 in Mumbai. Quality bar is not trash. Catalog mix is about 60% romance and commercial fiction; the rest is the full house. Budget is tight (~$100/title). Voice: calm, specific, editorial. No emoji. No purple marketing language. No 'delve', 'tapestry', or 'unforgettable journey'.";
	const user = `${KIND_INSTRUCTIONS[data.kind]}

Title packet:
${JSON.stringify(data.snapshot, null, 2)}`;
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				max_tokens: 900,
				temperature: .8,
				messages: [{
					role: "system",
					content: system
				}, {
					role: "user",
					content: user
				}]
			}),
			signal: AbortSignal.timeout(8e3)
		});
		if (!res.ok) return {
			ok: false,
			error: `Editor unavailable (${res.status}).`
		};
		const text = (await res.json()).choices?.[0]?.message?.content?.trim() ?? "";
		if (!text) return {
			ok: false,
			error: "The editor returned a blank page."
		};
		return {
			ok: true,
			text
		};
	} catch {
		return {
			ok: false,
			error: "Could not reach the house editor."
		};
	}
});
//#endregion
export { generateCopy_createServerFn_handler };
