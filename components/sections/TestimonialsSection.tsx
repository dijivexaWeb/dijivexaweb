import { createClient } from "@/lib/supabase/server";
import { TestimonialsSectionClient } from "./TestimonialsSectionClient";

export async function TestimonialsSection({ locale = "tr" }: { locale?: string }) {
  const supabase = await createClient();

  const { data: testimonials } = await supabase
    .from("site_testimonials")
    .select("*")
    .eq("locale", locale)
    .eq("is_published", true)
    .order("sort_order");

  return <TestimonialsSectionClient testimonials={testimonials ?? []} />;
}
