/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nvidia-green': '#76B900',
        'dark-blue': '#1A202C',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}



