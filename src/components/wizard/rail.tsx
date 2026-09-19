import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { railSections, sectionProgress, skipReason, type SectionDef } from "@/lib/mangu/steps";
import type { BookReturn } from "@/lib/mangu/types";

export function SectionRail({
  r,
  currentSectionId,
  onSection,
}: {
  r: BookReturn;
  currentSectionId: string;
  onSection: (section: SectionDef) => void;
}) {
  const sections = railSections();
  return (
    <nav aria-label="Return sections" className="px-3 py-4">
      <ol className="space-y-0.5">
        {sections.map((sec) => {
          const { done, total, skipped } = sectionProgress(sec.id, r);
          const complete = !skipped && total > 0 && done === total;
          const active = sec.id === currentSectionId;
          const reason = skipped ? skipReason(sec.id, r) : null;
          return (
            <li key={sec.id}>
              <button
                type="button"
                onClick={() => onSection(sec)}
                title={reason ?? undefined}
                aria-current={active ? "step" : undefined}
                aria-label={`${sec.railLabel}${skipped ? ", skipped" : complete ? ", complete" : `, ${done} of ${total}`}`}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors duration-150",
                  active ? "bg-rail-active text-rail-fg" : "text-rail-muted hover:bg-rail-active hover:text-rail-fg",
                  skipped && !active && "opacity-70",
                )}
              >
                <span
                  className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-full border text-[11px] font-medium",
                    complete
                      ? "border-sage bg-sage text-sage-fg"
                      : skipped
                        ? "border-rail-muted/50 text-rail-muted"
                        : active
                          ? "border-rail-fg text-rail-fg"
                          : "border-rail-muted/40",
                  )}
                >
                  {complete ? (
                    <Check className="size-3.5" strokeWidth={3} />
                  ) : skipped ? (
                    <Minus className="size-3.5" strokeWidth={3} />
                  ) : (
                    sec.number
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{sec.railLabel}</span>
                  <span className={cn("block text-xs tabular-nums", active ? "text-rail-muted" : "text-rail-muted/70")}>
                    {skipped ? "Skipped" : `${done}/${total}`}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
