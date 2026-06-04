"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface Stat { value: number; suffix: string; label: string; icon: string; }

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current * 10) / 10);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {target >= 1000
        ? count >= 1000000
          ? `${(count / 1000000).toFixed(1)}M`
          : count >= 1000
          ? `${Math.floor(count / 1000)}K`
          : Math.floor(count)
        : count}
      {suffix}
    </span>
  );
}

export function StatsClient({ stats }: { stats: Stat[] }) {
  return (
    <section className="py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0F2553 0%, #1A3A6B 50%, #112B60 100%)" }}>
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.3) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl border"
              style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(59,130,246,0.2)" }}
            >
              <span className="text-3xl mb-3">{s.icon}</span>
              <p className="text-3xl sm:text-4xl font-bold text-white mb-1">
                <Counter target={s.value} suffix={s.suffix} />
              </p>
              <p className="text-sm" style={{ color: "#94A3B8" }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
