// Tous les textes de l'interface. Le programme, lui, est dans `src/data/cours.ts`.
//
// Depuis le 11/10/2026, le site n'est publié qu'en FRANÇAIS (cours en français seulement). Les
// textes arabes et anglais restent ici pour rouvrir ces langues plus tard, mais ne sont plus tenus à
// jour : les relire et les compléter avant de recréer `src/pages/ar/` et `src/pages/en/`.

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

/** Version de la politique de confidentialité, enregistrée dans Brevo avec chaque préinscription. */
export const VERSION_CONSENTEMENT = '2026-10-11';

export interface Option {
  valeur: string;
  libelle: string;
}

interface TitreTexte {
  titre: string;
  texte: string;
}

export interface Textes {
  meta: { titre: string; description: string };
  nav: { enligne: string; cursus: string; faq: string; cta: string; langue: string; principale: string };
  provisoire: string;
  hero: {
    pastille: string;
    titreDebut: string;
    titreAccent: string;
    titreFin: string;
    chapo: string;
    preuves: string[];
    cta: string;
    ctaSecondaire: string;
    photoTexte: string;
    photoAlt: string;
    photo2Alt: string;
    direct: string;
    directTexte: string;
    annees: string;
  };
  enligne: {
    surtitre: string;
    titre: string;
    intro: string;
    atouts: TitreTexte[];
    appareils: string;
    illustration: string;
    scenes: {
      classe: { direct: string; titre: string; tableau: string; sondage: string; question: string; oui: string; non: string; main: string };
      accueil: {
        bonjour: string;
        quand: string;
        cours: string;
        ouverture: string;
        rejoindre: string;
        semaine: string;
        jours: string[];
        lignes: string[];
        aRendre: string;
        mesCours: string;
        suivies: string;
      };
      replay: { titre: string; rattraper: string; liste: string; autres: string[] };
      espace: {
        cours: string;
        groupe: string;
        docs: string[];
        seance: string;
        rendu: string;
        vocal: string;
        prof: string;
        message: string;
        question: string;
      };
      notifications: [string, string][];
    };
  };
  programme: {
    surtitre: string;
    titreDebut: string;
    titreAccent: string;
    intro: string;
    annees: string;
    matieres: (n: number) => string;
    aVenir: string;
  };
  verset: string;
  objectifs: {
    surtitre: string;
    titre: string;
    liste: string[];
    certificat: string;
    certificatDetail: string;
    photoAlt: string;
  };
  etapes: { surtitre: string; titre: string; liste: TitreTexte[] };
  formulaire: {
    surtitre: string;
    titre: string;
    intro: string;
    cursusTitre: string;
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
    merciTexte: string;
  };
  faq: { surtitre: string; titre: string; liste: { q: string; r: string }[] };
  pied: { association: string; statut: string; contact: string; mentionsLegales: string; confidentialite: string };
}

