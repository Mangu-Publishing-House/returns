import type { StateStorage } from "zustand/middleware";

const DB_NAME = "mangu-return";
const STORE_NAME = "kv";
const LEGACY_KEY = "mangu-return-v1";

export type PersistKind = "idb" | "local" | "memory";

export type PersistStatus = {
  kind: PersistKind;
  warning: string | null;
};

let status: PersistStatus = { kind: "idb", warning: null };
const memory = new Map<string, string>();

export function persistStatus(): PersistStatus {
  return status;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbGet(name: string): Promise<string | null> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const req = tx.objectStore(STORE_NAME).get(name);
    req.onsuccess = () => resolve((req.result as string | undefined) ?? null);
    req.onerror = () => reject(req.error);
  });
}

async function idbSet(name: string, value: string): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const req = tx.objectStore(STORE_NAME).put(value, name);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

async function idbDel(name: string): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const req = tx.objectStore(STORE_NAME).delete(name);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

function localGet(name: string): string | null {
  try {
    return localStorage.getItem(name);
  } catch {
    return null;
  }
}

function localSet(name: string, value: string): void {
  localStorage.setItem(name, value);
}

export const manguStorage: StateStorage = {
  getItem: async (name) => {
    if (typeof indexedDB !== "undefined") {
      try {
        const fromIdb = await idbGet(name);
        if (fromIdb != null) {
          status = { kind: "idb", warning: null };
          return fromIdb;
        }
        const legacy = localGet(name) ?? localGet(LEGACY_KEY);
        if (legacy) {
          try {
            await idbSet(name, legacy);
          } catch {
            /* migrate best-effort */
          }
          status = { kind: "idb", warning: null };
          return legacy;
        }
        status = { kind: "idb", warning: null };
        return null;
      } catch {
        const fallback = localGet(name);
        status = {
          kind: "local",
          warning: "IndexedDB is unavailable. Catalog is saving in this browser’s local storage.",
        };
        return fallback;
      }
    }
    try {
      const v = localGet(name);
      status = {
        kind: "local",
        warning: "This browser has no IndexedDB. Catalog is saving in local storage.",
      };
      return v;
    } catch {
      status = {
        kind: "memory",
        warning: "This browser will not keep the catalog. Export JSON before you close the tab.",
      };
      return memory.get(name) ?? null;
    }
  },
  setItem: async (name, value) => {
    if (typeof indexedDB !== "undefined") {
      try {
        await idbSet(name, value);
        status = { kind: "idb", warning: status.kind === "idb" ? null : status.warning };
        return;
      } catch {
        /* fall through */
      }
    }
    try {
      localSet(name, value);
      status = {
        kind: "local",
        warning: "Catalog is saving in local storage. Export JSON as a backup.",
      };
    } catch {
      memory.set(name, value);
      status = {
        kind: "memory",
        warning: "This browser will not keep the catalog. Export JSON before you close the tab.",
      };
    }
  },
  removeItem: async (name) => {
    if (typeof indexedDB !== "undefined") {
      try {
        await idbDel(name);
      } catch {
        /* ignore */
      }
    }
    try {
      localStorage.removeItem(name);
    } catch {
      /* ignore */
    }
    memory.delete(name);
  },
};
