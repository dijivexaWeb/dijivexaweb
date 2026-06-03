"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { CheckCircle2 } from "lucide-react";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-4 border-[#2563EB]/30 border-t-[#2563EB] animate-spin" />
    </div>
  ),
});

const floatingCards = [
  { icon: "📅", text: "Yeni randevu oluşturuldu", color: "#2563EB", delay: 0 },
  { icon: "💬", text: "WhatsApp hatırlatma gönderildi", color: "#00C2A8", delay: 0.4 },
  { icon: "🤖", text: "AI değerlendirme hazır", color: "#38BDF8", delay: 0.8 },
  { icon: "💰", text: "Kasa tahsilatı alındı", color: "#00C2A8", delay: 1.2 },
  { icon: "📦", text: "Stok otomatik düştü", color: "#F59E0B", delay: 1.6 },
];

const trustItems = [
  "Kurulum desteği dahil",
  "Kredi kartı gerekmez",
  "15 gün ücretsiz demo",
  "Çok dilli kullanım",
];

export function HeroSection({ locale }: { locale: string }) {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-[#07111F]">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#2563EB]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#38BDF8]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#38BDF8] text-xs font-medium mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
              Klinik & Güzellik Merkezleri İçin
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
              İşletmenizi{" "}
              <span className="bg-gradient-to-r from-[#2563EB] to-[#38BDF8] bg-clip-text text-transparent">
                yazılım, AI
              </span>{" "}
              ve dijital büyüme sistemiyle yönetin.
            </h1>

            <p className="text-lg text-[#94a3b8] leading-relaxed mb-8 max-w-xl">
              Dijivexa; klinik ve güzellik merkezleri için randevu, hasta takibi, kasa, stok, operasyon ve WhatsApp iletişimini tek platformda birleştirir.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link
                href={`/${locale}/demo`}
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl transition-all hover:shadow-lg hover:shadow-[#2563EB]/30 hover:-translate-y-0.5"
              >
                15 Gün Ücretsiz Dene
              </Link>
              <Link
                href={`/${locale}/iletisim`}
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all"
              >
                Canlı Demo Talep Et
              </Link>
            </div>

            {/* Trust items */}
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {trustItems.map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-sm text-[#64748B]">
                  <CheckCircle2 className="w-4 h-4 text-[#00C2A8] shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: 3D + Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[480px] lg:h-[560px]"
          >
            {/* Spline 3D Scene */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-[#0B172A] to-[#07111F] rounded-2xl border border-[#1e2d45] flex items-center justify-center">
                {/* Dashboard mockup placeholder - Spline scene buraya gelecek */}
                <DashboardMockup />
              </div>
            </div>

            {/* Floating notification cards */}
            {floatingCards.map((card, i) => (
              <FloatingCard key={i} card={card} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DashboardMockup() {
  return (
    <div className="w-full h-full p-6 flex flex-col gap-4">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white text-xs font-bold">D</div>
          <div>
            <div className="w-24 h-2.5 bg-[#1e2d45] rounded animate-pulse" />
            <div className="w-16 h-2 bg-[#1e2d45] rounded mt-1 animate-pulse" />
          </div>
        </div>
        <div className="flex gap-1.5">
          <div className="w-6 h-6 rounded-full bg-[#1e2d45] animate-pulse" />
          <div className="w-6 h-6 rounded-full bg-[#1e2d45] animate-pulse" />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Randevu", value: "24", color: "#2563EB" },
          { label: "Hasta", value: "128", color: "#00C2A8" },
          { label: "Gelir", value: "₺18K", color: "#38BDF8" },
        ].map((s) => (
          <div key={s.label} className="bg-[#0B172A] rounded-xl p-3 border border-[#1e2d45]">
            <p className="text-[#64748B] text-xs">{s.label}</p>
            <p className="font-bold mt-1" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Appointments list */}
      <div className="flex-1 bg-[#0B172A] rounded-xl border border-[#1e2d45] p-4 overflow-hidden">
        <p className="text-white text-xs font-semibold mb-3">Bugünkü Randevular</p>
        {[
          { name: "Ahmet Y.", time: "09:00", status: "Tamamlandı", color: "#00C2A8" },
          { name: "Fatma K.", time: "10:30", status: "Aktif", color: "#2563EB" },
          { name: "Mehmet A.", time: "13:00", status: "Bekliyor", color: "#F59E0B" },
          { name: "Ayşe B.", time: "15:30", status: "Bekliyor", color: "#F59E0B" },
        ].map((a) => (
          <div key={a.name} className="flex items-center justify-between py-2 border-b border-[#1e2d45] last:border-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#1e2d45] flex items-center justify-center text-[#64748B] text-xs">{a.name[0]}</div>
              <div>
                <p className="text-white text-xs">{a.name}</p>
                <p className="text-[#64748B] text-xs">{a.time}</p>
              </div>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: a.color, backgroundColor: `${a.color}15` }}>
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingCard({ card, index }: { card: typeof floatingCards[0]; index: number }) {
  const positions = [
    "top-4 -right-4",
    "top-1/4 -left-6",
    "bottom-1/3 -right-6",
    "bottom-16 -left-4",
    "top-1/2 right-0",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { delay: card.delay + 0.5, duration: 0.4 },
        scale: { delay: card.delay + 0.5, duration: 0.4 },
        y: {
          delay: card.delay + 0.9,
          duration: 3 + index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className={`absolute ${positions[index]} bg-[#0B172A]/90 backdrop-blur-xl border border-[#1e2d45] rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-xl shadow-black/30 z-10`}
    >
      <span className="text-base">{card.icon}</span>
      <span className="text-white text-xs font-medium whitespace-nowrap">{card.text}</span>
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: card.color }} />
    </motion.div>
  );
}
