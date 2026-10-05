import { ChevronRight } from 'lucide-react'
import { PasswordItem } from '../types/password'
import { THEME } from '../utils/category'
export const PasswordCard = ({ item, onClick }: { item: PasswordItem; onClick: () => void }) => {
  const t = THEME[item.category]
  return <button onClick={onClick} className="w-full text-left bg-[#FBF8F2] active:bg-[#F3EEE3] rounded-2xl px-3.5 py-3 mb-2.5 border border-borderLight shadow-card flex items-center gap-3.5">
    <div className={`w-11 h-11 rounded-2xl ${t.tile} flex items-center justify-center flex-shrink-0`}><t.Icon className="w-5 h-5" strokeWidth={1.8} /></div>
    <div className="flex-1 min-w-0">
      <h3 className="text-sm font-bold truncate">{item.title}</h3>
      <p className="text-xs text-textMuted mt-1 truncate"><span className="inline-block w-8">帳號</span><span className="font-mono">{item.account || '—'}</span></p>
      <p className="text-xs text-textMuted truncate"><span className="inline-block w-8">密碼</span><span className="font-mono">{item.password}</span></p>
    </div>
    <ChevronRight className="w-[18px] h-[18px] text-textMuted/70 flex-shrink-0" strokeWidth={1.6} />
  </button>
}
