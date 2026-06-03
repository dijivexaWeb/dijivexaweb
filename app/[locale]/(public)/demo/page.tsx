"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { CheckCircle2, ArrowRight, Building2, User, Phone, Mail, Globe } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { use } from "react";

interface DemoFormValues {
  clinic_name: string;
  clinic_type: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  branch_count: string;
  how_heard: string;
  notes: string;
}

const clinicTypes = [
  "Saç Ekimi Merkezi",
  "Estetik Klinik",
  "Güzellik Merkezi",
  "Lazer Epilasyon",
  "Trikoloji Kliniği",
  "Dermatoloji",
  "Diğer",
];

const cities = [
  "İstanbul", "Ankara", "İzmir", "Bursa", "Antalya",
  "Adana", "Gaziantep", "Konya", "Tiflis", "Batumi", "Diğer",
];

const howHeardOptions = [
  "Google Arama",
  "Sosyal Medya",
  "Tavsiye",
  "LinkedIn",
  "Reklam",
  "Diğer",
];

const steps = [
  { n: "1", title: "Formu doldurun", desc: "2 dakika." },
  { n: "2", title: "Demo hesabı açılır", desc: "Anında." },
  { n: "3", title: "15 gün deneyin", desc: "Ücretsiz, kredi kart yok." },
];

