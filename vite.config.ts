import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { getViteConfig } from '@cloudflare/vite-plugin'

const viteConfig = getViteConfig({
  plugins: [react()],
})

export default defineConfig({
  ...viteConfig,
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
      },
    },
  },
  ssr: {
    external: ['@cloudflare/workers-types'],
  },
})
