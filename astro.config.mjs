// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site statique : le Worker Cloudflare sert `dist/`, et `worker/preinscription.ts`
// relaie le formulaire vers Brevo (la clé d'API ne doit jamais arriver dans le navigateur).
export default defineConfig({
  site: 'https://academie-shs.fr',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr-FR', ar: 'ar', en: 'en' },
      },
    }),
  ],
});
