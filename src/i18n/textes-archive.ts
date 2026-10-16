// ARCHIVE — les textes arabes et anglais du site, tels qu'ils étaient le 11/10/2026.
//
// Le site n'est publié qu'en français depuis le 11/10/2026, et la page a été refaite le 16/10/2026
// (maquette v3 : rentrée, heures, prix). Ces textes suivent donc l'ANCIENNE structure de la page :
// rien ne les importe. Pour rouvrir l'arabe ou l'anglais, partir de la structure de `textes.ts`,
// y reprendre ce qui sert encore ici, et faire relire les traductions.

export interface Option {
  valeur: string;
  libelle: string;
}

interface TitreTexte {
  titre: string;
  texte: string;
}

export interface TextesArchive {
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

export const TEXTES_ARCHIVE: Record<'ar' | 'en', TextesArchive> = {
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
