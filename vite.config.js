import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Esto inyecta las variables automáticamente en todos tus .scss
        additionalData: `@use "@/styles/variables.scss" as *;` 
      }
    }
  },
  resolve: {
    alias: {
      // Esto permite usar '@/' para apuntar directamente a la carpeta 'src'
      '@': path.resolve(__dirname, './src'),
    },
  },
})
