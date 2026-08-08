// ─────────────────────────────────────────────────────────────────────────────
// Curated placeholder tones per collection slug, so the pre-launch placeholders
// carry each collection's mood. Falls back to a neutral vintage tan.
// ─────────────────────────────────────────────────────────────────────────────

const TONES: Record<string, string> = {
  "inventive-bridal": "#7B3540",
  "jahanara-lawn": "#5E7466",
  "labelle-lawn-pret": "#8C6A72",
  "noor-maya": "#8A7350",
  "coronation-lawn": "#6E7C6A",
  "coronation-scarves": "#9A6A5C",
  "palais-royal": "#6F8189",
  "ottoman-queen": "#7A3A32",
};

export const NEUTRAL_TONE = "#B7A587";

export function toneFor(slug: string): string {
  return TONES[slug] ?? NEUTRAL_TONE;
}
