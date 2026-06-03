"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  { icon: "🏥", name: "Dijivexa Clinic", desc: "Klinik yönetim yazılımı.", href: "/dijivexa-clinic", color: "#2563EB" },
  { icon: "📈", name: "Dijivexa Growth", desc: "Sosyal medya ve reklam yönetimi.", href: "/dijivexa-growth", color: "#00C2A8" },
  { icon: "🌐", name: "Dijivexa Web", desc: "Web sitesi ve landing page.", href: "/dijivexa-web", color: "#38BDF8" },
  { icon: "📱", name: "Dijivexa Mobile", desc: "Mobil uygulama geliştirme.", href: "/dijivexa-mobile", color: "#F59E0B" },
  { icon: "⚙️", name: "Dijivexa Studio", desc: "Özel yazılım ve otomasyon.", href: "/dijivexa-studio", color: "#8B5CF6" },
  { icon: "🤖", name: "Dijivexa AI", desc: "AI analiz, chatbot ve otomasyon.", href: "/dijivexa-ai", color: "#38BDF8" },
];

export function ServicesGridSection({ locale }: { locale: string }) {
  return (
    <section className="py-24 bg-[#07111F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            İşletmenizin ihtiyacına göre dijital çözümler.
          </h2>
          <p className="text-[#64748B] max-w-xl mx-auto">
            Tek ürün değil, işletmenizin dijital büyüme ekosistemi.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <Link
                href={`/${locale}${s.href}`}
                className="flex flex-col h-full p-6 rounded-2xl bg-[#0B172A] border border-[#1e2d45] hover:border-opacity-50 transition-all group"
                style={{ "--service-color": s.color } as React.CSSProperties}
              >
                <span className="text-3xl mb-4">{s.icon}</span>
                <h3 className="text-white font-semibold mb-2 group-hover:text-[--service-color] transition-colors" style={{ color: "inherit" }}>
                  {s.name}
                </h3>
                <p className="text-[#64748B] text-sm flex-1">{s.desc}</p>
                <span className="mt-4 text-xs font-medium transition-colors" style={{ color: s.color }}>
                  İncele →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
