// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site statique : le Worker Cloudflare sert `dist/`, et `worker/preinscription.ts`
// relaie le formulaire vers Brevo (la clé d'API ne doit jamais arriver dans le navigateur).
export default defineConfig({
  site: 'https://academie-shs.fr',
  trailingSlash: 'ignore',
  integrations: [
    // Site en français seulement depuis le 11/10/2026 (les pages /ar/ et /en/ sont retirées).
    sitemap(),
  ],
});
