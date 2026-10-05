import { useState } from "react";
import { ChevronLeft, FileSpreadsheet, Share2, ShieldCheck } from "lucide-react";
import type { PasswordItem } from "../types";
import { exportToExcelFile, shareOrDownload } from "../services/export";

interface Props {
  items: PasswordItem[];
  onBack: () => void;
  onToast: (msg: string) => void;
}

export default function Export({ items, onBack, onToast }: Props) {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleExport = async () => {
    setBusy(true);
    try {
      const { blob, filename } = exportToExcelFile(items);
      const result = await shareOrDownload(blob, filename);
      setDone(true);
      onToast(result === "shared" ? "已完成分享" : "已匯出 Excel");
    } finally {
      setBusy(false);
    }
  };

  const handleShareAgain = async () => {
    setBusy(true);
    try {
      const { blob, filename } = exportToExcelFile(items);
      await shareOrDownload(blob, filename);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-full pb-28 safe-top">
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center text-ink active:scale-95">
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-[17px] font-bold text-ink">匯出資料</h1>
      </div>

      <div className="flex flex-col items-center px-8 mt-10">
        <div className="w-24 h-24 rounded-3xl bg-creamcard border border-[#EFE7DA] shadow-card flex items-center justify-center relative">
          <FileSpreadsheet size={40} className="text-tabGame" />
          <span className="absolute -top-1 -left-2 text-inksoft/40 text-xs">–</span>
          <span className="absolute -top-1 -right-2 text-inksoft/40 text-xs">–</span>
        </div>

        <h2 className="text-[16px] font-semibold text-ink mt-6 text-center">
          {done ? "匯出完成！" : "將密碼資料匯出為 Excel 檔案"}
        </h2>
        {done && <p className="text-[12px] text-inksoft mt-1">已產生 Excel 檔案，你可以選擇分享或儲存到檔案 App</p>}

        {!done && (
          <div className="w-full bg-creamcard border border-[#EFE7DA] rounded-2xl px-4 py-4 mt-6 shadow-soft flex flex-col gap-2.5">
            <BulletRow text="只會儲存在你的手機中" />
            <BulletRow text="可透過分享、Email 或雲端備份" />
            <BulletRow text="不會上傳到任何伺服器" />
          </div>
        )}
      </div>

      <div className="fixed bottom-24 left-0 right-0 px-5 flex flex-col gap-3">
        {!done ? (
          <button
            disabled={busy || items.length === 0}
            onClick={handleExport}
            className="w-full py-3.5 rounded-2xl bg-tabAll text-white font-medium text-[15px] shadow-card active:scale-[0.98] transition-transform disabled:opacity-40"
          >
            {busy ? "匯出中..." : "匯出 Excel"}
          </button>
        ) : (
          <button
            onClick={handleShareAgain}
            className="w-full py-3.5 rounded-2xl bg-tabAll text-white font-medium text-[15px] shadow-card active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          >
            <Share2 size={17} /> 分享檔案
          </button>
        )}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-inksoft">
          <ShieldCheck size={13} />
          <span>建議將檔案保存在安全的地方</span>
        </div>
      </div>
    </div>
  );
}

function BulletRow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-[13px] text-inksoft">
      <span className="w-1.5 h-1.5 rounded-full bg-tabAll shrink-0" />
      <span>{text}</span>
    </div>
  );
}
