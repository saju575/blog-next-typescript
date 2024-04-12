import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dark: "#0f172a",
        // dark: "#2f3640",
        light: "#f5f6fa",
        swanWhite: "#f7f1e3",
        slight: "#dcdde1",
        softlight: "#f0f0f0",
        softdark: "#626262",
        gray: "#546E7A",
        red: "#E53935",
        darkLight: "#222836",
      },
    },
  },
  plugins: [],
};
export default config;
