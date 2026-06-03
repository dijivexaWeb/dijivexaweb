"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { Star, Quote } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Admin'den gelecek verinin placeholder'ı — Supabase'den okunacak    */
/* site_testimonials tablosundan çekilecek                             */
/* ------------------------------------------------------------------ */

const logos = [
  { name: "Medline Klinik", abbr: "ML", color: "#2563EB" },
  { name: "Hair Expert", abbr: "HE", color: "#0D9488" },
  { name: "Estetika Plus", abbr: "EP", color: "#8B5CF6" },
  { name: "Nova Beauty", abbr: "NB", color: "#F59E0B" },
  { name: "Tricho Center", abbr: "TC", color: "#EF4444" },
  { name: "Lazer Pro", abbr: "LP", color: "#10B981" },
  { name: "Dermis Clinic", abbr: "DC", color: "#06B6D4" },
  { name: "Silk Beauty", abbr: "SB", color: "#EC4899" },
];

const testimonials = [
  {
    name: "Dr. Murat Şahin",
    role: "Kurucu",
    company: "Hair Expert Merkezi",
    location: "İstanbul",
    rating: 5,
    text: "Dijivexa Clinic ile saç ekimi operasyon süreçlerimizi tamamen dijitalleştirdik. Greft takibi, ekip görevleri, taburcu checklist — her şey tek panelde. Hasta memnuniyetimiz gözle görülür arttı.",
    avatar: "M",
    color: "#0D9488",
  },
  {
    name: "Ayşe Korkmaz",
    role: "Klinik Müdürü",
    company: "Estetika Plus",
    location: "Ankara",
    rating: 5,
    text: "WhatsApp hatırlatma sistemi hayat kurtardı. Artık randevu kaçırmalar sıfıra indi, hastalar zamanında geliyor. AI değerlendirme özelliği muayene süremizi %40 kısalttı.",
    avatar: "A",
    color: "#8B5CF6",
  },
  {
    name: "Erkan Yıldız",
    role: "İşletme Sahibi",
    company: "Nova Beauty Center",
    location: "İzmir",
    rating: 5,
    text: "Kasa ve stok yönetimi artık çok kolay. Hizmete bağlı otomatik stok düşümü özelliği ile stoğumuzun nereye gittiğini anlık görüyoruz. Taksit takibi de mükemmel.",
    avatar: "E",
    color: "#F59E0B",
  },
  {
    name: "Dr. Zeynep Arslan",
    role: "Trikoloji Uzmanı",
    company: "Tricho Center",
    location: "Bursa",
    rating: 5,
    text: "Trikoloji formu ve saç analizi takip sistemi gerçekten ekibimiz için hazırlanmış gibi. Norwood evreleme, trikoskopi notları, PRP takibi — her şey düzenli ve erişilebilir.",
    avatar: "Z",
    color: "#EF4444",
  },
];

export function TestimonialsSection() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Başlık */}
        <div className="gsap-reveal text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ background: "#EFF6FF", color: "#1D4ED8" }}>
            Referanslar
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
            Yüzlerce klinik Dijivexa ile yönetiliyor.
          </h2>
          <p className="max-w-lg mx-auto" style={{ color: "#64748B" }}>
            Saç ekimi merkezlerinden estetik kliniklere, güzellik merkezlerinden trikoloji kliniklerine kadar.
          </p>
        </div>

        {/* Logo marquee */}
        <div className="gsap-reveal mb-16 relative">
          {/* Sol/sağ fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, white, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, white, transparent)" }} />

          <div className="flex overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="flex gap-6 shrink-0"
            >
              {[...logos, ...logos].map((logo, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-6 py-4 rounded-2xl border shrink-0 hover:shadow-md transition-all"
                  style={{ borderColor: "#F1F5F9", background: "#FAFBFC", minWidth: "180px" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ background: `linear-gradient(135deg, ${logo.color}, ${logo.color}CC)` }}
                  >
                    {logo.abbr}
                  </div>
                  <span className="text-sm font-semibold whitespace-nowrap" style={{ color: "#334155" }}>
                    {logo.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Testimonial kartları */}
        <div className="gsap-stagger grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              className="gsap-item flex flex-col p-6 rounded-2xl border bg-white hover:shadow-lg transition-all duration-300"
              style={{ borderColor: "#F1F5F9" }}
              whileHover={{ y: -4, borderColor: t.color + "30" }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" style={{ color: "#FBBF24" }} />
                ))}
              </div>

              {/* Quote icon */}
              <Quote className="w-6 h-6 mb-3" style={{ color: t.color + "50" }} />

              {/* Text */}
              <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "#475569" }}>
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "#F1F5F9" }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}AA)` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#0F172A" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "#94A3B8" }}>
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Alt stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}
        >
          <p className="text-sm font-semibold" style={{ color: "#1E40AF" }}>
            ⭐ Ortalama 4.9/5 — 500'den fazla klinik tarafından değerlendirildi
          </p>
          <p className="text-sm" style={{ color: "#3B82F6" }}>
            Siz de katılın →
          </p>
        </motion.div>
      </div>
    </section>
  );
}
