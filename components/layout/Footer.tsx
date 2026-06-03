import Link from "next/link";
import { useTranslations } from "next-intl";

const footerLinks = {
  product: [
    { label: "Dijivexa Clinic", href: "/dijivexa-clinic" },
    { label: "Özellikler", href: "/ozellikler" },
    { label: "AI Klinik Asistan", href: "/ai-klinik-asistani" },
    { label: "WhatsApp Takip", href: "/whatsapp-takip" },
    { label: "Fiyatlandırma", href: "/fiyatlandirma" },
  ],
  solutions: [
    { label: "Saç Ekimi Merkezleri", href: "/sac-ekimi-merkezleri" },
    { label: "Estetik Klinikleri", href: "/estetik-klinikleri" },
    { label: "Güzellik Merkezleri", href: "/guzellik-merkezleri" },
    { label: "Lazer Epilasyon", href: "/lazer-epilasyon-merkezleri" },
    { label: "Trikoloji Merkezleri", href: "/trikoloji-merkezleri" },
  ],
  services: [
    { label: "Dijivexa Growth", href: "/dijivexa-growth" },
    { label: "Dijivexa Web", href: "/dijivexa-web" },
    { label: "Dijivexa Mobile", href: "/dijivexa-mobile" },
    { label: "Dijivexa Studio", href: "/dijivexa-studio" },
    { label: "Dijivexa AI", href: "/dijivexa-ai" },
  ],
  company: [
    { label: "Blog", href: "/blog" },
    { label: "İletişim", href: "/iletisim" },
    { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
    { label: "Kullanım Şartları", href: "/kullanim-sartlari" },
    { label: "KVKK", href: "/kvkk" },
  ],
};

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#07111F] border-t border-[#1e2d45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href={`/${locale}`} className="text-xl font-bold text-white">
              Dijivexa
            </Link>
            <p className="mt-3 text-sm text-[#64748B] max-w-xs leading-relaxed">
              {t("tagline")}
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="w-8 h-8 rounded-lg bg-[#1e2d45] flex items-center justify-center text-[#64748B] hover:text-white hover:bg-[#2563EB] transition-colors text-xs font-bold">in</a>
              <a href="#" className="w-8 h-8 rounded-lg bg-[#1e2d45] flex items-center justify-center text-[#64748B] hover:text-white hover:bg-[#2563EB] transition-colors text-xs font-bold">ig</a>
              <a href="#" className="w-8 h-8 rounded-lg bg-[#1e2d45] flex items-center justify-center text-[#64748B] hover:text-white hover:bg-[#2563EB] transition-colors text-xs font-bold">tw</a>
            </div>
          </div>

          {/* Ürün */}
          <div>
            <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-4">Ürün</p>
            <ul className="space-y-2.5">
              {footerLinks.product.map((l) => (
                <li key={l.href}>
                  <Link href={`/${locale}${l.href}`} className="text-sm text-[#94a3b8] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Çözümler */}
          <div>
            <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-4">Çözümler</p>
            <ul className="space-y-2.5">
              {footerLinks.solutions.map((l) => (
                <li key={l.href}>
                  <Link href={`/${locale}${l.href}`} className="text-sm text-[#94a3b8] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hizmetler */}
          <div>
            <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-4">Hizmetler</p>
            <ul className="space-y-2.5">
              {footerLinks.services.map((l) => (
                <li key={l.href}>
                  <Link href={`/${locale}${l.href}`} className="text-sm text-[#94a3b8] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Şirket */}
          <div>
            <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-4">Şirket</p>
            <ul className="space-y-2.5">
              {footerLinks.company.map((l) => (
                <li key={l.href}>
                  <Link href={`/${locale}${l.href}`} className="text-sm text-[#94a3b8] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1e2d45] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#64748B]">
            © {new Date().getFullYear()} Dijivexa. {t("rights")}
          </p>
          <div className="flex items-center gap-4">
            {[
              { code: "tr", label: "TR" },
              { code: "en", label: "EN" },
              { code: "ka", label: "KA" },
              { code: "ru", label: "RU" },
            ].map((l) => (
              <Link
                key={l.code}
                href={`/${l.code}`}
                className={`text-xs transition-colors ${l.code === locale ? "text-white font-semibold" : "text-[#64748B] hover:text-white"}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
