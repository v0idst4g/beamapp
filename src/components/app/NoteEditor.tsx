"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { longLabel } from "@/lib/dates";

type SaveState = "idle" | "saving" | "saved" | "error";

export function NoteEditor({
  date,
  userId,
}: {
  date: string;
  userId: string;
}) {
  const supabase = createClient();
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [save, setSave] = useState<SaveState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadedDate = useRef<string>("");

  // Load the note whenever the selected date changes.
  useEffect(() => {
    let active = true;
    setLoading(true);
    setSave("idle");
    supabase
      .from("notes")
      .select("body")
      .eq("user_id", userId)
      .eq("note_date", date)
      .maybeSingle()
      .then(({ data }) => {
        if (!active) return;
        setBody(data?.body ?? "");
        loadedDate.current = date;
        setLoading(false);
      });
    return () => {
      active = false;
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, userId]);

  const persist = useCallback(
    async (value: string) => {
      setSave("saving");
      const { error } = await supabase.from("notes").upsert(
        {
          user_id: userId,
          note_date: date,
          body: value,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,note_date" }
      );
      setSave(error ? "error" : "saved");
    },
    [supabase, userId, date]
  );

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setBody(value);
    // Don't save until the note for this date has finished loading.
    if (loadedDate.current !== date) return;
    setSave("saving");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => persist(value), 800);
  }

  const statusLabel =
    save === "saving"
      ? "Saving…"
      : save === "saved"
        ? "Saved"
        : save === "error"
          ? "Couldn't save"
          : "";

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-baseline justify-between px-7 pt-7">
        <h1 className="text-lg font-medium tracking-tight text-text">
          {longLabel(date)}
        </h1>
        <span
          className={`text-xs ${
            save === "error" ? "text-danger" : "text-text-faint"
          }`}
        >
          {statusLabel}
        </span>
      </div>

      <div className="relative flex-1 px-7 pb-7 pt-4">
        {loading ? (
          <div className="space-y-3 pt-1">
            <div className="h-3.5 w-2/3 animate-pulse rounded bg-surface-2" />
            <div className="h-3.5 w-1/2 animate-pulse rounded bg-surface-2" />
          </div>
        ) : (
          <textarea
            value={body}
            onChange={onChange}
            spellCheck
            placeholder="Start writing your day…"
            className="h-full w-full resize-none bg-transparent text-[15px] leading-relaxed text-text outline-none placeholder:text-text-faint"
          />
        )}
      </div>
    </div>
  );
}
