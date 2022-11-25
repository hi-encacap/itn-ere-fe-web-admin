/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'source-sans-pro': ['Source Sans Pro', 'sans-serif'],
      },
      width: {
        120: '30rem',
      },
    },
  },
  plugins: [],
};
