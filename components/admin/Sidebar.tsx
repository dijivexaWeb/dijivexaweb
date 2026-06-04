"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Settings, Menu, FileText, Image, Box, Briefcase,
  HelpCircle, BookOpen, Search, ClipboardList, Users, Building2,
  CreditCard, LogOut, Tag, Home,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NavItem { href: string; label: string; icon: React.ComponentType<{ className?: string }>; exact?: boolean; }
interface NavGroup { label: string; items: NavItem[]; }

const navGroups: NavGroup[] = [
  {
    label: "Genel",
    items: [
      { href: "/tr/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    ],
  },
  {
    label: "Site Yönetimi",
    items: [
      { href: "/tr/admin/homepage", label: "Anasayfa İçerik", icon: Home },
      { href: "/tr/admin/settings", label: "Site Ayarları", icon: Settings },
      { href: "/tr/admin/menus", label: "Menüler", icon: Menu },
      { href: "/tr/admin/pages", label: "Sayfalar", icon: FileText },
      { href: "/tr/admin/media", label: "Medya", icon: Image },
      { href: "/tr/admin/modules", label: "Modüller", icon: Box },
      { href: "/tr/admin/services", label: "Hizmetler", icon: Briefcase },
      { href: "/tr/admin/faqs", label: "SSS", icon: HelpCircle },
      { href: "/tr/admin/blog", label: "Blog", icon: BookOpen },
      { href: "/tr/admin/seo", label: "SEO", icon: Search },
      { href: "/tr/admin/testimonials", label: "Referanslar", icon: Users },
    ],
  },
  {
    label: "Formlar & Leadler",
    items: [
      { href: "/tr/admin/forms", label: "Form Başvuruları", icon: ClipboardList },
      { href: "/tr/admin/leads", label: "Lead Pipeline", icon: Tag },
    ],
  },
  {
    label: "SaaS Yönetimi",
    items: [
      { href: "/tr/admin/tenants", label: "Tenantlar", icon: Building2 },
      { href: "/tr/admin/users", label: "Kullanıcılar", icon: Users },
      { href: "/tr/admin/subscriptions", label: "Abonelikler", icon: CreditCard },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/tr/giris");
  }

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <aside className="w-64 min-h-screen bg-[#0B172A] border-r border-[#1e2d45] flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-[#1e2d45]">
        <span className="text-xl font-bold text-white">Dijivexa</span>
        <span className="ml-2 text-xs text-[#2563EB] font-medium bg-[#1e2d45] px-2 py-0.5 rounded">Admin</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider px-3 mb-2">
              {group.label}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href, item.exact);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                        active
                          ? "bg-[#2563EB] text-white"
                          : "text-[#94a3b8] hover:bg-[#1e2d45] hover:text-white"
                      )}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-[#1e2d45]">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm text-[#94a3b8] hover:bg-[#1e2d45] hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          {loggingOut ? "Çıkış yapılıyor..." : "Çıkış Yap"}
        </button>
      </div>
    </aside>
  );
}
