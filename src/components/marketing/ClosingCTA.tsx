"use client";

import Link from "next/link";
import { Reveal } from "./Reveal";
import { ArrowRightIcon } from "@/components/icons";

export function ClosingCTA() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="beam-ray animate-beam-drift opacity-70" />
        <div className="beam-halo left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 animate-halo-pulse" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
      <div className="container-beam">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-medium tracking-tight text-text sm:text-5xl">
            Start your day on a calmer page
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-text-muted">
            Bring your notes, todos, and a mind that reads them together. It
            only takes a minute to begin.
          </p>
          <div className="mt-9 flex justify-center">
            <Link href="/signup" className="btn-accent px-6 py-3.5 text-sm">
              Get started
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
