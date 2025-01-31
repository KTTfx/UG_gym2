import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  },
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.webp'],
  optimizeDeps: {
    exclude: ['sharp']
  }
});