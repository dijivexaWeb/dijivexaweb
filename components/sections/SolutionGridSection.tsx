import { createClient } from "@/lib/supabase/server";
import { SolutionGridClient } from "./SolutionGridClient";

export async function SolutionGridSection({ locale }: { locale: string }) {
  const supabase = await createClient();
  const { data: modules } = await supabase
    .from("site_modules")
    .select("id, slug, name, short_description, icon, cta_href")
    .eq("locale", locale)
    .eq("is_published", true)
    .order("sort_order");

  return <SolutionGridClient modules={modules ?? []} locale={locale} />;
}
