"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2, Palette } from "lucide-react";

const softwareItems = ["Dijivexa Clinic — Klinik SaaS", "Web & Mobil Uygulama", "SaaS & API Geliştirme", "AI Entegrasyonları"];
const agencyItems = ["Sosyal Medya Yönetimi", "Grafik & Logo Tasarımı", "Kurumsal Web Sitesi", "Dijital Reklam & SEO"];

const card = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

export function TwoPillarsSection({ locale }: { locale: string }) {
  return (
    <section className="py-24 lg:py-32" style={{ background: "#F8FAFC" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "#3B82F6" }}>
            Ne yapıyoruz?
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5"
            style={{ color: "#0F172A", fontFamily: "var(--font-jakarta, system-ui)" }}>
            İki kol, tek çatı.
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#64748B" }}>
            Yazılım üretiriz. Dijital kimlik inşa ederiz. Batumi'den Kafkasya'ya her ikisini de yapan tek adres.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">

          {/* Yazılım Kolu */}
          <motion.div custom={0} variants={card} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="rounded-2xl p-8 lg:p-10 border relative overflow-hidden group"
            style={{ background: "linear-gradient(145deg, #EFF6FF 0%, #DBEAFE 100%)", borderColor: "rgba(59,130,246,0.2)" }}>
            <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #2563EB, transparent)" }} />

            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)", boxShadow: "0 8px 24px rgba(37,99,235,0.3)" }}>
              <Code2 className="w-6 h-6 text-white" />
            </div>

            <h3 className="text-2xl font-bold mb-2" style={{ color: "#1E3A8A", fontFamily: "var(--font-jakarta, system-ui)" }}>
              Yazılım Ürünleri
            </h3>
            <p className="mb-6 text-base" style={{ color: "#3B4E6E" }}>
              Hayalinizdeki yazılımı sıfırdan inşa ederiz — SaaS'tan mobil uygulamaya, AI entegrasyonundan kurumsal platforma.
            </p>

            <ul className="space-y-3 mb-8">
              {softwareItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-medium" style={{ color: "#1E40AF" }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#3B82F6" }} />
                  {item}
                </li>
              ))}
            </ul>

            <Link href={`/${locale}/dijivexa-clinic`}
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3"
              style={{ color: "#2563EB" }}>
              Yazılım ürünlerini incele <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Ajans Kolu */}
          <motion.div custom={1} variants={card} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="rounded-2xl p-8 lg:p-10 border relative overflow-hidden group"
            style={{ background: "linear-gradient(145deg, #F0FDFA 0%, #CCFBF1 100%)", borderColor: "rgba(20,184,166,0.2)" }}>
            <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #0D9488, transparent)" }} />

            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: "linear-gradient(135deg, #0D9488, #14B8A6)", boxShadow: "0 8px 24px rgba(13,148,136,0.3)" }}>
              <Palette className="w-6 h-6 text-white" />
            </div>

            <h3 className="text-2xl font-bold mb-2" style={{ color: "#134E4A", fontFamily: "var(--font-jakarta, system-ui)" }}>
              Ajans Hizmetleri
            </h3>
            <p className="mb-6 text-base" style={{ color: "#1F4D47" }}>
              Markanızın dijital kimliğini yaratır, büyütürüz — sosyal medyadan grafik tasarıma, web sitesinden reklama.
            </p>

            <ul className="space-y-3 mb-8">
              {agencyItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-medium" style={{ color: "#0F766E" }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#14B8A6" }} />
                  {item}
                </li>
              ))}
            </ul>

            <Link href={`/${locale}/hizmetler`}
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3"
              style={{ color: "#0D9488" }}>
              Ajans hizmetlerini gör <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
