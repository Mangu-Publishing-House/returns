import { HOUSE_ISBN_PREFIX } from "./classify.ts";

export function digitsOnly(isbn: string): string {
  return isbn.replace(/[^0-9Xx]/g, "").toUpperCase();
}

export function isbn13Checksum(digits12: string): string {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const n = Number(digits12[i]);
    sum += i % 2 === 0 ? n : n * 3;
  }
  const mod = sum % 10;
  return String(mod === 0 ? 0 : 10 - mod);
}

export function isValidIsbn13(raw: string): boolean {
  const d = digitsOnly(raw);
  if (d.length !== 13) return false;
  if (!/^\d{13}$/.test(d)) return false;
  return isbn13Checksum(d.slice(0, 12)) === d[12];
}

export function formatIsbn13(raw: string): string {
  const d = digitsOnly(raw);
  if (d.length !== 13) return raw.trim();
  return `${d.slice(0, 3)}-${d.slice(3, 4)}-${d.slice(4, 10)}-${d.slice(10, 12)}-${d.slice(12)}`;
}

export function isHousePrefix(raw: string): boolean {
  const d = digitsOnly(raw);
  return d.startsWith(HOUSE_ISBN_PREFIX);
}

export type IsbnIssue =
  | { ok: true; digits: string }
  | { ok: false; code: "empty" | "format" | "checksum" | "prefix"; reason: string };

export function inspectIsbn(raw: string, opts: { requiredPrefix?: boolean } = {}): IsbnIssue {
  const trimmed = raw.trim();
  if (!trimmed) return { ok: false, code: "empty", reason: "No ISBN entered." };
  const d = digitsOnly(trimmed);
  if (d.length !== 13 || !/^\d{13}$/.test(d)) {
    return {
      ok: false,
      code: "format",
      reason: "ISBN must be 13 digits (ISBN-13). Hyphens are allowed.",
    };
  }
  if (isbn13Checksum(d.slice(0, 12)) !== d[12]) {
    return {
      ok: false,
      code: "checksum",
      reason: `ISBN checksum failed. Expected check digit ${isbn13Checksum(d.slice(0, 12))}.`,
    };
  }
  if (opts.requiredPrefix && !d.startsWith(HOUSE_ISBN_PREFIX)) {
    return {
      ok: false,
      code: "prefix",
      reason: "Ingram titles must use the house ISBN block 978-1-948200.",
    };
  }
  return { ok: true, digits: d };
}

export function makeHouseIsbn(serial: number): string {
  const body = `${HOUSE_ISBN_PREFIX}${String(serial).padStart(2, "0")}`.slice(0, 12);
  return formatIsbn13(body + isbn13Checksum(body));
}
