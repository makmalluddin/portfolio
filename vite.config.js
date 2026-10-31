import { fileURLToPath, URL } from "node:url";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dashboardApiPlugin from './scripts/dashboard/vite-plugin.mjs'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), dashboardApiPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url))
    }
  }

})
