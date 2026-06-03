import { Topbar } from "@/components/admin/Topbar";
import { TenantsTable } from "@/components/admin/TenantsTable";

export default function TenantsPage() {
  return (
    <>
      <Topbar title="Tenant / Demo Hesaplar" />
      <main className="flex-1 p-6">
        <TenantsTable />
      </main>
    </>
  );
}
