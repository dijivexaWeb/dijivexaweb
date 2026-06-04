"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, Save } from "lucide-react";

type Tab = "hero" | "stats" | "trustbar" | "problems" | "ai" | "whatsapp" | "security" | "demo" | "finalcta";

const TABS: { id: Tab; label: string }[] = [
  { id: "hero", label: "Hero" },
  { id: "stats", label: "İstatistikler" },
  { id: "trustbar", label: "Hedef Kitle" },
  { id: "problems", label: "Sorunlar" },
  { id: "ai", label: "AI" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "security", label: "Güvenlik" },
  { id: "demo", label: "Demo" },
  { id: "finalcta", label: "Final CTA" },
];

// ---------- types ----------
interface Stat { value: number; suffix: string; label: string; icon: string; }
interface TrustItem { icon: string; label: string; }
interface ProblemData { heading: string; subheading: string; cta: string; items: string[]; }
interface HeroData { badge: string; heading_line1: string; heading_highlight: string; heading_line2: string; subheading: string; cta_primary: string; cta_primary_href: string; cta_secondary: string; cta_secondary_href: string; trust_items: string[]; }
interface AIData { badge: string; heading: string; subheading: string; features: string[]; disclaimer: string; cta_text: string; cta_href: string; }
interface WAData { badge: string; heading: string; subheading: string; features: string[]; cta_text: string; cta_href: string; }
interface SecItem { icon: string; label: string; desc: string; color: string; }
interface SecData { badge: string; heading: string; subheading: string; items: SecItem[]; }
interface DemoData { heading: string; subheading: string; steps: { num: string; text: string }[]; badges: string[]; }
interface CTAData { heading: string; subheading: string; cta_primary: string; cta_primary_href: string; cta_secondary: string; cta_secondary_href: string; footnote: string; }

async function loadKey(key: string) {
  const { data } = await createClient().from("site_settings").select("value").eq("key", key).single();
  return data?.value ?? null;
}

async function saveKey(key: string, value: unknown, label: string) {
  const { error } = await createClient().from("site_settings").upsert({ key, value }, { onConflict: "key" });
  if (error) toast.error(error.message);
  else toast.success(`${label} kaydedildi.`);
}

// ---------- small helpers ----------
function ArrayEditor({ label, items, onChange }: { label: string; items: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="space-y-2">
      <Label className="text-[#94a3b8]">{label}</Label>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <Input value={item} onChange={e => onChange(items.map((x, j) => j === i ? e.target.value : x))}
            className="bg-[#07111F] border-[#1e2d45] text-white flex-1" />
          <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-300 px-2"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => onChange([...items, ""])}
        className="border-[#1e2d45] text-[#94a3b8] hover:text-white gap-1"><Plus className="w-3 h-3" /> Ekle</Button>
    </div>
  );
}

function Field({ label, value, onChange, rows }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div className="space-y-1">
      <Label className="text-[#94a3b8]">{label}</Label>
      {rows
        ? <Textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} className="bg-[#07111F] border-[#1e2d45] text-white resize-none" />
        : <Input value={value} onChange={e => onChange(e.target.value)} className="bg-[#07111F] border-[#1e2d45] text-white" />}
    </div>
  );
}

function SaveBtn({ onClick, saving }: { onClick: () => void; saving: boolean }) {
  return (
    <Button onClick={onClick} disabled={saving} className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white gap-2">
      <Save className="w-4 h-4" />{saving ? "Kaydediliyor..." : "Kaydet"}
    </Button>
  );
}

