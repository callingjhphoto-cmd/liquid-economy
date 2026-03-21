/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#1A1F36", light: "#2D3142", 50: "#F0F1F4" },
        gold: { DEFAULT: "#C9A96E", light: "#D4BC8E", 50: "#FBF7F0" },
        editorial: "#2B6CB0",
        surface: "#F5F5F7",
        accent: { green: "#38A169", red: "#C53030", orange: "#DD6B20" },
      },
      borderRadius: {
        bento: '12px',
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        'page': ['1.75rem', { lineHeight: '2.25rem', fontWeight: '700' }],
        'section': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        'subsection': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '600' }],
        'label': ['0.625rem', { lineHeight: '1rem', fontWeight: '600', letterSpacing: '0.05em' }],
        'body-lg': ['0.9375rem', { lineHeight: '1.5rem' }],
        'body': ['0.8125rem', { lineHeight: '1.375rem' }],
        'caption': ['0.6875rem', { lineHeight: '1rem' }],
        'micro': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      spacing: {
        'page': '1.5rem',
        'section': '1.5rem',
        'card': '1.25rem',
        'element': '0.75rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        expandDown: {
          '0%': { opacity: '0', transform: 'scaleY(0.95)' },
          '100%': { opacity: '1', transform: 'scaleY(1)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        slideUp: 'slideUp 0.3s ease-out',
        slideDown: 'slideDown 0.2s ease-out forwards',
        expandDown: 'expandDown 0.2s ease-out',
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
}
