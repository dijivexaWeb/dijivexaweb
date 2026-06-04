"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { FinalCTASectionStatic } from "@/components/sections/FinalCTASectionStatic";
import { PageHero } from "@/components/sections/PageHero";
import { Users, Camera, Bot, MessageCircle, Calendar, BarChart3, CheckCircle2 } from "lucide-react";
import { use } from "react";

const features = [
  {
    icon: Users,
    title: "Donör Alan Takibi",
    desc: "Donör yoğunluk haritası, greft sayısı ve seans takibi hasta bazında kayıt altında.",
    color: "#2563EB",
  },
  {
    icon: Camera,
    title: "Fotoğraf Karşılaştırma",
    desc: "Öncesi/sonrası fotoğraf galeri sistemi. Tedavi sürecini görsel olarak belgeleyin.",
    color: "#0D9488",
  },
  {
    icon: Bot,
    title: "AI Norwood Değerlendirme",
    desc: "Muayene formundaki verileri analiz ederek Norwood skalası özeti ve öneri taslağı oluşturur.",
    color: "#8B5CF6",
  },
  {
    icon: MessageCircle,
    title: "Otomatik WhatsApp Takip",
    desc: "Operasyon sonrası 10. gün, 1. ay ve 6. ay kontrol mesajları otomatik gönderilir.",
    color: "#16A34A",
  },
  {
    icon: Calendar,
    title: "Çoklu Seans Planlaması",
    desc: "FUE, DHI ve PRP seanslarını kronolojik olarak planlayın, takip edin.",
    color: "#F59E0B",
  },
  {
    icon: BarChart3,
    title: "Hasta Segmentasyon",
    desc: "Operasyon türü, evre ve tarih bazında hasta segmentasyonu ve raporlama.",
    color: "#EF4444",
  },
];

const stats = [
  { value: "FUE / DHI", label: "Teknik Takibi" },
  { value: "Norwood", label: "Evre Analizi" },
  { value: "Otomatik", label: "Kontrol Mesajları" },
  { value: "6 Ay", label: "Süreç Takibi" },
];

export default function SacEkimiMerkezleriPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const featuresRef = useScrollReveal();
  const statsRef = useScrollReveal();

  return (
    <>
      <PageHero
        dark
        badge="Saç Ekimi Merkezleri"
        title="Saç ekimi merkezleri için"
        titleHighlight="özelleştirilmiş yönetim."
        subtitle="Donör alan takibinden Norwood değerlendirmesine, operasyon sonrası WhatsApp takibine kadar — tüm süreç tek platformda."
        ctaPrimary={{ label: "15 Gün Ücretsiz Dene", href: `/${locale}/demo` }}
        ctaSecondary={{ label: "Demo Talep Et", href: `/${locale}/iletisim` }}
      />

      {/* Stats */}
      <section ref={statsRef} className="py-16 bg-white border-b" style={{ borderColor: "#F1F5F9" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="gsap-stagger grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label} className="gsap-item">
                <p className="text-2xl font-bold mb-1" style={{ color: "#2563EB" }}>{s.value}</p>
                <p className="text-sm" style={{ color: "#64748B" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section ref={featuresRef} className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="gsap-reveal text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
              Saç ekimi merkezine özel özellikler
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: "#64748B" }}>
              Genel klinik yazılımlarından farklı. Saç ekimi sürecinin her adımı için düşünülmüş.
            </p>
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

      {/* Process dark section */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #0F2553 0%, #1A3A6B 55%, #112B60 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Operasyon süreci takibi</h2>
            <p style={{ color: "#94A3B8" }}>Ön değerlendirmeden 12 aylık takibe kadar her adım sistemde.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: "1", title: "Ön Değerlendirme", desc: "Norwood, donör, beklenti analizi." },
              { step: "2", title: "Operasyon Günü", desc: "Greft sayısı, teknik, süre kaydı." },
              { step: "3", title: "İlk Hafta Takip", desc: "Günlük kontrol bildirimleri." },
              { step: "4", title: "Uzun Vadeli İzlem", desc: "1/3/6/12 aylık fotoğraf ve notlar." },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: parseInt(item.step) * 0.1 }}
                className="rounded-2xl border p-5 text-center"
                style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(59,130,246,0.15)" }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold"
                  style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)" }}>{item.step}</div>
                <h3 className="font-semibold text-sm text-white mb-1">{item.title}</h3>
                <p className="text-xs" style={{ color: "#64748B" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust items */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            {["FUE Merkezi", "DHI Kliniği", "Saç Tasarım Merkezi", "Medikal Estetik"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm"
                style={{ background: "#EFF6FF", borderColor: "#BFDBFE", color: "#1D4ED8" }}>
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
