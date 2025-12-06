import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./store/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#CBE3D3",
          DEFAULT: "#9DC4B5",
          dark: "#2F5D50",
        },
        beige: {
          light: "#FBF7F0",
          DEFAULT: "#F2E9DF",
          dark: "#E2D6C5",
        },
        accent: {
          DEFAULT: "#D95F7C",
          dark: "#B44A63",
        },
      },
      boxShadow: {
        card: "0 10px 30px rgba(0,0,0,0.06)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        card: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
