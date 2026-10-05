import { Building2, ShoppingBag, Gamepad2, FolderHeart, Folder } from 'lucide-react'
import { CustomField } from '../types/password'
export interface Category { id: string; name: string; color: number }
export const ALL = '全部'
export const PALETTE = [
  { fg: '#5B82A6', bg: '#EEF4F8' }, { fg: '#D9727B', bg: '#FDF2F3' }, { fg: '#6E9C85', bg: '#F0F6F3' }, { fg: '#D49D42', bg: '#FCF8ED' },
  { fg: '#8E7BB5', bg: '#F3F0F8' }, { fg: '#4F9DA6', bg: '#EDF6F7' }, { fg: '#A9795A', bg: '#F7F0EB' }, { fg: '#C77BA0', bg: '#F9F0F5' },
]
const KEY = 'categories'
const defaults = (): Category[] => [
  { id: '金融', name: '金融', color: 0 }, { id: '購物', name: '購物', color: 1 }, { id: '遊戲', name: '遊戲', color: 2 },
  { id: '自定義', name: localStorage.getItem('customCategoryName') || '自定義', color: 3 }]
export const getCategories = (): Category[] => { try { const r = localStorage.getItem(KEY); if (r) return JSON.parse(r) } catch { /* 使用預設 */ } return defaults() }
export const saveCategories = (c: Category[]) => localStorage.setItem(KEY, JSON.stringify(c))
export const addCategory = (name: string, color: number) => {
  const c: Category = { id: crypto.randomUUID(), name: name.trim(), color }; saveCategories([...getCategories(), c]); return c
}
export const renameCategory = (id: string, name: string) => saveCategories(getCategories().map(c => (c.id === id ? { ...c, name } : c)))
export const removeCategory = (id: string) => saveCategories(getCategories().filter(c => c.id !== id))
export const catOf = (id: string): Category => getCategories().find(c => c.id === id) ?? { id, name: id.length > 12 ? '未分類' : id, color: 3 }
const ICONS: Record<string, typeof Folder> = { 金融: Building2, 購物: ShoppingBag, 遊戲: Gamepad2, 自定義: FolderHeart }
export const themeOf = (id: string) => { const c = catOf(id); return { ...PALETTE[c.color % PALETTE.length], name: c.name, Icon: ICONS[id] ?? Folder } }
export const fieldsText = (f: CustomField[]) => f.map(x => `${x.label}：${x.value}`).join('；')
export const isSecret = (label: string) => /密碼|pin|cvv/i.test(label)
