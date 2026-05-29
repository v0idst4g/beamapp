import { NextResponse, type NextRequest } from "next/server";
import { getAnthropic, BEAM_MODEL } from "@/lib/anthropic";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are Beam, a calm, grounded assistant that lives inside the user's personal daily workspace. The user keeps a note and a list of todos for today, and you can see both.

How you help:
- Be concrete, honest, and practical. Help the user think about and act on what is actually in their note and todos.
- Keep replies short and warm — usually a few sentences. This is a quiet workspace, not a chatbot.
- When useful, reference specific todos or lines from their note so your advice is grounded in their real day.
- It's fine to suggest what to focus on, break a task down, or gently point out a todo that keeps slipping.

Boundaries:
- Never invent facts about the user, their work, their schedule, or people they mention. If something isn't in their note or todos and you don't know it, say so.
- Don't promise outcomes or results. Offer help, not hype.
- You are not a general web search; stay focused on the user's own workspace and thinking.`;

type TodoRow = { text: string; done: boolean; due_date: string | null };

function buildContext(
  dateLabel: string,
  noteBody: string,
  todos: TodoRow[]
): string {
  const note = noteBody.trim() ? noteBody.trim() : "(the note is empty)";
  const open = todos.filter((t) => !t.done);
  const done = todos.filter((t) => t.done);

  const openList = open.length
    ? open
        .map((t) => `- ${t.text}${t.due_date ? ` (due ${t.due_date})` : ""}`)
        .join("\n")
    : "- (none)";
  const doneList = done.length
    ? done.map((t) => `- ${t.text}`).join("\n")
    : "- (none)";

  return `The user's workspace for ${dateLabel}:

TODAY'S NOTE:
${note}

OPEN TODOS:
${openList}

COMPLETED TODAY:
${doneList}`;
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }

  let body: { message?: string; date?: string; dateLabel?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const message = (body.message ?? "").trim();
  if (!message) {
    return NextResponse.json({ error: "empty_message" }, { status: 400 });
  }
  if (message.length > 4000) {
    return NextResponse.json({ error: "message_too_long" }, { status: 400 });
  }

  const date =
    body.date && /^\d{4}-\d{2}-\d{2}$/.test(body.date)
      ? body.date
      : new Date().toISOString().slice(0, 10);
  const dateLabel = body.dateLabel || "today";

  // Pull the live workspace context for this date (source of truth: the DB).
  const [{ data: note }, { data: todos }, { data: history }] =
    await Promise.all([
      supabase
        .from("notes")
        .select("body")
        .eq("user_id", user.id)
        .eq("note_date", date)
        .maybeSingle(),
      supabase
        .from("todos")
        .select("text, done, due_date")
        .eq("user_id", user.id)
        .eq("todo_date", date)
        .order("sort_order", { ascending: true }),
      supabase
        .from("messages")
        .select("role, content")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(12),
    ]);

  const priorMessages = (history ?? []).reverse().map((m) => ({
    role:
      m.role === "assistant" ? ("assistant" as const) : ("user" as const),
    content: m.content as string,
  }));

  // The Anthropic messages array must begin with a user turn — if our window
  // happens to start mid-pair on an assistant reply, drop the leading ones.
  while (priorMessages.length && priorMessages[0].role === "assistant") {
    priorMessages.shift();
  }

  const context = buildContext(
    dateLabel,
    note?.body ?? "",
    (todos ?? []) as TodoRow[]
  );

  let reply: string;
  try {
    const anthropic = getAnthropic();
    const completion = await anthropic.messages.create({
      model: BEAM_MODEL,
      max_tokens: 700,
      system: `${SYSTEM_PROMPT}\n\n${context}`,
      messages: [...priorMessages, { role: "user", content: message }],
    });
    reply = completion.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("\n")
      .trim();
    if (!reply) {
      reply =
        "I'm not sure how to help with that one — could you say a little more?";
    }
  } catch (err) {
    const detail = err instanceof Error ? err.message : "ai_error";
    return NextResponse.json({ error: "ai_error", detail }, { status: 502 });
  }

  // Persist the exchange (best-effort).
  await supabase.from("messages").insert([
    { user_id: user.id, role: "user", content: message },
    { user_id: user.id, role: "assistant", content: reply },
  ]);

  return NextResponse.json({ reply });
}
