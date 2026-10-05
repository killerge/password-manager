import { useState } from 'react'
import { ChevronLeft, Pencil, Trash2, Copy, Eye, EyeOff, Star } from 'lucide-react'
import { PasswordItem } from '../types/password'
import { THEME, isSecret, labelOf } from '../utils/category'
import { CatMascotSleeping } from '../components/CatMascot'
const Row = ({ label, value, secret, onCopy }: { label: string; value: string; secret?: boolean; onCopy: (t: string, n: string) => void }) => {
  const [show, setShow] = useState(false)
  return <div className="py-3 border-b border-borderLight/70 last:border-0"><span className="text-xs font-semibold">{label}</span>
    <div className="flex items-center mt-1 text-sm text-textMuted"><span className={`flex-1 break-all ${secret ? 'font-mono tracking-wider' : ''}`}>{secret && !show ? '•'.repeat(Math.min(Math.max(value.length, 6), 12)) : value || '—'}</span>
      {secret && <button aria-label="顯示或隱藏" onClick={() => setShow(!show)} className="p-2">{show ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}</button>}
      <button aria-label={'複製' + label} onClick={() => onCopy(value, label)} className="p-2 active:scale-90"><Copy className="w-[17px] h-[17px]" strokeWidth={1.6} /></button></div></div>
}
export const DetailPage = ({ item, onBack, onEdit, onDelete, onCopy }: { item: PasswordItem; onBack: () => void; onEdit: () => void; onDelete: () => void; onCopy: (t: string, n: string) => void }) => {
  const t = THEME[item.category]
  return <div className="px-5 pt-3 pb-12">
    <div className="flex items-center justify-between mb-5"><button aria-label="返回" onClick={onBack} className="p-1.5"><ChevronLeft className="w-6 h-6" strokeWidth={1.6} /></button>
      <div className="flex gap-2"><button aria-label="編輯" onClick={onEdit} className="p-1.5"><Pencil className="w-5 h-5" strokeWidth={1.6} /></button>
        <button aria-label="刪除" onClick={onDelete} className="p-1.5 text-[#C9625F]"><Trash2 className="w-5 h-5" strokeWidth={1.6} /></button></div></div>
    <div className="flex items-center gap-3 mb-5"><div className={`w-[52px] h-[52px] rounded-2xl ${t.tile} flex items-center justify-center`}><t.Icon className="w-6 h-6" /></div>
      <div className="flex-1"><h2 className="text-xl font-bold">{item.title}</h2><span className={`inline-block mt-1 px-2.5 py-0.5 text-xs rounded-lg ${t.tile}`}>{labelOf(item.category)}</span></div>
      <Star className="w-5 h-5 text-amber-400 fill-amber-400" /></div>
    <div className="bg-[#FBF8F2] rounded-3xl px-5 py-2 border border-borderLight shadow-card">
      <Row label="帳號" value={item.account} onCopy={onCopy} /><Row label="密碼" value={item.password} secret onCopy={onCopy} />
      {item.customFields.map((f, i) => <Row key={i} label={f.label || '自定義'} value={f.value} secret={isSecret(f.label)} onCopy={onCopy} />)}</div>
    <CatMascotSleeping /></div>
}
