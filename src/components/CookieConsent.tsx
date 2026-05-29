"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getConsent,
  saveConsent,
  OPEN_PREFS_EVENT,
} from "@/lib/cookies";

type Category = {
  key: "essential" | "analytics" | "marketing";
  label: string;
  desc: string;
  locked?: boolean;
};

const CATEGORIES: Category[] = [
  {
    key: "essential",
    label: "Strictly necessary",
    desc: "Required to sign in, keep you logged in, and process payments. Always on.",
    locked: true,
  },
  {
    key: "analytics",
    label: "Analytics",
    desc: "Helps us understand how Beam is used so we can improve it. Off by default.",
  },
  {
    key: "marketing",
    label: "Marketing",
    desc: "Used to measure and personalise any future marketing. Off by default.",
  },
];

function Toggle({
  on,
  disabled,
  onChange,
}: {
  on: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={() => !disabled && onChange(!on)}
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
        on ? "bg-accent" : "bg-surface-2"
      } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full transition-transform ${
          on ? "translate-x-4 bg-accent-ink" : "translate-x-0.5 bg-text-faint"
        }`}
      />
    </button>
  );
}

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    setMounted(true);
    const existing = getConsent();
    if (!existing) {
      setVisible(true);
    } else {
      setAnalytics(existing.analytics);
      setMarketing(existing.marketing);
    }
    const reopen = () => {
      const c = getConsent();
      setAnalytics(c?.analytics ?? false);
      setMarketing(c?.marketing ?? false);
      setShowPrefs(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_PREFS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_PREFS_EVENT, reopen);
  }, []);

  function acceptAll() {
    saveConsent({ analytics: true, marketing: true });
    setVisible(false);
  }
  function rejectAll() {
    saveConsent({ analytics: false, marketing: false });
    setVisible(false);
  }
  function savePrefs() {
    saveConsent({ analytics, marketing });
    setVisible(false);
  }

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="false"
      className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-md rounded-2xl border border-border bg-surface p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)] sm:right-auto"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-sm font-medium text-text">We value your privacy</h2>
        <span className="h-2 w-2 translate-y-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(255,184,77,0.5)]" />
      </div>

      <p className="mt-2 text-[13px] leading-relaxed text-text-muted">
        We use cookies that are strictly necessary to run Beam, and — only with
        your consent — optional ones to understand usage. You can accept all,
        reject non-essential, or choose. See our{" "}
        <Link href="/cookies" className="text-accent hover:text-accent-hover">
          cookie policy
        </Link>
        .
      </p>

      {showPrefs && (
        <div className="mt-4 space-y-3 border-t border-border pt-4">
          {CATEGORIES.map((cat) => {
            const on =
              cat.key === "essential"
                ? true
                : cat.key === "analytics"
                  ? analytics
                  : marketing;
            return (
              <div key={cat.key} className="flex items-start gap-3">
                <Toggle
                  on={on}
                  disabled={cat.locked}
                  onChange={(v) =>
                    cat.key === "analytics"
                      ? setAnalytics(v)
                      : setMarketing(v)
                  }
                />
                <div>
                  <div className="text-[13px] font-medium text-text">
                    {cat.label}
                  </div>
                  <div className="text-[12px] leading-snug text-text-faint">
                    {cat.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button onClick={acceptAll} className="btn-accent px-4 py-2 text-[13px]">
          Accept all
        </button>
        <button onClick={rejectAll} className="btn-ghost px-4 py-2 text-[13px]">
          Reject non-essential
        </button>
        {showPrefs ? (
          <button
            onClick={savePrefs}
            className="px-3 py-2 text-[13px] text-text-muted transition-colors hover:text-text"
          >
            Save choices
          </button>
        ) : (
          <button
            onClick={() => setShowPrefs(true)}
            className="px-3 py-2 text-[13px] text-text-muted transition-colors hover:text-text"
          >
            Manage
          </button>
        )}
      </div>
    </div>
  );
}
