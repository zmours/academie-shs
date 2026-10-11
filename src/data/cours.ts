// Le programme du cursus : la SEULE source des matières, lue par la page d'accueil.
// Il reprend MOT POUR MOT `cursus.md`, le document transmis par l'association : ne rien
// reformuler, ne rien ajouter. Seule exception : « étudiant » devient « apprenant », l'association
// n'étant pas déclarée au rectorat (Code de l'éducation, art. L731-1 et suivants).
//
// Le site n'est publié qu'en français depuis le 11/10/2026. Les textes arabes et anglais déjà écrits
// sont gardés pour plus tard ; les matières ajoutées depuis n'en ont pas.
//
// On se préinscrit au cursus complet : la fonction qui relaie le formulaire enregistre
// `CODE_CURSUS` dans l'attribut Brevo `MODULES`.

export type Langue = 'fr' | 'ar' | 'en';
export type Traduit = Record<Langue, string>;
/** Texte en français, traductions facultatives tant que le site n'est publié qu'en français. */
export type TexteFr = { fr: string } & Partial<Record<Exclude<Langue, 'fr'>, string>>;

/**
 * Code enregistré dans l'attribut Brevo `MODULES` pour toute préinscription au cursus.
 * ⚠️ Ne jamais le changer une fois des préinscriptions reçues : les segments Brevo le cherchent.
 */
export const CODE_CURSUS = 'cursus-eis';

export interface Matiere {
  /** Nom arabe affiché sur la fiche de la matière. */
  arabe: string;
  titre: TexteFr;
  /** Contenu de la matière, quand le programme le précise. */
  detail?: TexteFr;
}

export interface Annee {
  numero: 1 | 2 | 3;
  nom: Traduit;
  /** Photo d'illustration, dans `public/photos/`. */
  photo: string;
  matieres: Matiere[];
}

