"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { WindowChrome } from "./WindowChrome";
import { HeroMockup } from "./HeroMockup";
import { ArrowRightIcon, ArrowDownIcon } from "@/components/icons";

const ease = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay: number, reduced: boolean | null) {
  return {
    // Reduced motion: skip the hidden start; Framer still drives opacity to 1.
    initial: reduced ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: reduced ? { duration: 0 } : { duration: 0.7, ease, delay },
  };
}

export function Hero() {
  const reduced = useReducedMotion();

  // Subtle mouse-driven tilt for the mockup.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotX = useSpring(useTransform(py, [-0.5, 0.5], [4, -4]), {
    stiffness: 120,
    damping: 18,
  });
  const rotY = useSpring(useTransform(px, [-0.5, 0.5], [-5, 5]), {
    stiffness: 120,
    damping: 18,
  });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <section className="relative overflow-hidden pt-16">
      {/* beam light + atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="beam-ray animate-beam-drift" />
        <div
          className="beam-halo left-1/2 top-[42%] h-[520px] w-[760px] -translate-x-1/2 animate-halo-pulse"
        />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="container-beam flex flex-col items-center pt-24 text-center sm:pt-32">
        <motion.div {...fadeUp(0, reduced)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-xs text-text-muted backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(255,184,77,0.6)]" />
            One calm page for your day
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.08, reduced)}
          className="mt-7 max-w-3xl text-balance text-[40px] font-medium leading-[1.05] tracking-tight text-text sm:text-[60px] lg:text-[68px]"
        >
          Your notes, todos, and a
          <br className="hidden sm:block" /> mind that{" "}
          <span className="relative whitespace-nowrap text-accent">
            reads them
            <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
          </span>
          .
        </motion.h1>

        <motion.p
          {...fadeUp(0.16, reduced)}
          className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-text-muted sm:text-lg"
        >
          Beam keeps today&apos;s note and your todos side by side, with an
          assistant that actually understands what you&apos;re working on. No
          clutter, no noise — just a quieter way to think and get things done.
        </motion.p>

        <motion.div
          {...fadeUp(0.24, reduced)}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link href="/signup" className="btn-accent px-5 py-3 text-sm">
            Get started
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <a href="#how" className="btn-ghost px-5 py-3 text-sm">
            See how it works
            <ArrowDownIcon className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      {/* hero mockup */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0 } : { duration: 0.9, ease, delay: 0.3 }}
        className="container-beam relative mt-16 sm:mt-20"
        style={{ perspective: 1200 }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <motion.div
          style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
          className="mx-auto max-w-4xl"
        >
          <WindowChrome>
            <HeroMockup />
          </WindowChrome>
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 -bottom-12 -z-10 mx-auto h-40 max-w-3xl rounded-full bg-accent/10 blur-3xl" />
      </motion.div>
    </section>
  );
}
