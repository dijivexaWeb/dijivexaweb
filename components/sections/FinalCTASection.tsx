import { createClient } from "@/lib/supabase/server";
import { FinalCTAClient } from "./FinalCTAClient";

const DEFAULT = {
  heading: "Dijital sisteminizi bugün kurmaya başlayın.",
  subheading: "15 gün ücretsiz deneyin veya ekibimizden canlı demo talep edin.",
  cta_primary: "15 Gün Ücretsiz Dene",
  cta_primary_href: "/demo",
  cta_secondary: "Demo Talep Et",
  cta_secondary_href: "/iletisim",
  footnote: "Kredi kartı gerekmez · Kurulum desteği dahil · 15 gün ücretsiz",
};

export async function FinalCTASection({ locale }: { locale: string }) {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("value").eq("key", "section_finalcta").single();
  const content = (data?.value as typeof DEFAULT) ?? DEFAULT;
  return <FinalCTAClient locale={locale} content={content} />;
}
