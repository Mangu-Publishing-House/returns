import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sheet } from "@/components/ui/sheet";
import { HouseMark } from "@/components/mark";
import { SectionRail } from "./rail";
import { StepView } from "./step-view";
import { displayTitle } from "@/lib/mangu/blank";
import { completeness } from "@/lib/mangu/scoring";
import { editionDir, editionLang } from "@/lib/mangu/classify";
import {
  nextStepId,
  prevStepId,
  sectionSteps,
  stepById,
  visibleSteps,
  isSectionSkipped,
  skipReason,
  type SectionDef,
} from "@/lib/mangu/steps";
import { useManguStore } from "@/lib/mangu/store";
import type { BookReturn } from "@/lib/mangu/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function WizardFrame({
  r,
  stepId,
}: {
  r: BookReturn;
  stepId: string;
}) {
  const navigate = useNavigate();
  const visitStep = useManguStore((s) => s.visitStep);
  const [menu, setMenu] = useState(false);
  const [shake, setShake] = useState(false);

  const steps = visibleSteps(r);
  const step = stepById(stepId) ?? steps[0];
  const currentId = step?.id ?? "house.welcome";
  const next = nextStepId(currentId, r);
  const prev = prevStepId(currentId, r);
  const pct = completeness(r);
  const section = step?.sectionId ?? "house";

  useEffect(() => {
    visitStep(r.id, currentId);
  }, [r.id, currentId, visitStep]);

  const go = (id: string | null) => {
    if (!id) return;
    navigate({
      to: "/return/$id",
      params: { id: r.id },
      search: { step: id },
    });
  };

  const onSection = (sec: SectionDef) => {
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

  return (
    <div className="flex min-h-dvh bg-bg text-ink">
      <aside className="hidden w-64 shrink-0 flex-col bg-rail text-rail-fg lg:flex">
        <div className="flex items-center gap-2.5 border-b border-rail-line px-4 py-4">
          <HouseMark invert className="size-7" />
          <div className="min-w-0">
            <p className="font-display text-lg leading-none text-rail-fg">MANGU Return</p>
            <p
              className="mt-1 truncate text-xs text-rail-muted"
              lang={editionLang(r.language)}
              dir={editionDir(r.language)}
            >
              {displayTitle(r)}
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <SectionRail r={r} currentSectionId={section} onSection={onSection} />
        </div>
        <div className="border-t border-rail-line px-4 py-4">
          <p className="text-xs uppercase tracking-[0.14em] text-rail-muted">Completeness</p>
          <p className="mt-1 font-display text-2xl tabular-nums">{pct}%</p>
          <Progress value={pct} track="rail" className="mt-2" />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-bg/90 px-3 py-3 backdrop-blur-sm sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Sections"
            onClick={() => setMenu(true)}
          >
            <Menu />
          </Button>
          <Link
            to="/"
            className="hidden text-sm font-medium text-muted hover:text-ink sm:inline"
          >
            Save & exit
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-sm tabular-nums text-muted sm:inline">{pct}% complete</span>
            <Button asChild variant="secondary" size="sm">
              <Link to="/">Exit</Link>
            </Button>
          </div>
        </header>

        <div className="flex flex-1">
          <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12">
            <div className={cn("mx-auto max-w-2xl", shake && "animate-shake")}>
              {step ? <StepView r={r} step={step} onJump={go} /> : null}
            </div>
          </main>
          <aside className="hidden w-72 shrink-0 border-l border-line xl:block">
            <div className="sticky top-20 px-5 py-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Why we ask</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{step?.why}</p>
              {r.status === "filed" ? (
                <p className="mt-6 text-sm text-sage">This return is filed to the house.</p>
              ) : null}
            </div>
          </aside>
        </div>

        <footer className="sticky bottom-0 z-20 border-t border-line bg-bg-elevated/95 px-4 py-3 backdrop-blur-sm sm:px-8">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 xl:max-w-none">
            <Button variant="ghost" disabled={!prev} onClick={() => go(prev)}>
              <ArrowLeft className="size-4" />
              Back
            </Button>
            {next ? (
              <Button onClick={continueNext}>
                Continue
                <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button asChild variant="secondary">
                <Link to="/">Back to catalog</Link>
              </Button>
            )}
          </div>
        </footer>
      </div>

      <Sheet open={menu} onOpenChange={setMenu} title="Sections">
        <SectionRail r={r} currentSectionId={section} onSection={onSection} />
      </Sheet>
    </div>
  );
}
