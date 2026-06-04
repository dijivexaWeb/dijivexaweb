"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQ { id: string; question: string; answer: string; }

export function FAQClient({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);

  if (!faqs.length) return null;

  return (
    <section style={{ background: "#F8FAFC" }} className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "#EFF6FF", color: "#1D4ED8" }}>SSS</span>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "#0F172A" }}>Sık Sorulan Sorular</h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={faq.id}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="rounded-2xl border bg-white overflow-hidden"
              style={{ borderColor: open === faq.id ? "#BFDBFE" : "#F1F5F9" }}
            >
              <button onClick={() => setOpen(open === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-blue-50/30 transition-colors">
                <span className="text-sm font-semibold pr-4" style={{ color: "#0F172A" }}>{faq.question}</span>
                <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${open === faq.id ? "rotate-180" : ""}`}
                  style={{ color: open === faq.id ? "#2563EB" : "#94A3B8" }} />
              </button>
              <AnimatePresence>
                {open === faq.id && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "#64748B" }}>{faq.answer}</p>
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
