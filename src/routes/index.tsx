import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/layout/top-bar";
import { ReturnCard } from "@/components/dashboard/return-card";
import { Stamp } from "@/components/mark";
import { useManguStore } from "@/lib/mangu/store";
import { displayTitle } from "@/lib/mangu/blank";
import { completeness } from "@/lib/mangu/scoring";
import { firstIncompleteId } from "@/lib/mangu/steps";
import { LANGUAGES } from "@/lib/mangu/catalog";
import { formatNumber } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const navigate = useNavigate();
  const returns = useManguStore((s) => s.returns);
  const house = useManguStore((s) => s.house);
  const createReturn = useManguStore((s) => s.createReturn);

  const startNew = () => {
    const id = createReturn();
    navigate({ to: "/return/$id", params: { id }, search: { step: "house.welcome" } });
  };

  const inFlight = returns.filter((r) => r.status !== "filed");
  const filed = returns.filter((r) => r.status === "filed");
  const last = [...inFlight].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
  const english = returns.filter((r) => r.language === "en").length;
  const world = returns.filter((r) => r.language !== "en").length;
  const ready = returns.filter((r) => r.status === "ready_to_file").length;

  return (
    <div className="min-h-dvh bg-bg">
      <TopBar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Stamp>Est. 1959</Stamp>
            <h1 className="mt-5 font-display text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl">
              File a book.
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
              The house interview — idea to market, one title at a time. Same shape as a tax
              return: we ask, we skip what doesn’t apply, we stop you before you file a gap.
            </p>
          </div>
          <Button size="lg" onClick={startNew} className="shrink-0 self-start lg:self-auto">
            <Plus className="size-4" />
            Start a new return
          </Button>
        </div>

        <section className="mt-10 grid gap-3 sm:grid-cols-3">
          <Stat
            label="Catalog season"
            value={house.fiscalSeason}
            hint={`${formatNumber(house.englishTarget)} English · ${formatNumber(house.worldTarget)} world`}
          />
          <Stat
            label="Open returns"
            value={String(inFlight.length)}
            hint={`${ready} ready to file · ${filed.length} filed`}
          />
          <Stat
            label="Language mix"
            value={`${english} / ${world}`}
            hint={`English / ${LANGUAGES.length - 1} other house languages`}
          />
        </section>

        {last ? (
          <section className="mt-10 rounded-xl bg-ink px-5 py-6 text-bg-elevated sm:px-7">
            <p className="text-xs uppercase tracking-[0.16em] text-rail-muted">Continue where you left off</p>
            <p className="mt-2 font-display text-3xl">{displayTitle(last)}</p>
            <p className="mt-1 text-sm text-rail-muted">
              {completeness(last)}% complete · last touched{" "}
              {new Date(last.updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
            <Button
              variant="secondary"
              className="mt-5"
              onClick={() =>
                navigate({
                  to: "/return/$id",
                  params: { id: last.id },
                  search: { step: last.currentStepId || firstIncompleteId(last) },
                })
              }
            >
              Continue this return
            </Button>
          </section>
        ) : null}

        <section className="mt-12">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-display text-2xl text-ink">Open returns</h2>
            <p className="text-sm text-muted">{inFlight.length}</p>
          </div>
          {inFlight.length === 0 ? (
            <p className="mt-6 text-muted">No open returns. Start one and walk it through the house.</p>
          ) : (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {inFlight.map((r) => (
                <ReturnCard key={r.id} r={r} />
              ))}
            </div>
          )}
        </section>

        {filed.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-display text-2xl text-ink">Filed</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {filed.map((r) => (
                <ReturnCard key={r.id} r={r} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl bg-bg-elevated px-5 py-4 shadow-[var(--shadow-border)]">
      <p className="text-xs uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-2 font-display text-2xl leading-tight text-ink">{value}</p>
      <p className="mt-1 text-sm text-faint">{hint}</p>
    </div>
  );
}
