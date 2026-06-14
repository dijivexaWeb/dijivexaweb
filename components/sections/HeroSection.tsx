import { createClient } from "@/lib/supabase/server";
import { HeroClient } from "./HeroClient";

const DEFAULT = {
  badge: "41.6168° N, 41.6367° E — Batumi, Gürcistan",
  heading_line1: "Üretiyoruz.",
  heading_highlight: "Tasarlarız.",
  heading_line2: "Batumi'den.",
  subheading: "Yazılım geliştirmeden sosyal medya yönetimine, grafik tasarımdan SaaS ürünlere — Kafkasya'nın dijital teknoloji ortağı.",
  cta_primary: "Hizmetleri Keşfet",
  cta_primary_href: "/hizmetler",
  cta_secondary: "Dijivexa Clinic'i Dene",
  cta_secondary_href: "/demo",
  trust_items: ["Gürcistan kayıtlı şirket", "3 dil bilen ekip", "40+ aktif müşteri", "TR · EN · KA · RU"],
};

export async function HeroSection({ locale }: { locale: string }) {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("value").eq("key", "section_hero").single();
  const content = (data?.value as typeof DEFAULT) ?? DEFAULT;
  return <HeroClient locale={locale} content={content} />;
}
