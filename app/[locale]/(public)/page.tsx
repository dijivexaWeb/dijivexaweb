import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBarSection } from "@/components/sections/TrustBarSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionGridSection } from "@/components/sections/SolutionGridSection";
import { AISection } from "@/components/sections/AISection";
import { WhatsAppSection } from "@/components/sections/WhatsAppSection";
import { ServicesGridSection } from "@/components/sections/ServicesGridSection";
import { DemoProcessSection } from "@/components/sections/DemoProcessSection";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { FAQSection } from "@/components/sections/FAQSection";
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
      <TrustBarSection />
      <ProblemSection />
      <SolutionGridSection locale={locale} />
      <AISection locale={locale} />
      <WhatsAppSection locale={locale} />
      <ServicesGridSection locale={locale} />
      <DemoProcessSection locale={locale} />
      <SecuritySection />
      <FAQSection />
      <FinalCTASection locale={locale} />
    </>
  );
}
