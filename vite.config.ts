/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react()],
  server: {
    open: true
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [ './src/setupTests.ts' ],
  },
  server: {
    host: 'localhost',
    port: 3001
  }
});