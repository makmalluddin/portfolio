import { fileURLToPath, URL } from "node:url";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import dashboardApiPlugin from './scripts/dashboard/vite-plugin.mjs'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), dashboardApiPlugin(),
  ViteImageOptimizer({
    png: {
      quality: 80,
    },
    jpeg: {
      quality: 75,
    },
    jpg: {
      quality: 75,
    },
    webp: {
      quality: 80,
    },
    avif: {
      quality: 70,
    },
    svg: {
      multipass: true,
      plugins: [
        {
          name: 'removeViewBox',
          active: false,
        },
      ],
    },
  }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url))
    }
  }

})
