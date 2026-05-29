import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Nav } from "@/components/marketing/Nav";
import { Footer } from "@/components/marketing/Footer";
import { Reveal } from "@/components/marketing/Reveal";
import { WindowChrome } from "@/components/marketing/WindowChrome";
import { HeroMockup } from "@/components/marketing/HeroMockup";
import { CaptureDemo, AIDemo, CalmPageDemo } from "@/components/marketing/demos";
import { TrustBand } from "@/components/marketing/TrustBand";
import { ClosingCTA } from "@/components/marketing/ClosingCTA";
import {
  ArrowRightIcon,
  CheckIcon,
  NoteIcon,
  ListIcon,
  SparkIcon,
  CalendarIcon,
  LockIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Features",
  description:
    "A detailed look at Beam — daily notes, todos beside them, and a context-aware AI assistant, all on one calm page.",
};

function FeatureRow({
  eyebrow,
  title,
  body,
  demo,
  flip = false,
  icon,
}: {
  eyebrow: string;
  title: string;
  body: ReactNode;
  demo: ReactNode;
  flip?: boolean;
  icon: ReactNode;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={flip ? "lg:order-2" : ""}>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-accent">
          {icon}
        </span>
        <p className="mt-5 text-sm font-medium text-accent">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-medium tracking-tight text-text sm:text-[30px]">
          {title}
        </h2>
        <div className="mt-4 max-w-md space-y-3 text-base leading-relaxed text-text-muted">
          {body}
        </div>
      </Reveal>
      <Reveal className={flip ? "lg:order-1" : ""} delay={0.1} y={26}>
        <div className="relative">
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-accent/5 blur-2xl" />
          {demo}
        </div>
      </Reveal>
    </div>
  );
}

const capabilities: { title: string; desc: string }[] = [
  {
    title: "Auto-save",
    desc: "Every keystroke is saved quietly — there's no save button to remember.",
  },
  {
    title: "A page per day",
    desc: "Each day starts on a fresh note, so the page never gets heavy.",
  },
  {
    title: "Recent days",
    desc: "Step back through the date strip to revisit what you wrote.",
  },
  {
    title: "Todos beside notes",
    desc: "Your tasks sit next to your thinking, not in a separate app.",
  },
  {
    title: "Optional due dates",
    desc: "Add a date when it matters; leave it off when it doesn't.",
  },
  {
    title: "Reorder by drag",
    desc: "Pull the day's todos into the order you'll actually do them.",
  },
  {
    title: "Context-aware AI",
    desc: "Beam reads your note and open todos before it answers.",
  },
  {
    title: "Grounded answers",
    desc: "Concrete and honest — it won't invent facts about you or your work.",
  },
  {
    title: "Private by default",
    desc: "Your content powers only your Beam, and is never used to train models.",
  },
  {
    title: "Yours to delete",
    desc: "Remove a note, a todo, or your whole account whenever you like.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Nav />
      <main>
        {/* header */}
        <section className="relative overflow-hidden pt-32">
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
            <div className="beam-halo left-1/2 top-0 h-[340px] w-[640px] -translate-x-1/2 animate-halo-pulse" />
          </div>
          <div className="container-beam text-center">
            <Reveal className="mx-auto max-w-2xl">
              <p className="text-sm font-medium text-accent">Features</p>
              <h1 className="mt-3 text-balance text-4xl font-medium tracking-tight text-text sm:text-5xl">
                A calm workspace, in detail
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
                Beam keeps the three things a focused day needs — a note, your
                todos, and a mind that reads them — on one quiet page. Here&apos;s
                how each part works.
              </p>
              <div className="mt-8 flex justify-center">
                <Link href="/signup" className="btn-accent px-5 py-3 text-sm">
                  Get started
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal y={28} delay={0.1} className="mx-auto mt-16 max-w-4xl">
              <WindowChrome>
                <HeroMockup />
              </WindowChrome>
            </Reveal>
          </div>
        </section>

        {/* feature deep-dives */}
        <section className="container-beam space-y-24 py-28 sm:space-y-32 sm:py-32">
          <FeatureRow
            eyebrow="Notes"
            icon={<NoteIcon className="h-[18px] w-[18px]" />}
            title="A note for every day"
            body={
              <>
                <p>
                  Open Beam to a blank page and just write — plans, half-thoughts,
                  what happened. There are no folders, no formatting menus, and
                  nothing to set up.
                </p>
                <p>
                  Everything saves as you type, and the date strip lets you step
                  back through recent days whenever you need the thread again.
                </p>
              </>
            }
            demo={<CaptureDemo />}
          />

          <FeatureRow
            flip
            eyebrow="Todos"
            icon={<ListIcon className="h-[18px] w-[18px]" />}
            title="Todos that live beside your notes"
            body={
              <>
                <p>
                  Add a task in a single keystroke and check it off when
                  it&apos;s done. Each todo belongs to a day, so your list stays
                  honest about today.
                </p>
                <p>
                  Set an optional due date when something matters, and drag your
                  todos into the order you&apos;ll actually tackle them.
                </p>
              </>
            }
            demo={<CalmPageDemo />}
          />

          <FeatureRow
            eyebrow="Beam AI"
            icon={<SparkIcon className="h-[18px] w-[18px]" />}
            title="An assistant that has read your day"
            body={
              <>
                <p>
                  Beam can see today&apos;s note and your open todos, so its help
                  is grounded in what you&apos;re actually working on — not generic
                  advice from the internet.
                </p>
                <p>
                  Ask what to focus on, break a task down, or think a problem
                  through. It stays concrete and honest, and it won&apos;t invent
                  facts about you.
                </p>
              </>
            }
            demo={<AIDemo />}
          />
        </section>

        {/* capabilities grid */}
        <section className="border-t border-border py-24">
          <div className="container-beam">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-accent">
                <CalendarIcon className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-balance text-3xl font-medium tracking-tight text-text sm:text-4xl">
                The small things, done right
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-muted">
                Thoughtful details that keep the page calm and out of your way.
              </p>
            </Reveal>

            <Reveal y={24} delay={0.05}>
              <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
                {capabilities.map((c) => (
                  <div key={c.title} className="bg-surface p-6">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <CheckIcon className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <div>
                        <h3 className="text-[15px] font-medium text-text">
                          {c.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-text-muted">
                          {c.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-10 flex items-center justify-center gap-2 text-sm text-text-faint">
              <LockIcon className="h-4 w-4 text-accent" />
              <span>
                Privacy isn&apos;t an add-on — it&apos;s how Beam is built.
              </span>
            </Reveal>
          </div>
        </section>

        <TrustBand />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
