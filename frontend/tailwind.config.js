/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        surface: {
          DEFAULT: '#f8fafc',
          dim: '#e8edf5',
          bright: '#ffffff',
          variant: '#dae2fd',
          on: '#0f172a',
          'on-variant': '#475569',
          inverse: '#1e293b',
          'inverse-on': '#f1f5f9',
          container: '#f1f5f9',
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        secondary: {
          DEFAULT: '#64748b',
          container: '#e2e8f0',
        },
        outline: {
          DEFAULT: '#94a3b8',
          variant: '#e2e8f0',
        },
        error: {
          DEFAULT: '#dc2626',
          container: '#fee2e2',
        },
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      boxShadow: {
        'ambient': '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px -4px rgba(15,23,42,0.06)',
        'ambient-hover': '0 4px 24px -4px rgba(15,23,42,0.12), 0 8px 32px -8px rgba(15,23,42,0.08)',
        'card': '0 1px 2px rgba(0,0,0,0.05), 0 4px 20px -4px rgba(15,23,42,0.08), 0 0 0 1px rgba(15,23,42,0.04)',
        'card-hover': '0 8px 40px -8px rgba(15,23,42,0.18), 0 2px 8px rgba(0,0,0,0.05), 0 0 0 1px rgba(37,99,235,0.12)',
        'glow-primary': '0 0 0 1px rgba(37,99,235,0.2), 0 4px 32px -4px rgba(37,99,235,0.4)',
        'glow-indigo': '0 0 0 1px rgba(79,70,229,0.2), 0 4px 32px -4px rgba(79,70,229,0.4)',
        'inner-top': 'inset 0 1px 0 rgba(255,255,255,0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-mesh': 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(37,99,235,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(79,70,229,0.05) 0%, transparent 50%)',
        'cta-mesh': 'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(37,99,235,0.3) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 60%, rgba(79,70,229,0.25) 0%, transparent 50%)',
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
