"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const COLORS = ["#3B82F6","#0D9488","#8B5CF6","#06B6D4","#10B981","#F59E0B","#EF4444","#22C55E","#F97316","#6366F1"];

interface Module { id: string; slug: string; name: string; short_description: string; icon: string; cta_href: string; }

export function SolutionGridClient({ modules, locale }: { modules: Module[]; locale: string }) {
  if (!modules.length) return null;

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "#EFF6FF", color: "#1D4ED8" }}>Çözüm</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>Tüm klinik operasyonunuz tek sistemde.</h2>
          <p className="max-w-lg mx-auto" style={{ color: "#64748B" }}>{modules.length} modül, tek panel — sıfır karmaşa.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {modules.map((m, i) => {
            const color = COLORS[i % COLORS.length];
            return (
              <motion.div key={m.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                whileHover={{ y: -5 }}
                className="flex flex-col p-5 rounded-2xl border bg-white hover:shadow-lg transition-all cursor-pointer"
                style={{ borderColor: "#F1F5F9" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
                  style={{ background: color + "12" }}>
                  {m.icon || "⚙️"}
                </div>
                <p className="text-sm font-semibold mb-1" style={{ color: "#0F172A" }}>{m.name}</p>
                <p className="text-xs leading-relaxed" style={{ color: "#94A3B8" }}>{m.short_description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10">
          <Link href={`/${locale}/dijivexa-clinic`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border transition-all hover:-translate-y-0.5"
            style={{ color: "#2563EB", borderColor: "#BFDBFE", background: "#EFF6FF" }}>
            Dijivexa Clinic&apos;i İncele →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
