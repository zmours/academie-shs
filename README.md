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
| `functions/api/preinscription.ts` | fonction Cloudflare qui relaie le formulaire vers Brevo |
| `public/` | favicon, image de partage, `robots.txt`, en-têtes HTTP |
| `outils/` | sources HTML des images de `public/` (`npm run images`) |
| `docs/BREVO.md` | préparer le compte Brevo (liste, attributs, segments) |

Technique : [Astro](https://astro.build) en site statique, hébergé sur **Cloudflare Pages**. Les
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
npm run preview:cloudflare   # http://localhost:8788
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

### 2. Cloudflare Pages

Cloudflare → **Workers & Pages** → Create → Pages → **Connect to Git** → choisir `academie-shs`.

| Réglage | Valeur |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Variable d'environnement `NODE_VERSION` | `24` |

Puis Settings → **Variables and Secrets** (environnement *Production*) :

| Nom | Type | Valeur |
|---|---|---|
| `BREVO_API_KEY` | Secret | clé d'API Brevo |
| `BREVO_LIST_ID` | Texte | numéro de la liste « Préinscriptions 2026-2027 » |
| `TURNSTILE_SECRET` | Secret | clé secrète Turnstile |
| `PUBLIC_TURNSTILE_SITE_KEY` | Texte | clé publique Turnstile (lue **au build** : relancer un déploiement après l'avoir ajoutée) |

Le dossier `functions/` est détecté tout seul : `POST /api/preinscription` existe dès le premier
déploiement. Chaque `git push` sur `main` redéploie le site.

### 3. Turnstile (anti-robot)

Cloudflare → **Turnstile** → Add widget → domaines `academie-shs.fr` et `www.academie-shs.fr`,
mode *Managed*. Reporter la clé publique et la clé secrète dans les variables ci-dessus.

**Ne pas mettre en ligne sans Turnstile** : sans lui, la fonction accepte tout ce qu'on lui envoie
(elle l'écrit dans ses journaux), et un robot peut remplir la liste Brevo.

### 4. Brevo

Suivre [`docs/BREVO.md`](docs/BREVO.md) : liste, **attributs à créer avant la mise en ligne**,
clé d'API.

### 5. Les domaines (DNS chez LWS)

Cloudflare Pages ne peut servir le domaine nu `academie-shs.fr` que si sa zone DNS est gérée par
Cloudflare. Pour chaque domaine (`.fr` puis `.com`) :

1. Cloudflare → **Add a site** → `academie-shs.fr`, offre Free. Cloudflare importe les
   enregistrements existants.
2. **Comparer avec la zone LWS avant de basculer**, en particulier les `MX` et `TXT` si une boîte
   mail est hébergée chez LWS : un enregistrement oublié coupe le courrier le jour du changement.
3. Chez LWS : Gestion du domaine → **Serveurs DNS** → remplacer par les deux serveurs donnés par
   Cloudflare. La bascule prend de quelques minutes à 24 h.
4. Pages → `academie-shs` → **Custom domains** → ajouter `academie-shs.fr` et `www.academie-shs.fr`.
5. Pour `academie-shs.com` : Rules → **Redirect Rules** → redirection 301 de tout le trafic vers
   `https://academie-shs.fr` en conservant le chemin.

## Avant l'ouverture

- [ ] Mentions légales : renseigner le **numéro RNA** et le **directeur de la publication**
      (`src/pages/mentions-legales.astro`, passages surlignés « À compléter »).
- [ ] Créer la boîte `contact@academie-shs.fr`, citée partout sur le site.
- [ ] Faire relire les textes arabes et anglais (`src/data/cours.ts`, `src/i18n/textes.ts`).
- [ ] Attributs Brevo créés, Turnstile branché, une préinscription de test reçue puis supprimée.
- [ ] Partager le lien dans WhatsApp pour vérifier l'aperçu (`public/og-image.jpg`).
