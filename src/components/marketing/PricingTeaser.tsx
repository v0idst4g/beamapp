"use client";

import Link from "next/link";
import { Reveal } from "./Reveal";
import { PLANS } from "@/lib/constants";
import { ArrowRightIcon } from "@/components/icons";

export function PricingTeaser() {
  return (
    <section id="pricing" className="py-12 sm:py-20">
      <div className="container-beam">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-accent">Pricing</p>
          <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight text-text sm:text-[40px] sm:leading-[1.1]">
            One simple plan, two ways to pay
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-muted">
            Everything Beam does, for one clear price. No tiers, no upsells.
          </p>
        </Reveal>

        <Reveal y={24} delay={0.05}>
          <div className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-2">
            {(["monthly", "yearly"] as const).map((id) => {
              const plan = PLANS[id];
              const highlight = id === "yearly";
              return (
                <div
                  key={id}
                  className={`relative rounded-2xl border bg-surface p-7 ${
                    highlight ? "border-accent/40" : "border-border"
                  }`}
                >
                  {highlight && "note" in plan && (
                    <span className="absolute right-5 top-5 rounded-full bg-accent/15 px-2.5 py-1 text-xs text-accent">
                      {plan.note}
                    </span>
                  )}
                  <p className="text-sm text-text-muted">{plan.name}</p>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-medium text-text">
                      {plan.price}
                    </span>
                    <span className="text-sm text-text-faint">
                      {plan.cadence}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-text-muted">{plan.blurb}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              See full pricing
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
