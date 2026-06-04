"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { FinalCTASectionStatic } from "@/components/sections/FinalCTASectionStatic";
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { use } from "react";

interface ContactFormValues {
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: Mail,
    label: "E-posta",
    value: "info@dijivexa.com",
    href: "mailto:info@dijivexa.com",
    color: "#2563EB",
  },
  {
    icon: Phone,
    label: "Telefon / WhatsApp",
    value: "+90 (532) 000 00 00",
    href: "tel:+905320000000",
    color: "#16A34A",
  },
  {
    icon: MapPin,
    label: "Ofis",
    value: "İstanbul, Türkiye",
    href: "#",
    color: "#F59E0B",
  },
];

export default function IletisimPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useScrollReveal();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>();

  async function onSubmit(data: ContactFormValues) {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: sbError } = await supabase.from("site_form_submissions").insert({
        form_slug: "contact",
        data: { ...data, locale, submitted_at: new Date().toISOString() },
        status: "new",
      });
      if (sbError) throw sbError;
      setSubmitted(true);
      reset();
    } catch {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  const inputCls = "w-full px-4 py-3 text-sm rounded-xl border outline-none focus:ring-2 focus:ring-blue-100 transition-all";
  const inputStyle = { borderColor: "#E2E8F0", color: "#0F172A" };

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: "#EFF6FF", color: "#1D4ED8" }}>İletişim</span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight" style={{ color: "#0F172A" }}>
              Sizinle konuşalım.
            </h1>
            <p style={{ color: "#64748B" }}>
              Demo talebi, teklif veya sorularınız için formu doldurun. Ekibimiz en kısa sürede dönüş yapar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact + Form */}
      <section ref={formRef} className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="gsap-reveal">
                <h2 className="text-xl font-bold mb-2" style={{ color: "#0F172A" }}>İletişim Bilgileri</h2>
                <p className="text-sm" style={{ color: "#64748B" }}>Ortalama yanıt süresi: 2 iş saati</p>
              </div>
              <div className="gsap-stagger space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="gsap-item flex items-start gap-4 p-4 bg-white rounded-2xl border hover:shadow-sm transition-all"
                    style={{ borderColor: "#F1F5F9" }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${info.color}12` }}>
                      <info.icon className="w-5 h-5" style={{ color: info.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold mb-0.5" style={{ color: "#64748B" }}>{info.label}</p>
                      <p className="text-sm font-medium" style={{ color: "#0F172A" }}>{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-6 p-5 rounded-2xl border"
                style={{ background: "linear-gradient(135deg, #EFF6FF, #F0FDFA)", borderColor: "#BFDBFE" }}>
                <h3 className="font-semibold text-sm mb-2" style={{ color: "#1D4ED8" }}>Demo İste</h3>
                <p className="text-xs mb-3" style={{ color: "#64748B" }}>
                  15 günlük ücretsiz demo için demo sayfasını kullanın.
                </p>
                <a href={`/${locale}/demo`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold"
                  style={{ color: "#2563EB" }}>
                  Demo Formu <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl border p-10 text-center h-full flex flex-col items-center justify-center"
                  style={{ borderColor: "#BFDBFE" }}
                >
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: "#DCFCE7" }}>
                    <CheckCircle2 className="w-8 h-8" style={{ color: "#16A34A" }} />
                  </div>
                  <h2 className="text-xl font-bold mb-3" style={{ color: "#0F172A" }}>Mesajınız alındı!</h2>
                  <p style={{ color: "#64748B" }}>En kısa sürede dönüş yapacağız.</p>
                </motion.div>
              ) : (
                <div className="bg-white rounded-3xl border overflow-hidden"
                  style={{ borderColor: "#E2E8F0", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
                  <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: "#64748B" }}>Ad Soyad *</label>
                        <input
                          {...register("full_name", { required: "Ad soyad gerekli" })}
                          className={inputCls} style={inputStyle} placeholder="Ad Soyad"
                        />
                        {errors.full_name && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.full_name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: "#64748B" }}>E-posta *</label>
                        <input
                          {...register("email", {
                            required: "E-posta gerekli",
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Geçerli e-posta girin" },
                          })}
                          type="email" className={inputCls} style={inputStyle} placeholder="ad@ornek.com"
                        />
                        {errors.email && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.email.message}</p>}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: "#64748B" }}>Telefon</label>
                        <input
                          {...register("phone")}
                          type="tel" className={inputCls} style={inputStyle} placeholder="+90 5XX XXX XX XX"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: "#64748B" }}>Konu *</label>
                        <select
                          {...register("subject", { required: "Konu seçin" })}
                          className={inputCls} style={inputStyle}
                        >
                          <option value="">Seçin...</option>
                          <option value="demo">Demo Talebi</option>
                          <option value="teklif">Teklif İsteği</option>
                          <option value="destek">Teknik Destek</option>
                          <option value="diger">Diğer</option>
                        </select>
                        {errors.subject && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.subject.message}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#64748B" }}>Mesaj *</label>
                      <textarea
                        {...register("message", { required: "Mesaj gerekli", minLength: { value: 10, message: "En az 10 karakter girin" } })}
                        rows={5} className={`${inputCls} resize-none`} style={inputStyle}
                        placeholder="Mesajınızı buraya yazın..."
                      />
                      {errors.message && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.message.message}</p>}
                    </div>
                    {error && (
                      <div className="p-3 rounded-xl text-sm" style={{ background: "#FEF2F2", color: "#DC2626" }}>{error}</div>
                    )}
                    <button
                      type="submit" disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white rounded-xl transition-all hover:-translate-y-0.5 disabled:opacity-60"
                      style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)", boxShadow: "0 8px 24px rgba(37,99,235,0.3)" }}
                    >
                      {loading ? "Gönderiliyor..." : <>Gönder <ArrowRight className="w-4 h-4" /></>}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <FinalCTASectionStatic locale={locale} />
    </>
  );
}
