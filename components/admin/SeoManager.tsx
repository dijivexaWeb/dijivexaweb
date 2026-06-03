"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AdminTable } from "./AdminTable";
import { toast } from "sonner";

interface SeoMeta { id: string; page_slug: string; locale: string; meta_title: string; meta_description: string; robots: string; sitemap_priority: number; }

export function SeoManager() {
  const [rows, setRows] = useState<SeoMeta[]>([]);

  async function load() {
    const { data } = await createClient().from("site_seo_meta").select("*").order("page_slug");
    setRows(data ?? []);
  }

  useEffect(() => { load(); }, []);

  return (
    <AdminTable
      title="SEO Meta Kayıtları"
      addLabel="SEO Ekle"
      onAdd={() => toast.info("Yakında...")}
      columns={[
        { key: "page_slug", label: "Sayfa Slug" },
        { key: "locale", label: "Dil" },
        { key: "meta_title", label: "Meta Başlık", render: (r) => <span className="line-clamp-1 max-w-xs">{r.meta_title}</span> },
        { key: "meta_description", label: "Açıklama", render: (r) => <span className="line-clamp-1 max-w-xs text-xs">{r.meta_description}</span> },
        { key: "robots", label: "Robots" },
        { key: "sitemap_priority", label: "Öncelik" },
      ]}
      rows={rows}
      onEdit={() => toast.info("Düzenleme yakında...")}
      emptyText="SEO meta kaydı yok."
    />
  );
}
