import { Topbar } from "@/components/admin/Topbar";
import { SubscriptionsTable } from "@/components/admin/SubscriptionsTable";

export default function SubscriptionsPage() {
  return (
    <>
      <Topbar title="Abonelikler" />
      <main className="flex-1 p-6">
        <SubscriptionsTable />
      </main>
    </>
  );
}
