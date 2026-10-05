import Dexie from "dexie";
import type { Table } from "dexie";
import type { PasswordItem } from "../types";

class PasswordDB extends Dexie {
  items!: Table<PasswordItem, number>;

  constructor() {
    super("password_manager_db");
    this.version(1).stores({
      // ++id = auto-increment primary key, indexes on category/name/account for search & filter
      items: "++id, category, name, account, createdAt",
    });
  }
}

export const db = new PasswordDB();

export async function getAllItems(): Promise<PasswordItem[]> {
  return db.items.orderBy("createdAt").reverse().toArray();
}

export async function addItem(item: Omit<PasswordItem, "id">): Promise<number> {
  return db.items.add(item as PasswordItem);
}

export async function updateItem(id: number, changes: Partial<PasswordItem>): Promise<void> {
  await db.items.update(id, { ...changes, updatedAt: Date.now() });
}

export async function deleteItem(id: number): Promise<void> {
  await db.items.delete(id);
}

export async function seedIfEmpty(): Promise<void> {
  const count = await db.items.count();
  if (count > 0) return;
  const now = Date.now();
  const seed: Omit<PasswordItem, "id">[] = [
    { category: "finance", name: "國泰世華銀行", account: "example123", password: "123456", note: "網路銀行", createdAt: now, updatedAt: now },
    { category: "finance", name: "玉山銀行", account: "esunuser", password: "abcdef", note: "", createdAt: now - 1, updatedAt: now - 1 },
    { category: "shopping", name: "蝦皮購物", account: "shopee_user", password: "pass8888", note: "", createdAt: now - 2, updatedAt: now - 2 },
    { category: "shopping", name: "momo購物網", account: "momo_user", password: "pass6666", note: "", createdAt: now - 3, updatedAt: now - 3 },
    { category: "game", name: "Steam", account: "steamer0001", password: "gamepass1", note: "", createdAt: now - 4, updatedAt: now - 4 },
    { category: "game", name: "Epic Games", account: "epicuser1111", password: "gamepass2", note: "", createdAt: now - 5, updatedAt: now - 5 },
    { category: "custom", name: "Google", account: "myaccount@gmail.com", password: "googlepass", note: "個人信箱", createdAt: now - 6, updatedAt: now - 6 },
    { category: "custom", name: "WiFi 分享", account: "-", password: "wifipass777", note: "家用網路", createdAt: now - 7, updatedAt: now - 7 },
  ];
  await db.items.bulkAdd(seed as PasswordItem[]);
}
