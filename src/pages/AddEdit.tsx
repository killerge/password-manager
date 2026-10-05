import { useState } from "react";
import { ChevronLeft, Eye, EyeOff, User, KeyRound, Tag, FileText } from "lucide-react";
import type { CategoryId, PasswordItem } from "../types";

const TABS: { id: Exclude<CategoryId, "all">; label: string }[] = [
  { id: "finance", label: "金融" },
  { id: "shopping", label: "購物" },
  { id: "game", label: "遊戲" },
  { id: "custom", label: "自定義" },
];

interface Props {
  initial?: PasswordItem;
  onCancel: () => void;
  onSave: (data: Omit<PasswordItem, "id" | "createdAt" | "updatedAt">) => void;
}

export default function AddEdit({ initial, onCancel, onSave }: Props) {
  const [category, setCategory] = useState<Exclude<CategoryId, "all">>(initial?.category ?? "finance");
  const [name, setName] = useState(initial?.name ?? "");
  const [account, setAccount] = useState(initial?.account ?? "");
  const [password, setPassword] = useState(initial?.password ?? "");
  const [note, setNote] = useState(initial?.note ?? "");
  const [showPw, setShowPw] = useState(false);

  const canSave = name.trim().length > 0 && account.trim().length > 0 && password.length > 0;

  return (
    <div className="min-h-full pb-10 safe-top">
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button onClick={onCancel} className="w-9 h-9 flex items-center justify-center text-ink active:scale-95">
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-[17px] font-bold text-ink">{initial ? "編輯項目" : "新增項目"}</h1>
      </div>

      <div className="flex gap-2 px-5 pt-3">
        {TABS.map((t) => {
          const isActive = category === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setCategory(t.id)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
                isActive ? "bg-tabAll text-white" : "bg-chipAll text-tabAll"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="px-5 mt-6 flex flex-col gap-5">
        <Field label="名稱" icon={<Tag size={16} />}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="請輸入名稱" className="field-input" />
        </Field>
        <Field label="帳號" icon={<User size={16} />}>
          <input value={account} onChange={(e) => setAccount(e.target.value)} placeholder="請輸入帳號" className="field-input" />
        </Field>
        <Field label="密碼" icon={<KeyRound size={16} />}>
          <div className="flex items-center bg-creamcard border border-[#EFE7DA] rounded-2xl px-4 py-3 shadow-soft">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="請輸入密碼"
              type={showPw ? "text" : "password"}
              className="bg-transparent outline-none text-[14px] text-ink placeholder:text-inksoft/60 w-full"
            />
            <button onClick={() => setShowPw((s) => !s)} className="text-inksoft shrink-0 ml-2" aria-label="顯示密碼">
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </Field>
        <Field label="自定義（可選）" icon={<FileText size={16} />}>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="請輸入備註或其他資訊"
            rows={3}
            className="field-input resize-none"
          />
        </Field>

        <button
          disabled={!canSave}
          onClick={() =>
            canSave &&
            onSave({ category, name: name.trim(), account: account.trim(), password, note: note.trim() })
          }
          className="mt-2 w-full py-3.5 rounded-2xl bg-tabAll text-white font-medium text-[15px] shadow-card disabled:opacity-40 active:scale-[0.98] transition-transform"
        >
          儲存
        </button>
      </div>
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[13px] text-inksoft mb-1.5">
        {icon}
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}
