"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";

const steps = [
  { num: "01", title: "Bilgilerini gir", desc: "Klinik veya işletme bilgilerini forma gir. 2 dakika sürer.", icon: "📝" },
  { num: "02", title: "Demo hesabın açılır", desc: "Dijivexa Clinic paneliniz otomatik kurulur, giriş bilgileri gönderilir.", icon: "🚀" },
  { num: "03", title: "15 gün test et", desc: "Tüm modülleri gerçek verilerle dene. Ücret veya kart gerekmez.", icon: "✅" },
];

export function DemoProcessSection({ locale }: { locale: string }) {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(150deg, #050D1A 0%, #0A1628 55%, #0D1E35 100%)" }}>
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.2) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="gsap-reveal text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">15 gün ücretsiz deneyin.</h2>
          <p className="max-w-lg mx-auto" style={{ color: "#94A3B8" }}>3 adımda demo hesabınız hazır.</p>
        </div>

        <div className="gsap-stagger grid md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="gsap-item relative flex flex-col items-center text-center p-8 rounded-2xl border"
              style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(59,130,246,0.15)", backdropFilter: "blur(12px)" }}
              whileHover={{ scale: 1.02, borderColor: "rgba(59,130,246,0.35)" }}
            >
              {i < 2 && (
                <div className="hidden md:block absolute top-12 -right-3 text-gray-600 text-xl z-10">→</div>
              )}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
                style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(59,130,246,0.2)" }}>
                {step.icon}
              </div>
              <span className="text-xs font-bold mb-2" style={{ color: "#3B82F6" }}>Adım {step.num}</span>
              <h3 className="text-white font-semibold text-lg mb-3">{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="gsap-reveal flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={`/${locale}/demo`}
            className="px-8 py-4 text-base font-semibold text-white rounded-xl transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)", boxShadow: "0 8px 24px rgba(37,99,235,0.4)" }}>
            Ücretsiz Demo Başlat
          </Link>
          <p className="text-sm" style={{ color: "#64748B" }}>Kredi kartı gerekmez · Kurulum desteği dahil</p>
        </div>
      </div>
    </section>
  );
}
