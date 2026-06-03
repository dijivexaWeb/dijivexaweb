import { Topbar } from "@/components/admin/Topbar";
import { FormsTable } from "@/components/admin/FormsTable";

export default function FormsPage() {
  return (
    <>
      <Topbar title="Form Başvuruları" />
      <main className="flex-1 p-6">
        <FormsTable />
      </main>
    </>
  );
}
