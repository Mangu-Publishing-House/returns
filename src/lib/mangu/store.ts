import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { blankReturn, DEFAULT_HOUSE, displayTitle, migrateReturn } from "./blank.ts";
import { SEED_RETURNS } from "./seed.ts";
import { blockingIssues, deriveStatus } from "./scoring.ts";
import { receiptFrom } from "./receipt.ts";
import { issuesFor } from "./rules.ts";
import { manguStorage, persistStatus, type PersistStatus } from "./persist.ts";
import type { AuditEvent, BookReturn, ChannelKey, CostKey, FieldPath, HouseState } from "./types.ts";

type SetField = { id: string; path: FieldPath; value: unknown };

interface ManguStore {
  hydrated: boolean;
  persistKind: PersistStatus;
  house: HouseState;
  returns: BookReturn[];
  audit: AuditEvent[];
  setHydrated: (v: boolean) => void;
  refreshPersist: () => void;
  patchHouse: (p: Partial<HouseState>) => void;
  createReturn: () => string;
  duplicateReturn: (id: string) => string | null;
  deleteReturn: (id: string) => void;
  patchReturn: (id: string, patch: Partial<BookReturn>) => void;
  setField: (input: SetField) => void;
  visitStep: (id: string, stepId: string) => void;
  fileReturn: (id: string) => boolean;
  unfileReturn: (id: string) => void;
  resetCatalog: () => void;
  importReturns: (incoming: BookReturn[]) => void;
  logAudit: (e: Omit<AuditEvent, "at">) => void;
}

function catalogFor(id: string, returns: BookReturn[]): BookReturn[] {
  return returns.filter((x) => x.id !== id);
}

