export type CategoryType = string
export interface CustomField { label: string; value: string }
export interface PasswordItem {
  id: string; category: CategoryType; title: string; account: string; password: string
  customFields: CustomField[]; createdAt: number; updatedAt: number
}
export type Draft = Omit<PasswordItem, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }
