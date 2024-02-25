/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.tsx',
    './src/index.css',
  ],
  theme: {
    extend: {},
  },
  variants: {
    borderWidth: ['responsive', 'last']
  },
  plugins: [],
}

