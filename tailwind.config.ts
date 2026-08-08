import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // "Classy & vintage" palette
        ivory: "#F6F1E7", // warm paper background
        cream: "#EFE7D6", // slightly deeper panels
        ink: "#2A2622", // near-black text
        sepia: "#7B4A2F", // burgundy/sepia accent
        gilt: "#A6763E", // muted antique gold
        muted: "#8C8375", // secondary text / hairlines
      },
      fontFamily: {
        // Wired to next/font CSS variables in layout.tsx
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
