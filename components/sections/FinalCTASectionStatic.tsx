"use client";

import { FinalCTAClient } from "./FinalCTAClient";

const DEFAULT = {
  heading: "Dijital sisteminizi bugün kurmaya başlayın.",
  subheading: "15 gün ücretsiz deneyin veya ekibimizden canlı demo talep edin.",
  cta_primary: "15 Gün Ücretsiz Dene",
  cta_primary_href: "/demo",
  cta_secondary: "Demo Talep Et",
  cta_secondary_href: "/iletisim",
  footnote: "Kredi kartı gerekmez · Kurulum desteği dahil · 15 gün ücretsiz",
};

export function FinalCTASectionStatic({ locale }: { locale: string }) {
  return <FinalCTAClient locale={locale} content={DEFAULT} />;
}
