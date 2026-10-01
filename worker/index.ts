// Point d'entrée du Worker Cloudflare.
//
// 1. Toute adresse autre que le domaine principal (www, academie-shs.com) est redirigée en 301
//    vers https://academie-shs.fr, chemin et paramètres conservés : une seule adresse pour le
//    référencement, et aucune règle de redirection à entretenir dans le tableau de bord.
// 2. `/api/preinscription` est traité par `preinscription.ts`.
// 3. Tout le reste est servi depuis les fichiers construits par Astro (`dist/`).

import { onRequest, onRequestPost } from './preinscription';

const DOMAINE = 'academie-shs.fr';

/** Adresses servies telles quelles : le domaine principal, l'adresse de test, le poste local. */
function estServiDirectement(hote: string): boolean {
  return hote === DOMAINE || hote.endsWith('.workers.dev') || hote === 'localhost' || hote === '127.0.0.1';
}

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
    const url = new URL(request.url);

    if (!estServiDirectement(url.hostname)) {
      return Response.redirect(`https://${DOMAINE}${url.pathname}${url.search}`, 301);
    }

    if (url.pathname === '/api/preinscription') {
      return request.method === 'POST' ? onRequestPost({ request, env }) : onRequest();
    }

    return env.ASSETS.fetch(request);
  },
};
