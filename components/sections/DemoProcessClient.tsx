"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface DemoContent {
  heading: string; subheading: string;
  steps: { num: string; text: string }[];
  badges: string[];
}

export function DemoProcessClient({ locale, content }: { locale: string; content: DemoContent }) {
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", business_name: "", business_type: "sac_ekimi" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await createClient().from("site_form_submissions").insert({ ...form, form_slug: "demo", terms_accepted: true });
    setLoading(false);
    setDone(true);
  }

  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(150deg, #0F2553 0%, #1A3A6B 55%, #112B60 100%)" }}>
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.25) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.25) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{content.heading}</h2>
            <p className="text-lg mb-8" style={{ color: "#94A3B8" }}>{content.subheading}</p>
            <div className="space-y-4">
              {content.steps.map((s) => (
                <div key={s.num} className="flex items-center gap-4">
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ background: "rgba(37,99,235,0.2)", color: "#60A5FA", border: "1px solid rgba(59,130,246,0.25)" }}>{s.num}</span>
                  <p className="text-white text-sm">{s.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              {content.badges.map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-sm" style={{ color: "#94A3B8" }}>
                  <CheckCircle2 className="w-4 h-4" style={{ color: "#34D399" }} />{t}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="rounded-2xl border p-8"
              style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)", borderColor: "rgba(59,130,246,0.2)" }}>
              {done ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 mx-auto mb-4" style={{ color: "#34D399" }} />
                  <p className="text-white text-xl font-bold mb-2">Başvurunuz alındı!</p>
                  <p style={{ color: "#94A3B8" }}>Demo bilgileriniz e-posta ile gönderilecek.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-white font-semibold text-lg mb-5">Ücretsiz Demo Başlat</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>Ad Soyad *</label>
                      <input required value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none focus:ring-2 transition-all"
                        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(148,163,184,0.15)" }} placeholder="Ad Soyad" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>Telefon *</label>
                      <input required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(148,163,184,0.15)" }} placeholder="0500 000 00 00" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>E-posta *</label>
                    <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(148,163,184,0.15)" }} placeholder="klinik@ornek.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>İşletme Adı *</label>
                    <input required value={form.business_name} onChange={e => setForm(f => ({ ...f, business_name: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(148,163,184,0.15)" }} placeholder="Kliniğinizin adı" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>İşletme Türü</label>
                    <select value={form.business_type} onChange={e => setForm(f => ({ ...f, business_type: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                      style={{ background: "rgba(15,37,83,0.98)", border: "1px solid rgba(148,163,184,0.15)" }}>
                      <option value="sac_ekimi">Saç Ekimi Merkezi</option>
                      <option value="estetik">Estetik Kliniği</option>
                      <option value="guzellik">Güzellik Merkezi</option>
                      <option value="lazer">Lazer Epilasyon</option>
                      <option value="trikoloji">Trikoloji Merkezi</option>
                      <option value="diger">Diğer</option>
                    </select>
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)", boxShadow: "0 8px 20px rgba(37,99,235,0.4)" }}>
                    {loading ? "Gönderiliyor..." : <><span>Demo Hesabımı Oluştur</span><ArrowRight className="w-4 h-4" /></>}
                  </button>
                  <p className="text-center text-xs" style={{ color: "#475569" }}>Kredi kartı gerekmez · 15 gün ücretsiz</p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
