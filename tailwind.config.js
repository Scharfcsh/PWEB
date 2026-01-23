/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        dark: '#0a0a0a',
        muted: '#888888',
        subtle: '#666666',
      },
    },
  },
  plugins: [],
}