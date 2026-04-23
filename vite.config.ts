import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { getViteConfig } from '@lovable.dev/vite-tanstack-config'
import path from 'path'

export default defineConfig(
  getViteConfig({
    react: true,
    entry: 'src/main.tsx',
  }, {
    plugins: [tailwindcss(), react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      middlewareMode: false,
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'esbuild',
      chunkSizeWarningLimit: 1000,
      reportCompressedSize: false,
    },
    define: {
      'process.env.NODE_ENV': '"production"',
    },
  })
)
