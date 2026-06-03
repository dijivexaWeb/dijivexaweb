"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "15 günlük demo nasıl çalışır?", a: "Formu doldurun, demo hesabınız otomatik açılır. Kredi kartı gerekmez. 15 gün boyunca tüm modülleri test edebilirsiniz." },
  { q: "Kredi kartı gerekir mi?", a: "Hayır. Demo sürecinde herhangi bir ödeme bilgisi talep edilmez." },
  { q: "WhatsApp mesajları otomatik gider mi?", a: "Evet. Meta WhatsApp Cloud API entegrasyonu ile randevu hatırlatma, kontrol ve kampanya mesajları otomatik gönderilir." },
  { q: "AI değerlendirme ne işe yarar?", a: "Muayene formundaki bilgileri analiz ederek klinik özet ve tedavi önerisi taslağı oluşturur. Nihai karar her zaman klinik ekibine aittir." },
  { q: "Çok şubeli kullanım var mı?", a: "Evet. Dijivexa Clinic çok şubeli yapıyı destekler. Her şube için ayrı stok, personel ve rapor takibi yapılabilir." },
  { q: "Veriler güvenli mi?", a: "Evet. Row Level Security ile klinik bazlı veri izolasyonu, günlük yedekleme, audit log ve güvenli oturum yönetimi uygulanır." },
  { q: "Kurulum desteği veriliyor mu?", a: "Evet. Demo hesabı açıldıktan sonra kurulum ve onboarding desteği sağlanır." },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#07111F]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Sık Sorulan Sorular</h2>
          <p className="text-[#64748B]">Aklınızdaki soruların cevapları burada.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="border border-[#1e2d45] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#0B172A] transition-colors"
              >
                <span className="text-white text-sm font-medium">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#64748B] transition-transform duration-200 shrink-0 ml-4 ${open === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm text-[#64748B] leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
