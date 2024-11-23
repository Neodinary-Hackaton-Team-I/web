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
      gray01: '#5D5656',
      gray02: '#918889',
      gray03: '#D7D7D7',
      gray04: '#BDBDBD',
      white: '#FFFFFF',
    },
    extend: {
      backgroundImage: {
        background: 'linear-gradient(180deg, #000000 0%, #381438 100%)',
        loginBackground: "url('/src/shared/assets/login/background.svg')",
      },
      dropShadow: {
        button: '0px 4px 4px rgba(0, 0, 0, 0.25)', // remove the 'filter:'
      },
    },
  },
  plugins: [],
};
