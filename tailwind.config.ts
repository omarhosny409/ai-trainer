import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["var(--font-cairo)", "system-ui"] },
      colors: {
        gold: { 50: "#fff8e1", 200: "#f7d66f", 400: "#d6a83f", 600: "#9b6b18" },
        carbon: "#07080b"
      },
      boxShadow: { glow: "0 0 60px rgba(214,168,63,.18)" },
      backgroundImage: {
        radial: "radial-gradient(circle at top, rgba(214,168,63,.22), transparent 35%), radial-gradient(circle at bottom left, rgba(78,70,229,.18), transparent 30%)"
      }
    }
  },
  plugins: []
} satisfies Config;
