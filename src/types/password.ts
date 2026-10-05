export const CATEGORIES = ['金融', '購物', '遊戲', '自定義'] as const
export type CategoryType = (typeof CATEGORIES)[number]
export interface CustomField { label: string; value: string }
export interface PasswordItem {
  id: string; category: CategoryType; title: string; account: string; password: string
  customFields: CustomField[]; createdAt: number; updatedAt: number
}
export type Draft = Omit<PasswordItem, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }
