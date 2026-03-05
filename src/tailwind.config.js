/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js"],  
  darkMode: 'class',  
  theme: {
    extend: {
      colors: {
        cyberPink: '#ff00ff',
        cyberCyan: '#00ffff',
        cyberPurple: '#230290',
      },
      boxShadow: {
        cyber: '0 0 10px #ff00ff, 0 0 15px #00ffff',
        'cyber-hover': '0 0 20px #ff00ff, 0 0 25px #00ffff'
      }
    },
  },
  plugins: [],
}