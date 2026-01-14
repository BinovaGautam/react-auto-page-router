import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

// Define __dirname
const __dirname = path.resolve();

// Vite configuration
export default defineConfig({
  plugins: [dts()],
  esbuild: {
    jsx: 'automatic',
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'dist/index.js'),
      name: 'ReactAutoPageRouter',
      fileName: (format) => `react-auto-page-router.${format}.js`,
    },
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled into your library
      external: ['react', 'react-dom', 'react-router-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-router-dom': 'ReactRouterDOM',
          'react/jsx-runtime': 'ReactJSXRuntime',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
