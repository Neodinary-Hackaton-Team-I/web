/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './AppInner.{js,jsx,ts,tsx}',
    './src/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      red100: '#D42B39',
      red200: '#DC3845',
      red300: '#771929',
      black100: '#282525',
      gray100: '#5D5656',
      gray200: '#grey02',
      gray01: '#5D5656',
      gray03: '#D7D7D7',
      white: '#FFFFFF',
    },
    backgroundColor: {
      'green-black': 'linear-gradient(180deg, #164F40 0%, #0D222C 100%)',
    },
    extend: {},
  },
  plugins: [],
};
