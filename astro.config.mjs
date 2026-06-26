import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@tailwindcss/vite';

// Live-sajten serveras på github.io/bopg/ — därför base: '/bopg/'.
export default defineConfig({
  base: '/bopg/',
  site: 'https://fredrikwryman-cmd.github.io',
  integrations: [react()],
  vite: {
    plugins: [tailwind()],
    esbuild: {
      jsx: 'automatic',
      jsxImportSource: 'react',
    },
  },
});
