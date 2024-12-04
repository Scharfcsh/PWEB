/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      filter: {
        'custom-hover-filter': 'brightness(0) saturate(100%) invert(55%) sepia(64%) saturate(887%) hue-rotate(120deg) brightness(94%) contrast(101%)',
      },
      backgroundImage: {
        'hero': "url('./nnoise.svg')"
        
      }
    },

  },
  variants: {
    filter: ['hover'],
  },
  plugins: [
    require('tailwindcss-filters'),
  ],
}