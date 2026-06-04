import { createClient } from "@/lib/supabase/server";
import { ServicesGridClient } from "./ServicesGridClient";

export async function ServicesGridSection({ locale }: { locale: string }) {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from("site_services")
    .select("id, slug, name, tagline, short_description, cta_href")
    .eq("locale", locale)
    .eq("is_published", true)
    .order("sort_order");

  return <ServicesGridClient services={services ?? []} locale={locale} />;
}
