"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";

const messages = [
  { from: "system", text: "Merhaba Ayşe Hanım 👋 Yarın saat 14:00'te kontrol randevunuz var.", time: "09:02" },
  { from: "user", text: "Teşekkürler, geleceğim ✓", time: "09:18" },
  { from: "system", text: "Saç ekimi sonrası 10. gün kontrolünüz için sizi bekliyoruz. 🔬", time: "10:00" },
  { from: "system", text: "Yeni PRP kampanyamızdan haberdar olmak ister misiniz? 💉", time: "14:30" },
  { from: "user", text: "Evet, bilgi alabilir miyim?", time: "14:45" },
];

export function WhatsAppSection({ locale }: { locale: string }) {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="section-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text */}
          <div className="gsap-reveal-left">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5"
              style={{ background: "#DCFCE7", color: "#15803D" }}>
              💬 WhatsApp Entegrasyonu
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
              Hastalarınızla iletişimi otomatikleştirin.
            </h2>
            <p className="leading-relaxed mb-8" style={{ color: "#64748B" }}>
              Randevu hatırlatma, kontrol mesajları, kampanya bildirimi ve yorum daveti — hepsi WhatsApp üzerinden otomatik.
            </p>

            {["Otomatik randevu hatırlatması (24 saat önce)", "10. gün ve 1. ay kontrol mesajları", "Kampanya & yeni hizmet bildirimleri", "Google yorum daveti otomasyonu", "Toplu mesaj gönderimi"].map((f) => (
              <div key={f} className="flex items-center gap-3 mb-3 text-sm" style={{ color: "#334155" }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "#DCFCE7", color: "#16A34A" }}>✓</span>
                {f}
              </div>
            ))}

            <Link href={`/${locale}/whatsapp-takip`}
              className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{ background: "#16A34A", boxShadow: "0 4px 16px rgba(22,163,74,0.3)" }}>
              WhatsApp Takip Sistemini İncele →
            </Link>
          </div>

          {/* Right: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: -12 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: "1000px" }}
            className="flex justify-center"
          >
            <div className="w-72 rounded-[2.5rem] overflow-hidden border-[3px]"
              style={{ borderColor: "#D1D5DB", boxShadow: "0 32px 64px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.1)" }}>
              <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">D</div>
                <div>
                  <p className="text-white text-sm font-semibold">Dijivexa Clinic</p>
                  <p className="text-green-200 text-xs">Otomatik mesajlaşma aktif ✓</p>
                </div>
              </div>
              <div className="p-4 space-y-2.5 bg-[#ECE5DD] min-h-72">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed shadow-sm ${msg.from === "user" ? "bg-[#DCF8C6] text-gray-800 rounded-br-none" : "bg-white text-gray-700 rounded-bl-none"}`}>
                      {msg.text}
                      <p className="text-right mt-1 text-[10px] text-gray-400">{msg.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
