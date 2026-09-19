import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Choice } from "@/lib/mangu/steps";

export function ChoiceGrid({
  choices,
  value,
  onChange,
  columns = "auto",
}: {
  choices: Choice[];
  value: string | string[] | null | undefined;
  onChange: (v: string) => void;
  columns?: "auto" | 1 | 2;
}) {
  const selected = Array.isArray(value) ? value : value ? [String(value)] : [];
  const dense = choices.length > 10;
  return (
    <div
      className={cn(
        "grid gap-2",
        columns === 1
          ? "grid-cols-1"
          : dense
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1",
      )}
    >
      {choices.map((c) => {
        const on = selected.includes(c.value);
        return (
          <button
            key={c.value}
            type="button"
            onClick={() => onChange(c.value)}
            className={cn(
              "flex min-h-14 items-start gap-3 rounded-lg px-4 py-3 text-left shadow-[var(--shadow-border)] transition-[box-shadow,background-color,transform] duration-150 ease-[var(--ease-out)]",
              on
                ? "bg-ink text-bg-elevated shadow-[var(--shadow-border-hover)]"
                : "bg-bg-elevated text-ink hover:shadow-[var(--shadow-border-hover)]",
            )}
          >
            <span
              className={cn(
                "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border",
                on ? "border-bg-elevated bg-bg-elevated text-ink" : "border-line-strong",
              )}
            >
              {on ? <Check className="size-3" strokeWidth={3} /> : null}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-medium leading-snug">{c.label}</span>
              {c.blurb ? (
                <span className={cn("mt-0.5 block text-sm leading-snug", on ? "text-bg-elevated/75" : "text-muted")}>
                  {c.blurb}
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function ChipSet({
  choices,
  value,
  onToggle,
}: {
  choices: Choice[];
  value: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {choices.map((c) => {
        const on = value.includes(c.value);
        return (
          <button
            key={c.value}
            type="button"
            onClick={() => onToggle(c.value)}
            className={cn(
              "min-h-11 rounded-full px-3.5 text-sm font-medium shadow-[var(--shadow-border)] transition-colors duration-150",
              on ? "bg-ink text-bg-elevated" : "bg-bg-elevated text-ink-soft hover:bg-surface",
            )}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
