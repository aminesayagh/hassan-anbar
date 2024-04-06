import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'html.has-scroll-smooth',
    'html.has-scroll-dragging',
    '[data-scroll-direction="horizontal"]',
    '.c-scrollbar',
    '.c-scrollbar_thumb',
    '.c-scrollbar_thumb:hover',
    '[data-scroll-container]'
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
    },
    fontSize: {

      mxs: ".6875rem",
      xxs: ".75rem",
      xs: ".84rem",
      sm: ".89rem",
      tiny: "0.94rem",
      base: "1rem",
      lg: "1.09rem",
      "2lg": "1.125rem",
      xl: "1.25rem",
      "2xl": "1.4rem",
      "3xl": "1.5rem",
      "4xl": "1.6rem",
      "5xl": "1.8rem",
      "6xl": "2rem",
      "7xl": "2.45rem",
      "8xl": "2.6rem",
      "9xl": "3rem",
      "10xl": "3.2rem",
      "11xl": "3.4rem",
      "12xl": "3.6rem",
      "13xl": "3.8rem",
      "14xl": "4rem",
      "15xl": "4.2rem",
      "16xl": "5rem",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      'primary': {
        DEFAULT: 'oklch(var(--primary-500) / <alpha-value>)',
        100: 'oklch(var(--primary-100) / <alpha-value>)',
        200: 'oklch(var(--primary-200) / <alpha-value>)',
        300: 'oklch(var(--primary-300) / <alpha-value>)',
        400: 'oklch(var(--primary-400) / <alpha-value>)',
        500: 'oklch(var(--primary-500) / <alpha-value>)',
        600: 'oklch(var(--primary-600) / <alpha-value>)',
        700: 'oklch(var(--primary-700) / <alpha-value>)',
        800: 'oklch(var(--primary-800) / <alpha-value>)',
        900: 'oklch(var(--primary-900) / <alpha-value>)',
      },
      content: {
        100: 'oklch(var(--content-100) / <alpha-value>)',
        200: 'oklch(var(--content-200) / <alpha-value>)',
        300: 'oklch(var(--content-300) / <alpha-value>)',
        400: 'oklch(var(--content-400) / <alpha-value>)'
      }
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
