/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Satoshi', 'Inter', 'Helvetica Neue', 'sans-serif'],
        body: ['Playfair Display', 'Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}
