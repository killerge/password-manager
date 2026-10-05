import { Building2, ShoppingBag, Gamepad2, FolderHeart, LayoutGrid } from 'lucide-react'
import { CategoryType, CustomField } from '../types/password'
export type Filter = CategoryType | '全部'
const KEY = 'customCategoryName'
export const labelOf = (c: Filter) => (c === '自定義' ? localStorage.getItem(KEY) || '自定義' : c)
export const setCustomName = (n: string) => (n.trim() ? localStorage.setItem(KEY, n.trim()) : localStorage.removeItem(KEY))
export const fieldsText = (f: CustomField[]) => f.map(x => `${x.label}：${x.value}`).join('；')
export const THEME: Record<Filter, { on: string; off: string; tile: string; Icon: typeof Building2 }> = {
  全部: { on: 'bg-brandPrimary text-white', off: 'bg-[#EEF1F4] text-brandPrimary', tile: 'bg-[#EEF1F4] text-brandPrimary', Icon: LayoutGrid },
  金融: { on: 'bg-catFinance text-white', off: 'bg-catFinance-bg text-catFinance', tile: 'bg-catFinance-bg text-catFinance', Icon: Building2 },
  購物: { on: 'bg-catShop text-white', off: 'bg-catShop-bg text-catShop', tile: 'bg-catShop-bg text-catShop', Icon: ShoppingBag },
  遊戲: { on: 'bg-catGame text-white', off: 'bg-catGame-bg text-catGame', tile: 'bg-catGame-bg text-catGame', Icon: Gamepad2 },
  自定義: { on: 'bg-catCustom text-white', off: 'bg-catCustom-bg text-catCustom', tile: 'bg-catCustom-bg text-catCustom', Icon: FolderHeart },
}
export const isSecret = (label: string) => /密碼|pin|cvv/i.test(label)
