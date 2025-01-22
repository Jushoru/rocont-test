/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'desktop': '1024px',
      'tablet': '768px',
      'mobile': '480px',
      'mobileMini': '320px'
    },
    extend: {
      colors: {
        'text': 'rgba(15, 23, 42, 1)',
        'accent': 'rgba(112, 119, 134, 1)',
        'main': 'rgba(221, 223, 228, 1)',
        'layer': 'rgba(245, 246, 246, 1)',
        'btnHover': 'rgba(0, 0, 0, 0.1)',
        'red': 'rgba(144, 11, 9, 1)',
        'redHover': 'rgba(144, 11, 9, 0.9)',
        'green': 'rgba(28, 125, 65, 1)',
        'greenHover': 'rgba(25, 113, 59, 1)',

      }
    },
    fontFamily: {
      Inter: ["Inter"]
    }
  },
  plugins: [],
}

