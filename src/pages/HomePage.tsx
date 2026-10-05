import { useMemo, useState } from 'react'
import { Header } from '../components/Header'
import { CategoryTabs } from '../components/CategoryTabs'
import { SearchBar } from '../components/SearchBar'
import { PasswordCard } from '../components/PasswordCard'
import { PasswordItem } from '../types/password'
import { Filter } from '../utils/category'
export const HomePage = ({ items, onSelect }: { items: PasswordItem[]; onSelect: (i: PasswordItem) => void }) => {
  const [cat, setCat] = useState<Filter>('全部'); const [q, setQ] = useState('')
  const list = useMemo(() => items.filter(i => (cat === '全部' || i.category === cat) && (i.title + i.account).toLowerCase().includes(q.trim().toLowerCase())), [items, cat, q])
  return <div className="pb-28"><Header /><CategoryTabs value={cat} onChange={setCat} /><SearchBar value={q} onChange={setQ} />
    <main className="px-5 mt-2">{list.map(i => <PasswordCard key={i.id} item={i} onClick={() => onSelect(i)} />)}
      {!list.length && <p className="text-center py-12 text-textMuted text-xs">{q ? '找不到符合的項目' : '還沒有項目，點右下角 + 新增第一筆'}</p>}</main></div>
}
