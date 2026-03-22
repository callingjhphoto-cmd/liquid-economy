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
        'micro': ['10px', { lineHeight: '14px' }],
        'caption': ['11px', { lineHeight: '16px' }],
        'small': ['12px', { lineHeight: '18px' }],
        'body': ['14px', { lineHeight: '22px' }],
        'body-lg': ['16px', { lineHeight: '24px' }],
        'subsection': ['18px', { lineHeight: '26px' }],
        'section': ['22px', { lineHeight: '30px' }],
        'page': ['28px', { lineHeight: '36px' }],
        'label': ['10px', { lineHeight: '14px', fontWeight: '600', letterSpacing: '0.05em' }],
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
