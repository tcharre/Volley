import { defineConfig } from 'vite';
// import mpa from 'vite-plugin-multi-pages';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        terrain: 'terrain.html',
      },
    },
    outDir: 'dist',
  },
});
