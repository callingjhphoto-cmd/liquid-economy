/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#1A1F36", light: "#2D3142" },
        gold: { DEFAULT: "#C9A96E", light: "#D4BC8E" },
        editorial: "#2B6CB0",
        accent: { green: "#38A169", red: "#C53030", orange: "#DD6B20" },
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
}
