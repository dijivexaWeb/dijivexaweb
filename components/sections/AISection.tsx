"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { AlertTriangle, Sparkles } from "lucide-react";

const features = [
  "Muayene özetini otomatik oluşturur",
  "Risk bilgilerini görünür kılar",
  "Tedavi önerisi taslağı hazırlar",
  "Doktor notlarını düzenler",
  "Kliniğe özel API key desteği",
];

export function AISection({ locale }: { locale: string }) {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(150deg, #0C1A3D 0%, #0F2553 50%, #1A3A6B 100%)" }}>
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.2) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.5) 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: 3D Robot Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: -40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <div className="relative w-72 h-72">
              {/* Rotating rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed"
                style={{ borderColor: "rgba(59,130,246,0.2)" }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-full border"
                style={{ borderColor: "rgba(99,102,241,0.25)" }}
              />

              {/* Center glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-36 h-36 rounded-full flex items-center justify-center"
                  style={{ background: "radial-gradient(circle, rgba(37,99,235,0.25) 0%, rgba(99,102,241,0.1) 60%, transparent 100%)" }}
                >
                  <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl"
                    style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.3), rgba(99,102,241,0.3))", border: "1px solid rgba(99,102,241,0.4)" }}>
                    🤖
                  </div>
                </motion.div>
              </div>

              {/* Orbiting dots */}
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <motion.div
                  key={deg}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: deg / 360 * 8 }}
                  className="absolute inset-0"
                  style={{ transformOrigin: "50% 50%" }}
                >
                  <div className="absolute w-2.5 h-2.5 rounded-full"
                    style={{
                      background: `hsl(${deg + 220}, 80%, 65%)`,
                      top: "calc(50% - 136px)",
                      left: "calc(50% - 5px)",
                      transform: `rotate(${deg}deg) translateY(136px)`,
                      boxShadow: `0 0 8px hsl(${deg + 220}, 80%, 65%)`,
                    }}
                  />
                </motion.div>
              ))}

              {/* Floating badges */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
                className="absolute -right-4 top-8 px-3 py-1.5 rounded-full text-xs font-semibold border"
                style={{ background: "rgba(13,148,136,0.15)", borderColor: "rgba(45,212,191,0.3)", color: "#2DD4BF", backdropFilter: "blur(10px)" }}>
                ✓ Analiz Hazır
              </motion.div>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -left-4 bottom-12 px-3 py-1.5 rounded-full text-xs font-semibold border"
                style={{ background: "rgba(99,102,241,0.15)", borderColor: "rgba(129,140,248,0.3)", color: "#A5B4FC", backdropFilter: "blur(10px)" }}>
                🧬 Gemini Pro
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <div className="gsap-reveal-right">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-5"
              style={{ background: "rgba(99,102,241,0.1)", borderColor: "rgba(99,102,241,0.25)", color: "#A5B4FC" }}>
              <Sparkles className="w-3.5 h-3.5" /> AI Asistanımız Her Zaman Yanınızda
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              AI destekli klinik değerlendirme.
            </h2>
            <p className="leading-relaxed mb-8" style={{ color: "#94A3B8" }}>
              Muayene formundaki bilgileri analiz ederek klinik özet, takip notu ve tedavi önerisi taslağı oluşturur. Ekibiniz daha düzenli çalışır.
            </p>

            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm" style={{ color: "#CBD5E1" }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs"
                    style={{ background: "rgba(45,212,191,0.15)", color: "#2DD4BF" }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex items-start gap-2.5 p-4 rounded-xl mb-6"
              style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)" }}>
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#FCD34D" }} />
              <p className="text-xs leading-relaxed" style={{ color: "#94A3B8" }}>
                Nihai karar klinik ekibine aittir. AI asistan yardımcı olur, karar vermez.
              </p>
            </div>

            <Link href={`/${locale}/ai-klinik-asistani`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
              style={{ background: "rgba(99,102,241,0.15)", color: "#A5B4FC", border: "1px solid rgba(99,102,241,0.25)" }}>
              AI Klinik Asistanı İncele →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
