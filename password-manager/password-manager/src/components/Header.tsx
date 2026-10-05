import { Settings } from "lucide-react";

export default function Header({ onSettings }: { onSettings?: () => void }) {
  return (
    <div className="flex items-center justify-between px-5 pt-4 pb-3">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-[#F3E6D8] flex items-center justify-center text-xl overflow-hidden shrink-0">
          🐱
        </div>
        <div>
          <h1 className="text-[19px] font-bold text-ink leading-tight">密碼小管家</h1>
          <p className="text-[11px] text-inksoft mt-0.5">重要的帳號，只屬於你</p>
        </div>
      </div>
      <button
        onClick={onSettings}
        className="w-9 h-9 flex items-center justify-center text-inksoft active:scale-95 transition-transform"
        aria-label="設定"
      >
        <Settings size={20} />
      </button>
    </div>
  );
}
