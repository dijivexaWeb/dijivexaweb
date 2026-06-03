"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";

const modules = [
  { icon: "👤", label: "Hasta Yönetimi", desc: "Dijital dosya, fotoğraf arşivi, geçmiş işlemler", color: "#3B82F6" },
  { icon: "📅", label: "Randevu Takvimi", desc: "Günlük/haftalık takvim, doktor bazlı planlama", color: "#0D9488" },
  { icon: "📋", label: "Muayene Formları", desc: "Trikoloji, epilasyon, PRP, genel muayene", color: "#8B5CF6" },
  { icon: "🤖", label: "AI Asistan", desc: "Muayene özeti, tedavi önerisi taslağı", color: "#06B6D4" },
  { icon: "🔬", label: "Operasyon", desc: "Saç ekimi greft, ekip, taburcu takibi", color: "#10B981" },
  { icon: "💰", label: "Kasa & Ödeme", desc: "Tahsilat, taksit, kapora yönetimi", color: "#F59E0B" },
  { icon: "📦", label: "Stok Yönetimi", desc: "Otomatik düşüm, kritik stok alarmı", color: "#EF4444" },
  { icon: "💬", label: "WhatsApp", desc: "Randevu hatırlatma, kampanya bildirimi", color: "#22C55E" },
  { icon: "📊", label: "Seans Takibi", desc: "PRP, lazer, mezoterapi planları", color: "#F97316" },
  { icon: "📈", label: "Raporlama", desc: "Gelir, doluluk, personel analizleri", color: "#6366F1" },
];

export function SolutionGridSection({ locale }: { locale: string }) {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="section-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="gsap-reveal text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "#EFF6FF", color: "#1D4ED8" }}>Çözüm</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>Tüm klinik operasyonunuz tek sistemde.</h2>
          <p className="max-w-lg mx-auto" style={{ color: "#64748B" }}>10 modül, tek panel — sıfır karmaşa.</p>
        </div>

        <div className="gsap-stagger grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {modules.map((m) => (
            <motion.div
              key={m.label}
              className="gsap-item group flex flex-col p-5 rounded-2xl border bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
              style={{ borderColor: "#F1F5F9" }}
              whileHover={{ y: -5, borderColor: m.color + "40" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform duration-300"
                style={{ background: m.color + "12" }}>
                {m.icon}
              </div>
              <p className="text-sm font-semibold mb-1" style={{ color: "#0F172A" }}>{m.label}</p>
              <p className="text-xs leading-relaxed" style={{ color: "#94A3B8" }}>{m.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="gsap-reveal text-center mt-10">
          <Link href={`/${locale}/dijivexa-clinic`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border transition-all hover:-translate-y-0.5"
            style={{ color: "#2563EB", borderColor: "#BFDBFE", background: "#EFF6FF" }}>
            Dijivexa Clinic&apos;i İncele →
          </Link>
        </div>
      </div>
    </section>
  );
}