export const TEXTES: Record<Langue, Textes> = {
  fr: {
    meta: {
      titre: 'Académie SHS — Études islamiques et sociales, cursus en trois ans',
      description:
        'Un cursus de trois ans en ligne et en direct, pour adultes : sciences islamiques classiques, sciences humaines et cadre institutionnel français. Préinscription gratuite et sans engagement.',
    },
    nav: {
      enligne: 'Cours en ligne',
      cursus: 'Le cursus',
      faq: 'Questions',
      cta: 'Se préinscrire',
      langue: 'Langue',
      principale: 'Navigation principale',
    },
    provisoire: 'Photo provisoire',
    hero: {
      pastille: 'Préinscriptions 2026-2027 ouvertes',
      titreDebut: 'Étudier les sciences islamiques, ',
      titreAccent: 'comprendre',
      titreFin: ' la France d’aujourd’hui.',
      chapo:
        'Un cursus de trois ans qui combine sciences religieuses, sciences humaines et connaissances du cadre institutionnel français. En ligne et en direct, pour adultes.',
      preuves: ['3 ans', 'En direct', 'Rediffusions', 'Pour adultes'],
      cta: 'Je me préinscris, c’est gratuit',
      ctaSecondaire: 'Voir le programme',
      photoTexte: 'Maîtriser la tradition, comprendre son temps.',
      photoAlt: 'Calligraphie arabe peinte sur un mur de pierre',
      photo2Alt: 'Une main prend des notes à côté d’une tasse',
      direct: 'En direct',
      directTexte: 'L’enseignant face à vous, chaque semaine',
      annees: 'années de cursus',
    },
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
      illustration: 'Illustration de l’espace de cours en ligne',
      scenes: {
        classe: {
          direct: 'En direct',
          titre: 'Uṣūl al-fiqh · séance 4',
          tableau: 'Les sources du droit',
          sondage: 'Sondage',
          question: 'Avez-vous compris la notion d’ijmāʿ ?',
          oui: 'Oui',
          non: 'Pas encore',
          main: 'Main levée',
        },
        accueil: {
          bonjour: 'Bonjour Sarah',
          quand: 'Prochain cours · ce soir, 20 h 30',
          cours: 'Introduction aux sciences du hadith',
          ouverture: 'La salle ouvre 15 min avant',
          rejoindre: 'Rejoindre la classe',
          semaine: 'Ma semaine',
          jours: ['Lun', 'Mer', 'Jeu', 'Sam'],
          lignes: ['Sciences du Coran', 'Sciences du hadith', 'Fiche de lecture', 'Fiqh des ʿibādāt'],
          aRendre: 'à rendre',
          mesCours: 'Mes cours',
          suivies: '8 séances suivies · 1 manquée',
        },
        replay: {
          titre: 'Sîra · séance 2',
          rattraper: 'À rattraper',
          liste: 'Séances du cours',
          autres: ['Sîra · séance 1', 'Coran · séance 3', 'Coran · séance 2'],
        },
        espace: {
          cours: 'Sciences du hadith',
          groupe: '1re année · 18 apprenants',
          docs: ['Al-Bayqūniyya, texte annoté', 'Les degrés du hadith', 'Récitation du poème'],
          seance: 'Séance',
          rendu: 'Devoir rendu : récitation des vers 1 à 10',
          vocal: 'Message vocal · envoyé mardi',
          prof: 'L’enseignant',
          message: 'Pour mercredi : relisez les vers 1 à 10, on les commente ensemble.',
          question: 'Poser une question',
        },
        notifications: [
          ['La classe est ouverte', 'Sciences du hadith'],
          ['Devoir corrigé', 'Récitation des vers 1 à 10'],
          ['Nouveau message sur le mur', 'Sciences du hadith'],
        ],
      },
    },
    programme: {
      surtitre: 'Le cursus',
      titreDebut: 'Études islamiques et sociales ',
      titreAccent: '(3 ans)',
      // Le paragraphe d'introduction du document de l'association, mot pour mot, sauf
      // « étudiants » → « apprenants » (l'association n'est pas déclarée au rectorat).
      intro:
        'L’objectif est de former des apprenants capables de maîtriser les sciences islamiques classiques, tout en comprenant les réalités sociales contemporaines et le contexte français et européen. Le programme combine donc sciences religieuses, sciences humaines et connaissances du cadre institutionnel français.',
      annees: 'Années du cursus',
      matieres: (n) => (n <= 1 ? `${n} matière` : `${n} matières`),
      aVenir: 'à venir',
    },
    verset: '« Et dis : Seigneur, accrois mon savoir. » (Coran 20:114)',
    objectifs: {
      surtitre: 'Objectifs généraux',
      titre: 'Ce que le cursus vous apporte',
      liste: [
        'Acquérir une formation solide en sciences islamiques traditionnelles.',
        'Comprendre les enjeux contemporains des sociétés européennes, notamment la société française.',
        'Développer une capacité d’analyse critique, historique et sociologique.',
        'Former des enseignants, cadres religieux et associatifs, chercheurs ou médiateurs culturels.',
      ],
      certificat: 'Certificat de l’Académie',
      certificatDetail: 'à l’issue du cursus',
      photoAlt: 'Des mains suivent les lignes d’un livre ouvert',
    },
    etapes: {
      surtitre: 'Comment ça marche',
      titre: 'Trois étapes jusqu’à la rentrée',
      liste: [
        { titre: 'Vous vous préinscrivez', texte: 'Deux minutes, gratuit et sans engagement.' },
        { titre: 'Vous êtes informé en priorité', texte: 'Dates, tarifs et modalités vous parviennent avant l’ouverture des inscriptions.' },
        { titre: 'Vous entrez en 1re année', texte: 'Cours en ligne et en direct, en français.' },
      ],
    },
    formulaire: {
      surtitre: 'Préinscription',
      titre: 'Entrez en première année.',
      intro: 'Deux minutes, aucun paiement. Les champs marqués d’un astérisque sont obligatoires.',
      cursusTitre: 'Études islamiques et sociales',
      cursusTexte: 'Cursus de trois ans · entrée en 1re année',
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
      niveau: 'Votre niveau en sciences islamiques',
      niveauOptions: [
        { valeur: 'debutant', libelle: 'Débutant' },
        { valeur: 'intermediaire', libelle: 'Intermédiaire' },
        { valeur: 'avance', libelle: 'Avancé' },
        { valeur: 'ne-sait-pas', libelle: 'Je ne sais pas' },
      ],
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
      erreurEnvoi:
        'L’envoi n’a pas abouti. Vérifiez les champs et réessayez, ou écrivez-nous à contact@academie-shs.fr.',
      merciTitre: 'Merci, c’est noté !',
      merciTexte: 'Votre préinscription est enregistrée. Vous recevrez les dates et les tarifs en priorité.',
    },
    faq: {
      surtitre: 'Questions',
      titre: 'Vos questions',
      liste: [
        {
          q: 'Combien coûte le cursus ?',
          r: 'Les tarifs ne sont pas encore fixés. Ils seront communiqués en priorité aux préinscrits, avant l’ouverture des inscriptions.',
        },
        { q: 'Quand commencent les cours ?', r: 'La date de rentrée sera annoncée aux préinscrits dès qu’elle sera arrêtée.' },
        {
          q: 'La préinscription m’engage-t-elle ?',
          r: 'Non. Elle est gratuite et sans engagement : elle nous aide à savoir à quels horaires ouvrir les classes.',
        },
        { q: 'Faut-il parler arabe ?', r: 'Non. Les cours sont donnés en français.' },
        {
          q: 'Et si je manque un cours ?',
          r: 'Chaque cours en direct est enregistré : vous le retrouvez en rediffusion, avec ses supports.',
        },
        { q: 'Que reçoit-on à la fin du cursus ?', r: 'Un certificat délivré par l’Académie.' },
      ],
    },
    pied: {
      association: 'L’association',
      statut: 'Association loi 1901',
      contact: 'Contact',
      mentionsLegales: 'Mentions légales',
      confidentialite: 'Politique de confidentialité',
    },
  },

  ar: {
    meta: {
      titre: 'الأكاديمية الفرنسية للعلوم الإنسانية والاجتماعية — الدراسات الإسلامية والاجتماعية في ثلاث سنوات',
      description:
        'برنامج دراسي من ثلاث سنوات، مباشر عبر الإنترنت وللكبار: العلوم الإسلامية الأصيلة، والعلوم الإنسانية، والإطار المؤسسي الفرنسي. بالعربية والفرنسية والإنجليزية. التسجيل المسبق مجاني ودون أيّ التزام.',
    },
    nav: {
      enligne: 'الدراسة عن بُعد',
      cursus: 'البرنامج',
      faq: 'أسئلة شائعة',
      cta: 'سجّل مسبقًا',
      langue: 'اللغة',
      principale: 'القائمة الرئيسية',
    },
    provisoire: 'صورة مؤقتة',
    hero: {
      pastille: 'التسجيل المسبق للموسم 2026-2027 مفتوح',
      titreDebut: 'ادرس العلوم الإسلامية، ',
      titreAccent: 'وافهم',
      titreFin: ' فرنسا اليوم.',
      chapo:
        'برنامج من ثلاث سنوات يجمع العلوم الإسلامية الأصيلة، والعلوم الإنسانية، ومعرفة الإطار المؤسسي الفرنسي. مباشر عبر الإنترنت، للكبار.',
      preuves: ['3 سنوات', 'دروس مباشرة', 'إعادة المشاهدة', 'العربية · Français · English'],
      cta: 'سجّل مسبقًا مجانًا',
      ctaSecondaire: 'اطّلع على البرنامج',
      photoTexte: 'إتقان التراث، وفهم العصر.',
      photoAlt: 'خطّ عربي مرسوم على جدار من الحجر',
      photo2Alt: 'يد تدوّن ملاحظات بجانب فنجان',
      direct: 'مباشر',
      directTexte: 'الأستاذ أمامك، كلّ أسبوع',
      annees: 'سنوات دراسية',
    },
    enligne: {
      surtitre: 'الدراسة عن بُعد',
      titre: 'فصل حقيقي، أينما كنت.',
      intro: 'أستاذ، ومجموعة، وموعد كلّ أسبوع. ومعه كلّ ما تحتاجه حتى لا يفوتك شيء.',
      atouts: [
        {
          titre: 'الفصل المباشر',
          texte: 'ترى الأستاذ، وترفع يدك، وتتفاعل وتجيب عن استطلاعاته، شفهيًا أو كتابةً.',
        },
        {
          titre: 'أسبوعك في لمحة',
          texte: 'الدرس القادم وزرّ للانضمام إليه، والحصص والواجبات القادمة، وحصصك التي حضرتها.',
        },
        {
          titre: 'إعادة المشاهدة',
          texte: 'يُشار إلى الدرس الذي فاتك بعبارة «للاستدراك». شاهده بالسرعة التي تناسبك، مع مرفقاته.',
        },
        {
          titre: 'المرفقات والواجبات وحياة الفصل',
          texte: 'وثائق كلّ حصة، وواجبات تُسلَّم صورةً أو ملفًا أو رسالة صوتية، وجدار للتواصل مع المجموعة.',
        },
      ],
      appareils: 'على الحاسوب أو اللوحة أو الهاتف.',
      illustration: 'رسم توضيحي لفضاء الدراسة عن بُعد',
      scenes: {
        classe: {
          direct: 'مباشر',
          titre: 'أصول الفقه · الحصة 4',
          tableau: 'مصادر التشريع',
          sondage: 'استطلاع',
          question: 'هل فهمت معنى الإجماع؟',
          oui: 'نعم',
          non: 'ليس بعد',
          main: 'يد مرفوعة',
        },
        accueil: {
          bonjour: 'مرحبًا سارة',
          quand: 'الدرس القادم · هذا المساء، 20:30',
          cours: 'مدخل إلى علوم الحديث',
          ouverture: 'يُفتح الفصل قبل 15 دقيقة',
          rejoindre: 'انضمّ إلى الفصل',
          semaine: 'أسبوعي',
          jours: ['الإثنين', 'الأربعاء', 'الخميس', 'السبت'],
          lignes: ['علوم القرآن', 'علوم الحديث', 'بطاقة قراءة', 'فقه العبادات'],
          aRendre: 'للتسليم',
          mesCours: 'موادي',
          suivies: '8 حصص حضرتها · 1 فائتة',
        },
        replay: {
          titre: 'السيرة · الحصة 2',
          rattraper: 'للاستدراك',
          liste: 'حصص المادة',
          autres: ['السيرة · الحصة 1', 'القرآن · الحصة 3', 'القرآن · الحصة 2'],
        },
        espace: {
          cours: 'علوم الحديث',
          groupe: 'السنة الأولى · 18 طالبًا',
          docs: ['المنظومة البيقونية، نصّ مشروح', 'مراتب الحديث', 'إنشاد المنظومة'],
          seance: 'الحصة',
          rendu: 'واجب مُسلَّم: إنشاد الأبيات 1 إلى 10',
          vocal: 'رسالة صوتية · أُرسلت يوم الثلاثاء',
          prof: 'الأستاذ',
          message: 'ليوم الأربعاء: راجعوا الأبيات 1 إلى 10، وسنشرحها معًا.',
          question: 'اطرح سؤالًا',
        },
        notifications: [
          ['الفصل مفتوح الآن', 'علوم الحديث'],
          ['تمّ تصحيح الواجب', 'إنشاد الأبيات 1 إلى 10'],
          ['رسالة جديدة على الجدار', 'علوم الحديث'],
        ],
      },
    },
    programme: {
      surtitre: 'البرنامج',
      titreDebut: 'ثلاث سنوات، ',
      titreAccent: 'مادةً بعد مادة.',
      intro: 'كلّ سنة تُبنى على التي قبلها. اختر سنة لترى موادها.',
      annees: 'سنوات البرنامج',
      matieres: (n) => (n === 1 ? 'مادة واحدة' : n === 2 ? 'مادتان' : n <= 10 ? `${n} مواد` : `${n} مادة`),
      aVenir: 'قريبًا',
    },
    verset: '﴿وَقُل رَّبِّ زِدْنِي عِلْمًا﴾ (طه: 114)',
    objectifs: {
      surtitre: 'ما يقدّمه لك البرنامج',
      titre: 'ما يقدّمه لك البرنامج',
      liste: [
        'اكتساب تكوين متين في العلوم الإسلامية الأصيلة.',
        'فهم القضايا المعاصرة للمجتمعات الأوروبية، ولا سيما المجتمع الفرنسي.',
        'تنمية القدرة على التحليل النقدي والتاريخي والاجتماعي.',
        'تكوين مدرّسين وأطر دينية وجمعوية وباحثين ووسطاء ثقافيين.',
      ],
      certificat: 'شهادة الأكاديمية',
      certificatDetail: 'في نهاية البرنامج',
      photoAlt: 'يدان تتتبّعان أسطر كتاب مفتوح',
    },
    etapes: {
      surtitre: 'كيف يتمّ التسجيل',
      titre: 'ثلاث خطوات حتى الدخول الدراسي',
      liste: [
        { titre: 'تسجّل مسبقًا', texte: 'دقيقتان، مجانًا ودون أيّ التزام.' },
        { titre: 'تصلك المعلومات قبل غيرك', texte: 'المواعيد والرسوم والتفاصيل تصلك قبل فتح التسجيل.' },
        { titre: 'تلتحق بالسنة الأولى', texte: 'دروس مباشرة عبر الإنترنت، باللغة التي تختارها.' },
      ],
    },
    formulaire: {
      surtitre: 'التسجيل المسبق',
      titre: 'التحق بالسنة الأولى.',
      intro: 'دقيقتان، دون أيّ دفع. الحقول المشار إليها بنجمة إلزامية.',
      cursusTitre: 'الدراسات الإسلامية والاجتماعية',
      cursusTexte: 'برنامج من ثلاث سنوات · الالتحاق بالسنة الأولى',
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
      niveau: 'مستواك في العلوم الإسلامية',
      niveauOptions: [
        { valeur: 'debutant', libelle: 'مبتدئ' },
        { valeur: 'intermediaire', libelle: 'متوسط' },
        { valeur: 'avance', libelle: 'متقدّم' },
        { valeur: 'ne-sait-pas', libelle: 'لا أعرف' },
      ],
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
      erreurEnvoi: 'تعذّر إرسال التسجيل. تحقّق من الحقول وأعد المحاولة، أو راسلنا على contact@academie-shs.fr.',
      merciTitre: 'شكرًا، تمّ تسجيلك!',
      merciTexte: 'سجّلنا تسجيلك المسبق، وستصلك المواعيد والرسوم قبل غيرك.',
    },
    faq: {
      surtitre: 'أسئلة شائعة',
      titre: 'أسئلتكم',
      liste: [
        { q: 'كم يكلّف البرنامج؟', r: 'لم تُحدَّد الرسوم بعد، وستُبلَّغ أوّلًا للمسجَّلين مسبقًا قبل فتح التسجيل.' },
        { q: 'متى تبدأ الدروس؟', r: 'سيُعلَن موعد بدء الدراسة للمسجَّلين مسبقًا فور تحديده.' },
        {
          q: 'هل يُلزمني التسجيل المسبق بشيء؟',
          r: 'لا. هو مجاني ودون أيّ التزام، ويساعدنا على معرفة اللغة والأوقات التي نفتح بها الفصول.',
        },
        { q: 'هل يجب أن أتقن العربية؟', r: 'لا. يمكن متابعة البرنامج بالعربية أو الفرنسية أو الإنجليزية حسب الطلب.' },
        { q: 'وإن فاتني درس؟', r: 'كلّ درس مباشر مسجَّل، فتجده في إعادة المشاهدة مع مرفقاته.' },
        { q: 'ماذا أحصل عليه في نهاية البرنامج؟', r: 'شهادة تمنحها الأكاديمية.' },
      ],
    },
    pied: {
      association: 'الجمعية',
      statut: 'جمعية خاضعة لقانون 1901',
      contact: 'للتواصل',
      mentionsLegales: 'البيانات القانونية',
      confidentialite: 'سياسة الخصوصية',
    },
  },

  en: {
    meta: {
      titre: 'Académie SHS — Islamic and Social Studies, a three-year programme',
      description:
        'A three-year programme, live and online, for adults: classical Islamic sciences, the humanities and the French institutional context. In English, French and Arabic. Free, non-binding pre-registration.',
    },
    nav: {
      enligne: 'Online classes',
      cursus: 'Programme',
      faq: 'FAQ',
      cta: 'Pre-register',
      langue: 'Language',
      principale: 'Main navigation',
    },
    provisoire: 'Placeholder photo',
    hero: {
      pastille: 'Pre-registration for 2026–27 is open',
      titreDebut: 'Study the Islamic sciences, ',
      titreAccent: 'understand',
      titreFin: ' France and Europe today.',
      chapo:
        'A three-year programme bringing together the classical Islamic sciences, the humanities and an understanding of French institutions. Live and online, for adults.',
      preuves: ['3 years', 'Live classes', 'Replays', 'English · Français · العربية'],
      cta: 'Pre-register for free',
      ctaSecondaire: 'See the programme',
      photoTexte: 'Master the tradition, understand your time.',
      photoAlt: 'Arabic calligraphy painted on a stone wall',
      photo2Alt: 'A hand taking notes next to a cup',
      direct: 'Live',
      directTexte: 'Your teacher in front of you, every week',
      annees: 'years of study',
    },
    enligne: {
      surtitre: 'Online classes',
      titre: 'A real class, wherever you are.',
      intro: 'One teacher, one group, one appointment every week. And everything around it so you never miss a thing.',
      atouts: [
        {
          titre: 'Live classes',
          texte: 'You see the teacher, raise your hand, react and answer polls, speaking or in writing.',
        },
        {
          titre: 'Your week at a glance',
          texte: 'Your next class with a button to join it, upcoming sessions and homework, and the sessions you have attended.',
        },
        {
          titre: 'Replays',
          texte: 'A missed class is flagged “to catch up”. Watch it at your own pace, faster if you like, with its materials.',
        },
        {
          titre: 'Materials, homework and class life',
          texte: 'The documents for each session, homework handed in as a photo, a file or a voice message, and a wall to talk with the group.',
        },
      ],
      appareils: 'On a computer, tablet or phone.',
      illustration: 'Illustration of the online learning space',
      scenes: {
        classe: {
          direct: 'Live',
          titre: 'Uṣūl al-fiqh · session 4',
          tableau: 'The sources of law',
          sondage: 'Poll',
          question: 'Have you understood ijmāʿ?',
          oui: 'Yes',
          non: 'Not yet',
          main: 'Hand raised',
        },
        accueil: {
          bonjour: 'Hello Sarah',
          quand: 'Next class · tonight, 8:30 pm',
          cours: 'Introduction to the Hadith Sciences',
          ouverture: 'The room opens 15 min before',
          rejoindre: 'Join the class',
          semaine: 'My week',
          jours: ['Mon', 'Wed', 'Thu', 'Sat'],
          lignes: ['Qur’anic sciences', 'Hadith sciences', 'Reading notes', 'Fiqh of ʿibādāt'],
          aRendre: 'due',
          mesCours: 'My courses',
          suivies: '8 sessions attended · 1 missed',
        },
        replay: {
          titre: 'Sīra · session 2',
          rattraper: 'To catch up',
          liste: 'Course sessions',
          autres: ['Sīra · session 1', 'Qur’an · session 3', 'Qur’an · session 2'],
        },
        espace: {
          cours: 'Hadith sciences',
          groupe: 'First year · 18 learners',
          docs: ['Al-Bayqūniyya, annotated text', 'The grades of hadith', 'Recitation of the poem'],
          seance: 'Session',
          rendu: 'Homework handed in: lines 1 to 10',
          vocal: 'Voice message · sent Tuesday',
          prof: 'The teacher',
          message: 'For Wednesday: reread lines 1 to 10, we will go through them together.',
          question: 'Ask a question',
        },
        notifications: [
          ['The class is open', 'Hadith sciences'],
          ['Homework marked', 'Lines 1 to 10'],
          ['New post on the wall', 'Hadith sciences'],
        ],
      },
    },
    programme: {
      surtitre: 'Programme',
      titreDebut: 'Three years, ',
      titreAccent: 'one subject at a time.',
      intro: 'Each year builds on the one before. Choose a year to see its subjects.',
      annees: 'Programme years',
      matieres: (n) => (n === 1 ? '1 subject' : `${n} subjects`),
      aVenir: 'coming soon',
    },
    verset: '“And say: My Lord, increase me in knowledge.” (Qur’an 20:114)',
    objectifs: {
      surtitre: 'What the programme gives you',
      titre: 'What the programme gives you',
      liste: [
        'Acquire a solid grounding in the traditional Islamic sciences.',
        'Understand the contemporary issues facing European societies, especially French society.',
        'Develop a capacity for critical, historical and sociological analysis.',
        'Train teachers, religious and community leaders, researchers or cultural mediators.',
      ],
      certificat: 'Academy certificate',
      certificatDetail: 'at the end of the programme',
      photoAlt: 'Hands following the lines of an open book',
    },
    etapes: {
      surtitre: 'How it works',
      titre: 'Three steps to the start of term',
      liste: [
        { titre: 'You pre-register', texte: 'Two minutes, free and non-binding.' },
        { titre: 'You hear first', texte: 'Dates, fees and practical details reach you before registration opens.' },
        { titre: 'You start the first year', texte: 'Live online classes, in the language of your choice.' },
      ],
    },
    formulaire: {
      surtitre: 'Pre-registration',
      titre: 'Join the first year.',
      intro: 'Two minutes, no payment. Fields marked with an asterisk are required.',
      cursusTitre: 'Islamic and Social Studies',
      cursusTexte: 'Three-year programme · first-year entry',
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
      niveau: 'Your level in Islamic studies',
      niveauOptions: [
        { valeur: 'debutant', libelle: 'Beginner' },
        { valeur: 'intermediaire', libelle: 'Intermediate' },
        { valeur: 'avance', libelle: 'Advanced' },
        { valeur: 'ne-sait-pas', libelle: 'Not sure' },
      ],
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
      erreurEnvoi: 'Sending failed. Check the fields and try again, or email us at contact@academie-shs.fr.',
      merciTitre: 'Thank you, you’re registered!',
      merciTexte: 'Your pre-registration has been recorded. You will be the first to receive dates and fees.',
    },
    faq: {
      surtitre: 'FAQ',
      titre: 'Your questions',
      liste: [
        {
          q: 'How much does the programme cost?',
          r: 'Fees have not been set yet. Pre-registered students will hear about them first, before registration opens.',
        },
        { q: 'When do classes start?', r: 'The start date will be announced to pre-registered students as soon as it is set.' },
        {
          q: 'Am I committed by pre-registering?',
          r: 'No. It is free and non-binding: it helps us decide in which language and at what times to open classes.',
        },
        { q: 'Do I need to speak Arabic?', r: 'No. The programme can be followed in English, French or Arabic, depending on demand.' },
        { q: 'What if I miss a class?', r: 'Every live class is recorded: you can watch the replay, with its materials.' },
        { q: 'What do I receive at the end?', r: 'A certificate issued by the Academy.' },
      ],
    },
    pied: {
      association: 'The association',
      statut: 'Non-profit association (French law of 1901)',
      contact: 'Contact',
      mentionsLegales: 'Legal notice',
      confidentialite: 'Privacy policy',
    },
  },
};
