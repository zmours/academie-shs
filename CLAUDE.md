# Instructions pour Claude Code — academie-shs

Site de préinscription de l'Académie française des sciences humaines et sociales. Voir `README.md`.

## Git

**Jamais de `git commit` sans validation explicite de l'utilisateur**, pour chaque commit. Un « ok »
ou un « vas-y » sur une proposition de travail autorise à coder, pas à commiter. Commits sur `main`.

## Langue

Documentation, commentaires de code et messages de commit en **français**. Le site existe en trois
langues : tout texte visible ajouté en français doit l'être aussi en arabe et en anglais
(`src/data/cours.ts`, `src/i18n/textes.ts`).

## Règles du contenu

- Jamais « diplôme », « licence », « master » ni « université » (Code de l'éducation,
  art. L731-14) : on écrit « certificat de l'Académie », « attestation de suivi ».
- Ni date, ni tarif, ni nom d'enseignant tant que l'association ne les a pas fixés.
- L'`id` d'un cours est enregistré dans Brevo : ne jamais le changer pour un cours qui a des
  préinscrits.

## Données personnelles

Choisir un cours de sciences islamiques peut révéler une conviction religieuse (art. 9 RGPD) : le
consentement explicite du formulaire est obligatoire, et la politique de confidentialité
(`src/pages/confidentialite.astro`) doit décrire ce que fait réellement
`functions/api/preinscription.ts`. Aucune donnée personnelle dans les journaux de la fonction.
