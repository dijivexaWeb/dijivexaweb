import { createClient } from "@/lib/supabase/server";
import { FAQClient } from "./FAQClient";

export async function FAQSection({ locale = "tr", pageSlug = "home" }: { locale?: string; pageSlug?: string }) {
  const supabase = await createClient();
  const { data: faqs } = await supabase
    .from("site_faqs")
    .select("id, question, answer")
    .eq("locale", locale)
    .eq("is_published", true)
    .or(`page_slug.eq.${pageSlug},page_slug.is.null`)
    .order("sort_order")
    .limit(10);

  return <FAQClient faqs={faqs ?? []} />;
}
