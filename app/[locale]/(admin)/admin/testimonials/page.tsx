import { Topbar } from "@/components/admin/Topbar";
import { TestimonialsTable } from "@/components/admin/TestimonialsTable";

export default function TestimonialsPage() {
  return (
    <>
      <Topbar title="Referanslar & Yorumlar" />
      <main className="flex-1 p-6">
        <TestimonialsTable />
      </main>
    </>
  );
}
