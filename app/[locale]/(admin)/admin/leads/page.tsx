import { Topbar } from "@/components/admin/Topbar";
import { LeadPipeline } from "@/components/admin/LeadPipeline";

export default function LeadsPage() {
  return (
    <>
      <Topbar title="Lead Pipeline" />
      <main className="flex-1 p-6">
        <LeadPipeline />
      </main>
    </>
  );
}
