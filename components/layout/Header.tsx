"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X, Globe } from "lucide-react";

const locales = [
  { code: "tr", label: "TR", flag: "🇹🇷" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "ka", label: "KA", flag: "🇬🇪" },
  { code: "ru", label: "RU", flag: "🇷🇺" },
];

const productItems = [
  { label: "Dijivexa Clinic", href: "/dijivexa-clinic", desc: "Klinik yönetim yazılımı" },
  { label: "Hasta & Randevu", href: "/dijivexa-clinic", desc: "Dijital hasta dosyası ve takvim" },
  { label: "Kasa & Stok", href: "/kasa-stok-yonetimi", desc: "Finansal takip" },
  { label: "Operasyon Modülü", href: "/operasyon-yonetimi", desc: "Saç ekimi operasyonu" },
  { label: "WhatsApp Takip", href: "/whatsapp-takip", desc: "Otomatik bildirimler" },
  { label: "AI Klinik Asistan", href: "/ai-klinik-asistani", desc: "Yapay zeka desteği" },
  { label: "Tüm Özellikler", href: "/ozellikler", desc: "16+ modül ve özellik" },
];

const solutionItems = [
  { label: "Saç Ekimi Merkezleri", href: "/sac-ekimi-merkezleri" },
  { label: "Estetik Klinikleri", href: "/estetik-klinikleri" },
  { label: "Güzellik Merkezleri", href: "/guzellik-merkezleri" },
  { label: "Lazer Epilasyon", href: "/lazer-epilasyon-merkezleri" },
  { label: "Trikoloji Merkezleri", href: "/trikoloji-merkezleri" },
  { label: "Çok Şubeli Klinikler", href: "/dijivexa-clinic#cok-subeli" },
];

const serviceItems = [
  { label: "Dijivexa Growth", href: "/dijivexa-growth", desc: "Sosyal medya & reklam" },
  { label: "Dijivexa Web", href: "/dijivexa-web", desc: "Web sitesi geliştirme" },
  { label: "Dijivexa Mobile", href: "/dijivexa-mobile", desc: "Mobil uygulama" },
  { label: "Dijivexa Studio", href: "/dijivexa-studio", desc: "Özel yazılım" },
  { label: "Dijivexa AI", href: "/dijivexa-ai", desc: "AI & otomasyon" },
];

interface DropdownItem { label: string; href: string; desc?: string; }

function Dropdown({ items, locale }: { items: DropdownItem[]; locale: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18 }}
      className="absolute top-full left-0 mt-2 w-64 bg-[#0B172A]/95 backdrop-blur-xl border border-[#1e2d45] rounded-xl shadow-2xl overflow-hidden z-50"
    >
      {items.map((item) => (
        <Link
          key={item.label}
          href={`/${locale}${item.href}`}
          className="flex flex-col px-4 py-3 hover:bg-[#2563EB]/10 transition-colors"
        >
          <span className="text-white text-sm font-medium">{item.label}</span>
          {item.desc && <span className="text-[#64748B] text-xs mt-0.5">{item.desc}</span>}
        </Link>
      ))}
    </motion.div>
  );
}

export function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navItems = [
    { key: "product", label: t("product"), items: productItems },
    { key: "solutions", label: t("solutions"), items: solutionItems },
    { key: "services", label: t("services"), items: serviceItems },
    { key: "pricing", label: t("pricing"), href: `/${locale}/fiyatlandirma` },
    { key: "blog", label: t("blog"), href: `/${locale}/blog` },
    { key: "contact", label: t("contact"), href: `/${locale}/iletisim` },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b shadow-lg"
            : "border-b border-white/5"
        )}
        style={{
          background: scrolled
            ? "rgba(12,28,65,0.97)"
            : "rgba(12,28,65,0.85)",
          backdropFilter: "blur(16px)",
          borderColor: scrolled ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.05)",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-bold text-white tracking-tight">Dijivexa</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.href ? (
                <Link
                  key={item.key}
                  href={item.href}
                  className="px-3 py-2 text-sm text-white/75 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ) : (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.key)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-sm text-white/75 hover:text-white transition-colors rounded-lg hover:bg-white/10">
                    {item.label}
                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", openMenu === item.key && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {openMenu === item.key && item.items && (
                      <Dropdown items={item.items} locale={locale} />
                    )}
                  </AnimatePresence>
                </div>
              )
            )}
          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative" onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm text-[#94a3b8] hover:text-white transition-colors rounded-lg hover:bg-white/5">
                <Globe className="w-4 h-4" />
                <span>{locale.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute right-0 top-full mt-1 bg-[#0B172A]/95 backdrop-blur-xl border border-[#1e2d45] rounded-xl overflow-hidden shadow-2xl"
                  >
                    {locales.map((l) => (
                      <Link
                        key={l.code}
                        href={pathname.replace(`/${locale}`, `/${l.code}`)}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-[#2563EB]/10 transition-colors",
                          l.code === locale ? "text-white" : "text-[#94a3b8]"
                        )}
                      >
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="https://app.dijivexa.com/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white border border-white/15 hover:border-white/30 rounded-lg transition-colors"
            >
              Klinik Girişi
            </a>

            <Link
              href={`/${locale}/demo`}
              className="px-4 py-2 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1d4ed8] rounded-lg transition-colors"
            >
              {t("trialCta")}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-[#94a3b8] hover:text-white transition-colors p-2"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#07111F] pt-16 overflow-y-auto lg:hidden"
          >
            <nav className="px-4 py-6 space-y-1">
              {navItems.map((item) => (
                item.href ? (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-[#94a3b8] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div key={item.key}>
                    <p className="px-4 py-2 text-xs font-semibold text-[#64748B] uppercase tracking-wider mt-4">{item.label}</p>
                    {item.items?.map((sub) => (
                      <Link
                        key={sub.href}
                        href={`/${locale}${sub.href}`}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-2.5 text-sm text-[#94a3b8] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )
              ))}
              <div className="pt-6 space-y-3">
                <a href="https://app.dijivexa.com/admin" target="_blank" rel="noopener noreferrer" className="block text-center px-4 py-3 text-[#94a3b8] hover:text-white border border-[#1e2d45] rounded-lg">
                  Klinik Girişi
                </a>
                <Link href={`/${locale}/demo`} onClick={() => setMobileOpen(false)} className="block text-center px-4 py-3 text-white bg-[#2563EB] hover:bg-[#1d4ed8] rounded-lg font-semibold">
                  {t("trialCta")}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden px-4 pb-4 pt-2 bg-gradient-to-t from-[#07111F] to-transparent">
        <Link
          href={`/${locale}/demo`}
          className="block w-full text-center py-3.5 text-white font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-lg shadow-[#2563EB]/30 transition-colors"
        >
          {t("demoCta")}
        </Link>
      </div>
    </>
  );
}
