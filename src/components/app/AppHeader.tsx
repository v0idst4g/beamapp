"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/Logo";
import { LogoutIcon, CardIcon } from "@/components/icons";

function statusPill(status: string | null): {
  label: string;
  className: string;
} {
  const active = status === "active" || status === "trialing";
  if (active) {
    return {
      label: status === "trialing" ? "Trial" : "Active",
      className: "bg-success/15 text-success",
    };
  }
  if (status === "past_due" || status === "unpaid") {
    return { label: "Past due", className: "bg-danger/15 text-danger" };
  }
  return { label: "Free", className: "bg-surface-2 text-text-muted" };
}

export function AppHeader({
  userEmail,
  subscriptionStatus,
  hasCustomer,
}: {
  userEmail: string;
  subscriptionStatus: string | null;
  hasCustomer: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const pill = statusPill(subscriptionStatus);
  const isActive =
    subscriptionStatus === "active" || subscriptionStatus === "trialing";

  async function manageBilling() {
    setBusy(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
    } catch {
      /* ignore */
    }
    setBusy(false);
  }

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4 sm:px-5">
      <Logo href="/app" />

      <div className="flex items-center gap-2 sm:gap-3">
        <span
          className={`hidden rounded-full px-2.5 py-1 text-xs sm:inline-flex ${pill.className}`}
          title={`Subscription: ${subscriptionStatus ?? "none"}`}
        >
          {pill.label}
        </span>

        <span className="hidden max-w-[180px] truncate text-xs text-text-faint lg:inline">
          {userEmail}
        </span>

        {hasCustomer || isActive ? (
          <button
            onClick={manageBilling}
            disabled={busy}
            className="btn-ghost px-3 py-1.5 text-xs disabled:opacity-60"
          >
            <CardIcon className="h-3.5 w-3.5" />
            {busy ? "Opening…" : "Manage billing"}
          </button>
        ) : (
          <a href="/pricing" className="btn-accent px-3 py-1.5 text-xs">
            Upgrade
          </a>
        )}

        <button
          onClick={logout}
          aria-label="Log out"
          className="rounded-lg border border-border p-2 text-text-muted transition-colors hover:bg-surface hover:text-text"
        >
          <LogoutIcon className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
