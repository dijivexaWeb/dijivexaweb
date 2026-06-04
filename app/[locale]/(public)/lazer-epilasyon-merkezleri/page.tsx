"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { FinalCTASectionStatic } from "@/components/sections/FinalCTASectionStatic";
import { PageHero } from "@/components/sections/PageHero";
import { Calendar, Users, Package, CreditCard, MessageCircle, Zap, CheckCircle2 } from "lucide-react";
import { use } from "react";

const features = [
  {
    icon: Calendar,
    title: "Seans Takip Sistemi",
    desc: "Her müşteri için paket seans sayısı, kalan seans ve bölge bazlı takip.",
    color: "#8B5CF6",
  },
  {
    icon: Users,
    title: "Cilt Tipi Profili",
    desc: "Fitzpatrick skalası, tüy tipi ve enerji yoğunluğu kayıtları hasta bazında.",
    color: "#2563EB",
  },
  {
    icon: Zap,
    title: "Cihaz & Bölge Yönetimi",
    desc: "Hangi cihazın hangi bölgede kullanıldığı, enerji değerleri ve seans notları.",
    color: "#F59E0B",
  },
  {
    icon: Package,
    title: "Stok & Sarf Malzeme",
    desc: "Soğutucu jel, elektrot sarf malzemeleri, stok uyarısı ve sipariş takibi.",
    color: "#0D9488",
  },
  {
    icon: MessageCircle,
    title: "Seans Hatırlatma",
    desc: "Bir sonraki seans zamanı yaklaşınca WhatsApp mesajı otomatik gönderilir.",
    color: "#16A34A",
  },
  {
    icon: CreditCard,
    title: "Paket Satış & Tahsilat",
    desc: "Bölge bazlı paket satışı, taksit takibi, tahsilat raporları.",
    color: "#EF4444",
  },
];

const zones = [
  "Bacak", "Koltuk Altı", "Bikini", "Üst Dudak", "Yüz",
  "Sırt", "Göğüs", "Kol", "İnguinal", "Tüm Vücut",
];

export default function LazerEpilasyonMerkezleriPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const featuresRef = useScrollReveal();
  const zonesRef = useScrollReveal();

  return (
    <>
      <PageHero
        dark
        badge="Lazer Epilasyon Merkezleri"
        title="Lazer epilasyon merkezleri için"
        titleHighlight="seans yönetimi."
        subtitle="Bölge bazlı paket seans takibinden cihaz ve sarf malzeme yönetimine kadar her şey tek platformda."
        ctaPrimary={{ label: "15 Gün Ücretsiz Dene", href: `/${locale}/demo` }}
        ctaSecondary={{ label: "Demo Talep Et", href: `/${locale}/iletisim` }}
      />

      {/* Features */}
      <section ref={featuresRef} className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="gsap-reveal text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
              Lazer epilasyon merkezine özel özellikler
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

      {/* Zone tracking dark */}
      <section ref={zonesRef} className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #0F2553 0%, #1A3A6B 55%, #112B60 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Bölge bazlı takip</h2>
            <p className="mb-8" style={{ color: "#94A3B8" }}>
              Her bölge için ayrı seans, enerji ve not kaydı.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {zones.map((z) => (
                <span key={z} className="px-4 py-2 rounded-full text-sm border"
                  style={{ background: "rgba(139,92,246,0.1)", borderColor: "rgba(139,92,246,0.25)", color: "#C4B5FD" }}>
                  {z}
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
            {["Lazer Epilasyon Merkezi", "IPL Merkezi", "Medikal Estetik", "Cilt Bakım Kliniği"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm"
                style={{ background: "#F5F3FF", borderColor: "#DDD6FE", color: "#6D28D9" }}>
                <CheckCircle2 className="w-4 h-4" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <FinalCTASectionStatic locale={locale} />
    </>
  );
}
