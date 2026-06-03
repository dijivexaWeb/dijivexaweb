import { Topbar } from "@/components/admin/Topbar";
import { SeoManager } from "@/components/admin/SeoManager";

export default function SeoPage() {
  return (
    <>
      <Topbar title="SEO Yönetimi" />
      <main className="flex-1 p-6">
        <SeoManager />
      </main>
    </>
  );
}
