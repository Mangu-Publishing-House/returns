import { cn } from "@/lib/utils";

export function HouseMark({ className, invert = false }: { className?: string; invert?: boolean }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-7", invert ? "text-rail-fg" : "text-ink", className)}
      aria-hidden="true"
    >
      <rect
        x="1.5"
        y="1.5"
        width="29"
        height="29"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontSize="16"
        fontWeight="500"
        fill="currentColor"
      >
        M
      </text>
    </svg>
  );
}

export function Stamp({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex rotate-[-8deg] items-center justify-center rounded-sm border-2 border-sage px-2 py-0.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-sage",
        className,
      )}
    >
      {children}
    </span>
  );
}
