module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",  // Untuk file di dalam folder pages
      "./components/**/*.{js,ts,jsx,tsx}",  // Jika Anda memiliki folder components
    ],
    theme: {
      extend: {
        colors: {
          primary: '#7C4A00',
          secondary: '#a3b04a',
          accent: '#f2e5d5',
        },
        fontFamily: {
          sans: ['Montserrat', 'sans-serif'],
        },
        spacing: {
          '1200': '1200px',
        },
      },
    },
    plugins: [],
  }