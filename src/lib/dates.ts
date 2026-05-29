/**
 * Date helpers that operate on the user's local calendar day, formatted as
 * YYYY-MM-DD to match the Postgres `date` columns.
 */

export function toDateKey(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function todayKey(): string {
  return toDateKey(new Date());
}

export function dateKeyToDate(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(key: string, delta: number): string {
  const d = dateKeyToDate(key);
  d.setDate(d.getDate() + delta);
  return toDateKey(d);
}

/** "Thursday, 29 May" style label. */
export function longLabel(key: string): string {
  return dateKeyToDate(key).toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

/** "Today", "Yesterday", or a short weekday + day for the date strip. */
export function relativeLabel(key: string, today: string): string {
  if (key === today) return "Today";
  if (key === addDays(today, -1)) return "Yesterday";
  const d = dateKeyToDate(key);
  return d.toLocaleDateString(undefined, { weekday: "short", day: "numeric" });
}

/** A list of the most recent `count` date keys, today first. */
export function recentDays(today: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => addDays(today, -i));
}
