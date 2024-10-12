import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: './',
  test: {
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    globals: true,
  },
  server: {
    port: 3000,
  },
})
