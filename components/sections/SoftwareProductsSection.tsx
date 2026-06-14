"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const products = [
  {
    icon: "🏥",
    name: "Dijivexa Clinic",
    tag: "SaaS Ürün",
    tagColor: "#3B82F6",
    desc: "Klinik ve güzellik merkezleri için tam yönetim platformu. Randevu, hasta takibi, kasa, stok, WhatsApp, AI analiz.",
    href: "/dijivexa-clinic",
    accent: "#2563EB",
    glow: "rgba(37,99,235,0.15)",
  },
  {
    icon: "🌐",
    name: "Web & Mobil Uygulama",
    tag: "Özel Geliştirme",
    tagColor: "#8B5CF6",
    desc: "İşletmenize özel web ve mobil uygulamalar. React, Next.js, React Native ile sıfırdan ya da mevcut sisteminizin üzerine.",
    href: "/hizmetler",
    accent: "#7C3AED",
    glow: "rgba(124,58,237,0.15)",
  },
  {
    icon: "🤖",
    name: "AI Entegrasyonları",
    tag: "Yapay Zeka",
    tagColor: "#22D3EE",
    desc: "İşletmenize AI katın. Müşteri hizmetleri botu, veri analizi, otomasyon, içerik üretimi — OpenAI, Gemini, Claude ile.",
    href: "/hizmetler",
    accent: "#0891B2",
    glow: "rgba(8,145,178,0.15)",
  },
  {
    icon: "⚙️",
    name: "SaaS & API Geliştirme",
    tag: "Backend",
    tagColor: "#34D399",
    desc: "Ölçeklenebilir SaaS platformları ve API'lar. Supabase, PostgreSQL, edge functions, multi-tenant mimarileri.",
    href: "/hizmetler",
    accent: "#059669",
    glow: "rgba(5,150,105,0.15)",
  },
];

export function SoftwareProductsSection({ locale }: { locale: string }) {
  return (
    <section className="py-24 lg:py-32" style={{ background: "linear-gradient(180deg, #080F24 0%, #0C1A3D 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "#60A5FA" }}>
            Yazılım Ürünleri
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 justify-between">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
              style={{ fontFamily: "var(--font-jakarta, system-ui)" }}>
              Kendi yazdığımız<br />
              <span style={{ background: "linear-gradient(135deg, #60A5FA, #3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                yazılımlar.
              </span>
            </h2>
            <p className="text-base max-w-sm lg:text-right" style={{ color: "#64748B" }}>
              Hazır çözümler değil — sizin için üretilmiş, sizinle büyüyen yazılımlar.
            </p>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {products.map((p, i) => (
            <motion.div key={p.name}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              <Link href={`/${locale}${p.href}`}
                className="group block rounded-2xl p-7 border h-full transition-all hover:-translate-y-1"
                style={{
                  background: "linear-gradient(145deg, rgba(13,27,62,0.8), rgba(8,15,36,0.9))",
                  borderColor: "rgba(59,130,246,0.12)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}>
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{p.icon}</span>
                    <div>
                      <h3 className="text-base font-bold text-white" style={{ fontFamily: "var(--font-jakarta, system-ui)" }}>
                        {p.name}
                      </h3>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block"
                        style={{ background: `${p.tagColor}18`, color: p.tagColor, border: `1px solid ${p.tagColor}30` }}>
                        {p.tag}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 mt-1 transition-transform group-hover:translate-x-1" style={{ color: p.accent }} />
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>{p.desc}</p>
                <div className="mt-5 h-px" style={{ background: `linear-gradient(90deg, ${p.accent}30, transparent)` }} />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
