import { ChevronRight } from "lucide-react";
import type { PasswordItem } from "../types";
import { CATEGORY_LABEL } from "../types";

const INITIAL_BG: Record<string, string> = {
  finance: "bg-chipAll text-tabAll",
  shopping: "bg-chipShop text-tabShop",
  game: "bg-chipGame text-tabGame",
  custom: "bg-chipCustom text-tabCustom",
};

function maskAccount(account: string): string {
  if (account.length <= 4) return "*".repeat(Math.max(account.length - 0, 3)) + account.slice(-1);
  return "*".repeat(5) + account.slice(-4);
}

export default function ItemCard({ item, onClick }: { item: PasswordItem; onClick: () => void }) {
  const initial = item.name.trim().charAt(0).toUpperCase() || "?";
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 bg-creamcard border border-[#EFE7DA] rounded-2xl px-4 py-3.5 shadow-soft active:scale-[0.98] transition-transform text-left"
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-semibold text-base shrink-0 ${INITIAL_BG[item.category]}`}>
        {initial}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-medium text-ink truncate">{item.name}</p>
        <p className="text-[12px] text-inksoft mt-0.5 truncate">{maskAccount(item.account)}</p>
      </div>
      <span className="text-[10px] text-inksoft/60 shrink-0 hidden">{CATEGORY_LABEL[item.category]}</span>
      <ChevronRight size={18} className="text-inksoft/60 shrink-0" />
    </button>
  );
}
