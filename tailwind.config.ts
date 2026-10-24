import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        editorial: {
          dark: "#141414",
          charcoal: "#1c1c1c",
          muted: "#666666",
          sand: "#e8dfd8",
          sandHover: "#ddcfc6",
          badge: "#1a1a1a",
          border: "#eeeae5",
          canvas: "#faf8f5",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Didot", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "Montserrat", "Inter", "sans-serif"],
        script: ["var(--font-italianno)", "Italianno", "Alex Brush", "cursive"],
        editorial: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
      },
      letterSpacing: {
        widestPlus: "0.25em",
        mega: "0.3em",
      },
    },
  },
  plugins: [],
};
export default config;
