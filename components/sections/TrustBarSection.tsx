"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const targets = [
  { icon: "💇‍♂️", label: "Saç Ekimi Merkezleri" },
  { icon: "✨", label: "Estetik Klinikleri" },
  { icon: "💅", label: "Güzellik Merkezleri" },
  { icon: "⚡", label: "Lazer Epilasyon" },
  { icon: "🔬", label: "Trikoloji Merkezleri" },
  { icon: "🏢", label: "Yerel İşletmeler" },
];

export function TrustBarSection() {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="section-white py-16 border-y" style={{ borderColor: "#F1F5F9" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="gsap-reveal text-center text-xs font-semibold uppercase tracking-widest mb-8" style={{ color: "#94A3B8" }}>
          Klinik, güzellik ve hizmet işletmeleri için geliştirildi
        </p>
        <div className="gsap-stagger grid grid-cols-3 sm:grid-cols-6 gap-3">
          {targets.map((t) => (
            <div key={t.label} className="gsap-item flex flex-col items-center gap-2 p-4 rounded-xl border border-transparent hover:border-blue-100 hover:bg-blue-50/50 transition-all group cursor-default">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{t.icon}</span>
              <span className="text-xs text-center font-medium leading-tight" style={{ color: "#64748B" }}>{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
