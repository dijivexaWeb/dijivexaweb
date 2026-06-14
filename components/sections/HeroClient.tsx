"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const floatingCards = [
  { icon: "💻", text: "Web projesi teslim edildi", sub: "Tbilisi müşterisi • dün", color: "#3B82F6", pos: "top-2 -right-4 lg:-right-10" },
  { icon: "🎨", text: "Logo tasarımı onaylandı", sub: "Grafik • az önce", color: "#22D3EE", pos: "-top-5 left-8" },
  { icon: "📱", text: "Instagram +2.4K takipçi", sub: "Sosyal medya • bu ay", color: "#34D399", pos: "bottom-16 -right-4 lg:-right-10" },
  { icon: "🚀", text: "Uygulama yayında", sub: "Batumi müşterisi", color: "#14B8A6", pos: "bottom-2 left-0" },
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
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [4, -4]), { stiffness: 60, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-4, 4]), { stiffness: 60, damping: 20 });

  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ background: "linear-gradient(150deg, #080F24 0%, #0C1A3D 50%, #0F2553 100%)" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - r.left - r.width / 2);
        mouseY.set(e.clientY - r.top - r.height / 2);
      }}
    >
      {/* Arka plan grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(59,130,246,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.06) 1px,transparent 1px)",
        backgroundSize: "64px 64px",
      }} />

      {/* Glow'lar */}
      <motion.div animate={{ scale: [1,1.2,1], opacity: [0.15,0.25,0.15] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/3 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 65%)" }} />
      <motion.div animate={{ scale: [1,1.15,1], opacity: [0.08,0.15,0.08] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 65%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ─── Sol: Metin ─── */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}>

            {/* Lokasyon badge */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-7"
              style={{ background: "rgba(34,211,238,0.07)", borderColor: "rgba(34,211,238,0.25)", color: "#67E8F9" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "0.06em" }}>41.6168° N, 41.6367° E</span>
              <span className="w-px h-3" style={{ background: "rgba(34,211,238,0.3)" }} />
              <span style={{ fontSize: "0.78rem", fontWeight: 500 }}>Batumi, Gürcistan</span>
            </motion.div>

            {/* H1 */}
            <h1 className="font-bold text-white leading-[1.08] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4rem)", fontFamily: "var(--font-jakarta, system-ui)" }}>
              {content.heading_line1}
              <br />
              <span style={{ background: "linear-gradient(130deg, #60A5FA 20%, #22D3EE 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {content.heading_highlight}
              </span>
              <br />
              {content.heading_line2}
            </h1>

            <p className="text-lg leading-relaxed mb-9 max-w-lg" style={{ color: "#94A3B8" }}>
              {content.subheading}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-9">
              <Link href={`/${locale}${content.cta_primary_href}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-white rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0"
                style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)", boxShadow: "0 8px 28px rgba(37,99,235,0.45)", fontFamily: "var(--font-jakarta, system-ui)" }}>
                {content.cta_primary} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={`/${locale}${content.cta_secondary_href}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold rounded-xl border transition-all hover:-translate-y-0.5 hover:border-cyan-500/40"
                style={{ color: "#CBD5E1", borderColor: "rgba(148,163,184,0.18)", background: "rgba(255,255,255,0.04)" }}>
                {content.cta_secondary}
              </Link>
            </div>

            {/* Trust items */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {content.trust_items.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "#64748B" }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#22D3EE", opacity: 0.8 }} />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ─── Sağ: Batumi Blueprint ─── */}
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 1, ease: [0.22,1,0.36,1] }} style={{ perspective: "1400px" }}>
            <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">

              {/* Ana kart */}
              <div className="rounded-2xl overflow-hidden border" style={{
                background: "linear-gradient(145deg, #0D1B3E 0%, #080F24 100%)",
                borderColor: "rgba(34,211,238,0.22)",
                boxShadow: "0 48px 96px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(34,211,238,0.06)",
              }}>
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: "rgba(34,211,238,0.1)" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: "linear-gradient(135deg, #2563EB, #22D3EE)" }}>D</div>
                    <span className="text-white text-xs font-semibold" style={{ fontFamily: "var(--font-jakarta, system-ui)" }}>dijivexa</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(34,211,238,0.1)", color: "#67E8F9", fontFamily: "monospace", fontSize: "0.65rem" }}>
                      GE · Batumi
                    </span>
                  </div>
                  <div style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "rgba(34,211,238,0.4)", letterSpacing: "0.05em" }}>41.61°N</div>
                </div>

                {/* Batumi Şehir Blueprint */}
                <div className="relative overflow-hidden" style={{ height: 240, background: "#060D1F" }}>
                  {/* Izgara arka plan */}
                  <div className="absolute inset-0" style={{
                    backgroundImage: "linear-gradient(rgba(34,211,238,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.05) 1px,transparent 1px)",
                    backgroundSize: "32px 32px",
                  }} />

                  {/* Şehir silueti — blueprint stili */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 240" preserveAspectRatio="xMidYMax meet" fill="none">
                    {/* Zemin / deniz kıyısı çizgisi */}
                    <line x1="0" y1="190" x2="480" y2="190" stroke="rgba(34,211,238,0.2)" strokeWidth="1" />

                    {/* Binalar — stroke çizgiler, net görünür */}
                    {[
                      { x: 18, y: 155, w: 28, h: 35 },
                      { x: 50, y: 140, w: 22, h: 50 },
                      { x: 76, y: 120, w: 30, h: 70 },
                      { x: 110, y: 100, w: 24, h: 90 },
                      { x: 138, y: 130, w: 32, h: 60 },
                      { x: 175, y: 85, w: 28, h: 105 },
                      { x: 207, y: 108, w: 20, h: 82 },
                      { x: 232, y: 70, w: 26, h: 120 },   // En yüksek
                      { x: 263, y: 95, w: 22, h: 95 },
                      { x: 290, y: 115, w: 35, h: 75 },
                      { x: 329, y: 135, w: 24, h: 55 },
                      { x: 358, y: 145, w: 28, h: 45 },
                      { x: 390, y: 148, w: 32, h: 42 },
                      { x: 426, y: 158, w: 22, h: 32 },
                      { x: 452, y: 162, w: 26, h: 28 },
                    ].filter(b => b.x !== undefined && b.y !== undefined).map((b, i) => (
                      <g key={i}>
                        <rect x={b.x} y={b.y} width={b.w} height={b.h}
                          stroke="rgba(34,211,238,0.35)" strokeWidth="1"
                          fill="rgba(34,211,238,0.05)" />
                        {/* Pencere ışıkları */}
                        {Array.from({ length: Math.floor(b.h / 18) }).map((_, row) =>
                          Array.from({ length: Math.floor(b.w / 10) }).map((_, col) => (
                            <motion.rect key={`${row}-${col}`}
                              x={b.x + 4 + col * 10} y={b.y + 6 + row * 16}
                              width="5" height="4" rx="0.5"
                              fill="#22D3EE"
                              animate={{ opacity: [0.25, 0.8, 0.25] }}
                              transition={{ duration: 2 + (i + row + col) * 0.3, repeat: Infinity, delay: (i + row + col) * 0.2 }}
                            />
                          ))
                        )}
                      </g>
                    ))}

                    {/* Karadeniz — dalgalı çizgiler */}
                    <path d="M0 195 Q60 192 120 196 Q180 200 240 195 Q300 190 360 194 Q420 198 480 194"
                      stroke="rgba(34,211,238,0.18)" strokeWidth="1.5" />
                    <path d="M0 205 Q80 202 160 206 Q240 210 320 205 Q400 200 480 204"
                      stroke="rgba(34,211,238,0.10)" strokeWidth="1" />

                    {/* Merkez referans noktası */}
                    <circle cx="240" cy="190" r="3" fill="#22D3EE" opacity="0.9" />
                    <motion.circle cx="240" cy="190" r="10"
                      animate={{ r: [8, 18, 8], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity }} stroke="#22D3EE" strokeWidth="1" />

                    {/* Yatay tarama çizgisi — blueprint efekti */}
                    <motion.line x1="0" x2="480" stroke="rgba(34,211,238,0.12)" strokeWidth="1"
                      animate={{ y1: [0, 240, 0], y2: [0, 240, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />
                  </svg>

                  {/* Koordinat overlay */}
                  <div className="absolute bottom-3 right-4 text-right"
                    style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "rgba(34,211,238,0.5)", lineHeight: 1.7, letterSpacing: "0.05em" }}>
                    41.6168° N<br />41.6367° E<br />
                    <span style={{ color: "rgba(34,211,238,0.3)" }}>Batumi · GEO</span>
                  </div>

                  {/* Sol üst — blueprint etiketi */}
                  <div className="absolute top-3 left-4"
                    style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "rgba(34,211,238,0.4)", letterSpacing: "0.08em" }}>
                    BATUMI_SKYLINE_v1.2
                  </div>
                </div>

                {/* Alt — İki Kol özeti */}
                <div className="grid grid-cols-2 gap-2 p-4">
                  <div className="rounded-xl p-3" style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(59,130,246,0.18)" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 rounded text-xs flex items-center justify-center"
                        style={{ background: "rgba(59,130,246,0.2)", color: "#60A5FA" }}>💻</span>
                      <span className="text-xs font-semibold" style={{ color: "#60A5FA", fontFamily: "var(--font-jakarta, system-ui)" }}>Yazılım</span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "#475569" }}>SaaS · Web · Mobil · AI</p>
                  </div>
                  <div className="rounded-xl p-3" style={{ background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.18)" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 rounded text-xs flex items-center justify-center"
                        style={{ background: "rgba(20,184,166,0.2)", color: "#2DD4BF" }}>🎨</span>
                      <span className="text-xs font-semibold" style={{ color: "#2DD4BF", fontFamily: "var(--font-jakarta, system-ui)" }}>Ajans</span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "#475569" }}>Sosyal · Grafik · Web</p>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              {floatingCards.map((card, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
                  transition={{
                    opacity: { delay: 1 + i * 0.15, duration: 0.4 },
                    scale: { delay: 1 + i * 0.15, duration: 0.4, ease: "backOut" },
                    y: { delay: 1.5 + i * 0.2, duration: 3.5 + i * 0.4, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className={`absolute ${card.pos} flex items-center gap-2.5 px-3 py-2.5 rounded-xl border z-10`}
                  style={{
                    background: "rgba(6,13,31,0.92)",
                    backdropFilter: "blur(16px)",
                    borderColor: `${card.color}30`,
                    boxShadow: `0 8px 28px rgba(0,0,0,0.5), 0 0 0 1px ${card.color}08`,
                    minWidth: 170,
                  }}>
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

      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(8,15,36,0.6))" }} />
    </section>
  );
}
