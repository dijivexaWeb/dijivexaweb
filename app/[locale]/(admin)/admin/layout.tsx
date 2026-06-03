import { Sidebar } from "@/components/admin/Sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#07111F]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
      <Toaster />
    </div>
  );
}