export default function DemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useScrollReveal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DemoFormValues>();

  async function onSubmit(data: DemoFormValues) {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: sbError } = await supabase.from("site_form_submissions").insert({
        form_slug: "demo-request",
        data: {
          ...data,
          locale,
          submitted_at: new Date().toISOString(),
        },
        status: "new",
      });
      if (sbError) throw sbError;
      setSubmitted(true);
      reset();
    } catch (err: unknown) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const inputCls = "w-full px-4 py-3 text-sm rounded-xl border outline-none focus:ring-2 transition-all";
  const inputStyle = { borderColor: "#E2E8F0", color: "#0F172A" };
  const labelCls = "block text-xs font-semibold mb-1.5";
  const labelStyle = { color: "#64748B" };
  const errorCls = "text-xs mt-1" as const;
  const errorStyle = { color: "#EF4444" };

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #0F2553 0%, #1A3A6B 55%, #112B60 100%)" }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.2) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
              style={{ background: "rgba(59,130,246,0.1)", borderColor: "rgba(59,130,246,0.25)", color: "#93C5FD" }}>
              15 Gün Ücretsiz Demo
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
              Demo hesabınızı şimdi açın.
            </h1>
            <p style={{ color: "#94A3B8" }}>
              Formu doldurun, 15 gün boyunca tüm modülleri ücretsiz test edin. Kredi kartı gerekmez.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-10 bg-white border-b" style={{ borderColor: "#F1F5F9" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {steps.map((s) => (
              <div key={s.n} className="flex items-center gap-3 flex-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)" }}>{s.n}</div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#0F172A" }}>{s.title}</p>
                  <p className="text-xs" style={{ color: "#64748B" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section ref={formRef} className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl border p-10 text-center"
              style={{ borderColor: "#BFDBFE", boxShadow: "0 24px 64px rgba(37,99,235,0.08)" }}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ background: "#DCFCE7" }}>
                <CheckCircle2 className="w-8 h-8" style={{ color: "#16A34A" }} />
              </div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: "#0F172A" }}>Başvurunuz alındı!</h2>
              <p className="mb-6" style={{ color: "#64748B" }}>
                En kısa sürede sizinle iletişime geçeceğiz ve demo hesabınızı açacağız.
              </p>
              <p className="text-sm" style={{ color: "#94A3B8" }}>
                Ortalama yanıt süresi: <strong>2 iş saati</strong>
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border overflow-hidden"
              style={{ borderColor: "#E2E8F0", boxShadow: "0 24px 64px rgba(0,0,0,0.06)" }}
            >
              <div className="px-8 pt-8 pb-6 border-b" style={{ borderColor: "#F1F5F9" }}>
                <h2 className="text-xl font-bold mb-1" style={{ color: "#0F172A" }}>Demo Kayıt Formu</h2>
                <p className="text-sm" style={{ color: "#64748B" }}>Tüm alanları doldurun, 2 dakika sürer.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">

                {/* Clinic info */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 className="w-4 h-4" style={{ color: "#2563EB" }} />
                    <h3 className="text-sm font-semibold" style={{ color: "#0F172A" }}>Klinik Bilgileri</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls} style={labelStyle}>Klinik Adı *</label>
                      <input
                        {...register("clinic_name", { required: "Klinik adı gerekli" })}
                        className={inputCls}
                        style={inputStyle}
                        placeholder="Örn: Medika Klinik"
                      />
                      {errors.clinic_name && <p className={errorCls} style={errorStyle}>{errors.clinic_name.message}</p>}
                    </div>
                    <div>
                      <label className={labelCls} style={labelStyle}>Klinik Türü *</label>
                      <select
                        {...register("clinic_type", { required: "Klinik türü seçin" })}
                        className={inputCls}
                        style={inputStyle}
                      >
                        <option value="">Seçin...</option>
                        {clinicTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.clinic_type && <p className={errorCls} style={errorStyle}>{errors.clinic_type.message}</p>}
                    </div>
                    <div>
                      <label className={labelCls} style={labelStyle}>Şehir</label>
                      <select {...register("city")} className={inputCls} style={inputStyle}>
                        <option value="">Seçin...</option>
                        {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls} style={labelStyle}>Şube Sayısı</label>
                      <select {...register("branch_count")} className={inputCls} style={inputStyle}>
                        <option value="1">1 Şube</option>
                        <option value="2-3">2-3 Şube</option>
                        <option value="4+">4+ Şube</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Contact info */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <User className="w-4 h-4" style={{ color: "#2563EB" }} />
                    <h3 className="text-sm font-semibold" style={{ color: "#0F172A" }}>İletişim Bilgileri</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className={labelCls} style={labelStyle}>Ad Soyad *</label>
                      <input
                        {...register("full_name", { required: "Ad soyad gerekli" })}
                        className={inputCls}
                        style={inputStyle}
                        placeholder="Ad Soyad"
                      />
                      {errors.full_name && <p className={errorCls} style={errorStyle}>{errors.full_name.message}</p>}
                    </div>
                    <div>
                      <label className={labelCls} style={labelStyle}>
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" /> E-posta *
                        </div>
                      </label>
                      <input
                        {...register("email", {
                          required: "E-posta gerekli",
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Geçerli e-posta girin" },
                        })}
                        type="email"
                        className={inputCls}
                        style={inputStyle}
                        placeholder="ad@klinik.com"
                      />
                      {errors.email && <p className={errorCls} style={errorStyle}>{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className={labelCls} style={labelStyle}>
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" /> Telefon *
                        </div>
                      </label>
                      <input
                        {...register("phone", {
                          required: "Telefon gerekli",
                          minLength: { value: 10, message: "Geçerli telefon girin" },
                        })}
                        type="tel"
                        className={inputCls}
                        style={inputStyle}
                        placeholder="+90 5XX XXX XX XX"
                      />
                      {errors.phone && <p className={errorCls} style={errorStyle}>{errors.phone.message}</p>}
                    </div>
                  </div>
                </div>

                {/* How heard */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-4 h-4" style={{ color: "#2563EB" }} />
                    <h3 className="text-sm font-semibold" style={{ color: "#0F172A" }}>Ek Bilgiler</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className={labelCls} style={labelStyle}>Bizi nereden duydunuz?</label>
                      <select {...register("how_heard")} className={inputCls} style={inputStyle}>
                        <option value="">Seçin...</option>
                        {howHeardOptions.map((h) => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls} style={labelStyle}>Notlar / Beklentiler</label>
                      <textarea
                        {...register("notes")}
                        rows={3}
                        className={`${inputCls} resize-none`}
                        style={inputStyle}
                        placeholder="Klinik özellikleriniz veya beklentileriniz hakkında not..."
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-xl text-sm" style={{ background: "#FEF2F2", color: "#DC2626" }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 text-base font-semibold text-white rounded-xl transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)", boxShadow: "0 8px 24px rgba(37,99,235,0.35)" }}
                >
                  {loading ? "Gönderiliyor..." : <>Demo Hesabı Aç <ArrowRight className="w-5 h-5" /></>}
                </button>

                <p className="text-center text-xs" style={{ color: "#94A3B8" }}>
                  Formu göndererek{" "}
                  <a href={`/${locale}/gizlilik-politikasi`} className="underline" style={{ color: "#2563EB" }}>Gizlilik Politikası</a>
                  {" "}ve{" "}
                  <a href={`/${locale}/kvkk`} className="underline" style={{ color: "#2563EB" }}>KVKK Aydınlatma Metni</a>
                  {" "}koşullarını kabul etmiş olursunuz.
                </p>
              </form>
            </motion.div>
          )}
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-10 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Kredi kartı gerekmez",
              "15 gün ücretsiz",
              "Kurulum desteği dahil",
              "İptal koşulu yok",
            ].map((t) => (
              <div key={t} className="flex items-center gap-2 text-sm" style={{ color: "#64748B" }}>
                <CheckCircle2 className="w-4 h-4" style={{ color: "#2DD4BF" }} />
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTASection locale={locale} />
    </>
  );
}
