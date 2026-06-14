"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";

const floatingCards = [
  { icon: "🚀", text: "Web projesi teslim edildi", sub: "Tbilisi • dün 14:30", color: "#3B82F6", pos: "top-2 -right-2 lg:-right-8" },
  { icon: "📈", text: "Instagram +847 takipçi", sub: "Ajans kampanyası • bugün", color: "#22D3EE", pos: "-top-6 left-6 lg:left-12" },
  { icon: "💊", text: "Randevu onaylandı", sub: "Dijivexa Clinic • şimdi", color: "#34D399", pos: "bottom-20 -right-2 lg:-right-8" },
  { icon: "🎨", text: "Logo versiyonu onaylandı", sub: "Grafik • 2 saat önce", color: "#A78BFA", pos: "bottom-2 left-0 lg:-left-4" },
];

const clinicStats = [
  { label: "Hasta", value: "128", color: "#3B82F6" },
  { label: "Gelir", value: "₺14K", color: "#34D399" },
  { label: "Randevu", value: "24", color: "#A78BFA" },
];

const agencyStats = [
  { label: "Takipçi", value: "+2.4K", color: "#22D3EE" },
  { label: "İçerik", value: "18", color: "#34D399" },
  { label: "Reklam", value: "x3.2", color: "#F59E0B" },
];

const activity = [
  { icon: "⚡", text: "Web projesi GitHub'a push edildi", time: "az önce", dot: "#3B82F6" },
  { icon: "📊", text: "Dijivexa Clinic: yeni hasta kaydı", time: "3 dk", dot: "#34D399" },
  { icon: "🎯", text: "Meta Ads kampanyası optimize edildi", time: "12 dk", dot: "#22D3EE" },
  { icon: "✅", text: "Logo final versiyonu onaylandı", time: "1 saat", dot: "#A78BFA" },
];

interface HeroContent {
  heading_line1: string;
  heading_highlight: string;
  heading_line2: string;
  subheading: string;
  cta_primary: string;
  cta_primary_href: string;
  cta_secondary: string;
  cta_secondary_href: string;
  trust_items: string[];
}

