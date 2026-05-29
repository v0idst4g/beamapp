"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { todayKey } from "@/lib/dates";
import type { Todo } from "@/lib/types";
import {
  PlusIcon,
  CheckIcon,
  TrashIcon,
  CalendarIcon,
  CloseIcon,
} from "@/components/icons";

function dueLabel(d: string): string {
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y, m - 1, day).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });
}

export function TodoRail({ date, userId }: { date: string; userId: string }) {
  const supabase = createClient();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [editingDue, setEditingDue] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const adding = useRef(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    supabase
      .from("todos")
      .select("*")
      .eq("user_id", userId)
      .eq("todo_date", date)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (!active) return;
        setTodos((data ?? []) as Todo[]);
        setLoading(false);
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, userId]);

  const open = todos.filter((t) => !t.done);
  const done = todos.filter((t) => t.done);

  async function addTodo(e: React.FormEvent) {
    e.preventDefault();
    const value = text.trim();
    if (!value || adding.current) return;
    adding.current = true;
    setText("");
    const nextOrder =
      todos.reduce((max, t) => Math.max(max, t.sort_order), 0) + 1;
    const { data, error } = await supabase
      .from("todos")
      .insert({
        user_id: userId,
        todo_date: date,
        text: value,
        sort_order: nextOrder,
      })
      .select()
      .single();
    if (!error && data) {
      setTodos((prev) => [...prev, data as Todo]);
    }
    adding.current = false;
  }

  async function toggle(t: Todo) {
    setTodos((prev) =>
      prev.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x))
    );
    await supabase.from("todos").update({ done: !t.done }).eq("id", t.id);
  }

  async function remove(t: Todo) {
    setTodos((prev) => prev.filter((x) => x.id !== t.id));
    await supabase.from("todos").delete().eq("id", t.id);
  }

  async function setDue(t: Todo, value: string | null) {
    setEditingDue(null);
    setTodos((prev) =>
      prev.map((x) => (x.id === t.id ? { ...x, due_date: value } : x))
    );
    await supabase.from("todos").update({ due_date: value }).eq("id", t.id);
  }

  // --- drag reorder (open todos only) ---
  function onDragOver(targetId: string) {
    if (!dragId || dragId === targetId) return;
    setTodos((prev) => {
      const list = [...prev];
      const from = list.findIndex((t) => t.id === dragId);
      const to = list.findIndex((t) => t.id === targetId);
      if (from === -1 || to === -1 || list[to].done) return prev;
      const [moved] = list.splice(from, 1);
      list.splice(to, 0, moved);
      return list;
    });
  }

  async function persistOrder() {
    setDragId(null);
    const updates = open.map((t, i) => ({ id: t.id, sort_order: i }));
    await Promise.all(
      updates.map((u) =>
        supabase.from("todos").update({ sort_order: u.sort_order }).eq("id", u.id)
      )
    );
  }

  const today = todayKey();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-4 pt-7">
        <h2 className="text-xs font-medium uppercase tracking-wider text-text-faint">
          Todos
        </h2>
        <span className="text-xs text-text-faint">
          {open.length} open
        </span>
      </div>

      <form onSubmit={addTodo} className="px-4 pt-4">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-2 focus-within:border-accent">
          <PlusIcon className="h-4 w-4 shrink-0 text-text-faint" />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a todo"
            className="w-full bg-transparent text-[13px] text-text outline-none placeholder:text-text-faint"
          />
        </div>
      </form>

      <div className="mt-3 flex-1 space-y-0.5 overflow-y-auto px-2 pb-6">
        {loading ? (
          <div className="space-y-2 px-2 pt-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-7 animate-pulse rounded-lg bg-surface-2"
              />
            ))}
          </div>
        ) : todos.length === 0 ? (
          <p className="px-2 pt-6 text-center text-[13px] leading-relaxed text-text-faint">
            Nothing yet. Add the first thing you want to get done today.
          </p>
        ) : (
          <>
            {open.map((t) => (
              <TodoRow
                key={t.id}
                todo={t}
                today={today}
                draggable
                isDragging={dragId === t.id}
                onDragStart={() => setDragId(t.id)}
                onDragOver={() => onDragOver(t.id)}
                onDragEnd={persistOrder}
                onToggle={() => toggle(t)}
                onRemove={() => remove(t)}
                editingDue={editingDue === t.id}
                onEditDue={() =>
                  setEditingDue(editingDue === t.id ? null : t.id)
                }
                onSetDue={(v) => setDue(t, v)}
              />
            ))}

            {done.length > 0 && (
              <div className="px-2 pb-1 pt-4 text-[11px] uppercase tracking-wider text-text-faint">
                Done
              </div>
            )}
            {done.map((t) => (
              <TodoRow
                key={t.id}
                todo={t}
                today={today}
                onToggle={() => toggle(t)}
                onRemove={() => remove(t)}
                editingDue={false}
                onEditDue={() => {}}
                onSetDue={() => {}}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function TodoRow({
  todo,
  today,
  draggable = false,
  isDragging = false,
  onDragStart,
  onDragOver,
  onDragEnd,
  onToggle,
  onRemove,
  editingDue,
  onEditDue,
  onSetDue,
}: {
  todo: Todo;
  today: string;
  draggable?: boolean;
  isDragging?: boolean;
  onDragStart?: () => void;
  onDragOver?: () => void;
  onDragEnd?: () => void;
  onToggle: () => void;
  onRemove: () => void;
  editingDue: boolean;
  onEditDue: () => void;
  onSetDue: (value: string | null) => void;
}) {
  const overdue =
    todo.due_date && !todo.done && todo.due_date < today;

  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={(e) => {
        if (draggable) {
          e.preventDefault();
          onDragOver?.();
        }
      }}
      onDragEnd={onDragEnd}
      className={`group rounded-lg px-2 py-1.5 transition-colors hover:bg-surface ${
        isDragging ? "opacity-40" : ""
      }`}
    >
      <div className="flex items-start gap-2.5">
        <button
          onClick={onToggle}
          aria-label={todo.done ? "Mark as not done" : "Mark as done"}
          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border transition-all ${
            todo.done
              ? "border-accent bg-accent text-accent-ink"
              : "border-border hover:border-accent/60"
          }`}
        >
          {todo.done && <CheckIcon className="h-3 w-3" strokeWidth={2.5} />}
        </button>

        <button
          onClick={onToggle}
          className={`flex-1 text-left text-[13px] leading-snug ${
            todo.done ? "text-text-faint line-through" : "text-text"
          }`}
        >
          {todo.text}
          {todo.due_date && (
            <span
              className={`ml-2 inline-block rounded px-1.5 py-0.5 text-[10px] ${
                overdue
                  ? "bg-danger/15 text-danger"
                  : "bg-surface-2 text-text-faint"
              }`}
            >
              {dueLabel(todo.due_date)}
            </span>
          )}
        </button>

        {!todo.done && (
          <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={onEditDue}
              aria-label="Set due date"
              className="rounded p-1 text-text-faint hover:bg-surface-2 hover:text-text"
            >
              <CalendarIcon className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={onRemove}
              aria-label="Delete todo"
              className="rounded p-1 text-text-faint hover:bg-surface-2 hover:text-danger"
            >
              <TrashIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
        {todo.done && (
          <button
            onClick={onRemove}
            aria-label="Delete todo"
            className="shrink-0 rounded p-1 text-text-faint opacity-0 transition-opacity hover:text-danger group-hover:opacity-100"
          >
            <TrashIcon className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {editingDue && (
        <div className="mt-2 flex items-center gap-2 pl-6">
          <input
            type="date"
            defaultValue={todo.due_date ?? ""}
            onChange={(e) => onSetDue(e.target.value || null)}
            className="rounded-md border border-border bg-surface px-2 py-1 text-[12px] text-text outline-none focus:border-accent"
          />
          {todo.due_date && (
            <button
              onClick={() => onSetDue(null)}
              aria-label="Clear due date"
              className="rounded p-1 text-text-faint hover:text-danger"
            >
              <CloseIcon className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
