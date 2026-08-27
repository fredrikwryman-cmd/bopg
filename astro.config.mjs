import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@tailwindcss/vite';

// Live-sajten serveras på egen domän, https://bopg.aimstudios.se, i domänroten.
// Därför sätts ingen base alls — Astro använder standardvärdet '/', vilket ger
// sökvägar som /_astro/... och gör import.meta.env.BASE_URL till '/'.
export default defineConfig({
  site: 'https://bopg.aimstudios.se',
  integrations: [react()],
  vite: {
    plugins: [tailwind()],
    esbuild: {
      jsx: 'automatic',
      jsxImportSource: 'react',
    },
  },
});
