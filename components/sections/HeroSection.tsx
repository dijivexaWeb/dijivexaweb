"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowRight, TrendingUp, Users, Calendar, Zap } from "lucide-react";

const floatingCards = [
  { icon: "📅", text: "Randevu oluşturuldu", sub: "Fatma K. • az önce", color: "#3B82F6", pos: "top-6 -right-6" },
  { icon: "🤖", text: "AI analiz tamamlandı", sub: "Ahmet Y. • 2 dk", color: "#0D9488", pos: "-top-4 left-16" },
  { icon: "💰", text: "₺2.400 tahsilat", sub: "Kasa güncellendi", color: "#10B981", pos: "bottom-24 -right-8" },
  { icon: "💬", text: "WhatsApp gönderildi", sub: "3 hatırlatma", color: "#8B5CF6", pos: "bottom-6 left-4" },
];

const trustItems = ["Kredi kartı gerekmez", "15 gün ücretsiz", "Kurulum desteği dahil", "Çok dilli"];

export function HeroSection({ locale }: { locale: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [6, -6]), { stiffness: 80, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-6, 6]), { stiffness: 80, damping: 20 });

  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ background: "linear-gradient(150deg, #080F24 0%, #0C1A3D 45%, #0F2553 100%)" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - r.left - r.width / 2);
        mouseY.set(e.clientY - r.top - r.height / 2);
      }}
    >
      {/* Animated grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.07) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />

      {/* Glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(13,148,136,0.12) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-6"
              style={{ background: "rgba(59,130,246,0.1)", borderColor: "rgba(59,130,246,0.25)", color: "#93C5FD" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Klinik & Güzellik Merkezleri İçin SaaS Yazılım
            </motion.div>

            <h1 className="text-4xl sm:text-5xl xl:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight mb-6">
              Kliniğinizin Yönetimini{" "}
              <span className="relative">
                <span style={{ background: "linear-gradient(135deg, #60A5FA, #34D399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Bir Üst Seviyeye
                </span>
              </span>{" "}
              Taşıyın.
            </h1>

            <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "#94A3B8" }}>
              Dijivexa; randevu, hasta takibi, kasa, stok, operasyon ve WhatsApp iletişimini tek platformda birleştirir. AI destekli, çok dilli, çok şubeli.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link href={`/${locale}/demo`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl"
                style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)", boxShadow: "0 8px 24px rgba(37,99,235,0.4)" }}>
                Ücretsiz Deneyin <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={`/${locale}/iletisim`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl border transition-all hover:-translate-y-0.5"
                style={{ color: "#CBD5E1", borderColor: "rgba(148,163,184,0.2)", background: "rgba(255,255,255,0.05)" }}>
                Canlı Demo Talep Et
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {trustItems.map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-sm" style={{ color: "#64748B" }}>
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: "#34D399" }} />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: 3D Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: "1200px" }}
          >
            <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
              {/* Dashboard card */}
              <div className="rounded-2xl overflow-hidden border"
                style={{ background: "linear-gradient(135deg, rgba(15,37,83,0.97), rgba(8,15,36,0.99))", borderColor: "rgba(59,130,246,0.25)", boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.07)" }}>

                {/* Top bar */}
                <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(59,130,246,0.12)" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                      style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)" }}>D</div>
                    <div>
                      <p className="text-white text-xs font-semibold">Dijivexa Clinic</p>
                      <p className="text-xs" style={{ color: "#475569" }}>Genel Bakış</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5">
                    {[{ v: "24", l: "Randevu", c: "#3B82F6" }, { v: "₺14K", l: "Gelir", c: "#34D399" }, { v: "128", l: "Hasta", c: "#818CF8" }].map(s => (
                      <div key={s.l} className="text-center px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <p className="text-xs font-bold" style={{ color: s.c }}>{s.v}</p>
                        <p className="text-xs" style={{ color: "#475569" }}>{s.l}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chart area */}
                <div className="px-5 pt-4 pb-2">
                  <div className="flex items-end gap-1.5 h-16">
                    {[35, 55, 40, 70, 50, 85, 60, 90, 65, 78, 55, 95].map((h, i) => (
                      <motion.div key={i}
                        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                        transition={{ delay: 0.8 + i * 0.04, duration: 0.4, ease: "backOut" }}
                        className="flex-1 rounded-t-sm origin-bottom"
                        style={{ height: `${h}%`, background: i === 11 ? "linear-gradient(180deg,#3B82F6,#1D4ED8)" : `rgba(59,130,246,${0.15 + i * 0.02})` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Appointments */}
                <div className="px-5 pb-5 space-y-2">
                  {[
                    { name: "Ahmet Yılmaz", op: "Saç Ekimi FUE", time: "09:00", s: "Tamamlandı", c: "#34D399" },
                    { name: "Fatma Kaya", op: "PRP Seansı", time: "11:30", s: "Aktif", c: "#3B82F6" },
                    { name: "Mehmet Arslan", op: "Trikoloji", time: "14:00", s: "Bekliyor", c: "#FBBF24" },
                    { name: "Ayşe Demir", op: "Kontrol", time: "16:30", s: "Bekliyor", c: "#FBBF24" },
                  ].map((a) => (
                    <div key={a.name} className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                        style={{ background: `${a.c}18`, color: a.c }}>{a.name[0]}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white">{a.name}</p>
                        <p className="text-xs truncate" style={{ color: "#475569" }}>{a.op}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs" style={{ color: "#64748B" }}>{a.time}</p>
                        <p className="text-xs font-medium" style={{ color: a.c }}>{a.s}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating cards */}
              {floatingCards.map((card, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                  transition={{
                    opacity: { delay: 1 + i * 0.2, duration: 0.4 },
                    scale: { delay: 1 + i * 0.2, duration: 0.4, ease: "backOut" },
                    y: { delay: 1.4 + i * 0.2, duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className={`absolute ${card.pos} flex items-center gap-2.5 px-3 py-2.5 rounded-xl border z-10`}
                  style={{ background: "rgba(8,15,36,0.9)", backdropFilter: "blur(16px)", borderColor: `${card.color}35`, boxShadow: `0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px ${card.color}10` }}>
                  <span className="text-sm">{card.icon}</span>
                  <div>
                    <p className="text-white text-xs font-medium whitespace-nowrap">{card.text}</p>
                    <p className="text-xs whitespace-nowrap" style={{ color: "#64748B" }}>{card.sub}</p>
                  </div>
                  <span className="w-2 h-2 rounded-full shrink-0 animate-pulse" style={{ backgroundColor: card.color }} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #FFFFFF08)" }} />
    </section>
  );
}
