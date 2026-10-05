import { useState } from 'react'
import { Plus, ShieldCheck, Trash2 } from 'lucide-react'
import { PasswordItem } from '../types/password'
import { PALETTE, getCategories, removeCategory, renameCategory } from '../utils/category'
import { CategorySheet } from '../components/CategorySheet'
export const SettingsPage = ({ items, onChanged, onClear }: { items: PasswordItem[]; onChanged: () => void; onClear: () => void }) => {
  const [open, setOpen] = useState(false); const cats = getCategories()
  return <div className="px-5 pt-3 pb-28"><h2 className="text-base font-bold text-center mb-6">設定</h2>
    <div className="flex items-center justify-between mb-2 ml-1"><span className="text-xs font-semibold">大項目管理</span>
      <button onClick={() => setOpen(true)} className="flex items-center gap-1 text-xs text-brandPrimary"><Plus className="w-3.5 h-3.5" />新增</button></div>
    <div className="bg-[#FBF8F2] border border-borderLight rounded-2xl shadow-card px-3 divide-y divide-borderLight/70">
      {cats.map(c => { const n = items.filter(i => i.category === c.id).length
        return <div key={c.id} className="flex items-center gap-2 py-2.5">
          <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: PALETTE[c.color % PALETTE.length].fg }} />
          <input value={c.name} maxLength={8} onChange={e => { renameCategory(c.id, e.target.value); onChanged() }} className="flex-1 min-w-0 bg-transparent text-sm focus:outline-none" aria-label="大項目名稱" />
          <span className="text-[11px] text-textMuted">{n} 筆</span>
          <button aria-label="刪除大項目" disabled={n > 0 || cats.length === 1} onClick={() => { removeCategory(c.id); onChanged() }} className="p-1.5 text-[#B65A55] disabled:opacity-25"><Trash2 className="w-4 h-4" /></button></div> })}</div>
    <p className="text-[11px] text-textMuted mt-2 ml-1">項目裡還有資料的大項目無法刪除；可直接修改名稱。</p>
    <div className="mt-5 flex gap-3 bg-[#FBF8F2] border border-borderLight rounded-2xl p-4 text-[13px] leading-relaxed shadow-card"><ShieldCheck className="w-5 h-5 text-brandPrimary flex-shrink-0 mt-0.5" />
      <p>所有資料只存在這支手機瀏覽器的 IndexedDB，不會上傳。目前共 {items.length} 筆。清除 Safari 網站資料會一併刪除，請定期匯出備份。</p></div>
    <button disabled={!items.length} onClick={onClear} className="w-full h-12 mt-6 flex items-center justify-center gap-2 border-[1.5px] border-[#C9C1B2] bg-[#FBF8F2] text-[#B65A55] text-sm rounded-full disabled:opacity-40"><Trash2 className="w-4 h-4" />清除所有資料</button>
    {open && <CategorySheet onClose={() => setOpen(false)} onAdd={() => { setOpen(false); onChanged() }} />}</div>
}
