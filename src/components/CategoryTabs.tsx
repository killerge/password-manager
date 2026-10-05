import { useState } from 'react'
import { LayoutGrid, Plus } from 'lucide-react'
import { ALL, getCategories, themeOf } from '../utils/category'
import { CategorySheet } from './CategorySheet'
export const CategoryTabs = ({ value, onChange, onChanged }: { value: string; onChange: (id: string) => void; onChanged: () => void }) => {
  const [open, setOpen] = useState(false)
  const tab = (id: string, name: string, fg: string, bg: string, Icon: typeof Plus) => {
    const on = value === id
    return <button key={id} role="tab" aria-selected={on} onClick={() => onChange(id)} style={{ background: on ? fg : bg, color: on ? '#fff' : fg }}
      className={`snap-start shrink-0 w-[68px] h-[58px] flex flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-medium transition-all ${on ? 'shadow-md -translate-y-px' : 'shadow-sm'}`}>
      <Icon className="w-[22px] h-[22px]" strokeWidth={1.8} /><span className="max-w-full truncate px-1">{name}</span></button>
  }
  return <>
    <div className="flex gap-2 overflow-x-auto no-scrollbar snap-x px-5 py-2" role="tablist">
      {tab(ALL, '全部', '#4D6273', '#EEF1F4', LayoutGrid)}
      {getCategories().map(c => { const t = themeOf(c.id); return tab(c.id, c.name, t.fg, t.bg, t.Icon) })}
      <button aria-label="新增大項目" onClick={() => setOpen(true)} className="shrink-0 w-[68px] h-[58px] flex flex-col items-center justify-center gap-1 rounded-2xl text-[11px] border border-dashed border-[#C9C1B2] text-textMuted">
        <Plus className="w-[22px] h-[22px]" strokeWidth={1.8} /><span>新增</span></button><div className="shrink-0 w-3" /></div>
    {open && <CategorySheet onClose={() => setOpen(false)} onAdd={c => { setOpen(false); onChanged(); onChange(c.id) }} />}</>
}
