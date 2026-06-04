import { createClient } from "@/lib/supabase/server";
import { HeroClient } from "./HeroClient";

const DEFAULT = {
  badge: "Klinik & Güzellik Merkezleri İçin SaaS Yazılım",
  heading_line1: "Kliniğinizin Yönetimini",
  heading_highlight: "Bir Üst Seviyeye",
  heading_line2: "Taşıyın.",
  subheading: "Dijivexa; randevu, hasta takibi, kasa, stok, operasyon ve WhatsApp iletişimini tek platformda birleştirir. AI destekli, çok dilli, çok şubeli.",
  cta_primary: "Ücretsiz Deneyin",
  cta_primary_href: "/demo",
  cta_secondary: "Canlı Demo Talep Et",
  cta_secondary_href: "/iletisim",
  trust_items: ["Kredi kartı gerekmez", "15 gün ücretsiz", "Kurulum desteği dahil", "Çok dilli"],
};

export async function HeroSection({ locale }: { locale: string }) {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("value").eq("key", "section_hero").single();
  const content = (data?.value as typeof DEFAULT) ?? DEFAULT;
  return <HeroClient locale={locale} content={content} />;
}
