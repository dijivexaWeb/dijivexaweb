"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Bot, AlertCircle } from "lucide-react";

const features = [
  "Muayene özetini otomatik çıkarır",
  "Risk bilgilerini görünür yapar",
  "Tedavi önerisi taslağı oluşturur",
  "Doktor notlarını düzenler",
  "Kliniğe özel API key ile çalışabilir",
];

export function AISection({ locale }: { locale: string }) {
  return (
    <section className="py-24 bg-[#07111F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: AI Card mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-2xl bg-gradient-to-br from-[#0B172A] to-[#07111F] border border-[#1e2d45] p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#38BDF8]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">AI Klinik Değerlendirme</p>
                  <p className="text-[#64748B] text-xs">Gemini Pro destekli</p>
                </div>
                <span className="ml-auto text-xs px-2 py-1 rounded-full bg-[#00C2A8]/10 text-[#00C2A8]">Hazır</span>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Hasta", value: "Ahmet Yılmaz, 34 yaş" },
                  { label: "Şikayet", value: "Norwood Evre III, saç çizgisi gerilemiş" },
                  { label: "Klinik Özet", value: "Hasta FUE tekniğine uygun aday. Donör alan yeterli..." },
                  { label: "Öneri", value: "2800-3200 greft, 2 seans planlanabilir" },
                ].map((r) => (
                  <div key={r.label} className="flex gap-3">
                    <span className="text-[#64748B] text-xs w-24 shrink-0 pt-0.5">{r.label}</span>
                    <span className="text-[#94a3b8] text-xs leading-relaxed">{r.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-3 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex gap-2">
                <AlertCircle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <p className="text-[#94a3b8] text-xs">Nihai karar klinik ekibine aittir. AI asistan destek sağlar.</p>
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-4 bg-[#2563EB]/5 rounded-3xl blur-2xl -z-10" />
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8] text-xs font-medium mb-5">
              <Bot className="w-3.5 h-3.5" /> AI destekli
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              AI destekli klinik değerlendirme.
            </h2>
            <p className="text-[#64748B] leading-relaxed mb-8">
              Muayene formundaki bilgileri analiz ederek klinik özet, takip notu ve tedavi önerisi taslağı oluşturur. Ekip daha düzenli kayıt tutar, hasta süreci daha profesyonel yönetilir.
            </p>

            <ul className="space-y-3 mb-8">
              {features.map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 text-sm text-[#94a3b8]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] shrink-0" />
                  {f}
                </motion.li>
              ))}
            </ul>

            <Link
              href={`/${locale}/ai-klinik-asistani`}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl transition-colors"
            >
              AI Klinik Asistanı İncele →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
