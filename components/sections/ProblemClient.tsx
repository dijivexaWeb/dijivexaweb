"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import { XCircle } from "lucide-react";

interface ProblemData {
  heading: string;
  subheading: string;
  cta: string;
  items: string[];
}

export function ProblemClient({ data }: { data: ProblemData }) {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="section-gray py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="gsap-reveal text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "#FEF3C7", color: "#92400E" }}>Sorunlar</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
            {data.heading.includes("dağınık") ? (
              <>
                {data.heading.split("dağınık")[0]}
                <span style={{ color: "#DC2626" }}>dağınık{data.heading.split("dağınık")[1]}</span>
              </>
            ) : data.heading}
          </h2>
          <p className="max-w-lg mx-auto" style={{ color: "#64748B" }}>{data.subheading}</p>
        </div>

        <div className="gsap-stagger grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {data.items.map((p) => (
            <div key={p} className="gsap-item flex gap-3 p-4 rounded-xl border bg-white hover:shadow-sm transition-all" style={{ borderColor: "#FEE2E2" }}>
              <XCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#F87171" }} />
              <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>{p}</p>
            </div>
          ))}
        </div>

        <div className="gsap-scale-in text-center p-6 rounded-2xl border" style={{ background: "linear-gradient(135deg, #EFF6FF, #F0FDFA)", borderColor: "#BFDBFE" }}>
          <p className="font-semibold text-lg" style={{ color: "#1E40AF" }}>{data.cta}</p>
        </div>
      </div>
    </section>
  );
}
