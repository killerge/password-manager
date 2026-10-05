import { Search, X } from 'lucide-react'
export const SearchBar = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div className="px-5 py-2"><div className="relative flex items-center">
    <Search className="absolute left-3.5 w-[18px] h-[18px] text-textMuted" strokeWidth={1.7} />
    <input value={value} onChange={e => onChange(e.target.value)} placeholder="搜尋名稱、帳號..."
      className="w-full h-10 bg-[#FBF8F2] text-sm pl-10 pr-9 rounded-full border border-borderLight shadow-card focus:outline-none focus:border-brandPrimary/40" />
    {value && <button aria-label="清除" onClick={() => onChange('')} className="absolute right-3 text-textMuted"><X className="w-4 h-4" /></button>}
  </div></div>
)
