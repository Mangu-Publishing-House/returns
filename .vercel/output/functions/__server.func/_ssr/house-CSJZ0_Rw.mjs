import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as migrateReturn, B as useManguStore, C as formatNumber, D as isSectionSkipped, E as isRomance, P as sectionProgress, R as totalCost, S as formatMoney, c as Progress, d as TopBar, h as contentHash, k as languageByCode, l as SECTIONS, m as completeness, o as IMPRINTS, p as cn, s as LANGUAGES, t as Button } from "./progress-B2fNqhk8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/house-CSJZ0_Rw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function titlePath(r) {
	return {
		id: r.id,
		title: r.finalTitle.trim() || r.workingTitle.trim() || "Untitled return",
		language: r.language,
		imprint: r.imprint,
		status: r.status,
		completeness: completeness(r),
		sections: SECTIONS.map((s) => {
			const skipped = isSectionSkipped(s.id, r);
			const { done, total } = sectionProgress(s.id, r);
			return {
				id: s.id,
				label: s.railLabel,
				skipped,
				complete: !skipped && total > 0 && done === total,
				ratio: skipped || total === 0 ? 0 : done / total
			};
		})
	};
}
function houseSnapshot(house, returns) {
	const english = returns.filter((r) => r.language === "en").length;
	const world = returns.length - english;
	const romance = returns.filter(isRomance).length;
	const filed = returns.filter((r) => r.status === "filed").length;
	const ready = returns.filter((r) => r.status === "ready_to_file").length;
	const spend = returns.reduce((a, r) => a + totalCost(r), 0);
	const avgComplete = returns.length === 0 ? 0 : Math.round(returns.reduce((a, r) => a + completeness(r), 0) / returns.length);
	return {
		english,
		world,
		englishTarget: house.englishTarget,
		worldTarget: house.worldTarget,
		romance,
		romancePct: returns.length ? Math.round(romance / returns.length * 100) : 0,
		romanceTarget: 60,
		filed,
		ready,
		open: returns.length - filed,
		spend,
		avgComplete,
		byImprint: IMPRINTS.map((i) => ({
			id: i.id,
			name: i.name,
			n: returns.filter((r) => r.imprint === i.id).length
		})),
		byLanguage: LANGUAGES.map((l) => ({
			code: l.code,
			name: l.name,
			native: l.native,
			n: returns.filter((r) => r.language === l.code).length
		})),
		paths: returns.map(titlePath)
	};
}
var CATALOG_SCHEMA = "mangu.catalog.v1";
function stableBody(house, returns) {
	return {
		schema: CATALOG_SCHEMA,
		house,
		returns: [...returns].map((r) => migrateReturn(r)).sort((a, b) => a.id.localeCompare(b.id))
	};
}
function buildCatalogDocument(house, returns) {
	const body = stableBody(house, returns);
	return {
		schema: CATALOG_SCHEMA,
		exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
		hash: contentHash(body),
		body
	};
}
function verifyCatalogDocument(doc) {
	if (!doc || typeof doc !== "object") return {
		ok: false,
		error: "Not a catalog document."
	};
	const d = doc;
	if (d.body && typeof d.body === "object") {
		const body = d.body;
		if (body.schema !== "mangu.catalog.v1") return {
			ok: false,
			error: "Unknown catalog schema."
		};
		if (!Array.isArray(body.returns)) return {
			ok: false,
			error: "Catalog body has no returns array."
		};
		const hash = contentHash(stableBody(body.house, body.returns));
		if (typeof d.hash === "string" && d.hash !== hash) return {
			ok: false,
			error: "Catalog signature does not match the body. The file may have been altered."
		};
		return {
			ok: true,
			doc: {
				schema: CATALOG_SCHEMA,
				exportedAt: typeof d.exportedAt === "string" ? d.exportedAt : (/* @__PURE__ */ new Date()).toISOString(),
				hash,
				body: stableBody(body.house, body.returns)
			}
		};
	}
	if (Array.isArray(d.returns)) {
		const body = stableBody(d.house ?? {
			operatorName: "House Operator",
			fiscalSeason: "Oct 2026 – Dec 2027",
			englishTarget: 6e3,
			worldTarget: 6e3,
			budgetPerTitle: 100
		}, d.returns);
		return {
			ok: true,
			doc: {
				schema: CATALOG_SCHEMA,
				exportedAt: typeof d.exportedAt === "string" ? d.exportedAt : (/* @__PURE__ */ new Date()).toISOString(),
				hash: contentHash(body),
				body
			}
		};
	}
	return {
		ok: false,
		error: "Unrecognized catalog JSON."
	};
}
function HousePage() {
	const returns = useManguStore((s) => s.returns);
	const house = useManguStore((s) => s.house);
	const resetCatalog = useManguStore((s) => s.resetCatalog);
	const importReturns = useManguStore((s) => s.importReturns);
	const patchHouse = useManguStore((s) => s.patchHouse);
	const fileRef = (0, import_react.useRef)(null);
	const snap = houseSnapshot(house, returns);
	const maxLang = Math.max(1, ...snap.byLanguage.map((l) => l.n));
	const exportAll = () => {
		const doc = buildCatalogDocument(house, returns);
		const blob = new Blob([JSON.stringify(doc, null, 2)], { type: "application/json" });
		const a = document.createElement("a");
		a.href = URL.createObjectURL(blob);
		a.download = "mangu-catalog.v1.json";
		a.click();
		URL.revokeObjectURL(a.href);
		toast.success("Catalog exported with signature " + doc.hash);
	};
	const onImport = async (file) => {
		if (!file) return;
		try {
			const result = verifyCatalogDocument(JSON.parse(await file.text()));
			if (!result.ok) {
				toast.error(result.error);
				return;
			}
			if (result.doc.body.house) patchHouse(result.doc.body.house);
			importReturns(result.doc.body.returns);
			toast.success(`Imported ${result.doc.body.returns.length} titles.`);
		} catch {
			toast.error("That file is not catalog JSON.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.16em] text-muted",
					children: "The house"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl",
					children: "A factory with a literary name."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft",
					children: [
						"MANGU Publishers, from a Mumbai hut in 1959 to an American imprint. Catalog target through December 2027: ",
						formatNumber(house.englishTarget),
						" English titles and",
						" ",
						formatNumber(house.worldTarget),
						" across 19 other languages. About 60% romance and commercial fiction. Quality bar is not trash. Budget about ",
						formatMoney(house.budgetPerTitle),
						" ",
						"a book."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "English",
							value: snap.english,
							cap: snap.englishTarget
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "World languages",
							value: snap.world,
							cap: snap.worldTarget
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-bg-elevated px-5 py-4 shadow-[var(--shadow-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase tracking-[0.14em] text-muted",
									children: "Filed this season"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-display text-3xl tabular-nums",
									children: snap.filed
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-faint",
									children: [
										snap.ready,
										" ready · ",
										snap.open,
										" open · ",
										returns.length,
										" in the book"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-bg-elevated px-5 py-4 shadow-[var(--shadow-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase tracking-[0.14em] text-muted",
									children: "Romance mix"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 font-display text-3xl tabular-nums",
									children: [snap.romancePct, "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-faint",
									children: [
										"House target ~",
										snap.romanceTarget,
										"% · ",
										snap.romance,
										" of ",
										returns.length
									]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-ink",
							children: "Thirteen-section path"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Every title in the book, House through File. A dash is a skip, not a gap."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 overflow-x-auto rounded-xl bg-bg-elevated shadow-[var(--shadow-border)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full min-w-[720px] text-left text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-line text-xs uppercase tracking-[0.12em] text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "Title"
									}), snap.paths[0]?.sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-1 py-3 text-center font-medium",
										children: s.label.slice(0, 3)
									}, s.id))]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: snap.paths.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-line/70 last:border-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/return/$id",
											params: { id: p.id },
											className: "font-medium text-ink hover:underline",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												lang: p.language,
												dir: p.language === "ar" || p.language === "ur" ? "rtl" : "ltr",
												children: p.title
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-faint",
											children: [
												p.language.toUpperCase(),
												" · ",
												p.completeness,
												"%"
											]
										})]
									}), p.sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-1 py-3 text-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("inline-block size-2.5 rounded-full", s.skipped ? "bg-line-strong" : s.complete ? "bg-sage" : s.ratio > 0 ? "bg-amber" : "bg-line"),
											title: `${s.label}: ${s.skipped ? "skipped" : s.complete ? "complete" : "open"}`
										})
									}, s.id))]
								}, p.id)) })]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12 grid gap-8 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-ink",
							children: "Languages"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "One return per language edition."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-5 space-y-2",
							children: snap.byLanguage.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-28 shrink-0 truncate text-sm text-ink-soft",
										children: l.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-2 flex-1 overflow-hidden rounded-full bg-line",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: cn("h-full rounded-full", l.n ? "bg-ink" : "bg-transparent"),
											style: { width: `${l.n / maxLang * 100}%` }
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-6 text-right text-xs tabular-nums text-muted",
										children: l.n
									})
								]
							}, l.code))
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-ink",
							children: "Imprints"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								"Romance share this book: ",
								snap.romancePct,
								"% (house target ~60%). Spend",
								" ",
								formatMoney(snap.spend),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-5 space-y-3",
							children: snap.byImprint.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "rounded-xl bg-bg-elevated px-4 py-3 shadow-[var(--shadow-border)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium text-ink",
										children: i.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm tabular-nums text-muted",
										children: i.n
									})]
								})
							}, i.id))
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12 rounded-xl bg-surface px-5 py-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-ink",
							children: "How a title moves"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
							children: [
								{
									n: "01–04",
									t: "Identity",
									d: "House, title, class, rights."
								},
								{
									n: "05–07",
									t: "The pages",
									d: "Manuscript, editorial gates, metadata."
								},
								{
									n: "08–11",
									t: "The object",
									d: "Design, audio, budget, distribution."
								},
								{
									n: "12–13",
									t: "File",
									d: "Launch plan, review, operator sign-off."
								}
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase tracking-[0.14em] text-muted",
									children: s.n
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-medium text-ink",
									children: s.t
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-faint",
									children: s.d
								})
							] }, s.n))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/",
										children: "Open returns"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									onClick: exportAll,
									children: "Export catalog JSON"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									onClick: () => fileRef.current?.click(),
									children: "Import catalog JSON"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									onClick: () => {
										resetCatalog();
										toast.success("Sample catalog restored.");
									},
									children: "Restore sample catalog"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: fileRef,
									type: "file",
									accept: "application/json,.json",
									className: "hidden",
									onChange: (e) => {
										onImport(e.target.files?.[0]);
										e.target.value = "";
									}
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-10 text-sm text-faint",
					children: [
						"Language of this edition: ",
						languageByCode("en")?.name,
						". MANGU storefront remains mangu-publishers.com. This return book is the operator interview, not the store. Catalog JSON is schema ",
						`mangu.catalog.v1`,
						", signed, round-trippable."
					]
				})
			]
		})]
	});
}
function Meter({ label, value, cap }) {
	const pct = Math.min(100, Math.round(value / cap * 1e3) / 10);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-bg-elevated px-5 py-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.14em] text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 font-display text-3xl tabular-nums text-ink",
				children: [formatNumber(value), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ml-1 font-sans text-sm text-faint",
					children: ["/ ", formatNumber(cap)]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
				value: pct,
				className: "mt-3"
			})
		]
	});
}
//#endregion
export { HousePage as component };
