import { Shield, Info, Trash } from "lucide-react";

interface Props {
  itemCount: number;
  onWipeAll: () => void;
}

export default function Settings({ itemCount, onWipeAll }: Props) {
  return (
    <div className="min-h-full pb-28 safe-top">
      <div className="px-5 pt-6 pb-2">
        <h1 className="text-[19px] font-bold text-ink">設定</h1>
      </div>

      <div className="px-5 mt-4 flex flex-col gap-3">
        <div className="bg-creamcard border border-[#EFE7DA] rounded-2xl px-4 py-4 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-chipAll flex items-center justify-center text-tabAll shrink-0">
            <Shield size={18} />
          </div>
          <div>
            <p className="text-[14px] font-medium text-ink">資料儲存於本機</p>
            <p className="text-[12px] text-inksoft mt-0.5">目前共有 {itemCount} 筆密碼資料，僅儲存在你的手機中</p>
          </div>
        </div>

        <div className="bg-creamcard border border-[#EFE7DA] rounded-2xl px-4 py-4 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-chipCustom flex items-center justify-center text-tabCustom shrink-0">
            <Info size={18} />
          </div>
          <div>
            <p className="text-[14px] font-medium text-ink">關於密碼小管家</p>
            <p className="text-[12px] text-inksoft mt-0.5">v1.0.0 · 純本機密碼管理 App</p>
          </div>
        </div>

        <button
          onClick={onWipeAll}
          className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-[#F7DADC] text-[#C97B7B] font-medium text-[14px] active:scale-[0.98] transition-transform"
        >
          <Trash size={16} /> 清除所有本機資料
        </button>
      </div>
    </div>
  );
}
