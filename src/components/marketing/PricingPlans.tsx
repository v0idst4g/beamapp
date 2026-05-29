"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PLANS, FEATURES, type PlanId } from "@/lib/constants";
import { CheckIcon } from "@/components/icons";

export function PricingPlans() {
  const params = useSearchParams();
  const [loading, setLoading] = useState<PlanId | null>(null);
  const [error, setError] = useState<string | null>(null);
  const autoStarted = useRef(false);

  async function startCheckout(plan: PlanId) {
    setError(null);
    setLoading(plan);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      if (res.status === 401) {
        // Send to sign up, then resume checkout for this plan afterwards.
        const next = encodeURIComponent(`/pricing?plan=${plan}`);
        window.location.href = `/signup?next=${next}`;
        return;
      }

      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(
          data?.error === "price_not_configured"
            ? "Checkout isn't fully configured yet. Please try again later."
            : "Something went wrong starting checkout. Please try again."
        );
        setLoading(null);
        return;
      }
      window.location.href = data.url as string;
    } catch {
      setError("Couldn't reach the server. Please try again.");
      setLoading(null);
    }
  }

  // Resume checkout after returning from sign up (?plan=...).
  useEffect(() => {
    const plan = params.get("plan");
    if (plan && (plan in PLANS) && !autoStarted.current) {
      autoStarted.current = true;
      startCheckout(plan as PlanId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <div>
      <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
        {(["monthly", "yearly"] as const).map((id) => {
          const plan = PLANS[id];
          const highlight = id === "yearly";
          return (
            <div
              key={id}
              className={`relative flex flex-col rounded-2xl border bg-surface p-7 ${
                highlight
                  ? "border-accent/40 shadow-[0_0_0_1px_rgba(255,184,77,0.12)]"
                  : "border-border"
              }`}
            >
              {highlight && "note" in plan && (
                <span className="absolute right-6 top-6 rounded-full bg-accent/15 px-2.5 py-1 text-xs text-accent">
                  {plan.note}
                </span>
              )}
              <p className="text-sm text-text-muted">{plan.name}</p>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-medium tracking-tight text-text">
                  {plan.price}
                </span>
                <span className="text-sm text-text-faint">{plan.cadence}</span>
              </div>
              <p className="mt-2 text-sm text-text-muted">{plan.blurb}</p>

              <button
                onClick={() => startCheckout(id)}
                disabled={loading !== null}
                className="btn-accent mt-6 w-full px-5 py-3 text-sm disabled:opacity-60"
              >
                {loading === id ? "Starting…" : `Choose ${plan.name.toLowerCase()}`}
              </button>

              <ul className="mt-7 space-y-3 border-t border-border pt-6">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <CheckIcon className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-text-muted">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {error && (
        <p className="mx-auto mt-6 max-w-3xl rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-center text-sm text-danger">
          {error}
        </p>
      )}

      <p className="mx-auto mt-8 max-w-md text-center text-sm text-text-faint">
        Prices in GBP. Cancel anytime from your account. See our{" "}
        <a href="/refunds" className="text-text-muted underline hover:text-text">
          refund policy
        </a>
        .
      </p>
    </div>
  );
}
