"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AdminTable, StatusBadge } from "./AdminTable";
import { toast } from "sonner";

interface Page { id: string; title: string; slug: string; locale: string; template_type: string; is_published: boolean; updated_at: string; }

export function PagesTable() {
  const [rows, setRows] = useState<Page[]>([]);

  async function load() {
    const sb = createClient();
    const { data } = await sb.from("site_pages").select("id,title,slug,locale,template_type,is_published,updated_at").order("updated_at", { ascending: false });
    setRows(data ?? []);
  }

  async function handleDelete(row: Page) {
    if (!confirm(`"${row.title}" silinsin mi?`)) return;
    const sb = createClient();
    await sb.from("site_pages").delete().eq("id", row.id);
    toast.success("Sayfa silindi.");
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <AdminTable
      title="Sayfalar"
      addLabel="Yeni Sayfa"
      onAdd={() => toast.info("Sayfa düzenleme yakında...")}
      columns={[
        { key: "title", label: "Başlık" },
        { key: "slug", label: "Slug" },
        { key: "locale", label: "Dil" },
        { key: "template_type", label: "Şablon" },
        { key: "is_published", label: "Durum", render: (r) => <StatusBadge value={r.is_published} /> },
        { key: "updated_at", label: "Güncelleme", render: (r) => new Date(r.updated_at).toLocaleDateString("tr") },
      ]}
      rows={rows}
      onEdit={() => toast.info("Düzenleme yakında...")}
      onDelete={handleDelete}
      emptyText="Henüz sayfa yok."
    />
  );
}
