"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    icon: "🌍",
    title: "Stratejik Konum",
    desc: "Türkiye, Rusya, Azerbaycan, Ermenistan — Kafkasya'nın merkezinde. Batumi'den 4 farklı pazara erişim.",
  },
  {
    icon: "💶",
    title: "Düşük Operasyonel Maliyet",
    desc: "Gürcistan'ın düşük vergi yapısı ve rekabetçi maliyetleri ile Türkiye'ye kıyasla %40'a varan tasarruf.",
  },
  {
    icon: "🏛️",
    title: "İş Dostu Mevzuat",
    desc: "Gürcistan'da şirket kurmak 1 gün sürüyor. %15 kurumlar vergisi, KDV muafiyetleri, serbest ticaret bölgesi.",
  },
  {
    icon: "🌐",
    title: "Çok Dilli Pazar",
    desc: "Türkçe, Gürcüce, Rusça, İngilizce konuşan müşteri tabanı. 4 dilde hizmet verebilen nadir bir ekibiz.",
  },
  {
    icon: "🚀",
    title: "Büyüyen Teknoloji Ekosistemi",
    desc: "Batumi'de hızla gelişen startup ortamı, Gürcistan'ın dijitalleşme vizyonu ve AB entegrasyon süreci.",
  },
  {
    icon: "🤝",
    title: "Yerel Güven, Global Standart",
    desc: "Türk iş insanı kültürünü biliriz. Batumi'de yüz yüze, global projede remote — fark etmez.",
  },
];

export function WhyBatumiSection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(150deg, #080F24 0%, #0C1A3D 60%, #080F24 100%)" }}>
      {/* Arka plan grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(34,211,238,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.04) 1px,transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(34,211,238,0.06) 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6"
            style={{ background: "rgba(34,211,238,0.07)", borderColor: "rgba(34,211,238,0.2)", color: "#67E8F9" }}>
            <span style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "0.06em" }}>41.6168° N, 41.6367° E</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-5"
            style={{ fontFamily: "var(--font-jakarta, system-ui)" }}>
            Neden Batumi?
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#64748B" }}>
            Raslantı değil. Kafkasya'nın en stratejik şehrinden, Türk iş insanlarının teknoloji ortağı olmak için buradayız.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <motion.div key={r.title}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-6 border"
              style={{
                background: "rgba(13,27,62,0.6)",
                borderColor: "rgba(34,211,238,0.1)",
                backdropFilter: "blur(8px)",
              }}>
              <span className="text-2xl mb-4 block">{r.icon}</span>
              <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: "var(--font-jakarta, system-ui)" }}>
                {r.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>{r.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Alt konum notu */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.5 }} className="mt-12 text-center">
          <p style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "rgba(34,211,238,0.35)", letterSpacing: "0.08em" }}>
            DIJIVEXA YAZILIM VE DANIŞMANLIK · BATUMI, GÜRCİSTAN · GEORGIA REGISTERED
          </p>
        </motion.div>

      </div>
    </section>
  );
}
