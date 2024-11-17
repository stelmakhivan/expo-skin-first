/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
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
