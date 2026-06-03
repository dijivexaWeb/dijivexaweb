import { Topbar } from "@/components/admin/Topbar";
import { FaqsTable } from "@/components/admin/FaqsTable";

export default function FaqsPage() {
  return (
    <>
      <Topbar title="SSS Yönetimi" />
      <main className="flex-1 p-6">
        <FaqsTable />
      </main>
    </>
  );
}
