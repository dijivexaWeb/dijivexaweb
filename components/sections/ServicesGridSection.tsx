"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";

const services = [
  { icon: "🏥", name: "Dijivexa Clinic", desc: "Klinik yönetim yazılımı.", href: "/dijivexa-clinic", bg: "#EFF6FF", border: "#BFDBFE", iconBg: "#DBEAFE", accent: "#1D4ED8" },
  { icon: "📈", name: "Dijivexa Growth", desc: "Sosyal medya ve reklam.", href: "/dijivexa-growth", bg: "#F0FDFA", border: "#99F6E4", iconBg: "#CCFBF1", accent: "#0F766E" },
  { icon: "🌐", name: "Dijivexa Web", desc: "Web sitesi ve SEO.", href: "/dijivexa-web", bg: "#F0F9FF", border: "#BAE6FD", iconBg: "#E0F2FE", accent: "#0369A1" },
  { icon: "📱", name: "Dijivexa Mobile", desc: "Mobil uygulama.", href: "/dijivexa-mobile", bg: "#FFF7ED", border: "#FED7AA", iconBg: "#FFEDD5", accent: "#C2410C" },
  { icon: "⚙️", name: "Dijivexa Studio", desc: "Özel yazılım.", href: "/dijivexa-studio", bg: "#F5F3FF", border: "#DDD6FE", iconBg: "#EDE9FE", accent: "#6D28D9" },
  { icon: "🤖", name: "Dijivexa AI", desc: "AI & otomasyon.", href: "/dijivexa-ai", bg: "#F0FDFA", border: "#A7F3D0", iconBg: "#D1FAE5", accent: "#047857" },
];

export function ServicesGridSection({ locale }: { locale: string }) {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="section-gray py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="gsap-reveal text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "#EFF6FF", color: "#1D4ED8" }}>Hizmetler</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>İşletmenizin ihtiyacına göre dijital çözümler.</h2>
          <p className="max-w-lg mx-auto" style={{ color: "#64748B" }}>Tek ürün değil, işletmenizin tam dijital ekosistemi.</p>
        </div>

        <div className="gsap-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <motion.div key={s.name} className="gsap-item" whileHover={{ y: -5, scale: 1.01 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <Link href={`/${locale}${s.href}`}
                className="flex flex-col h-full p-6 rounded-2xl border transition-all hover:shadow-md"
                style={{ background: s.bg, borderColor: s.border }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: s.iconBg }}>{s.icon}</div>
                <h3 className="font-semibold mb-1.5" style={{ color: "#0F172A" }}>{s.name}</h3>
                <p className="text-sm flex-1 mb-4" style={{ color: "#64748B" }}>{s.desc}</p>
                <span className="text-sm font-semibold" style={{ color: s.accent }}>İncele →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
