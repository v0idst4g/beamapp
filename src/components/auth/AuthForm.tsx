"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/Logo";
import { ArrowRightIcon } from "@/components/icons";

type Mode = "login" | "signup";

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/app";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const isSignup = mode === "signup";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();

    try {
      if (isSignup) {
        const emailRedirectTo =
          typeof window !== "undefined"
            ? `${window.location.origin}/auth/confirm?next=${encodeURIComponent(next)}`
            : undefined;
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo },
        });
        if (error) throw error;

        // If confirmation is disabled, a session is returned immediately.
        if (data.session) {
          router.push(next);
          router.refresh();
          return;
        }
        setSentTo(email);
        setLoading(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push(next);
        router.refresh();
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
      setLoading(false);
    }
  }

  if (sentTo) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(255,184,77,0.6)]" />
        </div>
        <h1 className="mt-6 text-xl font-medium text-text">Check your inbox</h1>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          We sent a confirmation link to{" "}
          <span className="text-text">{sentTo}</span>. Click it to finish
          setting up your Beam.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block text-sm text-accent hover:text-accent-hover"
        >
          Back to log in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center">
        <Logo />
      </div>
      <h1 className="mt-8 text-center text-2xl font-medium tracking-tight text-text">
        {isSignup ? "Create your Beam" : "Welcome back"}
      </h1>
      <p className="mt-2 text-center text-sm text-text-muted">
        {isSignup
          ? "Start your calmer day in under a minute."
          : "Log in to your calm daily workspace."}
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-text-muted">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-beam px-3.5 py-2.5 text-sm"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm text-text-muted"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete={isSignup ? "new-password" : "current-password"}
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-beam px-3.5 py-2.5 text-sm"
            placeholder={isSignup ? "At least 8 characters" : "Your password"}
          />
        </div>

        {error && (
          <p className="rounded-lg border border-danger/30 bg-danger/10 px-3.5 py-2.5 text-sm text-danger">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-accent w-full px-5 py-2.5 text-sm disabled:opacity-60"
        >
          {loading
            ? isSignup
              ? "Creating…"
              : "Logging in…"
            : isSignup
              ? "Create account"
              : "Log in"}
          {!loading && <ArrowRightIcon className="h-4 w-4" />}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <Link
              href={`/login${next !== "/app" ? `?next=${encodeURIComponent(next)}` : ""}`}
              className="text-accent hover:text-accent-hover"
            >
              Log in
            </Link>
          </>
        ) : (
          <>
            New to Beam?{" "}
            <Link
              href={`/signup${next !== "/app" ? `?next=${encodeURIComponent(next)}` : ""}`}
              className="text-accent hover:text-accent-hover"
            >
              Create an account
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
