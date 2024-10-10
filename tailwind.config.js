const flowbite = require("flowbite-react/tailwind")
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path as needed
    flowbite.content(),
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out forwards'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-30px)' },
          '100%': {opacity: 1, transform: 'translateY(0)'},
        },
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}