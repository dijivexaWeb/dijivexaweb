import { createClient } from "@/lib/supabase/server";
import { ProblemClient } from "./ProblemClient";

const DEFAULT_DATA = {
  heading: "Hasta, randevu, kasa ve stok takibi dağınık mı?",
  subheading: "Pek çok klinik bunları hâlâ çözemiyor. Dijivexa tüm bunları tek sistemde toplar.",
  cta: "✓ Dijivexa Clinic tüm klinik sürecini dijital ortamda toplar.",
  items: [
    "Hasta bilgileri WhatsApp'ta dağınık kalıyor.",
    "Randevular karışıyor, çift kayıt oluşuyor.",
    "Ödemeler Excel veya kağıtta takip ediliyor.",
    "Seanslar ve kontrol tarihleri unutuluyor.",
    "Stok tüketimi takip edilemiyor.",
    "Personel verimliliği ölçülemiyor.",
    "Reklamdan gelen leadler kaybolup gidiyor.",
    "Operasyon belgeleri kağıtta kalıyor.",
  ],
};

export async function ProblemSection() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "homepage_problems")
    .single();

  const problemData = (data?.value as typeof DEFAULT_DATA) ?? DEFAULT_DATA;
  return <ProblemClient data={problemData} />;
}
