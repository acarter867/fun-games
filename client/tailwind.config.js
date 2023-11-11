/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightMode: {
          primary: '#F7FAFC', // Light gray background
          secondary: '#EDF2F7', // Darker gray background
          accent: '#1A202C', // Dark text or accent color
        },
        darkMode: {
          primary: '#1A202C', // Dark blue background
          secondary: '#2D3748', // Lighter blue background
          accent: '#CBD5E0', // Light text or accent color
        },
      },
    },
  },
  variants: {},
  plugins: [],
};