import type { Metadata } from "next";
import { Suspense } from "react";
import { Nav } from "@/components/marketing/Nav";
import { Footer } from "@/components/marketing/Footer";
import { PricingPlans } from "@/components/marketing/PricingPlans";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "One simple plan for Beam — £14.99 per month or £49.99 per year. Cancel anytime.",
};

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="relative overflow-hidden pb-28 pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="beam-halo left-1/2 top-0 h-[360px] w-[620px] -translate-x-1/2 animate-halo-pulse" />
        </div>
        <div className="container-beam">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-balance text-4xl font-medium tracking-tight text-text sm:text-5xl">
              Simple pricing for a calmer day
            </h1>
            <p className="mt-5 text-base leading-relaxed text-text-muted sm:text-lg">
              Everything Beam does, for one clear price. Pay monthly, or save
              with annual. No tiers, no add-ons, no surprises.
            </p>
          </div>

          <div className="mt-14">
            <Suspense fallback={<div className="h-[420px]" />}>
              <PricingPlans />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
