/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode:'class',
  theme: {
    maxWidth: {
      '3xs': '16.5rem',
      'xs': '21.5rem',
      'md': '30rem'
    },
    extend: {
      colors: {
        "main-purple": "#635FC7",
        "medium-grey": "#828FA3",
        "black": "#000112",
        "red": "#EA5555",
        "light-grey": "#F4F7FD",
        "lines-light": "#E4EBFA"
      },
      boxShadow: {
        'task': '0 4px 6px 0px rgba(54, 78, 126, 0.1)'
      }
    },
    fontSize: {
      'xs': '.75rem',
      'sm': '.8rem',
      'base': '.94rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    }
  },
  plugins: [],
};
