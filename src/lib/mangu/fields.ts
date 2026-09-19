import type { BookReturn, FieldPath } from "./types.ts";

export function getField(r: BookReturn, path: FieldPath): unknown {
  if (path.startsWith("editorial.")) {
    const key = path.split(".")[1] as keyof BookReturn["editorial"];
    return r.editorial[key];
  }
  if (path.startsWith("costs.")) {
    const key = path.split(".")[1] as keyof BookReturn["costs"];
    return r.costs[key];
  }
  if (path.startsWith("channels.")) {
    const key = path.split(".")[1] as keyof BookReturn["channels"];
    return r.channels[key];
  }
  return r[path as keyof BookReturn];
}

export function asString(v: unknown): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "boolean") return v ? "true" : "false";
  if (Array.isArray(v)) return v.join(", ");
  return String(v);
}

export function asBool(v: unknown): boolean | null {
  if (v === true || v === "true") return true;
  if (v === false || v === "false") return false;
  return null;
}
