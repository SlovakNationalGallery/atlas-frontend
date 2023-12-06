/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [require('tailwind-scrollbar-hide')],
  theme: {
    extend: {
      borderWidth: {
        1: '1px',
      },
      lineHeight: {
        4.5: '1.125rem',
      },
      opacity: {
        15: '.15',
      },
      padding: (theme) => ({
        bar: `calc(1.5 * ${theme('fontSize.sm')} + ${theme('spacing.8')})`,
        full: '100%',
      }),
      strokeWidth: {
        3: '3',
      },
      translate: {
        peeking: 'max(-50vw, -16rem)',
      },
      width: {
        slide: 'calc(100% / 2.3)',
      },
    },
    colors: {
      none: 'none',
      black: {
        DEFAULT: '#000',
        soft: 'rgba(0, 0, 0, 50%)',
        softest: 'rgba(0, 0, 0, 15%)',
      },
      white: '#fff',
      yellow: '#FFC736',
      blue: {
        dark: '#084ED9',
        DEFAULT: '#095CFF',
        soft: 'rgba(9, 92, 255, 30%)',
        softest: 'rgba(9, 92, 255, 15%)',
      },
      red: '#FF1B1C',
      green: '#31FF00',

      gray: {
        softest: '#DDDEE3',
        soft: '#B9BBC6',
        medium: '#A0A1B1',
        dark: '#6D6E7D',
      },

      transparent: 'transparent',
      current: 'currentColor',
    },
    fontFamily: {
      sans: ['GTWalsheim', 'sans-serif'],
    },
    fontSize: {
      'xs': ['12px'],
      'sm': ['14px'],
      'base': ['16px'],
      'lg': ['18px'],
      'xl': ['20px'],
      '1.5xl': ['22px'],
      '2xl': ['24px'],
      '3xl': ['30px'],
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      bold: '700',
    },
    height: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: 'calc(var(--vh) * 100)',
    }),
    minHeight: (theme) => ({
      0: '0',
      ...theme('spacing'),
      full: '100%',
      screen: 'calc(var(--vh) * 100)',
    }),
  },
}
