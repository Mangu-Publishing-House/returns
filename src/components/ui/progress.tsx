import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
  track = "surface",
}: {
  value: number;
  className?: string;
  track?: "surface" | "rail";
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full",
        track === "rail" ? "bg-rail-line" : "bg-line",
        className,
      )}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full bg-sage transition-[width] duration-300 ease-[var(--ease-out)]"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
