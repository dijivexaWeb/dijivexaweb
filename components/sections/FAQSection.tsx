"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/lib/useScrollReveal";

const faqs = [
  { q: "15 günlük demo nasıl çalışır?", a: "Formu doldurun, demo hesabınız otomatik açılır. Kredi kartı gerekmez. 15 gün boyunca tüm modülleri test edebilirsiniz." },
  { q: "Kredi kartı gerekir mi?", a: "Hayır. Demo sürecinde herhangi bir ödeme bilgisi talep edilmez." },
  { q: "WhatsApp mesajları otomatik gider mi?", a: "Evet. Meta WhatsApp Cloud API entegrasyonu ile randevu hatırlatma, kontrol ve kampanya mesajları otomatik gönderilir." },
  { q: "AI değerlendirme ne işe yarar?", a: "Muayene formundaki bilgileri analiz ederek klinik özet ve tedavi önerisi taslağı oluşturur. Nihai karar her zaman klinik ekibine aittir." },
  { q: "Çok şubeli kullanım var mı?", a: "Evet. Her şube için ayrı stok, personel ve rapor takibi yapılabilir." },
  { q: "Veriler güvenli mi?", a: "Row Level Security ile klinik bazlı veri izolasyonu, günlük yedekleme ve audit log uygulanır." },
  { q: "Kurulum desteği veriliyor mu?", a: "Evet. Demo hesabı açıldıktan sonra onboarding desteği sağlanır." },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="section-gray py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="gsap-reveal text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "#EFF6FF", color: "#1D4ED8" }}>SSS</span>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "#0F172A" }}>Sık Sorulan Sorular</h2>
        </div>

        <div className="gsap-stagger space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="gsap-item rounded-2xl border bg-white overflow-hidden"
              style={{ borderColor: open === i ? "#BFDBFE" : "#F1F5F9" }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-blue-50/30 transition-colors">
                <span className="text-sm font-semibold pr-4" style={{ color: "#0F172A" }}>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                  style={{ color: open === i ? "#2563EB" : "#94A3B8" }} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "#64748B" }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
