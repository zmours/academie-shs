// Tous les textes de l'interface. Le programme, lui, est dans `src/data/cours.ts`.
//
// Le site n'est publié qu'en FRANÇAIS depuis le 11/10/2026 (cours en français seulement). Les
// textes arabes et anglais de l'ancienne page sont gardés dans `textes-archive.ts`, pour rouvrir
// ces langues plus tard.
//
// Les chiffres de la rentrée (date, heures, prix) ne sont jamais écrits en dur : ils viennent de
// `RENTREE` et des heures de la première année, dans `src/data/cours.ts`.

import { ANNEES, RENTREE, heuresAnnee, type Langue } from '../data/cours';

export const LANGUES: Langue[] = ['fr', 'ar', 'en'];

export const CHEMINS: Record<Langue, string> = { fr: '/', ar: '/ar/', en: '/en/' };

export const DIRECTION: Record<Langue, 'ltr' | 'rtl'> = { fr: 'ltr', ar: 'rtl', en: 'ltr' };

export const ASSOCIATION = {
  nom: 'Académie française des sciences humaines et sociales',
  nomArabe: 'الأكاديمية الفرنسية للعلوم الإنسانية والاجتماعية',
  nomAnglais: 'French Academy of Humanities and Social Sciences',
  siren: '924 544 448',
  adresse: '5 B rue Hubert Latham',
  ville: '76800 Saint-Étienne-du-Rouvray',
  courriel: 'contact@academie-shs.fr',
};

/** Version de la politique de confidentialité, enregistrée dans Brevo avec chaque préinscription. */
export const VERSION_CONSENTEMENT = '2026-10-11';

/**
 * La vidéo de présentation. Tant que `youtube` est vide, l'ouverture montre une photo, sans bouton
 * de lecture. Pour la publier : l'identifiant YouTube de la vidéo (la partie après `v=`) et sa
 * durée. Elle est servie par youtube-nocookie.com et ne se charge qu'au clic : compléter alors la
 * politique de confidentialité (`src/pages/confidentialite.astro`) et `VERSION_CONSENTEMENT`.
 */
export const VIDEO_PRESENTATION: { youtube: string; duree: string } = { youtube: '', duree: '' };

export interface Option {
  valeur: string;
  libelle: string;
}

interface TitreTexte {
  titre: string;
  texte: string;
}

// ——— Les chiffres de la rentrée ———

const PREMIERE = ANNEES.find((a) => a.ouverte) ?? ANNEES[0];
const HEURES = heuresAnnee(PREMIERE);
const SEMAINES = Math.round(HEURES / RENTREE.heuresParSemaine);
const HEURES_MATIERE = PREMIERE.matieres[0]?.heures ?? 0;
const NB_MATIERES = PREMIERE.matieres.length;
const PRIX = `${RENTREE.prixPremiereAnnee} €`;
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

/** « 1<sup>er</sup> novembre 2026 » (HTML), à partir de `RENTREE.debut`. */
function dateHtml(iso: string, avecAnnee = true): string {
  const [annee, mois, jour] = iso.split('-').map(Number);
  const j = jour === 1 ? '1<sup>er</sup>' : String(jour);
  return `${j} ${MOIS[mois - 1]}${avecAnnee ? ` ${annee}` : ''}`;
}
const DEBUT = dateHtml(RENTREE.debut);
const DEBUT_COURT = dateHtml(RENTREE.debut, false);
const DEBUT_TEXTE = DEBUT.replace(/<\/?sup>/g, '');

