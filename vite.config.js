import { fileURLToPath, URL } from "node:url";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import dashboardApiPlugin from './scripts/dashboard/vite-plugin.mjs'

// https://vite.dev/config/
// Base hanya dipakai untuk build/preview (GitHub Pages). Di dev tetap "/" agar
// dashboard (/input/dashboard) dan aset /src/assets bisa diakses langsung.
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/portfolio/' : '/',
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

}))
