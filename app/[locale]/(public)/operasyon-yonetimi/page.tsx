"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { FinalCTASectionStatic } from "@/components/sections/FinalCTASectionStatic";
import { PageHero } from "@/components/sections/PageHero";
import {
  Scissors, Users2, Stethoscope, ClipboardList, Activity, FileCheck,
  Timer, Bell, CheckCircle2, CalendarCheck, Camera, ShieldCheck,
} from "lucide-react";
import { use } from "react";

const operationFeatures = [
  { icon: Scissors, title: "Greft Dağılımı & Takibi", desc: "FUE/DHI teknik seçimi, greft sayısı ve bölge bazlı dağılım planı.", color: "#2563EB" },
  { icon: Users2, title: "Ekip Görev Ataması", desc: "Asistan, teknisyen ve doktor görevlendirmesi. Operasyon sırası ve sorumluluklar.", color: "#0D9488" },
  { icon: Stethoscope, title: "Anestezi & İlaç Kaydı", desc: "Kullanılan ilaç ve anestezi dozu kayıtları, reaksiyon notları.", color: "#8B5CF6" },
  { icon: Activity, title: "Vital Takip", desc: "Operasyon sırasında nabız, tansiyon ve genel durum kayıtları.", color: "#F59E0B" },
  { icon: FileCheck, title: "Taburcu Checklist", desc: "Bakım talimatları, ilaç listesi ve kontrol tarihleri ile eksiksiz taburcu.", color: "#10B981" },
  { icon: CalendarCheck, title: "12 Aylık Takip Planı", desc: "Operasyon sonrası 1., 3., 6., 12. ay kontrol hatırlatmaları otomatik oluşur.", color: "#EC4899" },
  { icon: Camera, title: "Öncesi / Sonrası Fotoğraf", desc: "Tarih damgalı fotoğraf arşivi. Karşılaştırmalı görünüm ile ilerleme takibi.", color: "#F97316" },
  { icon: ClipboardList, title: "Muayene Formları", desc: "Norwood evreleme, trikoskopi notları, donör bölge analizi yapılandırılmış formlar.", color: "#6366F1" },
  { icon: Timer, title: "Operasyon Süresi", desc: "Başlangıç ve bitiş saati kaydı, ortalama operasyon süresi analizi.", color: "#0EA5E9" },
  { icon: Bell, title: "WhatsApp Hatırlatmalar", desc: "10. gün, 1. ay, 3. ay bakım ve kontrol hatırlatmaları otomatik gönderilir.", color: "#16A34A" },
  { icon: ShieldCheck, title: "Onay Akışı", desc: "Doktor onayı gerektiren işlemler için dijital onay ve imza.", color: "#EF4444" },
  { icon: Users2, title: "Çok Klinik Desteği", desc: "Aynı panel üzerinden birden fazla klinik ve şubeyi yönetin.", color: "#7C3AED" },
];

const stats = [
  { value: "12", suffix: " ay", label: "Otomatik Takip Planı" },
  { value: "0", suffix: " kağıt", label: "Tamamen Dijital" },
  { value: "%100", suffix: "", label: "Greft Takip Doğruluğu" },
  { value: "500+", suffix: "", label: "Operasyon Yönetildi" },
];

export default function OperasyonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const featuresRef = useScrollReveal();

  return (
    <>
      <PageHero
        dark
        badge="Operasyon Modülü"
        title="Saç ekimi operasyonunu"
        titleHighlight="baştan sona dijitalleştirin."
        subtitle="Greft takibi, ekip görevlendirme, vital takip, taburcu checklist ve 12 aylık otomatik takip planı — tek sistemde, kağıtsız."
        ctaPrimary={{ label: "15 Gün Ücretsiz Dene", href: `/${locale}/demo` }}
        ctaSecondary={{ label: "Saç Ekimi Özelliklerini Gör", href: `/${locale}/sac-ekimi-merkezleri` }}
      />

      {/* Stats */}
      <section className="py-12 border-b" style={{ background: "#F8FAFC", borderColor: "#F1F5F9" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="text-center p-5 rounded-2xl border bg-white" style={{ borderColor: "#F1F5F9" }}>
              <p className="text-3xl font-bold mb-1" style={{ color: "#0F172A" }}>{s.value}{s.suffix}</p>
              <p className="text-sm" style={{ color: "#64748B" }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section ref={featuresRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="gsap-reveal text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "#EFF6FF", color: "#1D4ED8" }}>Operasyon Yönetimi</span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>Her operasyon adımı kayıt altında.</h2>
            <p className="max-w-xl mx-auto" style={{ color: "#64748B" }}>FUE'den DHI'ya, greft sayısından taburcu formuna kadar tüm operasyon süreci dijital.</p>
          </div>
          <div className="gsap-stagger grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {operationFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} className="gsap-item p-5 rounded-2xl border bg-white hover:shadow-md transition-all" style={{ borderColor: "#F1F5F9" }}
                  whileHover={{ y: -3, borderColor: f.color + "30" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: f.color + "12" }}>
                    <Icon className="w-4.5 h-4.5" style={{ color: f.color }} />
                  </div>
                  <h3 className="font-semibold text-sm mb-1" style={{ color: "#0F172A" }}>{f.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#94A3B8" }}>{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Takip planı vurgusu */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #0F2553 0%, #1A3A6B 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">12 aylık otomatik takip planı</h3>
          <p className="mb-8" style={{ color: "#94A3B8" }}>Operasyon tamamlandığında sistem otomatik olarak 1., 3., 6. ve 12. ay kontrol hatırlatmalarını oluşturur. WhatsApp üzerinden hasta bilgilendirilir.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["1. Gün Bakım", "10. Gün Kontrol", "1. Ay Değerlendirme", "3. Ay Analiz", "6. Ay Fotoğraf", "12. Ay Sonuç"].map((t, i) => (
              <div key={t} className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm"
                style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(59,130,246,0.25)", color: "#CBD5E1" }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "#2563EB", color: "white" }}>{i + 1}</span>
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="py-16 bg-white border-t" style={{ borderColor: "#F1F5F9" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-lg font-semibold mb-4" style={{ color: "#0F172A" }}>
            Türkiye&apos;nin lider saç ekimi merkezleri Dijivexa ile operasyon yönetiyor.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["FUE/DHI Takibi", "Greft Sayımı", "Ekip Yönetimi", "Kağıtsız Operasyon", "Otomatik Takip"].map((t) => (
              <div key={t} className="flex items-center gap-1.5 text-sm" style={{ color: "#475569" }}>
                <CheckCircle2 className="w-4 h-4" style={{ color: "#34D399" }} />{t}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTASectionStatic locale={locale} />
    </>
  );
}
