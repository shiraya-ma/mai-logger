'use strict';
import { resolve } from 'path';
import { defineConfig }from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    outDir: './dist',
    sourcemap: process.env.NODE_ENV === 'development', // Enable sourcemap generation
    lib: {
      entry: {
        index: resolve(__dirname, 'src', 'index.ts'),
      },
      fileName: (format, name) => `${name}.${format.replace(/^es$/, 'mjs')}`,
      formats: ['cjs', 'es'],
      name: 'MaiLogger',
    },
    rollupOptions: {
      input: {
        index: './src/index.ts',
      },
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,  // Automatically generate a types entry file
      outDir: 'dist',  // Output directory
      copyDtsFiles: true, // Copy other type files
      exclude: [
        'src/**/*.test.ts',
      ]
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
