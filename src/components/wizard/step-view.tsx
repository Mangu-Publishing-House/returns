import { useState } from "react";
import { PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChoiceGrid, ChipSet } from "./choice-grid";
import { BudgetPanel, ChannelsPanel, ChecklistPanel, FilePanel, ReviewPanel } from "./special-panels";
import { generateCopy, snapshotFrom } from "@/lib/mangu/ai";
import { asBool, asString, getField } from "@/lib/mangu/fields";
import { useManguStore } from "@/lib/mangu/store";
import { filedPacket } from "@/lib/mangu/scoring";
import { displayTitle } from "@/lib/mangu/blank";
import type { BookReturn, CostKey, FieldPath, PassStatus } from "@/lib/mangu/types";
import type { StepDef } from "@/lib/mangu/steps";
import { toast } from "sonner";

function applyText(id: string, path: FieldPath | undefined, raw: string) {
  if (!path) return;
  if (path === "keywords" || path === "contentWarnings") {
    const kws = raw
      .split(/[,;\n]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 12);
    useManguStore.getState().setField({ id, path, value: kws });
    return;
  }
  useManguStore.getState().setField({ id, path, value: raw });
}

export function StepView({
  r,
  step,
  onJump,
}: {
  r: BookReturn;
  step: StepDef;
  onJump: (stepId: string) => void;
}) {
  const setField = useManguStore((s) => s.setField);
  const fileReturn = useManguStore((s) => s.fileReturn);
  const unfileReturn = useManguStore((s) => s.unfileReturn);
  const [aiText, setAiText] = useState("");
  const [aiBusy, setAiBusy] = useState(false);

  const value = step.path ? getField(r, step.path) : undefined;

  const runAi = async () => {
    if (!step.aiKind) return;
    setAiBusy(true);
    setAiText("");
    try {
      const res = await generateCopy({ data: { kind: step.aiKind, snapshot: snapshotFrom(r) } });
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
    if (step.aiKind === "keywords") {
      applyText(r.id, "keywords", aiText);
    } else if (step.aiKind === "titles") {
      const first = aiText
        .split("\n")
        .map((l) => l.replace(/^\s*\d+[.)]\s*/, "").replace(/^[-*]\s*/, "").trim())
        .find((l) => l.length > 1);
      if (first) applyText(r.id, step.path, first);
    } else {
      applyText(r.id, step.path, aiText);
    }
    if (step.path === "coverBrief") {
      setField({ id: r.id, path: "coverStatus", value: r.coverStatus === "not_started" ? "briefed" : r.coverStatus });
    }
    toast.success("Placed in the packet.");
  };

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
        {step.optional ? "Optional" : "Required"}
      </p>
      <h1 className="mt-2 font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl">{step.title}</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">{step.prompt}</p>

      <div className="mt-8">
        {step.type === "intro" ? (
          <div className="rounded-xl bg-surface px-5 py-5 text-ink-soft">
            <p className="font-display text-xl text-ink">How this works</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed">
              <li>One return, one language edition, one book.</li>
              <li>Answer what we ask. We’ll skip audio, heat, and translation when they don’t apply.</li>
              <li>Review lists blocking issues the way a tax return lists missing forms.</li>
              <li>File is operator sign-off — not print, not upload. Production starts after.</li>
            </ul>
          </div>
        ) : null}

        {step.type === "choice" && step.choices ? (
          <ChoiceGrid
            choices={step.choices}
            value={asString(value)}
            onChange={(v) => setField({ id: r.id, path: step.path!, value: v })}
          />
        ) : null}

        {step.type === "yesno" && step.path ? (
          <ChoiceGrid
            columns={1}
            choices={[
              { value: "true", label: "Yes" },
              { value: "false", label: "No" },
            ]}
            value={asBool(value) === null ? "" : asBool(value) ? "true" : "false"}
            onChange={(v) => setField({ id: r.id, path: step.path!, value: v === "true" })}
          />
        ) : null}

        {step.type === "text" && step.path ? (
          <Input
            value={asString(value)}
            placeholder={step.placeholder}
            onChange={(e) => applyText(r.id, step.path, e.target.value)}
          />
        ) : null}

        {step.type === "number" && step.path ? (
          <Input
            type="number"
            value={value === null || value === undefined || value === 0 ? "" : asString(value)}
            placeholder={step.placeholder}
            onChange={(e) => setField({ id: r.id, path: step.path!, value: e.target.value })}
          />
        ) : null}

        {step.type === "textarea" && step.path ? (
          <Textarea
            value={asString(value)}
            placeholder={step.placeholder}
            onChange={(e) => applyText(r.id, step.path, e.target.value)}
          />
        ) : null}

        {step.type === "form" && step.fields ? (
          <div className="space-y-4">
            {step.fields.map((f) => {
              if (f.visible && !f.visible(r)) return null;
              const fv = getField(r, f.path);
              if (f.kind === "textarea") {
                return (
                  <div key={f.path}>
                    <Label htmlFor={f.path}>{f.label}</Label>
                    <Textarea
                      id={f.path}
                      className="mt-1.5"
                      placeholder={f.placeholder}
                      value={asString(fv)}
                      onChange={(e) => applyText(r.id, f.path, e.target.value)}
                    />
                  </div>
                );
              }
              if (f.kind === "select" && f.options) {
                return (
                  <div key={f.path}>
                    <Label className="mb-1.5">{f.label}</Label>
                    <ChoiceGrid
                      columns={1}
                      choices={f.options}
                      value={asString(fv)}
                      onChange={(v) => setField({ id: r.id, path: f.path, value: v })}
                    />
                  </div>
                );
              }
              return (
                <div key={f.path}>
                  <Label htmlFor={f.path}>
                    {f.label}
                    {f.optional ? <span className="ml-1 font-normal text-faint">(optional)</span> : null}
                  </Label>
                  <Input
                    id={f.path}
                    className="mt-1.5"
                    type={f.kind === "number" ? "number" : "text"}
                    placeholder={f.placeholder}
                    value={fv === null || fv === undefined ? "" : asString(fv)}
                    onChange={(e) => setField({ id: r.id, path: f.path, value: e.target.value })}
                  />
                </div>
              );
            })}
          </div>
        ) : null}

        {step.type === "chips" && step.chipOptions && step.path ? (
          <ChipSet
            choices={step.chipOptions.filter((c) => c.value !== r.primaryGenre)}
            value={Array.isArray(value) ? (value as string[]) : []}
            onToggle={(v) => {
              const cur = Array.isArray(value) ? [...(value as string[])] : [];
              const next = cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v];
              setField({ id: r.id, path: step.path!, value: next });
            }}
          />
        ) : null}

        {step.type === "checklist" ? (
          <ChecklistPanel
            r={r}
            onPass={(key, v: PassStatus) => setField({ id: r.id, path: `editorial.${key}`, value: v })}
          />
        ) : null}

        {step.type === "budget" ? (
          <BudgetPanel r={r} onCost={(key: CostKey, n) => setField({ id: r.id, path: `costs.${key}`, value: n })} />
        ) : null}

        {step.type === "channels" ? (
          <ChannelsPanel
            r={r}
            onToggle={(key) => setField({ id: r.id, path: `channels.${key}`, value: !r.channels[key] })}
          />
        ) : null}

        {step.type === "ai" && step.path ? (
          <div className="space-y-4">
            {step.path === "keywords" ? (
              <Input
                value={Array.isArray(value) ? (value as string[]).join(", ") : asString(value)}
                placeholder="workplace romance, family business, holiday deadline"
                onChange={(e) => applyText(r.id, "keywords", e.target.value)}
              />
            ) : step.path === "workingTitle" || step.path === "finalTitle" ? (
              <Input
                value={asString(value)}
                placeholder={step.placeholder}
                onChange={(e) => applyText(r.id, step.path, e.target.value)}
              />
            ) : (
              <Textarea
                value={asString(value)}
                placeholder={step.placeholder}
                onChange={(e) => applyText(r.id, step.path, e.target.value)}
              />
            )}
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" onClick={runAi} disabled={aiBusy}>
                <PenLine className="size-4" />
                {aiBusy ? "Editor is writing…" : "Ask the house editor"}
              </Button>
              {aiText ? (
                <Button type="button" variant="outline" onClick={useAi}>
                  Place in packet
                </Button>
              ) : null}
            </div>
            {aiText ? (
              <pre className="max-h-72 overflow-auto whitespace-pre-wrap rounded-lg bg-surface px-4 py-3 font-sans text-sm leading-relaxed text-ink-soft">
                {aiText}
              </pre>
            ) : null}
          </div>
        ) : null}

        {step.type === "review" ? <ReviewPanel r={r} onJump={onJump} /> : null}

        {step.type === "file" ? (
          <FilePanel
            r={r}
            onFile={() => {
              const ok = fileReturn(r.id);
              if (!ok) toast.error("Blocking issues remain. Clear Review first.");
              else toast.success("Filed to the house.");
            }}
            onUnfile={() => unfileReturn(r.id)}
            onExport={() => {
              const packet = filedPacket(r, useManguStore.getState().returns);
              const blob = new Blob([JSON.stringify(packet, null, 2)], { type: "application/json" });
              const a = document.createElement("a");
              a.href = URL.createObjectURL(blob);
              a.download = `${displayTitle(r).replace(/\s+/g, "-").toLowerCase()}-return.json`;
              a.click();
              URL.revokeObjectURL(a.href);
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
