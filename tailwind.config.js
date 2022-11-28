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
        grey: {
          DEFAULT: '#161616',
          50: '#383838',
          100: '#353535',
          200: '#2D2D2D',
          300: '#252525',
          400: '#1E1E1E',
          500: '#161616',
          600: '#111111',
          700: '#0C0C0C',
          800: '#070707',
          900: '#020202',
        },
        mercury: {
          DEFAULT: '#E8E8E8',
          50: '#FFFFFF',
          100: '#FCFCFC',
          200: '#F7F7F7',
          300: '#F2F2F2',
          400: '#EDEDED',
          500: '#E8E8E8',
          600: '#DEDEDE',
          700: '#D4D4D4',
          800: '#C9C9C9',
          900: '#BFBFBF',
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
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: `normal`,
            },
            'code::after': {
              content: `normal`,
            },
            blockquote: {
              fontWeight: `400`,
            },
            'blockquote p::before': {
              content: `normal`,
            },
            'blockquote p::after': {
              content: `normal`,
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
