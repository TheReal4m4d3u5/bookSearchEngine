import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      // Add alias for Bootstrap CSS resolution
      'bootstrap/dist/css/bootstrap.min.css': path.resolve(
        __dirname,
        'node_modules/bootstrap/dist/css/bootstrap.min.css'
      ),
    },
  },
  build: {
    rollupOptions: {
      // Mark the CSS as external to avoid resolution issues
      external: ['/bootstrap/dist/css/bootstrap.min.css'],
    },
  },
});