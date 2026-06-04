"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AdminTable, StatusBadge } from "./AdminTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Module {
  id: string; slug: string; name: string; locale: string;
  short_description: string; long_description: string;
  icon: string; cta_text: string; cta_href: string;
  sort_order: number; is_published: boolean;
}

const locales = ["tr", "en", "ka", "ru"];
const EMPTY_FORM = {
  slug: "", name: "", locale: "tr", icon: "",
  short_description: "", long_description: "",
  cta_text: "", cta_href: "", sort_order: 0,
};

function slugify(text: string) {
  return text.toLowerCase()
    .replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s")
    .replace(/ı/g,"i").replace(/ö/g,"o").replace(/ç/g,"c")
    .replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"");
}

export function ModulesTable() {
  const [rows, setRows] = useState<Module[]>([]);
  const [open, setOpen] = useState(false);
  const [editRow, setEditRow] = useState<Module | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  async function load() {
    const { data } = await createClient()
      .from("site_modules")
      .select("id,slug,name,locale,short_description,long_description,icon,cta_text,cta_href,sort_order,is_published")
      .order("sort_order");
    setRows(data ?? []);
  }

  function openAdd() {
    setEditRow(null);
    setForm(EMPTY_FORM);
    setOpen(true);
  }

  function openEdit(row: Module) {
    setEditRow(row);
    setForm({
      slug: row.slug, name: row.name, locale: row.locale,
      icon: row.icon ?? "", short_description: row.short_description ?? "",
      long_description: row.long_description ?? "",
      cta_text: row.cta_text ?? "", cta_href: row.cta_href ?? "",
      sort_order: row.sort_order,
    });
    setOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    const db = createClient();
    const { error } = editRow
      ? await db.from("site_modules").update({ ...form }).eq("id", editRow.id)
      : await db.from("site_modules").insert({ ...form, is_published: true });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(editRow ? "Modül güncellendi." : "Modül eklendi.");
    setOpen(false);
    load();
  }

  async function handleDelete(row: Module) {
    if (!confirm("Silinsin mi?")) return;
    await createClient().from("site_modules").delete().eq("id", row.id);
    toast.success("Silindi.");
    load();
  }

  async function togglePublish(row: Module) {
    await createClient().from("site_modules").update({ is_published: !row.is_published }).eq("id", row.id);
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <>
      <AdminTable
        title="Dijivexa Clinic Modülleri"
        addLabel="Modül Ekle"
        onAdd={openAdd}
        columns={[
          { key: "icon", label: "İkon", render: (r) => <span className="text-xl">{r.icon}</span> },
          { key: "name", label: "Modül Adı" },
          { key: "slug", label: "Slug" },
          { key: "locale", label: "Dil" },
          { key: "short_description", label: "Açıklama", render: (r) => <span className="line-clamp-1 max-w-xs">{r.short_description}</span> },
          { key: "sort_order", label: "Sıra" },
          { key: "is_published", label: "Durum", render: (r) => (
            <button onClick={() => togglePublish(r)}>
              <StatusBadge value={r.is_published} />
            </button>
          )},
        ]}
        rows={rows}
        onEdit={openEdit}
        onDelete={handleDelete}
        emptyText="Henüz modül yok."
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0B172A] border-[#1e2d45] text-white max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">{editRow ? "Modül Düzenle" : "Yeni Modül"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label className="text-[#94a3b8]">Dil</Label>
                <Select value={form.locale} onValueChange={(v) => setForm((f) => ({ ...f, locale: v }))}>
                  <SelectTrigger className="bg-[#07111F] border-[#1e2d45] text-white"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-[#0B172A] border-[#1e2d45]">
                    {locales.map((l) => <SelectItem key={l} value={l} className="text-white">{l.toUpperCase()}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-[#94a3b8]">İkon (emoji)</Label>
                <Input value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                  className="bg-[#07111F] border-[#1e2d45] text-white" placeholder="👤" />
              </div>
              <div className="space-y-1">
                <Label className="text-[#94a3b8]">Sıra</Label>
                <Input type="number" value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))}
                  className="bg-[#07111F] border-[#1e2d45] text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Modül Adı</Label>
              <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value, slug: editRow ? f.slug : slugify(e.target.value) }))}
                className="bg-[#07111F] border-[#1e2d45] text-white" />
            </div>
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Slug</Label>
              <Input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className="bg-[#07111F] border-[#1e2d45] text-white" />
            </div>
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Kısa Açıklama</Label>
              <Textarea value={form.short_description} onChange={(e) => setForm((f) => ({ ...f, short_description: e.target.value }))}
                rows={2} className="bg-[#07111F] border-[#1e2d45] text-white resize-none" />
            </div>
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Uzun Açıklama</Label>
              <Textarea value={form.long_description} onChange={(e) => setForm((f) => ({ ...f, long_description: e.target.value }))}
                rows={3} className="bg-[#07111F] border-[#1e2d45] text-white resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-[#94a3b8]">CTA Butonu Metni</Label>
                <Input value={form.cta_text} onChange={(e) => setForm((f) => ({ ...f, cta_text: e.target.value }))}
                  className="bg-[#07111F] border-[#1e2d45] text-white" placeholder="Modülü İncele" />
              </div>
              <div className="space-y-1">
                <Label className="text-[#94a3b8]">CTA Linki</Label>
                <Input value={form.cta_href} onChange={(e) => setForm((f) => ({ ...f, cta_href: e.target.value }))}
                  className="bg-[#07111F] border-[#1e2d45] text-white" placeholder="/tr/ozellikler" />
              </div>
            </div>
            <Button onClick={handleSave} disabled={saving || !form.name}
              className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white">
              {saving ? "Kaydediliyor..." : editRow ? "Güncelle" : "Kaydet"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
