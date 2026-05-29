"use client";

import { useEffect, useRef, useState } from "react";
import { BeamMark } from "@/components/Logo";
import { SendIcon, CloseIcon, SparkIcon } from "@/components/icons";
import type { ChatMessage } from "@/lib/types";

type Msg = { id: string; role: "user" | "assistant"; content: string };

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function BeamPanel({
  initialMessages,
  date,
  dateLabel,
}: {
  initialMessages: ChatMessage[];
  date: string;
  dateLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(
    initialMessages.map((m) => ({
      id: m.id,
      role: m.role,
      content: m.content,
    }))
  );
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ block: "end" });
      inputRef.current?.focus();
    }
  }, [open, messages, sending]);

  async function send() {
    const value = input.trim();
    if (!value || sending) return;
    setError(null);
    setInput("");
    const userMsg: Msg = { id: uid(), role: "user", content: value };
    setMessages((prev) => [...prev, userMsg]);
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: value, date, dateLabel }),
      });
      const data = await res.json();
      if (!res.ok || !data.reply) {
        setError(
          data?.error === "ai_error"
            ? "Beam couldn't respond just now. Please try again."
            : "Something went wrong. Please try again."
        );
      } else {
        setMessages((prev) => [
          ...prev,
          { id: uid(), role: "assistant", content: data.reply as string },
        ]);
      }
    } catch {
      setError("Couldn't reach Beam. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Floating toggle */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm text-text shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8)] transition-colors hover:bg-surface-2"
        >
          <BeamMark className="h-5 w-5" />
          Ask Beam
          <SparkIcon className="h-4 w-4 text-accent" />
        </button>
      )}

      {/* Backdrop (mobile) */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-40 flex h-full w-full flex-col border-l border-border bg-surface transition-transform duration-300 ease-out sm:w-[384px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center gap-2.5 border-b border-border px-4 py-3.5">
          <BeamMark className="h-6 w-6" />
          <div className="leading-tight">
            <div className="text-sm font-medium text-text">Beam</div>
            <div className="text-[11px] text-text-faint">
              sees your note &amp; todos for {dateLabel}
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close Beam"
            className="ml-auto rounded-lg p-2 text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
          {messages.length === 0 && (
            <div className="rounded-2xl rounded-bl-sm border border-border bg-bg px-4 py-3.5 text-[13px] leading-relaxed text-text-muted">
              Hi — I&apos;m Beam. I can see today&apos;s note and your todos.
              Ask me what to focus on, to break something down, or to think a
              problem through. I&apos;ll keep it grounded in your day.
            </div>
          )}

          {messages.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-surface-2 px-3.5 py-2.5 text-[13px] leading-relaxed text-text">
                  {m.content}
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex justify-start">
                <div className="max-w-[88%] whitespace-pre-wrap rounded-2xl rounded-bl-sm border border-border bg-bg px-3.5 py-2.5 text-[13px] leading-relaxed text-text">
                  {m.content}
                </div>
              </div>
            )
          )}

          {sending && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-border bg-bg px-4 py-3">
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
            </div>
          )}

          {error && (
            <p className="rounded-lg border border-danger/30 bg-danger/10 px-3.5 py-2.5 text-[13px] text-danger">
              {error}
            </p>
          )}

          <div ref={endRef} />
        </div>

        <div className="border-t border-border p-3">
          <div className="flex items-end gap-2 rounded-xl border border-border bg-bg px-3 py-2 focus-within:border-accent">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask Beam about your day…"
              className="max-h-32 flex-1 resize-none bg-transparent py-1 text-[13px] text-text outline-none placeholder:text-text-faint"
            />
            <button
              onClick={send}
              disabled={sending || !input.trim()}
              aria-label="Send"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-ink transition-opacity disabled:opacity-40"
            >
              <SendIcon className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-1.5 px-1 text-[10px] text-text-faint">
            Beam can make mistakes. It only sees your own notes and todos.
          </p>
        </div>
      </aside>
    </>
  );
}
