import { Topbar } from "@/components/admin/Topbar";
import { MediaLibrary } from "@/components/admin/MediaLibrary";

export default function MediaPage() {
  return (
    <>
      <Topbar title="Medya Kütüphanesi" />
      <main className="flex-1 p-6">
        <MediaLibrary />
      </main>
    </>
  );
}
