# Brevo — préparer le compte

Le formulaire écrit chaque préinscription dans **une liste Brevo**, avec des attributs de contact.
Brevo **refuse un attribut qui n'existe pas** : il faut les créer tous **avant** la mise en ligne,
sinon chaque envoi échoue et la personne voit le message d'erreur.

## 1. La liste

Contacts → Listes → **Créer une liste** : « Préinscriptions 2026-2027 ».
Son numéro (colonne `ID`) va dans la variable `BREVO_LIST_ID`.

## 2. Les attributs

Contacts → Paramètres → **Attributs de contact** → Créer un attribut. Respecter **exactement** le
nom (majuscules, tirets bas) et le type.

| Attribut | Type Brevo | Contenu |
|---|---|---|
| `PRENOM` | Texte | existe déjà sur un compte en français |
| `NOM` | Texte | existe déjà sur un compte en français |
| `TELEPHONE_WHATSAPP` | Texte | `+33612345678` |
| `PAYS` | Texte | `FR`, `BE`, `CH`, `CA`, `GB`, `MA`, `DZ`, `TN`, `AUTRE` |
| `NIVEAU` | Texte | `debutant`, `intermediaire`, `avance`, `ne-sait-pas` |
| `MODULES` | Texte | codes des cours, séparés par une virgule : `fiqh, sira, khaldun` |
| `LANGUE_COURS` | Texte | `fr`, `ar`, `en`, séparés par une virgule |
| `CRENEAUX` | Texte | `soir-semaine`, `samedi`, `dimanche` |
| `ORIGINE` | Texte | `whatsapp`, `instagram`, `facebook`, `bouche-a-oreille`, `mosquee-association`, `autre` |
| `LANGUE_SITE` | Texte | langue de la page utilisée : `fr`, `ar`, `en` |
| `DATE_PREINSCRIPTION` | Date | première préinscription, jamais écrasée |
| `CONSENTEMENT_DATE` | Date | date du dernier consentement donné |
| `CONSENTEMENT_VERSION` | Texte | version du texte accepté (`2026-10-01`) |
| `MAJEUR` | Booléen | toujours vrai (case obligatoire) |
| `OPTIN_NEWSLETTER` | Booléen | a accepté les nouvelles de l'Académie |
| `UTM_SOURCE`, `UTM_MEDIUM`, `UTM_CAMPAIGN` | Texte | provenance d'un lien de campagne, première valeur conservée |

Compte Brevo en anglais : `FIRSTNAME` / `LASTNAME` remplacent `PRENOM` / `NOM`. Dans ce cas,
renseigner `BREVO_ATTR_PRENOM=FIRSTNAME` et `BREVO_ATTR_NOM=LASTNAME` côté Cloudflare.

### Pourquoi du texte, et pas les attributs natifs `SMS` / `WHATSAPP` ?

Brevo exige qu'un numéro `SMS` ou `WHATSAPP` soit **unique** dans tout le compte : deux membres
d'une même famille qui donnent le même numéro feraient échouer la seconde préinscription. Le
numéro est donc gardé en texte.

### Pourquoi du texte, et pas un attribut « choix multiple » pour `MODULES` ?

Les cours vont changer. Avec un attribut texte, ajouter un cours dans `src/data/cours.ts` suffit ;
avec un choix multiple, il faudrait aussi ajouter l'option dans Brevo, sinon l'envoi échoue.

## 3. Un segment par cours

Contacts → Segments → Créer : `MODULES` **contient** `fiqh`. Un segment par cours (et par langue
avec `LANGUE_COURS` **contient** `ar`, etc.) donne en direct le nombre de demandes. C'est ce
chiffre qui décide quelles classes ouvrir.

Les codes de cours sont l'`id` de chaque cours dans `src/data/cours.ts` : `fiqh`, `sira`, `aqida`,
`coran`, `hadith`, `tajwid`, `arabe`, `comparee`, `philo`, `khaldun`, `histoire`, `socio`, `europe`.

## 4. La clé d'API

Profil → SMTP et API → **Clés API** → Générer une clé. Elle va dans le secret `BREVO_API_KEY` de
Cloudflare, **nulle part ailleurs** : ni dans le code, ni dans un fichier commité, ni dans un
message.

## Ce que fait le formulaire quand une personne se réinscrit

Le contact est retrouvé par son adresse électronique. Ses cours, langues et créneaux sont
**ajoutés** aux précédents, jamais remplacés : sans courriel de confirmation, quelqu'un peut
saisir l'adresse d'un autre, et il ne doit pas pouvoir effacer ses choix.

## Aucun courriel envoyé pour l'instant

Décision du 01/10/2026 : ni double opt-in, ni courriel de bienvenue. Le jour où il en faudra un, il
se branche dans Brevo (Automatisations → « Un contact est ajouté à une liste »), sans toucher au
site. Ne pas envoyer de nouvelles aux contacts dont `OPTIN_NEWSLETTER` est faux.
