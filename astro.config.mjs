// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // A <username>.github.io repo is served from the domain root, so no `base` is needed.
  site: 'https://achang2.github.io',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