function touch(r: BookReturn, patch: Partial<BookReturn>, catalog: BookReturn[]): BookReturn {
  const next: BookReturn = {
    ...r,
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  if (patch.status !== "filed") {
    const rest = catalog.filter((x) => x.id !== r.id);
    next.status = deriveStatus({ ...next, status: next.status === "filed" ? "filed" : "in_progress" }, rest);
  }
  return next;
}

function setAtPath(r: BookReturn, path: FieldPath, value: unknown): BookReturn {
  if (path.startsWith("editorial.")) {
    const key = path.split(".")[1] as keyof BookReturn["editorial"];
    return { ...r, editorial: { ...r.editorial, [key]: value } };
  }
  if (path.startsWith("costs.")) {
    const key = path.split(".")[1] as CostKey;
    const n = typeof value === "number" ? value : Number(value) || 0;
    return { ...r, costs: { ...r.costs, [key]: n } };
  }
  if (path.startsWith("channels.")) {
    const key = path.split(".")[1] as ChannelKey;
    return { ...r, channels: { ...r.channels, [key]: Boolean(value) } };
  }
  const coerced = coerceField(path, value);
  return { ...r, [path]: coerced } as BookReturn;
}

const NUMERIC = new Set([
  "seriesNumber",
  "wordCount",
  "chapterCount",
  "publicDomainYear",
  "royaltyAuthorPct",
  "budgetCap",
  "audioHours",
  "listPriceEbook",
  "listPricePrint",
  "listPriceAudio",
  "termYears",
  "spineWidthMm",
  "printRoyaltyPct",
  "ebookRoyaltyPct",
  "audioRoyaltyPct",
  "printCostPerUnit",
  "audioRoyaltySplit",
]);

function coerceField(path: FieldPath, value: unknown): unknown {
  if (value === "true") return true;
  if (value === "false") return false;
  if (path === "contentWarnings" && typeof value === "string") {
    return value
      .split(/[,;\n]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (NUMERIC.has(path as string)) {
    if (value === "" || value === null || value === undefined) return null;
    const n = typeof value === "number" ? value : Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return value;
}

function auditOf(list: AuditEvent[], e: Omit<AuditEvent, "at">): AuditEvent[] {
  return [{ ...e, at: new Date().toISOString() }, ...list].slice(0, 200);
}

export const useManguStore = create<ManguStore>()(
  persist(
    (set, get) => ({
      hydrated: true,
      persistKind: persistStatus(),
      house: DEFAULT_HOUSE,
      returns: SEED_RETURNS,
      audit: [],
      setHydrated: (v) => set({ hydrated: v, persistKind: persistStatus() }),
      refreshPersist: () => set({ persistKind: persistStatus() }),
      patchHouse: (p) => set({ house: { ...get().house, ...p } }),
      logAudit: (e) => set({ audit: auditOf(get().audit, e) }),
      createReturn: () => {
        const r = blankReturn({
          operator: get().house.operatorName,
          catalogSeason: get().house.fiscalSeason,
          budgetCap: get().house.budgetPerTitle,
        });
        set({
          returns: [r, ...get().returns],
          audit: auditOf(get().audit, {
            action: "create",
            returnId: r.id,
            operator: get().house.operatorName,
          }),
        });
        return r.id;
      },
      duplicateReturn: (id) => {
        const src = get().returns.find((x) => x.id === id);
        if (!src) return null;
        const { id: _omit, createdAt: _c, updatedAt: _u, filedAt: _f, filingReceipt: _fr, ...rest } = src;
        const copy = blankReturn({
          ...rest,
          workingTitle: `${displayTitle(src)} (copy)`,
          finalTitle: src.finalTitle ? `${src.finalTitle} (copy)` : "",
          status: "in_progress",
          operatorSignoff: false,
          isbnPrint: "",
          isbnEbook: "",
          isbnAudio: "",
          filingReceipt: null,
        });
        set({ returns: [copy, ...get().returns] });
        return copy.id;
      },
      deleteReturn: (id) =>
        set({
          returns: get().returns.filter((r) => r.id !== id),
          audit: auditOf(get().audit, {
            action: "delete",
            returnId: id,
            operator: get().house.operatorName,
          }),
        }),
      patchReturn: (id, patch) =>
        set({
          returns: get().returns.map((r) => (r.id === id ? touch(r, patch, catalogFor(id, get().returns)) : r)),
        }),
      setField: ({ id, path, value }) =>
        set({
          returns: get().returns.map((r) => {
            if (r.id !== id) return r;
            return touch(setAtPath(r, path, value), {}, catalogFor(id, get().returns));
          }),
        }),
      visitStep: (id, stepId) =>
        set({
          returns: get().returns.map((r) => {
            if (r.id !== id) return r;
            const visited = r.visitedSteps.includes(stepId) ? r.visitedSteps : [...r.visitedSteps, stepId];
            return touch(r, { currentStepId: stepId, visitedSteps: visited }, catalogFor(id, get().returns));
          }),
        }),
      fileReturn: (id) => {
        const r = get().returns.find((x) => x.id === id);
        if (!r) return false;
        const catalog = catalogFor(id, get().returns);
        if (blockingIssues(r, catalog).length > 0) return false;
        const issues = issuesFor(r, catalog);
        const receipt = receiptFrom(r, issues);
        set({
          returns: get().returns.map((x) =>
            x.id === id
              ? {
                  ...x,
                  status: "filed",
                  operatorSignoff: true,
                  filedAt: receipt.filedAt,
                  filingReceipt: receipt,
                  updatedAt: receipt.filedAt,
                  currentStepId: "review.file",
                }
              : x,
          ),
          audit: auditOf(get().audit, {
            action: "file",
            returnId: id,
            operator: r.operator || get().house.operatorName,
            detail: receipt.packetHash,
          }),
        });
        return true;
      },
      unfileReturn: (id) =>
        set({
          returns: get().returns.map((r) =>
            r.id === id
              ? touch(
                  { ...r, status: "in_progress", operatorSignoff: false, filedAt: undefined, filingReceipt: null },
                  {},
                  catalogFor(id, get().returns),
                )
              : r,
          ),
          audit: auditOf(get().audit, {
            action: "unfile",
            returnId: id,
            operator: get().house.operatorName,
          }),
        }),
      resetCatalog: () =>
        set({
          returns: SEED_RETURNS.map((r) => migrateReturn(r)),
          house: DEFAULT_HOUSE,
          audit: auditOf(get().audit, {
            action: "restore",
            returnId: "*",
            operator: get().house.operatorName,
            detail: "sample catalog",
          }),
        }),
      importReturns: (incoming) => {
        if (!Array.isArray(incoming) || incoming.length === 0) return;
        const migrated = incoming.map((r) => migrateReturn(r));
        set({
          returns: migrated,
          audit: auditOf(get().audit, {
            action: "import",
            returnId: "*",
            operator: get().house.operatorName,
            detail: `${migrated.length} titles`,
          }),
        });
      },
    }),
    {
      name: "mangu-return-v2",
      storage: createJSONStorage(() => manguStorage),
      partialize: (s) => ({ house: s.house, returns: s.returns, audit: s.audit }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.returns = (state.returns ?? []).map((r) => migrateReturn(r));
          state.setHydrated(true);
        }
      },
    },
  ),
);

export function useReturn(id: string | undefined): BookReturn | undefined {
  return useManguStore((s) => s.returns.find((r) => r.id === id));
}
