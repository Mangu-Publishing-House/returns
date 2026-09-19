import { useEffect, type ReactNode } from "react";
import { useManguStore } from "@/lib/mangu/store";

export function HydrateGate({ children }: { children: ReactNode }) {
  const hydrated = useManguStore((s) => s.hydrated);

  useEffect(() => {
    const api = useManguStore.persist;
    if (api.hasHydrated()) {
      useManguStore.getState().setHydrated(true);
      return;
    }
    const unsub = api.onFinishHydration(() => {
      useManguStore.getState().setHydrated(true);
    });
    const t = window.setTimeout(() => useManguStore.getState().setHydrated(true), 80);
    return () => {
      unsub();
      window.clearTimeout(t);
    };
  }, []);

  if (!hydrated) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-bg text-muted">
        <p className="font-display text-xl text-ink">Opening the house books…</p>
      </div>
    );
  }
  return children;
}
