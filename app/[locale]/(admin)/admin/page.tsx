import { Topbar } from "@/components/admin/Topbar";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, ClipboardList, Building2 } from "lucide-react";

async function getStats() {
  const supabase = await createClient();
  const [pages, tenants, submissions, blogs] = await Promise.all([
    supabase.from("site_pages").select("id", { count: "exact", head: true }),
    supabase.from("tenants").select("id", { count: "exact", head: true }),
    supabase.from("site_form_submissions").select("id", { count: "exact", head: true }),
    supabase.from("site_blog_posts").select("id", { count: "exact", head: true }),
  ]);
  return {
    pages: pages.count ?? 0,
    tenants: tenants.count ?? 0,
    submissions: submissions.count ?? 0,
    blogs: blogs.count ?? 0,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const statCards = [
    { label: "Toplam Sayfa", value: stats.pages, icon: FileText, color: "text-[#2563EB]" },
    { label: "Demo Tenant", value: stats.tenants, icon: Building2, color: "text-[#00C2A8]" },
    { label: "Form Başvurusu", value: stats.submissions, icon: ClipboardList, color: "text-[#F59E0B]" },
    { label: "Blog Yazısı", value: stats.blogs, icon: Users, color: "text-[#38BDF8]" },
  ];

  return (
    <>
      <Topbar title="Dashboard" />
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label} className="bg-[#0B172A] border-[#1e2d45]">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm text-[#64748B]">{s.label}</CardTitle>
                  <Icon className={`w-4 h-4 ${s.color}`} />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-white">{s.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="bg-[#0B172A] border-[#1e2d45]">
            <CardHeader>
              <CardTitle className="text-white text-sm">Hızlı Erişim</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { href: "/tr/admin/pages", label: "Yeni Sayfa Ekle" },
                { href: "/tr/admin/blog", label: "Blog Yazısı Ekle" },
                { href: "/tr/admin/faqs", label: "SSS Ekle" },
                { href: "/tr/admin/leads", label: "Lead Pipeline" },
                { href: "/tr/admin/tenants", label: "Demo Hesaplar" },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block px-3 py-2 text-sm text-[#94a3b8] hover:text-white hover:bg-[#1e2d45] rounded-lg transition-colors"
                >
                  → {l.label}
                </a>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-[#0B172A] border-[#1e2d45]">
            <CardHeader>
              <CardTitle className="text-white text-sm">Sistem Durumu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Supabase DB", status: "Aktif" },
                { label: "CMS Tabloları", status: "Hazır" },
                { label: "RLS Politikaları", status: "Aktif" },
                { label: "Vercel Deploy", status: "Bağlı" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-[#64748B]">{item.label}</span>
                  <span className="text-xs text-[#00C2A8] bg-[#00C2A8]/10 px-2 py-0.5 rounded-full">
                    {item.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
