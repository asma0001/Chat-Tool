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
        grey2: '#1B2432',
      },
      fontFamily: {
        graphik: ['Graphik', 'sans-serif'],
      },

    },
  },
  plugins: [],
}