/** Les champs marqués « html » contiennent des exposants (<sup>) : ils sont écrits avec set:html. */
export interface Textes {
  meta: { titre: string; description: string };
  nav: { cursus: string; rentree: string; enligne: string; faq: string; cta: string; principale: string; evitement: string };
  provisoire: string;
  hero: {
    /** html */
    pastille: string;
    titreDebut: string;
    titreAccent: string;
    titreFin: string;
    chapo: string;
    cta: string;
    ctaVideo: string;
    ctaProgramme: string;
    photoAlt: string;
    /** html */
    legendeTitre: string;
    legendeTexte: string;
    videoTitre: string;
    videoTexte: string;
    videoLire: string;
  };
  reperes: {
    libelle: string;
    /** html */
    debut: string;
    debutTexte: string;
    heuresParSemaine: number;
    semaine: string;
    heures: number;
    /** html */
    heuresTexte: string;
    prix: number;
    prixTexte: string;
    direct: string;
    directTexte: string;
  };
  programme: {
    surtitre: string;
    titreDebut: string;
    titreAccent: string;
    intro: string;
    objectifsTitre: string;
    objectifs: string[];
    parcours: string;
    /** html, une ligne par année puis le mémoire */
    etapesParcours: { titre: string; texte: string }[];
    matieres: (n: number) => string;
    horairesAVenir: string;
    /** html */
    rentree: string;
    chiffres: { valeur: number; suffixe: string; libelle: string }[];
    repartition: string;
    parMatiere: string;
    cta: string;
    voirProgramme: string;
    certificat: string;
    certificatDetail: string;
  };
  rentree: {
    surtitre: string;
    /** html */
    titre: string;
    faits: { valeur: number; suffixe: string; texte: string }[];
    note: string;
    prixSurtitre: string;
    prix: number;
    prixUnite: string;
    prixDetail: string;
    cta: string;
    gratuit: string;
  };
  verset: string;
  enligne: {
    surtitre: string;
    titre: string;
    intro: string;
    atouts: TitreTexte[];
    appareils: string;
    illustration: string;
    classe: {
      direct: string;
      titre: string;
      chrono: string;
      tableauArabe: string;
      tableau: string;
      lignes: string[];
      /** Rang (à partir de 0) de la ligne surlignée par l'enseignant. */
      ligneSurlignee: number;
      sondage: string;
      question: string;
      reponses: { libelle: string; pourcentage: number }[];
      prof: string;
      participants: { initiale: string; prenom: string; couleur: string; main?: boolean }[];
    };
    heure: string;
    notifications: [string, string][];
  };
  etapes: { liste: TitreTexte[] };
  formulaire: {
    surtitre: string;
    titre: string;
    intro: string;
    cursusTitre: string;
    /** html */
    cursusTexte: string;
    prenom: string;
    nom: string;
    courriel: string;
    whatsapp: string;
    pays: string;
    paysOptions: Option[];
    niveau: string;
    niveauOptions: Option[];
    creneaux: string;
    creneauxOptions: Option[];
    origine: string;
    origineOptions: Option[];
    majeur: string;
    consentement: string;
    newsletter: string;
    envoyer: string;
    envoi: string;
    mentions: string;
    confidentialite: string;
    erreurEnvoi: string;
    merciTitre: string;
    /** html */
    merciTexte: string;
  };
  faq: { surtitre: string; titre: string; contact: string; liste: { q: string; r: string }[] };
  barreMobile: {
    /** html */
    titre: string;
    texte: string;
    cta: string;
  };
  pied: { association: string; statut: string; contact: string; mentionsLegales: string; confidentialite: string };
}

