// Tous les textes de l'interface, dans les trois langues. Les cours, eux, sont dans
// `src/data/cours.ts`. Traductions arabe et anglaise : premier jet, à faire relire.

import type { Langue } from '../data/cours';

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

/** Version du texte de consentement, enregistrée dans Brevo avec chaque préinscription. */
export const VERSION_CONSENTEMENT = '2026-10-01';

export interface Option {
  valeur: string;
  libelle: string;
}

export interface Textes {
  meta: { titre: string; description: string };
  bandeau: string;
  marque: { sousTitre: string };
  nav: { cours: string; etapes: string; faq: string; cta: string; langue: string; principale: string };
  hero: {
    titreDebut: string;
    titreAccent: string;
    sousTitre: string;
    pastilles: string[];
    ctaPrincipal: string;
    ctaSecondaire: string;
    chiffres: { valeur: string; libelle: string }[];
  };
  atouts: string[];
  catalogue: {
    pastille: string;
    titre: string;
    intro: string;
    filtres: string;
    tous: string;
    ajouter: string;
    ajoute: string;
  };
  etapes: { pastille: string; titre: string; liste: { titre: string; texte: string }[] };
  formulaire: {
    titre: string;
    intro: string;
    prenom: string;
    nom: string;
    courriel: string;
    whatsapp: string;
    pays: string;
    paysOptions: Option[];
    niveau: string;
    niveauOptions: Option[];
    mesCours: string;
    langues: string;
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
    erreurCours: string;
    erreurLangues: string;
    erreurEnvoi: string;
    merciTitre: string;
    merciTexte: string;
  };
  faq: { pastille: string; titre: string; liste: { q: string; r: string }[] };
  pied: { association: string; contact: string; mentionsLegales: string; confidentialite: string };
  barre: { finaliser: string };
}

const LANGUES_COURS: Record<Langue, Option[]> = {
  fr: [
    { valeur: 'fr', libelle: 'Français' },
    { valeur: 'ar', libelle: 'العربية' },
    { valeur: 'en', libelle: 'English' },
  ],
  ar: [
    { valeur: 'ar', libelle: 'العربية' },
    { valeur: 'fr', libelle: 'Français' },
    { valeur: 'en', libelle: 'English' },
  ],
  en: [
    { valeur: 'en', libelle: 'English' },
    { valeur: 'fr', libelle: 'Français' },
    { valeur: 'ar', libelle: 'العربية' },
  ],
};

export function languesCours(langue: Langue): Option[] {
  return LANGUES_COURS[langue];
}

