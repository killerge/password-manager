import { CATEGORIES } from '../types/password'
import { Filter, THEME, labelOf } from '../utils/category'
export const CategoryTabs = ({ value, onChange }: { value: Filter; onChange: (f: Filter) => void }) => (
  <div className="px-5 py-2 grid grid-cols-5 gap-2" role="tablist">
    {(['全部', ...CATEGORIES] as Filter[]).map(c => {
      const t = THEME[c], on = value === c
      return <button key={c} role="tab" aria-selected={on} onClick={() => onChange(c)}
        className={`flex flex-col items-center justify-center gap-1 h-[58px] rounded-2xl text-[11px] font-medium transition-all ${on ? t.on + ' shadow-md -translate-y-px' : t.off + ' shadow-sm'}`}>
        <t.Icon className="w-[22px] h-[22px]" strokeWidth={1.8} /><span className="max-w-full truncate px-1">{labelOf(c)}</span></button>
    })}
  </div>
)
