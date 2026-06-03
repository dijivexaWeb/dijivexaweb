"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const messages = [
  { from: "system", text: "Merhaba Ayşe Hanım, yarın saat 14:00'te kontrol randevunuz bulunmaktadır. 📅", time: "09:00" },
  { from: "user", text: "Teşekkürler, geleceğim ✓", time: "09:15" },
  { from: "system", text: "Saç ekimi sonrası 10. gün kontrolünüz için sizi bekliyoruz. 🔬", time: "10:00" },
  { from: "system", text: "Yeni PRP kampanyamız hakkında bilgi almak ister misiniz? 💉", time: "14:30" },
];

export function WhatsAppSection({ locale }: { locale: string }) {
  return (
    <section className="py-24 bg-[#0B172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium mb-5">
              <span className="text-base">💬</span> WhatsApp Entegrasyonu
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Hastalarınızla iletişimi kaçırmayın.
            </h2>
            <p className="text-[#64748B] leading-relaxed mb-8">
              Randevu hatırlatma, kontrol mesajları, kampanya bildirimi ve yorum isteme süreçlerini WhatsApp üzerinden otomatik yönetin.
            </p>

            {[
              "Otomatik randevu hatırlatması",
              "10. gün ve 1. ay kontrol mesajları",
              "Kampanya bildirimi",
              "Google yorum daveti",
              "Toplu mesaj gönderimi",
            ].map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 mb-3 text-sm text-[#94a3b8]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                {f}
              </motion.div>
            ))}

            <Link
              href={`/${locale}/whatsapp-takip`}
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-xl transition-colors"
            >
              WhatsApp Takip Sistemini İncele →
            </Link>
          </motion.div>

          {/* Right: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="w-72 bg-[#07111F] rounded-[2.5rem] border-[3px] border-[#1e2d45] overflow-hidden shadow-2xl">
              {/* Phone header */}
              <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold">D</div>
                <div>
                  <p className="text-white text-sm font-medium">Dijivexa Clinic</p>
                  <p className="text-green-200 text-xs">çevrimiçi</p>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-3 bg-[#0a1628] min-h-64">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                        msg.from === "user"
                          ? "bg-[#005C4B] text-white rounded-br-none"
                          : "bg-[#1e2d45] text-[#94a3b8] rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                      <p className="text-right mt-1 opacity-50 text-[10px]">{msg.time}</p>
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
