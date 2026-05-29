import Link from "next/link";
import type { ReactNode } from "react";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="beam-halo left-1/2 top-[20%] h-[360px] w-[520px] -translate-x-1/2 animate-halo-pulse" />
      </div>

      <div className="w-full max-w-sm">
        <div className="card-beam p-8 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.9)]">
          {children}
        </div>
        <p className="mt-6 text-center text-xs text-text-faint">
          <Link href="/" className="hover:text-text-muted">
            ← Back to beamday.app
          </Link>
        </p>
      </div>
    </main>
  );
}
