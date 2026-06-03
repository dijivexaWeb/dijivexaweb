"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Code2, Layers, Zap, Shield, Globe, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";
import { use } from "react";

const services = [
  {
    icon: Code2,
    title: "Özel Yazılım Geliştirme",
    desc: "İşletmenize özgü web ve mobil uygulamalar. Tam sahiplik, kaynak kod sizinle.",
    color: "#2563EB",
  },
  {
    icon: Layers,
    title: "Entegrasyon Geliştirme",
    desc: "ERP, CRM, ödeme sistemleri ve üçüncü parti API entegrasyonları.",
    color: "#0D9488",
  },
  {
    icon: Zap,
    title: "Süreç Otomasyonu",
    desc: "Tekrarlayan iş süreçlerini yazılımla otomatize edin. İş gücü tasarrufu.",
    color: "#F59E0B",
  },
  {
    icon: Shield,
    title: "Güvenlik & Mimari",
    desc: "Kurumsal güvenlik standartları, veri koruma ve ölçeklenebilir altyapı.",
    color: "#EF4444",
  },
  {
    icon: Globe,
    title: "SaaS Ürün Geliştirme",
    desc: "Fikrinden ürüne. MVP, yatırımcı sunumu ve ölçekleme yol haritası.",
    color: "#8B5CF6",
  },
  {
    icon: BarChart3,
    title: "Teknik Danışmanlık",
    desc: "Teknoloji seçimi, mimari tasarım ve teknik kararlar için danışmanlık.",
    color: "#EC4899",
  },
];

const stack = ["Next.js", "React Native", "TypeScript", "Supabase", "PostgreSQL", "Node.js", "Python", "AWS", "Vercel"];

export default function DijiVexaStudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const servicesRef = useScrollReveal();
  const stackRef = useScrollReveal();

  return (
    <>
      <PageHero
        dark
        badge="Dijivexa Studio"
        title="Özel yazılım ile"
        titleHighlight="rekabette öne geçin."
        subtitle="İşletmenize özgü web & mobil uygulamalar, entegrasyonlar ve otomasyon çözümleri. Fikrinden lansmana kadar tam destek."
        ctaPrimary={{ label: "Proje Anlat", href: `/${locale}/iletisim` }}
        ctaSecondary={{ label: "Hizmetleri İncele", href: `#hizmetler` }}
      >
        {/* Code editor visual */}
        <div className="rounded-2xl overflow-hidden border"
          style={{ background: "#0D1117", borderColor: "rgba(59,130,246,0.2)", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>
          <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#161B22" }}>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <span className="text-xs ml-2" style={{ color: "#64748B" }}>clinic-api.ts</span>
          </div>
          <div className="p-5 font-mono text-xs space-y-1">
            <p><span style={{ color: "#7C3AED" }}>export</span> <span style={{ color: "#2563EB" }}>async function</span> <span style={{ color: "#0D9488" }}>createPatient</span><span style={{ color: "#CBD5E1" }}>(</span></p>
            <p className="pl-4"><span style={{ color: "#F59E0B" }}>data</span><span style={{ color: "#CBD5E1" }}>: PatientInput</span></p>
            <p><span style={{ color: "#CBD5E1" }}>{")"} {"{"}</span></p>
            <p className="pl-4"><span style={{ color: "#64748B" }}>// AI analysis + DB insert</span></p>
            <p className="pl-4"><span style={{ color: "#2563EB" }}>const</span> <span style={{ color: "#F59E0B" }}>ai</span> <span style={{ color: "#CBD5E1" }}>= await</span> <span style={{ color: "#0D9488" }}>analyzeWithGemini</span><span style={{ color: "#CBD5E1" }}>(data)</span></p>
            <p className="pl-4"><span style={{ color: "#2563EB" }}>return</span> <span style={{ color: "#CBD5E1" }}>supabase.insert({"{ ...data, ai }"})</span></p>
            <p><span style={{ color: "#CBD5E1" }}>{"}"}</span></p>
          </div>
        </div>
      </PageHero>

      {/* Services */}
      <section id="hizmetler" ref={servicesRef} className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="gsap-reveal text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
              Studio hizmetleri
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

      {/* Tech Stack dark */}
      <section ref={stackRef} className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #0F2553 0%, #1A3A6B 55%, #112B60 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">Teknoloji yığını</h2>
            <p className="mb-8" style={{ color: "#94A3B8" }}>Modern, ölçeklenebilir ve kanıtlanmış teknolojiler.</p>
            <div className="flex flex-wrap justify-center gap-3">
              {stack.map((s) => (
                <span key={s} className="px-4 py-2 rounded-full text-sm font-mono border"
                  style={{ background: "rgba(59,130,246,0.08)", borderColor: "rgba(59,130,246,0.2)", color: "#93C5FD" }}>
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-10">
              <Link href={`/${locale}/iletisim`}
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white rounded-xl transition-all hover:-translate-y-1"
                style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)", boxShadow: "0 12px 32px rgba(37,99,235,0.4)" }}>
                Projenizi Anlat <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <FinalCTASection locale={locale} />
    </>
  );
}
