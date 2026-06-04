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

interface Testimonial {
  id: string; name: string; role: string; company: string;
  location: string; content: string; rating: number;
  avatar_url: string; sort_order: number; is_published: boolean; locale: string;
}

const EMPTY_FORM = { name: "", role: "", company: "", location: "", content: "", rating: "5", sort_order: "0", locale: "tr", avatar_url: "" };

export function TestimonialsTable() {
  const [rows, setRows] = useState<Testimonial[]>([]);
  const [open, setOpen] = useState(false);
  const [editRow, setEditRow] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  async function load() {
    const { data } = await createClient().from("site_testimonials").select("*").order("sort_order");
    setRows(data ?? []);
  }

  function openAdd() {
    setEditRow(null);
    setForm(EMPTY_FORM);
    setOpen(true);
  }

  function openEdit(row: Testimonial) {
    setEditRow(row);
    setForm({
      name: row.name, role: row.role ?? "", company: row.company ?? "",
      location: row.location ?? "", content: row.content,
      rating: String(row.rating), sort_order: String(row.sort_order),
      locale: row.locale, avatar_url: row.avatar_url ?? "",
    });
    setOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    const payload = {
      name: form.name, role: form.role, company: form.company,
      location: form.location, content: form.content,
      avatar_url: form.avatar_url, locale: form.locale,
      rating: Number(form.rating), sort_order: Number(form.sort_order),
    };
    const db = createClient();
    const { error } = editRow
      ? await db.from("site_testimonials").update(payload).eq("id", editRow.id)
      : await db.from("site_testimonials").insert({ ...payload, is_published: true });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(editRow ? "Güncellendi." : "Referans eklendi.");
    setOpen(false);
    load();
  }

  async function handleDelete(row: Testimonial) {
    if (!confirm(`"${row.name}" silinsin mi?`)) return;
    await createClient().from("site_testimonials").delete().eq("id", row.id);
    toast.success("Silindi.");
    load();
  }

  async function togglePublish(row: Testimonial) {
    await createClient().from("site_testimonials").update({ is_published: !row.is_published }).eq("id", row.id);
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <>
      <AdminTable
        title="Referanslar & Yorumlar"
        addLabel="Referans Ekle"
        onAdd={openAdd}
        columns={[
          { key: "name", label: "Ad Soyad" },
          { key: "role", label: "Unvan" },
          { key: "company", label: "Klinik/Şirket" },
          { key: "location", label: "Şehir" },
          { key: "locale", label: "Dil" },
          { key: "rating", label: "Puan", render: (r) => "⭐".repeat(r.rating) },
          { key: "content", label: "Yorum", render: (r) => <span className="line-clamp-1 max-w-xs text-xs">{r.content}</span> },
          { key: "is_published", label: "Durum", render: (r) => (
            <button onClick={() => togglePublish(r)}>
              <StatusBadge value={r.is_published} />
            </button>
          )},
        ]}
        rows={rows}
        onEdit={openEdit}
        onDelete={handleDelete}
        emptyText="Henüz referans yok. İlk referansı ekleyin."
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0B172A] border-[#1e2d45] text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">{editRow ? "Referansı Düzenle" : "Yeni Referans / Yorum Ekle"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-[#94a3b8]">Ad Soyad</Label>
                <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="bg-[#07111F] border-[#1e2d45] text-white" placeholder="Dr. Ahmet Yılmaz" />
              </div>
              <div className="space-y-1">
                <Label className="text-[#94a3b8]">Unvan</Label>
                <Input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                  className="bg-[#07111F] border-[#1e2d45] text-white" placeholder="Klinik Müdürü" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-[#94a3b8]">Klinik / Şirket</Label>
                <Input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  className="bg-[#07111F] border-[#1e2d45] text-white" placeholder="Hair Expert Merkezi" />
              </div>
              <div className="space-y-1">
                <Label className="text-[#94a3b8]">Şehir</Label>
                <Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  className="bg-[#07111F] border-[#1e2d45] text-white" placeholder="İstanbul" />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Avatar (kısaltma, ör: MS)</Label>
              <Input value={form.avatar_url} onChange={e => setForm(f => ({ ...f, avatar_url: e.target.value }))}
                className="bg-[#07111F] border-[#1e2d45] text-white" placeholder="MS" maxLength={2} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label className="text-[#94a3b8]">Puan</Label>
                <Select value={form.rating} onValueChange={v => setForm(f => ({ ...f, rating: v }))}>
                  <SelectTrigger className="bg-[#07111F] border-[#1e2d45] text-white"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-[#0B172A] border-[#1e2d45]">
                    {["5","4","3"].map(v => <SelectItem key={v} value={v} className="text-white">{"⭐".repeat(Number(v))}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-[#94a3b8]">Dil</Label>
                <Select value={form.locale} onValueChange={v => setForm(f => ({ ...f, locale: v }))}>
                  <SelectTrigger className="bg-[#07111F] border-[#1e2d45] text-white"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-[#0B172A] border-[#1e2d45]">
                    {["tr","en","ka","ru"].map(v => <SelectItem key={v} value={v} className="text-white">{v.toUpperCase()}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-[#94a3b8]">Sıra</Label>
                <Input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: e.target.value }))}
                  className="bg-[#07111F] border-[#1e2d45] text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Yorum Metni</Label>
              <Textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                rows={4} className="bg-[#07111F] border-[#1e2d45] text-white resize-none"
                placeholder="Dijivexa ile kliniğimizi..." />
            </div>
            <Button onClick={handleSave} disabled={saving || !form.name || !form.content}
              className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white">
              {saving ? "Kaydediliyor..." : editRow ? "Güncelle" : "Referansı Kaydet"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
