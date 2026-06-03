"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { Shield, Lock, Database, FileCheck, RotateCcw, Eye } from "lucide-react";

const items = [
  { icon: Shield, label: "Yetki Yönetimi", desc: "Rol bazlı erişim kontrolü. Her kullanıcı sadece yetkili alana girer.", color: "#3B82F6" },
  { icon: Lock, label: "Veri İzolasyonu", desc: "Her klinik kendi güvenli alanında. Veriler karışmaz.", color: "#0D9488" },
  { icon: Eye, label: "Güvenli Oturum", desc: "JWT token doğrulama, oturum yönetimi.", color: "#8B5CF6" },
  { icon: FileCheck, label: "Audit Log", desc: "Tüm işlemler kayıt altında. Kimin ne yaptığı izlenir.", color: "#F59E0B" },
  { icon: RotateCcw, label: "Günlük Yedekleme", desc: "Otomatik günlük yedekleme, veri kaybı yok.", color: "#10B981" },
  { icon: Database, label: "Soft Delete", desc: "Veriler fiziksel silinmez. İstediğinizde geri alınabilir.", color: "#6366F1" },
];

export function SecuritySection() {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="section-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="gsap-reveal text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "#EFF6FF", color: "#1D4ED8" }}>Güvenlik</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>Veriniz güvenli, erişiminiz kontrollü.</h2>
          <p className="max-w-lg mx-auto" style={{ color: "#64748B" }}>Bulut tabanlı mimari, yetki kontrolü, veri izolasyonu ve günlük yedekleme.</p>
        </div>

        <div className="gsap-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                className="gsap-item p-6 rounded-2xl border bg-white hover:shadow-md transition-all"
                style={{ borderColor: "#F1F5F9" }}
                whileHover={{ y: -3, borderColor: item.color + "30" }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: item.color + "12" }}>
                  <Icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <h3 className="font-semibold mb-1.5" style={{ color: "#0F172A" }}>{item.label}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