export const ANNEES: Annee[] = [
  {
    numero: 1,
    nom: { fr: 'Première année', ar: 'السنة الأولى', en: 'First year' },
    photo: '/photos/boukhara.webp',
    matieres: [
      {
        arabe: 'علوم القرآن',
        titre: {
          fr: 'Introduction aux sciences du Coran (ʿUlūm al-Qurʾān)',
          ar: 'مدخل إلى علوم القرآن',
          en: 'Introduction to the Qur’anic Sciences',
        },
        detail: {
          fr: 'Révélation, compilation, lectures (qirāʾāt), abrogation.',
          ar: 'الوحي، والجمع، والقراءات، والناسخ والمنسوخ.',
          en: 'Revelation, compilation, readings (qirāʾāt), abrogation.',
        },
      },
      {
        arabe: 'علوم الحديث',
        titre: {
          fr: 'Introduction aux sciences du hadith',
          ar: 'مدخل إلى علوم الحديث',
          en: 'Introduction to the Hadith Sciences',
        },
        detail: {
          fr: 'Terminologie, classification, transmission.',
          ar: 'المصطلح، والتصنيف، والرواية.',
          en: 'Terminology, classification, transmission.',
        },
      },
      {
        arabe: 'السيرة النبوية',
        titre: { fr: 'Sīra du Prophète (biographie prophétique)', ar: 'السيرة النبوية', en: 'The Life of the Prophet (Sīra)' },
      },
      {
        arabe: 'أصول الفقه',
        titre: {
          fr: 'Fondements du droit musulman « Uṣūl al-fiqh » – 1ʳᵉ partie',
          ar: 'أصول الفقه، الجزء الأول',
          en: 'Principles of Islamic Law (uṣūl al-fiqh), Part 1',
        },
      },
      {
        arabe: 'السياق التاريخي',
        titre: {
          fr: 'Contexte historique et enseignements spirituels et sociaux',
          ar: 'السياق التاريخي والتوجيهات الروحية والاجتماعية',
          en: 'Historical Context, Spiritual and Social Teachings',
        },
      },
      {
        arabe: 'فقه العبادات',
        titre: {
          fr: 'Fiqh des actes d’adoration (ʿibādāt)',
          ar: 'فقه العبادات',
          en: 'Jurisprudence of Worship (ʿibādāt)',
        },
        detail: {
          fr: 'Purification, prière, jeûne, zakāt, pèlerinage. (Mémorisation d’Ibn ʿĀshir partiellement)',
          ar: 'الطهارة، والصلاة، والصيام، والزكاة، والحج، مع حفظ جزء من متن ابن عاشر.',
          en: 'Purification, prayer, fasting, zakat, pilgrimage. (Partial memorisation of Ibn ʿĀshir)',
        },
      },
      {
        arabe: 'علم الاجتماع',
        titre: { fr: 'Introduction à la sociologie', ar: 'مدخل إلى علم الاجتماع', en: 'Introduction to Sociology' },
        detail: {
          fr: 'Concepts fondamentaux : socialisation, institutions, normes.',
          ar: 'المفاهيم الأساسية: التنشئة الاجتماعية، والمؤسسات، والمعايير.',
          en: 'Core concepts: socialisation, institutions, norms.',
        },
      },
    ],
  },
  {
    numero: 2,
    nom: { fr: 'Deuxième année', ar: 'السنة الثانية', en: 'Second year' },
    photo: '/photos/mosquee.webp',
    matieres: [
      {
        arabe: 'أصول الفقه',
        titre: { fr: 'Uṣūl al-fiqh (fondements de la jurisprudence)' },
        detail: { fr: 'Sources du droit, raisonnement juridique.' },
      },
      {
        arabe: 'فقه المعاملات',
        titre: { fr: 'Fiqh des transactions (muʿāmalāt)' },
        detail: { fr: 'Commerce, contrats, finance.' },
      },
      {
        arabe: 'علوم الحديث',
        titre: { fr: 'Sciences du hadith (niveau avancé)' },
        detail: { fr: 'Critique des chaînes de transmission.' },
      },
      { arabe: 'مقاصد الشريعة', titre: { fr: 'Maqāṣid al-Sharīʿa (objectifs de la loi islamique)' } },
      { arabe: 'التزكية', titre: { fr: 'Purification « Tazkiya »' } },
      { arabe: 'علم اجتماع الأديان', titre: { fr: 'Sociologie des religions' } },
      { arabe: 'الفقه المقارن', titre: { fr: 'Jurisprudence comparée « al-fiqh al-muqāran »' } },
      { arabe: 'الشعائر والجمعيات', titre: { fr: 'Droit des cultes et associations (loi 1901, loi 1905)' } },
      { arabe: 'التيارات الفكرية', titre: { fr: 'Courants de pensée modernes' } },
    ],
  },
  {
    numero: 3,
    nom: { fr: 'Troisième année', ar: 'السنة الثالثة', en: 'Third year' },
    photo: '/photos/ordinateur.webp',
    matieres: [
      {
        arabe: 'التفسير التحليلي',
        titre: { fr: 'Tafsīr analytique' },
        detail: { fr: 'Étude approfondie de sourates choisies.' },
      },
      { arabe: 'العقيدة وعلم الكلام', titre: { fr: 'Pensée théologique islamique (ʿaqīda et kalām)' } },
      { arabe: 'تاريخ الحضارة', titre: { fr: 'Histoire de la civilisation musulmane 1 et 2' } },
      { arabe: 'الزواج والطلاق', titre: { fr: 'Mariage et divorce selon les 4 écoles' } },
      { arabe: 'الفكر السياسي', titre: { fr: 'Pensée politique islamique classique et contemporaine' } },
      { arabe: 'الفلسفة الأخلاقية', titre: { fr: 'Philosophie morale et politique' } },
      {
        arabe: 'الأخلاق الإسلامية',
        titre: { fr: 'Éthique islamique contemporaine' },
        detail: { fr: 'Bioéthique, économie, environnement.' },
      },
      { arabe: 'الإسلام في أوروبا', titre: { fr: 'Sociologie de l’islam en Europe' } },
      { arabe: 'الدولة والأديان', titre: { fr: 'Relations État-religions en France' } },
    ],
  },
];

/** « Travail de fin d'études », mot pour mot. */
export const FIN_ETUDES = {
  titre: 'Travail de fin d’études',
  points: ['Mémoire de recherche (80-120 pages).', 'Sujet croisant sciences islamiques et sciences sociales.'],
  exemplesTitre: 'Exemples de sujets :',
  exemples: [
    'L’évolution de la pratique religieuse musulmane en France.',
    'Les maqāṣid al-sharīʿa et les sociétés européennes.',
    'La gestion des institutions religieuses dans un État laïque.',
    'Éthique islamique et enjeux environnementaux contemporains.',
  ],
};

/** « Compétences acquises », mot pour mot (« l'étudiant » → « l'apprenant »). */
export const COMPETENCES = {
  titre: 'Compétences acquises',
  intro: 'À la fin du programme, l’apprenant saura :',
  liste: [
    'analyser les textes islamiques classiques,',
    'comprendre les dynamiques sociales contemporaines,',
    'intervenir dans le dialogue religieux et social,',
    'enseigner ou participer à la recherche académique.',
  ],
};
