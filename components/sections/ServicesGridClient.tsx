"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const SERVICE_STYLES: Record<string, { bg: string; border: string; iconBg: string; accent: string; icon: string }> = {
  "dijivexa-clinic":  { bg: "#EFF6FF", border: "#BFDBFE", iconBg: "#DBEAFE", accent: "#1D4ED8", icon: "🏥" },
  "dijivexa-growth":  { bg: "#F0FDFA", border: "#99F6E4", iconBg: "#CCFBF1", accent: "#0F766E", icon: "📈" },
  "dijivexa-web":     { bg: "#F0F9FF", border: "#BAE6FD", iconBg: "#E0F2FE", accent: "#0369A1", icon: "🌐" },
  "dijivexa-mobile":  { bg: "#FFF7ED", border: "#FED7AA", iconBg: "#FFEDD5", accent: "#C2410C", icon: "📱" },
  "dijivexa-studio":  { bg: "#F5F3FF", border: "#DDD6FE", iconBg: "#EDE9FE", accent: "#6D28D9", icon: "⚙️" },
  "dijivexa-ai":      { bg: "#F0FDFA", border: "#A7F3D0", iconBg: "#D1FAE5", accent: "#047857", icon: "🤖" },
};

interface Service { id: string; slug: string; name: string; tagline: string; short_description: string; cta_href: string; }

export function ServicesGridClient({ services, locale }: { services: Service[]; locale: string }) {
  if (!services.length) return null;

  return (
    <section className="py-24" style={{ background: "#F8FAFC" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "#EFF6FF", color: "#1D4ED8" }}>Hizmetler</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>İşletmenizin ihtiyacına göre dijital çözümler.</h2>
          <p className="max-w-lg mx-auto" style={{ color: "#64748B" }}>Tek ürün değil, işletmenizin tam dijital ekosistemi.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const style = SERVICE_STYLES[s.slug] ?? { bg: "#F8FAFC", border: "#E2E8F0", iconBg: "#F1F5F9", accent: "#2563EB", icon: "💡" };
            return (
              <motion.div key={s.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 20 }}
                whileHover={{ y: -5, scale: 1.01 }}
              >
                <Link href={`/${locale}${s.cta_href || "/" + s.slug}`}
                  className="flex flex-col h-full p-6 rounded-2xl border transition-all hover:shadow-md"
                  style={{ background: style.bg, borderColor: style.border }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-4"
                    style={{ background: style.iconBg }}>{style.icon}</div>
                  <h3 className="font-semibold mb-1.5" style={{ color: "#0F172A" }}>{s.name}</h3>
                  <p className="text-sm flex-1 mb-4" style={{ color: "#64748B" }}>{s.tagline || s.short_description}</p>
                  <span className="text-sm font-semibold" style={{ color: style.accent }}>İncele →</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
