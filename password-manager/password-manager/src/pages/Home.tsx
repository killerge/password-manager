import { useMemo, useState } from "react";
import Header from "../components/Header";
import CategoryTabs from "../components/CategoryTabs";
import SearchBar from "../components/SearchBar";
import ItemCard from "../components/ItemCard";
import FAB from "../components/FAB";
import type { CategoryId, PasswordItem } from "../types";

interface Props {
  items: PasswordItem[];
  onOpenItem: (item: PasswordItem) => void;
  onAdd: () => void;
  onSettings: () => void;
}

export default function Home({ items, onOpenItem, onAdd, onSettings }: Props) {
  const [category, setCategory] = useState<CategoryId>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = items;
    if (category !== "all") list = list.filter((it) => it.category === category);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (it) => it.name.toLowerCase().includes(q) || it.account.toLowerCase().includes(q)
      );
    }
    return list;
  }, [items, category, query]);

  return (
    <div className="min-h-full pb-28 safe-top">
      <Header onSettings={onSettings} />
      <CategoryTabs active={category} onChange={setCategory} />
      <SearchBar value={query} onChange={setQuery} />
      <div className="px-5 flex flex-col gap-2.5 mt-1">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-inksoft">
            <p className="text-[13px]">目前沒有符合的項目</p>
          </div>
        )}
        {filtered.map((item) => (
          <ItemCard key={item.id} item={item} onClick={() => onOpenItem(item)} />
        ))}
      </div>
      <FAB onClick={onAdd} />
    </div>
  );
}
