"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function FinalCTASection({ locale }: { locale: string }) {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(150deg, #050D1A 0%, #0A1628 50%, #0D1E35 100%)" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full opacity-20"
          style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.5) 0%, transparent 70%)" }} />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Dijital sisteminizi bugün kurmaya başlayın.
          </h2>
          <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: "#94A3B8" }}>
            15 gün ücretsiz deneyin veya ekibimizden canlı demo talep edin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/demo`}
              className="px-8 py-4 text-base font-semibold text-white rounded-xl transition-all hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)", boxShadow: "0 12px 32px rgba(37,99,235,0.45)" }}>
              15 Gün Ücretsiz Dene
            </Link>
            <Link href={`/${locale}/iletisim`}
              className="px-8 py-4 text-base font-semibold rounded-xl border transition-all hover:-translate-y-1"
              style={{ color: "#CBD5E1", borderColor: "rgba(148,163,184,0.2)", background: "rgba(255,255,255,0.04)" }}>
              Demo Talep Et
            </Link>
          </div>
          <p className="mt-6 text-sm" style={{ color: "#475569" }}>
            Kredi kartı gerekmez · Kurulum desteği dahil · 15 gün ücretsiz
          </p>
        </motion.div>
      </div>
    </section>
  );
}
