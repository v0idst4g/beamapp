import Stripe from "stripe";

let stripeSingleton: Stripe | null = null;

/**
 * Lazily construct the Stripe client. Initialising inside a function (rather
 * than at module load) means a build with no STRIPE_SECRET_KEY set never
 * throws — the key is only required when a billing route actually runs.
 */
export function getStripe(): Stripe {
  if (stripeSingleton) return stripeSingleton;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set.");
  }

  stripeSingleton = new Stripe(key, {
    apiVersion: "2025-02-24.acacia",
    appInfo: { name: "Beam" },
  });
  return stripeSingleton;
}
