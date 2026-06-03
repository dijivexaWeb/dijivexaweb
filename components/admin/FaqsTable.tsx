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

interface Faq { id: string; question: string; answer: string; category: string; locale: string; sort_order: number; is_published: boolean; }

const categories = ["general", "demo", "software", "whatsapp", "ai", "security", "pricing"];
const locales = ["tr", "en", "ka", "ru"];

export function FaqsTable() {
  const [rows, setRows] = useState<Faq[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ question: "", answer: "", category: "general", locale: "tr", sort_order: 0 });
  const [saving, setSaving] = useState(false);

  async function load() {
    const { data } = await createClient().from("site_faqs").select("*").order("sort_order");
    setRows(data ?? []);
  }

  async function handleSave() {
    setSaving(true);
    const { error } = await createClient().from("site_faqs").insert({ ...form, is_published: true });
    setSaving(false);
    if (error) { toast.error("Hata: " + error.message); return; }
    toast.success("SSS eklendi.");
    setOpen(false);
    setForm({ question: "", answer: "", category: "general", locale: "tr", sort_order: 0 });
    load();
  }

  async function handleDelete(row: Faq) {
    if (!confirm("Silinsin mi?")) return;
    await createClient().from("site_faqs").delete().eq("id", row.id);
    toast.success("SSS silindi.");
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <>
      <AdminTable
        title="SSS Listesi"
        addLabel="Yeni SSS"
        onAdd={() => setOpen(true)}
        columns={[
          { key: "question", label: "Soru", render: (r) => <span className="line-clamp-1">{r.question}</span> },
          { key: "category", label: "Kategori" },
          { key: "locale", label: "Dil" },
          { key: "sort_order", label: "Sıra" },
          { key: "is_published", label: "Durum", render: (r) => <StatusBadge value={r.is_published} /> },
        ]}
        rows={rows}
        onDelete={handleDelete}
        emptyText="Henüz SSS yok."
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0B172A] border-[#1e2d45] text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">Yeni SSS</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-[#94a3b8]">Dil</Label>
                <Select value={form.locale} onValueChange={(v) => setForm((f) => ({ ...f, locale: v }))}>
                  <SelectTrigger className="bg-[#07111F] border-[#1e2d45] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0B172A] border-[#1e2d45]">
                    {locales.map((l) => <SelectItem key={l} value={l} className="text-white">{l.toUpperCase()}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-[#94a3b8]">Kategori</Label>
                <Select value={form.category} onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}>
                  <SelectTrigger className="bg-[#07111F] border-[#1e2d45] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0B172A] border-[#1e2d45]">
                    {categories.map((c) => <SelectItem key={c} value={c} className="text-white">{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Soru</Label>
              <Input value={form.question} onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))} className="bg-[#07111F] border-[#1e2d45] text-white" />
            </div>
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Cevap</Label>
              <Textarea value={form.answer} onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))} rows={4} className="bg-[#07111F] border-[#1e2d45] text-white resize-none" />
            </div>
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Sıra</Label>
              <Input type="number" value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))} className="bg-[#07111F] border-[#1e2d45] text-white" />
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
