import { HeroSection } from "@/components/sections/HeroSection";
import { TwoPillarsSection } from "@/components/sections/TwoPillarsSection";
import { SoftwareProductsSection } from "@/components/sections/SoftwareProductsSection";
import { AgencyServicesSection } from "@/components/sections/AgencyServicesSection";
import { WhyBatumiSection } from "@/components/sections/WhyBatumiSection";
import { CompanyStatsSection } from "@/components/sections/CompanyStatsSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <HeroSection locale={locale} />
      <TwoPillarsSection locale={locale} />
      <SoftwareProductsSection locale={locale} />
      <AgencyServicesSection locale={locale} />
      <WhyBatumiSection />
      <CompanyStatsSection />
      <FinalCTASection locale={locale} />
    </>
  );
}
