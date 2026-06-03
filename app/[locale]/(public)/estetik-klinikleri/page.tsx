"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Users, FileText, Bot, CreditCard, Calendar, Camera, CheckCircle2 } from "lucide-react";
import { use } from "react";

const features = [
  {
    icon: FileText,
    title: "Operasyon Protokolleri",
    desc: "Rinoplasti, yüz germe, liposuction gibi her işlem için ayrıştırılmış protokol takibi.",
    color: "#EC4899",
  },
  {
    icon: Bot,
    title: "AI Ön Değerlendirme",
    desc: "Hasta bilgilerini analiz ederek işleme uygunluk ve risk taslağı hazırlar.",
    color: "#8B5CF6",
  },
  {
    icon: Camera,
    title: "Görsel Arşiv",
    desc: "Öncesi/sonrası fotoğraf galeri sistemi, yüz haritası ve bölge notları.",
    color: "#0D9488",
  },
  {
    icon: CreditCard,
    title: "Paket & Taksit Yönetimi",
    desc: "Çoklu seans paketleri, taksit takibi, fatura otomasyonu.",
    color: "#F59E0B",
  },
  {
    icon: Calendar,
    title: "Operasyon Takvimi",
    desc: "Ameliyathane ve muayene odası bazlı randevu yönetimi, ekip çizelgesi.",
    color: "#2563EB",
  },
  {
    icon: Users,
    title: "Ekip Görev Yönetimi",
    desc: "Cerrah, anestezi, hemşire görev atamaları ve onay akışları.",
    color: "#EF4444",
  },
];

export default function EstetikKlinikleriPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const featuresRef = useScrollReveal();
  const processRef = useScrollReveal();

  return (
    <>
      <PageHero
        dark
        badge="Estetik Klinikler"
        title="Estetik klinikler için"
        titleHighlight="profesyonel yönetim."
        subtitle="Operasyon protokollerinden görsel arşive, AI değerlendirmeden taksit yönetimine — estetik kliniğinizin tüm ihtiyaçları."
        ctaPrimary={{ label: "15 Gün Ücretsiz Dene", href: `/${locale}/demo` }}
        ctaSecondary={{ label: "Demo Talep Et", href: `/${locale}/iletisim` }}
      />

      {/* Features */}
      <section ref={featuresRef} className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="gsap-reveal text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
              Estetik kliniğe özel özellikler
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

      {/* Procedures dark */}
      <section ref={processRef} className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #0F2553 0%, #1A3A6B 55%, #112B60 100%)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-3">Hangi işlemler takip edilir?</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Rinoplasti", "Yüz Germe", "Blefaroplasti", "Liposuction",
              "Meme Büyütme", "Karın Germe", "Botoks", "Dolgu",
              "PRP", "Mezoterapi", "Lazer Tedavileri", "Diğer",
            ].map((p) => (
              <motion.span
                key={p}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="px-4 py-2 rounded-full text-sm border"
                style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(59,130,246,0.2)", color: "#CBD5E1" }}
              >
                {p}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            {["Plastik Cerrahi", "Estetik & Güzellik", "Medikal Estetik", "Yüz Estetiği"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm"
                style={{ background: "#FDF2F8", borderColor: "#FBCFE8", color: "#BE185D" }}>
                <CheckCircle2 className="w-4 h-4" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <FinalCTASection locale={locale} />
    </>
  );
}
