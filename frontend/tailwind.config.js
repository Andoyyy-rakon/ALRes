/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Public Sans"', 'sans-serif'],
        serif: ['"Fraunces"', 'serif'],
      },
      colors: {
        surface: {
          DEFAULT: '#F3F6FC',
          dim: '#E5ECF6',
          bright: '#FFFFFF',
          variant: '#DDE3EE',
          on: '#172033',
          'on-variant': '#526078',
          inverse: '#172033',
          'inverse-on': '#F3F6FC',
          container: '#E5ECF6',
        },
        primary: {
          50: '#F0F4FA',
          100: '#D9E2F3',
          200: '#B4C5E6',
          300: '#8EA8D9',
          400: '#688BCC',
          500: '#3155A6',
          600: '#3155A6',
          700: '#254388',
          800: '#1B3166',
          900: '#112044',
          950: '#081126',
        },
        secondary: {
          DEFAULT: '#526078',
          container: '#E5ECF6',
        },
        outline: {
          DEFAULT: '#C4D0E3',
          variant: '#DDE3EE',
        },
        error: {
          DEFAULT: '#A6402D',
          container: '#F8E6E2',
        },
        ink: {
          DEFAULT: '#172033',
          soft: '#526078',
        },
        paper: {
          DEFAULT: '#F3F6FC',
          dim: '#E5ECF6',
          card: '#FFFFFF',
        },
        rule: {
          DEFAULT: '#DDE3EE',
          strong: '#C4D0E3',
        },
        blue: {
          DEFAULT: '#3155A6',
          deep: '#254388',
          50: '#F0F4FA',
          100: '#D9E2F3',
          200: '#B4C5E6',
          300: '#8EA8D9',
          400: '#688BCC',
          500: '#3155A6',
          600: '#3155A6',
          700: '#254388',
          800: '#1B3166',
          900: '#112044',
        },
        pen: {
          DEFAULT: '#A6402D',
        },
        indigo: {
          50: '#F0F4FA',
          100: '#D9E2F3',
          200: '#B4C5E6',
          300: '#8EA8D9',
          400: '#688BCC',
          500: '#3155A6',
          600: '#3155A6',
          700: '#254388',
          800: '#1B3166',
          900: '#112044',
        },
      },
      boxShadow: {
        'ambient': '0 1px 3px rgba(23,32,51,0.06), 0 4px 16px -4px rgba(23,32,51,0.06)',
        'ambient-hover': '0 4px 24px -4px rgba(23,32,51,0.12), 0 8px 32px -8px rgba(23,32,51,0.08)',
        'card': '0 1px 2px rgba(23,32,51,0.05), 0 4px 20px -4px rgba(23,32,51,0.08)',
        'card-hover': '0 8px 40px -8px rgba(23,32,51,0.18), 0 2px 8px rgba(23,32,51,0.05)',
        'doc': '0 30px 60px -25px rgba(23,32,51,0.25), 0 2px 0 #DDE3EE',
        'inner-top': 'inset 0 1px 0 rgba(255,255,255,0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      }
    },
  },
  plugins: [],
}
