import { useState } from 'react'
import { Pencil, ShieldCheck, Trash2 } from 'lucide-react'
import { labelOf, setCustomName } from '../utils/category'
export const SettingsPage = ({ count, onRename, onClear }: { count: number; onRename: () => void; onClear: () => void }) => {
  const [name, setName] = useState(labelOf('自定義'))
  return <div className="px-5 pt-3 pb-28"><h2 className="text-base font-bold text-center mb-6">設定</h2>
    <label className="block text-xs font-semibold mb-1.5 ml-1">「自定義」大項目名稱</label>
    <div className="relative flex items-center"><Pencil className="absolute left-3.5 w-4 h-4 text-textMuted" />
      <input value={name} maxLength={6} placeholder="自定義" onChange={e => { setName(e.target.value); setCustomName(e.target.value); onRename() }} className="field h-12 pl-10 pr-4" /></div>
    <div className="mt-5 flex gap-3 bg-[#FBF8F2] border border-borderLight rounded-2xl p-4 text-[13px] leading-relaxed shadow-card"><ShieldCheck className="w-5 h-5 text-brandPrimary flex-shrink-0 mt-0.5" />
      <p>所有資料只存在這支手機瀏覽器的 IndexedDB，不會上傳。目前共 {count} 筆。清除 Safari 網站資料會一併刪除，請定期匯出備份。</p></div>
    <button disabled={!count} onClick={onClear} className="w-full h-12 mt-6 flex items-center justify-center gap-2 border-[1.5px] border-[#C9C1B2] bg-[#FBF8F2] text-[#B65A55] text-sm rounded-full disabled:opacity-40"><Trash2 className="w-4 h-4" />清除所有資料</button></div>
}
