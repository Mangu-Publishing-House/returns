import { AlertTriangle, Check, Circle, Download, Lock, FileCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Stamp } from "@/components/mark";
import { COST_LABELS, totalCost, unitEconomics } from "@/lib/mangu/economics";
import { CHANNELS } from "@/lib/mangu/catalog";
import { issuesFor, completeness, canFile } from "@/lib/mangu/scoring";
import { displayAuthor, displayTitle } from "@/lib/mangu/blank";
import { formatMoney, formatNumber } from "@/lib/utils";
import type { BookReturn, CostKey, PassStatus } from "@/lib/mangu/types";
import { cn } from "@/lib/utils";
import { useManguStore } from "@/lib/mangu/store";

const PASS_OPTIONS: { id: PassStatus; label: string }[] = [
  { id: "not_started", label: "Not started" },
  { id: "in_progress", label: "In progress" },
  { id: "passed", label: "Passed" },
  { id: "skipped", label: "Skipped" },
];

const PASS_KEYS: { key: keyof BookReturn["editorial"]; label: string; hint: string }[] = [
  { key: "developmental", label: "Developmental", hint: "Structure, character, argument." },
  { key: "line", label: "Line edit", hint: "Sentence-level. Skippable for picture books." },
  { key: "copy", label: "Copyedit", hint: "Required. Grammar, continuity, house style." },
  { key: "proof", label: "Proofread", hint: "Last pass on typeset pages." },
];

