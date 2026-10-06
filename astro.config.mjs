// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://transstar.co.nz',
  output: 'static',
  // One page: inline the CSS so first paint doesn't wait on a stylesheet request.
  build: { inlineStylesheets: 'always' },
  vite: {
    plugins: [tailwindcss()],
  },
});
