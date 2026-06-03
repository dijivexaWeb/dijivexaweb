import { Topbar } from "@/components/admin/Topbar";
import { ServicesTable } from "@/components/admin/ServicesTable";

export default function ServicesPage() {
  return (
    <>
      <Topbar title="Hizmet Yönetimi" />
      <main className="flex-1 p-6">
        <ServicesTable />
      </main>
    </>
  );
}
