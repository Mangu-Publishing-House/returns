import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { TopBar } from "@/components/layout/top-bar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useManguStore } from "@/lib/mangu/store";
import { languageByCode } from "@/lib/mangu/catalog";
import { houseSnapshot } from "@/lib/mangu/aggregations";
import { buildCatalogDocument, verifyCatalogDocument } from "@/lib/mangu/schema";
import { formatMoney, formatNumber, cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/house")({ component: HousePage });

function HousePage() {
  const returns = useManguStore((s) => s.returns);
  const house = useManguStore((s) => s.house);
  const resetCatalog = useManguStore((s) => s.resetCatalog);
  const importReturns = useManguStore((s) => s.importReturns);
  const patchHouse = useManguStore((s) => s.patchHouse);
  const fileRef = useRef<HTMLInputElement>(null);

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

  const onImport = async (file: File | undefined) => {
    if (!file) return;
    try {
      const raw = JSON.parse(await file.text()) as unknown;
      const result = verifyCatalogDocument(raw);
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

  return (
    <div className="min-h-dvh bg-bg">
      <TopBar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">The house</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          A factory with a literary name.
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
          MANGU Publishers, from a Mumbai hut in 1959 to an American imprint. Catalog target through
          December 2027: {formatNumber(house.englishTarget)} English titles and{" "}
          {formatNumber(house.worldTarget)} across 19 other languages. About 60% romance and
          commercial fiction. Quality bar is not trash. Budget about {formatMoney(house.budgetPerTitle)}{" "}
          a book.
        </p>

        <section className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Meter label="English" value={snap.english} cap={snap.englishTarget} />
          <Meter label="World languages" value={snap.world} cap={snap.worldTarget} />
          <div className="rounded-xl bg-bg-elevated px-5 py-4 shadow-[var(--shadow-border)]">
            <p className="text-xs uppercase tracking-[0.14em] text-muted">Filed this season</p>
            <p className="mt-2 font-display text-3xl tabular-nums">{snap.filed}</p>
            <p className="mt-1 text-sm text-faint">
              {snap.ready} ready · {snap.open} open · {returns.length} in the book
            </p>
          </div>
          <div className="rounded-xl bg-bg-elevated px-5 py-4 shadow-[var(--shadow-border)]">
            <p className="text-xs uppercase tracking-[0.14em] text-muted">Romance mix</p>
            <p className="mt-2 font-display text-3xl tabular-nums">{snap.romancePct}%</p>
            <p className="mt-1 text-sm text-faint">
              House target ~{snap.romanceTarget}% · {snap.romance} of {returns.length}
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl text-ink">Thirteen-section path</h2>
          <p className="mt-1 text-sm text-muted">
            Every title in the book, House through File. A dash is a skip, not a gap.
          </p>
          <div className="mt-5 overflow-x-auto rounded-xl bg-bg-elevated shadow-[var(--shadow-border)]">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-[0.12em] text-muted">
                  <th className="px-4 py-3 font-medium">Title</th>
                  {snap.paths[0]?.sections.map((s) => (
                    <th key={s.id} className="px-1 py-3 text-center font-medium">
                      {s.label.slice(0, 3)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {snap.paths.map((p) => (
                  <tr key={p.id} className="border-b border-line/70 last:border-0">
                    <td className="px-4 py-3">
                      <Link
                        to="/return/$id"
                        params={{ id: p.id }}
                        className="font-medium text-ink hover:underline"
                      >
                        <span lang={p.language} dir={p.language === "ar" || p.language === "ur" ? "rtl" : "ltr"}>
                          {p.title}
                        </span>
                      </Link>
                      <p className="text-xs text-faint">
                        {p.language.toUpperCase()} · {p.completeness}%
                      </p>
                    </td>
                    {p.sections.map((s) => (
                      <td key={s.id} className="px-1 py-3 text-center">
                        <span
                          className={cn(
                            "inline-block size-2.5 rounded-full",
                            s.skipped ? "bg-line-strong" : s.complete ? "bg-sage" : s.ratio > 0 ? "bg-amber" : "bg-line",
                          )}
                          title={`${s.label}: ${s.skipped ? "skipped" : s.complete ? "complete" : "open"}`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-ink">Languages</h2>
            <p className="mt-1 text-sm text-muted">One return per language edition.</p>
            <ul className="mt-5 space-y-2">
              {snap.byLanguage.map((l) => (
                <li key={l.code} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 truncate text-sm text-ink-soft">{l.name}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                    <div
                      className={cn("h-full rounded-full", l.n ? "bg-ink" : "bg-transparent")}
                      style={{ width: `${(l.n / maxLang) * 100}%` }}
                    />
                  </div>
                  <span className="w-6 text-right text-xs tabular-nums text-muted">{l.n}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl text-ink">Imprints</h2>
            <p className="mt-1 text-sm text-muted">
              Romance share this book: {snap.romancePct}% (house target ~60%). Spend{" "}
              {formatMoney(snap.spend)}.
            </p>
            <ul className="mt-5 space-y-3">
              {snap.byImprint.map((i) => (
                <li key={i.id} className="rounded-xl bg-bg-elevated px-4 py-3 shadow-[var(--shadow-border)]">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-medium text-ink">{i.name}</p>
                    <p className="text-sm tabular-nums text-muted">{i.n}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-12 rounded-xl bg-surface px-5 py-6">
          <h2 className="font-display text-2xl text-ink">How a title moves</h2>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01–04", t: "Identity", d: "House, title, class, rights." },
              { n: "05–07", t: "The pages", d: "Manuscript, editorial gates, metadata." },
              { n: "08–11", t: "The object", d: "Design, audio, budget, distribution." },
              { n: "12–13", t: "File", d: "Launch plan, review, operator sign-off." },
            ].map((s) => (
              <li key={s.n}>
                <p className="text-xs uppercase tracking-[0.14em] text-muted">{s.n}</p>
                <p className="mt-1 font-medium text-ink">{s.t}</p>
                <p className="mt-1 text-sm text-faint">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild>
              <Link to="/">Open returns</Link>
            </Button>
            <Button variant="secondary" onClick={exportAll}>
              Export catalog JSON
            </Button>
            <Button variant="secondary" onClick={() => fileRef.current?.click()}>
              Import catalog JSON
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                resetCatalog();
                toast.success("Sample catalog restored.");
              }}
            >
              Restore sample catalog
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => {
                void onImport(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </div>
        </section>

        <p className="mt-10 text-sm text-faint">
          Language of this edition: {languageByCode("en")?.name}. MANGU storefront remains
          mangu-publishers.com. This return book is the operator interview, not the store. Catalog
          JSON is schema {`mangu.catalog.v1`}, signed, round-trippable.
        </p>
      </main>
    </div>
  );
}

function Meter({ label, value, cap }: { label: string; value: number; cap: number }) {
  const pct = Math.min(100, Math.round((value / cap) * 1000) / 10);
  return (
    <div className="rounded-xl bg-bg-elevated px-5 py-4 shadow-[var(--shadow-border)]">
      <p className="text-xs uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl tabular-nums text-ink">
        {formatNumber(value)}
        <span className="ml-1 font-sans text-sm text-faint">/ {formatNumber(cap)}</span>
      </p>
      <Progress value={pct} className="mt-3" />
    </div>
  );
}
