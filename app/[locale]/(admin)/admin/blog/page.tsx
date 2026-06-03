import { Topbar } from "@/components/admin/Topbar";
import { BlogTable } from "@/components/admin/BlogTable";

export default function BlogPage() {
  return (
    <>
      <Topbar title="Blog Yönetimi" />
      <main className="flex-1 p-6">
        <BlogTable />
      </main>
    </>
  );
}
