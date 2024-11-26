/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customBlack: '#101010', // Replace with the background color from the image
      },
    },
  },
  plugins: [],
};
