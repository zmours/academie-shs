# academie-shs

Site de préinscription de l'**Académie française des sciences humaines et sociales**
(association loi 1901, SIREN 924 544 448) : <https://academie-shs.fr>.

Trois pages d'accueil (français `/`, arabe `/ar/`, anglais `/en/`) présentent les 13 cours. Le
visiteur ajoute des cours depuis le catalogue, remplit le formulaire, et sa préinscription arrive
dans une liste **Brevo**.

## Ce qu'il y a dedans

| Chemin | Rôle |
|---|---|
| `src/data/cours.ts` | **le catalogue** : pôles et cours, dans les trois langues |
| `src/i18n/textes.ts` | tous les autres textes du site, dans les trois langues |
| `src/components/Accueil.astro` | la page d'accueil (identique dans les trois langues) |
| `src/layouts/Base.astro` | en-tête, pied de page, balises de partage et de référencement |
| `src/scripts/preinscription.ts` | sélection des cours, filtres, barre du bas, envoi du formulaire |
| `src/styles/global.css` | la charte (couleurs, cartes, boutons, version mobile et arabe) |
| `src/pages/` | les pages : accueils, mentions légales, confidentialité, 404 |
| `worker/` | Worker Cloudflare : `index.ts` aiguille `/api/*`, `preinscription.ts` relaie le formulaire vers Brevo |
| `public/` | favicon, image de partage, `robots.txt`, en-têtes HTTP |
| `outils/` | sources HTML des images de `public/` (`npm run images`) |
| `docs/BREVO.md` | préparer le compte Brevo (liste, attributs, segments) |

Technique : [Astro](https://astro.build) en site statique, hébergé sur un **Worker Cloudflare**. Les
polices (Readex Pro, Amiri) sont servies par le site lui-même, pas par Google : aucune donnée de
visiteur ne part chez un tiers avant l'envoi du formulaire.

## Travailler en local

```bash
npm install
npm run dev          # http://localhost:4321 — pages seules, le formulaire répond en erreur
npm run build        # construit dist/
```

Pour tester le formulaire de bout en bout (avec la fonction Cloudflare) :

```bash
cp .env.example .dev.vars    # puis y mettre BREVO_API_KEY, BREVO_LIST_ID (et TURNSTILE_SECRET)
npm run preview:cloudflare   # http://localhost:8787
```

⚠️ Avec une vraie clé, ce test écrit un vrai contact dans Brevo : le supprimer ensuite.

## Modifier un cours

Tout se passe dans `src/data/cours.ts`. Ajouter un cours = ajouter un objet au tableau `COURS`,
avec ses textes en français, en arabe et en anglais. La page, le formulaire et la fonction le
prennent en compte d'eux-mêmes.

**Ne jamais changer l'`id` d'un cours qui a déjà des préinscrits** : c'est ce code qui est
enregistré dans Brevo (`MODULES`), et les segments le cherchent.

## Mettre en ligne

### 1. GitHub

```bash
gh repo create zmours/academie-shs --private --source . --push
```

### 2. Cloudflare — le Worker

Le site est un **Worker** Cloudflare avec fichiers statiques (`wrangler.toml`) : les pages de
`dist/` sont servies telles quelles, et `worker/` ne répond qu'à `/api/*`.

Cloudflare → **Workers & Pages** → Create → **Import a repository** → choisir `academie-shs`.

| Réglage | Valeur |
|---|---|
| Project name | `academie-shs` (doit être identique au `name` de `wrangler.toml`) |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |

Variables, à deux endroits différents :

| Où | Nom | Type | Valeur |
|---|---|---|---|
| Settings → **Variables and Secrets** | `BREVO_API_KEY` | Secret | clé d'API Brevo |
| Settings → **Variables and Secrets** | `BREVO_LIST_ID` | Texte | `4` (liste « Préinscriptions 2026-2027 ») |
| Settings → **Variables and Secrets** | `TURNSTILE_SECRET` | Secret | clé secrète Turnstile |
| Settings → **Build** → Variables and secrets | `PUBLIC_TURNSTILE_SITE_KEY` | Texte | clé publique Turnstile |

`PUBLIC_TURNSTILE_SITE_KEY` est lue **pendant la construction** (elle est écrite dans la page) :
elle va donc dans les variables *de build*, et il faut relancer une construction après l'avoir
ajoutée. Les trois autres sont lues par le Worker à chaque préinscription.

Chaque `git push` sur `main` reconstruit et redéploie le site. Les journaux du Worker (erreurs
Brevo, Turnstile) : Worker → **Observability** → Logs.

### 3. Turnstile (anti-robot)

Cloudflare → **Turnstile** → Add widget → domaines `academie-shs.fr`, `www.academie-shs.fr` et
l'adresse `academie-shs.<compte>.workers.dev`, mode *Managed*. Reporter la clé publique et la clé
secrète dans les variables ci-dessus.

**Ne pas mettre en ligne sans Turnstile** : sans lui, la fonction accepte tout ce qu'on lui envoie
(elle l'écrit dans ses journaux), et un robot peut remplir la liste Brevo.

### 4. Brevo

Mettre la clé d'API dans `.env` ou `.dev.vars` (`BREVO_API_KEY=xkeysib-...`), puis
`npm run brevo` : la liste et les **attributs à créer avant la mise en ligne** sont créés d'un
coup, et le numéro de liste s'affiche. Détail, blocage des adresses IP et segments :
[`docs/BREVO.md`](docs/BREVO.md).

### 5. Les domaines (DNS chez LWS)

Un domaine personnalisé ne se branche sur un Worker que si sa zone DNS est gérée par Cloudflare.
Pour chaque domaine (`.fr` puis `.com`) :

1. Cloudflare → **Add a domain** → `academie-shs.fr`, offre Free. Cloudflare importe les
   enregistrements existants.
2. **Comparer avec la zone LWS avant de basculer.** Les deux domaines ont une messagerie LWS :
   `MX`, `mail`, `smtp` / `imap` / `pop`, SPF, DKIM (`dkim._domainkey`) et DMARC doivent être
   recopiés, en **nuage gris** (DNS only). Un enregistrement oublié coupe le courrier.
3. Chez LWS : Domaines → **Serveurs DNS** → remplacer les serveurs `lwsdns.com` par les deux de
   Cloudflare (désactiver DNSSEC d'abord s'il est actif). La bascule prend de quelques minutes
   à 24 h.
4. Worker `academie-shs` → Settings → **Domains & Routes** → Add → Custom domain :
   `academie-shs.fr`, puis `www.academie-shs.fr` ; Rules → Redirect Rules → modèle
   « Redirect from WWW to root ».
5. Pour `academie-shs.com` : enregistrements A `@` et `www` vers `192.0.2.1` en nuage orange, puis
   Rules → **Redirect Rules** → URL dynamique `concat("https://academie-shs.fr", http.request.uri.path)`,
   code 301, paramètres conservés.

## Avant l'ouverture

- [ ] Mentions légales : renseigner le **numéro RNA** et le **directeur de la publication**
      (`src/pages/mentions-legales.astro`, passages surlignés « À compléter »).
- [ ] Créer la boîte `contact@academie-shs.fr`, citée partout sur le site.
- [ ] Faire relire les textes arabes et anglais (`src/data/cours.ts`, `src/i18n/textes.ts`).
- [ ] Attributs Brevo créés, Turnstile branché, une préinscription de test reçue puis supprimée.
- [ ] Partager le lien dans WhatsApp pour vérifier l'aperçu (`public/og-image.jpg`).
