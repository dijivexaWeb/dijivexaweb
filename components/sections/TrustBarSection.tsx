"use client";

import { motion } from "framer-motion";

const targets = [
  { icon: "💇", label: "Saç Ekimi Merkezleri" },
  { icon: "✨", label: "Estetik Klinikleri" },
  { icon: "💅", label: "Güzellik Merkezleri" },
  { icon: "⚡", label: "Lazer Epilasyon" },
  { icon: "🔬", label: "Trikoloji Merkezleri" },
  { icon: "🏢", label: "Yerel İşletmeler" },
];

export function TrustBarSection() {
  return (
    <section className="py-16 bg-[#07111F] border-y border-[#1e2d45]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-sm text-[#64748B] mb-8 font-medium uppercase tracking-wider">
          Klinik, güzellik ve hizmet işletmeleri için geliştirildi
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {targets.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#0B172A] border border-[#1e2d45] hover:border-[#2563EB]/40 transition-colors group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{t.icon}</span>
              <span className="text-xs text-[#64748B] text-center leading-tight">{t.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
