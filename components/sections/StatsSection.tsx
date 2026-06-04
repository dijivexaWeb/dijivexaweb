import { createClient } from "@/lib/supabase/server";
import { StatsClient } from "./StatsClient";

const DEFAULT_STATS = [
  { value: 500, suffix: "+", label: "Aktif Klinik", icon: "🏥" },
  { value: 25000, suffix: "+", label: "Hasta Kaydı", icon: "👤" },
  { value: 1000000, suffix: "+", label: "Randevu İşlendi", icon: "📅" },
  { value: 99.9, suffix: "%", label: "Sistem Uptime", icon: "⚡" },
];

export async function StatsSection() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "homepage_stats")
    .single();

  const stats = (data?.value as typeof DEFAULT_STATS) ?? DEFAULT_STATS;
  return <StatsClient stats={stats} />;
}
