import { PasswordItem } from '../types/password'
const DB = 'JP_PasswordManager_DB', S = 'passwords'
const open = () => new Promise<IDBDatabase>((res, rej) => {
  const r = indexedDB.open(DB, 1)
  r.onupgradeneeded = () => { if (!r.result.objectStoreNames.contains(S)) r.result.createObjectStore(S, { keyPath: 'id' }) }
  r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error)
})
async function run<T>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>) {
  const db = await open()
  return new Promise<T>((res, rej) => { const q = fn(db.transaction(S, mode).objectStore(S)); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error) })
}
export const dbService = {
  getAll: async () => (await run<PasswordItem[]>('readonly', s => s.getAll())).sort((a, b) => b.updatedAt - a.updatedAt),
  save: (i: PasswordItem) => run('readwrite', s => s.put(i)),
  delete: (id: string) => run('readwrite', s => s.delete(id)),
  clear: () => run('readwrite', s => s.clear()),
}
