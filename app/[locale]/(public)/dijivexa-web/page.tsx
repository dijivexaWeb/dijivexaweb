"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { FinalCTASectionStatic } from "@/components/sections/FinalCTASectionStatic";
import { PageHero } from "@/components/sections/PageHero";
import { Globe, Search, Zap, Shield, Smartphone, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";
import { use } from "react";

const services = [
  {
    icon: Globe,
    title: "Klinik Web Sitesi",
    desc: "Profesyonel, SEO uyumlu, hızlı yüklenen klinik web sitesi tasarımı.",
    color: "#2563EB",
  },
  {
    icon: Search,
    title: "SEO Optimizasyonu",
    desc: "Google'da üst sıralarda çıkın. Yerel SEO ve medikal anahtar kelime stratejisi.",
    color: "#0D9488",
  },
  {
    icon: Smartphone,
    title: "Mobil Uyumlu Tasarım",
    desc: "Tüm cihazlarda mükemmel görünen, hızlı yüklenen responsive tasarım.",
    color: "#F59E0B",
  },
  {
    icon: Zap,
    title: "Performans Optimizasyonu",
    desc: "Core Web Vitals skorları, hızlı yükleme, Lighthouse 90+ performans.",
    color: "#8B5CF6",
  },
  {
    icon: Shield,
    title: "SSL & Güvenlik",
    desc: "SSL sertifikası, güvenlik güncellemeleri ve bakım hizmetleri dahil.",
    color: "#EF4444",
  },
  {
    icon: BarChart3,
    title: "Analytics & Takip",
    desc: "Google Analytics 4, heatmap ve dönüşüm takibi kurulumu.",
    color: "#EC4899",
  },
];

const process = [
  { step: "01", title: "Keşif", desc: "Kliniğinizi, hedef kitlenizi ve rakiplerinizi inceleriz." },
  { step: "02", title: "Tasarım", desc: "Marka kimliğinize uygun UI/UX tasarımı hazırlarız." },
  { step: "03", title: "Geliştirme", desc: "Next.js ile hızlı, SEO uyumlu site inşa ederiz." },
  { step: "04", title: "Yayın & Bakım", desc: "Canlıya alım ve sürekli teknik destek." },
];

export default function DijiVexaWebPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const servicesRef = useScrollReveal();
  const processRef = useScrollReveal();

  return (
    <>
      <PageHero
        badge="Dijivexa Web"
        title="Kliniğiniz için"
        titleHighlight="profesyonel web sitesi."
        subtitle="SEO optimizasyonlu, hızlı yüklenen, marka kimliğinize uygun klinik web sitesi. Tasarımdan yayına, bakımdan büyümeye."
        ctaPrimary={{ label: "Teklif İste", href: `/${locale}/iletisim` }}
        ctaSecondary={{ label: "Örnekleri Gör", href: `#ornekler` }}
      >
        {/* Web preview mockup */}
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#E2E8F0", boxShadow: "0 24px 64px rgba(0,0,0,0.1)" }}>
          <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#F8FAFC" }}>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 mx-3 px-3 py-1 rounded text-xs" style={{ background: "white", color: "#94A3B8" }}>
              www.kliniginiz.com
            </div>
          </div>
          <div style={{ background: "linear-gradient(135deg, #0F2553, #1A3A6B)" }} className="p-6">
            <div className="text-white font-bold text-lg mb-2">Klinik Adı</div>
            <p className="text-sm mb-4" style={{ color: "#94A3B8" }}>Profesyonel klinik hizmetleriniz.</p>
            <div className="flex gap-2">
              <div className="px-4 py-2 rounded-lg text-xs font-semibold text-white"
                style={{ background: "#2563EB" }}>Randevu Al</div>
              <div className="px-4 py-2 rounded-lg text-xs font-semibold border"
                style={{ color: "#CBD5E1", borderColor: "rgba(148,163,184,0.3)" }}>İletişim</div>
            </div>
          </div>
        </div>
      </PageHero>

      {/* Services */}
      <section ref={servicesRef} className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="gsap-reveal text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
              Web hizmetleri
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

      {/* Process dark */}
      <section ref={processRef} className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #0F2553 0%, #1A3A6B 55%, #112B60 100%)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Nasıl çalışırız?</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {process.map((p) => (
              <motion.div key={p.step}
                initial={{ opacity: 0, y: 20 }}
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
              Proje Başlatalım <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <FinalCTASectionStatic locale={locale} />
    </>
  );
}
