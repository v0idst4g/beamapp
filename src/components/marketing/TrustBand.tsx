"use client";

import { Reveal } from "./Reveal";
import { LockIcon } from "@/components/icons";

const points = [
  {
    title: "Your notes are yours",
    body: "Everything you write belongs to you. Beam only ever uses it to power your own assistant.",
  },
  {
    title: "Never used to train models",
    body: "Your content is not used to train AI models — not ours, not anyone's.",
  },
  {
    title: "Deletable anytime",
    body: "Remove a note, a todo, or your whole account whenever you like. Gone means gone.",
  },
];

export function TrustBand() {
  return (
    <section id="privacy" className="py-12 sm:py-20">
      <div className="container-beam">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-14">
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
              <div>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-2 text-accent">
                  <LockIcon className="h-5 w-5" />
                </span>
                <h2 className="mt-6 text-balance text-2xl font-medium tracking-tight text-text sm:text-3xl">
                  Privacy isn&apos;t a setting. It&apos;s the default.
                </h2>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-text-muted">
                  Beam works best when you write honestly. That only happens if
                  you trust where your words go — so we keep it simple.
                </p>
              </div>
              <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-1">
                {points.map((p) => (
                  <div key={p.title} className="bg-surface p-6">
                    <h3 className="text-base font-medium text-text">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
