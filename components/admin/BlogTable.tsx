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

interface Post { id: string; title: string; slug: string; locale: string; author: string; is_published: boolean; published_at: string | null; created_at: string; }

const locales = ["tr", "en", "ka", "ru"];

export function BlogTable() {
  const [rows, setRows] = useState<Post[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", locale: "tr", excerpt: "", content: "", author: "Dijivexa" });
  const [saving, setSaving] = useState(false);

  async function load() {
    const { data } = await createClient().from("site_blog_posts").select("id,title,slug,locale,author,is_published,published_at,created_at").order("created_at", { ascending: false });
    setRows(data ?? []);
  }

  function slugify(text: string) {
    return text.toLowerCase().replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s").replace(/ı/g,"i").replace(/ö/g,"o").replace(/ç/g,"c").replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"");
  }

  async function handleSave() {
    setSaving(true);
    const { error } = await createClient().from("site_blog_posts").insert({ ...form, is_published: false });
    setSaving(false);
    if (error) { toast.error("Hata: " + error.message); return; }
    toast.success("Blog yazısı oluşturuldu.");
    setOpen(false);
    setForm({ title: "", slug: "", locale: "tr", excerpt: "", content: "", author: "Dijivexa" });
    load();
  }

  async function handleDelete(row: Post) {
    if (!confirm("Silinsin mi?")) return;
    await createClient().from("site_blog_posts").delete().eq("id", row.id);
    toast.success("Blog yazısı silindi.");
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <>
      <AdminTable
        title="Blog Yazıları"
        addLabel="Yeni Yazı"
        onAdd={() => setOpen(true)}
        columns={[
          { key: "title", label: "Başlık", render: (r) => <span className="line-clamp-1">{r.title}</span> },
          { key: "slug", label: "Slug" },
          { key: "locale", label: "Dil" },
          { key: "author", label: "Yazar" },
          { key: "is_published", label: "Durum", render: (r) => <StatusBadge value={r.is_published} /> },
          { key: "created_at", label: "Tarih", render: (r) => new Date(r.created_at).toLocaleDateString("tr") },
        ]}
        rows={rows}
        onDelete={handleDelete}
        emptyText="Henüz blog yazısı yok."
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0B172A] border-[#1e2d45] text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">Yeni Blog Yazısı</DialogTitle>
          </DialogHeader>
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
                <Label className="text-[#94a3b8]">Yazar</Label>
                <Input value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} className="bg-[#07111F] border-[#1e2d45] text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Başlık</Label>
              <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: slugify(e.target.value) }))} className="bg-[#07111F] border-[#1e2d45] text-white" />
            </div>
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Slug</Label>
              <Input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className="bg-[#07111F] border-[#1e2d45] text-white" />
            </div>
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Özet</Label>
              <Textarea value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} rows={3} className="bg-[#07111F] border-[#1e2d45] text-white resize-none" />
            </div>
            <Button onClick={handleSave} disabled={saving} className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white">
              {saving ? "Kaydediliyor..." : "Oluştur"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
