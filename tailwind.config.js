/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'ls-thin': ['ls-thin'],
        'ls-light': ['ls-light'],
        'ls-regular': ['ls-regular'],
        'ls-medium': ['ls-medium'],
        'ls-semibold': ['ls-semibold'],
      },
    },
  },
  plugins: [],
};
