import { Topbar } from "@/components/admin/Topbar";
import { PagesTable } from "@/components/admin/PagesTable";

export default function PagesPage() {
  return (
    <>
      <Topbar title="Sayfa Yönetimi" />
      <main className="flex-1 p-6">
        <PagesTable />
      </main>
    </>
  );
}
