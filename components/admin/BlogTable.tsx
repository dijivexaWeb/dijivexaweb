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

interface Post {
  id: string; title: string; slug: string; locale: string;
  excerpt: string | null; content: string | null;
  author: string; cover_image: string | null;
  is_published: boolean; published_at: string | null; created_at: string;
}

const locales = ["tr", "en", "ka", "ru"];
const EMPTY = { title: "", slug: "", locale: "tr", excerpt: "", content: "", author: "Dijivexa", cover_image: "" };

function slugify(t: string) {
  return t.toLowerCase().replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s").replace(/ı/g,"i").replace(/ö/g,"o").replace(/ç/g,"c").replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"");
}

export function BlogTable() {
  const [rows, setRows] = useState<Post[]>([]);
  const [open, setOpen] = useState(false);
  const [editRow, setEditRow] = useState<Post | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  async function load() {
    const { data } = await createClient().from("site_blog_posts")
      .select("id,title,slug,locale,excerpt,content,author,cover_image,is_published,published_at,created_at")
      .order("created_at", { ascending: false });
    setRows(data ?? []);
  }

  function openAdd() { setEditRow(null); setForm(EMPTY); setOpen(true); }

  function openEdit(row: Post) {
    setEditRow(row);
    setForm({ title: row.title, slug: row.slug, locale: row.locale, excerpt: row.excerpt ?? "", content: row.content ?? "", author: row.author, cover_image: row.cover_image ?? "" });
    setOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    const db = createClient();
    const payload = { ...form, published_at: editRow?.is_published || !editRow ? new Date().toISOString() : null };
    const { error } = editRow
      ? await db.from("site_blog_posts").update(payload).eq("id", editRow.id)
      : await db.from("site_blog_posts").insert({ ...payload, is_published: false });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(editRow ? "Güncellendi." : "Blog yazısı oluşturuldu (taslak).");
    setOpen(false);
    load();
  }

  async function handleDelete(row: Post) {
    if (!confirm(`"${row.title}" silinsin mi?`)) return;
    await createClient().from("site_blog_posts").delete().eq("id", row.id);
    toast.success("Silindi.");
    load();
  }

  async function togglePublish(row: Post) {
    const now = new Date().toISOString();
    await createClient().from("site_blog_posts").update({
      is_published: !row.is_published,
      published_at: !row.is_published ? now : null,
    }).eq("id", row.id);
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <>
      <AdminTable
        title="Blog Yazıları"
        addLabel="Yeni Yazı"
        onAdd={openAdd}
        columns={[
          { key: "title", label: "Başlık", render: (r) => <span className="line-clamp-1 max-w-sm font-medium">{r.title}</span> },
          { key: "slug", label: "Slug", render: (r) => <span className="text-xs text-[#64748B]">{r.slug}</span> },
          { key: "locale", label: "Dil" },
          { key: "author", label: "Yazar" },
          { key: "published_at", label: "Tarih", render: (r) => r.published_at ? new Date(r.published_at).toLocaleDateString("tr") : "—" },
          { key: "is_published", label: "Durum", render: (r) => (
            <button onClick={() => togglePublish(r)}><StatusBadge value={r.is_published} /></button>
          )},
        ]}
        rows={rows}
        onEdit={openEdit}
        onDelete={handleDelete}
        emptyText="Henüz blog yazısı yok. İlk yazıyı oluşturun."
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0B172A] border-[#1e2d45] text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">{editRow ? "Blog Yazısını Düzenle" : "Yeni Blog Yazısı"}</DialogTitle>
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
                <Input value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                  className="bg-[#07111F] border-[#1e2d45] text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Başlık</Label>
              <Input value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: editRow ? f.slug : slugify(e.target.value) }))}
                className="bg-[#07111F] border-[#1e2d45] text-white" />
            </div>
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Slug (URL)</Label>
              <Input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className="bg-[#07111F] border-[#1e2d45] text-white" />
            </div>
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Kapak Görsel URL</Label>
              <Input value={form.cover_image} onChange={(e) => setForm((f) => ({ ...f, cover_image: e.target.value }))}
                className="bg-[#07111F] border-[#1e2d45] text-white" placeholder="https://..." />
            </div>
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Özet (excerpt)</Label>
              <Textarea value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                rows={2} className="bg-[#07111F] border-[#1e2d45] text-white resize-none" placeholder="Kısa açıklama..." />
            </div>
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">İçerik (Markdown)</Label>
              <Textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                rows={12} className="bg-[#07111F] border-[#1e2d45] text-white resize-none font-mono text-xs"
                placeholder="## Başlık&#10;&#10;Paragraf içeriği..." />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSave} disabled={saving || !form.title}
                className="flex-1 bg-[#2563EB] hover:bg-[#1d4ed8] text-white">
                {saving ? "Kaydediliyor..." : editRow ? "Güncelle" : "Taslak Olarak Kaydet"}
              </Button>
              {editRow && (
                <Button onClick={() => { togglePublish(editRow); setOpen(false); }}
                  variant="outline" className="border-[#1e2d45] text-[#94a3b8] hover:text-white">
                  {editRow.is_published ? "Yayından Al" : "Yayınla"}
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
