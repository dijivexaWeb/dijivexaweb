"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, Save } from "lucide-react";

interface Stat { value: number; suffix: string; label: string; icon: string; }
interface TrustItem { icon: string; label: string; }
interface ProblemData { heading: string; subheading: string; cta: string; items: string[]; }

type Tab = "stats" | "trustbar" | "problems";

export function HomepageContentEditor() {
  const [tab, setTab] = useState<Tab>("stats");
  const [stats, setStats] = useState<Stat[]>([]);
  const [trustbar, setTrustbar] = useState<TrustItem[]>([]);
  const [problems, setProblems] = useState<ProblemData>({ heading: "", subheading: "", cta: "", items: [] });
  const [saving, setSaving] = useState(false);

  async function loadAll() {
    const db = createClient();
    const [s, t, p] = await Promise.all([
      db.from("site_settings").select("value").eq("key", "homepage_stats").single(),
      db.from("site_settings").select("value").eq("key", "homepage_trustbar").single(),
      db.from("site_settings").select("value").eq("key", "homepage_problems").single(),
    ]);
    if (s.data?.value) setStats(s.data.value as Stat[]);
    if (t.data?.value) setTrustbar(t.data.value as TrustItem[]);
    if (p.data?.value) setProblems(p.data.value as ProblemData);
  }

  async function saveStats() {
    setSaving(true);
    const { error } = await createClient().from("site_settings")
      .upsert({ key: "homepage_stats", value: stats }, { onConflict: "key" });
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("İstatistikler kaydedildi.");
  }

  async function saveTrustbar() {
    setSaving(true);
    const { error } = await createClient().from("site_settings")
      .upsert({ key: "homepage_trustbar", value: trustbar }, { onConflict: "key" });
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Hedef kitle kaydedildi.");
  }

  async function saveProblems() {
    setSaving(true);
    const { error } = await createClient().from("site_settings")
      .upsert({ key: "homepage_problems", value: problems }, { onConflict: "key" });
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Sorunlar bölümü kaydedildi.");
  }

  useEffect(() => { loadAll(); }, []);

  const tabs: { id: Tab; label: string }[] = [
    { id: "stats", label: "İstatistikler" },
    { id: "trustbar", label: "Hedef Kitle" },
    { id: "problems", label: "Sorunlar" },
  ];

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex gap-1 p-1 rounded-xl bg-[#0B172A] border border-[#1e2d45] w-fit">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.id ? "bg-[#2563EB] text-white" : "text-[#94a3b8] hover:text-white"
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      {tab === "stats" && (
        <div className="space-y-4">
          <p className="text-sm text-[#64748B]">Anasayfa istatistik sayaçları (Stats Section)</p>
          {stats.map((s, i) => (
            <div key={i} className="grid grid-cols-4 gap-3 p-4 rounded-xl border border-[#1e2d45] bg-[#0B172A]">
              <div className="space-y-1">
                <Label className="text-[#94a3b8] text-xs">İkon (emoji)</Label>
                <Input value={s.icon} onChange={e => setStats(prev => prev.map((x, j) => j === i ? { ...x, icon: e.target.value } : x))}
                  className="bg-[#07111F] border-[#1e2d45] text-white" />
              </div>
              <div className="space-y-1">
                <Label className="text-[#94a3b8] text-xs">Değer (sayı)</Label>
                <Input type="number" value={s.value} onChange={e => setStats(prev => prev.map((x, j) => j === i ? { ...x, value: Number(e.target.value) } : x))}
                  className="bg-[#07111F] border-[#1e2d45] text-white" />
              </div>
              <div className="space-y-1">
                <Label className="text-[#94a3b8] text-xs">Ek (+, %)</Label>
                <Input value={s.suffix} onChange={e => setStats(prev => prev.map((x, j) => j === i ? { ...x, suffix: e.target.value } : x))}
                  className="bg-[#07111F] border-[#1e2d45] text-white" />
              </div>
              <div className="space-y-1">
                <Label className="text-[#94a3b8] text-xs">Etiket</Label>
                <div className="flex gap-2">
                  <Input value={s.label} onChange={e => setStats(prev => prev.map((x, j) => j === i ? { ...x, label: e.target.value } : x))}
                    className="bg-[#07111F] border-[#1e2d45] text-white flex-1" />
                  <button onClick={() => setStats(prev => prev.filter((_, j) => j !== i))}
                    className="text-red-400 hover:text-red-300 px-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => setStats(prev => [...prev, { value: 0, suffix: "+", label: "", icon: "⭐" }])}
              className="border-[#1e2d45] text-[#94a3b8] hover:text-white gap-2">
              <Plus className="w-4 h-4" /> Satır Ekle
            </Button>
            <Button onClick={saveStats} disabled={saving} className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white gap-2">
              <Save className="w-4 h-4" /> {saving ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </div>
        </div>
      )}

      {/* Trustbar */}
      {tab === "trustbar" && (
        <div className="space-y-4">
          <p className="text-sm text-[#64748B]">Hero altındaki hedef kitle çubukları (TrustBar Section)</p>
          {trustbar.map((t, i) => (
            <div key={i} className="flex gap-3 p-4 rounded-xl border border-[#1e2d45] bg-[#0B172A] items-end">
              <div className="space-y-1 w-24">
                <Label className="text-[#94a3b8] text-xs">İkon (emoji)</Label>
                <Input value={t.icon} onChange={e => setTrustbar(prev => prev.map((x, j) => j === i ? { ...x, icon: e.target.value } : x))}
                  className="bg-[#07111F] border-[#1e2d45] text-white text-center" />
              </div>
              <div className="space-y-1 flex-1">
                <Label className="text-[#94a3b8] text-xs">Etiket</Label>
                <Input value={t.label} onChange={e => setTrustbar(prev => prev.map((x, j) => j === i ? { ...x, label: e.target.value } : x))}
                  className="bg-[#07111F] border-[#1e2d45] text-white" />
              </div>
              <button onClick={() => setTrustbar(prev => prev.filter((_, j) => j !== i))}
                className="text-red-400 hover:text-red-300 pb-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => setTrustbar(prev => [...prev, { icon: "⭐", label: "" }])}
              className="border-[#1e2d45] text-[#94a3b8] hover:text-white gap-2">
              <Plus className="w-4 h-4" /> Satır Ekle
            </Button>
            <Button onClick={saveTrustbar} disabled={saving} className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white gap-2">
              <Save className="w-4 h-4" /> {saving ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </div>
        </div>
      )}

      {/* Problems */}
      {tab === "problems" && (
        <div className="space-y-5">
          <p className="text-sm text-[#64748B]">Problem bölümü başlık ve madde listesi</p>
          <div className="space-y-4 p-4 rounded-xl border border-[#1e2d45] bg-[#0B172A]">
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Başlık</Label>
              <Input value={problems.heading} onChange={e => setProblems(p => ({ ...p, heading: e.target.value }))}
                className="bg-[#07111F] border-[#1e2d45] text-white" />
            </div>
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Alt Başlık</Label>
              <Textarea value={problems.subheading} onChange={e => setProblems(p => ({ ...p, subheading: e.target.value }))}
                rows={2} className="bg-[#07111F] border-[#1e2d45] text-white resize-none" />
            </div>
            <div className="space-y-1">
              <Label className="text-[#94a3b8]">Alt Banner Metni</Label>
              <Input value={problems.cta} onChange={e => setProblems(p => ({ ...p, cta: e.target.value }))}
                className="bg-[#07111F] border-[#1e2d45] text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[#94a3b8]">Problem Maddeleri</Label>
            {problems.items.map((item, i) => (
              <div key={i} className="flex gap-2">
                <Input value={item} onChange={e => setProblems(p => ({ ...p, items: p.items.map((x, j) => j === i ? e.target.value : x) }))}
                  className="bg-[#07111F] border-[#1e2d45] text-white flex-1" />
                <button onClick={() => setProblems(p => ({ ...p, items: p.items.filter((_, j) => j !== i) }))}
                  className="text-red-400 hover:text-red-300 px-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setProblems(p => ({ ...p, items: [...p.items, ""] }))}
              className="border-[#1e2d45] text-[#94a3b8] hover:text-white gap-2">
              <Plus className="w-4 h-4" /> Madde Ekle
            </Button>
          </div>
          <Button onClick={saveProblems} disabled={saving} className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white gap-2">
            <Save className="w-4 h-4" /> {saving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      )}
    </div>
  );
}
