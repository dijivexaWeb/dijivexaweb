import { Topbar } from "@/components/admin/Topbar";
import { AdminSettingsForm } from "@/components/admin/SettingsForm";

export default function SettingsPage() {
  return (
    <>
      <Topbar title="Site Ayarları" />
      <main className="flex-1 p-6">
        <AdminSettingsForm />
      </main>
    </>
  );
}
