import { useEffect } from "react";
import { useManguStore } from "@/lib/mangu/store";

export function PersistBanner() {
  const persistKind = useManguStore((s) => s.persistKind);
  const refresh = useManguStore((s) => s.refreshPersist);

  useEffect(() => {
    refresh();
    const on = () => refresh();
    window.addEventListener("online", on);
    window.addEventListener("offline", on);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", on);
    };
  }, [refresh]);

  const offline = typeof navigator !== "undefined" && navigator.onLine === false;
  const warn = persistKind.warning;

  if (!warn && !offline) return null;

  return (
    <div className="border-b border-amber/30 bg-amber/10 px-4 py-2 text-center text-sm text-amber">
      {offline
        ? "You are offline. The interview keeps working on this device; export JSON as a backup."
        : warn}
    </div>
  );
}
