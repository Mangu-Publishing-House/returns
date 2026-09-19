import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, t as Dialog } from "./_libs/@radix-ui/react-dialog+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./_ssr/ssr.mjs";
import { a as Minus, c as FileCheck, d as Check, f as ArrowRight, i as PenLine, l as Download, n as TriangleAlert, o as Menu, p as ArrowLeft, s as Lock, t as X, u as Circle } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as Route } from "./_ssr/router-Ctk95bER.mjs";
import { B as useManguStore, C as formatNumber, D as isSectionSkipped, F as sectionSteps, I as skipReason, L as stepById, M as prevStepId, N as railSections, O as issuesFor, P as sectionProgress, R as totalCost, S as formatMoney, V as visibleSteps, _ as displayTitle, a as HouseMark, b as filedPacket, c as Progress, d as TopBar, f as canFile, g as displayAuthor, i as COST_LABELS, j as nextStepId, m as completeness, n as CHANNELS, p as cn, t as Button, u as Stamp, v as editionDir, y as editionLang, z as unitEconomics } from "./_ssr/progress-B2fNqhk8.mjs";
import { t as Badge } from "./_ssr/badge-Cv4ea1fv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-Dr7sn2E1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Sheet({ open, onOpenChange, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: cn("fixed inset-y-0 left-0 z-50 flex w-[min(100%,20rem)] flex-col bg-rail text-rail-fg shadow-[var(--shadow-rail)]", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-rail-line px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-display text-lg text-rail-fg",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "rail",
						size: "icon",
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto",
				children
			})]
		})] })
	});
}
function SectionRail({ r, currentSectionId, onSection }) {
	const sections = railSections();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Return sections",
		className: "px-3 py-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "space-y-0.5",
			children: sections.map((sec) => {
				const { done, total, skipped } = sectionProgress(sec.id, r);
				const complete = !skipped && total > 0 && done === total;
				const active = sec.id === currentSectionId;
				const reason = skipped ? skipReason(sec.id, r) : null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onSection(sec),
					title: reason ?? void 0,
					className: cn("flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors duration-150", active ? "bg-rail-active text-rail-fg" : "text-rail-muted hover:bg-rail-active hover:text-rail-fg", skipped && !active && "opacity-70"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("grid size-6 shrink-0 place-items-center rounded-full border text-[11px] font-medium", complete ? "border-sage bg-sage text-sage-fg" : skipped ? "border-rail-muted/50 text-rail-muted" : active ? "border-rail-fg text-rail-fg" : "border-rail-muted/40"),
						children: complete ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							className: "size-3.5",
							strokeWidth: 3
						}) : skipped ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {
							className: "size-3.5",
							strokeWidth: 3
						}) : sec.number
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-sm font-medium",
							children: sec.railLabel
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("block text-xs tabular-nums", active ? "text-rail-muted" : "text-rail-muted/70"),
							children: skipped ? "Skipped" : `${done}/${total}`
						})]
					})]
				}) }, sec.id);
			})
		})
	});
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	type,
	ref,
	className: cn("flex h-11 w-full rounded-md border border-line bg-bg-elevated px-3 font-sans text-base text-ink shadow-[var(--shadow-border)] transition-[box-shadow,border-color] duration-150 placeholder:text-faint focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:opacity-50", className),
	...props
}));
Input.displayName = "Input";
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	ref,
	className: cn("min-h-40 w-full rounded-lg border border-line bg-bg-elevated px-3 py-3 font-sans text-base leading-relaxed text-ink shadow-[var(--shadow-border)] transition-[box-shadow,border-color] duration-150 placeholder:text-faint focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:opacity-50", className),
	...props
}));
Textarea.displayName = "Textarea";
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("block text-sm font-medium text-ink-soft", className),
		...props
	});
}
function ChoiceGrid({ choices, value, onChange, columns = "auto" }) {
	const selected = Array.isArray(value) ? value : value ? [String(value)] : [];
	const dense = choices.length > 10;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid gap-2", columns === 1 ? "grid-cols-1" : dense ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"),
		children: choices.map((c) => {
			const on = selected.includes(c.value);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onChange(c.value),
				className: cn("flex min-h-14 items-start gap-3 rounded-lg px-4 py-3 text-left shadow-[var(--shadow-border)] transition-[box-shadow,background-color,transform] duration-150 ease-[var(--ease-out)]", on ? "bg-ink text-bg-elevated shadow-[var(--shadow-border-hover)]" : "bg-bg-elevated text-ink hover:shadow-[var(--shadow-border-hover)]"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border", on ? "border-bg-elevated bg-bg-elevated text-ink" : "border-line-strong"),
					children: on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: "size-3",
						strokeWidth: 3
					}) : null
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-medium leading-snug",
						children: c.label
					}), c.blurb ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("mt-0.5 block text-sm leading-snug", on ? "text-bg-elevated/75" : "text-muted"),
						children: c.blurb
					}) : null]
				})]
			}, c.value);
		})
	});
}
function ChipSet({ choices, value, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children: choices.map((c) => {
			const on = value.includes(c.value);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onToggle(c.value),
				className: cn("min-h-11 rounded-full px-3.5 text-sm font-medium shadow-[var(--shadow-border)] transition-colors duration-150", on ? "bg-ink text-bg-elevated" : "bg-bg-elevated text-ink-soft hover:bg-surface"),
				children: c.label
			}, c.value);
		})
	});
}
var PASS_OPTIONS = [
	{
		id: "not_started",
		label: "Not started"
	},
	{
		id: "in_progress",
		label: "In progress"
	},
	{
		id: "passed",
		label: "Passed"
	},
	{
		id: "skipped",
		label: "Skipped"
	}
];
var PASS_KEYS = [
	{
		key: "developmental",
		label: "Developmental",
		hint: "Structure, character, argument."
	},
	{
		key: "line",
		label: "Line edit",
		hint: "Sentence-level. Skippable for picture books."
	},
	{
		key: "copy",
		label: "Copyedit",
		hint: "Required. Grammar, continuity, house style."
	},
	{
		key: "proof",
		label: "Proofread",
		hint: "Last pass on typeset pages."
	}
];
function ChecklistPanel({ r, onPass }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: PASS_KEYS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl bg-bg-elevated p-4 shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-baseline justify-between gap-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium text-ink",
					children: p.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-muted",
					children: p.hint
				})] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4",
				children: PASS_OPTIONS.map((o) => {
					const on = r.editorial[p.key] === o.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onPass(p.key, o.id),
						className: cn("h-10 rounded-md text-sm font-medium", on ? "bg-ink text-bg-elevated" : "bg-surface text-ink-soft hover:bg-line"),
						children: o.label
					}, o.id);
				})
			})]
		}, p.key))
	});
}
function BudgetPanel({ r, onCost }) {
	const econ = unitEconomics(r);
	const cost = totalCost(r);
	const keys = Object.keys(COST_LABELS);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl bg-ink px-5 py-5 text-bg-elevated",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.16em] text-rail-muted",
					children: "Spent against cap"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 font-display text-4xl tabular-nums tracking-tight",
					children: [formatMoney(cost), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-2 font-sans text-base text-rail-muted",
						children: ["/ ", formatMoney(r.budgetCap)]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-rail-muted",
					children: econ.overBudget > 0 ? `${formatMoney(econ.overBudget)} over the house cap — this blocks the file.` : `${formatMoney(r.budgetCap - cost)} remaining.`
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: keys.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[1fr_7rem] items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: `cost-${k}`,
					children: COST_LABELS[k]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint",
						children: "$"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: `cost-${k}`,
						type: "number",
						min: 0,
						step: 1,
						className: "pl-7",
						value: r.costs[k] || "",
						onChange: (e) => onCost(k, Number(e.target.value) || 0)
					})]
				})]
			}, k))
		})]
	});
}
function ChannelsPanel({ r, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [r.exclusiveKdp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-lg bg-amber/10 px-3 py-2 text-sm text-amber",
			children: "KDP Select is on. Apple, Google, and Kobo will conflict if checked."
		}) : null, CHANNELS.map((c) => {
			const on = r.channels[c.id];
			const conflict = Boolean(r.exclusiveKdp && c.exclusiveConflict && on);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onToggle(c.id),
				className: cn("flex w-full items-start gap-3 rounded-lg px-4 py-3 text-left shadow-[var(--shadow-border)]", on ? "bg-ink text-bg-elevated" : "bg-bg-elevated text-ink", conflict && "ring-1 ring-brick"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("mt-0.5 grid size-5 place-items-center rounded-sm border", on ? "border-bg-elevated bg-bg-elevated text-ink" : "border-line-strong"),
					children: on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: "size-3",
						strokeWidth: 3
					}) : null
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-medium",
					children: c.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("block text-sm", on ? "text-bg-elevated/70" : "text-muted"),
					children: c.blurb
				})] })]
			}, c.id);
		})]
	});
}
function ReviewPanel({ r, onJump }) {
	const catalog = useManguStore((s) => s.returns);
	const issues = issuesFor(r, catalog);
	const blocks = issues.filter((i) => i.level === "block");
	const warns = issues.filter((i) => i.level === "warn");
	const pct = completeness(r);
	const econ = unitEconomics(r);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-ink px-5 py-6 text-bg-elevated",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.16em] text-rail-muted",
						children: "Estimated contribution"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-5xl tabular-nums tracking-tight",
						children: formatMoney(Math.round(econ.contribution))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 max-w-md text-sm text-rail-muted",
						children: [
							"On 100 ebooks, 40 paperbacks",
							r.produceAudio ? ", and 20 audiobooks" : "",
							", after this title’s cost of ",
							formatMoney(econ.cost),
							". Break-even at ",
							formatNumber(econ.breakEvenCopies),
							" ebook copies."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm",
						children: [
							"Return completeness ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: [pct, "%"]
							}),
							econ.pages ? ` · ~${econ.pages} pages` : "",
							econ.spineMm ? ` · spine ${econ.spineMm} mm` : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-rail-muted",
						children: [
							blocks.length,
							" blocking · ",
							warns.length,
							" warnings"
						]
					})
				]
			}),
			blocks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3 rounded-xl bg-sage/10 px-4 py-3 text-sage",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "No blocking issues"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm opacity-80",
					children: "You can file this title to the house."
				})] })]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl text-ink",
				children: "Blocking"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: blocks.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onJump(i.stepId),
					className: "flex w-full items-start gap-3 rounded-lg bg-bg-elevated px-4 py-3 text-left shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 size-4 shrink-0 text-brick" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium text-ink",
							children: i.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 block font-mono text-[11px] tracking-wide text-brick/80",
							children: i.id
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm text-muted",
							children: i.detail
						})
					] })]
				}) }, i.id))
			})] }),
			warns.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl text-ink",
				children: "Warnings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: warns.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onJump(i.stepId),
					className: "flex w-full items-start gap-3 rounded-lg bg-bg-elevated px-4 py-3 text-left shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "mt-0.5 size-4 shrink-0 text-amber" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium text-ink",
							children: i.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 block font-mono text-[11px] tracking-wide text-amber/80",
							children: i.id
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm text-muted",
							children: i.detail
						})
					] })]
				}) }, i.id))
			})] }) : null
		]
	});
}
function FilePanel({ r, onFile, onUnfile, onExport }) {
	const catalog = useManguStore((s) => s.returns);
	const issues = issuesFor(r, catalog).filter((i) => i.level === "block");
	const filed = r.status === "filed";
	const ready = canFile(r, catalog);
	const [signed, setSigned] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6",
		children: filed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-xl bg-ink px-6 py-10 text-center text-bg-elevated",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stamp, {
					className: "mb-4 border-sage text-sage",
					children: "Filed"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-4xl tracking-tight",
					children: "This title is filed."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mx-auto mt-3 max-w-md text-sm text-rail-muted",
					children: [
						displayTitle(r),
						" by ",
						displayAuthor(r),
						" entered the house record",
						r.filedAt ? ` on ${new Date(r.filedAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric"
						})}` : "",
						". Filing is not printing. It is the operator saying the packet is complete enough to produce."
					]
				}),
				r.filingReceipt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mx-auto mt-6 grid max-w-md grid-cols-2 gap-2 text-left text-xs text-rail-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Receipt" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-mono text-rail-fg",
							children: r.filingReceipt.id
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Packet hash" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-mono text-rail-fg",
							children: r.filingReceipt.packetHash
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Operator" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-rail-fg",
							children: r.filingReceipt.operator
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Warnings filed" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-rail-fg",
							children: r.filingReceipt.warningCount
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: onExport,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "Download packet"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						className: "text-rail-fg hover:bg-rail-active",
						onClick: onUnfile,
						children: "Reopen return"
					})]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-surface px-5 py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl text-ink",
						children: displayTitle(r)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-muted",
						children: displayAuthor(r)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: r.language.toUpperCase() }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "muted",
								children: r.contentType || "untyped"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: ready ? "sage" : "amber",
								children: ready ? "Cleared to file" : "Not yet"
							})
						]
					})
				]
			}),
			!ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-start gap-2 text-sm text-brick",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "mt-0.5 size-4 shrink-0" }),
					issues.length,
					" blocking ",
					issues.length === 1 ? "issue" : "issues",
					" remain. Return to Review and clear them. Quality must also be a pass."
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Operator sign-off files this packet to the house. You can reopen it later."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-start gap-3 text-sm text-ink-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					className: "mt-1 size-4 accent-ink",
					checked: signed,
					onChange: (e) => setSigned(e.target.checked),
					disabled: !ready
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"I am ",
					r.operator || "the operator of record",
					" and I sign this packet as complete enough to produce."
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "lg",
				className: "w-full sm:w-auto",
				disabled: !ready || !signed,
				onClick: onFile,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck, { className: "size-4" }), "File this title"]
			})
		] })
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var generateCopy = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("ab61b8f2af6161b960ace87c70aa968477476c6ccec9e8bbe92b2918a4db4286"));
function snapshotFrom(r) {
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
		sourceTitle: r.sourceTitle
	};
}
function getField(r, path) {
	if (path.startsWith("editorial.")) {
		const key = path.split(".")[1];
		return r.editorial[key];
	}
	if (path.startsWith("costs.")) {
		const key = path.split(".")[1];
		return r.costs[key];
	}
	if (path.startsWith("channels.")) {
		const key = path.split(".")[1];
		return r.channels[key];
	}
	return r[path];
}
function asString(v) {
	if (v === null || v === void 0) return "";
	if (typeof v === "boolean") return v ? "true" : "false";
	if (Array.isArray(v)) return v.join(", ");
	return String(v);
}
function asBool(v) {
	if (v === true || v === "true") return true;
	if (v === false || v === "false") return false;
	return null;
}
function applyText(id, path, raw) {
	if (!path) return;
	if (path === "keywords" || path === "contentWarnings") {
		const kws = raw.split(/[,;\n]/).map((s) => s.trim()).filter(Boolean).slice(0, 12);
		useManguStore.getState().setField({
			id,
			path,
			value: kws
		});
		return;
	}
	useManguStore.getState().setField({
		id,
		path,
		value: raw
	});
}
function StepView({ r, step, onJump }) {
	const setField = useManguStore((s) => s.setField);
	const fileReturn = useManguStore((s) => s.fileReturn);
	const unfileReturn = useManguStore((s) => s.unfileReturn);
	const [aiText, setAiText] = (0, import_react.useState)("");
	const [aiBusy, setAiBusy] = (0, import_react.useState)(false);
	const value = step.path ? getField(r, step.path) : void 0;
	const runAi = async () => {
		if (!step.aiKind) return;
		setAiBusy(true);
		setAiText("");
		try {
			const res = await generateCopy({ data: {
				kind: step.aiKind,
				snapshot: snapshotFrom(r)
			} });
			if (!res.ok) {
				toast.error(res.error);
				return;
			}
			setAiText(res.text);
		} catch {
			toast.error("The editor could not be reached.");
		} finally {
			setAiBusy(false);
		}
	};
	const useAi = () => {
		if (!aiText || !step.path) return;
		if (step.aiKind === "keywords") applyText(r.id, "keywords", aiText);
		else if (step.aiKind === "titles") {
			const first = aiText.split("\n").map((l) => l.replace(/^\s*\d+[.)]\s*/, "").replace(/^[-*]\s*/, "").trim()).find((l) => l.length > 1);
			if (first) applyText(r.id, step.path, first);
		} else applyText(r.id, step.path, aiText);
		if (step.path === "coverBrief") setField({
			id: r.id,
			path: "coverStatus",
			value: r.coverStatus === "not_started" ? "briefed" : r.coverStatus
		});
		toast.success("Placed in the packet.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium uppercase tracking-[0.16em] text-muted",
			children: step.optional ? "Optional" : "Required"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl",
			children: step.title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg",
			children: step.prompt
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8",
			children: [
				step.type === "intro" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-surface px-5 py-5 text-ink-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl text-ink",
						children: "How this works"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-2 text-sm leading-relaxed",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "One return, one language edition, one book." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Answer what we ask. We’ll skip audio, heat, and translation when they don’t apply." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Review lists blocking issues the way a tax return lists missing forms." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "File is operator sign-off — not print, not upload. Production starts after." })
						]
					})]
				}) : null,
				step.type === "choice" && step.choices ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceGrid, {
					choices: step.choices,
					value: asString(value),
					onChange: (v) => setField({
						id: r.id,
						path: step.path,
						value: v
					})
				}) : null,
				step.type === "yesno" && step.path ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceGrid, {
					columns: 1,
					choices: [{
						value: "true",
						label: "Yes"
					}, {
						value: "false",
						label: "No"
					}],
					value: asBool(value) === null ? "" : asBool(value) ? "true" : "false",
					onChange: (v) => setField({
						id: r.id,
						path: step.path,
						value: v === "true"
					})
				}) : null,
				step.type === "text" && step.path ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: asString(value),
					placeholder: step.placeholder,
					onChange: (e) => applyText(r.id, step.path, e.target.value)
				}) : null,
				step.type === "number" && step.path ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					value: value === null || value === void 0 || value === 0 ? "" : asString(value),
					placeholder: step.placeholder,
					onChange: (e) => setField({
						id: r.id,
						path: step.path,
						value: e.target.value
					})
				}) : null,
				step.type === "textarea" && step.path ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: asString(value),
					placeholder: step.placeholder,
					onChange: (e) => applyText(r.id, step.path, e.target.value)
				}) : null,
				step.type === "form" && step.fields ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: step.fields.map((f) => {
						if (f.visible && !f.visible(r)) return null;
						const fv = getField(r, f.path);
						if (f.kind === "textarea") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: f.path,
							children: f.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: f.path,
							className: "mt-1.5",
							placeholder: f.placeholder,
							value: asString(fv),
							onChange: (e) => applyText(r.id, f.path, e.target.value)
						})] }, f.path);
						if (f.kind === "select" && f.options) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "mb-1.5",
							children: f.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceGrid, {
							columns: 1,
							choices: f.options,
							value: asString(fv),
							onChange: (v) => setField({
								id: r.id,
								path: f.path,
								value: v
							})
						})] }, f.path);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							htmlFor: f.path,
							children: [f.label, f.optional ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 font-normal text-faint",
								children: "(optional)"
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: f.path,
							className: "mt-1.5",
							type: f.kind === "number" ? "number" : "text",
							placeholder: f.placeholder,
							value: fv === null || fv === void 0 ? "" : asString(fv),
							onChange: (e) => setField({
								id: r.id,
								path: f.path,
								value: e.target.value
							})
						})] }, f.path);
					})
				}) : null,
				step.type === "chips" && step.chipOptions && step.path ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipSet, {
					choices: step.chipOptions.filter((c) => c.value !== r.primaryGenre),
					value: Array.isArray(value) ? value : [],
					onToggle: (v) => {
						const cur = Array.isArray(value) ? [...value] : [];
						const next = cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v];
						setField({
							id: r.id,
							path: step.path,
							value: next
						});
					}
				}) : null,
				step.type === "checklist" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChecklistPanel, {
					r,
					onPass: (key, v) => setField({
						id: r.id,
						path: `editorial.${key}`,
						value: v
					})
				}) : null,
				step.type === "budget" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BudgetPanel, {
					r,
					onCost: (key, n) => setField({
						id: r.id,
						path: `costs.${key}`,
						value: n
					})
				}) : null,
				step.type === "channels" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelsPanel, {
					r,
					onToggle: (key) => setField({
						id: r.id,
						path: `channels.${key}`,
						value: !r.channels[key]
					})
				}) : null,
				step.type === "ai" && step.path ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						step.path === "keywords" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: Array.isArray(value) ? value.join(", ") : asString(value),
							placeholder: "workplace romance, family business, holiday deadline",
							onChange: (e) => applyText(r.id, "keywords", e.target.value)
						}) : step.path === "workingTitle" || step.path === "finalTitle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: asString(value),
							placeholder: step.placeholder,
							onChange: (e) => applyText(r.id, step.path, e.target.value)
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: asString(value),
							placeholder: step.placeholder,
							onChange: (e) => applyText(r.id, step.path, e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "secondary",
								onClick: runAi,
								disabled: aiBusy,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-4" }), aiBusy ? "Editor is writing…" : "Ask the house editor"]
							}), aiText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: useAi,
								children: "Place in packet"
							}) : null]
						}),
						aiText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "max-h-72 overflow-auto whitespace-pre-wrap rounded-lg bg-surface px-4 py-3 font-sans text-sm leading-relaxed text-ink-soft",
							children: aiText
						}) : null
					]
				}) : null,
				step.type === "review" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewPanel, {
					r,
					onJump
				}) : null,
				step.type === "file" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePanel, {
					r,
					onFile: () => {
						if (!fileReturn(r.id)) toast.error("Blocking issues remain. Clear Review first.");
						else toast.success("Filed to the house.");
					},
					onUnfile: () => unfileReturn(r.id),
					onExport: () => {
						const packet = filedPacket(r, useManguStore.getState().returns);
						const blob = new Blob([JSON.stringify(packet, null, 2)], { type: "application/json" });
						const a = document.createElement("a");
						a.href = URL.createObjectURL(blob);
						a.download = `${displayTitle(r).replace(/\s+/g, "-").toLowerCase()}-return.json`;
						a.click();
						URL.revokeObjectURL(a.href);
					}
				}) : null
			]
		})
	] });
}
function WizardFrame({ r, stepId }) {
	const navigate = useNavigate();
	const visitStep = useManguStore((s) => s.visitStep);
	const [menu, setMenu] = (0, import_react.useState)(false);
	const [shake, setShake] = (0, import_react.useState)(false);
	const steps = visibleSteps(r);
	const step = stepById(stepId) ?? steps[0];
	const currentId = step?.id ?? "house.welcome";
	const next = nextStepId(currentId, r);
	const prev = prevStepId(currentId, r);
	const pct = completeness(r);
	const section = step?.sectionId ?? "house";
	(0, import_react.useEffect)(() => {
		visitStep(r.id, currentId);
	}, [
		r.id,
		currentId,
		visitStep
	]);
	const go = (id) => {
		if (!id) return;
		navigate({
			to: "/return/$id",
			params: { id: r.id },
			search: { step: id }
		});
	};
	const onSection = (sec) => {
		if (isSectionSkipped(sec.id, r)) {
			toast.message(skipReason(sec.id, r) ?? "This section is skipped for this title.");
			setMenu(false);
			return;
		}
		const first = sectionSteps(sec.id, r)[0];
		if (first) go(first.id);
		setMenu(false);
	};
	const continueNext = () => {
		if (!step) return;
		if (!step.optional && !step.complete(r) && step.type !== "intro" && step.type !== "review") {
			setShake(true);
			window.setTimeout(() => setShake(false), 400);
			return;
		}
		if (next) go(next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh bg-bg text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden w-64 shrink-0 flex-col bg-rail text-rail-fg lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 border-b border-rail-line px-4 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseMark, {
							invert: true,
							className: "size-7"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg leading-none text-rail-fg",
								children: "MANGU Return"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 truncate text-xs text-rail-muted",
								lang: editionLang(r.language),
								dir: editionDir(r.language),
								children: displayTitle(r)
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 overflow-y-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionRail, {
							r,
							currentSectionId: section,
							onSection
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-rail-line px-4 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-[0.14em] text-rail-muted",
								children: "Completeness"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-display text-2xl tabular-nums",
								children: [pct, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: pct,
								track: "rail",
								className: "mt-2"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-bg/90 px-3 py-3 backdrop-blur-sm sm:px-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "lg:hidden",
								"aria-label": "Sections",
								onClick: () => setMenu(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "hidden text-sm font-medium text-muted hover:text-ink sm:inline",
								children: "Save & exit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ml-auto flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "hidden text-sm tabular-nums text-muted sm:inline",
									children: [pct, "% complete"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "secondary",
									size: "sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/",
										children: "Exit"
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
							className: "min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("mx-auto max-w-2xl", shake && "animate-shake"),
								children: step ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepView, {
									r,
									step,
									onJump: go
								}) : null
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
							className: "hidden w-72 shrink-0 border-l border-line xl:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sticky top-20 px-5 py-8",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium uppercase tracking-[0.16em] text-muted",
										children: "Why we ask"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm leading-relaxed text-ink-soft",
										children: step?.why
									}),
									r.status === "filed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-6 text-sm text-sage",
										children: "This return is filed to the house."
									}) : null
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
						className: "sticky bottom-0 z-20 border-t border-line bg-bg-elevated/95 px-4 py-3 backdrop-blur-sm sm:px-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto flex max-w-2xl items-center justify-between gap-3 xl:max-w-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								disabled: !prev,
								onClick: () => go(prev),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back"]
							}), next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: continueNext,
								children: ["Continue", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									children: "Back to catalog"
								})
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: menu,
				onOpenChange: setMenu,
				title: "Sections",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionRail, {
					r,
					currentSectionId: section,
					onSection
				})
			})
		]
	});
}
function ReturnPage() {
	const { id } = Route.useParams();
	const { step } = Route.useSearch();
	const rec = useManguStore((s) => s.returns.find((r) => r.id === id));
	if (!rec) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-lg px-4 py-20 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl text-ink",
					children: "Return not in the book"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted",
					children: "This packet isn’t in the local catalog. It may have been cleared, or you’re looking at another desk."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Back to returns"
					})
				})
			]
		})]
	});
	const steps = visibleSteps(rec);
	const requested = step && stepById(step) ? step : rec.currentStepId;
	const visible = steps.some((s) => s.id === requested) ? requested : steps[0]?.id ?? "house.welcome";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WizardFrame, {
		r: rec,
		stepId: visible
	});
}
//#endregion
export { ReturnPage as component };
