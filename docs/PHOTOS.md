# Photos provisoires

Les photos de `public/photos/` sont **provisoires**, en attendant celles de l'Académie. Elles sont
toutes dans le domaine public ou sous licence CC0 (aucune attribution obligatoire), trouvées le
11/10/2026 par le moteur [Openverse](https://openverse.org). Chacune est marquée « Photo provisoire »
sur la page.

| Fichier | Sujet | Où | Source |
|---|---|---|---|
| `boukhara.webp` | Mosquée Kalon, Boukhara | ouverture de la page, image de partage | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Kalan_Mosque_03.jpg), CC0 |
| `mosquee.webp` | Intérieur de la Mosquée bleue, Istanbul | bandeau du verset | [rawpixel](https://www.rawpixel.com), CC0 |

Le 16/10/2026 (maquette v3), `calligraphie.webp`, `lecture.webp`, `notes.webp` et
`ordinateur.webp` ont été retirées : la page ne les utilisait plus. `calligraphie.webp` posait en
plus une question de droit d'auteur (œuvre d'un artiste) ; l'image de partage ne la reprend plus.
La section « Cours en ligne » est dessinée en HTML et CSS, sans photo.

Pour remplacer une photo : même nom de fichier, format WebP, 1 000 à 1 200 px de large, puis
`npm run build` (et `npm run images` si c'est `boukhara.webp`, reprise par l'image de partage).
Le premier remplacement utile : une vraie photo de l'Académie à l'ouverture, ou la vidéo de
présentation (`VIDEO_PRESENTATION` dans `src/i18n/textes.ts`).
