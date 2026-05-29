"use client";

import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { CaptureDemo, AIDemo, CalmPageDemo } from "./demos";

type Step = {
  eyebrow: string;
  title: string;
  body: string;
  demo: ReactNode;
};

const steps: Step[] = [
  {
    eyebrow: "Capture",
    title: "Write the way you think",
    body: "Start the day with a blank note and just get it down. Beam keeps the page calm and saves every word as you type — no folders, no formatting, no friction.",
    demo: <CaptureDemo />,
  },
  {
    eyebrow: "Context-aware AI",
    title: "An assistant that has actually read your day",
    body: "Beam sees today's note and your open todos, so its help is grounded in what you're really working on. Ask what to focus on, or talk something through — it answers about your work, not the internet's.",
    demo: <AIDemo />,
  },
  {
    eyebrow: "One calm page",
    title: "Everything in one quiet place",
    body: "Notes and todos live side by side, on a single page that stays out of your way. Check things off, look back over recent days, and keep your attention where it belongs.",
    demo: <CalmPageDemo />,
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-28 sm:py-36">
      <div className="container-beam">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-accent">How it works</p>
          <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight text-text sm:text-[40px] sm:leading-[1.1]">
            A workspace that keeps up with your thinking
          </h2>
        </Reveal>

        <div className="mt-20 space-y-24 sm:space-y-32">
          {steps.map((step, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={step.title}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal
                  className={flip ? "lg:order-2" : ""}
                  delay={0.05}
                >
                  <p className="text-sm font-medium text-accent">
                    {step.eyebrow}
                  </p>
                  <h3 className="mt-3 text-2xl font-medium tracking-tight text-text sm:text-[28px]">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted">
                    {step.body}
                  </p>
                </Reveal>
                <Reveal
                  className={flip ? "lg:order-1" : ""}
                  delay={0.12}
                  y={28}
                >
                  <div className="relative">
                    <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-accent/5 blur-2xl" />
                    {step.demo}
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
