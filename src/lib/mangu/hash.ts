/** Canonical JSON + FNV-1a 32-bit. Sync, deterministic, no WebCrypto. */

function sortValue(v: unknown): unknown {
  if (v === null || v === undefined) return null;
  if (Array.isArray(v)) return v.map(sortValue);
  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    const keys = Object.keys(o).sort();
    const out: Record<string, unknown> = {};
    for (const k of keys) out[k] = sortValue(o[k]);
    return out;
  }
  return v;
}

export function canonicalJson(value: unknown): string {
  return JSON.stringify(sortValue(value));
}

export function fnv1a(str: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

export function contentHash(value: unknown): string {
  return `mh_${fnv1a(canonicalJson(value))}`;
}

const VOLATILE_KEYS = new Set([
  "updatedAt",
  "currentStepId",
  "visitedSteps",
  "filingReceipt",
  "status",
  "filedAt",
  "operatorSignoff",
]);

export function packetContent(r: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const k of Object.keys(r).sort()) {
    if (VOLATILE_KEYS.has(k)) continue;
    out[k] = r[k];
  }
  return out;
}

export function packetHash(r: Record<string, unknown>): string {
  return contentHash(packetContent(r));
}

export function signCatalog(payload: unknown): { version: 1; hash: string; payload: unknown } {
  const body = { version: 1 as const, payload };
  return { version: 1, hash: contentHash(body), payload };
}

export function verifyCatalogSignature(doc: { version?: unknown; hash?: unknown; payload?: unknown }): boolean {
  if (!doc || doc.version !== 1 || typeof doc.hash !== "string") return false;
  return contentHash({ version: 1, payload: doc.payload }) === doc.hash;
}
