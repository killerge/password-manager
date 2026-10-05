import { useState } from "react";
import { ChevronLeft, Pencil, Trash2, Eye, EyeOff, Copy, Star } from "lucide-react";
import type { PasswordItem } from "../types";
import { CATEGORY_LABEL } from "../types";

interface Props {
  item: PasswordItem;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToast: (msg: string) => void;
}

export default function Detail({ item, onBack, onEdit, onDelete, onToast }: Props) {
  const [showPw, setShowPw] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // clipboard API unavailable — ignore
    }
    onToast(`已複製${label}`);
  };

  const initial = item.name.trim().charAt(0).toUpperCase() || "?";

  return (
    <div className="min-h-full pb-10 safe-top">
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center text-ink active:scale-95">
          <ChevronLeft size={22} />
        </button>
        <div className="flex items-center gap-1">
          <button onClick={onEdit} className="w-9 h-9 flex items-center justify-center text-ink active:scale-95">
            <Pencil size={18} />
          </button>
          <button onClick={() => setConfirmDelete(true)} className="w-9 h-9 flex items-center justify-center text-[#C97B7B] active:scale-95">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 px-5 mt-2">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center font-semibold text-lg bg-chipAll text-tabAll shrink-0">
          {initial}
        </div>
        <div className="flex-1">
          <h2 className="text-[18px] font-bold text-ink">{item.name}</h2>
          <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded-full bg-chipAll text-tabAll">
            {CATEGORY_LABEL[item.category]}
          </span>
        </div>
        <Star size={18} className="text-tabCustom shrink-0" />
      </div>

      <div className="px-5 mt-6 flex flex-col gap-4">
        <Row label="帳號" value={item.account} onCopy={() => copy(item.account, "帳號")} />
        <Row
          label="密碼"
          value={showPw ? item.password : "•".repeat(Math.max(item.password.length, 8))}
          onCopy={() => copy(item.password, "密碼")}
          rightExtra={
            <button onClick={() => setShowPw((s) => !s)} className="text-inksoft shrink-0">
              {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          }
        />
        {item.note && (
          <div className="bg-creamcard border border-[#EFE7DA] rounded-2xl px-4 py-3.5 shadow-soft">
            <p className="text-[12px] text-inksoft mb-1">備註</p>
            <p className="text-[14px] text-ink whitespace-pre-wrap">{item.note}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center mt-16 px-8 text-center">
        <p className="text-[13px] text-inksoft">重要的帳號，</p>
        <p className="text-[13px] text-inksoft">就放在這裡吧！</p>
        <div className="mt-6 text-5xl">🐱</div>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-creamcard rounded-t-3xl sm:rounded-3xl w-full sm:w-80 p-6">
            <p className="text-[15px] font-medium text-ink mb-1">刪除「{item.name}」？</p>
            <p className="text-[13px] text-inksoft mb-5">此操作無法復原。</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 py-3 rounded-2xl bg-chipAll text-tabAll font-medium text-[14px]"
              >
                取消
              </button>
              <button
                onClick={onDelete}
                className="flex-1 py-3 rounded-2xl bg-[#C97B7B] text-white font-medium text-[14px]"
              >
                刪除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  onCopy,
  rightExtra,
}: {
  label: string;
  value: string;
  onCopy: () => void;
  rightExtra?: React.ReactNode;
}) {
  return (
    <div className="bg-creamcard border border-[#EFE7DA] rounded-2xl px-4 py-3.5 shadow-soft">
      <p className="text-[12px] text-inksoft mb-1">{label}</p>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[15px] text-ink tracking-wide truncate">{value}</p>
        <div className="flex items-center gap-2 shrink-0">
          {rightExtra}
          <button onClick={onCopy} className="text-inksoft">
            <Copy size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
