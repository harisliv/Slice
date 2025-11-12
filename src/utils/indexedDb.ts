import { IDB_STORES } from "@app/constants";
import { openDB } from "idb";

const getDb = () =>
  openDB("iss-cache", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("dropdownAccounts")) {
        db.createObjectStore("dropdownAccounts", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("lastUpdate")) {
        db.createObjectStore("lastUpdate");
      }
    },
  });

/** Read list + version from IDB */
export async function idbBootstrapList<T>(
  storeName: string,
  versionKey: string,
): Promise<{ dropdownAccounts: T[]; lastUpdate: string | null }> {
  const db = await getDb();
  const [dropdownAccounts, lastUpdate] = await Promise.all([
    db.getAll(storeName),
    db.get(IDB_STORES.lastUpdateStore, versionKey).then((v) => v ?? null),
  ]);
  return { dropdownAccounts, lastUpdate };
}

/** Persist list + version to IDB */
export async function idbPersistList<
  T extends { id?: unknown; name?: unknown },
>(
  storeName: string,
  versionKey: string,
  items: T[],
  version: string,
): Promise<void> {
  const db = await getDb();
  const tx = db.transaction(
    [storeName, IDB_STORES.lastUpdateStore],
    "readwrite",
  );
  const itemsStore = tx.objectStore(storeName);
  const luStore = tx.objectStore(IDB_STORES.lastUpdateStore);

  await itemsStore.clear();

  const validItems = items.filter((item) => item.id && item.name);
  if (validItems.length !== items.length) {
    console.warn(
      `[IndexedDB] Filtered out ${items.length - validItems.length} items without id or name`,
    );
  }

  for (const item of validItems) {
    await itemsStore.put(item);
  }

  await luStore.put(version, versionKey);
  await tx.done;
}

export async function idbAddItem<T extends { id?: unknown; name?: unknown }>(
  storeName: string,
  item: T,
): Promise<void> {
  if (!item.id || !item.name) {
    console.warn("[IndexedDB] Cannot add item without id or name");
    return;
  }
  const db = await getDb();
  await db.put(storeName, item);
}

export const convertToClientEntity = (v: string) =>
  v ?? new Date().toISOString();