export function ChecklistPanel({
  r,
  onPass,
}: {
  r: BookReturn;
  onPass: (key: keyof BookReturn["editorial"], v: PassStatus) => void;
}) {
  return (
    <div className="space-y-3">
      {PASS_KEYS.map((p) => (
        <div key={p.key} className="rounded-xl bg-bg-elevated p-4 shadow-[var(--shadow-border)]">
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <p className="font-medium text-ink">{p.label}</p>
              <p className="mt-0.5 text-sm text-muted">{p.hint}</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
            {PASS_OPTIONS.map((o) => {
              const on = r.editorial[p.key] === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => onPass(p.key, o.id)}
                  className={cn(
                    "h-10 rounded-md text-sm font-medium",
                    on ? "bg-ink text-bg-elevated" : "bg-surface text-ink-soft hover:bg-line",
                  )}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function BudgetPanel({
  r,
  onCost,
}: {
  r: BookReturn;
  onCost: (key: CostKey, n: number) => void;
}) {
  const econ = unitEconomics(r);
  const cost = totalCost(r);
  const keys = Object.keys(COST_LABELS) as CostKey[];
  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-ink px-5 py-5 text-bg-elevated">
        <p className="text-xs uppercase tracking-[0.16em] text-rail-muted">Spent against cap</p>
        <p className="mt-2 font-display text-4xl tabular-nums tracking-tight">
          {formatMoney(cost)}
          <span className="ml-2 font-sans text-base text-rail-muted">/ {formatMoney(r.budgetCap)}</span>
        </p>
        <p className="mt-2 text-sm text-rail-muted">
          {econ.overBudget > 0
            ? `${formatMoney(econ.overBudget)} over the house cap — this blocks the file.`
            : `${formatMoney(r.budgetCap - cost)} remaining.`}
        </p>
      </div>
      <div className="space-y-3">
        {keys.map((k) => (
          <div key={k} className="grid grid-cols-[1fr_7rem] items-center gap-3">
            <Label htmlFor={`cost-${k}`}>{COST_LABELS[k]}</Label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint">$</span>
              <Input
                id={`cost-${k}`}
                type="number"
                min={0}
                step={1}
                className="pl-7"
                value={r.costs[k] || ""}
                onChange={(e) => onCost(k, Number(e.target.value) || 0)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChannelsPanel({
  r,
  onToggle,
}: {
  r: BookReturn;
  onToggle: (key: keyof BookReturn["channels"]) => void;
}) {
  return (
    <div className="space-y-2">
      {r.exclusiveKdp ? (
        <p className="rounded-lg bg-amber/10 px-3 py-2 text-sm text-amber">
          KDP Select is on. Apple, Google, and Kobo will conflict if checked.
        </p>
      ) : null}
      {CHANNELS.map((c) => {
        const on = r.channels[c.id];
        const conflict = Boolean(r.exclusiveKdp && c.exclusiveConflict && on);
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onToggle(c.id)}
            className={cn(
              "flex w-full items-start gap-3 rounded-lg px-4 py-3 text-left shadow-[var(--shadow-border)]",
              on ? "bg-ink text-bg-elevated" : "bg-bg-elevated text-ink",
              conflict && "ring-1 ring-brick",
            )}
          >
            <span
              className={cn(
                "mt-0.5 grid size-5 place-items-center rounded-sm border",
                on ? "border-bg-elevated bg-bg-elevated text-ink" : "border-line-strong",
              )}
            >
              {on ? <Check className="size-3" strokeWidth={3} /> : null}
            </span>
            <span>
              <span className="block font-medium">{c.label}</span>
              <span className={cn("block text-sm", on ? "text-bg-elevated/70" : "text-muted")}>{c.blurb}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function ReviewPanel({
  r,
  onJump,
}: {
  r: BookReturn;
  onJump: (stepId: string) => void;
}) {
  const catalog = useManguStore((s) => s.returns);
  const issues = issuesFor(r, catalog);
  const blocks = issues.filter((i) => i.level === "block");
  const warns = issues.filter((i) => i.level === "warn");
  const pct = completeness(r);
  const econ = unitEconomics(r);
  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-ink px-5 py-6 text-bg-elevated">
        <p className="text-xs uppercase tracking-[0.16em] text-rail-muted">Estimated contribution</p>
        <p className="mt-2 font-display text-5xl tabular-nums tracking-tight">
          {formatMoney(Math.round(econ.contribution))}
        </p>
        <p className="mt-2 max-w-md text-sm text-rail-muted">
          On 100 ebooks, 40 paperbacks
          {r.produceAudio ? ", and 20 audiobooks" : ""}, after this title’s cost of {formatMoney(econ.cost)}.
          Break-even at {formatNumber(econ.breakEvenCopies)} ebook copies.
        </p>
        <p className="mt-4 text-sm">
          Return completeness <span className="tabular-nums">{pct}%</span>
          {econ.pages ? ` · ~${econ.pages} pages` : ""}
          {econ.spineMm ? ` · spine ${econ.spineMm} mm` : ""}
        </p>
        <p className="mt-2 text-sm text-rail-muted">
          {blocks.length} blocking · {warns.length} warnings
        </p>
      </div>

      {blocks.length === 0 ? (
        <div className="flex items-start gap-3 rounded-xl bg-sage/10 px-4 py-3 text-sage">
          <Check className="mt-0.5 size-5 shrink-0" />
          <div>
            <p className="font-medium">No blocking issues</p>
            <p className="text-sm opacity-80">You can file this title to the house.</p>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="font-display text-xl text-ink">Blocking</h3>
          <ul className="mt-3 space-y-2">
            {blocks.map((i) => (
              <li key={i.id}>
                <button
                  type="button"
                  onClick={() => onJump(i.stepId)}
                  className="flex w-full items-start gap-3 rounded-lg bg-bg-elevated px-4 py-3 text-left shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
                >
                  <AlertTriangle className="mt-0.5 size-4 shrink-0 text-brick" />
                  <span>
                    <span className="block font-medium text-ink">{i.title}</span>
                    <span className="mt-0.5 block font-mono text-[11px] tracking-wide text-brick/80">{i.id}</span>
                    <span className="block text-sm text-muted">{i.detail}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {warns.length > 0 ? (
        <div>
          <h3 className="font-display text-xl text-ink">Warnings</h3>
          <ul className="mt-3 space-y-2">
            {warns.map((i) => (
              <li key={i.id}>
                <button
                  type="button"
                  onClick={() => onJump(i.stepId)}
                  className="flex w-full items-start gap-3 rounded-lg bg-bg-elevated px-4 py-3 text-left shadow-[var(--shadow-border)]"
                >
                  <Circle className="mt-0.5 size-4 shrink-0 text-amber" />
                  <span>
                    <span className="block font-medium text-ink">{i.title}</span>
                    <span className="mt-0.5 block font-mono text-[11px] tracking-wide text-amber/80">{i.id}</span>
                    <span className="block text-sm text-muted">{i.detail}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function FilePanel({
  r,
  onFile,
  onUnfile,
  onExport,
}: {
  r: BookReturn;
  onFile: () => void;
  onUnfile: () => void;
  onExport: () => void;
}) {
  const catalog = useManguStore((s) => s.returns);
  const issues = issuesFor(r, catalog).filter((i) => i.level === "block");
  const filed = r.status === "filed";
  const ready = canFile(r, catalog);
  const [signed, setSigned] = useState(false);
  return (
    <div className="space-y-6">
      {filed ? (
        <div className="relative overflow-hidden rounded-xl bg-ink px-6 py-10 text-center text-bg-elevated">
          <Stamp className="mb-4 border-sage text-sage">Filed</Stamp>
          <h3 className="font-display text-4xl tracking-tight">This title is filed.</h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-rail-muted">
            {displayTitle(r)} by {displayAuthor(r)} entered the house record
            {r.filedAt
              ? ` on ${new Date(r.filedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`
              : ""}
            . Filing is not printing. It is the operator saying the packet is complete enough to produce.
          </p>
          {r.filingReceipt ? (
            <dl className="mx-auto mt-6 grid max-w-md grid-cols-2 gap-2 text-left text-xs text-rail-muted">
              <dt>Receipt</dt>
              <dd className="font-mono text-rail-fg">{r.filingReceipt.id}</dd>
              <dt>Packet hash</dt>
              <dd className="font-mono text-rail-fg">{r.filingReceipt.packetHash}</dd>
              <dt>Operator</dt>
              <dd className="text-rail-fg">{r.filingReceipt.operator}</dd>
              <dt>Warnings filed</dt>
              <dd className="text-rail-fg">{r.filingReceipt.warningCount}</dd>
            </dl>
          ) : null}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button variant="secondary" onClick={onExport}>
              <Download className="size-4" />
              Download packet
            </Button>
            <Button variant="ghost" className="text-rail-fg hover:bg-rail-active" onClick={onUnfile}>
              Reopen return
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="rounded-xl bg-surface px-5 py-5">
            <p className="font-display text-2xl text-ink">{displayTitle(r)}</p>
            <p className="mt-1 text-muted">{displayAuthor(r)}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>{r.language.toUpperCase()}</Badge>
              <Badge tone="muted">{r.contentType || "untyped"}</Badge>
              <Badge tone={ready ? "sage" : "amber"}>{ready ? "Cleared to file" : "Not yet"}</Badge>
            </div>
          </div>
          {!ready ? (
            <p className="flex items-start gap-2 text-sm text-brick">
              <Lock className="mt-0.5 size-4 shrink-0" />
              {issues.length} blocking {issues.length === 1 ? "issue" : "issues"} remain. Return to Review and clear them.
              Quality must also be a pass.
            </p>
          ) : (
            <p className="text-sm text-muted">
              Operator sign-off files this packet to the house. You can reopen it later.
            </p>
          )}
          <label className="flex items-start gap-3 text-sm text-ink-soft">
            <input
              type="checkbox"
              className="mt-1 size-4 accent-ink"
              checked={signed}
              onChange={(e) => setSigned(e.target.checked)}
              disabled={!ready}
            />
            <span>
              I am {r.operator || "the operator of record"} and I sign this packet as complete enough to produce.
            </span>
          </label>
          <Button size="lg" className="w-full sm:w-auto" disabled={!ready || !signed} onClick={onFile}>
            <FileCheck className="size-4" />
            File this title
          </Button>
        </>
      )}
    </div>
  );
}