export function HomepageContentEditor() {
  const [tab, setTab] = useState<Tab>("hero");
  const [saving, setSaving] = useState(false);

  const [hero, setHero] = useState<HeroData>({ badge: "", heading_line1: "", heading_highlight: "", heading_line2: "", subheading: "", cta_primary: "", cta_primary_href: "", cta_secondary: "", cta_secondary_href: "", trust_items: [] });
  const [stats, setStats] = useState<Stat[]>([]);
  const [trustbar, setTrustbar] = useState<TrustItem[]>([]);
  const [problems, setProblems] = useState<ProblemData>({ heading: "", subheading: "", cta: "", items: [] });
  const [ai, setAI] = useState<AIData>({ badge: "", heading: "", subheading: "", features: [], disclaimer: "", cta_text: "", cta_href: "" });
  const [wa, setWA] = useState<WAData>({ badge: "", heading: "", subheading: "", features: [], cta_text: "", cta_href: "" });
  const [sec, setSec] = useState<SecData>({ badge: "", heading: "", subheading: "", items: [] });
  const [demo, setDemo] = useState<DemoData>({ heading: "", subheading: "", steps: [], badges: [] });
  const [cta, setCTA] = useState<CTAData>({ heading: "", subheading: "", cta_primary: "", cta_primary_href: "", cta_secondary: "", cta_secondary_href: "", footnote: "" });

  useEffect(() => {
    Promise.all([
      loadKey("section_hero"), loadKey("homepage_stats"), loadKey("homepage_trustbar"),
      loadKey("homepage_problems"), loadKey("section_ai"), loadKey("section_whatsapp"),
      loadKey("section_security"), loadKey("section_demo"), loadKey("section_finalcta"),
    ]).then(([h, s, t, p, a, w, se, d, c]) => {
      if (h) setHero(h as HeroData);
      if (s) setStats(s as Stat[]);
      if (t) setTrustbar(t as TrustItem[]);
      if (p) setProblems(p as ProblemData);
      if (a) setAI(a as AIData);
      if (w) setWA(w as WAData);
      if (se) setSec(se as SecData);
      if (d) setDemo(d as DemoData);
      if (c) setCTA(c as CTAData);
    });
  }, []);

  async function save(key: string, value: unknown, label: string) {
    setSaving(true);
    await saveKey(key, value, label);
    setSaving(false);
  }

  return (
    <div className="space-y-6">
      {/* Tab bar — scrollable */}
      <div className="flex gap-1 p-1 rounded-xl bg-[#0B172A] border border-[#1e2d45] overflow-x-auto">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${tab === t.id ? "bg-[#2563EB] text-white" : "text-[#94a3b8] hover:text-white"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ---- HERO ---- */}
      {tab === "hero" && (
        <div className="space-y-4 p-4 rounded-xl border border-[#1e2d45] bg-[#0B172A]">
          <Field label="Badge metni" value={hero.badge} onChange={v => setHero(h => ({ ...h, badge: v }))} />
          <div className="grid grid-cols-3 gap-3">
            <Field label="Başlık - Satır 1" value={hero.heading_line1} onChange={v => setHero(h => ({ ...h, heading_line1: v }))} />
            <Field label="Başlık - Vurgulu kısım" value={hero.heading_highlight} onChange={v => setHero(h => ({ ...h, heading_highlight: v }))} />
            <Field label="Başlık - Satır 2" value={hero.heading_line2} onChange={v => setHero(h => ({ ...h, heading_line2: v }))} />
          </div>
          <Field label="Alt başlık" value={hero.subheading} onChange={v => setHero(h => ({ ...h, subheading: v }))} rows={2} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Birincil CTA Metni" value={hero.cta_primary} onChange={v => setHero(h => ({ ...h, cta_primary: v }))} />
            <Field label="Birincil CTA Linki" value={hero.cta_primary_href} onChange={v => setHero(h => ({ ...h, cta_primary_href: v }))} />
            <Field label="İkincil CTA Metni" value={hero.cta_secondary} onChange={v => setHero(h => ({ ...h, cta_secondary: v }))} />
            <Field label="İkincil CTA Linki" value={hero.cta_secondary_href} onChange={v => setHero(h => ({ ...h, cta_secondary_href: v }))} />
          </div>
          <ArrayEditor label="Güven maddeleri (Kredi kartı gerekmez, vb.)" items={hero.trust_items} onChange={v => setHero(h => ({ ...h, trust_items: v }))} />
          <SaveBtn onClick={() => save("section_hero", hero, "Hero")} saving={saving} />
        </div>
      )}

      {/* ---- STATS ---- */}
      {tab === "stats" && (
        <div className="space-y-4">
          {stats.map((s, i) => (
            <div key={i} className="grid grid-cols-4 gap-3 p-4 rounded-xl border border-[#1e2d45] bg-[#0B172A]">
              <div className="space-y-1"><Label className="text-[#94a3b8] text-xs">İkon</Label>
                <Input value={s.icon} onChange={e => setStats(p => p.map((x, j) => j === i ? { ...x, icon: e.target.value } : x))} className="bg-[#07111F] border-[#1e2d45] text-white" /></div>
              <div className="space-y-1"><Label className="text-[#94a3b8] text-xs">Değer</Label>
                <Input type="number" value={s.value} onChange={e => setStats(p => p.map((x, j) => j === i ? { ...x, value: Number(e.target.value) } : x))} className="bg-[#07111F] border-[#1e2d45] text-white" /></div>
              <div className="space-y-1"><Label className="text-[#94a3b8] text-xs">Ek (+/%)</Label>
                <Input value={s.suffix} onChange={e => setStats(p => p.map((x, j) => j === i ? { ...x, suffix: e.target.value } : x))} className="bg-[#07111F] border-[#1e2d45] text-white" /></div>
              <div className="space-y-1"><Label className="text-[#94a3b8] text-xs">Etiket</Label>
                <div className="flex gap-2">
                  <Input value={s.label} onChange={e => setStats(p => p.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} className="bg-[#07111F] border-[#1e2d45] text-white flex-1" />
                  <button onClick={() => setStats(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-300 px-2"><Trash2 className="w-4 h-4" /></button>
                </div></div>
            </div>
          ))}
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => setStats(p => [...p, { value: 0, suffix: "+", label: "", icon: "⭐" }])} className="border-[#1e2d45] text-[#94a3b8] hover:text-white gap-1"><Plus className="w-3 h-3" /> Ekle</Button>
            <SaveBtn onClick={() => save("homepage_stats", stats, "İstatistikler")} saving={saving} />
          </div>
        </div>
      )}

      {/* ---- TRUSTBAR ---- */}
      {tab === "trustbar" && (
        <div className="space-y-4">
          {trustbar.map((t, i) => (
            <div key={i} className="flex gap-3 p-4 rounded-xl border border-[#1e2d45] bg-[#0B172A] items-end">
              <div className="space-y-1 w-24"><Label className="text-[#94a3b8] text-xs">İkon</Label>
                <Input value={t.icon} onChange={e => setTrustbar(p => p.map((x, j) => j === i ? { ...x, icon: e.target.value } : x))} className="bg-[#07111F] border-[#1e2d45] text-white text-center" /></div>
              <div className="space-y-1 flex-1"><Label className="text-[#94a3b8] text-xs">Etiket</Label>
                <Input value={t.label} onChange={e => setTrustbar(p => p.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} className="bg-[#07111F] border-[#1e2d45] text-white" /></div>
              <button onClick={() => setTrustbar(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-300 pb-2"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => setTrustbar(p => [...p, { icon: "⭐", label: "" }])} className="border-[#1e2d45] text-[#94a3b8] hover:text-white gap-1"><Plus className="w-3 h-3" /> Ekle</Button>
            <SaveBtn onClick={() => save("homepage_trustbar", trustbar, "Hedef Kitle")} saving={saving} />
          </div>
        </div>
      )}

      {/* ---- PROBLEMS ---- */}
      {tab === "problems" && (
        <div className="space-y-5">
          <div className="space-y-4 p-4 rounded-xl border border-[#1e2d45] bg-[#0B172A]">
            <Field label="Başlık" value={problems.heading} onChange={v => setProblems(p => ({ ...p, heading: v }))} />
            <Field label="Alt Başlık" value={problems.subheading} onChange={v => setProblems(p => ({ ...p, subheading: v }))} rows={2} />
            <Field label="Alt Banner Metni" value={problems.cta} onChange={v => setProblems(p => ({ ...p, cta: v }))} />
          </div>
          <ArrayEditor label="Problem Maddeleri" items={problems.items} onChange={v => setProblems(p => ({ ...p, items: v }))} />
          <SaveBtn onClick={() => save("homepage_problems", problems, "Sorunlar")} saving={saving} />
        </div>
      )}

      {/* ---- AI ---- */}
      {tab === "ai" && (
        <div className="space-y-4 p-4 rounded-xl border border-[#1e2d45] bg-[#0B172A]">
          <Field label="Badge" value={ai.badge} onChange={v => setAI(a => ({ ...a, badge: v }))} />
          <Field label="Başlık" value={ai.heading} onChange={v => setAI(a => ({ ...a, heading: v }))} />
          <Field label="Alt başlık" value={ai.subheading} onChange={v => setAI(a => ({ ...a, subheading: v }))} rows={2} />
          <ArrayEditor label="Özellik listesi" items={ai.features} onChange={v => setAI(a => ({ ...a, features: v }))} />
          <Field label="Uyarı metni" value={ai.disclaimer} onChange={v => setAI(a => ({ ...a, disclaimer: v }))} rows={2} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="CTA Metni" value={ai.cta_text} onChange={v => setAI(a => ({ ...a, cta_text: v }))} />
            <Field label="CTA Linki" value={ai.cta_href} onChange={v => setAI(a => ({ ...a, cta_href: v }))} />
          </div>
          <SaveBtn onClick={() => save("section_ai", ai, "AI")} saving={saving} />
        </div>
      )}

      {/* ---- WHATSAPP ---- */}
      {tab === "whatsapp" && (
        <div className="space-y-4 p-4 rounded-xl border border-[#1e2d45] bg-[#0B172A]">
          <Field label="Badge" value={wa.badge} onChange={v => setWA(w => ({ ...w, badge: v }))} />
          <Field label="Başlık" value={wa.heading} onChange={v => setWA(w => ({ ...w, heading: v }))} />
          <Field label="Alt başlık" value={wa.subheading} onChange={v => setWA(w => ({ ...w, subheading: v }))} rows={2} />
          <ArrayEditor label="Özellik listesi" items={wa.features} onChange={v => setWA(w => ({ ...w, features: v }))} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="CTA Metni" value={wa.cta_text} onChange={v => setWA(w => ({ ...w, cta_text: v }))} />
            <Field label="CTA Linki" value={wa.cta_href} onChange={v => setWA(w => ({ ...w, cta_href: v }))} />
          </div>
          <SaveBtn onClick={() => save("section_whatsapp", wa, "WhatsApp")} saving={saving} />
        </div>
      )}

      {/* ---- SECURITY ---- */}
      {tab === "security" && (
        <div className="space-y-4">
          <div className="space-y-4 p-4 rounded-xl border border-[#1e2d45] bg-[#0B172A]">
            <Field label="Badge" value={sec.badge} onChange={v => setSec(s => ({ ...s, badge: v }))} />
            <Field label="Başlık" value={sec.heading} onChange={v => setSec(s => ({ ...s, heading: v }))} />
            <Field label="Alt başlık" value={sec.subheading} onChange={v => setSec(s => ({ ...s, subheading: v }))} rows={2} />
          </div>
          <Label className="text-[#94a3b8]">Güvenlik kartları</Label>
          {sec.items.map((item, i) => (
            <div key={i} className="grid grid-cols-4 gap-3 p-4 rounded-xl border border-[#1e2d45] bg-[#0B172A]">
              <div className="space-y-1"><Label className="text-[#94a3b8] text-xs">İkon (Shield/Lock/Eye…)</Label>
                <Input value={item.icon} onChange={e => setSec(s => ({ ...s, items: s.items.map((x, j) => j === i ? { ...x, icon: e.target.value } : x) }))} className="bg-[#07111F] border-[#1e2d45] text-white" /></div>
              <div className="space-y-1"><Label className="text-[#94a3b8] text-xs">Başlık</Label>
                <Input value={item.label} onChange={e => setSec(s => ({ ...s, items: s.items.map((x, j) => j === i ? { ...x, label: e.target.value } : x) }))} className="bg-[#07111F] border-[#1e2d45] text-white" /></div>
              <div className="space-y-1"><Label className="text-[#94a3b8] text-xs">Renk (hex)</Label>
                <Input value={item.color} onChange={e => setSec(s => ({ ...s, items: s.items.map((x, j) => j === i ? { ...x, color: e.target.value } : x) }))} className="bg-[#07111F] border-[#1e2d45] text-white" /></div>
              <div className="space-y-1"><Label className="text-[#94a3b8] text-xs">Açıklama</Label>
                <div className="flex gap-2">
                  <Input value={item.desc} onChange={e => setSec(s => ({ ...s, items: s.items.map((x, j) => j === i ? { ...x, desc: e.target.value } : x) }))} className="bg-[#07111F] border-[#1e2d45] text-white flex-1" />
                  <button onClick={() => setSec(s => ({ ...s, items: s.items.filter((_, j) => j !== i) }))} className="text-red-400 hover:text-red-300 px-2"><Trash2 className="w-4 h-4" /></button>
                </div></div>
            </div>
          ))}
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => setSec(s => ({ ...s, items: [...s.items, { icon: "Shield", label: "", desc: "", color: "#3B82F6" }] }))} className="border-[#1e2d45] text-[#94a3b8] hover:text-white gap-1"><Plus className="w-3 h-3" /> Kart Ekle</Button>
            <SaveBtn onClick={() => save("section_security", sec, "Güvenlik")} saving={saving} />
          </div>
        </div>
      )}

      {/* ---- DEMO ---- */}
      {tab === "demo" && (
        <div className="space-y-4">
          <div className="space-y-4 p-4 rounded-xl border border-[#1e2d45] bg-[#0B172A]">
            <Field label="Başlık" value={demo.heading} onChange={v => setDemo(d => ({ ...d, heading: v }))} />
            <Field label="Alt başlık" value={demo.subheading} onChange={v => setDemo(d => ({ ...d, subheading: v }))} rows={2} />
          </div>
          <Label className="text-[#94a3b8]">Adımlar</Label>
          {demo.steps.map((step, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-xl border border-[#1e2d45] bg-[#0B172A] items-end">
              <div className="w-20 space-y-1"><Label className="text-[#94a3b8] text-xs">No</Label>
                <Input value={step.num} onChange={e => setDemo(d => ({ ...d, steps: d.steps.map((x, j) => j === i ? { ...x, num: e.target.value } : x) }))} className="bg-[#07111F] border-[#1e2d45] text-white" /></div>
              <div className="flex-1 space-y-1"><Label className="text-[#94a3b8] text-xs">Metin</Label>
                <Input value={step.text} onChange={e => setDemo(d => ({ ...d, steps: d.steps.map((x, j) => j === i ? { ...x, text: e.target.value } : x) }))} className="bg-[#07111F] border-[#1e2d45] text-white" /></div>
              <button onClick={() => setDemo(d => ({ ...d, steps: d.steps.filter((_, j) => j !== i) }))} className="text-red-400 hover:text-red-300 pb-2"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setDemo(d => ({ ...d, steps: [...d.steps, { num: "0" + (d.steps.length + 1), text: "" }] }))} className="border-[#1e2d45] text-[#94a3b8] hover:text-white gap-1"><Plus className="w-3 h-3" /> Adım Ekle</Button>
          <ArrayEditor label="Güven badge'leri" items={demo.badges} onChange={v => setDemo(d => ({ ...d, badges: v }))} />
          <SaveBtn onClick={() => save("section_demo", demo, "Demo")} saving={saving} />
        </div>
      )}

      {/* ---- FINAL CTA ---- */}
      {tab === "finalcta" && (
        <div className="space-y-4 p-4 rounded-xl border border-[#1e2d45] bg-[#0B172A]">
          <Field label="Başlık" value={cta.heading} onChange={v => setCTA(c => ({ ...c, heading: v }))} />
          <Field label="Alt başlık" value={cta.subheading} onChange={v => setCTA(c => ({ ...c, subheading: v }))} rows={2} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Birincil CTA Metni" value={cta.cta_primary} onChange={v => setCTA(c => ({ ...c, cta_primary: v }))} />
            <Field label="Birincil CTA Linki" value={cta.cta_primary_href} onChange={v => setCTA(c => ({ ...c, cta_primary_href: v }))} />
            <Field label="İkincil CTA Metni" value={cta.cta_secondary} onChange={v => setCTA(c => ({ ...c, cta_secondary: v }))} />
            <Field label="İkincil CTA Linki" value={cta.cta_secondary_href} onChange={v => setCTA(c => ({ ...c, cta_secondary_href: v }))} />
          </div>
          <Field label="Alt not (footnote)" value={cta.footnote} onChange={v => setCTA(c => ({ ...c, footnote: v }))} />
          <SaveBtn onClick={() => save("section_finalcta", cta, "Final CTA")} saving={saving} />
        </div>
      )}
    </div>
  );
}
