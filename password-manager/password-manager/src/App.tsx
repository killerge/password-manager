import { useEffect, useState } from "react";
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import Detail from "./pages/Detail";
import Export from "./pages/Export";
import Settings from "./pages/Settings";
import BottomNav from "./components/BottomNav";
import type { NavKey } from "./components/BottomNav";
import Toast from "./components/Toast";
import type { PasswordItem } from "./types";
import { getAllItems, addItem, updateItem, deleteItem, seedIfEmpty, db } from "./services/db";

type Route =
  | { name: "home" }
  | { name: "add" }
  | { name: "edit"; item: PasswordItem }
  | { name: "detail"; item: PasswordItem }
  | { name: "export" }
  | { name: "settings" };

export default function App() {
  const [items, setItems] = useState<PasswordItem[]>([]);
  const [route, setRoute] = useState<Route>({ name: "home" });
  const [nav, setNav] = useState<NavKey>("home");
  const [toast, setToast] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const refresh = async () => setItems(await getAllItems());

  useEffect(() => {
    (async () => {
      await seedIfEmpty();
      await refresh();
      setLoaded(true);
    })();
  }, []);

  const showToast = (msg: string) => setToast(msg);

  const goNav = (key: NavKey) => {
    setNav(key);
    if (key === "home") setRoute({ name: "home" });
    if (key === "export") setRoute({ name: "export" });
    if (key === "settings") setRoute({ name: "settings" });
  };

  const handleSave = async (data: Omit<PasswordItem, "id" | "createdAt" | "updatedAt">) => {
    const now = Date.now();
    if (route.name === "edit" && route.item.id != null) {
      await updateItem(route.item.id, data);
      showToast("已更新項目");
    } else {
      await addItem({ ...data, createdAt: now, updatedAt: now });
      showToast("已新增項目");
    }
    await refresh();
    setRoute({ name: "home" });
    setNav("home");
  };

  const handleDelete = async (id?: number) => {
    if (id == null) return;
    await deleteItem(id);
    await refresh();
    showToast("已刪除項目");
    setRoute({ name: "home" });
    setNav("home");
  };

  const handleWipeAll = async () => {
    if (!confirm("確定要清除所有本機資料嗎？此操作無法復原。")) return;
    await db.items.clear();
    await refresh();
    showToast("已清除所有資料");
  };

  if (!loaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-cream">
        <p className="text-inksoft text-sm">載入中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream max-w-[480px] mx-auto relative">
      {route.name === "home" && (
        <Home
          items={items}
          onOpenItem={(item) => setRoute({ name: "detail", item })}
          onAdd={() => setRoute({ name: "add" })}
          onSettings={() => {
            setRoute({ name: "settings" });
            setNav("settings");
          }}
        />
      )}

      {route.name === "add" && (
        <AddEdit onCancel={() => setRoute({ name: "home" })} onSave={handleSave} />
      )}

      {route.name === "edit" && (
        <AddEdit initial={route.item} onCancel={() => setRoute({ name: "detail", item: route.item })} onSave={handleSave} />
      )}

      {route.name === "detail" && (
        <Detail
          item={route.item}
          onBack={() => {
            setRoute({ name: "home" });
            setNav("home");
          }}
          onEdit={() => setRoute({ name: "edit", item: route.item })}
          onDelete={() => handleDelete(route.item.id)}
          onToast={showToast}
        />
      )}

      {route.name === "export" && (
        <Export items={items} onBack={() => { setRoute({ name: "home" }); setNav("home"); }} onToast={showToast} />
      )}

      {route.name === "settings" && <Settings itemCount={items.length} onWipeAll={handleWipeAll} />}

      {(route.name === "home" || route.name === "export" || route.name === "settings") && (
        <BottomNav active={nav} onChange={goNav} />
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
