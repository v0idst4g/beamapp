"use client";

import { Reveal } from "./Reveal";
import { BeamMark } from "@/components/Logo";
import {
  NoteIcon,
  ListIcon,
  SparkIcon,
  CalendarIcon,
  LockIcon,
  CheckIcon,
} from "@/components/icons";

function Cell({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#363b46] ${className}`}
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/0 blur-2xl transition-all duration-500 group-hover:bg-accent/10" />
      <div className="relative">{children}</div>
    </div>
  );
}

function Eyebrow({ icon }: { icon: React.ReactNode }) {
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-2 text-accent">
      {icon}
    </span>
  );
}

export function FeatureBento() {
  return (
    <section id="features" className="py-12 sm:py-20">
      <div className="container-beam">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-accent">Why Beam</p>
          <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight text-text sm:text-[40px] sm:leading-[1.1]">
            Less to manage. More to think with.
          </h2>
        </Reveal>

        <Reveal y={26} delay={0.05}>
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-6">
            {/* big cell */}
            <Cell className="sm:col-span-4 sm:row-span-2">
              <Eyebrow icon={<NoteIcon className="h-[18px] w-[18px]" />} />
              <h3 className="mt-5 text-xl font-medium text-text">
                Notes and todos, finally on the same page
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-text-muted">
                Write freely in today&apos;s note while your tasks sit right
                beside it. No switching apps, no copying things across — the
                thinking and the doing share one calm surface.
              </p>
              <div className="mt-7 grid grid-cols-[1fr_140px] gap-3 rounded-xl border border-border bg-bg p-3">
                <div className="space-y-2">
                  <div className="h-2 w-3/4 rounded-full bg-surface-2" />
                  <div className="h-2 w-full rounded-full bg-surface-2" />
                  <div className="h-2 w-2/3 rounded-full bg-surface-2" />
                  <div className="h-2 w-5/6 rounded-full bg-surface-2" />
                </div>
                <div className="space-y-1.5 border-l border-border pl-3">
                  {["Proposal", "Figures", "Lunch"].map((t, i) => (
                    <div key={t} className="flex items-center gap-2">
                      <span
                        className={`flex h-3.5 w-3.5 items-center justify-center rounded-[4px] border ${
                          i === 2
                            ? "border-accent bg-accent text-accent-ink"
                            : "border-border"
                        }`}
                      >
                        {i === 2 && (
                          <CheckIcon className="h-2.5 w-2.5" strokeWidth={3} />
                        )}
                      </span>
                      <span
                        className={`text-[11px] ${
                          i === 2
                            ? "text-text-faint line-through"
                            : "text-text-muted"
                        }`}
                      >
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Cell>

            {/* AI cell */}
            <Cell className="sm:col-span-2">
              <Eyebrow icon={<SparkIcon className="h-[18px] w-[18px]" />} />
              <h3 className="mt-5 text-lg font-medium text-text">
                An AI with your context
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Beam reads your note and todos, so its advice is grounded in
                your actual day — concrete and honest, never made up.
              </p>
            </Cell>

            {/* clarity cell */}
            <Cell className="sm:col-span-2">
              <Eyebrow icon={<CalendarIcon className="h-[18px] w-[18px]" />} />
              <h3 className="mt-5 text-lg font-medium text-text">
                A fresh page each day
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                One note per day keeps things light. Step back through recent
                days whenever you need the thread.
              </p>
            </Cell>

            {/* todos cell */}
            <Cell className="sm:col-span-3">
              <Eyebrow icon={<ListIcon className="h-[18px] w-[18px]" />} />
              <h3 className="mt-5 text-lg font-medium text-text">
                Todos that stay out of the way
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Add, check off, and reorder in a single keystroke. Optional due
                dates when you need them, nothing when you don&apos;t.
              </p>
            </Cell>

            {/* privacy cell */}
            <Cell className="sm:col-span-3">
              <Eyebrow icon={<LockIcon className="h-[18px] w-[18px]" />} />
              <h3 className="mt-5 text-lg font-medium text-text">
                Private by default
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Your notes power your own Beam and nothing else. They&apos;re
                never used to train models, and you can delete them anytime.
              </p>
            </Cell>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
