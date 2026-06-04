"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { FinalCTASectionStatic } from "@/components/sections/FinalCTASectionStatic";
import { PageHero } from "@/components/sections/PageHero";
import {
  Calendar, Users, CreditCard, Package, Bot, MessageCircle,
  Building2, Shield, BarChart3, Stethoscope, Globe, Bell, Lock, FileText, Zap, Layers,
} from "lucide-react";
import { use } from "react";

const categories = [
  {
    name: "Klinik Operasyonu",
    color: "#2563EB",
    features: [
      { icon: Calendar, title: "Randevu Yönetimi", desc: "Çakışma korumalı, online & offline randevu sistemi." },
      { icon: Users, title: "Hasta Profili", desc: "128+ alan, fotoğraf yükleme, tedavi geçmişi, ek dosyalar." },
      { icon: Stethoscope, title: "Muayene Notları", desc: "Yapılandırılmış not alma, AI destekli özetleme." },
      { icon: FileText, title: "Tedavi Planlaması", desc: "Aşamalı tedavi planı oluşturma ve takibi." },
    ],
  },
  {
    name: "Finans & Stok",
    color: "#0D9488",
    features: [
      { icon: CreditCard, title: "Kasa Yönetimi", desc: "Nakit, kart, taksit. Anlık kasa dengesi ve raporlar." },
      { icon: Package, title: "Stok Takibi", desc: "Kritik eşik uyarısı, tedarikçi yönetimi, kullanım geçmişi." },
      { icon: BarChart3, title: "Gelir Raporları", desc: "Günlük/aylık gelir, hizmet bazlı analiz." },
      { icon: Layers, title: "Fatura & Makbuz", desc: "Otomatik fatura oluşturma ve müşteriye iletme." },
    ],
  },
  {
    name: "AI & Otomasyon",
    color: "#8B5CF6",
    features: [
      { icon: Bot, title: "AI Klinik Asistanı", desc: "Muayene özeti, risk analizi, tedavi önerisi taslağı." },
      { icon: MessageCircle, title: "WhatsApp Otomasyonu", desc: "Hatırlatma, kontrol, kampanya mesajları otomatik." },
      { icon: Bell, title: "Akıllı Bildirimler", desc: "Stok kritik uyarısı, randevu hatırlatmaları." },
      { icon: Zap, title: "Otomatik İş Akışları", desc: "Onay süreçleri, personel görevlendirme otomasyonu." },
    ],
  },
  {
    name: "Yönetim & Güvenlik",
    color: "#EF4444",
    features: [
      { icon: Building2, title: "Çok Şubeli Yapı", desc: "Her şube için ayrı veri, merkezi yönetim paneli." },
      { icon: Globe, title: "Çok Dilli", desc: "Türkçe, İngilizce, Gürcüce, Rusça arayüz desteği." },
      { icon: Shield, title: "KVKK & Güvenlik", desc: "RLS, audit log, SSL, 2FA, günlük yedekleme." },
      { icon: Lock, title: "Rol Yönetimi", desc: "Doktor, asistan, kasiyer, yönetici için ayrı yetkiler." },
    ],
  },
];

export default function OzelliklerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const cat1Ref = useScrollReveal();
  const cat2Ref = useScrollReveal();
  const cat3Ref = useScrollReveal();
  const cat4Ref = useScrollReveal();
  const catRefs = [cat1Ref, cat2Ref, cat3Ref, cat4Ref];

  return (
    <>
      <PageHero
        badge="Tüm Özellikler"
        title="Tüm özellikler,"
        titleHighlight="tek platform."
        subtitle="16'dan fazla entegre modül. Randevudan kasaya, AI'dan WhatsApp otomasyonuna kadar klinik yönetiminin tüm ihtiyaçları."
        ctaPrimary={{ label: "15 Gün Ücretsiz Dene", href: `/${locale}/demo` }}
        ctaSecondary={{ label: "Demo Talep Et", href: `/${locale}/iletisim` }}
      />

      {/* All feature categories */}
      {categories.map((cat, ci) => (
        <section
          key={cat.name}
          ref={catRefs[ci]}
          className={`py-20 ${ci % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="gsap-reveal mb-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${cat.color}15` }}>
                <div className="w-4 h-4 rounded" style={{ background: cat.color }} />
              </div>
              <h2 className="text-2xl font-bold" style={{ color: "#0F172A" }}>{cat.name}</h2>
            </div>
            <div className="gsap-stagger grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {cat.features.map((f) => (
                <div
                  key={f.title}
                  className="gsap-item bg-white rounded-2xl border p-6 hover:shadow-md transition-all group"
                  style={{ borderColor: "#F1F5F9" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ background: `${cat.color}12` }}
                  >
                    <f.icon className="w-5 h-5" style={{ color: cat.color }} />
                  </div>
                  <h3 className="font-semibold text-sm mb-2" style={{ color: "#0F172A" }}>{f.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Comparison / Why section */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #0F2553 0%, #1A3A6B 55%, #112B60 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Neden tek platformda?
            </h2>
            <div className="grid sm:grid-cols-3 gap-5 text-left">
              {[
                { num: "01", title: "Veri tutarlılığı", desc: "Randevu, kasa, hasta — hepsi senkronize. Manuel aktarım yok." },
                { num: "02", title: "Zaman tasarrufu", desc: "Ortalama 2.5 saat/gün idari iş azalması." },
                { num: "03", title: "Tek abonelik", desc: "10 ayrı araç yerine tek platform. Maliyet ve karmaşıklık azalır." },
              ].map((item) => (
                <div key={item.num} className="rounded-2xl border p-5"
                  style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(59,130,246,0.15)" }}>
                  <span className="text-3xl font-black block mb-3"
                    style={{ color: "rgba(59,130,246,0.3)" }}>{item.num}</span>
                  <h3 className="font-semibold text-white text-sm mb-2">{item.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <FinalCTASectionStatic locale={locale} />
    </>
  );
}
