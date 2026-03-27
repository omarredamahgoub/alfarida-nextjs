import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ❄️ Ice Blue — الهوية البصرية للتبريد والتجميد الصناعي */
        ice: {
          50:  "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        /* 🌿 Emerald — للتوافق مع الكود القائم */
        emerald: {
          50:  "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        /* 🧊 Teal — لهجة باردة ثانوية */
        teal: {
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
        },
        /* Dark palette */
        dark: {
          50:  "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      fontFamily: {
        sans:    ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        arabic:  ["var(--font-arabic)",     "system-ui", "sans-serif"],
        display: ["var(--font-display)",    "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in":       "fadeIn 0.6s ease-out forwards",
        "slide-up":      "slideUp 0.7s ease-out forwards",
        "slide-in-left": "slideInLeft 0.7s ease-out forwards",
        "pulse-slow":    "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float":         "float 6s ease-in-out infinite",
        "pulse-glow":    "pulseGlow 3s ease-in-out infinite",
        "ice-crystal":   "iceCrystal 12s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%":   { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 20px rgba(14,165,233,0.2)" },
          "50%":     { boxShadow: "0 0 40px rgba(14,165,233,0.45), 0 0 70px rgba(14,165,233,0.15)" },
        },
        iceCrystal: {
          "0%":   { transform: "rotate(0deg) scale(1)",     opacity: "0.15" },
          "50%":  { transform: "rotate(180deg) scale(1.1)", opacity: "0.25" },
          "100%": { transform: "rotate(360deg) scale(1)",   opacity: "0.15" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        /* Ice grid — يستبدل grid-pattern الأخضر القديم */
        "grid-pattern":
          "linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      boxShadow: {
        /* Ice glow shadows */
        "ice-sm":  "0 4px 14px rgba(14,165,233,0.25)",
        "ice-md":  "0 8px 28px rgba(14,165,233,0.35)",
        "ice-lg":  "0 16px 48px rgba(14,165,233,0.4)",
        "ice-xl":  "0 24px 64px rgba(14,165,233,0.45)",
        "ice-glow":"0 0 40px rgba(14,165,233,0.35), 0 0 80px rgba(14,165,233,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
