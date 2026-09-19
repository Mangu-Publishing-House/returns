import { migrateReturn } from "./blank.ts";
import { canonicalJson, contentHash } from "./hash.ts";
import type { BookReturn, HouseState } from "./types.ts";

export const CATALOG_SCHEMA = "mangu.catalog.v1" as const;

export type CatalogBody = {
  schema: typeof CATALOG_SCHEMA;
  house: HouseState;
  returns: BookReturn[];
};

export type CatalogDocument = {
  schema: typeof CATALOG_SCHEMA;
  exportedAt: string;
  hash: string;
  body: CatalogBody;
};

function stableBody(house: HouseState, returns: BookReturn[]): CatalogBody {
  const sorted = [...returns].map((r) => migrateReturn(r)).sort((a, b) => a.id.localeCompare(b.id));
  return { schema: CATALOG_SCHEMA, house, returns: sorted };
}

export function buildCatalogDocument(house: HouseState, returns: BookReturn[]): CatalogDocument {
  const body = stableBody(house, returns);
  return {
    schema: CATALOG_SCHEMA,
    exportedAt: new Date().toISOString(),
    hash: contentHash(body),
    body,
  };
}

export function catalogJson(doc: CatalogDocument): string {
  return canonicalJson(doc);
}

export function verifyCatalogDocument(doc: unknown): { ok: true; doc: CatalogDocument } | { ok: false; error: string } {
  if (!doc || typeof doc !== "object") return { ok: false, error: "Not a catalog document." };
  const d = doc as Record<string, unknown>;

  if (d.body && typeof d.body === "object") {
    const body = d.body as CatalogBody;
    if (body.schema !== CATALOG_SCHEMA) return { ok: false, error: "Unknown catalog schema." };
    if (!Array.isArray(body.returns)) return { ok: false, error: "Catalog body has no returns array." };
    const hash = contentHash(stableBody(body.house, body.returns));
    if (typeof d.hash === "string" && d.hash !== hash) {
      return { ok: false, error: "Catalog signature does not match the body. The file may have been altered." };
    }
    return {
      ok: true,
      doc: {
        schema: CATALOG_SCHEMA,
        exportedAt: typeof d.exportedAt === "string" ? d.exportedAt : new Date().toISOString(),
        hash,
        body: stableBody(body.house, body.returns),
      },
    };
  }

  // Legacy unsigned: { house, returns }
  if (Array.isArray(d.returns)) {
    const house = (d.house ?? {
      operatorName: "House Operator",
      fiscalSeason: "Oct 2026 – Dec 2027",
      englishTarget: 6000,
      worldTarget: 6000,
      budgetPerTitle: 100,
    }) as HouseState;
    const body = stableBody(house, d.returns as BookReturn[]);
    return {
      ok: true,
      doc: {
        schema: CATALOG_SCHEMA,
        exportedAt: typeof d.exportedAt === "string" ? d.exportedAt : new Date().toISOString(),
        hash: contentHash(body),
        body,
      },
    };
  }

  return { ok: false, error: "Unrecognized catalog JSON." };
}

export function roundTripEqual(a: CatalogDocument, b: CatalogDocument): boolean {
  return canonicalJson(a.body) === canonicalJson(b.body) && a.hash === b.hash;
}
