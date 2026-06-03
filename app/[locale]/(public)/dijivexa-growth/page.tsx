"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { PageHero } from "@/components/sections/PageHero";
import { BarChart3, Megaphone, Star, Camera, TrendingUp, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { use } from "react";

const services = [
  {
    icon: Megaphone,
    title: "Sosyal Medya Yönetimi",
    desc: "Instagram, Facebook, TikTok içerik takvimi, gönderi tasarımı ve yönetimi.",
    color: "#EC4899",
  },
  {
    icon: BarChart3,
    title: "Reklam Optimizasyonu",
    desc: "Meta Ads ve Google Ads kampanyaları. Hedef kitleye özel reklam stratejisi.",
    color: "#2563EB",
  },
  {
    icon: Camera,
    title: "İçerik Üretimi",
    desc: "Klinik fotoğraf & video çekimi, before/after içerikleri, story tasarımları.",
    color: "#F59E0B",
  },
  {
    icon: Star,
    title: "Yorum & İtibar Yönetimi",
    desc: "Google ve platform yorumlarının takibi, yanıtlanması, itibar stratejisi.",
    color: "#0D9488",
  },
  {
    icon: TrendingUp,
    title: "SEO & Yerel Sıralama",
    desc: "Google My Business optimizasyonu, yerel SEO, arama sıralaması iyileştirme.",
    color: "#8B5CF6",
  },
  {
    icon: Users,
    title: "Lead Generation",
    desc: "Kliniğe uygun yeni hasta kazanımı için hedefli dijital kampanyalar.",
    color: "#EF4444",
  },
];

const results = [
  { metric: "%45", label: "Ortalama yeni hasta artışı" },
  { metric: "3x", label: "Reklam dönüşüm oranı" },
  { metric: "%80", label: "Google yorum artışı" },
  { metric: "6 ay", label: "Ortalama anlaşma süresi" },
];

export default function DijiVexaGrowthPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const servicesRef = useScrollReveal();
  const resultsRef = useScrollReveal();

  return (
    <>
      <PageHero
        dark
        badge="Dijivexa Growth"
        title="Kliniğinizi dijitalde"
        titleHighlight="büyütün."
        subtitle="Sosyal medya yönetimi, reklam optimizasyonu ve içerik üretimi ile yeni hasta kazanımını hızlandırın."
        ctaPrimary={{ label: "Teklif İste", href: `/${locale}/iletisim` }}
        ctaSecondary={{ label: "Hizmetleri İncele", href: `#hizmetler` }}
      >
        {/* Visual */}
        <div className="rounded-2xl p-6 border"
          style={{ background: "rgba(20,50,100,0.55)", backdropFilter: "blur(20px)", borderColor: "rgba(59,130,246,0.25)" }}>
          <p className="text-xs font-semibold mb-4" style={{ color: "#64748B" }}>Aylık Büyüme Raporu</p>
          {[
            { label: "Yeni hasta", val: "+23", pct: 45, color: "#EC4899" },
            { label: "Profil görüntüleme", val: "+1.2K", pct: 68, color: "#2563EB" },
            { label: "Reklam dönüşümü", val: "%4.2", pct: 82, color: "#10B981" },
            { label: "Google yorumu", val: "+18", pct: 55, color: "#F59E0B" },
          ].map((r) => (
            <div key={r.label} className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: "#94A3B8" }}>{r.label}</span>
                <span style={{ color: r.color }}>{r.val}</span>
              </div>
              <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="h-1.5 rounded-full" style={{ width: `${r.pct}%`, background: r.color }} />
              </div>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Results */}
      <section ref={resultsRef} className="py-16 bg-white border-b" style={{ borderColor: "#F1F5F9" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="gsap-stagger grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {results.map((r) => (
              <div key={r.label} className="gsap-item">
                <p className="text-3xl font-bold mb-1" style={{ color: "#2563EB" }}>{r.metric}</p>
                <p className="text-xs" style={{ color: "#64748B" }}>{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="hizmetler" ref={servicesRef} className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="gsap-reveal text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
              Growth hizmetleri
            </h2>
          </div>
          <div className="gsap-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <div key={s.title} className="gsap-item bg-white rounded-2xl border p-6 hover:shadow-md transition-all"
                style={{ borderColor: "#F1F5F9" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${s.color}12` }}>
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <h3 className="font-semibold text-sm mb-2" style={{ color: "#0F172A" }}>{s.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA dark */}
      <section className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #0F2553 0%, #1A3A6B 55%, #112B60 100%)" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">Kliniğiniz için Growth paketi hazırlayalım.</h2>
            <p className="mb-8" style={{ color: "#94A3B8" }}>İhtiyaçlarınızı dinleyelim, size özel teklif oluşturalım.</p>
            <Link href={`/${locale}/iletisim`}
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white rounded-xl transition-all hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)", boxShadow: "0 12px 32px rgba(37,99,235,0.4)" }}>
              Teklif İste <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <FinalCTASection locale={locale} />
    </>
  );
}
