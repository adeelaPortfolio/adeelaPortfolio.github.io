import type { Config } from "tailwindcss";

// ─────────────────────────────────────────────────────────────────────────────
// Colours are CSS custom properties so the whole site can be re-themed by
// swapping one block of values in globals.css. The token NAMES keep their
// meaning in every theme — `ivory` is always the page ground, `ink` is always
// the primary text — so a dark theme is a value swap, not a rewrite.
//
// The `<alpha-value>` placeholder is required: without it every opacity
// modifier in the codebase (text-ink/75, bg-ink/10, border-ink/15) breaks.
// ─────────────────────────────────────────────────────────────────────────────

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "rgb(var(--c-ivory) / <alpha-value>)", // page ground
        cream: "rgb(var(--c-cream) / <alpha-value>)", // raised panels
        ink: "rgb(var(--c-ink) / <alpha-value>)", // primary text
        sepia: "rgb(var(--c-sepia) / <alpha-value>)", // accent
        gilt: "rgb(var(--c-gilt) / <alpha-value>)", // secondary accent
        muted: "rgb(var(--c-muted) / <alpha-value>)", // secondary text
        // Always dark, in every theme. Used for washes over photography, where
        // `ink` would invert to light and wash the artwork out.
        scrim: "rgb(var(--c-scrim) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
      },
      letterSpacing: {
        label: "0.22em",
      },
      maxWidth: {
        prose: "68ch",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
