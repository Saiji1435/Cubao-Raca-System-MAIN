import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sti: {
          blue: "#0036F9",
          gold: "#FFD447",
          navy: "#012C40",
        },
      },
    },
  },
  plugins: [],
};
export default config;