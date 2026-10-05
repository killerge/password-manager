import { Home, FileOutput, User } from "lucide-react";

export type NavKey = "home" | "export" | "settings";

const NAV: { key: NavKey; label: string; icon: React.ReactNode }[] = [
  { key: "home", label: "首頁", icon: <Home size={21} /> },
  { key: "export", label: "匯出", icon: <FileOutput size={21} /> },
  { key: "settings", label: "設定", icon: <User size={21} /> },
];

export default function BottomNav({ active, onChange }: { active: NavKey; onChange: (k: NavKey) => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-creamcard/95 backdrop-blur border-t border-[#EFE7DA] safe-bottom">
      <div className="flex items-center justify-around py-2">
        {NAV.map((n) => {
          const isActive = active === n.key;
          return (
            <button
              key={n.key}
              onClick={() => onChange(n.key)}
              className={`flex flex-col items-center gap-0.5 px-6 py-1 transition-colors ${
                isActive ? "text-tabAll" : "text-inksoft/70"
              }`}
            >
              {n.icon}
              <span className="text-[10px] font-medium">{n.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
