import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primaryPurple: "#7431B8",
        lightPurple: "#F5EDFC",
        lightText: " #88868A",
        darkText: "#1D1C1F",
        darkerText: "#332F2F",
        primaryOrange: "#FF5602",
        lightOrange: "#FCEFE8",
        primaryGreen: "#039855",
        lightGreen: "#EDFCF6",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
