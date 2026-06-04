"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const COLORS = ["#2563EB", "#0D9488", "#8B5CF6", "#F59E0B", "#EF4444", "#10B981", "#06B6D4", "#EC4899"];

interface Testimonial {
  id: string; name: string; role: string; company: string;
  avatar_url: string; content: string; rating: number;
}

export function TestimonialsSectionClient({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;

  // Logo marquee için company listesi
  const logos = testimonials.map((t, i) => ({
    name: t.company,
    abbr: t.avatar_url || t.name.slice(0, 2).toUpperCase(),
    color: COLORS[i % COLORS.length],
  }));

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Başlık */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "#EFF6FF", color: "#1D4ED8" }}>
            Referanslar
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
            Yüzlerce klinik Dijivexa ile yönetiliyor.
          </h2>
          <p className="max-w-lg mx-auto" style={{ color: "#64748B" }}>
            Saç ekimi merkezlerinden estetik kliniklere, güzellik merkezlerinden trikoloji kliniklerine kadar.
          </p>
        </motion.div>

        {/* Logo marquee */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-16 relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, white, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, white, transparent)" }} />

          <div className="flex overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              className="flex gap-5 shrink-0"
            >
              {[...logos, ...logos].map((logo, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border shrink-0 hover:shadow-md transition-all"
                  style={{ borderColor: "#F1F5F9", background: "#FAFBFC", minWidth: "200px" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ background: `linear-gradient(135deg, ${logo.color}, ${logo.color}BB)` }}>
                    {logo.abbr}
                  </div>
                  <span className="text-sm font-semibold whitespace-nowrap" style={{ color: "#334155" }}>{logo.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Testimonial kartları */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => {
            const color = COLORS[i % COLORS.length];
            return (
              <motion.div key={t.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, borderColor: color + "30" }}
                className="flex flex-col p-6 rounded-2xl border bg-white hover:shadow-lg transition-all duration-300"
                style={{ borderColor: "#F1F5F9" }}
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current" style={{ color: "#FBBF24" }} />
                  ))}
                </div>

                <Quote className="w-6 h-6 mb-3" style={{ color: color + "60" }} />

                <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "#475569" }}>
                  &ldquo;{t.content}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "#F1F5F9" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ background: `linear-gradient(135deg, ${color}, ${color}AA)` }}>
                    {(t.avatar_url || t.name).slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#0F172A" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "#94A3B8" }}>{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Alt banner */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-12 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}>
          <p className="text-sm font-semibold" style={{ color: "#1E40AF" }}>
            ⭐ Ortalama 4.9/5 — 500&apos;den fazla klinik tarafından değerlendirildi
          </p>
          <p className="text-sm" style={{ color: "#3B82F6" }}>Siz de katılın →</p>
        </motion.div>
      </div>
    </section>
  );
}
