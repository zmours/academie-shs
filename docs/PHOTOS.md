# Photos provisoires

Les photos de `public/photos/` sont **provisoires**, en attendant celles de l'Académie. Elles sont
toutes dans le domaine public ou sous licence CC0 (aucune attribution obligatoire), trouvées le
11/10/2026 par le moteur [Openverse](https://openverse.org). Chacune est marquée « Photo provisoire »
sur la page.

| Fichier | Sujet | Source |
|---|---|---|
| `calligraphie.webp` | Calligraphie arabe peinte sur un mur | [rawpixel](https://www.rawpixel.com), CC0 |
| `mosquee.webp` | Intérieur de la Mosquée bleue, Istanbul | [rawpixel](https://www.rawpixel.com), CC0 |
| `boukhara.webp` | Mosquée Kalon, Boukhara | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Kalan_Mosque_03.jpg), CC0 |
| `lecture.webp` | Mains sur un livre ouvert | [rawpixel](https://www.rawpixel.com), CC0 |
| `notes.webp` | Prise de notes | [StockSnap](https://stocksnap.io/photo/8Y0EDX4VP9), CC0 |
| `ordinateur.webp` | Bureau avec ordinateur portable | [StockSnap](https://stocksnap.io/photo/OR7D4PANCK), CC0 |

⚠️ **`calligraphie.webp` à remplacer en premier** : la photo est libre, mais elle montre l'œuvre
d'un artiste (calligraffiti), qui peut rester protégée par le droit d'auteur. Même chose pour
l'image de partage `public/og-image.jpg`, qui la reprend (`outils/og-image.html`).

Pour remplacer une photo : même nom de fichier, format WebP, 1 000 à 1 200 px de large, puis
`npm run build` (et `npm run images` si c'est `calligraphie.webp`).
