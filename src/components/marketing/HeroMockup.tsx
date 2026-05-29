import { BeamMark } from "@/components/Logo";
import { CheckIcon, PlusIcon, SparkIcon, CalendarIcon } from "@/components/icons";

const days = [
  { label: "29", active: true },
  { label: "28", active: false },
  { label: "27", active: false },
  { label: "26", active: false },
  { label: "25", active: false },
];

const noteLines = [
  "Proposal for the Harbor project is the one that matters today.",
  "Ben said the scope doc looks good — just needs the timeline section.",
  "Remember to send Maya the revised figures before the 3pm call.",
];

const todos = [
  { text: "Write the Harbor proposal", done: false, accent: true },
  { text: "Send Maya revised figures", done: false },
  { text: "Review scope timeline with Ben", done: false },
  { text: "Book the team lunch", done: true },
];

/**
 * A faithful, static render of the Beam app in the brand style — note in the
 * centre, todos on the right, Beam's presence bottom-right. Used as the hero
 * centrepiece so the landing reads as a real screenshot of a real product.
 */
export function HeroMockup() {
  return (
    <div className="relative grid h-[440px] grid-cols-[44px_1fr_232px] bg-bg text-left">
      {/* date strip */}
      <aside className="flex flex-col items-center gap-2 border-r border-border py-4">
        <CalendarIcon className="mb-1 h-4 w-4 text-text-faint" />
        {days.map((d) => (
          <div
            key={d.label}
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs ${
              d.active
                ? "bg-accent/15 text-accent ring-1 ring-accent/30"
                : "text-text-faint"
            }`}
          >
            {d.label}
          </div>
        ))}
      </aside>

      {/* note */}
      <section className="flex flex-col px-7 py-6">
        <div className="flex items-baseline justify-between">
          <h3 className="text-[15px] font-medium text-text">Thursday, 29 May</h3>
          <span className="text-xs text-text-faint">saved</span>
        </div>
        <div className="mt-5 space-y-3">
          {noteLines.map((line, i) => (
            <p
              key={i}
              className="text-[13.5px] leading-relaxed text-text-muted"
            >
              {line}
            </p>
          ))}
          <p className="text-[13.5px] leading-relaxed text-text-muted">
            Then the afternoon is for deep work
            <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-accent" />
          </p>
        </div>
      </section>

      {/* todos */}
      <aside className="flex flex-col border-l border-border bg-surface/40 px-4 py-6">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-medium uppercase tracking-wider text-text-faint">
            Today
          </h4>
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-border text-text-faint">
            <PlusIcon className="h-3.5 w-3.5" />
          </span>
        </div>
        <div className="mt-4 space-y-1.5">
          {todos.map((t) => (
            <div
              key={t.text}
              className={`group flex items-start gap-2.5 rounded-lg px-2 py-2 ${
                t.accent ? "bg-surface-2/70" : ""
              }`}
            >
              <span
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border ${
                  t.done
                    ? "border-accent bg-accent text-accent-ink"
                    : "border-border"
                }`}
              >
                {t.done && <CheckIcon className="h-3 w-3" strokeWidth={2.5} />}
              </span>
              <span
                className={`text-[13px] leading-snug ${
                  t.done ? "text-text-faint line-through" : "text-text"
                }`}
              >
                {t.text}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* Beam presence */}
      <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 shadow-lg">
        <BeamMark className="h-5 w-5" />
        <span className="text-xs text-text-muted">Ask Beam</span>
        <SparkIcon className="h-3.5 w-3.5 text-accent" />
      </div>
    </div>
  );
}
