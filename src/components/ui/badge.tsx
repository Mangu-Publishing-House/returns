import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "ink",
  children,
}: {
  className?: string;
  tone?: "ink" | "sage" | "amber" | "brick" | "muted" | "rail";
  children: ReactNode;
}) {
  const tones = {
    ink: "bg-ink text-bg-elevated",
    sage: "bg-sage/15 text-sage",
    amber: "bg-amber/15 text-amber",
    brick: "bg-brick/12 text-brick",
    muted: "bg-surface text-muted",
    rail: "bg-rail-active text-rail-muted",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 font-sans text-xs font-medium tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
