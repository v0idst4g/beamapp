import Anthropic from "@anthropic-ai/sdk";

let anthropicSingleton: Anthropic | null = null;

/**
 * Lazily construct the Anthropic client so a build without ANTHROPIC_API_KEY
 * never throws. The key lives server-side only and is never exposed to the
 * browser — the chat route is the single place it's used.
 */
export function getAnthropic(): Anthropic {
  if (anthropicSingleton) return anthropicSingleton;

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    throw new Error("ANTHROPIC_API_KEY is not set.");
  }

  anthropicSingleton = new Anthropic({ apiKey: key });
  return anthropicSingleton;
}

export const BEAM_MODEL =
  process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
