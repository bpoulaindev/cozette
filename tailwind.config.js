const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './App.tsx', './index.ts'],
  theme: {
    extend: {
      /* fontFamily: {
        'sans': ['"Lato"', ...defaultTheme.fontFamily.sans],
        // 'lato': ['"Lato"', 'cursive']
      }, */
      colors: {
        primary: {
          100: '#FFD7C7',
          200: '#FF916F',
          300: '#FF9270',
          700: '#D36B4C'
        },
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        },
        light: {
          100: '#F8F7FA'
        }
      },
      fontSize: {
        '.5xl': '1.37rem',
        '2.5xl': '1.7rem'
      },
      spacing: {
        px: '1px',
        0: '0',
        '1/2': '0.125rem',
        0.5: '0.125rem',
        1: '0.25rem',
        1.5: '0.375rem',
        2: '0.5rem',
        2.5: '0.625rem',
        3: '0.75rem',
        3.5: '0.875rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        44: '11rem',
        48: '12rem',
        52: '13rem',
        56: '14rem',
        60: '15rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
        96: '24rem'
      },
      screens: {
        md: { raw: '(min-height: 650px)' },
        lg: { raw: '(min-height: 800px)' },
        xl: { raw: '(min-height: 900px)' }
      }
    }
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins')
};
