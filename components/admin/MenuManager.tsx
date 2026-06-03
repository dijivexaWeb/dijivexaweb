"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AdminTable } from "./AdminTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface MenuItem { id: string; label: string; href: string; locale: string; sort_order: number; is_active: boolean; menu_id: string; }
interface Menu { id: string; slug: string; name: string; }

const locales = ["tr", "en", "ka", "ru"];

export function MenuManager() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeMenu, setActiveMenu] = useState("header");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ label: "", href: "", locale: "tr", sort_order: 0 });
  const [saving, setSaving] = useState(false);

  async function load() {
    const sb = createClient();
    const [m, i] = await Promise.all([
      sb.from("site_menus").select("*").order("id"),
      sb.from("site_menu_items").select("*").order("sort_order"),
    ]);
    setMenus(m.data ?? []);
    setItems(i.data ?? []);
  }

  async function handleSave() {
    setSaving(true);
    const menu = menus.find((m) => m.slug === activeMenu);
    if (!menu) return;
    const { error } = await createClient().from("site_menu_items").insert({ ...form, menu_id: menu.id, is_active: true });
    setSaving(false);
    if (error) { toast.error("Hata: " + error.message); return; }
    toast.success("Menü öğesi eklendi.");
    setOpen(false);
    setForm({ label: "", href: "", locale: "tr", sort_order: 0 });
    load();
  }

  async function handleDelete(row: MenuItem) {
    await createClient().from("site_menu_items").delete().eq("id", row.id);
    toast.success("Silindi.");
    load();
  }

  useEffect(() => { load(); }, []);

  const currentMenu = menus.find((m) => m.slug === activeMenu);
  const filteredItems = items.filter((i) => i.menu_id === currentMenu?.id);

  return (
    <>
      <Tabs value={activeMenu} onValueChange={setActiveMenu}>
        <TabsList className="bg-[#0B172A] border border-[#1e2d45]">
          {menus.map((m) => (
            <TabsTrigger key={m.slug} value={m.slug} className="text-[#94a3b8] data-[state=active]:text-white data-[state=active]:bg-[#2563EB]">
              {m.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {menus.map((m) => (
          <TabsContent key={m.slug} value={m.slug} className="mt-4">
            <AdminTable
              title={m.name}
              addLabel="Öğe Ekle"
              onAdd={() => setOpen(true)}
              columns={[
                { key: "label", label: "Etiket" },
                { key: "href", label: "Link" },
                { key: "locale", label: "Dil" },
                { key: "sort_order", label: "Sıra" },
              ]}
              rows={filteredItems}
              onDelete={handleDelete}
              emptyText="Bu menüde öğe yok."
            />
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0B172A] border-[#1e2d45] text-white max-w-md">
          <DialogHeader><DialogTitle className="text-white">Menü Öğesi Ekle</DialogTitle></DialogHeader>
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
              <Label className="text-[#94a3b8]">Etiket</Label>
              <Input value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} className="bg-[#07111F] border-[#1e2d45] text-white" />
            </div>
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Link</Label>
              <Input value={form.href} onChange={(e) => setForm((f) => ({ ...f, href: e.target.value }))} className="bg-[#07111F] border-[#1e2d45] text-white" placeholder="/tr/ozellikler" />
            </div>
            <Button onClick={handleSave} disabled={saving} className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white">
              {saving ? "Ekleniyor..." : "Ekle"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
