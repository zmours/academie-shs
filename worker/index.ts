// Point d'entrée du Worker Cloudflare.
//
// Les pages construites par Astro (`dist/`) sont servies directement par Cloudflare comme
// fichiers statiques, sans passer par ce code : `run_worker_first` (wrangler.toml) ne l'appelle
// que pour `/api/*`.

import { onRequest, onRequestPost } from './preinscription';

interface Env {
  ASSETS: { fetch(requete: Request): Promise<Response> };
  BREVO_API_KEY?: string;
  BREVO_LIST_ID?: string;
  TURNSTILE_SECRET?: string;
  BREVO_ATTR_PRENOM?: string;
  BREVO_ATTR_NOM?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/preinscription') {
      return request.method === 'POST' ? onRequestPost({ request, env }) : onRequest();
    }
    return env.ASSETS.fetch(request);
  },
};
