import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="px-5 py-3">
      <div className="flex items-center gap-2 bg-creamcard border border-[#EBE3D6] rounded-2xl px-4 py-2.5 shadow-soft">
        <Search size={17} className="text-inksoft shrink-0" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="搜尋名稱、帳號..."
          className="bg-transparent outline-none text-[14px] text-ink placeholder:text-inksoft/70 w-full"
        />
      </div>
    </div>
  );
}
