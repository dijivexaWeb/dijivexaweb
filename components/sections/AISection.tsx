"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { Bot, AlertTriangle, Cpu } from "lucide-react";

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
      style={{ background: "linear-gradient(150deg, #050D1A 0%, #0A1628 60%, #0D1E35 100%)" }}>
      {/* Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.2) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: 3D AI card */}
          <motion.div
            initial={{ opacity: 0, rotateY: 15, x: -40 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: "1000px" }}
            className="gsap-reveal-left"
          >
            <div className="rounded-2xl p-6 border relative"
              style={{ background: "rgba(15,32,68,0.6)", backdropFilter: "blur(20px)", borderColor: "rgba(59,130,246,0.2)", boxShadow: "0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)" }}>

              <div className="flex items-center gap-3 mb-5 pb-4 border-b" style={{ borderColor: "rgba(59,130,246,0.1)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.3), rgba(13,148,136,0.3))" }}>
                  <Bot className="w-5 h-5" style={{ color: "#93C5FD" }} />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">AI Klinik Değerlendirme</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Cpu className="w-3 h-3" style={{ color: "#2DD4BF" }} />
                    <p className="text-xs" style={{ color: "#2DD4BF" }}>Gemini Pro · işleniyor...</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Hasta", value: "Ahmet Y. · 34 yaş · Erkek" },
                  { label: "Tanı", value: "Norwood Evre III — saç çizgisi belirgin gerileme" },
                  { label: "AI Özet", value: "Hasta FUE tekniğine uygun, donör alan yeterli. Beklenti gerçekçi." },
                  { label: "Öneri", value: "2.800–3.200 greft, 1 seans planlanabilir." },
                ].map((r) => (
                  <div key={r.label} className="flex gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <span className="text-xs w-16 shrink-0 pt-0.5 font-medium" style={{ color: "#64748B" }}>{r.label}</span>
                    <span className="text-xs leading-relaxed" style={{ color: "#CBD5E1" }}>{r.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-start gap-2.5 p-3 rounded-xl" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)" }}>
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#FCD34D" }} />
                <p className="text-xs leading-relaxed" style={{ color: "#94A3B8" }}>Nihai karar klinik ekibine aittir. AI asistan destek sağlar, karar vermez.</p>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full text-xs font-semibold border"
                style={{ background: "rgba(13,148,136,0.15)", borderColor: "rgba(45,212,191,0.3)", color: "#2DD4BF", backdropFilter: "blur(12px)" }}
              >
                ✓ Analiz Tamamlandı
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <div className="gsap-reveal-right">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5"
              style={{ background: "rgba(59,130,246,0.12)", color: "#93C5FD", border: "1px solid rgba(59,130,246,0.2)" }}>
              AI Destekli
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">AI destekli klinik değerlendirme.</h2>
            <p className="leading-relaxed mb-8 text-base" style={{ color: "#94A3B8" }}>
              Muayene formundaki bilgileri analiz ederek klinik özet, takip notu ve tedavi önerisi taslağı oluşturur. Ekibiniz daha düzenli kayıt tutar.
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

            <Link href={`/${locale}/ai-klinik-asistani`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
              style={{ background: "rgba(37,99,235,0.15)", color: "#93C5FD", border: "1px solid rgba(59,130,246,0.25)" }}>
              AI Klinik Asistanı İncele →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
