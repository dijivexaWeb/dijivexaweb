"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AdminTable, StatusBadge } from "./AdminTable";
import { toast } from "sonner";

interface Service { id: string; slug: string; name: string; locale: string; tagline: string; sort_order: number; is_published: boolean; }

export function ServicesTable() {
  const [rows, setRows] = useState<Service[]>([]);

  async function load() {
    const { data } = await createClient().from("site_services").select("id,slug,name,locale,tagline,sort_order,is_published").order("sort_order");
    setRows(data ?? []);
  }

  async function handleDelete(row: Service) {
    if (!confirm("Silinsin mi?")) return;
    await createClient().from("site_services").delete().eq("id", row.id);
    toast.success("Silindi.");
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <AdminTable
      title="Dijivexa Hizmetleri"
      addLabel="Hizmet Ekle"
      onAdd={() => toast.info("Yakında...")}
      columns={[
        { key: "name", label: "Hizmet Adı" },
        { key: "slug", label: "Slug" },
        { key: "locale", label: "Dil" },
        { key: "tagline", label: "Slogan", render: (r) => <span className="line-clamp-1 max-w-xs">{r.tagline}</span> },
        { key: "sort_order", label: "Sıra" },
        { key: "is_published", label: "Durum", render: (r) => <StatusBadge value={r.is_published} /> },
      ]}
      rows={rows}
      onDelete={handleDelete}
      emptyText="Henüz hizmet yok."
    />
  );
}
