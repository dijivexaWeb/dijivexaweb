import { createClient } from "@/lib/supabase/server";
import { TrustBarClient } from "./TrustBarClient";

const DEFAULT_ITEMS = [
  { icon: "💇", label: "Saç Ekimi Merkezleri" },
  { icon: "✨", label: "Estetik Klinikleri" },
  { icon: "💅", label: "Güzellik Merkezleri" },
  { icon: "⚡", label: "Lazer Epilasyon" },
  { icon: "🔬", label: "Trikoloji Merkezleri" },
  { icon: "🏢", label: "Yerel İşletmeler" },
];

export async function TrustBarSection() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "homepage_trustbar")
    .single();

  const items = (data?.value as typeof DEFAULT_ITEMS) ?? DEFAULT_ITEMS;
  return <TrustBarClient items={items} />;
}
