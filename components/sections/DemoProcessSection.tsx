"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  { num: "01", title: "Bilgilerini gir", desc: "Klinik veya işletme bilgilerini forma gir. 2 dakika sürer." },
  { num: "02", title: "Demo hesabın açılsın", desc: "Sistem otomatik olarak Dijivexa Clinic panelinizi kurar." },
  { num: "03", title: "15 gün test et", desc: "Tüm modülleri gerçek verilerle test edin. Hiçbir ücret yoktur." },
];

export function DemoProcessSection({ locale }: { locale: string }) {
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
            15 gün ücretsiz deneyin.
          </h2>
          <p className="text-[#64748B] max-w-xl mx-auto">
            Demo hesabınızı oluşturun, Dijivexa Clinic paneliniz otomatik açılsın.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-[#2563EB]/30 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-[#07111F] border border-[#1e2d45]"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB] font-bold text-lg mb-5">
                {step.num}
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">{step.title}</h3>
              <p className="text-[#64748B] text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href={`/${locale}/demo`}
            className="px-8 py-4 text-base font-semibold text-white bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl transition-all hover:shadow-lg hover:shadow-[#2563EB]/30"
          >
            Ücretsiz Demo Başlat
          </Link>
          <p className="text-[#64748B] text-sm">Kredi kartı gerekmez · Kurulum desteği dahil</p>
        </motion.div>
      </div>
    </section>
  );
}
