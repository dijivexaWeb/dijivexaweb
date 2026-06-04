import { createClient } from "@/lib/supabase/server";
import { AIClient } from "./AIClient";

const DEFAULT = {
  badge: "AI Asistanımız Her Zaman Yanınızda",
  heading: "AI destekli klinik değerlendirme.",
  subheading: "Muayene formundaki bilgileri analiz ederek klinik özet, takip notu ve tedavi önerisi taslağı oluşturur. Ekibiniz daha düzenli çalışır.",
  features: ["Muayene özetini otomatik oluşturur", "Risk bilgilerini görünür kılar", "Tedavi önerisi taslağı hazırlar", "Doktor notlarını düzenler", "Kliniğe özel API key desteği"],
  disclaimer: "Nihai karar klinik ekibine aittir. AI asistan yardımcı olur, karar vermez.",
  cta_text: "AI Klinik Asistanı İncele →",
  cta_href: "/ai-klinik-asistani",
};

export async function AISection({ locale }: { locale: string }) {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("value").eq("key", "section_ai").single();
  const content = (data?.value as typeof DEFAULT) ?? DEFAULT;
  return <AIClient locale={locale} content={content} />;
}
