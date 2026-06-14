"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const floatingCards = [
  { icon: "💻", text: "Web projesi teslim edildi", sub: "Tbilisi müşterisi • dün", color: "#3B82F6", pos: "top-4 -right-8 lg:-right-12" },
  { icon: "📊", text: "Dijivexa Clinic: 128 hasta", sub: "Batumi Kliniği • aktif", color: "#14B8A6", pos: "-top-6 left-12" },
  { icon: "📱", text: "Instagram +2.4K takipçi", sub: "Sosyal medya • bu ay", color: "#22D3EE", pos: "bottom-20 -right-8 lg:-right-12" },
  { icon: "🎨", text: "Logo tasarımı onaylandı", sub: "Grafik • az önce", color: "#34D399", pos: "bottom-4 left-2" },
];

interface HeroContent {
  badge: string;
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
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), { stiffness: 80, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), { stiffness: 80, damping: 20 });

  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden section-hero"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - r.left - r.width / 2);
        mouseY.set(e.clientY - r.top - r.height / 2);
      }}
    >
      {/* Grid arka plan */}
      <div className="absolute inset-0 pointer-events-none grid-dark" />

      {/* Glow efektleri */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ─── Sol: Tipografi ─── */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Lokasyon Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="badge-batumi mb-6"
            >
              <span>41.6168° N, 41.6367° E</span>
              <span className="w-px h-3" style={{ background: "rgba(34,211,238,0.3)" }} />
              <span style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.01em" }}>
                Batumi, Gürcistan
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "#22D3EE" }}
              />
            </motion.div>

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl xl:text-[3.75rem] font-bold text-white leading-[1.1] tracking-tight mb-6">
              {content.heading_line1}
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #60A5FA 0%, #22D3EE 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {content.heading_highlight}
              </span>
              <br />
              {content.heading_line2}
            </h1>

            {/* Subheading */}
            <p
              className="text-lg leading-relaxed mb-8 max-w-xl"
              style={{ color: "#94A3B8" }}
            >
              {content.subheading}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link
                href={`/${locale}${content.cta_primary_href}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #2563EB, #3B82F6)",
                  boxShadow: "0 8px 24px rgba(37,99,235,0.4)",
                  fontFamily: "var(--font-jakarta)",
                }}
              >
                {content.cta_primary} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/${locale}${content.cta_secondary_href}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl border transition-all hover:-translate-y-0.5"
                style={{
                  color: "#CBD5E1",
                  borderColor: "rgba(148,163,184,0.2)",
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                {content.cta_secondary}
              </Link>
            </div>

            {/* Trust items */}
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {content.trust_items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 text-sm font-mono"
                  style={{ color: "#64748B" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "#22D3EE", opacity: 0.7 }}
                  />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ─── Sağ: Batumi City Grid + Floating Cards ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: "1200px" }}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative"
            >
              {/* Batumi City Grid Card */}
              <div
                className="rounded-2xl overflow-hidden border relative"
                style={{
                  background: "linear-gradient(135deg, rgba(13,27,62,0.97), rgba(8,15,36,0.99))",
                  borderColor: "rgba(34,211,238,0.18)",
                  boxShadow:
                    "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
                  minHeight: 380,
                }}
              >
                {/* Header */}
                <div
                  className="px-5 py-4 border-b flex items-center justify-between"
                  style={{ borderColor: "rgba(34,211,238,0.1)" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                      style={{ background: "linear-gradient(135deg, #2563EB, #22D3EE)" }}
                    >
                      D
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold" style={{ fontFamily: "var(--font-jakarta)" }}>
                        Dijivexa
                      </p>
                      <p className="text-xs font-mono" style={{ color: "#22D3EE", opacity: 0.7 }}>
                        Batumi, GE
                      </p>
                    </div>
                  </div>
                  <div className="font-mono text-xs" style={{ color: "rgba(34,211,238,0.5)" }}>
                    41.6168° N
                  </div>
                </div>

                {/* City Grid Visualization */}
                <div className="relative" style={{ height: 220 }}>
                  {/* Grid pattern */}
                  <div className="absolute inset-0 grid-batumi opacity-70" />

                  {/* City building silhouettes (geometric) */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 400 220"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {/* Arka plan binalar */}
                    <rect x="20" y="120" width="30" height="100" fill="rgba(34,211,238,0.06)" />
                    <rect x="55" y="100" width="22" height="120" fill="rgba(34,211,238,0.08)" />
                    <rect x="82" y="80" width="28" height="140" fill="rgba(34,211,238,0.06)" />
                    <rect x="115" y="60" width="20" height="160" fill="rgba(34,211,238,0.10)" />
                    <rect x="140" y="90" width="35" height="130" fill="rgba(34,211,238,0.07)" />
                    <rect x="180" y="50" width="25" height="170" fill="rgba(34,211,238,0.12)" />
                    <rect x="210" y="75" width="30" height="145" fill="rgba(34,211,238,0.08)" />
                    <rect x="245" y="110" width="20" height="110" fill="rgba(34,211,238,0.06)" />
                    <rect x="270" y="85" width="28" height="135" fill="rgba(34,211,238,0.09)" />
                    <rect x="303" y="65" width="22" height="155" fill="rgba(34,211,238,0.11)" />
                    <rect x="330" y="95" width="35" height="125" fill="rgba(34,211,238,0.07)" />
                    <rect x="370" y="115" width="25" height="105" fill="rgba(34,211,238,0.06)" />

                    {/* Deniz çizgisi */}
                    <path d="M0 200 Q100 195 200 198 Q300 202 400 197 L400 220 L0 220 Z" fill="rgba(34,211,238,0.08)" />
                    <path d="M0 200 Q100 195 200 198 Q300 202 400 197" stroke="rgba(34,211,238,0.25)" strokeWidth="1" fill="none" />

                    {/* Şehir ışıkları — window'lar */}
                    {[
                      [130, 70], [130, 85], [135, 70], [135, 85],
                      [185, 60], [185, 75], [190, 60], [190, 75],
                      [315, 75], [315, 90], [320, 75], [320, 90],
                    ].map(([cx, cy], i) => (
                      <motion.rect
                        key={i}
                        x={cx} y={cy} width="4" height="3"
                        fill="#22D3EE"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 2 + i * 0.3,
                          repeat: Infinity,
                          delay: i * 0.4,
                          ease: "easeInOut",
                        }}
                      />
                    ))}

                    {/* Merkez nokta — şehir kalbi */}
                    <motion.circle
                      cx="195" cy="130"
                      animate={{ r: [4, 6, 4], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      fill="#22D3EE"
                    />
                    <circle cx="195" cy="130" r="12" fill="rgba(34,211,238,0.15)" />
                    <circle cx="195" cy="130" r="20" fill="rgba(34,211,238,0.06)" />
                  </svg>

                  {/* Koordinat overlay */}
                  <div
                    className="absolute bottom-3 right-4 text-right font-mono"
                    style={{ color: "rgba(34,211,238,0.45)", fontSize: "0.65rem", lineHeight: 1.6 }}
                  >
                    41.6168° N<br />
                    41.6367° E<br />
                    <span style={{ color: "rgba(34,211,238,0.3)" }}>Batumi, GE</span>
                  </div>
                </div>

                {/* İki pillar göstergesi */}
                <div
                  className="px-5 py-4 grid grid-cols-2 gap-3 border-t"
                  style={{ borderColor: "rgba(34,211,238,0.08)" }}
                >
                  <div
                    className="rounded-xl px-3 py-2.5"
                    style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(59,130,246,0.15)" }}
                  >
                    <p className="text-xs font-semibold" style={{ color: "#60A5FA", fontFamily: "var(--font-jakarta)" }}>
                      Yazılım
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
                      SaaS · Web · Mobil · AI
                    </p>
                  </div>
                  <div
                    className="rounded-xl px-3 py-2.5"
                    style={{ background: "rgba(13,148,136,0.1)", border: "1px solid rgba(20,184,166,0.15)" }}
                  >
                    <p className="text-xs font-semibold" style={{ color: "#2DD4BF", fontFamily: "var(--font-jakarta)" }}>
                      Ajans
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
                      Sosyal · Grafik · Web
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              {floatingCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -8, 0],
                  }}
                  transition={{
                    opacity: { delay: 1 + i * 0.2, duration: 0.4 },
                    scale: { delay: 1 + i * 0.2, duration: 0.4, ease: "backOut" },
                    y: { delay: 1.4 + i * 0.2, duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className={`absolute ${card.pos} flex items-center gap-2.5 px-3 py-2.5 rounded-xl border z-10`}
                  style={{
                    background: "rgba(8,15,36,0.9)",
                    backdropFilter: "blur(16px)",
                    borderColor: `${card.color}35`,
                    boxShadow: `0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px ${card.color}10`,
                  }}
                >
                  <span className="text-sm">{card.icon}</span>
                  <div>
                    <p className="text-white text-xs font-medium whitespace-nowrap">{card.text}</p>
                    <p className="text-xs whitespace-nowrap" style={{ color: "#64748B" }}>{card.sub}</p>
                  </div>
                  <span
                    className="w-2 h-2 rounded-full shrink-0 animate-pulse"
                    style={{ backgroundColor: card.color }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(8,15,36,0.4))" }}
      />
    </section>
  );
}
