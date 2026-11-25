import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Using custom domain devsohail.tech — base stays '/'
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: isSsrBuild
      ? undefined
      : {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom'],
              motion: ['framer-motion'],
            },
          },
        },
  },
}))
