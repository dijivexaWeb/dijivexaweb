"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function FinalCTASection({ locale }: { locale: string }) {
  return (
    <section className="py-24 bg-[#0B172A] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/10 via-transparent to-[#38BDF8]/5 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Dijital sisteminizi bugün kurmaya başlayın.
          </h2>
          <p className="text-[#64748B] text-lg mb-10 max-w-xl mx-auto">
            Dijivexa&apos;yı 15 gün ücretsiz deneyin veya ekibimizden canlı demo talep edin.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/demo`}
              className="px-8 py-4 text-base font-semibold text-white bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl transition-all hover:shadow-xl hover:shadow-[#2563EB]/30 hover:-translate-y-0.5"
            >
              15 Gün Ücretsiz Dene
            </Link>
            <Link
              href={`/${locale}/iletisim`}
              className="px-8 py-4 text-base font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all"
            >
              Demo Talep Et
            </Link>
          </div>

          <p className="mt-6 text-[#64748B] text-sm">
            Kredi kartı gerekmez · Kurulum desteği dahil · 15 gün ücretsiz
          </p>
        </motion.div>
      </div>
    </section>
  );
}
