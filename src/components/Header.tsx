import { CatMascotHeader } from './CatMascot'
export const Header = () => (
  <header className="flex items-center gap-3 px-5 pt-3 pb-3">
    <CatMascotHeader />
    <div><h1 className="text-lg font-bold tracking-wide leading-tight">密碼小管家</h1>
      <p className="text-[11px] text-textMuted tracking-wide mt-0.5">讓重要的帳號，只屬於你</p></div>
  </header>
)
