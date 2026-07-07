import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0a0a0c",
        surface: "#121216",
        surface2: "#18181d",
        ink: "#f2eee6",
        muted: "#8d8a85",
        amber: {
          DEFAULT: "#d9a25c",
          soft: "#e8c48f",
          dim: "#8a6a3d",
        },
        tally: {
          DEFAULT: "#b23a3a",
          soft: "#d15b5b",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jbmono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        widest2: "0.35em",
      },
      backgroundImage: {
        "grain-gradient":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(217,162,92,0.08), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(217,162,92,0.25), 0 0 120px rgba(217,162,92,0.08)",
        "glow-red": "0 0 40px rgba(178,58,58,0.3)",
        glass: "0 8px 32px rgba(0,0,0,0.45)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.85" },
          "94%": { opacity: "1" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
      },
      animation: {
        flicker: "flicker 6s infinite",
        blink: "blink 1.4s step-start infinite",
      },
    },
  },
  plugins: [],
};
export default config;
