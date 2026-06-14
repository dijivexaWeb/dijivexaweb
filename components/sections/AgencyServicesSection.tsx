"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    icon: "📱",
    name: "Sosyal Medya Yönetimi",
    desc: "Instagram, Facebook, TikTok, LinkedIn — içerik takvimi, tasarım, paylaşım ve büyüme stratejisi.",
    detail: "Aylık raporlama dahil",
  },
  {
    icon: "🎨",
    name: "Grafik & Logo Tasarımı",
    desc: "Kurumsal kimlik, logo, broşür, afiş, sosyal medya görselleri. Marka dilinizin görsel karşılığı.",
    detail: "Vektör + hazır dosyalar",
  },
  {
    icon: "🌐",
    name: "Kurumsal Web Sitesi",
    desc: "Hızlı, modern, mobil uyumlu kurumsal web siteleri. SEO odaklı, çok dilli, yönetim paneli ile.",
    detail: "Next.js · Türkçe panel",
  },
  {
    icon: "📢",
    name: "Dijital Reklam",
    desc: "Google Ads, Meta Ads, TikTok Ads — hedef kitleye özel kampanya yönetimi ve optimizasyonu.",
    detail: "ROI odaklı yönetim",
  },
  {
    icon: "📝",
    name: "İçerik Üretimi",
    desc: "Blog yazıları, ürün açıklamaları, reklam metinleri. Türkçe, İngilizce, Gürcüce içerik.",
    detail: "4 dil desteği",
  },
  {
    icon: "📊",
    name: "Marka Danışmanlığı",
    desc: "Batumi'de yeni kurulan işletmeler için marka stratejisi, isim önerisi, hedef kitle analizi.",
    detail: "Ücretsiz ilk görüşme",
  },
];

export function AgencyServicesSection({ locale }: { locale: string }) {
  return (
    <section className="py-24 lg:py-32" style={{ background: "#F8FAFC" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "#0D9488" }}>
            Ajans Hizmetleri
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 justify-between">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
              style={{ color: "#0F172A", fontFamily: "var(--font-jakarta, system-ui)" }}>
              Dijital kimliğinizi<br />
              <span style={{ background: "linear-gradient(135deg, #0D9488, #14B8A6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                biz yaratırız.
              </span>
            </h2>
            <p className="text-base max-w-sm lg:text-right" style={{ color: "#64748B" }}>
              Sosyal medyadan grafiğe, web'den reklamlara — markanızın her dijital temas noktası.
            </p>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {services.map((s, i) => (
            <motion.div key={s.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-2xl p-6 border bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
              style={{ borderColor: "#E2E8F0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <span className="text-2xl mb-4 block">{s.icon}</span>
              <h3 className="text-base font-bold mb-2" style={{ color: "#0F172A", fontFamily: "var(--font-jakarta, system-ui)" }}>
                {s.name}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#64748B" }}>{s.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium px-2 py-1 rounded-full"
                  style={{ background: "rgba(13,148,136,0.08)", color: "#0D9488", border: "1px solid rgba(13,148,136,0.15)" }}>
                  {s.detail}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.4 }} className="text-center">
          <Link href={`/${locale}/hizmetler`}
            className="inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold text-white rounded-xl transition-all hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #0D9488, #14B8A6)",
              boxShadow: "0 8px 28px rgba(13,148,136,0.3)",
              fontFamily: "var(--font-jakarta, system-ui)",
            }}>
            Tüm hizmetleri gör <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
