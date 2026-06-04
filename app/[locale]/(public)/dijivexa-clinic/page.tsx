"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { FinalCTASectionStatic } from "@/components/sections/FinalCTASectionStatic";
import { PageHero } from "@/components/sections/PageHero";
import {
  Calendar, Users, CreditCard, Package, Bot, MessageCircle,
  Building2, Shield, BarChart3, Stethoscope, CheckCircle2, ArrowRight, Star,
} from "lucide-react";
import { use } from "react";

const modules = [
  { icon: Calendar, title: "Randevu Yönetimi", desc: "Online ve offline randevu, çakışma koruması, otomatik hatırlatmalar.", color: "#2563EB" },
  { icon: Users, title: "Hasta Takibi", desc: "128+ alan ile detaylı hasta profili, fotoğraf karşılaştırma, tedavi geçmişi.", color: "#0D9488" },
  { icon: CreditCard, title: "Kasa & Ödeme", desc: "Nakit, kart, taksit takibi. Günlük, haftalık, aylık raporlar.", color: "#10B981" },
  { icon: Package, title: "Stok Yönetimi", desc: "Kritik eşik uyarıları, tedarikçi takibi, kullanım geçmişi.", color: "#F59E0B" },
  { icon: Bot, title: "AI Asistan", desc: "Muayene notu özetleme, tedavi önerisi taslağı, risk değerlendirmesi.", color: "#8B5CF6" },
  { icon: MessageCircle, title: "WhatsApp Takip", desc: "Otomatik hatırlatmalar, kontrol mesajları, kampanya bildirimleri.", color: "#16A34A" },
  { icon: Building2, title: "Çok Şubeli", desc: "Her şube için ayrı stok, personel ve raporlama. Merkezi yönetim.", color: "#0EA5E9" },
  { icon: Shield, title: "Güvenlik & KVKK", desc: "RLS veri izolasyonu, günlük yedekleme, audit log, KVKK uyumu.", color: "#EF4444" },
  { icon: BarChart3, title: "Raporlama", desc: "Gelir analizleri, hasta segmentasyonu, büyüme grafikleri.", color: "#EC4899" },
  { icon: Stethoscope, title: "Operasyon", desc: "Personel görevleri, klinik protokolleri, onay akışları.", color: "#F97316" },
];

const stats = [
  { value: "128+", label: "Hasta Takip Alanı" },
  { value: "10+", label: "Entegre Modül" },
  { value: "4", label: "Dil Desteği" },
  { value: "15 gün", label: "Ücretsiz Deneme" },
];

const trustItems = [
  "Saç ekimi merkezleri",
  "Estetik klinikler",
  "Güzellik merkezleri",
  "Lazer epilasyon",
  "Trikoloji klinikleri",
];

