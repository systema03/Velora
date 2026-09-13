/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        petroleum: {
          50: '#F0F7FA',
          100: '#D9ECF2',
          200: '#B3D9E5',
          300: '#7FBDD0',
          400: '#4A9CB8',
          500: '#0891B2',
          600: '#077A99',
          700: '#164E63',
          800: '#103E50',
          900: '#0A2E3D',
        },
        teal: {
          50: '#ECFDFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#0891B2',
          600: '#0E7490',
          700: '#155E75',
          800: '#164E63',
          900: '#134E4A',
        },
        surface: '#FFFFFF',
        'surface-alt': '#F4F6F8',
        ink: {
          DEFAULT: '#172033',
          muted: '#5A6B85',
          subtle: '#8A99B0',
        },
        success: {
          500: '#15803D',
          600: '#166534',
          50: '#F0FDF4',
          100: '#DCFCE7',
        },
        warning: {
          500: '#B45309',
          600: '#92400E',
          50: '#FFFBEB',
          100: '#FEF3C7',
        },
        danger: {
          500: '#DC2626',
          600: '#B91C1C',
          50: '#FEF2F2',
          100: '#FEE2E2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(23,32,51,0.06), 0 1px 2px 0 rgba(23,32,51,0.04)',
        'card': '0 2px 8px -2px rgba(23,32,51,0.08), 0 1px 3px -1px rgba(23,32,51,0.05)',
        'float': '0 8px 24px -6px rgba(22,78,99,0.25), 0 4px 8px -4px rgba(22,78,99,0.15)',
        'sheet': '0 -4px 24px -4px rgba(23,32,51,0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        'spin-slow': 'spin 1s linear infinite',
        'pulse-soft': 'pulseSoft 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};
