"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { value: 40, suffix: "+", label: "Aktif Müşteri", sub: "Batumi & Türkiye" },
  { value: 4, suffix: "", label: "Dil Desteği", sub: "TR · EN · KA · RU" },
  { value: 3, suffix: "", label: "Yıl Deneyim", sub: "Yazılım & Ajans" },
  { value: 100, suffix: "+", label: "Teslim Edilen Proje", sub: "Web · Mobil · SaaS" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const ref = useRef(false);

  return (
    <motion.span
      onViewportEnter={() => {
        if (!ref.current) {
          ref.current = true;
          animate(count, value, { duration: 1.8, ease: "easeOut" });
        }
      }}
    >
      <motion.span>{rounded}</motion.span>{suffix}
    </motion.span>
  );
}

export function CompanyStatsSection() {
  return (
    <section className="py-20 lg:py-28" style={{ background: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center">
              <div className="text-4xl sm:text-5xl font-bold mb-2 tabular-nums"
                style={{ color: "#0F172A", fontFamily: "var(--font-jakarta, system-ui)" }}>
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-base font-semibold mb-1" style={{ color: "#1E293B" }}>{s.label}</div>
              <div className="text-sm" style={{ color: "#94A3B8" }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