export default function DijiVexaClinicPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const statsRef = useScrollReveal();
  const modulesRef = useScrollReveal();
  const featuresRef = useScrollReveal();

  return (
    <>
      <PageHero
        dark
        badge="Dijivexa Clinic"
        title="Klinik ve güzellik merkezleri için"
        titleHighlight="tek panel yönetim sistemi."
        subtitle="Randevu, hasta takibi, kasa, stok, AI asistan ve WhatsApp otomasyonu — hepsi tek platformda. Çok şubeli, çok dilli, KVKK uyumlu."
        ctaPrimary={{ label: "15 Gün Ücretsiz Dene", href: `/${locale}/demo` }}
        ctaSecondary={{ label: "Özellikleri İncele", href: `/${locale}/ozellikler` }}
      >
        {/* Hero visual — mini dashboard */}
        <div
          className="rounded-2xl overflow-hidden border"
          style={{
            background: "linear-gradient(135deg, rgba(20,50,100,0.95), rgba(15,37,83,0.98))",
            borderColor: "rgba(59,130,246,0.25)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
          }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(59,130,246,0.1)" }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)" }}>D</div>
              <p className="text-white text-sm font-semibold">Dijivexa Clinic</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ background: "rgba(16,185,129,0.15)", color: "#34D399" }}>● Canlı</span>
          </div>
          <div className="p-5 grid grid-cols-2 gap-3">
            {modules.slice(0, 6).map((m) => (
              <div key={m.title} className="flex items-center gap-2.5 p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <m.icon className="w-4 h-4 shrink-0" style={{ color: m.color }} />
                <span className="text-xs text-white font-medium">{m.title}</span>
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      {/* Stats */}
      <section ref={statsRef} className="py-16 bg-white border-b" style={{ borderColor: "#F1F5F9" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="gsap-stagger grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label} className="gsap-item">
                <p className="text-3xl font-bold mb-1" style={{ color: "#2563EB" }}>{s.value}</p>
                <p className="text-sm" style={{ color: "#64748B" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section ref={modulesRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="gsap-reveal text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: "#EFF6FF", color: "#1D4ED8" }}>10 Entegre Modül</span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
              Kliniğinizin tüm ihtiyaçları tek çatı altında.
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#64748B" }}>
              Her modül birbiriyle entegre çalışır. Veri tekrarı yok, manuel aktarım yok.
            </p>
          </div>
          <div className="gsap-stagger grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {modules.map((m) => (
              <div
                key={m.title}
                className="gsap-item bg-white rounded-2xl border p-6 hover:shadow-md transition-all group"
                style={{ borderColor: "#F1F5F9" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: `${m.color}15` }}>
                  <m.icon className="w-5 h-5" style={{ color: m.color }} />
                </div>
                <h3 className="font-semibold text-sm mb-2" style={{ color: "#0F172A" }}>{m.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section ref={featuresRef} className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="gsap-reveal mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: "#0F172A" }}>
              Hangi klinikler kullanıyor?
            </h2>
          </div>
          <div className="gsap-stagger flex flex-wrap justify-center gap-3">
            {trustItems.map((t) => (
              <span key={t} className="gsap-item inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium"
                style={{ background: "#EFF6FF", borderColor: "#BFDBFE", color: "#1D4ED8" }}>
                <CheckCircle2 className="w-4 h-4" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Security dark section */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #0F2553 0%, #1A3A6B 55%, #112B60 100%)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Güvenlik & KVKK Uyumu</h2>
            <p style={{ color: "#94A3B8" }}>Hasta verileriniz her zaman korumalı.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Row Level Security", desc: "Her klinik kendi verisini görür. Çapraz erişim engellenir." },
              { title: "Günlük Yedekleme", desc: "Otomatik yedekleme. Veri kaybı riski sıfır." },
              { title: "Audit Log", desc: "Tüm admin işlemleri kayıt altında." },
              { title: "KVKK Uyumu", desc: "Aydınlatma metni, açık rıza ve veri silme akışları." },
              { title: "SSL/TLS", desc: "Tüm veri trafiği şifreli iletişim üzerinden." },
              { title: "2FA Desteği", desc: "İki faktörlü doğrulama ile ek güvenlik katmanı." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border p-5"
                style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(59,130,246,0.15)" }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: "rgba(37,99,235,0.2)" }}>
                  <Shield className="w-4 h-4" style={{ color: "#93C5FD" }} />
                </div>
                <h3 className="font-semibold text-sm text-white mb-1">{item.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo CTA light */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" style={{ color: "#F59E0B" }} />
              ))}
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#0F172A" }}>
              Hemen deneyin, 15 gün ücretsiz.
            </h2>
            <p className="mb-8" style={{ color: "#64748B" }}>Kredi kartı gerekmez. Kurulum desteği dahil.</p>
            <Link
              href={`/${locale}/demo`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-xl transition-all hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)", boxShadow: "0 12px 32px rgba(37,99,235,0.4)" }}
            >
              Demo Hesabı Aç <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <FinalCTASectionStatic locale={locale} />
    </>
  );
}
