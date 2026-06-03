import { Topbar } from "@/components/admin/Topbar";
import { UsersTable } from "@/components/admin/UsersTable";

export default function UsersPage() {
  return (
    <>
      <Topbar title="Kullanıcılar" />
      <main className="flex-1 p-6">
        <UsersTable />
      </main>
    </>
  );
}
