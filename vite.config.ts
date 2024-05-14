import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dts from 'vite-plugin-dts';

// Define __dirname
const __dirname = path.resolve();

// Vite configuration
export default defineConfig({
  plugins: [react(),dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'ReactAutoPageRouter',
      fileName: (format) => `react-auto-page-router.${format}.js`,
      // formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled into your library
      external: ['react', 'react-dom', 'react-router-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-router-dom': 'ReactRouterDOM',
        },
      },
    },
    sourcemap : true,
    emptyOutDir: true,
  },
});
