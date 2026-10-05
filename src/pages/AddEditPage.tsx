import { useState } from 'react'
import { ChevronLeft, Eye, EyeOff, Building2, User, KeyRound, Plus, X } from 'lucide-react'
import { CategoryType, CustomField, Draft, PasswordItem } from '../types/password'
import { getCategories, themeOf } from '../utils/category'
const PRESETS = ['交易密碼', '備註', '卡號', '安全問題']
export const AddEditPage = ({ initial, onSave, onBack }: { initial?: PasswordItem | null; onSave: (d: Draft) => void; onBack: () => void }) => {
  const [category, setCategory] = useState<CategoryType>(initial?.category ?? getCategories()[0]?.id ?? '')
  const [title, setTitle] = useState(initial?.title ?? ''); const [account, setAccount] = useState(initial?.account ?? '')
  const [password, setPassword] = useState(initial?.password ?? ''); const [show, setShow] = useState(false)
  const [fields, setFields] = useState<CustomField[]>(initial?.customFields ?? [])
  const upd = (i: number, k: keyof CustomField, v: string) => setFields(fields.map((f, j) => (j === i ? { ...f, [k]: v } : f)))
  const valid = title.trim() && password
  const input = (label: string, I: typeof User, v: string, set: (s: string) => void, ph: string, pw = false) => (
    <div className="mt-4"><label className="block text-xs font-medium mb-1.5 ml-1">{label}</label>
      <div className="relative flex items-center"><I className="absolute left-3.5 w-4 h-4 text-textMuted" />
        <input value={v} onChange={e => set(e.target.value)} placeholder={ph} autoComplete="off" type={pw && !show ? 'password' : 'text'} className="field h-12 pl-10 pr-10" />
        {pw && <button type="button" aria-label="顯示或隱藏密碼" onClick={() => setShow(!show)} className="absolute right-3.5 text-textMuted">{show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>}</div></div>)
  return <div className="px-5 pt-3 pb-28">
    <div className="flex items-center justify-between mb-5"><button aria-label="返回" onClick={onBack} className="p-1.5"><ChevronLeft className="w-6 h-6" strokeWidth={1.6} /></button>
      <h2 className="text-base font-bold">{initial ? '編輯項目' : '新增項目'}</h2><div className="w-8" /></div>
    <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5">{getCategories().map(c => { const t = themeOf(c.id), on = category === c.id; return <button key={c.id} type="button" onClick={() => setCategory(c.id)} style={{ background: on ? t.fg : t.bg, color: on ? '#fff' : t.fg }} className="shrink-0 px-4 py-2 text-xs font-medium rounded-full">{c.name}</button> })}</div>
    {input('名稱', Building2, title, setTitle, '請輸入名稱')}{input('帳號', User, account, setAccount, '請輸入帳號')}{input('密碼', KeyRound, password, setPassword, '請輸入密碼', true)}
    <div className="mt-5"><label className="block text-xs font-medium mb-1 ml-1">自定義欄位（可新增多個）</label>
      {fields.map((f, i) => <div key={i} className="flex gap-1.5 items-center mt-2">
        <input value={f.label} onChange={e => upd(i, 'label', e.target.value)} placeholder="名稱，如交易密碼" className="field h-11 px-3 basis-[36%] min-w-0" />
        <input value={f.value} onChange={e => upd(i, 'value', e.target.value)} placeholder="內容" autoComplete="off" className="field h-11 px-3 flex-1 min-w-0" />
        <button aria-label="移除欄位" onClick={() => setFields(fields.filter((_, j) => j !== i))} className="p-1.5 text-textMuted"><X className="w-[18px] h-[18px]" /></button></div>)}
      <div className="flex flex-wrap gap-2 mt-3">{PRESETS.map(p => <button key={p} type="button" onClick={() => setFields([...fields, { label: p, value: '' }])} className="px-3 py-1.5 rounded-full text-xs bg-[#EFE8DA] text-textMuted">+ {p}</button>)}
        <button type="button" onClick={() => setFields([...fields, { label: '', value: '' }])} className="px-3 py-1.5 rounded-full text-xs bg-[#EFE8DA] text-textMuted inline-flex items-center gap-1"><Plus className="w-3 h-3" />自訂欄位</button></div></div>
    <button disabled={!valid} onClick={() => onSave({ id: initial?.id, category, title: title.trim(), account, password, customFields: fields.filter(f => f.label.trim() || f.value.trim()) })}
      className="w-full mt-8 h-12 bg-brandPrimary text-white font-medium text-sm rounded-full shadow-sm disabled:opacity-40 active:scale-[0.98] transition">儲存</button></div>
}