export const TEXTES: Textes = {
  meta: {
    titre: 'Académie SHS — Études islamiques et sociales, cursus en trois ans',
    description: `Un cursus de trois ans en ligne et en direct, pour adultes : sciences islamiques classiques, sciences humaines et cadre institutionnel français. Rentrée le ${DEBUT_TEXTE}. Préinscription gratuite et sans engagement.`,
  },
  nav: {
    cursus: 'Le cursus',
    rentree: 'Rentrée',
    enligne: 'Cours en ligne',
    faq: 'Questions',
    cta: 'Se préinscrire',
    principale: 'Navigation principale',
    evitement: 'Aller au contenu',
  },
  provisoire: 'Photo provisoire',
  hero: {
    pastille: `Rentrée le ${DEBUT} · préinscriptions ouvertes`,
    titreDebut: 'Les sciences islamiques, ',
    titreAccent: 'étudiées avec\u00a0méthode',
    titreFin: '.',
    chapo:
      'Études islamiques et sociales : un cursus de trois ans qui croise sciences religieuses, sciences humaines et connaissance du cadre institutionnel français. En ligne et en direct, pour adultes.',
    cta: 'Je me préinscris',
    ctaVideo: 'Voir la présentation',
    ctaProgramme: 'Voir le programme',
    photoAlt: 'La cour d’une mosquée de Boukhara, ses murs couverts de faïence bleue',
    legendeTitre: 'Maîtriser la tradition, comprendre son temps.',
    legendeTexte: 'En ligne et en direct, pour adultes',
    videoTitre: 'Présentation de l’Académie',
    videoTexte: 'Le cursus, les enseignants, une séance en direct',
    videoLire: 'Lire la vidéo de présentation de l’Académie',
  },
  reperes: {
    libelle: 'La rentrée en bref',
    debut: DEBUT_COURT,
    debutTexte: 'début des cours',
    heuresParSemaine: RENTREE.heuresParSemaine,
    semaine: 'de cours par semaine',
    heures: HEURES,
    heuresTexte: 'en 1<sup>re</sup> année',
    prix: RENTREE.prixPremiereAnnee,
    prixTexte: 'l’année',
    direct: 'En direct',
    directTexte: 'et en rediffusion',
  },
  programme: {
    surtitre: 'Le cursus',
    titreDebut: 'Études islamiques et sociales ',
    titreAccent: '(3 ans)',
    // Le paragraphe d'introduction du document de l'association, mot pour mot, sauf
    // « étudiants » → « apprenants » (l'association n'est pas déclarée au rectorat).
    intro:
      'L’objectif est de former des apprenants capables de maîtriser les sciences islamiques classiques, tout en comprenant les réalités sociales contemporaines et le contexte français et européen. Le programme combine donc sciences religieuses, sciences humaines et connaissances du cadre institutionnel français.',
    objectifsTitre: 'Objectifs généraux',
    // « Objectifs généraux » de l'association, mot pour mot.
    objectifs: [
      'Acquérir une formation solide en sciences islamiques traditionnelles.',
      'Comprendre les enjeux contemporains des sociétés européennes, notamment la société française.',
      'Développer une capacité d’analyse critique, historique et sociologique.',
      'Former des enseignants, cadres religieux et associatifs, chercheurs ou médiateurs culturels.',
    ],
    parcours: 'Le parcours',
    etapesParcours: [
      { titre: '1<sup>re</sup> année', texte: `${NB_MATIERES} matières · ${HEURES} h · rentrée ${RENTREE.debut.slice(0, 4)}` },
      { titre: '2<sup>e</sup> année', texte: `${ANNEES[1]?.matieres.length ?? 0} matières` },
      { titre: '3<sup>e</sup> année', texte: `${ANNEES[2]?.matieres.length ?? 0} matières` },
      { titre: 'Mémoire', texte: '80 à 120 pages' },
    ],
    matieres: (n) => (n <= 1 ? `${n} matière` : `${n} matières`),
    horairesAVenir: 'horaires à venir',
    rentree: `Rentrée le ${DEBUT}`,
    chiffres: [
      { valeur: NB_MATIERES, suffixe: '', libelle: 'matières' },
      { valeur: HEURES, suffixe: ' h', libelle: 'de cours' },
      { valeur: RENTREE.heuresParSemaine, suffixe: ' h', libelle: 'par semaine' },
    ],
    repartition: `Répartition des ${HEURES} heures`,
    parMatiere: `${HEURES_MATIERE} h par matière`,
    cta: 'Je me préinscris',
    voirProgramme: 'Le programme',
    certificat: 'Certificat de l’Académie',
    certificatDetail: 'à l’issue du cursus.',
  },
  rentree: {
    surtitre: `Rentrée ${RENTREE.debut.slice(0, 4)}`,
    titre: `Les cours commencent le ${DEBUT_COURT}.`,
    faits: [
      { valeur: RENTREE.heuresParSemaine, suffixe: 'h', texte: 'de cours par semaine, en ligne et en direct' },
      { valeur: HEURES, suffixe: 'h', texte: `en première année, soit ${SEMAINES} semaines de cours` },
      { valeur: NB_MATIERES, suffixe: '', texte: `matières de ${HEURES_MATIERE} heures chacune` },
    ],
    note: 'Les jours et horaires des cours seront communiqués aux préinscrits. Indiquez vos disponibilités dans le formulaire : elles nous aident à les fixer.',
    prixSurtitre: 'Première année',
    prix: RENTREE.prixPremiereAnnee,
    prixUnite: 'l’année',
    prixDetail: `${HEURES} heures de cours en direct, ${NB_MATIERES === 6 ? 'six' : NB_MATIERES} matières.`,
    cta: 'Je me préinscris',
    gratuit: 'La préinscription est gratuite et sans engagement.',
  },
  verset: '« Et dis : Seigneur, accrois mon savoir. » (Coran 20:114)',
  enligne: {
    surtitre: 'Cours en ligne',
    titre: 'Une vraie classe, où que vous soyez.',
    intro:
      'Un enseignant, un groupe, un rendez-vous chaque semaine. Et tout ce qu’il faut autour pour ne rien manquer.',
    atouts: [
      {
        titre: 'La classe en direct',
        texte: 'Vous voyez l’enseignant, vous levez la main, vous réagissez et répondez à ses sondages, à l’oral comme par écrit.',
      },
      {
        titre: 'Votre semaine d’un coup d’œil',
        texte: 'Le prochain cours et un bouton pour le rejoindre, les séances et devoirs à venir, vos séances suivies.',
      },
      {
        titre: 'Les rediffusions',
        texte: 'Un cours manqué est signalé « à rattraper ». Revoyez-le à votre rythme, en accéléré si vous voulez, avec ses supports.',
      },
      {
        titre: 'Supports, devoirs et vie de la classe',
        texte: 'Les documents de chaque séance, des devoirs à rendre en photo, en fichier ou en message vocal, et un mur pour échanger avec le groupe.',
      },
    ],
    appareils: 'Sur ordinateur, tablette ou téléphone.',
    illustration:
      'Illustration : une séance en direct avec l’enseignant, un tableau, un sondage et la main levée d’une apprenante, et les notifications sur un téléphone',
    classe: {
      direct: 'En direct',
      titre: 'Uṣūl al-fiqh · séance 4',
      chrono: '42:08',
      tableauArabe: 'مصادر التشريع',
      tableau: 'Les sources du droit',
      lignes: ['Le Coran', 'La Sunna', 'L’ijmāʿ', 'Le qiyās'],
      ligneSurlignee: 2,
      sondage: 'Sondage',
      question: 'Avez-vous compris la notion d’ijmāʿ ?',
      reponses: [
        { libelle: 'Oui', pourcentage: 78 },
        { libelle: 'Pas encore', pourcentage: 22 },
      ],
      prof: 'L’enseignant',
      participants: [
        { initiale: 'S', prenom: 'Sarah', couleur: '#E8C98A', main: true },
        { initiale: 'Y', prenom: 'Youssef', couleur: '#B9C6E0' },
        { initiale: 'M', prenom: 'Mariam', couleur: '#D9B8A8' },
        { initiale: 'I', prenom: 'Ilyas', couleur: '#C5D4C0' },
      ],
    },
    heure: '20:17',
    notifications: [
      ['La classe est ouverte', 'Sciences du hadith'],
      ['Devoir corrigé', 'Récitation des vers 1 à 10'],
      ['Nouveau message sur le mur', 'Sciences du hadith'],
    ],
  },
  etapes: {
    liste: [
      { titre: 'Vous vous préinscrivez', texte: 'Deux minutes, gratuit et sans engagement.' },
      { titre: 'L’Académie vous recontacte', texte: 'Avec les jours et horaires des cours, pour finaliser l’inscription.' },
      { titre: 'Vous entrez en 1re année', texte: `Dès le ${DEBUT_TEXTE}, en ligne et en direct, en français.` },
    ],
  },
  formulaire: {
    surtitre: 'Préinscription',
    titre: 'Entrez en première année.',
    intro: 'Deux minutes, aucun paiement. Les champs marqués d’un astérisque sont obligatoires.',
    cursusTitre: 'Études islamiques et sociales',
    cursusTexte: `Cursus de trois ans · 1<sup>re</sup> année : ${HEURES} h, ${PRIX}`,
    prenom: 'Prénom',
    nom: 'Nom',
    courriel: 'E-mail',
    whatsapp: 'WhatsApp',
    pays: 'Pays de résidence',
    // ⚠️ Les valeurs (`valeur`) de ces listes sont vérifiées par `worker/preinscription.ts` et
    // enregistrées dans Brevo : ne changer que les libellés.
    paysOptions: [
      { valeur: 'FR', libelle: 'France' },
      { valeur: 'BE', libelle: 'Belgique' },
      { valeur: 'CH', libelle: 'Suisse' },
      { valeur: 'CA', libelle: 'Canada' },
      { valeur: 'GB', libelle: 'Royaume-Uni' },
      { valeur: 'MA', libelle: 'Maroc' },
      { valeur: 'DZ', libelle: 'Algérie' },
      { valeur: 'TN', libelle: 'Tunisie' },
      { valeur: 'AUTRE', libelle: 'Autre pays' },
    ],
    niveau: 'Votre niveau en sciences islamiques',
    niveauOptions: [
      { valeur: 'debutant', libelle: 'Débutant' },
      { valeur: 'intermediaire', libelle: 'Intermédiaire' },
      { valeur: 'avance', libelle: 'Avancé' },
      { valeur: 'ne-sait-pas', libelle: 'Je ne sais pas' },
    ],
    creneaux: 'Vos disponibilités',
    creneauxOptions: [
      { valeur: 'soir-semaine', libelle: 'Soirs de semaine' },
      { valeur: 'samedi', libelle: 'Samedi' },
      { valeur: 'dimanche', libelle: 'Dimanche' },
    ],
    origine: 'Comment avez-vous connu l’Académie ?',
    origineOptions: [
      { valeur: '', libelle: 'Choisir…' },
      { valeur: 'whatsapp', libelle: 'WhatsApp' },
      { valeur: 'instagram', libelle: 'Instagram' },
      { valeur: 'facebook', libelle: 'Facebook' },
      { valeur: 'bouche-a-oreille', libelle: 'Bouche-à-oreille' },
      { valeur: 'mosquee-association', libelle: 'Mosquée ou association' },
      { valeur: 'autre', libelle: 'Autre' },
    ],
    majeur: 'J’ai 18 ans ou plus.',
    consentement:
      'J’accepte que l’Académie traite ces informations, qui peuvent révéler mes convictions religieuses, pour gérer ma préinscription.',
    newsletter: 'Je souhaite recevoir les nouvelles de l’Académie (facultatif).',
    envoyer: 'Envoyer ma préinscription',
    envoi: 'Envoi en cours…',
    mentions:
      'Vos données servent uniquement à organiser la rentrée. Responsable du traitement : l’association Académie française des sciences humaines et sociales.',
    confidentialite: 'Politique de confidentialité',
    erreurEnvoi:
      'L’envoi n’a pas abouti. Vérifiez les champs et réessayez, ou écrivez-nous à contact@academie-shs.fr.',
    merciTitre: 'Merci, c’est noté !',
    merciTexte: `Votre préinscription est enregistrée. L’Académie vous recontacte avant le ${DEBUT_COURT} avec les jours et horaires des cours.`,
  },
  faq: {
    surtitre: 'Questions',
    titre: 'Vos questions',
    contact: 'Une autre question ? Écrivez-nous :',
    liste: [
      {
        q: 'Combien coûte le cursus ?',
        r: `${PRIX} pour la première année. La préinscription, elle, est gratuite et sans engagement.`,
      },
      {
        q: 'Quand commencent les cours ?',
        r: `Le ${DEBUT_TEXTE}, à raison de ${RENTREE.heuresParSemaine} heures de cours par semaine. Les jours et horaires seront communiqués aux préinscrits.`,
      },
      {
        q: 'Combien d’heures de cours en première année ?',
        r: `${HEURES} heures : ${HEURES_MATIERE} heures pour chacune des ${NB_MATIERES === 6 ? 'six' : NB_MATIERES} matières.`,
      },
      {
        q: 'La préinscription m’engage-t-elle ?',
        r: 'Non. Elle est gratuite et sans engagement : vos disponibilités nous aident à fixer les jours et horaires des cours.',
      },
      { q: 'Faut-il parler arabe ?', r: 'Non. Les cours sont donnés en français.' },
      {
        q: 'Et si je manque un cours ?',
        r: 'Chaque cours en direct est enregistré : vous le retrouvez en rediffusion, avec ses supports.',
      },
      { q: 'Que reçoit-on à la fin du cursus ?', r: 'Un certificat délivré par l’Académie.' },
    ],
  },
  barreMobile: {
    titre: `Rentrée le ${DEBUT_COURT}`,
    texte: `${PRIX} l’année · ${RENTREE.heuresParSemaine} h par semaine`,
    cta: 'Se préinscrire',
  },
  pied: {
    association: 'L’association',
    statut: 'Association loi 1901',
    contact: 'Contact',
    mentionsLegales: 'Mentions légales',
    confidentialite: 'Politique de confidentialité',
  },
};
