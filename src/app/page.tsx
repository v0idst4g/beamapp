import { Nav } from "@/components/marketing/Nav";
import { Footer } from "@/components/marketing/Footer";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { FeatureBento } from "@/components/marketing/FeatureBento";
import { TrustBand } from "@/components/marketing/TrustBand";
import { PricingTeaser } from "@/components/marketing/PricingTeaser";
import { ClosingCTA } from "@/components/marketing/ClosingCTA";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <FeatureBento />
        <TrustBand />
        <PricingTeaser />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
