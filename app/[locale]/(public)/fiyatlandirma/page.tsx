"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { PageHero } from "@/components/sections/PageHero";
import { CheckCircle2, ChevronDown, ArrowRight, Zap } from "lucide-react";
import { use } from "react";

const features = [
  "Randevu yönetimi (sınırsız)",
  "Hasta profili (128+ alan)",
  "Kasa & ödeme takibi",
  "Stok yönetimi",
  "AI klinik asistanı",
  "WhatsApp otomasyon",
  "Çok şubeli destek",
  "Çok dilli arayüz (TR/EN/KA/RU)",
  "KVKK & güvenlik modülü",
  "Raporlama & analitik",
  "Onboarding desteği",
  "Günlük yedekleme",
];

const extras = [
  { title: "Dijivexa Growth", desc: "Sosyal medya yönetimi, reklam optimizasyonu, içerik üretimi.", badge: "Aylık" },
  { title: "Dijivexa Web", desc: "Klinik web sitesi tasarımı, SEO optimizasyonu, bakım.", badge: "Tek Seferlik" },
  { title: "Dijivexa Mobile", desc: "iOS & Android hasta uygulaması, klinik markası ile.", badge: "Proje Bazlı" },
  { title: "Dijivexa Studio", desc: "Özel yazılım geliştirme, entegrasyon, API.", badge: "Proje Bazlı" },
];

const pricingFaqs = [
  { q: "15 günlük demo nasıl çalışır?", a: "Formu doldurun, demo hesabınız otomatik açılır. Kredi kartı gerekmez. 15 gün boyunca tüm modülleri test edebilirsiniz." },
  { q: "Demo sonrasında fiyat ne olur?", a: "Demo süresi bittikten sonra size özel teklif sunulur. Klinik büyüklüğünüze ve ihtiyaçlarınıza göre fiyatlandırılır." },
  { q: "Çok şubeli kullanımda fiyat değişir mi?", a: "Evet. Şube sayısına göre özel paket oluşturulur. Demo formunu doldurun, ekibimiz teklif iletsin." },
  { q: "Kurulum ücreti var mı?", a: "Hayır. Onboarding ve kurulum desteği fiyata dahildir." },
  { q: "Sözleşme süresi var mı?", a: "Aylık veya yıllık abonelik seçenekleri mevcuttur. Yıllık aboneliklerde indirim uygulanır." },
];

export default function FiyatlandirmaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const extrasRef = useScrollReveal();
  const faqRef = useScrollReveal();

  return (
    <>
      <PageHero
        badge="Fiyatlandırma"
        title="İşletmenize göre"
        titleHighlight="fiyatlandırma."
        subtitle="Her klinik farklıdır. 15 günlük ücretsiz demo ile sistemi test edin, ardından size özel teklif alın."
        ctaPrimary={{ label: "15 Gün Ücretsiz Dene", href: `/${locale}/demo` }}
        ctaSecondary={{ label: "Teklif İste", href: `/${locale}/iletisim` }}
      />

      {/* Main Pricing Card */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border overflow-hidden"
            style={{ borderColor: "#BFDBFE", boxShadow: "0 24px 64px rgba(37,99,235,0.1)" }}
          >
            {/* Header */}
            <div className="p-8 border-b" style={{ borderColor: "#EFF6FF", background: "linear-gradient(135deg, #EFF6FF, #F0FDFA)" }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-3"
                    style={{ background: "#DBEAFE", color: "#1D4ED8" }}>
                    <Zap className="w-3.5 h-3.5" /> En Popüler
                  </span>
                  <h2 className="text-2xl font-bold" style={{ color: "#0F172A" }}>Dijivexa Clinic</h2>
                  <p className="text-sm mt-1" style={{ color: "#64748B" }}>Klinik yönetiminin tamamı tek platformda</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium" style={{ color: "#64748B" }}>Fiyat için</p>
                  <p className="text-2xl font-bold" style={{ color: "#2563EB" }}>Teklif Alın</p>
                </div>
              </div>
              <Link
                href={`/${locale}/demo`}
                className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold text-white rounded-xl transition-all hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)", boxShadow: "0 8px 24px rgba(37,99,235,0.3)" }}
              >
                15 Gün Ücretsiz Dene <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-center text-xs mt-3" style={{ color: "#94A3B8" }}>
                Kredi kartı gerekmez · Kurulum desteği dahil
              </p>
            </div>

            {/* Features */}
            <div className="p-8">
              <p className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: "#64748B" }}>
                Tüm özellikler dahil
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-sm" style={{ color: "#334155" }}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "#2563EB" }} />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Extra Services */}
      <section ref={extrasRef} className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="gsap-reveal text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: "#0F172A" }}>
              Ek Hizmetler
            </h2>
            <p style={{ color: "#64748B" }}>Klinik yazılımının ötesinde dijital büyüme çözümleri.</p>
          </div>
          <div className="gsap-stagger grid sm:grid-cols-2 gap-5">
            {extras.map((e) => (
              <div key={e.title} className="gsap-item bg-white rounded-2xl border p-6 hover:shadow-md transition-all"
                style={{ borderColor: "#F1F5F9" }}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold" style={{ color: "#0F172A" }}>{e.title}</h3>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{ background: "#F8FAFC", color: "#64748B" }}>{e.badge}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>{e.desc}</p>
                <Link href={`/${locale}/iletisim`}
                  className="inline-flex items-center gap-1 mt-4 text-xs font-semibold"
                  style={{ color: "#2563EB" }}>
                  Bilgi Al <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section ref={faqRef} className="py-24 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="gsap-reveal text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "#0F172A" }}>
              Fiyatlandırma SSS
            </h2>
          </div>
          <div className="gsap-stagger space-y-3">
            {pricingFaqs.map((faq, i) => (
              <div key={i} className="gsap-item rounded-2xl border bg-white overflow-hidden"
                style={{ borderColor: openFaq === i ? "#BFDBFE" : "#F1F5F9" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-blue-50/30 transition-colors"
                >
                  <span className="text-sm font-semibold pr-4" style={{ color: "#0F172A" }}>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                    style={{ color: openFaq === i ? "#2563EB" : "#94A3B8" }}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "#64748B" }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTASection locale={locale} />
    </>
  );
}
