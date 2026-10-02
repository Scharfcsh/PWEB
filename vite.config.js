import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Absolute origin used for canonical URLs, Open Graph tags, the sitemap and the
// blog JSON API. Set SITE_URL explicitly, otherwise fall back to the production
// domain Vercel exposes at build time.
const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:5173')
).replace(/\/+$/, '')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __SITE_URL__: JSON.stringify(siteUrl),
  },
  server: {
    host: true, // This allows access from other devices
    port: 5173, // Or any port you prefer
  },
})
