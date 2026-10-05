import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { Draft, PasswordItem } from './types/password'
import { dbService } from './services/db'
import { HomePage } from './pages/HomePage'; import { AddEditPage } from './pages/AddEditPage'; import { DetailPage } from './pages/DetailPage'
import { ExportPage } from './pages/ExportPage'; import { SettingsPage } from './pages/SettingsPage'
import { BottomNav, TabType } from './components/BottomNav'; import { Toast, Confirm } from './components/Toast'
type View = 'list' | 'add' | 'edit' | 'detail'
export function App() {
  const [items, setItems] = useState<PasswordItem[]>([]); const [ready, setReady] = useState(false)
  const [tab, setTab] = useState<TabType>('home'); const [view, setView] = useState<View>('list')
  const [sel, setSel] = useState<PasswordItem | null>(null); const [msg, setMsg] = useState<string | null>(null)
  const [ask, setAsk] = useState<null | 'one' | 'all'>(null); const [, bump] = useState(0)
  const load = async () => { setItems(await dbService.getAll()); setReady(true) }
  useEffect(() => { load() }, [])
  const toast = (m: string) => { setMsg(m); setTimeout(() => setMsg(null), 1800) }
  const save = async (d: Draft) => {
    const now = Date.now(), old = items.find(i => i.id === d.id)
    const item: PasswordItem = { ...d, id: d.id ?? crypto.randomUUID(), createdAt: old?.createdAt ?? now, updatedAt: now }
    await dbService.save(item); await load()
    if (old) { setSel(item); setView('detail'); toast('已更新') } else { setView('list'); toast('已儲存') }
  }
  const copy = async (t: string, n: string) => { try { await navigator.clipboard.writeText(t); toast('已複製' + n) } catch { toast('無法複製') } }
  const confirmDelete = async () => {
    if (ask === 'one' && sel) { await dbService.delete(sel.id); setSel(null); setView('list'); toast('已刪除') }
    if (ask === 'all') { await dbService.clear(); toast('已清除所有資料') }
    setAsk(null); await load()
  }
  const showNav = view === 'list'
  return <div className="h-full flex justify-center items-center">
    <div className="relative w-full max-w-[390px] h-full md:h-[844px] md:max-h-full bg-bgMain overflow-hidden md:rounded-[40px] md:shadow-2xl">
      <Toast message={msg} />
      {ask && <Confirm text={ask === 'one' ? '確定要刪除這筆資料嗎？' : '將刪除所有項目且無法復原，確定嗎？'} ok={confirmDelete} cancel={() => setAsk(null)} />}
      <div key={tab + view} className="h-full overflow-y-auto no-scrollbar" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        {!ready ? null : tab === 'export' ? <ExportPage items={items} toast={toast} /> :
          tab === 'settings' ? <SettingsPage items={items} onChanged={() => bump(n => n + 1)} onClear={() => setAsk('all')} /> :
          view === 'list' ? <HomePage onCats={() => bump(n => n + 1)} items={items} onSelect={i => { setSel(i); setView('detail') }} /> :
          view === 'add' ? <AddEditPage onSave={save} onBack={() => setView('list')} /> :
          view === 'edit' && sel ? <AddEditPage initial={sel} onSave={save} onBack={() => setView('detail')} /> :
          sel ? <DetailPage item={sel} onBack={() => setView('list')} onEdit={() => setView('edit')} onDelete={() => setAsk('one')} onCopy={copy} /> : null}
      </div>
      {showNav && tab === 'home' && <button aria-label="新增項目" onClick={() => setView('add')} className="absolute right-6 bottom-24 z-20 w-12 h-12 rounded-full bg-brandPrimary text-white shadow-lg flex items-center justify-center active:scale-95 transition" style={{ marginBottom: 'env(safe-area-inset-bottom)' }}><Plus className="w-6 h-6" strokeWidth={1.8} /></button>}
      {showNav && <BottomNav active={tab} onChange={setTab} />}
    </div></div>
}
