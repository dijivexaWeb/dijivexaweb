import { Topbar } from "@/components/admin/Topbar";
import { HomepageContentEditor } from "@/components/admin/HomepageContentEditor";

export default function HomepagePage() {
  return (
    <>
      <Topbar title="Anasayfa İçerik Yönetimi" />
      <main className="flex-1 p-6">
        <HomepageContentEditor />
      </main>
    </>
  );
}
