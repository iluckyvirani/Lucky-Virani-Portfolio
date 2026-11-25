/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f7f3ea',
        ink: '#26231f',
        'blue-ink': '#2f5bd3',
        marker: '#ffe066',
      },
      fontFamily: {
        hand: ['Caveat', '"Segoe Print"', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
