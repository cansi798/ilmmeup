// @ts-check
import { defineConfig } from 'astro/config';

// Vorschau auf GitHub Pages: https://cansi798.github.io/ilmmeup/
// Bei Umzug auf die eigene Domain: site anpassen und base auf '/'.
export default defineConfig({
  site: 'https://cansi798.github.io',
  base: '/ilmmeup',
  build: { format: 'directory' },
  trailingSlash: 'ignore',
  compressHTML: true,
});
