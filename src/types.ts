export type CategoryId = "all" | "finance" | "shopping" | "game" | "custom";

export interface CategoryDef {
  id: Exclude<CategoryId, "all">;
  label: string;
  tabBg: string;
  tabActiveBg: string;
  chipBg: string;
}

export interface PasswordItem {
  id?: number;
  category: Exclude<CategoryId, "all">;
  name: string;
  account: string;
  password: string;
  note: string;
  iconColor?: string;
  iconInitial?: string;
  favorite?: boolean;
  createdAt: number;
  updatedAt: number;
}

export const CATEGORIES: CategoryDef[] = [
  { id: "finance", label: "金融", tabBg: "bg-chipAll", tabActiveBg: "bg-tabAll", chipBg: "bg-chipAll" },
  { id: "shopping", label: "購物", tabBg: "bg-chipShop", tabActiveBg: "bg-tabShop", chipBg: "bg-chipShop" },
  { id: "game", label: "遊戲", tabBg: "bg-chipGame", tabActiveBg: "bg-tabGame", chipBg: "bg-chipGame" },
  { id: "custom", label: "自定義", tabBg: "bg-chipCustom", tabActiveBg: "bg-tabCustom", chipBg: "bg-chipCustom" },
];

export const CATEGORY_LABEL: Record<Exclude<CategoryId, "all">, string> = {
  finance: "金融",
  shopping: "購物",
  game: "遊戲",
  custom: "自定義",
};
