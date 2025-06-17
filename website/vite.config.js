import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@shared': resolve(__dirname, '../shared')
    }
  },
  server: {
    port: 3001,
    host: true,
    open: false
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false
      }
    }
  }
})