"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { FinalCTASectionStatic } from "@/components/sections/FinalCTASectionStatic";
import { PageHero } from "@/components/sections/PageHero";
import { Bot, AlertTriangle, Cpu, CheckCircle2, FileText, Brain, Zap, Shield } from "lucide-react";
import { use } from "react";

const steps = [
  { num: "01", title: "Muayene formu doldurulur", desc: "Klinik ekibi hasta bilgilerini sisteme girer: yaş, şikayet, medikal geçmiş." },
  { num: "02", title: "AI analiz başlatılır", desc: "Gemini Pro modeli form verilerini işler. Analiz saniyeler içinde tamamlanır." },
  { num: "03", title: "Özet ve öneri oluşturulur", desc: "Klinik özet, risk notları ve tedavi önerisi taslağı hazırlanır." },
  { num: "04", title: "Doktor onaylar & kaydeder", desc: "Hekim öneriyi gözden geçirir, düzenler ve hasta dosyasına ekler." },
];

const analyzes = [
  { icon: Brain, title: "Anamnez Özeti", desc: "Uzun muayene notlarını yapılandırılmış klinik özete dönüştürür." },
  { icon: AlertTriangle, title: "Risk Tespiti", desc: "Medikal geçmişten potansiyel riskleri ve kontraendikasyonları öne çıkarır." },
  { icon: FileText, title: "Tedavi Taslağı", desc: "Klinik protokollere uygun tedavi önerisi taslağı hazırlar." },
  { icon: Zap, title: "Hızlı Raporlama", desc: "Manuel not yazmak yerine AI destekli taslakla zaman kazanın." },
  { icon: CheckCircle2, title: "Doktor Notları", desc: "Doktor açıklamalarını düzenleyerek arşive hazır formata getirir." },
  { icon: Shield, title: "Kliniğe Özel API", desc: "Kendi OpenAI / Gemini API anahtarınızı kullanabilirsiniz." },
];

export default function AIKlinikAsistaniPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const stepsRef = useScrollReveal();
  const analyzesRef = useScrollReveal();

  return (
    <>
      <PageHero
        dark
        badge="AI Klinik Asistanı"
        title="AI destekli klinik"
        titleHighlight="değerlendirme."
        subtitle="Muayene formundaki bilgileri analiz ederek klinik özet, risk notu ve tedavi önerisi taslağı oluşturur. Ekibiniz daha hızlı, daha düzenli."
        ctaPrimary={{ label: "Demo'da Dene", href: `/${locale}/demo` }}
        ctaSecondary={{ label: "Özellikleri Gör", href: `#ozellikler` }}
      >
        {/* Hero Visual */}
        <div className="rounded-2xl p-6 border relative"
          style={{ background: "rgba(20,50,100,0.55)", backdropFilter: "blur(20px)", borderColor: "rgba(59,130,246,0.25)", boxShadow: "0 24px 64px rgba(0,0,0,0.25)" }}>
          <div className="flex items-center gap-3 mb-5 pb-4 border-b" style={{ borderColor: "rgba(59,130,246,0.1)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.3), rgba(13,148,136,0.3))" }}>
              <Bot className="w-5 h-5" style={{ color: "#93C5FD" }} />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">AI Klinik Değerlendirme</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Cpu className="w-3 h-3" style={{ color: "#2DD4BF" }} />
                <p className="text-xs" style={{ color: "#2DD4BF" }}>Gemini Pro · işleniyor...</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: "Hasta", value: "Ahmet Y. · 34 yaş · Erkek" },
              { label: "Tanı", value: "Norwood Evre III — saç çizgisi belirgin gerileme" },
              { label: "AI Özet", value: "Hasta FUE tekniğine uygun, donör alan yeterli. Beklenti gerçekçi." },
              { label: "Öneri", value: "2.800–3.200 greft, 1 seans planlanabilir." },
            ].map((r) => (
              <div key={r.label} className="flex gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                <span className="text-xs w-16 shrink-0 pt-0.5 font-medium" style={{ color: "#64748B" }}>{r.label}</span>
                <span className="text-xs leading-relaxed" style={{ color: "#CBD5E1" }}>{r.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-2.5 p-3 rounded-xl"
            style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)" }}>
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#FCD34D" }} />
            <p className="text-xs leading-relaxed" style={{ color: "#94A3B8" }}>
              Nihai karar klinik ekibine aittir. AI asistan destek sağlar, karar vermez.
            </p>
          </div>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full text-xs font-semibold border"
            style={{ background: "rgba(13,148,136,0.15)", borderColor: "rgba(45,212,191,0.3)", color: "#2DD4BF", backdropFilter: "blur(12px)" }}
          >
            ✓ Analiz Tamamlandı
          </motion.div>
        </div>
      </PageHero>

      {/* How it works */}
      <section ref={stepsRef} className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="gsap-reveal text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>Nasıl çalışır?</h2>
            <p style={{ color: "#64748B" }}>4 adımda AI destekli klinik değerlendirme.</p>
          </div>
          <div className="gsap-stagger grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step) => (
              <div key={step.num} className="gsap-item bg-white rounded-2xl border p-6 relative"
                style={{ borderColor: "#F1F5F9" }}>
                <span className="text-4xl font-black block mb-4" style={{ color: "#EFF6FF" }}>{step.num}</span>
                <h3 className="font-semibold text-sm mb-2" style={{ color: "#0F172A" }}>{step.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What it analyzes */}
      <section id="ozellikler" ref={analyzesRef} className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="gsap-reveal text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>AI ne analiz eder?</h2>
          </div>
          <div className="gsap-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {analyzes.map((a) => (
              <div key={a.title} className="gsap-item bg-white rounded-2xl border p-6 hover:shadow-md transition-all"
                style={{ borderColor: "#F1F5F9" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(139,92,246,0.1)" }}>
                  <a.icon className="w-5 h-5" style={{ color: "#8B5CF6" }} />
                </div>
                <h3 className="font-semibold text-sm mb-2" style={{ color: "#0F172A" }}>{a.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-amber-50 border-y border-amber-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "#FEF3C7" }}>
              <AlertTriangle className="w-5 h-5" style={{ color: "#D97706" }} />
            </div>
            <div>
              <h3 className="font-semibold mb-1" style={{ color: "#92400E" }}>Önemli Not</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#78350F" }}>
                AI Klinik Asistanı tıbbi tanı veya tedavi kararı vermez. Sunulan tüm özetler ve öneriler, klinik ekibi tarafından değerlendirilmelidir. Nihai karar her zaman hekime aittir.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FinalCTASectionStatic locale={locale} />
    </>
  );
}
