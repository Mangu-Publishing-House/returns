import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { displayAuthor, displayTitle } from "@/lib/mangu/blank";
import { genreById, languageByCode, imprintById, CONTENT_TYPES } from "@/lib/mangu/catalog";
import { editionDir, editionLang } from "@/lib/mangu/classify";
import { completeness } from "@/lib/mangu/scoring";
import { firstIncompleteId } from "@/lib/mangu/steps";
import type { BookReturn } from "@/lib/mangu/types";
import { statusLabel, statusTone } from "@/components/status";
import { formatMoney } from "@/lib/utils";
import { unitEconomics } from "@/lib/mangu/economics";

export function ReturnCard({ r }: { r: BookReturn }) {
  const pct = completeness(r);
  const step = r.status === "filed" ? "review.file" : r.currentStepId || firstIncompleteId(r);
  const lang = languageByCode(r.language);
  const imprint = r.imprint ? imprintById(r.imprint) : undefined;
  const genre = r.primaryGenre ? genreById(r.primaryGenre) : undefined;
  const econ = unitEconomics(r);
  const typeLabel = CONTENT_TYPES.find((t) => t.id === r.contentType)?.label;
  const bits = [
    imprint?.name,
    genre?.label,
    lang?.native,
    typeLabel && typeLabel.toLowerCase() !== genre?.label?.toLowerCase() ? typeLabel : null,
    r.wordCount ? `${r.wordCount.toLocaleString()} words` : null,
  ].filter(Boolean) as string[];
  return (
    <Link
      to="/return/$id"
      params={{ id: r.id }}
      search={{ step }}
      className="block rounded-xl bg-bg-elevated p-5 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-150 ease-[var(--ease-out)] hover:shadow-[var(--shadow-border-hover)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className="font-display text-xl leading-snug text-ink"
            lang={editionLang(r.language)}
            dir={editionDir(r.language)}
          >
            {displayTitle(r)}
          </p>
          <p className="mt-1 text-sm text-muted">{displayAuthor(r)}</p>
        </div>
        <Badge tone={statusTone(r.status)}>{statusLabel(r.status)}</Badge>
      </div>
      {bits.length > 0 ? (
        <p className="mt-4 text-xs leading-relaxed text-muted">{bits.join(" · ")}</p>
      ) : null}
      <div className="mt-4 flex items-center gap-3">
        <Progress value={pct} className="flex-1" />
        <span className="w-10 text-right text-xs tabular-nums text-muted">{pct}%</span>
      </div>
      <p className="mt-3 text-xs text-faint">
        Contribution {formatMoney(Math.round(econ.contribution))} · cost {formatMoney(econ.cost)}
      </p>
    </Link>
  );
}
