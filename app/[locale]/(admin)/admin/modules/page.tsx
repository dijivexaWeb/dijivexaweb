import { Topbar } from "@/components/admin/Topbar";
import { ModulesTable } from "@/components/admin/ModulesTable";

export default function ModulesPage() {
  return (
    <>
      <Topbar title="Modül Yönetimi" />
      <main className="flex-1 p-6">
        <ModulesTable />
      </main>
    </>
  );
}
