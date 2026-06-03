"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Smartphone, Bell, Calendar, Star, Shield, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import { use } from "react";

const features = [
  {
    icon: Calendar,
    title: "Online Randevu",
    desc: "Hastalar uygulamadan kolayca randevu alır, değiştirir veya iptal eder.",
    color: "#2563EB",
  },
  {
    icon: Bell,
    title: "Push Bildirimleri",
    desc: "Randevu hatırlatmaları ve kampanyalar anlık bildirim ile ulaşır.",
    color: "#F59E0B",
  },
  {
    icon: Star,
    title: "Tedavi Takibi",
    desc: "Hasta kendi tedavi sürecini, seans geçmişini ve notlarını görür.",
    color: "#0D9488",
  },
  {
    icon: Shield,
    title: "Güvenli Profil",
    desc: "Şifreli hasta profili, medikal geçmiş ve belge yönetimi.",
    color: "#8B5CF6",
  },
  {
    icon: Globe,
    title: "Çok Dilli",
    desc: "Türkçe, İngilizce, Gürcüce ve Rusça dil desteği.",
    color: "#EF4444",
  },
  {
    icon: Smartphone,
    title: "iOS & Android",
    desc: "Klinik markası ile yayınlanan native mobil uygulama.",
    color: "#EC4899",
  },
];

export default function DijiVexaMobilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const featuresRef = useScrollReveal();
  const stepsRef = useScrollReveal();

  return (
    <>
      <PageHero
        dark
        badge="Dijivexa Mobile"
        title="Kliniğinizin kendi"
        titleHighlight="hasta uygulaması."
        subtitle="iOS ve Android'de klinik markanızla yayınlanan hasta uygulaması. Online randevu, push bildirimler, tedavi takibi."
        ctaPrimary={{ label: "Teklif İste", href: `/${locale}/iletisim` }}
        ctaSecondary={{ label: "Demo Talep Et", href: `/${locale}/demo` }}
      >
        {/* Phone mockup */}
        <div className="flex justify-center">
          <div className="w-64 rounded-[2.5rem] overflow-hidden border-[3px] border-white/20"
            style={{ boxShadow: "0 32px 64px rgba(0,0,0,0.4)" }}>
            <div className="px-4 py-3" style={{ background: "linear-gradient(135deg, #0F2553, #1A3A6B)" }}>
              <div className="flex items-center justify-between mb-4 mt-1">
                <div>
                  <p className="text-white text-sm font-bold">Klinik App</p>
                  <p className="text-xs" style={{ color: "#64748B" }}>Hoş geldiniz, Ayşe</p>
                </div>
                <div className="w-8 h-8 rounded-full" style={{ background: "rgba(59,130,246,0.3)" }} />
              </div>
              <div className="bg-white/5 rounded-xl p-3 mb-3">
                <p className="text-xs font-semibold text-white mb-1">Sonraki Randevunuz</p>
                <p className="text-xs" style={{ color: "#94A3B8" }}>Yarın, 14:00 — Kontrol</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Randevu", color: "#2563EB" },
                  { label: "Belgeler", color: "#0D9488" },
                  { label: "Mesaj", color: "#16A34A" },
                ].map((b) => (
                  <div key={b.label} className="rounded-xl p-2 text-center"
                    style={{ background: `${b.color}20` }}>
                    <p className="text-xs font-medium" style={{ color: b.color }}>{b.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageHero>

      {/* Features */}
      <section ref={featuresRef} className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="gsap-reveal text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
              Uygulama özellikleri
            </h2>
          </div>
          <div className="gsap-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="gsap-item bg-white rounded-2xl border p-6 hover:shadow-md transition-all"
                style={{ borderColor: "#F1F5F9" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${f.color}12` }}>
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <h3 className="font-semibold text-sm mb-2" style={{ color: "#0F172A" }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process dark */}
      <section ref={stepsRef} className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #0F2553 0%, #1A3A6B 55%, #112B60 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Geliştirme süreci</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Keşif & Tasarım", desc: "Klinik markanıza uygun UI/UX tasarımı." },
              { step: "02", title: "Geliştirme", desc: "React Native ile iOS & Android geliştirme." },
              { step: "03", title: "Test", desc: "Cihaz testleri, hata ayıklama, performans." },
              { step: "04", title: "App Store", desc: "App Store ve Google Play yayını." },
            ].map((p) => (
              <motion.div key={p.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: parseInt(p.step) * 0.1 }}
                className="rounded-2xl border p-5"
                style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(59,130,246,0.15)" }}>
                <span className="text-3xl font-black block mb-3" style={{ color: "rgba(59,130,246,0.3)" }}>{p.step}</span>
                <h3 className="font-semibold text-sm text-white mb-1">{p.title}</h3>
                <p className="text-xs" style={{ color: "#64748B" }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href={`/${locale}/iletisim`}
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white rounded-xl transition-all hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)", boxShadow: "0 12px 32px rgba(37,99,235,0.4)" }}>
              Projeyi Başlatalım <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <FinalCTASection locale={locale} />
    </>
  );
}