export const TEXTES: Record<Langue, Textes> = {
  fr: {
    meta: {
      titre: 'Académie SHS — Sciences islamiques et sciences humaines, en trois langues',
      description:
        'Treize cours en ligne et en direct, pour adultes, en français, en arabe et en anglais : fiqh malikite, sîra, théologie, philosophie, Ibn Khaldûn… Préinscription gratuite et sans engagement.',
    },
    bandeau: 'Préinscriptions 2026-2027 ouvertes · gratuites et sans engagement',
    marque: { sousTitre: 'Sciences humaines & sociales' },
    nav: {
      cours: 'Les cours',
      etapes: 'Comment ça marche',
      faq: 'Questions',
      cta: 'Se préinscrire',
      langue: 'Langue',
      principale: 'Navigation principale',
    },
    hero: {
      titreDebut: 'Les sciences islamiques et les sciences humaines, ',
      titreAccent: 'en trois langues',
      sousTitre:
        'Treize cours en ligne et en direct, pour adultes : fiqh malikite, sîra, théologie, philosophie, Ibn Khaldûn… Préinscrivez-vous, vous recevrez les dates et les tarifs en priorité.',
      pastilles: ['En ligne et en direct', 'Pour adultes', 'Français · العربية · English', 'Attestation de suivi'],
      ctaPrincipal: 'Je me préinscris — c’est gratuit',
      ctaSecondaire: 'Découvrir les 13 cours',
      chiffres: [
        { valeur: '3', libelle: 'pôles d’études' },
        { valeur: '13', libelle: 'cours au choix' },
        { valeur: '3', libelle: 'langues d’enseignement' },
        { valeur: '0 €', libelle: 'pour se préinscrire' },
      ],
    },
    atouts: ['Association loi 1901', 'En direct avec l’enseignant', 'Textes de référence', 'Sans engagement'],
    catalogue: {
      pastille: 'Le catalogue',
      titre: 'Choisissez vos cours',
      intro: 'Ajoutez autant de cours que vous voulez : ils seront déjà cochés dans le formulaire de préinscription.',
      filtres: 'Filtrer par pôle',
      tous: 'Tous les cours',
      ajouter: 'Ajouter à ma préinscription',
      ajoute: 'Ajouté à ma préinscription',
    },
    etapes: {
      pastille: 'Comment ça marche',
      titre: 'Trois étapes, deux minutes',
      liste: [
        { titre: 'Choisissez vos cours', texte: 'Ajoutez-les depuis le catalogue, autant que vous voulez.' },
        { titre: 'Indiquez votre langue', texte: 'Français, arabe ou anglais : une classe ouvre là où la demande existe.' },
        { titre: 'Recevez dates et tarifs', texte: 'Les préinscrits sont prévenus avant l’ouverture des inscriptions.' },
      ],
    },
    formulaire: {
      titre: 'Ma préinscription',
      intro: 'Deux minutes, aucun paiement. Les champs marqués d’un astérisque sont obligatoires.',
      prenom: 'Prénom',
      nom: 'Nom',
      courriel: 'E-mail',
      whatsapp: 'WhatsApp',
      pays: 'Pays de résidence',
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
      niveau: 'Votre niveau',
      niveauOptions: [
        { valeur: 'debutant', libelle: 'Débutant' },
        { valeur: 'intermediaire', libelle: 'Intermédiaire' },
        { valeur: 'avance', libelle: 'Avancé' },
        { valeur: 'ne-sait-pas', libelle: 'Je ne sais pas' },
      ],
      mesCours: 'Mes cours',
      langues: 'Langue(s) du cours',
      creneaux: 'Créneaux possibles',
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
      erreurCours: 'Choisissez au moins un cours.',
      erreurLangues: 'Choisissez au moins une langue.',
      erreurEnvoi:
        'L’envoi n’a pas abouti. Vérifiez les champs et réessayez, ou écrivez-nous à contact@academie-shs.fr.',
      merciTitre: 'Merci, c’est noté !',
      merciTexte: 'Votre préinscription est enregistrée. Vous recevrez les dates et les tarifs en priorité.',
    },
    faq: {
      pastille: 'Questions',
      titre: 'Vos questions',
      liste: [
        {
          q: 'Combien coûtent les cours ?',
          r: 'Les tarifs ne sont pas encore fixés. Ils seront communiqués en priorité aux préinscrits, avant l’ouverture des inscriptions.',
        },
        { q: 'Quand commencent les cours ?', r: 'La date de rentrée sera annoncée aux préinscrits dès qu’elle sera arrêtée.' },
        {
          q: 'La préinscription m’engage-t-elle ?',
          r: 'Non. Elle est gratuite et sans engagement : elle nous aide à savoir quels cours ouvrir, dans quelle langue et à quels horaires.',
        },
        {
          q: 'Faut-il parler arabe ?',
          r: 'Non. Chaque cours peut être donné en français, en arabe ou en anglais selon la demande. Le cours d’arabe est ouvert aux débutants.',
        },
        {
          q: 'Comment se déroulent les cours ?',
          r: 'En ligne et en direct, avec l’enseignant, à partir des textes de référence indiqués sur chaque cours.',
        },
        { q: 'Que reçoit-on à la fin d’un cours ?', r: 'Une attestation de suivi délivrée par l’Académie.' },
      ],
    },
    pied: {
      association: 'L’association',
      contact: 'Contact',
      mentionsLegales: 'Mentions légales',
      confidentialite: 'Politique de confidentialité',
    },
    barre: { finaliser: 'Finaliser' },
  },

  ar: {
    meta: {
      titre: 'الأكاديمية الفرنسية للعلوم الإنسانية والاجتماعية — العلوم الإسلامية والعلوم الإنسانية بثلاث لغات',
      description:
        'ثلاث عشرة مادة مباشرة عبر الإنترنت للكبار، بالعربية والفرنسية والإنجليزية: الفقه المالكي، السيرة، العقيدة، الفلسفة، ابن خلدون… التسجيل المسبق مجاني ودون أيّ التزام.',
    },
    bandeau: 'التسجيل المسبق للموسم 2026-2027 مفتوح · مجاني ودون أيّ التزام',
    marque: { sousTitre: 'للعلوم الإنسانية والاجتماعية' },
    nav: {
      cours: 'المواد',
      etapes: 'كيف يتمّ التسجيل',
      faq: 'أسئلة شائعة',
      cta: 'سجّل مسبقًا',
      langue: 'اللغة',
      principale: 'القائمة الرئيسية',
    },
    hero: {
      titreDebut: 'العلوم الإسلامية والعلوم الإنسانية، ',
      titreAccent: 'بثلاث لغات',
      sousTitre:
        'ثلاث عشرة مادة مباشرة عبر الإنترنت للكبار: الفقه المالكي، السيرة، العقيدة، الفلسفة، ابن خلدون… سجّل مسبقًا وتصلك المواعيد والرسوم قبل غيرك.',
      pastilles: ['مباشرة عبر الإنترنت', 'للكبار', 'العربية · Français · English', 'شهادة متابعة'],
      ctaPrincipal: 'سجّل مسبقًا مجانًا',
      ctaSecondaire: 'اكتشف المواد الثلاث عشرة',
      chiffres: [
        { valeur: '3', libelle: 'أقطاب دراسية' },
        { valeur: '13', libelle: 'مادة للاختيار' },
        { valeur: '3', libelle: 'لغات للتدريس' },
        { valeur: '0 €', libelle: 'للتسجيل المسبق' },
      ],
    },
    atouts: ['جمعية خاضعة لقانون 1901', 'مباشرة مع الأستاذ', 'متون معتمدة', 'دون أيّ التزام'],
    catalogue: {
      pastille: 'المواد الدراسية',
      titre: 'اختر موادك',
      intro: 'أضف ما شئت من المواد، وستجدها محدَّدة مسبقًا في استمارة التسجيل.',
      filtres: 'تصفية حسب القطب',
      tous: 'كل المواد',
      ajouter: 'أضف إلى تسجيلي',
      ajoute: 'أُضيفت إلى تسجيلي',
    },
    etapes: {
      pastille: 'كيف يتمّ التسجيل',
      titre: 'ثلاث خطوات في دقيقتين',
      liste: [
        { titre: 'اختر موادك', texte: 'أضفها من قائمة المواد، بقدر ما تشاء.' },
        { titre: 'حدّد لغتك', texte: 'بالعربية أو الفرنسية أو الإنجليزية: نفتح الفصل حيث يوجد الطلب.' },
        { titre: 'تصلك المواعيد والرسوم', texte: 'يُبلَّغ المسجَّلون مسبقًا قبل فتح التسجيل.' },
      ],
    },
    formulaire: {
      titre: 'تسجيلي المسبق',
      intro: 'دقيقتان، دون أيّ دفع. الحقول المشار إليها بنجمة إلزامية.',
      prenom: 'الاسم',
      nom: 'اسم العائلة',
      courriel: 'البريد الإلكتروني',
      whatsapp: 'رقم واتساب',
      pays: 'بلد الإقامة',
      paysOptions: [
        { valeur: 'FR', libelle: 'فرنسا' },
        { valeur: 'BE', libelle: 'بلجيكا' },
        { valeur: 'CH', libelle: 'سويسرا' },
        { valeur: 'CA', libelle: 'كندا' },
        { valeur: 'GB', libelle: 'المملكة المتحدة' },
        { valeur: 'MA', libelle: 'المغرب' },
        { valeur: 'DZ', libelle: 'الجزائر' },
        { valeur: 'TN', libelle: 'تونس' },
        { valeur: 'AUTRE', libelle: 'بلد آخر' },
      ],
      niveau: 'مستواك',
      niveauOptions: [
        { valeur: 'debutant', libelle: 'مبتدئ' },
        { valeur: 'intermediaire', libelle: 'متوسط' },
        { valeur: 'avance', libelle: 'متقدّم' },
        { valeur: 'ne-sait-pas', libelle: 'لا أعرف' },
      ],
      mesCours: 'موادي',
      langues: 'لغة الدراسة',
      creneaux: 'الأوقات المناسبة',
      creneauxOptions: [
        { valeur: 'soir-semaine', libelle: 'مساء أيام الأسبوع' },
        { valeur: 'samedi', libelle: 'السبت' },
        { valeur: 'dimanche', libelle: 'الأحد' },
      ],
      origine: 'كيف تعرّفت على الأكاديمية؟',
      origineOptions: [
        { valeur: '', libelle: 'اختر…' },
        { valeur: 'whatsapp', libelle: 'واتساب' },
        { valeur: 'instagram', libelle: 'إنستغرام' },
        { valeur: 'facebook', libelle: 'فيسبوك' },
        { valeur: 'bouche-a-oreille', libelle: 'عن طريق المعارف' },
        { valeur: 'mosquee-association', libelle: 'مسجد أو جمعية' },
        { valeur: 'autre', libelle: 'غير ذلك' },
      ],
      majeur: 'عمري 18 سنة أو أكثر.',
      consentement:
        'أوافق على أن تعالج الأكاديمية هذه المعلومات، التي قد تكشف عن قناعاتي الدينية، لغرض إدارة تسجيلي المسبق.',
      newsletter: 'أرغب في تلقّي أخبار الأكاديمية (اختياري).',
      envoyer: 'إرسال التسجيل المسبق',
      envoi: 'جارٍ الإرسال…',
      mentions:
        'تُستعمل معطياتك فقط لتنظيم الدخول الدراسي. المسؤول عن المعالجة: جمعية الأكاديمية الفرنسية للعلوم الإنسانية والاجتماعية.',
      confidentialite: 'سياسة الخصوصية',
      erreurCours: 'اختر مادة واحدة على الأقل.',
      erreurLangues: 'اختر لغة واحدة على الأقل.',
      erreurEnvoi: 'تعذّر إرسال التسجيل. تحقّق من الحقول وأعد المحاولة، أو راسلنا على contact@academie-shs.fr.',
      merciTitre: 'شكرًا، تمّ تسجيلك!',
      merciTexte: 'سجّلنا تسجيلك المسبق، وستصلك المواعيد والرسوم قبل غيرك.',
    },
    faq: {
      pastille: 'أسئلة شائعة',
      titre: 'أسئلتكم',
      liste: [
        { q: 'كم تكلّف الدروس؟', r: 'لم تُحدَّد الرسوم بعد، وستُبلَّغ أوّلًا للمسجَّلين مسبقًا قبل فتح التسجيل.' },
        { q: 'متى تبدأ الدروس؟', r: 'سيُعلَن موعد بدء الدراسة للمسجَّلين مسبقًا فور تحديده.' },
        {
          q: 'هل يُلزمني التسجيل المسبق بشيء؟',
          r: 'لا. هو مجاني ودون أيّ التزام، ويساعدنا على معرفة المواد التي نفتحها، وبأيّ لغة، وفي أيّ أوقات.',
        },
        {
          q: 'هل يجب أن أتقن العربية؟',
          r: 'لا. يمكن تدريس كلّ مادة بالعربية أو الفرنسية أو الإنجليزية حسب الطلب، ودرس العربية مفتوح للمبتدئين.',
        },
        { q: 'كيف تُقدَّم الدروس؟', r: 'عبر الإنترنت وبشكل مباشر مع الأستاذ، انطلاقًا من المتون المعتمدة المذكورة في كلّ مادة.' },
        { q: 'ماذا أحصل عليه في نهاية المادة؟', r: 'شهادة متابعة تمنحها الأكاديمية.' },
      ],
    },
    pied: {
      association: 'الجمعية',
      contact: 'للتواصل',
      mentionsLegales: 'البيانات القانونية',
      confidentialite: 'سياسة الخصوصية',
    },
    barre: { finaliser: 'إتمام التسجيل' },
  },

  en: {
    meta: {
      titre: 'Académie SHS — Islamic sciences and the humanities, in three languages',
      description:
        'Thirteen live online courses for adults, in French, Arabic and English: Maliki law, the Sīra, theology, philosophy, Ibn Khaldun… Free, non-binding pre-registration.',
    },
    bandeau: 'Pre-registration for 2026–27 is open · free and non-binding',
    marque: { sousTitre: 'Humanities & Social Sciences' },
    nav: {
      cours: 'Courses',
      etapes: 'How it works',
      faq: 'FAQ',
      cta: 'Pre-register',
      langue: 'Language',
      principale: 'Main navigation',
    },
    hero: {
      titreDebut: 'Islamic sciences and the humanities, ',
      titreAccent: 'in three languages',
      sousTitre:
        'Thirteen live online courses for adults: Maliki law, the Sīra, theology, philosophy, Ibn Khaldun… Pre-register and be the first to receive start dates and fees.',
      pastilles: ['Live and online', 'For adults', 'English · Français · العربية', 'Certificate of attendance'],
      ctaPrincipal: 'Pre-register for free',
      ctaSecondaire: 'Browse the 13 courses',
      chiffres: [
        { valeur: '3', libelle: 'areas of study' },
        { valeur: '13', libelle: 'courses to choose from' },
        { valeur: '3', libelle: 'teaching languages' },
        { valeur: '€0', libelle: 'to pre-register' },
      ],
    },
    atouts: ['Non-profit association', 'Live with the teacher', 'Reference texts', 'Non-binding'],
    catalogue: {
      pastille: 'Course catalogue',
      titre: 'Choose your courses',
      intro: 'Add as many courses as you like: they will already be ticked in the pre-registration form.',
      filtres: 'Filter by area',
      tous: 'All courses',
      ajouter: 'Add to my pre-registration',
      ajoute: 'Added to my pre-registration',
    },
    etapes: {
      pastille: 'How it works',
      titre: 'Three steps, two minutes',
      liste: [
        { titre: 'Choose your courses', texte: 'Add them from the catalogue, as many as you like.' },
        { titre: 'Tell us your language', texte: 'French, Arabic or English: a class opens wherever there is demand.' },
        { titre: 'Get dates and fees first', texte: 'Pre-registered students hear before registration opens.' },
      ],
    },
    formulaire: {
      titre: 'My pre-registration',
      intro: 'Two minutes, no payment. Fields marked with an asterisk are required.',
      prenom: 'First name',
      nom: 'Last name',
      courriel: 'Email',
      whatsapp: 'WhatsApp',
      pays: 'Country of residence',
      paysOptions: [
        { valeur: 'GB', libelle: 'United Kingdom' },
        { valeur: 'FR', libelle: 'France' },
        { valeur: 'BE', libelle: 'Belgium' },
        { valeur: 'CH', libelle: 'Switzerland' },
        { valeur: 'CA', libelle: 'Canada' },
        { valeur: 'MA', libelle: 'Morocco' },
        { valeur: 'DZ', libelle: 'Algeria' },
        { valeur: 'TN', libelle: 'Tunisia' },
        { valeur: 'AUTRE', libelle: 'Other country' },
      ],
      niveau: 'Your level',
      niveauOptions: [
        { valeur: 'debutant', libelle: 'Beginner' },
        { valeur: 'intermediaire', libelle: 'Intermediate' },
        { valeur: 'avance', libelle: 'Advanced' },
        { valeur: 'ne-sait-pas', libelle: 'Not sure' },
      ],
      mesCours: 'My courses',
      langues: 'Course language(s)',
      creneaux: 'Possible times',
      creneauxOptions: [
        { valeur: 'soir-semaine', libelle: 'Weekday evenings' },
        { valeur: 'samedi', libelle: 'Saturday' },
        { valeur: 'dimanche', libelle: 'Sunday' },
      ],
      origine: 'How did you hear about the Academy?',
      origineOptions: [
        { valeur: '', libelle: 'Choose…' },
        { valeur: 'whatsapp', libelle: 'WhatsApp' },
        { valeur: 'instagram', libelle: 'Instagram' },
        { valeur: 'facebook', libelle: 'Facebook' },
        { valeur: 'bouche-a-oreille', libelle: 'Word of mouth' },
        { valeur: 'mosquee-association', libelle: 'Mosque or association' },
        { valeur: 'autre', libelle: 'Other' },
      ],
      majeur: 'I am 18 or older.',
      consentement:
        'I agree that the Academy may process this information, which may reveal my religious beliefs, to manage my pre-registration.',
      newsletter: 'I would like to receive news from the Academy (optional).',
      envoyer: 'Send my pre-registration',
      envoi: 'Sending…',
      mentions:
        'Your data is used only to organise the new academic year. Data controller: the association Académie française des sciences humaines et sociales.',
      confidentialite: 'Privacy policy',
      erreurCours: 'Choose at least one course.',
      erreurLangues: 'Choose at least one language.',
      erreurEnvoi: 'Sending failed. Check the fields and try again, or email us at contact@academie-shs.fr.',
      merciTitre: 'Thank you, you’re registered!',
      merciTexte: 'Your pre-registration has been recorded. You will be the first to receive dates and fees.',
    },
    faq: {
      pastille: 'FAQ',
      titre: 'Your questions',
      liste: [
        {
          q: 'How much do the courses cost?',
          r: 'Fees have not been set yet. Pre-registered students will hear about them first, before registration opens.',
        },
        { q: 'When do classes start?', r: 'The start date will be announced to pre-registered students as soon as it is set.' },
        {
          q: 'Am I committed by pre-registering?',
          r: 'No. It is free and non-binding: it helps us know which courses to open, in which language and at what times.',
        },
        {
          q: 'Do I need to speak Arabic?',
          r: 'No. Each course can be taught in French, Arabic or English depending on demand. The Arabic course is open to beginners.',
        },
        { q: 'How are classes run?', r: 'Online and live, with the teacher, based on the reference texts listed for each course.' },
        { q: 'What do I receive at the end of a course?', r: 'A certificate of attendance issued by the Academy.' },
      ],
    },
    pied: { association: 'The association', contact: 'Contact', mentionsLegales: 'Legal notice', confidentialite: 'Privacy policy' },
    barre: { finaliser: 'Complete' },
  },
};