export function HeroClient({ locale, content }: { locale: string; content: HeroContent }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [3, -3]), { stiffness: 50, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-3, 3]), { stiffness: 50, damping: 20 });

  return (
    <section
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      style={{ background: "linear-gradient(150deg, #080F24 0%, #0C1A3D 55%, #0A1830 100%)" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - r.left - r.width / 2);
        mouseY.set(e.clientY - r.top - r.height / 2);
      }}
    >
      {/* Grid arka plan */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(59,130,246,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.05) 1px,transparent 1px)",
        backgroundSize: "72px 72px",
      }} />

      {/* Glow efektleri */}
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute pointer-events-none rounded-full"
        style={{ top: "15%", left: "30%", width: 800, height: 800, background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 65%)" }} />
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.07, 0.14, 0.07] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute pointer-events-none rounded-full"
        style={{ bottom: "20%", right: "25%", width: 500, height: 500, background: "radial-gradient(circle, rgba(34,211,238,0.14) 0%, transparent 65%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ─── Sol ─── */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>

            {/* Lokasyon badge — şirket ismi DEĞİL, konum */}
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-7"
              style={{ background: "rgba(34,211,238,0.07)", borderColor: "rgba(34,211,238,0.22)", color: "#67E8F9" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#22D3EE" }} />
              <span style={{ fontSize: "0.78rem" }}>📍 Batumi, Gürcistan</span>
              <span className="w-px h-3" style={{ background: "rgba(34,211,238,0.3)" }} />
              <span style={{ fontFamily: "monospace", fontSize: "0.68rem", letterSpacing: "0.05em", color: "rgba(103,232,249,0.7)" }}>41.61°N 41.63°E</span>
            </motion.div>

            {/* H1 */}
            <h1 className="font-bold text-white leading-[1.08] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 4.2rem)", fontFamily: "var(--font-jakarta, system-ui)" }}>
              {content.heading_line1}
              <br />
              <span style={{
                background: "linear-gradient(130deg, #60A5FA 10%, #22D3EE 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                {content.heading_highlight}
              </span>
              <br />
              {content.heading_line2}
            </h1>

            <p className="text-lg leading-relaxed mb-9 max-w-lg" style={{ color: "#94A3B8" }}>
              {content.subheading}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-9">
              <Link href={`/${locale}${content.cta_primary_href}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-white rounded-xl transition-all hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
                  boxShadow: "0 8px 32px rgba(37,99,235,0.45), 0 0 0 1px rgba(59,130,246,0.3)",
                  fontFamily: "var(--font-jakarta, system-ui)",
                }}>
                {content.cta_primary} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={`/${locale}${content.cta_secondary_href}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold rounded-xl border transition-all hover:-translate-y-0.5 hover:border-white/30"
                style={{ color: "#CBD5E1", borderColor: "rgba(148,163,184,0.15)", background: "rgba(255,255,255,0.03)" }}>
                {content.cta_secondary}
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {content.trust_items.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "#475569" }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#22D3EE", opacity: 0.7 }} />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ─── Sağ: Canlı Dashboard ─── */}
          <motion.div initial={{ opacity: 0, scale: 0.88, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: "1400px" }}>
            <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">

              {/* Ana dashboard kartı */}
              <div className="rounded-2xl overflow-hidden border" style={{
                background: "linear-gradient(145deg, #0B1A38 0%, #080F24 100%)",
                borderColor: "rgba(59,130,246,0.2)",
                boxShadow: "0 48px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(59,130,246,0.08)",
              }}>

                {/* Header bar */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: "rgba(59,130,246,0.1)" }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: "linear-gradient(135deg, #2563EB, #22D3EE)" }}>D</div>
                    <div>
                      <span className="text-white text-xs font-bold" style={{ fontFamily: "var(--font-jakarta, system-ui)" }}>dijivexa</span>
                      <span className="text-xs ml-2 px-1.5 py-0.5 rounded" style={{ background: "rgba(34,211,238,0.1)", color: "#67E8F9", fontSize: "0.6rem" }}>CANLI</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#34D399" }} />
                    <span style={{ fontSize: "0.65rem", color: "#64748B" }}>Batumi, GE</span>
                  </div>
                </div>

                {/* İki kol özeti */}
                <div className="grid grid-cols-2 gap-0" style={{ borderBottom: "1px solid rgba(59,130,246,0.08)" }}>
                  {/* Yazılım */}
                  <div className="px-4 py-4" style={{ borderRight: "1px solid rgba(59,130,246,0.08)" }}>
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-sm">💻</span>
                      <span className="text-xs font-semibold" style={{ color: "#60A5FA" }}>Yazılım</span>
                    </div>
                    <div className="space-y-2">
                      {clinicStats.map((s) => (
                        <div key={s.label} className="flex items-center justify-between">
                          <span className="text-xs" style={{ color: "#64748B" }}>{s.label}</span>
                          <motion.span className="text-xs font-bold" style={{ color: s.color }}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                            {s.value}
                          </motion.span>
                        </div>
                      ))}
                    </div>
                    {/* Mini bar chart */}
                    <div className="flex items-end gap-1 mt-3" style={{ height: 28 }}>
                      {[30, 55, 40, 70, 45, 85, 60, 90].map((h, i) => (
                        <motion.div key={i} className="flex-1 rounded-t-sm origin-bottom"
                          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                          transition={{ delay: 1.4 + i * 0.06, duration: 0.4, ease: "backOut" }}
                          style={{ height: `${h}%`, background: i === 7 ? "#3B82F6" : `rgba(59,130,246,${0.12 + i * 0.04})` }} />
                      ))}
                    </div>
                  </div>

                  {/* Ajans */}
                  <div className="px-4 py-4">
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-sm">🎨</span>
                      <span className="text-xs font-semibold" style={{ color: "#2DD4BF" }}>Ajans</span>
                    </div>
                    <div className="space-y-2">
                      {agencyStats.map((s) => (
                        <div key={s.label} className="flex items-center justify-between">
                          <span className="text-xs" style={{ color: "#64748B" }}>{s.label}</span>
                          <motion.span className="text-xs font-bold" style={{ color: s.color }}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
                            {s.value}
                          </motion.span>
                        </div>
                      ))}
                    </div>
                    {/* Trend line */}
                    <div className="mt-3 relative" style={{ height: 28 }}>
                      <svg className="w-full h-full" viewBox="0 0 100 28" preserveAspectRatio="none">
                        <motion.polyline
                          points="0,22 15,18 30,20 45,14 60,10 75,7 85,5 100,2"
                          fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ delay: 1.6, duration: 1.2, ease: "easeOut" }}
                        />
                        <motion.circle cx="100" cy="2" r="2.5" fill="#22D3EE"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }} />
                      </svg>
                      <div className="absolute top-0 right-0 flex items-center gap-1"
                        style={{ transform: "translateY(-2px)" }}>
                        <TrendingUp className="w-3 h-3" style={{ color: "#22D3EE" }} />
                        <span style={{ fontSize: "0.6rem", color: "#22D3EE" }}>+32%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Canlı aktivite feed */}
                <div className="px-4 py-3">
                  <p className="text-xs mb-2.5" style={{ color: "#334155", fontFamily: "monospace", letterSpacing: "0.05em" }}>
                    — son aktivite —
                  </p>
                  <div className="space-y-2">
                    {activity.map((a, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.8 + i * 0.15, duration: 0.4 }}
                        className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: a.dot }} />
                        <span className="text-xs flex-1 truncate" style={{ color: "#475569" }}>{a.text}</span>
                        <span className="text-xs shrink-0" style={{ color: "#334155" }}>{a.time}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              {floatingCards.map((card, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
                  transition={{
                    opacity: { delay: 2 + i * 0.15, duration: 0.4 },
                    scale: { delay: 2 + i * 0.15, duration: 0.4, ease: "backOut" },
                    y: { delay: 2.5 + i * 0.2, duration: 3.5 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className={`absolute ${card.pos} flex items-center gap-2.5 px-3 py-2.5 rounded-xl border z-10`}
                  style={{
                    background: "rgba(6,13,31,0.92)",
                    backdropFilter: "blur(20px)",
                    borderColor: `${card.color}28`,
                    boxShadow: `0 8px 28px rgba(0,0,0,0.5), 0 0 0 1px ${card.color}0c`,
                    minWidth: 180,
                  }}>
                  <span className="text-sm">{card.icon}</span>
                  <div>
                    <p className="text-white text-xs font-medium whitespace-nowrap">{card.text}</p>
                    <p className="text-xs whitespace-nowrap" style={{ color: "#475569" }}>{card.sub}</p>
                  </div>
                  <span className="w-2 h-2 rounded-full shrink-0 animate-pulse" style={{ backgroundColor: card.color }} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(8,15,36,0.5))" }} />
    </section>
  );
}
