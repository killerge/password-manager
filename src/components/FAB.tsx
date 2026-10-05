import { Plus } from "lucide-react";

export default function FAB({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed right-5 bottom-24 w-14 h-14 rounded-full bg-tabAll text-white flex items-center justify-center shadow-card active:scale-95 transition-transform z-40"
      aria-label="新增項目"
    >
      <Plus size={26} />
    </button>
  );
}
