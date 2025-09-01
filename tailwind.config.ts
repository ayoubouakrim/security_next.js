import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'martinique': {
          '50': '#f5f5f9',
          '100': '#e7e7f2',
          '200': '#d5d5e8',
          '300': '#b8b9d8',
          '400': '#9696c4',
          '500': '#7f7cb5',
          '600': '#726aa6',
          '700': '#685e97',
          '800': '#5a517c',
          '900': '#4a4464',
          '950': '#3c374e',
        },
      },
    },
  },
  plugins: [],
};
export default config;
