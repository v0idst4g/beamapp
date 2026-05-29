"use client";

import { recentDays, relativeLabel, dateKeyToDate } from "@/lib/dates";

export function DateStrip({
  selected,
  today,
  onSelect,
}: {
  selected: string;
  today: string;
  onSelect: (date: string) => void;
}) {
  const days = recentDays(today, 14);

  return (
    <aside className="hidden w-16 shrink-0 flex-col items-center gap-1 overflow-y-auto border-r border-border py-5 md:flex">
      {days.map((d) => {
        const isSelected = d === selected;
        const date = dateKeyToDate(d);
        const dayNum = date.getDate();
        const isToday = d === today;
        return (
          <button
            key={d}
            onClick={() => onSelect(d)}
            title={relativeLabel(d, today)}
            className={`flex h-12 w-12 flex-col items-center justify-center rounded-xl text-center transition-colors ${
              isSelected
                ? "bg-accent/15 text-accent ring-1 ring-accent/30"
                : "text-text-faint hover:bg-surface hover:text-text-muted"
            }`}
          >
            <span className="text-[10px] uppercase tracking-wide">
              {date.toLocaleDateString(undefined, { weekday: "short" }).slice(0, 2)}
            </span>
            <span className="text-sm font-medium leading-tight">{dayNum}</span>
            {isToday && (
              <span className="mt-0.5 h-1 w-1 rounded-full bg-accent" />
            )}
          </button>
        );
      })}
    </aside>
  );
}
