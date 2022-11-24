/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './components/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './posts/*.mdx',
  ],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          50: '#329576',
          100: '#288b6c',
          200: '#1e8162',
          300: '#147758',
          400: '#0a6d4e',
          500: '#006344',
          600: '#00593a',
          700: '#004f30',
          800: '#004526',
          900: '#003b1c',
        },
        grey: {
          200: '#EBEBEB', // - bg - white
          300: '#CBCBCB', // - text - dark
          400: '#ACACAC', // - border - white
          500: '#343434', // - border - dark
          600: '#2C2C2C', // - text - white
          900: '#0D0D0D', // - bg - dark
        },
        white: '#fff',
        black: '#000',
      },
      maxWidth: {
        md: '1200px',
        lg: '1400px',
        ...defaultTheme.maxWidth,
      },
      fontSize: {
        xs: '.75rem',
        sm: '.875rem',
        tiny: '.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
      },
      fontFamily: {
        mono: ['"Fira Code"', ...defaultTheme.fontFamily.mono],
        sans: ['"Roboto"', ...defaultTheme.fontFamily.sans],
        serif: ['"Playfair Display"', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}