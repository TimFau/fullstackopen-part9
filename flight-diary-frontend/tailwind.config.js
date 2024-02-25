/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.tsx',
    './src/index.css',
  ],
  theme: {
    extend: {
      spacing: {
        'inline-input': '120px'
      },
      colors: {
        'success': '#99ffd6',
        'error': '#ff9999'
      }
    },
  },
  variants: {
    borderWidth: ['responsive', 'last']
  },
  plugins: [],
}

