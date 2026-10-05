import { House, FileSpreadsheet, User } from 'lucide-react'
export type TabType = 'home' | 'export' | 'settings'
const TABS = [{ id: 'home', l: '首頁', I: House }, { id: 'export', l: '匯出', I: FileSpreadsheet }, { id: 'settings', l: '設定', I: User }] as const
export const BottomNav = ({ active, onChange }: { active: TabType; onChange: (t: TabType) => void }) => (
  <nav className="absolute bottom-0 inset-x-0 z-30 flex justify-around bg-[#FBF8F2]/90 backdrop-blur-md border-t border-borderLight pt-2.5" style={{ paddingBottom: 'max(env(safe-area-inset-bottom),10px)' }}>
    {TABS.map(({ id, l, I }) => <button key={id} onClick={() => onChange(id)} className={`w-20 flex flex-col items-center gap-1 ${active === id ? 'text-brandPrimary font-bold' : 'text-[#A29C90]'}`}>
      <I className="w-[22px] h-[22px]" strokeWidth={1.7} /><span className="text-[10.5px]">{l}</span></button>)}
  </nav>
)
