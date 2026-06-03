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

interface Module { id: string; slug: string; name: string; locale: string; short_description: string; sort_order: number; is_published: boolean; }
const locales = ["tr", "en", "ka", "ru"];

export function ModulesTable() {
  const [rows, setRows] = useState<Module[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ slug: "", name: "", locale: "tr", short_description: "", sort_order: 0 });
  const [saving, setSaving] = useState(false);

  async function load() {
    const { data } = await createClient().from("site_modules").select("id,slug,name,locale,short_description,sort_order,is_published").order("sort_order");
    setRows(data ?? []);
  }

  function slugify(text: string) {
    return text.toLowerCase().replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s").replace(/ı/g,"i").replace(/ö/g,"o").replace(/ç/g,"c").replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"");
  }

  async function handleSave() {
    setSaving(true);
    const { error } = await createClient().from("site_modules").insert({ ...form, is_published: true });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Modül eklendi.");
    setOpen(false);
    load();
  }

  async function handleDelete(row: Module) {
    if (!confirm("Silinsin mi?")) return;
    await createClient().from("site_modules").delete().eq("id", row.id);
    toast.success("Silindi.");
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <>
      <AdminTable
        title="Dijivexa Clinic Modülleri"
        addLabel="Modül Ekle"
        onAdd={() => setOpen(true)}
        columns={[
          { key: "name", label: "Modül Adı" },
          { key: "slug", label: "Slug" },
          { key: "locale", label: "Dil" },
          { key: "short_description", label: "Açıklama", render: (r) => <span className="line-clamp-1 max-w-xs">{r.short_description}</span> },
          { key: "sort_order", label: "Sıra" },
          { key: "is_published", label: "Durum", render: (r) => <StatusBadge value={r.is_published} /> },
        ]}
        rows={rows}
        onDelete={handleDelete}
        emptyText="Henüz modül yok."
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0B172A] border-[#1e2d45] text-white max-w-lg">
          <DialogHeader><DialogTitle className="text-white">Yeni Modül</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                <Label className="text-[#94a3b8]">Sıra</Label>
                <Input type="number" value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))} className="bg-[#07111F] border-[#1e2d45] text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Modül Adı</Label>
              <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value, slug: slugify(e.target.value) }))} className="bg-[#07111F] border-[#1e2d45] text-white" />
            </div>
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Slug</Label>
              <Input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className="bg-[#07111F] border-[#1e2d45] text-white" />
            </div>
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Kısa Açıklama</Label>
              <Textarea value={form.short_description} onChange={(e) => setForm((f) => ({ ...f, short_description: e.target.value }))} rows={3} className="bg-[#07111F] border-[#1e2d45] text-white resize-none" />
            </div>
            <Button onClick={handleSave} disabled={saving} className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white">
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
