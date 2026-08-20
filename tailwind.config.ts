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
        canvas: "#050507",
        text: "#F4F4F5",
        dim: "rgba(244,244,245,0.62)",
        faint: "rgba(244,244,245,0.38)",
        accent: "#A78BFA",
        "accent-2": "#67E8F9",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass:
          "inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 60px rgba(0,0,0,0.5)",
      },
      borderRadius: {
        glass: "20px",
      },
    },
  },
  plugins: [],
};
export default config;
