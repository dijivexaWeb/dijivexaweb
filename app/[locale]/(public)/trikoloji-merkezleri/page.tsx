"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Users, FileText, Bot, Camera, Calendar, BarChart3, CheckCircle2 } from "lucide-react";
import { use } from "react";

const features = [
  {
    icon: Users,
    title: "Trikolojik Değerlendirme",
    desc: "Saç yoğunluk skoru, kıl kalınlığı, kafa derisi analizi detaylı kayıt sistemi.",
    color: "#0D9488",
  },
  {
    icon: Camera,
    title: "Trikoskopi Arşivi",
    desc: "Trikoskopi görüntüleri hasta dosyasına bağlı. Zaman serisi karşılaştırma.",
    color: "#2563EB",
  },
  {
    icon: Bot,
    title: "AI Saç Analizi",
    desc: "Muayene verilerini analiz ederek alopesi tipi ve tedavi protokolü önerisi oluşturur.",
    color: "#8B5CF6",
  },
  {
    icon: FileText,
    title: "Tedavi Protokolü",
    desc: "PRP, mezoterapi, topikal tedavi planları — aşamalı protokol kaydı.",
    color: "#F59E0B",
  },
  {
    icon: Calendar,
    title: "Seans & Kontrol Takibi",
    desc: "PRP seans takvimi, kontrol randevuları ve tedavi aralığı yönetimi.",
    color: "#EF4444",
  },
  {
    icon: BarChart3,
    title: "İyileşme Raporlama",
    desc: "Seans öncesi/sonrası yoğunluk değerleri ile ilerleme grafiği.",
    color: "#EC4899",
  },
];

export default function TrikolojiMerkezleriPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const featuresRef = useScrollReveal();
  const treatmentsRef = useScrollReveal();

  return (
    <>
      <PageHero
        dark
        badge="Trikoloji Merkezleri"
        title="Trikoloji klinikleri için"
        titleHighlight="uzmanlaşmış sistem."
        subtitle="Trikoskopi arşivinden AI saç analizine, PRP seans takibinden ilerleme raporlarına — trikoloji pratiğinizin tüm ihtiyaçları."
        ctaPrimary={{ label: "15 Gün Ücretsiz Dene", href: `/${locale}/demo` }}
        ctaSecondary={{ label: "Demo Talep Et", href: `/${locale}/iletisim` }}
      />

      {/* Features */}
      <section ref={featuresRef} className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="gsap-reveal text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
              Trikoloji merkezine özel özellikler
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

      {/* Treatment types dark */}
      <section ref={treatmentsRef} className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #0F2553 0%, #1A3A6B 55%, #112B60 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Takip edilen tedavi yöntemleri</h2>
            <p className="mb-8" style={{ color: "#94A3B8" }}>Her tedavi tipi için ayrı protokol ve seans takibi.</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "PRP Saç Tedavisi", "Mezoterapi", "Topikal Minoksidil",
                "LED Foton Terapi", "Mikroneedling", "Saç Mezoterapisi",
                "Kafa Derisi Bakımı", "Klinik Şampuan Protokolü",
              ].map((t) => (
                <span key={t} className="px-4 py-2 rounded-full text-sm border"
                  style={{ background: "rgba(13,148,136,0.1)", borderColor: "rgba(13,148,136,0.25)", color: "#5EEAD4" }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            {["Trikoloji Kliniği", "PRP Merkezi", "Saç Sağlığı Merkezi", "Dermatotrikoloji"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm"
                style={{ background: "#F0FDFA", borderColor: "#99F6E4", color: "#0F766E" }}>
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
