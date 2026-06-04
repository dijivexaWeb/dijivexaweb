import { createClient } from "@/lib/supabase/server";
import { WhatsAppClient } from "./WhatsAppClient";

const DEFAULT = {
  badge: "💬 WhatsApp Entegrasyonu",
  heading: "Hastalarınızla iletişimi otomatikleştirin.",
  subheading: "Randevu hatırlatma, kontrol mesajları, kampanya bildirimi ve yorum daveti — hepsi WhatsApp üzerinden otomatik.",
  features: ["Otomatik randevu hatırlatması (24 saat önce)", "10. gün ve 1. ay kontrol mesajları", "Kampanya & yeni hizmet bildirimleri", "Google yorum daveti otomasyonu", "Toplu mesaj gönderimi"],
  cta_text: "WhatsApp Takip Sistemini İncele →",
  cta_href: "/whatsapp-takip",
};

export async function WhatsAppSection({ locale }: { locale: string }) {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("value").eq("key", "section_whatsapp").single();
  const content = (data?.value as typeof DEFAULT) ?? DEFAULT;
  return <WhatsAppClient locale={locale} content={content} />;
}
