// Le catalogue : la SEULE source des cours, lue par les trois pages ET par la fonction qui
// relaie le formulaire vers Brevo. Pour ajouter, retirer ou renommer un cours, c'est ici.
//
// ⚠️ L'`id` est le code envoyé dans l'attribut Brevo `MODULES` : ne jamais le changer pour un
// cours qui a déjà reçu des préinscriptions, sinon les segments Brevo ne le retrouvent plus.
// Un `id` ne doit pas non plus en contenir un autre (`fiqh` / `fiqh2`) : les segments Brevo
// filtrent par « contient ».

export type Langue = 'fr' | 'ar' | 'en';
export type Traduit = Record<Langue, string>;
export type CodePole = 'A' | 'B' | 'C';

export interface Pole {
  code: CodePole;
  couleur: string;
  degrade: string;
  nom: Traduit;
}

export interface Cours {
  id: string;
  pole: CodePole;
  /** Mot arabe affiché en filigrane sur la carte. */
  mot: string;
  /** Libellé court : pastilles du formulaire, barre de sélection. */
  court: Traduit;
  titre: Traduit;
  niveau: Traduit;
  description: Traduit;
  reference: Traduit;
}

export const POLES: Record<CodePole, Pole> = {
  A: {
    code: 'A',
    couleur: '#059669',
    degrade: 'linear-gradient(135deg, #064E3B 0%, #059669 100%)',
    nom: { fr: 'Sciences islamiques', ar: 'العلوم الإسلامية', en: 'Islamic Sciences' },
  },
  B: {
    code: 'B',
    couleur: '#7C3AED',
    degrade: 'linear-gradient(135deg, #3B0F7A 0%, #7C3AED 100%)',
    nom: { fr: 'Théologie et philosophie', ar: 'الإلهيات والفلسفة', en: 'Theology and Philosophy' },
  },
  C: {
    code: 'C',
    couleur: '#EA580C',
    degrade: 'linear-gradient(135deg, #8A2C0B 0%, #EA580C 100%)',
    nom: {
      fr: 'Sciences humaines et sociales',
      ar: 'العلوم الإنسانية والاجتماعية',
      en: 'Humanities and Social Sciences',
    },
  },
};

const DEBUTANT: Traduit = { fr: 'Débutant', ar: 'مبتدئ', en: 'Beginner' };
const INTERMEDIAIRE: Traduit = { fr: 'Intermédiaire', ar: 'متوسط', en: 'Intermediate' };
const TOUS_NIVEAUX: Traduit = { fr: 'Tous niveaux', ar: 'لجميع المستويات', en: 'All levels' };

