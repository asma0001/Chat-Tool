/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.html',
      './src/**/*.ts',
  ],
  theme: {
    extend: {
      colors: {
        darkBlueColor: '#0F1827',
        blackColor: '#464646',
        black2Color: '#0F1827',
        textColor: '#E5E5E5',
        lightText: '#bdbfc1',
        greyColor: '#373F4B',
        greyColor1: '#676767',
        grey2: '#1B2432',
        red: '#FF5555',
      },
      fontFamily: {
        graphik: ['Graphik', 'sans-serif'],
      },

    },
  },
  plugins: [],
}

