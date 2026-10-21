import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          petroleo: "#0F3D4A",
          green: "#4E9D47",
          lime: "#7AB958",
          texto: "#2D3E42",
        },
      },
    },
  },
  plugins: [],
};
export default config;
