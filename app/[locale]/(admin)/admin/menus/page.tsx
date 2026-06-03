import { Topbar } from "@/components/admin/Topbar";
import { MenuManager } from "@/components/admin/MenuManager";

export default function MenusPage() {
  return (
    <>
      <Topbar title="Menü Yönetimi" />
      <main className="flex-1 p-6">
        <MenuManager />
      </main>
    </>
  );
}
