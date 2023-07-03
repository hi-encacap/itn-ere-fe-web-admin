/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "source-sans-pro": ["Source Sans Pro", "sans-serif"],
      },
      width: {
        4.5: "1.125rem",
        120: "30rem",
        256: "64rem",
        layout: "calc(100% - 18rem)",
      },
      padding: {
        7.5: "1.875rem",
      },
      height: {
        layout: "calc(100vh - 5rem)",
        4.5: "1.125rem",
        18: "4.5rem",
      },
      minHeight: {
        layout: "calc(100vh - 5rem)",
      },
      colors: {
        "input-placeholder": "#AFA9B9",
      },
      boxShadow: {
        center: "0px 0px 10px 0px rgba(0,0,0,0.1)",
      },
      zIndex: {
        60: 60,
        70: 70,
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