export const COURS: Cours[] = [
  {
    id: 'fiqh',
    pole: 'A',
    mot: 'فقه',
    court: { fr: 'Fiqh malikite', ar: 'الفقه المالكي', en: 'Maliki law' },
    titre: {
      fr: 'Fiqh malikite (niveaux I et II)',
      ar: 'الفقه المالكي (المستويان الأول والثاني)',
      en: 'Maliki Jurisprudence (Levels I and II)',
    },
    niveau: { fr: 'Débutant → intermédiaire', ar: 'مبتدئ ← متوسط', en: 'Beginner → intermediate' },
    description: {
      fr: 'La purification et la prière, puis le jeûne, la zakât et le pèlerinage, selon l’école de l’imam Mâlik.',
      ar: 'الطهارة والصلاة، ثم الصيام والزكاة والحج، على مذهب الإمام مالك.',
      en: 'Purification and prayer, then fasting, zakat and pilgrimage, according to the school of Imam Malik.',
    },
    reference: {
      fr: 'Matn al-Akhḍarī ; al-Murshid al-Muʿīn (Ibn ʿĀshir)',
      ar: 'متن الأخضري · المرشد المعين لابن عاشر',
      en: 'Matn al-Akhḍarī; al-Murshid al-Muʿīn (Ibn ʿĀshir)',
    },
  },
  {
    id: 'sira',
    pole: 'A',
    mot: 'سيرة',
    court: { fr: 'Sîra', ar: 'السيرة', en: 'Sīra' },
    titre: { fr: 'Sîra prophétique', ar: 'السيرة النبوية', en: 'The Life of the Prophet (Sīra)' },
    niveau: TOUS_NIVEAUX,
    description: {
      fr: 'La vie du Prophète ﷺ, de La Mecque à Médine, et les leçons qu’on en tire aujourd’hui.',
      ar: 'حياة النبي ﷺ من مكة إلى المدينة، والعبر المستفادة منها اليوم.',
      en: 'The life of the Prophet ﷺ, from Mecca to Medina, and the lessons it holds today.',
    },
    reference: {
      fr: 'Sīrat Ibn Hishām ; Fiqh as-Sīra (al-Būṭī)',
      ar: 'سيرة ابن هشام · فقه السيرة للبوطي',
      en: 'Sīrat Ibn Hishām; Fiqh as-Sīra (al-Būṭī)',
    },
  },
  {
    id: 'aqida',
    pole: 'A',
    mot: 'عقيدة',
    court: { fr: 'ʿAqîda', ar: 'العقيدة', en: 'ʿAqīda' },
    titre: {
      fr: 'Théologie islamique (ʿaqîda) : les fondements',
      ar: 'مبادئ علم العقيدة',
      en: 'Islamic Theology (ʿAqīda): Foundations',
    },
    niveau: DEBUTANT,
    description: {
      fr: 'Ce qu’il faut croire au sujet de Dieu et des prophètes, expliqué pas à pas.',
      ar: 'ما يجب اعتقاده في حقّ الله تعالى وفي حقّ الأنبياء، خطوة بخطوة.',
      en: 'What Muslims believe about God and the prophets, explained step by step.',
    },
    reference: {
      fr: 'Umm al-Barāhīn (as-Sanūsī)',
      ar: 'أمّ البراهين للسنوسي',
      en: 'Umm al-Barāhīn (as-Sanūsī)',
    },
  },
  {
    id: 'coran',
    pole: 'A',
    mot: 'قرآن',
    court: { fr: 'Sciences du Coran', ar: 'علوم القرآن', en: 'Qur’anic sciences' },
    titre: { fr: 'Sciences du Coran', ar: 'علوم القرآن', en: 'Qur’anic Sciences' },
    niveau: INTERMEDIAIRE,
    description: {
      fr: 'La révélation, la compilation, les causes de la révélation et les grandes méthodes d’exégèse.',
      ar: 'الوحي والجمع وأسباب النزول ومناهج التفسير الكبرى.',
      en: 'Revelation, compilation, occasions of revelation and the major methods of exegesis.',
    },
    reference: {
      fr: 'Al-Itqān (as-Suyūṭī), version simplifiée',
      ar: 'الإتقان للسيوطي، بصيغة ميسّرة',
      en: 'Al-Itqān (as-Suyūṭī), simplified',
    },
  },
  {
    id: 'hadith',
    pole: 'A',
    mot: 'حديث',
    court: { fr: 'Hadith', ar: 'الحديث', en: 'Hadith' },
    titre: { fr: 'Le hadith et sa terminologie', ar: 'الحديث ومصطلحه', en: 'Hadith and Its Terminology' },
    niveau: INTERMEDIAIRE,
    description: {
      fr: 'Les quarante hadiths de l’imam an-Nawawî commentés, et les bases de la critique du hadith.',
      ar: 'شرح الأربعين النووية، ومبادئ علم مصطلح الحديث.',
      en: 'Imam an-Nawawī’s Forty Hadith with commentary, and the basics of hadith criticism.',
    },
    reference: {
      fr: 'Al-Arbaʿūn (an-Nawawī) ; al-Bayqūniyya',
      ar: 'الأربعون النووية · المنظومة البيقونية',
      en: 'Al-Arbaʿūn (an-Nawawī); al-Bayqūniyya',
    },
  },
  {
    id: 'tajwid',
    pole: 'A',
    mot: 'تجويد',
    court: { fr: 'Tajwîd', ar: 'التجويد', en: 'Tajwīd' },
    titre: {
      fr: 'Tajwîd : la récitation du Coran',
      ar: 'التجويد برواية ورش أو حفص',
      en: 'Tajwīd: Qur’anic Recitation',
    },
    niveau: TOUS_NIVEAUX,
    description: {
      fr: 'Les règles de la récitation, avec correction en direct par l’enseignant.',
      ar: 'أحكام التلاوة، مع تصحيح مباشر من الأستاذ.',
      en: 'The rules of recitation, with live correction by the teacher.',
    },
    reference: {
      fr: 'Tuḥfat al-Aṭfāl ; ad-Durar al-Lawāmiʿ (Ibn Barrī)',
      ar: 'تحفة الأطفال · الدرر اللوامع لابن برّي',
      en: 'Tuḥfat al-Aṭfāl; ad-Durar al-Lawāmiʿ (Ibn Barrī)',
    },
  },
  {
    id: 'arabe',
    pole: 'A',
    mot: 'نحو',
    court: { fr: 'Arabe', ar: 'العربية', en: 'Arabic' },
    titre: {
      fr: 'L’arabe des sciences islamiques',
      ar: 'العربية لطلبة العلوم الشرعية',
      en: 'Arabic for Islamic Studies',
    },
    niveau: DEBUTANT,
    description: {
      fr: 'La grammaire de base pour lire les textes étudiés dans les autres cours.',
      ar: 'قواعد النحو الأساسية لقراءة المتون المدروسة في باقي المواد.',
      en: 'Core grammar to read the texts studied in the other courses.',
    },
    reference: {
      fr: 'Al-Ājurrūmiyya (Ibn Ājurrūm)',
      ar: 'الآجرّومية لابن آجرّوم',
      en: 'Al-Ājurrūmiyya (Ibn Ājurrūm)',
    },
  },
  {
    id: 'comparee',
    pole: 'B',
    mot: 'أديان',
    court: { fr: 'Théologie comparée', ar: 'مقارنة الأديان', en: 'Comparative theology' },
    titre: {
      fr: 'Théologie comparée des monothéismes',
      ar: 'مقارنة الأديان التوحيدية',
      en: 'Comparative Theology of the Monotheisms',
    },
    niveau: TOUS_NIVEAUX,
    description: {
      fr: 'Dieu, la révélation et la prophétie dans le judaïsme, le christianisme et l’islam.',
      ar: 'الله والوحي والنبوّة في اليهودية والمسيحية والإسلام.',
      en: 'God, revelation and prophecy in Judaism, Christianity and Islam.',
    },
    reference: {
      fr: 'Textes choisis des trois traditions',
      ar: 'نصوص مختارة من التقاليد الثلاثة',
      en: 'Selected texts from the three traditions',
    },
  },
  {
    id: 'philo',
    pole: 'B',
    mot: 'حكمة',
    court: { fr: 'Philosophie', ar: 'الفلسفة', en: 'Philosophy' },
    titre: {
      fr: 'La philosophie en terre d’islam',
      ar: 'الفلسفة في الحضارة الإسلامية',
      en: 'Philosophy in the Islamic World',
    },
    niveau: INTERMEDIAIRE,
    description: {
      fr: 'D’al-Fârâbî à Averroès : la raison en terre d’islam et son héritage en Europe.',
      ar: 'من الفارابي إلى ابن رشد: العقل في الحضارة الإسلامية وأثره في أوروبا.',
      en: 'From al-Fārābī to Averroes: reason in the Islamic world and its legacy in Europe.',
    },
    reference: {
      fr: 'Al-Fārābī, Avicenne, al-Ghazālī, Averroès (extraits)',
      ar: 'الفارابي، ابن سينا، الغزالي، ابن رشد (نصوص مختارة)',
      en: 'Al-Fārābī, Avicenna, al-Ghazālī, Averroes (extracts)',
    },
  },
  {
    id: 'khaldun',
    pole: 'C',
    mot: 'مقدمة',
    court: { fr: 'Ibn Khaldûn', ar: 'ابن خلدون', en: 'Ibn Khaldun' },
    titre: {
      fr: 'Ibn Khaldûn et la naissance des sciences sociales',
      ar: 'ابن خلدون ونشأة العلوم الاجتماعية',
      en: 'Ibn Khaldun and the Birth of Social Science',
    },
    niveau: INTERMEDIAIRE,
    description: {
      fr: 'La Muqaddima, premier grand traité sur les sociétés humaines.',
      ar: 'المقدّمة، أوّل مؤلَّف كبير في دراسة العمران البشري.',
      en: 'The Muqaddima, the first major treatise on human societies.',
    },
    reference: {
      fr: 'Al-Muqaddima (Ibn Khaldūn)',
      ar: 'مقدّمة ابن خلدون',
      en: 'Al-Muqaddima (Ibn Khaldūn)',
    },
  },
  {
    id: 'histoire',
    pole: 'C',
    mot: 'حضارة',
    court: { fr: 'Histoire et civilisation', ar: 'التاريخ', en: 'History' },
    titre: {
      fr: 'Histoire et civilisation de l’islam',
      ar: 'تاريخ الحضارة الإسلامية',
      en: 'History and Civilisation of Islam',
    },
    niveau: TOUS_NIVEAUX,
    description: {
      fr: 'Des premiers califats à al-Andalus et au Maghreb : quatorze siècles d’histoire.',
      ar: 'من الخلافة الأولى إلى الأندلس والمغرب: أربعة عشر قرنًا من التاريخ.',
      en: 'From the early caliphates to al-Andalus and the Maghreb: fourteen centuries of history.',
    },
    reference: {
      fr: 'Sources historiques et travaux universitaires',
      ar: 'مصادر تاريخية ودراسات جامعية',
      en: 'Historical sources and academic studies',
    },
  },
  {
    id: 'socio',
    pole: 'C',
    mot: 'مجتمع',
    court: { fr: 'Sociologie des religions', ar: 'علم اجتماع الأديان', en: 'Sociology of religion' },
    titre: { fr: 'Sociologie des religions', ar: 'علم اجتماع الأديان', en: 'Sociology of Religion' },
    niveau: TOUS_NIVEAUX,
    description: {
      fr: 'Durkheim, Weber et la place du religieux dans les sociétés modernes.',
      ar: 'دوركايم وفيبر ومكانة الدين في المجتمعات الحديثة.',
      en: 'Durkheim, Weber and the place of religion in modern societies.',
    },
    reference: {
      fr: 'Durkheim, Weber et la sociologie contemporaine',
      ar: 'دوركايم، فيبر، علم الاجتماع المعاصر',
      en: 'Durkheim, Weber and contemporary sociology',
    },
  },
  {
    id: 'europe',
    pole: 'C',
    mot: 'أوروبا',
    court: { fr: 'Religion et société', ar: 'الدين والمجتمع', en: 'Religion and society' },
    titre: {
      fr: 'Religion et société en France et en Europe',
      ar: 'الدين والمجتمع في فرنسا وأوروبا',
      en: 'Religion and Society in France and Europe',
    },
    niveau: TOUS_NIVEAUX,
    description: {
      fr: 'Présence musulmane, laïcité et droit des cultes en France et en Europe.',
      ar: 'الحضور الإسلامي، والعلمانية، وقانون العبادات في فرنسا وأوروبا.',
      en: 'Muslim presence, secularism (laïcité) and religious law in France and Europe.',
    },
    reference: {
      fr: 'Loi de 1905, droit des associations, travaux d’historiens',
      ar: 'قانون 1905، قانون الجمعيات، دراسات المؤرخين',
      en: 'The 1905 law, French association law, historians’ work',
    },
  },
];

export const CODES_COURS: ReadonlySet<string> = new Set(COURS.map((c) => c.id));
