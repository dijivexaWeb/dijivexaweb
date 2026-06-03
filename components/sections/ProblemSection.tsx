"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

const problems = [
  "Hasta bilgileri WhatsApp'ta kalıyor.",
  "Randevular karışıyor, çift kayıt oluşuyor.",
  "Ödemeler manuel takip ediliyor.",
  "Seanslar ve kontroller unutuluyor.",
  "Stok tüketimi bilinmiyor.",
  "Personel süreci ölçülemiyor.",
  "Reklamdan gelen müşteri takip edilemiyor.",
  "Operasyon belgeleri kağıtta kalıyor.",
];

export function ProblemSection() {
  return (
    <section className="py-24 bg-[#07111F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Hasta, randevu, kasa ve stok takibi{" "}
            <span className="text-[#F59E0B]">dağınık mı?</span>
          </h2>
          <p className="text-[#64748B] max-w-xl mx-auto">
            Pek çok klinik hâlâ bu sorunlarla uğraşıyor. Dijivexa bunların hepsini çözer.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {problems.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/10 hover:border-red-500/20 transition-colors"
            >
              <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-[#94a3b8]">{p}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-6 rounded-2xl bg-gradient-to-r from-[#2563EB]/10 to-[#38BDF8]/10 border border-[#2563EB]/20"
        >
          <p className="text-white font-semibold text-lg">
            Dijivexa Clinic tüm klinik sürecini dijital hasta dosyasında toplar.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
