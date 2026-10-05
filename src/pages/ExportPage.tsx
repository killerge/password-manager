import { useState } from 'react'
import { FileSpreadsheet, Info, Check } from 'lucide-react'
import { exportToExcel, shareExcel } from '../services/excel'
import { PasswordItem } from '../types/password'
export const ExportPage = ({ items, toast }: { items: PasswordItem[]; toast: (m: string) => void }) => {
  const [done, setDone] = useState(false); const empty = items.length === 0
  const share = async () => { if (!(await shareExcel(items))) { exportToExcel(items); toast('此瀏覽器不支援分享，已直接下載') } setDone(true) }
  return <div className="px-5 pt-3 pb-28 text-center"><h2 className="text-base font-bold mb-8">{done ? '完成' : '匯出資料'}</h2>
    <div className="flex items-center justify-center gap-4 text-borderLight mb-6"><span className="w-3 h-0.5 bg-[#CFC8BD]" />
      <div className="w-20 h-24 bg-white border border-[#9A948A] rounded-xl shadow-card flex items-center justify-center"><FileSpreadsheet className="w-11 h-11 text-[#4E8B6B]" strokeWidth={1.4} /></div><span className="w-3 h-0.5 bg-[#CFC8BD]" /></div>
    {done ? <div className="mb-8"><div className="w-14 h-14 mx-auto rounded-full bg-brandPrimary text-white flex items-center justify-center shadow-md"><Check className="w-7 h-7" /></div>
      <h3 className="text-lg font-bold mt-3 mb-1">匯出完成！</h3><p className="text-xs text-textMuted leading-relaxed">已產生 Excel 檔案，<br />你可以選擇分享或儲存到檔案 App。</p></div> :
      <><h3 className="text-base font-bold mb-3">將密碼資料匯出為 Excel 檔案</h3>
        <ul className="text-xs text-textMuted leading-8 mb-8 inline-block text-left list-disc pl-4"><li>只會儲存在你的手機中</li><li>可透過分享、Email 或雲端備份</li><li>不會上傳到任何伺服器</li></ul></>}
    <button disabled={empty} onClick={() => { exportToExcel(items); setDone(true) }} className="w-full h-12 bg-brandPrimary text-white text-sm font-medium rounded-full shadow-sm disabled:opacity-40 active:scale-[0.98] transition">匯出 Excel</button>
    <button disabled={empty} onClick={share} className="w-full h-12 mt-3 bg-[#FBF8F2] border-[1.5px] border-[#C9C1B2] text-sm font-medium rounded-full disabled:opacity-40 active:scale-[0.98] transition">分享檔案</button>
    {empty && <p className="text-xs text-textMuted mt-3">還沒有資料可以匯出</p>}
    <p className="flex items-center justify-center gap-1.5 text-[11px] text-textMuted mt-6"><Info className="w-3.5 h-3.5" />建議將檔案保存在安全的地方。</p></div>
}
