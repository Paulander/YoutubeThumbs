import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#15161a",
        paper: "#fbfaf7",
        coral: "#ef5b45",
        mint: "#57c7a3",
        cobalt: "#265dff",
        gold: "#f2b84b"
      },
      boxShadow: {
        soft: "0 16px 50px rgba(22, 24, 29, 0.11)"
      }
    }
  },
  plugins: []
};

export default config;
