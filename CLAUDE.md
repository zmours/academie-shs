# Instructions pour Claude Code — academie-shs

Site de préinscription de l'Académie française des sciences humaines et sociales. Voir `README.md`.

## Git

**Jamais de `git commit` sans validation explicite de l'utilisateur**, pour chaque commit. Un « ok »
ou un « vas-y » sur une proposition de travail autorise à coder, pas à commiter. Commits sur `main`.

## Langue

Documentation, commentaires de code et messages de commit en **français**. Depuis le 11/10/2026,
le site n'est publié **qu'en français** (cours en français seulement) : les textes arabes et anglais
de `src/data/cours.ts` et `src/i18n/textes.ts` sont gardés pour plus tard mais ne sont plus tenus à
jour. `/ar/` et `/en/` redirigent vers l'accueil (`worker/index.ts`).

## Règles du contenu

- Jamais « diplôme », « licence », « master » ni « université » (Code de l'éducation,
  art. L731-14) : on écrit « certificat de l'Académie », « attestation de suivi ».
- Ni date, ni tarif, ni nom d'enseignant tant que l'association ne les a pas fixés.
- Le programme (`src/data/cours.ts`) reprend **mot pour mot** `cursus.md`, le document de
  l'association : ne rien reformuler, ne rien ajouter. L'introduction et les objectifs généraux
  aussi (`src/i18n/textes.ts`). Seule exception : « étudiant » devient « apprenant ».
- `CODE_CURSUS` (`src/data/cours.ts`) est enregistré dans Brevo : ne jamais le changer une fois
  des préinscriptions reçues.
- La section « Cours en ligne » ne montre que ce que l'outil de cours fait réellement (pas de
  reprise d'une rediffusion à la seconde près, pas de rappel avant le cours). Ne pas nommer l'outil.
- Peu d'animation : apparitions discrètes et onglets. Rien qui défile ou bouge seul.

## Données personnelles

Se préinscrire à un cursus d'études islamiques peut révéler une conviction religieuse (art. 9 RGPD) : le
consentement explicite du formulaire est obligatoire, et la politique de confidentialité
(`src/pages/confidentialite.astro`) doit décrire ce que fait réellement
`worker/preinscription.ts`. Aucune donnée personnelle dans les journaux de la fonction.
