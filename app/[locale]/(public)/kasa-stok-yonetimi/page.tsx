"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { FinalCTASectionStatic } from "@/components/sections/FinalCTASectionStatic";
import { PageHero } from "@/components/sections/PageHero";
import {
  CreditCard, Package, BarChart3, TrendingUp, AlertCircle, ArrowDownUp,
  Layers, FileText, CheckCircle2, Truck, PiggyBank, ReceiptText,
} from "lucide-react";
import { use } from "react";

const kasaFeatures = [
  { icon: CreditCard, title: "Nakit & Kart Tahsilat", desc: "Nakit, kredi kartı, banka havalesi ile çoklu ödeme alma. Anlık kasa dengesi takibi.", color: "#2563EB" },
  { icon: Layers, title: "Taksit Planları", desc: "Hasta için aylık taksit planı oluşturma ve otomatik ödeme hatırlatmaları.", color: "#0D9488" },
  { icon: PiggyBank, title: "Kapora Yönetimi", desc: "Randevu kaparo alımı, bakiye takibi ve otomatik hesap mutabakatı.", color: "#8B5CF6" },
  { icon: ReceiptText, title: "Gider Kaydı", desc: "Tedarikçi ödemeleri, genel giderler ve personel harcamaları kayıt altında.", color: "#F59E0B" },
  { icon: ArrowDownUp, title: "Kasa Transferi", desc: "Şubeler arası kasa transferi ve merkezi bakiye izleme.", color: "#10B981" },
  { icon: BarChart3, title: "Gelir Raporları", desc: "Günlük, haftalık, aylık gelir analizi. Hizmet bazlı ciro dağılımı.", color: "#EC4899" },
];

const stokFeatures = [
  { icon: Package, title: "Otomatik Stok Düşümü", desc: "Hizmet verildiğinde kullanılan ürünler stoktan otomatik düşer.", color: "#2563EB" },
  { icon: AlertCircle, title: "Kritik Stok Alarmı", desc: "Stok eşiği dolduğunda anlık uyarı. Tedarikçiye otomatik sipariş hatırlatması.", color: "#EF4444" },
  { icon: Truck, title: "Tedarikçi Yönetimi", desc: "Tedarikçi kaydı, sipariş geçmişi ve teslimat takibi.", color: "#0D9488" },
  { icon: ArrowDownUp, title: "Şubeler Arası Transfer", desc: "Şubeye stok transferi, onay akışı ve kayıt tutma.", color: "#8B5CF6" },
  { icon: FileText, title: "Fire & İade Kaydı", desc: "Kullanılamaz ürün, iade ve zarar kayıtları ayrıntılı raporlanır.", color: "#F59E0B" },
  { icon: TrendingUp, title: "Stok Raporu", desc: "Ürün bazlı kullanım analizi, dönemlik maliyet ve verimlilik raporu.", color: "#10B981" },
];

const stats = [
  { value: "0", label: "Manuel Stok Sayımı", suffix: "x" },
  { value: "100", label: "Doğruluk Oranı", suffix: "%" },
  { value: "2", label: "Dakikada Kasa Kapanışı", suffix: "dk" },
  { value: "∞", label: "Şube Desteği", suffix: "" },
];

export default function KasaStokPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const kasaRef = useScrollReveal();
  const stokRef = useScrollReveal();

  return (
    <>
      <PageHero
        dark
        badge="Kasa & Stok Yönetimi"
        title="Finansınız ve stoğunuz"
        titleHighlight="tam kontrol altında."
        subtitle="Tahsilat, taksit, kapora, gider, tedarikçi ve stok — hepsi tek panelden. Şubeye özel veya merkezi görünüm."
        ctaPrimary={{ label: "15 Gün Ücretsiz Dene", href: `/${locale}/demo` }}
        ctaSecondary={{ label: "Özellikleri İncele", href: `/${locale}/ozellikler` }}
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

      {/* Kasa */}
      <section ref={kasaRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="gsap-reveal text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "#EFF6FF", color: "#1D4ED8" }}>Kasa Modülü</span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>Her tahsilatı kayıt altında tutun.</h2>
            <p className="max-w-xl mx-auto" style={{ color: "#64748B" }}>Nakit, kart, taksit ve kapora — kasa açılışından kapanışına tüm işlemler şeffaf.</p>
          </div>
          <div className="gsap-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {kasaFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} className="gsap-item p-6 rounded-2xl border bg-white hover:shadow-md transition-all" style={{ borderColor: "#F1F5F9" }}
                  whileHover={{ y: -3, borderColor: f.color + "30" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: f.color + "12" }}>
                    <Icon className="w-5 h-5" style={{ color: f.color }} />
                  </div>
                  <h3 className="font-semibold mb-1.5" style={{ color: "#0F172A" }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stok */}
      <section ref={stokRef} className="py-24" style={{ background: "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="gsap-reveal text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "#F0FDFA", color: "#0F766E" }}>Stok Modülü</span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>Stok tüketimi kendiliğinden düşer.</h2>
            <p className="max-w-xl mx-auto" style={{ color: "#64748B" }}>Hizmet verildiğinde kullanılan ürünler otomatik düşülür. Manuel sayım yapmanıza gerek kalmaz.</p>
          </div>
          <div className="gsap-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {stokFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} className="gsap-item p-6 rounded-2xl border bg-white hover:shadow-md transition-all" style={{ borderColor: "#F1F5F9" }}
                  whileHover={{ y: -3, borderColor: f.color + "30" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: f.color + "12" }}>
                    <Icon className="w-5 h-5" style={{ color: f.color }} />
                  </div>
                  <h3 className="font-semibold mb-1.5" style={{ color: "#0F172A" }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="py-16 bg-white border-t" style={{ borderColor: "#F1F5F9" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-lg font-semibold mb-4" style={{ color: "#0F172A" }}>
            500+ klinik Dijivexa ile kasa ve stok yönetiyor.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Nakit & Kart", "Taksit Planı", "Otomatik Stok Düşümü", "Tedarikçi Takibi", "Şube Bazlı Raporlama"].map((t) => (
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
