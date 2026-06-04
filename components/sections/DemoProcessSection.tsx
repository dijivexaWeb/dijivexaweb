import { createClient } from "@/lib/supabase/server";
import { DemoProcessClient } from "./DemoProcessClient";

const DEFAULT = {
  heading: "Dijivexa'yı 15 Gün Ücretsiz Deneyin",
  subheading: "Demo hesabınızı oluşturun. Kredi kartı gerekmez, anında erişim sağlayın.",
  steps: [
    { num: "01", text: "Formu doldurun — 2 dakika sürer" },
    { num: "02", text: "Demo hesabınız otomatik açılır" },
    { num: "03", text: "15 gün tüm modülleri test edin" },
  ],
  badges: ["500+ aktif klinik", "Kurulum desteği", "Türkçe arayüz"],
};

export async function DemoProcessSection({ locale }: { locale: string }) {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("value").eq("key", "section_demo").single();
  const content = (data?.value as typeof DEFAULT) ?? DEFAULT;
  return <DemoProcessClient locale={locale} content={content} />;
}
