"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { FinalCTASectionStatic } from "@/components/sections/FinalCTASectionStatic";
import { PageHero } from "@/components/sections/PageHero";
import { CheckCircle2, MessageCircle, Bell, Users, Megaphone, Star } from "lucide-react";
import { use } from "react";

const messages = [
  { from: "system", text: "Merhaba Ayşe Hanım 👋 Yarın saat 14:00'te kontrol randevunuz var. Kliniğimizi bekliyoruz!", time: "09:02" },
  { from: "user", text: "Teşekkürler, kesinlikle geleceğim ✓", time: "09:18" },
  { from: "system", text: "Saç ekimi sonrası 10. gün kontrolünüz için sizi bekliyoruz. 🔬 Sorularınız için bize yazabilirsiniz.", time: "10:00" },
  { from: "user", text: "Tamam, yarın görüşürüz.", time: "10:12" },
  { from: "system", text: "Yeni PRP kampanyamızdan haberdar olmak ister misiniz? Özel indirimli paketlerimiz var. 💉", time: "14:30" },
];

const useCases = [
  { icon: Bell, title: "Randevu Hatırlatma", desc: "Randevudan 24 saat önce otomatik hatırlatma gönderilir. Gelmeyen hasta oranı azalır." },
  { icon: Star, title: "Kontrol Mesajları", desc: "10. gün ve 1. ay kontrol davetleri otomatik planlanır. Tedavi süreci izlenir." },
  { icon: Megaphone, title: "Kampanya Bildirimleri", desc: "Yeni hizmet ve kampanyaları seçilen hasta segmentine tek tıkla iletin." },
  { icon: Star, title: "Google Yorum Daveti", desc: "İşlem sonrası otomatik yorum daveti. Dijital itibarınızı güçlendirin." },
  { icon: Users, title: "Toplu Mesaj", desc: "Tüm hastalara veya belirli gruplara toplu mesaj gönderin." },
  { icon: MessageCircle, title: "İki Yönlü İletişim", desc: "Hasta yanıtlarını görün, yönlendirin. Gerçek diyalog kurulabilir." },
];

const automations = [
  { step: "01", title: "Randevu oluşturulur", desc: "Sistem randevuyu kaydeder ve otomatik mesaj planlar." },
  { step: "02", title: "Tetikleyici çalışır", desc: "Belirlenen süre öncesinde WhatsApp mesajı hazırlanır." },
  { step: "03", title: "Mesaj gönderilir", desc: "Meta WhatsApp Cloud API üzerinden güvenle iletilir." },
  { step: "04", title: "Yanıt takip edilir", desc: "Hasta yanıtları sistemde görünür, ekip takip eder." },
];

export default function WhatsappTakipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const useCasesRef = useScrollReveal();
  const automationsRef = useScrollReveal();

  return (
    <>
      <PageHero
        badge="💬 WhatsApp Entegrasyonu"
        badgeColor="#16A34A"
        title="Hastalarınızla iletişimi"
        titleHighlight="otomatikleştirin."
        subtitle="Randevu hatırlatma, kontrol mesajları, kampanya bildirimleri ve yorum daveti — hepsi WhatsApp üzerinden otomatik."
        ctaPrimary={{ label: "Demo'da Gör", href: `/${locale}/demo` }}
        ctaSecondary={{ label: "Fiyatlandırma", href: `/${locale}/fiyatlandirma` }}
      >
        {/* Phone Mockup */}
        <div className="flex justify-center">
          <div className="w-72 rounded-[2.5rem] overflow-hidden border-[3px]"
            style={{ borderColor: "#D1D5DB", boxShadow: "0 32px 64px rgba(0,0,0,0.15)" }}>
            <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">D</div>
              <div>
                <p className="text-white text-sm font-semibold">Dijivexa Clinic</p>
                <p className="text-green-200 text-xs">Otomatik mesajlaşma aktif ✓</p>
              </div>
            </div>
            <div className="p-4 space-y-2.5 bg-[#ECE5DD] min-h-80">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] px-3 py-2 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      msg.from === "user"
                        ? "bg-[#DCF8C6] text-gray-800 rounded-br-none"
                        : "bg-white text-gray-700 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                    <p className="text-right mt-1 text-[10px] text-gray-400">{msg.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </PageHero>

      {/* Use Cases */}
      <section ref={useCasesRef} className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="gsap-reveal text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
              WhatsApp ile neler yapabilirsiniz?
            </h2>
          </div>
          <div className="gsap-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map((uc) => (
              <div key={uc.title} className="gsap-item bg-white rounded-2xl border p-6 hover:shadow-md transition-all"
                style={{ borderColor: "#F1F5F9" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "#DCFCE7" }}>
                  <uc.icon className="w-5 h-5" style={{ color: "#16A34A" }} />
                </div>
                <h3 className="font-semibold text-sm mb-2" style={{ color: "#0F172A" }}>{uc.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Flow */}
      <section ref={automationsRef} className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="gsap-reveal text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
              Otomasyon nasıl işliyor?
            </h2>
          </div>
          <div className="gsap-stagger grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {automations.map((a) => (
              <div key={a.step} className="gsap-item bg-white rounded-2xl border p-6"
                style={{ borderColor: "#F1F5F9" }}>
                <span className="text-4xl font-black block mb-3" style={{ color: "#F0FDF4" }}>{a.step}</span>
                <h3 className="font-semibold text-sm mb-2" style={{ color: "#0F172A" }}>{a.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Info dark */}
      <section className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #0F2553 0%, #1A3A6B 55%, #112B60 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: "rgba(22,163,74,0.2)" }}>
              <MessageCircle className="w-7 h-7" style={{ color: "#4ADE80" }} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Meta WhatsApp Cloud API</h2>
            <p className="mb-6" style={{ color: "#94A3B8" }}>
              Resmi Meta API entegrasyonu. Güvenilir, ölçeklenebilir ve KVKK uyumlu mesajlaşma altyapısı.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Resmi API", "Şifreli İletim", "KVKK Uyumlu", "Yüksek Teslim Oranı"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border"
                  style={{ background: "rgba(22,163,74,0.1)", borderColor: "rgba(74,222,128,0.2)", color: "#4ADE80" }}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <FinalCTASectionStatic locale={locale} />
    </>
  );
}
