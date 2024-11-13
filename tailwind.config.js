/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      light: "#ffffff",
      dark: "#1E1E1E",
      "dark-light": "#1E1E1Eaa",
      brand: "#F7A900",
    },
    extend: {
      fontFamily: {
        jeju: ["JejuHallasan", "sans-serif"],
        harlows: ["harlows", "sans-serif"],
      },
    },
  },
  plugins: [],
};
