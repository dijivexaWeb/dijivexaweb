"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const modules = [
  { icon: "👤", label: "Hasta Yönetimi", desc: "Dijital hasta dosyası ve arşiv" },
  { icon: "📅", label: "Randevu Takvimi", desc: "Günlük/haftalık/aylık takvim" },
  { icon: "📋", label: "Muayene Formları", desc: "Trikoloji, epilasyon, PRP" },
  { icon: "🤖", label: "AI Klinik Asistan", desc: "Yapay zeka muayene özeti" },
  { icon: "🔬", label: "Operasyon Modülü", desc: "Saç ekimi operasyon takibi" },
  { icon: "💰", label: "Kasa & Ödeme", desc: "Tahsilat, taksit, kasa" },
  { icon: "📦", label: "Stok Yönetimi", desc: "Otomatik stok düşümü" },
  { icon: "💬", label: "WhatsApp Bildirimleri", desc: "Otomatik randevu hatırlatma" },
  { icon: "📊", label: "Seans Takibi", desc: "PRP, lazer, mezoterapi planı" },
  { icon: "📈", label: "Raporlama", desc: "Gelir, doluluk, personel" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function SolutionGridSection({ locale }: { locale: string }) {
  return (
    <section className="py-24 bg-[#0B172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Tüm klinik operasyonunuz tek sistemde.
          </h2>
          <p className="text-[#64748B] max-w-xl mx-auto">
            10 farklı modül, tek panel, sıfır karmaşa.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {modules.map((m) => (
            <motion.div
              key={m.label}
              variants={item}
              whileHover={{ y: -4, scale: 1.02 }}
              className="p-5 rounded-2xl bg-[#07111F] border border-[#1e2d45] hover:border-[#2563EB]/40 hover:shadow-lg hover:shadow-[#2563EB]/10 transition-all cursor-pointer group"
            >
              <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">{m.icon}</span>
              <p className="text-white text-sm font-semibold mb-1">{m.label}</p>
              <p className="text-[#64748B] text-xs leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href={`/${locale}/dijivexa-clinic`}
            className="inline-flex items-center gap-2 px-6 py-3 text-[#2563EB] border border-[#2563EB]/30 hover:bg-[#2563EB]/10 rounded-xl transition-colors text-sm font-medium"
          >
            Dijivexa Clinic&apos;i İncele →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
