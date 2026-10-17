# Instructions pour Claude Code — academie-shs

Site de préinscription de l'Académie française des sciences humaines et sociales. Voir `README.md`.

## Git

**Jamais de `git commit` sans validation explicite de l'utilisateur**, pour chaque commit. Un « ok »
ou un « vas-y » sur une proposition de travail autorise à coder, pas à commiter. Commits sur `main`.

## Langue

Documentation, commentaires de code et messages de commit en **français**. Depuis le 11/10/2026,
le site n'est publié **qu'en français** (cours en français seulement). Les textes arabes et anglais
de l'ancienne page sont archivés dans `src/i18n/textes-archive.ts` (rien ne les importe) ; ceux du
programme restent dans `src/data/cours.ts`. `/ar/` et `/en/` redirigent vers l'accueil
(`worker/index.ts`).

## Règles du contenu

- Jamais « diplôme », « licence », « master » ni « université » (Code de l'éducation,
  art. L731-14) : on écrit « certificat de l'Académie », « attestation de suivi ».
- Ni date, ni tarif, ni nom d'enseignant tant que l'association ne les a pas fixés. Fixés le
  16/10/2026 et mis à jour le 17/10/2026 : rentrée « début novembre » 2026 (**pas de date
  précise**), lundi, mardi et mercredi soir, deux séances d'une heure (19 h – 20 h et
  20 h – 21 h), soit 6 h par semaine, 250 € la première année, six matières de 15 h (`RENTREE` et
  `heures` dans `src/data/cours.ts`). Les soirs étant les mêmes pour tous, le formulaire ne demande
  plus de disponibilités (17/10/2026).
- Le tableau horaire de l'association contient aussi le coût des enseignants (tarif horaire,
  coût net) : **donnée interne, jamais sur le site**.
- Le programme (`src/data/cours.ts`) reprend **mot pour mot** `cursus.md`, le document de
  l'association : ne rien reformuler, ne rien ajouter. L'introduction et les objectifs généraux
  aussi (`src/i18n/textes.ts`). Exceptions : « étudiant » devient « apprenant » ; et depuis le 16/10/2026, en 1re année, « Contexte historique et enseignements spirituels et sociaux » devient le contenu de la Sīra (le tableau horaire de l'association compte six matières, « Sīra avec contexte »).
- **Aucune adresse électronique sur le site** (17/10/2026) : `contact@academie-shs.fr` était reprise
  par des robots de spam. Le contact se fait par courrier au siège ; un formulaire de contact ou un
  numéro de téléphone viendront plus tard.
- `CODE_CURSUS` (`src/data/cours.ts`) est enregistré dans Brevo : ne jamais le changer une fois
  des préinscriptions reçues.
- La section « Cours en ligne » ne montre que ce que l'outil de cours fait réellement (pas de
  reprise d'une rediffusion à la seconde près, pas de rappel avant le cours). Ne pas nommer l'outil.
- Design : maquette v3 du 16/10/2026 (https://claude.ai/artifact/9bwYoXvvXJCyvwHVonk1Dh), palette
  « encre & laiton », titres Fraunces, texte Schibsted Grotesk, arabe Amiri. Plus de vert.
- Mouvement : l'association veut une page **dynamique** (16/10/2026) — apparitions au défilement,
  compteurs, classe en direct dessinée qui s'anime, barre d'inscription collante sur téléphone.
  Mais la page doit rester **fonctionnelle** (une maquette « trop animée, pas fonctionnelle » a été
  rejetée le 11/10) : chaque mouvement accompagne la lecture, rien ne retient le contenu, tout
  s'arrête avec « réduire les animations » (classe `anime`, `src/scripts/interactions.ts`).
- Le formulaire : garder les `name` des champs et les valeurs des listes (`src/i18n/textes.ts`) —
  `worker/preinscription.ts` les vérifie et Brevo les enregistre.

## Données personnelles

Se préinscrire à un cursus d'études islamiques peut révéler une conviction religieuse (art. 9 RGPD) : le
consentement explicite du formulaire est obligatoire, et la politique de confidentialité
(`src/pages/confidentialite.astro`) doit décrire ce que fait réellement
`worker/preinscription.ts`. Aucune donnée personnelle dans les journaux de la fonction.
