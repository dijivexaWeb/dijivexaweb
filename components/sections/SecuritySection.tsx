"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Database, FileCheck, RotateCcw, Eye } from "lucide-react";

const items = [
  { icon: Shield, label: "Yetki yönetimi", desc: "Rol bazlı erişim kontrolü" },
  { icon: Lock, label: "Veri izolasyonu", desc: "Klinik bazlı güvenli alan" },
  { icon: Eye, label: "Güvenli oturum", desc: "JWT token doğrulama" },
  { icon: FileCheck, label: "Audit log", desc: "Tüm işlemler kayıt altında" },
  { icon: RotateCcw, label: "Günlük yedekleme", desc: "Otomatik veri yedekleme" },
  { icon: Database, label: "Soft delete", desc: "Veriler fiziksel silinmez" },
];

export function SecuritySection() {
  return (
    <section className="py-24 bg-[#07111F] relative overflow-hidden">
      {/* Dark grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Veriniz güvenli, erişiminiz kontrollü.
          </h2>
          <p className="text-[#64748B] max-w-xl mx-auto">
            Dijivexa bulut tabanlı mimari, yetki kontrollü erişim, veri izolasyonu ve günlük yedekleme ile çalışır.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-5 rounded-2xl bg-[#0B172A]/80 border border-[#1e2d45] hover:border-[#2563EB]/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 flex items-center justify-center mb-4 group-hover:bg-[#2563EB]/20 transition-colors">
                  <Icon className="w-5 h-5 text-[#38BDF8]" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{item.label}</h3>
                <p className="text-[#64748B] text-xs">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
