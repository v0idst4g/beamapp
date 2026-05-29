export const SITE_NAME = "Beam";
export const COMPANY = "Beam Labs LLC";

// Company contact details (single source of truth for the legal pages).
export const CONTACT_EMAIL = "hello@beamday.app";
export const ADDRESS_LINES = ["1500 N Grant St Ste N", "Denver, CO 80203", "US"];
export const ADDRESS_INLINE = "1500 N Grant St Ste N, Denver, CO 80203, US";
export const GOVERNING_LAW = "the State of Colorado, United States";
export const GOVERNING_COURTS = "the state and federal courts located in Denver, Colorado";
export const REFUND_WINDOW_DAYS = 14;

export const PLANS = {
  monthly: {
    id: "monthly",
    name: "Monthly",
    price: "£14.99",
    cadence: "/month",
    blurb: "Pay as you go, cancel anytime.",
    priceEnv: "STRIPE_PRICE_MONTHLY",
  },
  yearly: {
    id: "yearly",
    name: "Annual",
    price: "£49.99",
    cadence: "/year",
    blurb: "Two-thirds off the monthly price.",
    note: "Save over 70% vs. monthly",
    priceEnv: "STRIPE_PRICE_YEARLY",
  },
} as const;

export type PlanId = keyof typeof PLANS;

export const FEATURES: string[] = [
  "Today's note, auto-saved as you type",
  "Todos that live beside your notes",
  "Beam — an AI assistant with your context",
  "A calm, single-page workspace",
  "Your data is private and deletable anytime",
  "Never used to train models",
];
