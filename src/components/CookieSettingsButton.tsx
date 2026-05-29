"use client";

import { openCookiePrefs } from "@/lib/cookies";

export function CookieSettingsButton({
  className = "",
  children = "Cookie settings",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={openCookiePrefs}
      className={className}
    >
      {children}
    </button>
  );
}
