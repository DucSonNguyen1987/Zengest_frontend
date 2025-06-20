// web-admin/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // === ALIAS INTERNES WEB-ADMIN ===
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@store': path.resolve(__dirname, './src/store'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@services': path.resolve(__dirname, './src/services'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
      
      // === ALIAS WORKSPACE SHARED ===
      '@shared': path.resolve(__dirname, '../shared'),
      '@shared/constants': path.resolve(__dirname, '../shared/constants'),
      '@shared/utils': path.resolve(__dirname, '../shared/utils'),
      '@shared/types': path.resolve(__dirname, '../shared/types'),
      '@shared/hooks': path.resolve(__dirname, '../shared/hooks'),
    }
  },
  server: {
    port: 3002,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          ui: ['@heroicons/react']
        }
      }
    }
  }
})