import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as Plus } from "../_libs/lucide-react.mjs";
import { B as useManguStore, C as formatNumber, S as formatMoney, T as imprintById, _ as displayTitle, c as Progress, d as TopBar, g as displayAuthor, k as languageByCode, m as completeness, r as CONTENT_TYPES, s as LANGUAGES, t as Button, u as Stamp, v as editionDir, w as genreById, x as firstIncompleteId, y as editionLang, z as unitEconomics } from "./progress-B2fNqhk8.mjs";
import { t as Badge } from "./badge-Cv4ea1fv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-mdynvcF-.js
var import_jsx_runtime = require_jsx_runtime();
function statusTone(s) {
	if (s === "filed") return "sage";
	if (s === "ready_to_file") return "sage";
	if (s === "needs_info") return "amber";
	return "muted";
}
function statusLabel(s) {
	if (s === "filed") return "Filed";
	if (s === "ready_to_file") return "Ready to file";
	if (s === "needs_info") return "Needs info";
	return "In progress";
}
function ReturnCard({ r }) {
	const pct = completeness(r);
	const step = r.status === "filed" ? "review.file" : r.currentStepId || firstIncompleteId(r);
	const lang = languageByCode(r.language);
	const imprint = r.imprint ? imprintById(r.imprint) : void 0;
	const genre = r.primaryGenre ? genreById(r.primaryGenre) : void 0;
	const econ = unitEconomics(r);
	const typeLabel = CONTENT_TYPES.find((t) => t.id === r.contentType)?.label;
	const bits = [
		imprint?.name,
		genre?.label,
		lang?.native,
		typeLabel && typeLabel.toLowerCase() !== genre?.label?.toLowerCase() ? typeLabel : null,
		r.wordCount ? `${r.wordCount.toLocaleString()} words` : null
	].filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/return/$id",
		params: { id: r.id },
		search: { step },
		className: "block rounded-xl bg-bg-elevated p-5 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-150 ease-[var(--ease-out)] hover:shadow-[var(--shadow-border-hover)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl leading-snug text-ink",
						lang: editionLang(r.language),
						dir: editionDir(r.language),
						children: displayTitle(r)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: displayAuthor(r)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: statusTone(r.status),
					children: statusLabel(r.status)
				})]
			}),
			bits.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs leading-relaxed text-muted",
				children: bits.join(" · ")
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value: pct,
					className: "flex-1"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "w-10 text-right text-xs tabular-nums text-muted",
					children: [pct, "%"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-xs text-faint",
				children: [
					"Contribution ",
					formatMoney(Math.round(econ.contribution)),
					" · cost ",
					formatMoney(econ.cost)
				]
			})
		]
	});
}
function Home() {
	const navigate = useNavigate();
	const returns = useManguStore((s) => s.returns);
	const house = useManguStore((s) => s.house);
	const createReturn = useManguStore((s) => s.createReturn);
	const startNew = () => {
		const id = createReturn();
		navigate({
			to: "/return/$id",
			params: { id },
			search: { step: "house.welcome" }
		});
	};
	const inFlight = returns.filter((r) => r.status !== "filed");
	const filed = returns.filter((r) => r.status === "filed");
	const last = [...inFlight].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
	const english = returns.filter((r) => r.language === "en").length;
	const world = returns.filter((r) => r.language !== "en").length;
	const ready = returns.filter((r) => r.status === "ready_to_file").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stamp, { children: "Est. 1959" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-5 font-display text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl",
								children: "File a book."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-xl text-lg leading-relaxed text-ink-soft",
								children: "The house interview — idea to market, one title at a time. Same shape as a tax return: we ask, we skip what doesn’t apply, we stop you before you file a gap."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "lg",
						onClick: startNew,
						className: "shrink-0 self-start lg:self-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Start a new return"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10 grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Catalog season",
							value: house.fiscalSeason,
							hint: `${formatNumber(house.englishTarget)} English · ${formatNumber(house.worldTarget)} world`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Open returns",
							value: String(inFlight.length),
							hint: `${ready} ready to file · ${filed.length} filed`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Language mix",
							value: `${english} / ${world}`,
							hint: `English / ${LANGUAGES.length - 1} other house languages`
						})
					]
				}),
				last ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10 rounded-xl bg-ink px-5 py-6 text-bg-elevated sm:px-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.16em] text-rail-muted",
							children: "Continue where you left off"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-3xl",
							children: displayTitle(last)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-rail-muted",
							children: [
								completeness(last),
								"% complete · last touched",
								" ",
								new Date(last.updatedAt).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							className: "mt-5",
							onClick: () => navigate({
								to: "/return/$id",
								params: { id: last.id },
								search: { step: last.currentStepId || firstIncompleteId(last) }
							}),
							children: "Continue this return"
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-ink",
							children: "Open returns"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: inFlight.length
						})]
					}), inFlight.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-muted",
						children: "No open returns. Start one and walk it through the house."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 grid gap-4 md:grid-cols-2",
						children: inFlight.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReturnCard, { r }, r.id))
					})]
				}),
				filed.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-ink",
						children: "Filed"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 grid gap-4 md:grid-cols-2",
						children: filed.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReturnCard, { r }, r.id))
					})]
				}) : null
			]
		})]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-bg-elevated px-5 py-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.14em] text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-2xl leading-tight text-ink",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-faint",
				children: hint
			})
		]
	});
}
//#endregion
export { Home as component };
