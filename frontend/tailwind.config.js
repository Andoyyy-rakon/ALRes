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
          DEFAULT: '#FAF7F1',
          dim: '#F0EAD9',
          bright: '#FFFFFF',
          variant: '#E7E1D2',
          on: '#16202B',
          'on-variant': '#4A5560',
          inverse: '#16202B',
          'inverse-on': '#FAF7F1',
          container: '#F0EAD9',
        },
        primary: {
          50: '#EEF1F8',
          100: '#D8DFF0',
          200: '#B1BFE1',
          300: '#8A9FD2',
          400: '#637FC3',
          500: '#2E4A9E',
          600: '#2E4A9E',
          700: '#1C2E63',
          800: '#15234A',
          900: '#0E1832',
          950: '#070C19',
        },
        secondary: {
          DEFAULT: '#4A5560',
          container: '#F0EAD9',
        },
        outline: {
          DEFAULT: '#B9AF98',
          variant: '#D9D2C0',
        },
        error: {
          DEFAULT: '#A6402D',
          container: '#F8E6E2',
        },
        ink: {
          DEFAULT: '#16202B',
          soft: '#4A5560',
        },
        paper: {
          DEFAULT: '#FAF7F1',
          dim: '#F0EAD9',
          card: '#FFFFFF',
        },
        rule: {
          DEFAULT: '#D9D2C0',
          strong: '#B9AF98',
        },
        blue: {
          DEFAULT: '#2E4A9E',
          deep: '#1C2E63',
          50: '#EEF1F8',
          100: '#D8DFF0',
          200: '#B1BFE1',
          300: '#8A9FD2',
          400: '#637FC3',
          500: '#2E4A9E',
          600: '#2E4A9E',
          700: '#1C2E63',
          800: '#15234A',
          900: '#0E1832',
        },
        pen: {
          DEFAULT: '#A6402D',
        },
        indigo: {
          50: '#EEF1F8',
          100: '#D8DFF0',
          200: '#B1BFE1',
          300: '#8A9FD2',
          400: '#637FC3',
          500: '#2E4A9E',
          600: '#2E4A9E',
          700: '#1C2E63',
          800: '#15234A',
          900: '#0E1832',
        },
      },
      boxShadow: {
        'ambient': '0 1px 3px rgba(22,32,43,0.06), 0 4px 16px -4px rgba(22,32,43,0.06)',
        'ambient-hover': '0 4px 24px -4px rgba(22,32,43,0.12), 0 8px 32px -8px rgba(22,32,43,0.08)',
        'card': '0 1px 2px rgba(22,32,43,0.05), 0 4px 20px -4px rgba(22,32,43,0.08)',
        'card-hover': '0 8px 40px -8px rgba(22,32,43,0.18), 0 2px 8px rgba(22,32,43,0.05)',
        'doc': '0 30px 60px -25px rgba(22,32,43,0.35), 0 2px 0 #D9D2C0',
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
