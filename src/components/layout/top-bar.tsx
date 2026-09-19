import { Link, useRouterState } from "@tanstack/react-router";
import { HouseMark } from "@/components/mark";
import { PersistBanner } from "@/components/persist-banner";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/", label: "Returns" },
  { to: "/house", label: "The house" },
] as const;

export function TopBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="border-b border-line bg-bg">
      <PersistBanner />
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <HouseMark />
          <span className="font-display text-lg leading-none text-ink">MANGU Return</span>
        </Link>
        <nav className="flex items-center gap-1">
          {LINKS.map((l) => {
            const on = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium",
                  on ? "bg-surface text-ink" : "text-muted hover:text-ink",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
