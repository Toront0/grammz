import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      keyframes: {
        glintMove: {
          "0%": { transform: "translateX(-100%) rotate(45deg)" },
          "100%": { transform: "translateX(600%) rotate(45deg)" }
        }
      },
      fontFamily: {
        // Link the Tailwind utility name 'montserrat' to your layout CSS variable
        display: ["var(--font-playfair)", "serif"],
        sansClean: ["var(--font-montserrat)", "sans-serif"]
      }
    }
  },
  plugins: []
};
export default config;
