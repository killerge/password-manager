import { useState } from 'react'
import { Check } from 'lucide-react'
import { Category, PALETTE, addCategory, getCategories } from '../utils/category'
export const CategorySheet = ({ onAdd, onClose }: { onAdd: (c: Category) => void; onClose: () => void }) => {
  const [name, setName] = useState(''); const [color, setColor] = useState(getCategories().length % PALETTE.length)
  return <div className="absolute inset-0 z-50 bg-black/30 flex items-end" onClick={onClose}>
    <div className="w-full bg-bgMain rounded-t-3xl p-5 shadow-xl" style={{ paddingBottom: 'max(env(safe-area-inset-bottom),20px)' }} onClick={e => e.stopPropagation()}>
      <h3 className="text-base font-bold text-center mb-4">新增大項目</h3>
      <input autoFocus value={name} maxLength={8} onChange={e => setName(e.target.value)} placeholder="例如：保險、社群、工作" className="field h-12 px-4" />
      <div className="flex justify-between mt-4 px-1">{PALETTE.map((p, i) => <button key={i} aria-label={'顏色' + (i + 1)} onClick={() => setColor(i)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: p.fg }}>{color === i && <Check className="w-4 h-4 text-white" />}</button>)}</div>
      <div className="flex gap-3 mt-5"><button onClick={onClose} className="flex-1 h-12 rounded-full bg-white border border-borderLight text-sm">取消</button>
        <button disabled={!name.trim()} onClick={() => onAdd(addCategory(name, color))} className="flex-1 h-12 rounded-full bg-brandPrimary text-white text-sm disabled:opacity-40">新增</button></div></div></div>
}
