import { Landmark, ShoppingCart, Gamepad2, Star } from "lucide-react";
import type { CategoryId } from "../types";

const TABS: { id: CategoryId; label: string; icon: React.ReactNode; activeBg: string; inactiveBg: string }[] = [
  { id: "all", label: "全部", icon: <Landmark size={18} />, activeBg: "bg-tabAll text-white", inactiveBg: "bg-chipAll text-tabAll" },
  { id: "shopping", label: "購物", icon: <ShoppingCart size={18} />, activeBg: "bg-tabShop text-white", inactiveBg: "bg-chipShop text-tabShop" },
  { id: "game", label: "遊戲", icon: <Gamepad2 size={18} />, activeBg: "bg-tabGame text-white", inactiveBg: "bg-chipGame text-tabGame" },
  { id: "custom", label: "自定義", icon: <Star size={18} />, activeBg: "bg-tabCustom text-white", inactiveBg: "bg-chipCustom text-tabCustom" },
];

interface Props {
  active: CategoryId;
  onChange: (id: CategoryId) => void;
}

export default function CategoryTabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-2.5 px-5 py-1">
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex-1 flex flex-col items-center justify-center gap-1 rounded-2xl py-2.5 transition-all active:scale-95 ${
              isActive ? tab.activeBg + " shadow-soft" : tab.inactiveBg
            }`}
          >
            {tab.icon}
            <span className="text-[11px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
