// ─────────────────────────────────────────────────────────────────────────────
// Placeholder tint per collection, used only while an image loads (and by the
// EditorialImage fallback if a src is ever missing). Picked to sit against the
// oxblood ground rather than to match the artwork exactly.
// ─────────────────────────────────────────────────────────────────────────────

const TONES: Record<string, string> = {
  thesis: "#7A3A32",
  "prints-and-cutlines": "#6E7C6A",
  "silk-scarves": "#9A6A5C",
  bridal: "#7B3540",
  "semi-formals": "#6F8189",
};

export const NEUTRAL_TONE = "#8A6A5A";

export function toneFor(slug: string): string {
  return TONES[slug] ?? NEUTRAL_TONE;
}
