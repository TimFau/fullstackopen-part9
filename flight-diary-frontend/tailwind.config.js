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
      }
    },
  },
  variants: {
    borderWidth: ['responsive', 'last']
  },
  plugins: [],
}

