"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { BeamMark } from "@/components/Logo";
import { CheckIcon, SendIcon } from "@/components/icons";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* ------------------------------------------------------------------ */
/* 1. Capture — a note types itself, then splits into clean todos      */
/* ------------------------------------------------------------------ */

const CAPTURE_TEXT =
  "Pull together the Harbor proposal, send Maya the figures, and book the team lunch.";

const CAPTURE_TODOS = [
  "Pull together the Harbor proposal",
  "Send Maya the figures",
  "Book the team lunch",
];

export function CaptureDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const [split, setSplit] = useState(0);

  useEffect(() => {
    if (reduced) {
      setTyped(CAPTURE_TEXT.length);
      setSplit(CAPTURE_TODOS.length);
      return;
    }
    if (!inView) return;
    let cancelled = false;
    (async () => {
      while (!cancelled) {
        setTyped(0);
        setSplit(0);
        await sleep(500);
        for (let i = 0; i <= CAPTURE_TEXT.length; i++) {
          if (cancelled) return;
          setTyped(i);
          await sleep(26);
        }
        await sleep(650);
        for (let i = 1; i <= CAPTURE_TODOS.length; i++) {
          if (cancelled) return;
          setSplit(i);
          await sleep(420);
        }
        await sleep(2600);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [inView, reduced]);

  return (
    <div ref={ref}>
    <DemoFrame>
      <div className="grid h-full grid-cols-[1fr_200px]">
        <div className="px-6 py-5">
          <div className="text-xs text-text-faint">Thursday, 29 May</div>
          <p className="mt-4 min-h-[72px] text-[13.5px] leading-relaxed text-text-muted">
            {CAPTURE_TEXT.slice(0, typed)}
            {typed < CAPTURE_TEXT.length && (
              <span className="ml-px inline-block h-4 w-px translate-y-0.5 bg-accent align-middle animate-caret-blink" />
            )}
          </p>
        </div>
        <div className="border-l border-border bg-surface/40 px-3 py-5">
          <div className="text-xs font-medium uppercase tracking-wider text-text-faint">
            Today
          </div>
          <div className="mt-3 space-y-1.5">
            {CAPTURE_TODOS.map((t, i) => (
              <div
                key={t}
                className="flex items-start gap-2 rounded-lg px-2 py-1.5 transition-all duration-500"
                style={{
                  opacity: i < split ? 1 : 0,
                  transform: i < split ? "translateY(0)" : "translateY(6px)",
                }}
              >
                <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[4px] border border-border" />
                <span className="text-[12px] leading-snug text-text">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DemoFrame>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Context-aware AI — Beam replies, referencing a real todo         */
/* ------------------------------------------------------------------ */

const AI_REPLY =
  "You've moved “write proposal” three days running. It's your only hard deadline this week — want to start there for 25 minutes?";

export function AIDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  const reduced = useReducedMotion();
  const [showUser, setShowUser] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (reduced) {
      setShowUser(true);
      setThinking(false);
      setTyped(AI_REPLY.length);
      return;
    }
    if (!inView) return;
    let cancelled = false;
    (async () => {
      while (!cancelled) {
        setShowUser(false);
        setThinking(false);
        setTyped(0);
        await sleep(600);
        setShowUser(true);
        await sleep(700);
        setThinking(true);
        await sleep(1100);
        setThinking(false);
        for (let i = 0; i <= AI_REPLY.length; i++) {
          if (cancelled) return;
          setTyped(i);
          await sleep(18);
        }
        await sleep(3000);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [inView, reduced]);

  return (
    <div ref={ref}>
    <DemoFrame>
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
          <BeamMark className="h-5 w-5" />
          <span className="text-[13px] font-medium text-text">Beam</span>
          <span className="ml-auto text-xs text-text-faint">
            with today&apos;s context
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-end gap-3 px-5 py-4">
          <div
            className="self-end rounded-2xl rounded-br-sm bg-surface-2 px-3.5 py-2 text-[12.5px] text-text transition-all duration-300"
            style={{
              opacity: showUser ? 1 : 0,
              transform: showUser ? "translateY(0)" : "translateY(6px)",
            }}
          >
            What should I focus on today?
          </div>

          {thinking ? (
            <div className="flex items-center gap-1.5 self-start rounded-2xl rounded-bl-sm border border-border bg-surface px-3.5 py-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-text-faint"
                  style={{
                    animation: "caret-blink 1s ease-in-out infinite",
                    animationDelay: `${i * 0.18}s`,
                  }}
                />
              ))}
            </div>
          ) : (
            typed > 0 && (
              <div className="max-w-[88%] self-start rounded-2xl rounded-bl-sm border border-border bg-surface px-3.5 py-2.5 text-[12.5px] leading-relaxed text-text">
                {AI_REPLY.slice(0, typed)}
                {typed < AI_REPLY.length && (
                  <span className="ml-px inline-block h-3.5 w-px translate-y-0.5 bg-accent align-middle" />
                )}
              </div>
            )
          )}
        </div>
        <div className="flex items-center gap-2 border-t border-border px-4 py-3">
          <div className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-[12px] text-text-faint">
            Ask Beam about your day…
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-ink">
            <SendIcon className="h-4 w-4" />
          </span>
        </div>
      </div>
    </DemoFrame>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. One calm page — a todo checks off with a soft amber tick         */
/* ------------------------------------------------------------------ */

const CALM_TODOS = [
  "Write the Harbor proposal",
  "Send Maya revised figures",
  "Review scope with Ben",
];

export function CalmPageDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  const reduced = useReducedMotion();
  const [checked, setChecked] = useState<number>(-1);

  useEffect(() => {
    if (reduced) {
      setChecked(0);
      return;
    }
    if (!inView) return;
    let cancelled = false;
    (async () => {
      let idx = 0;
      while (!cancelled) {
        setChecked(-1);
        await sleep(1400);
        setChecked(idx);
        await sleep(2600);
        idx = (idx + 1) % CALM_TODOS.length;
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [inView, reduced]);

  return (
    <div ref={ref}>
    <DemoFrame>
      <div className="grid h-full grid-cols-[36px_1fr_188px]">
        <div className="flex flex-col items-center gap-2 border-r border-border py-4">
          {["29", "28", "27"].map((d, i) => (
            <div
              key={d}
              className={`flex h-7 w-7 items-center justify-center rounded-lg text-[11px] ${
                i === 0
                  ? "bg-accent/15 text-accent ring-1 ring-accent/30"
                  : "text-text-faint"
              }`}
            >
              {d}
            </div>
          ))}
        </div>
        <div className="px-5 py-5">
          <div className="text-xs text-text-faint">Thursday, 29 May</div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-text-muted">
            Morning is for the proposal. Keep the afternoon clear for deep work
            and the 3pm call with Maya.
          </p>
        </div>
        <div className="border-l border-border bg-surface/40 px-3 py-5">
          <div className="text-xs font-medium uppercase tracking-wider text-text-faint">
            Today
          </div>
          <div className="mt-3 space-y-1">
            {CALM_TODOS.map((t, i) => {
              const isDone = checked === i;
              return (
                <div
                  key={t}
                  className="flex items-start gap-2 rounded-lg px-2 py-1.5"
                >
                  <span
                    className={`mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[4px] border transition-all duration-300 ${
                      isDone
                        ? "scale-110 border-accent bg-accent text-accent-ink"
                        : "border-border"
                    }`}
                  >
                    {isDone && (
                      <CheckIcon className="h-2.5 w-2.5" strokeWidth={3} />
                    )}
                  </span>
                  <span
                    className={`text-[12px] leading-snug transition-colors duration-300 ${
                      isDone ? "text-text-faint line-through" : "text-text"
                    }`}
                  >
                    {t}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DemoFrame>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function DemoFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[300px] overflow-hidden rounded-xl border border-border bg-bg shadow-[0_30px_90px_-40px_rgba(0,0,0,0.8)]">
      {children}
    </div>
  );
}
