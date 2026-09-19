import { createFileRoute, Link } from "@tanstack/react-router";
import { WizardFrame } from "@/components/wizard/frame";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/layout/top-bar";
import { useManguStore } from "@/lib/mangu/store";
import { stepById, visibleSteps } from "@/lib/mangu/steps";

type Search = { step?: string };

export const Route = createFileRoute("/return/$id")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    step: typeof s.step === "string" ? s.step : undefined,
  }),
  component: ReturnPage,
});

function ReturnPage() {
  const { id } = Route.useParams();
  const { step } = Route.useSearch();
  const rec = useManguStore((s) => s.returns.find((r) => r.id === id));

  if (!rec) {
    return (
      <div className="min-h-dvh bg-bg">
        <TopBar />
        <main className="mx-auto max-w-lg px-4 py-20 text-center">
          <h1 className="font-display text-3xl text-ink">Return not in the book</h1>
          <p className="mt-3 text-muted">
            This packet isn’t in the local catalog. It may have been cleared, or you’re looking at
            another desk.
          </p>
          <Button asChild className="mt-6">
            <Link to="/">Back to returns</Link>
          </Button>
        </main>
      </div>
    );
  }

  const steps = visibleSteps(rec);
  const requested = step && stepById(step) ? step : rec.currentStepId;
  const visible = steps.some((s) => s.id === requested) ? requested : steps[0]?.id ?? "house.welcome";

  return <WizardFrame r={rec} stepId={visible} />;
}
