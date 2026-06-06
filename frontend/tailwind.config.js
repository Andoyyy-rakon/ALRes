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
      },
      colors: {
        surface: {
          DEFAULT: '#faf8ff',
          dim: '#d2d9f4',
          bright: '#faf8ff',
          variant: '#dae2fd',
          on: '#131b2e',
          'on-variant': '#434653',
          inverse: '#283044',
          'inverse-on': '#eef0ff',
        },
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#b0c6ff',
          300: '#7a9fff',
          400: '#477cff',
          500: '#0f52ba',
          600: '#003c90', // Base Primary
          700: '#002f75',
          800: '#002359',
          900: '#001945',
          950: '#001133',
        },
        secondary: {
          DEFAULT: '#505f76',
          container: '#d0e1fb',
        },
        outline: {
          DEFAULT: '#737784',
          variant: '#c3c6d5',
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
        }
      },
      boxShadow: {
        'ambient': '0 4px 24px -4px rgba(19, 27, 46, 0.04), 0 2px 8px -2px rgba(19, 27, 46, 0.04)',
        'ambient-hover': '0 12px 32px -8px rgba(19, 27, 46, 0.08), 0 4px 12px -2px rgba(19, 27, 46, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
