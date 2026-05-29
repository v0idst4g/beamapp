"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { todayKey, longLabel } from "@/lib/dates";
import type { ChatMessage } from "@/lib/types";
import { AppHeader } from "./AppHeader";
import { DateStrip } from "./DateStrip";
import { NoteEditor } from "./NoteEditor";
import { TodoRail } from "./TodoRail";
import { BeamPanel } from "./BeamPanel";

export function Workspace({
  userEmail,
  subscriptionStatus,
  hasCustomer,
  initialMessages,
}: {
  userEmail: string;
  subscriptionStatus: string | null;
  hasCustomer: boolean;
  initialMessages: ChatMessage[];
}) {
  const [mounted, setMounted] = useState(false);
  const [today, setToday] = useState("");
  const [selected, setSelected] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  // Resolve the user's local "today" and their id on the client to avoid any
  // server/client timezone mismatch.
  useEffect(() => {
    const t = todayKey();
    setToday(t);
    setSelected(t);
    createClient()
      .auth.getUser()
      .then(({ data }) => setUserId(data.user?.id ?? null))
      .finally(() => setMounted(true));
  }, []);

  const ready = mounted && userId && selected;

  const todayLabel = useMemo(
    () => (today ? longLabel(today) : "today"),
    [today]
  );

  return (
    <div className="flex h-screen flex-col bg-bg">
      <AppHeader
        userEmail={userEmail}
        subscriptionStatus={subscriptionStatus}
        hasCustomer={hasCustomer}
      />

      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        {ready && (
          <DateStrip selected={selected} today={today} onSelect={setSelected} />
        )}

        {/* Note */}
        <section className="min-h-[52vh] flex-1 border-b border-border md:min-h-0 md:overflow-y-auto md:border-b-0 md:border-r">
          {ready ? (
            <NoteEditor key={selected} date={selected} userId={userId!} />
          ) : (
            <WorkspaceSkeleton />
          )}
        </section>

        {/* Todos */}
        <aside className="shrink-0 md:w-[320px] md:overflow-y-auto">
          {ready && <TodoRail key={selected} date={selected} userId={userId!} />}
        </aside>
      </div>

      {ready && (
        <BeamPanel
          initialMessages={initialMessages}
          date={today}
          dateLabel={todayLabel}
        />
      )}
    </div>
  );
}

function WorkspaceSkeleton() {
  return (
    <div className="space-y-3 px-7 pt-12">
      <div className="h-4 w-40 animate-pulse rounded bg-surface-2" />
      <div className="h-3.5 w-2/3 animate-pulse rounded bg-surface-2" />
      <div className="h-3.5 w-1/2 animate-pulse rounded bg-surface-2" />
    </div>
  );
}
