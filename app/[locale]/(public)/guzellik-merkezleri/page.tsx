"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Calendar, Package, Users, CreditCard, MessageCircle, Star, CheckCircle2 } from "lucide-react";
import { use } from "react";

const features = [
  {
    icon: Calendar,
    title: "Hızlı Randevu",
    desc: "Berber / güzellik salonu için hızlı randevu oluşturma, çakışma kontrolü.",
    color: "#EC4899",
  },
  {
    icon: Package,
    title: "Ürün & Stok Takibi",
    desc: "Renk, boya, bakım ürünleri — kritik eşik uyarısı ile stok yönetimi.",
    color: "#F59E0B",
  },
  {
    icon: CreditCard,
    title: "Paket Seans Takibi",
    desc: "Cilt bakım, epilasyon veya saç bakım paketleri — kalan seans otomatik güncellenir.",
    color: "#2563EB",
  },
  {
    icon: Users,
    title: "Müşteri Sadakat",
    desc: "Düzenli müşterilere özel notlar, doğum günü mesajları, sadakat kampanyaları.",
    color: "#0D9488",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Hatırlatma",
    desc: "Randevu hatırlatma ve kampanya mesajları otomatik gönderilir.",
    color: "#16A34A",
  },
  {
    icon: Star,
    title: "Google Yorum Daveti",
    desc: "İşlem sonrası müşteriye otomatik yorum daveti gönderilir.",
    color: "#F97316",
  },
];

export default function GuzellikMerkezleriPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const featuresRef = useScrollReveal();
  const servicesRef = useScrollReveal();

  return (
    <>
      <PageHero
        badge="Güzellik Merkezleri"
        badgeColor="#EC4899"
        title="Güzellik merkezleri için"
        titleHighlight="akıllı yönetim."
        subtitle="Randevudan kasaya, stoktan WhatsApp otomasyonuna — güzellik merkezinizin tüm operasyonu tek platformda."
        ctaPrimary={{ label: "15 Gün Ücretsiz Dene", href: `/${locale}/demo` }}
        ctaSecondary={{ label: "Demo Talep Et", href: `/${locale}/iletisim` }}
      />

      {/* Features */}
      <section ref={featuresRef} className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="gsap-reveal text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
              Güzellik merkezine özel özellikler
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

      {/* Services covered dark */}
      <section ref={servicesRef} className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #0F2553 0%, #1A3A6B 55%, #112B60 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">Hangi güzellik merkezi türleri?</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Kuaför", "Güzellik Salonu", "Cilt Bakım Merkezi",
                "Nail Art", "Kaş & Kirpik", "Spa & Masaj", "Saç Boyama Stüdyosu",
              ].map((s) => (
                <span key={s} className="px-4 py-2 rounded-full text-sm border"
                  style={{ background: "rgba(236,72,153,0.08)", borderColor: "rgba(236,72,153,0.2)", color: "#F9A8D4" }}>
                  {s}
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
            {["Güzellik Salonu", "Saç Stüdyosu", "Spa Merkezi", "Cilt Bakım Kliniği"].map((t) => (
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
