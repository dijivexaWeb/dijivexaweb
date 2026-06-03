"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

const floatingCards = [
  { icon: "📅", text: "Yeni randevu oluşturuldu", sub: "Az önce", color: "#3B82F6", delay: 0.2 },
  { icon: "🤖", text: "AI değerlendirme hazır", sub: "Ahmet Y. • 2 dk önce", color: "#0D9488", delay: 0.5 },
  { icon: "💬", text: "WhatsApp gönderildi", sub: "3 hatırlatma", color: "#10B981", delay: 0.8 },
  { icon: "💰", text: "₺2.400 tahsilat", sub: "Kasa güncel", color: "#F59E0B", delay: 1.1 },
];

const trustItems = ["Kurulum desteği dahil", "Kredi kartı gerekmez", "15 gün ücretsiz", "Çok dilli"];

export function HeroSection({ locale }: { locale: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), { stiffness: 100, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ background: "linear-gradient(150deg, #050D1A 0%, #0A1628 55%, #0D1E35 100%)" }}
      onMouseMove={handleMouseMove}
    >
      {/* Tech grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px)", backgroundSize: "64px 64px" }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-6"
              style={{ background: "rgba(59,130,246,0.1)", borderColor: "rgba(59,130,246,0.25)", color: "#93C5FD" }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Klinik & Güzellik Merkezleri İçin
            </motion.div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white leading-[1.12] tracking-tight mb-6">
              Kliniğinizi{" "}
              <span style={{ background: "linear-gradient(135deg, #3B82F6, #2DD4BF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                tek panelden
              </span>{" "}
              yönetin.
            </h1>

            <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "#94A3B8" }}>
              Randevu, hasta takibi, kasa, stok, operasyon ve WhatsApp iletişimi — hepsi tek platformda. AI destekli, çok dilli, çok şubeli.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link href={`/${locale}/demo`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white rounded-xl transition-all hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)", boxShadow: "0 8px 24px rgba(37,99,235,0.35)" }}
              >
                15 Gün Ücretsiz Dene <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={`/${locale}/iletisim`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl border transition-all hover:-translate-y-0.5"
                style={{ color: "#CBD5E1", borderColor: "rgba(148,163,184,0.2)", background: "rgba(255,255,255,0.04)" }}
              >
                Canlı Demo Talep Et
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {trustItems.map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-sm" style={{ color: "#64748B" }}>
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#2DD4BF" }} />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: 3D Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -12 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.25, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: "1200px", perspectiveOrigin: "50% 40%" }}
          >
            <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
              {/* Main card */}
              <div className="rounded-2xl overflow-hidden border"
                style={{ background: "linear-gradient(135deg, rgba(15,32,68,0.95), rgba(10,22,40,0.98))", borderColor: "rgba(59,130,246,0.2)", boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.06)" }}
              >
                {/* Dashboard header */}
                <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(59,130,246,0.1)" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)" }}>D</div>
                    <div>
                      <p className="text-white text-xs font-semibold">Dijivexa Clinic</p>
                      <p className="text-xs" style={{ color: "#64748B" }}>Bugün — 3 Haziran</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {[{ v: "24", label: "Randevu", c: "#3B82F6" }, { v: "8", label: "Hasta", c: "#2DD4BF" }, { v: "₺14K", label: "Gelir", c: "#10B981" }].map(s => (
                      <div key={s.label} className="text-center px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
                        <p className="text-xs font-bold" style={{ color: s.c }}>{s.v}</p>
                        <p className="text-xs" style={{ color: "#475569" }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Appointments */}
                <div className="p-5 space-y-2">
                  {[
                    { name: "Ahmet Yılmaz", time: "09:00", op: "Saç Ekimi", status: "Tamamlandı", c: "#10B981" },
                    { name: "Fatma Kaya", time: "11:00", op: "PRP Seansı", status: "Devam Ediyor", c: "#3B82F6" },
                    { name: "Mehmet Arslan", time: "14:30", op: "Trikoloji", status: "Bekliyor", c: "#F59E0B" },
                    { name: "Ayşe Demir", time: "16:00", op: "Kontrol", status: "Bekliyor", c: "#F59E0B" },
                  ].map((a) => (
                    <div key={a.name} className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                        style={{ background: `${a.c}18`, color: a.c }}>{a.name[0]}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white truncate">{a.name}</p>
                        <p className="text-xs" style={{ color: "#475569" }}>{a.op}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium" style={{ color: "#94A3B8" }}>{a.time}</p>
                        <p className="text-xs" style={{ color: a.c }}>{a.status}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom bar */}
                <div className="px-5 pb-4 flex gap-2">
                  {["Hasta", "Kasa", "Stok", "AI", "WhatsApp"].map((t) => (
                    <div key={t} className="flex-1 text-center py-1.5 rounded-lg text-xs" style={{ background: "rgba(255,255,255,0.04)", color: "#64748B" }}>{t}</div>
                  ))}
                </div>
              </div>

              {/* Floating notification cards */}
              {floatingCards.map((card, i) => (
                <FloatingCard key={i} card={card} index={i} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.03))" }} />
    </section>
  );
}

function FloatingCard({ card, index }: { card: typeof floatingCards[0]; index: number }) {
  const positions = [
    "top-6 -right-10",
    "-top-5 left-12",
    "bottom-20 -right-12",
    "bottom-6 left-4",
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { delay: card.delay + 0.8, duration: 0.5 },
        scale: { delay: card.delay + 0.8, duration: 0.5, ease: "backOut" },
        y: { delay: card.delay + 1.3, duration: 3 + index * 0.4, repeat: Infinity, ease: "easeInOut" },
      }}
      className={`absolute ${positions[index]} flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border z-10`}
      style={{
        background: "rgba(10,22,40,0.92)",
        backdropFilter: "blur(16px)",
        borderColor: `${card.color}30`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px ${card.color}15`,
      }}
    >
      <span className="text-base">{card.icon}</span>
      <div>
        <p className="text-xs font-medium text-white whitespace-nowrap">{card.text}</p>
        <p className="text-xs whitespace-nowrap" style={{ color: "#64748B" }}>{card.sub}</p>
      </div>
      <span className="w-2 h-2 rounded-full shrink-0 animate-pulse" style={{ backgroundColor: card.color }} />
    </motion.div>
  );
}
