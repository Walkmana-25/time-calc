import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Generate static files for SSG
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  // Ensure proper base path for static hosting
  base: '/',
});
