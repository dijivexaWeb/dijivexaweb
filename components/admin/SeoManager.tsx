"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AdminTable } from "./AdminTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface SeoMeta {
  id: string; page_slug: string; locale: string;
  meta_title: string; meta_description: string;
  og_title: string; og_description: string; og_image: string;
  robots: string; sitemap_priority: number;
}

const locales = ["tr", "en", "ka", "ru"];
const EMPTY = { page_slug: "", locale: "tr", meta_title: "", meta_description: "", og_title: "", og_description: "", og_image: "", robots: "index,follow", sitemap_priority: 0.8 };

export function SeoManager() {
  const [rows, setRows] = useState<SeoMeta[]>([]);
  const [open, setOpen] = useState(false);
  const [editRow, setEditRow] = useState<SeoMeta | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  async function load() {
    const { data } = await createClient().from("site_seo_meta").select("*").order("page_slug");
    setRows(data ?? []);
  }

  function openAdd() { setEditRow(null); setForm(EMPTY); setOpen(true); }

  function openEdit(row: SeoMeta) {
    setEditRow(row);
    setForm({ page_slug: row.page_slug, locale: row.locale, meta_title: row.meta_title ?? "", meta_description: row.meta_description ?? "", og_title: row.og_title ?? "", og_description: row.og_description ?? "", og_image: row.og_image ?? "", robots: row.robots ?? "index,follow", sitemap_priority: row.sitemap_priority ?? 0.8 });
    setOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    const db = createClient();
    const { error } = editRow
      ? await db.from("site_seo_meta").update({ ...form, sitemap_priority: Number(form.sitemap_priority) }).eq("id", editRow.id)
      : await db.from("site_seo_meta").insert({ ...form, sitemap_priority: Number(form.sitemap_priority) });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(editRow ? "SEO güncellendi." : "SEO meta eklendi.");
    setOpen(false);
    load();
  }

  async function handleDelete(row: SeoMeta) {
    if (!confirm("Silinsin mi?")) return;
    await createClient().from("site_seo_meta").delete().eq("id", row.id);
    toast.success("Silindi.");
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <>
      <AdminTable
        title="SEO Meta Kayıtları"
        addLabel="SEO Ekle"
        onAdd={openAdd}
        columns={[
          { key: "page_slug", label: "Sayfa", render: (r) => <span className="font-mono text-xs text-[#60A5FA]">/{r.page_slug}</span> },
          { key: "locale", label: "Dil" },
          { key: "meta_title", label: "Meta Başlık", render: (r) => <span className="line-clamp-1 max-w-xs text-sm">{r.meta_title}</span> },
          { key: "meta_description", label: "Açıklama", render: (r) => <span className="line-clamp-1 max-w-xs text-xs text-[#64748B]">{r.meta_description}</span> },
          { key: "robots", label: "Robots", render: (r) => <span className="text-xs">{r.robots}</span> },
          { key: "sitemap_priority", label: "Öncelik" },
        ]}
        rows={rows}
        onEdit={openEdit}
        onDelete={handleDelete}
        emptyText="SEO meta kaydı yok. Ana sayfalar için kayıt ekleyin."
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0B172A] border-[#1e2d45] text-white max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">{editRow ? "SEO Meta Düzenle" : "Yeni SEO Meta"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-[#94a3b8]">Sayfa Slug</Label>
                <Input value={form.page_slug} onChange={(e) => setForm((f) => ({ ...f, page_slug: e.target.value }))}
                  className="bg-[#07111F] border-[#1e2d45] text-white font-mono" placeholder="dijivexa-clinic" />
              </div>
              <div className="space-y-1">
                <Label className="text-[#94a3b8]">Dil</Label>
                <Select value={form.locale} onValueChange={(v) => setForm((f) => ({ ...f, locale: v }))}>
                  <SelectTrigger className="bg-[#07111F] border-[#1e2d45] text-white"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-[#0B172A] border-[#1e2d45]">
                    {locales.map((l) => <SelectItem key={l} value={l} className="text-white">{l.toUpperCase()}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Meta Başlık <span className="text-xs text-[#475569]">(50-60 karakter ideal)</span></Label>
              <Input value={form.meta_title} onChange={(e) => setForm((f) => ({ ...f, meta_title: e.target.value }))}
                className="bg-[#07111F] border-[#1e2d45] text-white" />
              <p className="text-xs text-[#475569]">{form.meta_title.length} karakter</p>
            </div>

            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Meta Açıklama <span className="text-xs text-[#475569]">(150-160 karakter ideal)</span></Label>
              <Textarea value={form.meta_description} onChange={(e) => setForm((f) => ({ ...f, meta_description: e.target.value }))}
                rows={3} className="bg-[#07111F] border-[#1e2d45] text-white resize-none" />
              <p className="text-xs text-[#475569]">{form.meta_description.length} karakter</p>
            </div>

            <div className="border-t border-[#1e2d45] pt-4 space-y-1">
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">Open Graph (Sosyal Medya)</p>
              <div className="space-y-1">
                <Label className="text-[#94a3b8]">OG Başlık</Label>
                <Input value={form.og_title} onChange={(e) => setForm((f) => ({ ...f, og_title: e.target.value }))}
                  className="bg-[#07111F] border-[#1e2d45] text-white" />
              </div>
              <div className="space-y-1 pt-2">
                <Label className="text-[#94a3b8]">OG Açıklama</Label>
                <Textarea value={form.og_description} onChange={(e) => setForm((f) => ({ ...f, og_description: e.target.value }))}
                  rows={2} className="bg-[#07111F] border-[#1e2d45] text-white resize-none" />
              </div>
              <div className="space-y-1 pt-2">
                <Label className="text-[#94a3b8]">OG Görsel URL</Label>
                <Input value={form.og_image} onChange={(e) => setForm((f) => ({ ...f, og_image: e.target.value }))}
                  className="bg-[#07111F] border-[#1e2d45] text-white" placeholder="https://dijivexa.com/og.png" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-[#1e2d45] pt-4">
              <div className="space-y-1">
                <Label className="text-[#94a3b8]">Robots</Label>
                <Select value={form.robots} onValueChange={(v) => setForm((f) => ({ ...f, robots: v }))}>
                  <SelectTrigger className="bg-[#07111F] border-[#1e2d45] text-white"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-[#0B172A] border-[#1e2d45]">
                    <SelectItem value="index,follow" className="text-white">index, follow</SelectItem>
                    <SelectItem value="noindex,nofollow" className="text-white">noindex, nofollow</SelectItem>
                    <SelectItem value="index,nofollow" className="text-white">index, nofollow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-[#94a3b8]">Sitemap Önceliği (0-1)</Label>
                <Input type="number" step="0.1" min="0" max="1" value={form.sitemap_priority}
                  onChange={(e) => setForm((f) => ({ ...f, sitemap_priority: Number(e.target.value) }))}
                  className="bg-[#07111F] border-[#1e2d45] text-white" />
              </div>
            </div>

            <Button onClick={handleSave} disabled={saving || !form.page_slug || !form.meta_title}
              className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white">
              {saving ? "Kaydediliyor..." : editRow ? "Güncelle" : "Kaydet"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
