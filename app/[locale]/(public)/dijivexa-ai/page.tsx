"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Bot, Brain, MessageCircle, BarChart3, FileText, Zap, ArrowRight, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { use } from "react";

const solutions = [
  {
    icon: Bot,
    title: "Klinik AI Asistanı",
    desc: "Muayene notlarını analiz eden, özet ve öneri oluşturan klinik karar destek sistemi.",
    color: "#8B5CF6",
  },
  {
    icon: MessageCircle,
    title: "AI Chatbot",
    desc: "Web sitesi veya WhatsApp'ta 7/24 yanıt veren klinik chatbotu.",
    color: "#2563EB",
  },
  {
    icon: Brain,
    title: "Görüntü Analizi",
    desc: "Trikoskopi, dermoskopi veya klinik fotoğrafların AI destekli ön analizi.",
    color: "#0D9488",
  },
  {
    icon: FileText,
    title: "Doküman Özeti",
    desc: "Uzun medikal raporları, araştırma makalelerini veya hasta geçmişini özetler.",
    color: "#F59E0B",
  },
  {
    icon: BarChart3,
    title: "Hasta Segmentasyonu",
    desc: "AI destekli hasta segmentasyonu, churn riski analizi ve kampanya hedefleme.",
    color: "#EC4899",
  },
  {
    icon: Zap,
    title: "Süreç Otomasyonu",
    desc: "AI tabanlı iş akışı otomasyonu. Tekrarlayan klinik görevleri otomatize edin.",
    color: "#EF4444",
  },
];

const models = [
  { name: "Gemini Pro", tag: "Google", color: "#2563EB" },
  { name: "GPT-4o", tag: "OpenAI", color: "#0D9488" },
  { name: "Claude 3.5", tag: "Anthropic", color: "#8B5CF6" },
  { name: "Özel Model", tag: "Fine-tuned", color: "#F59E0B" },
];

export default function DijiVexaAIPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const solutionsRef = useScrollReveal();
  const modelsRef = useScrollReveal();

  return (
    <>
      <PageHero
        dark
        badge="Dijivexa AI"
        title="Kliniğinize özel"
        titleHighlight="AI çözümleri."
        subtitle="Klinik AI asistanından görüntü analizine, hasta segmentasyonundan süreç otomasyonuna — yapay zeka ile kliniğinizi ileriye taşıyın."
        ctaPrimary={{ label: "Çözüm Danış", href: `/${locale}/iletisim` }}
        ctaSecondary={{ label: "AI Asistanı İncele", href: `/${locale}/ai-klinik-asistani` }}
      >
        {/* AI visual */}
        <div className="rounded-2xl p-6 border"
          style={{ background: "rgba(20,50,100,0.55)", backdropFilter: "blur(20px)", borderColor: "rgba(139,92,246,0.25)" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(139,92,246,0.2)" }}>
              <Brain className="w-5 h-5" style={{ color: "#C4B5FD" }} />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">AI Analiz Merkezi</p>
              <p className="text-xs" style={{ color: "#8B5CF6" }}>● İşleniyor...</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: "Model", val: "Gemini Pro 1.5" },
              { label: "Görev", val: "Klinik değerlendirme" },
              { label: "Süre", val: "~2.3 saniye" },
              { label: "Güven", val: "Yüksek (0.94)" },
            ].map((r) => (
              <div key={r.label} className="flex justify-between p-2.5 rounded-lg text-xs"
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <span style={{ color: "#64748B" }}>{r.label}</span>
                <span style={{ color: "#C4B5FD" }}>{r.val}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl flex items-start gap-2"
            style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
            <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "#FCD34D" }} />
            <p className="text-xs" style={{ color: "#94A3B8" }}>AI sonuçları doktor onayı gerektirir.</p>
          </div>
        </div>
      </PageHero>

      {/* Solutions */}
      <section ref={solutionsRef} className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="gsap-reveal text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
              AI çözüm portföyü
            </h2>
          </div>
          <div className="gsap-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.map((s) => (
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

      {/* Models dark */}
      <section ref={modelsRef} className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #0F2553 0%, #1A3A6B 55%, #112B60 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">Desteklenen AI modelleri</h2>
            <p className="mb-10" style={{ color: "#94A3B8" }}>
              İhtiyacınıza ve bütçenize göre model seçimi. Kendi API anahtarınızı kullanabilirsiniz.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {models.map((m) => (
                <div key={m.name} className="rounded-2xl border p-5"
                  style={{ background: "rgba(255,255,255,0.04)", borderColor: `${m.color}25` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-3"
                    style={{ background: `${m.color}20` }}>
                    <Brain className="w-4 h-4" style={{ color: m.color }} />
                  </div>
                  <p className="font-semibold text-sm text-white text-center">{m.name}</p>
                  <p className="text-xs text-center mt-1" style={{ color: "#64748B" }}>{m.tag}</p>
                </div>
              ))}
            </div>
            <Link href={`/${locale}/iletisim`}
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white rounded-xl transition-all hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)", boxShadow: "0 12px 32px rgba(37,99,235,0.4)" }}>
              AI Çözümü Danış <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <FinalCTASection locale={locale} />
    </>
  );
}
