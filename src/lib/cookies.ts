"use client";

/**
 * Lightweight cookie-consent state, stored in localStorage (and mirrored to a
 * cookie so the server could read it later). Non-essential categories default
 * to OFF — consent is opt-in, as GDPR / ePrivacy require.
 */

export const CONSENT_KEY = "beam_cookie_consent";
export const CONSENT_VERSION = 1;
export const OPEN_PREFS_EVENT = "beam:open-cookie-prefs";

export type CookieConsent = {
  version: number;
  essential: true;
  analytics: boolean;
  marketing: boolean;
  ts: string;
};

export function getConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsent;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(choice: {
  analytics: boolean;
  marketing: boolean;
}): CookieConsent {
  const consent: CookieConsent = {
    version: CONSENT_VERSION,
    essential: true,
    analytics: choice.analytics,
    marketing: choice.marketing,
    ts: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    // Mirror to a first-party cookie (1 year), readable server-side if needed.
    document.cookie = `${CONSENT_KEY}=${encodeURIComponent(
      JSON.stringify({ a: consent.analytics, m: consent.marketing })
    )}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  } catch {
    /* storage may be unavailable; ignore */
  }
  return consent;
}

/** Reopen the preferences banner from anywhere (e.g. the footer link). */
export function openCookiePrefs() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_PREFS_EVENT));
}
