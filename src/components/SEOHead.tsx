'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';

/**
 * SEOHead — dynamically updates document <title> and meta tags.
 *
 * Updates:
 *   - <title> (the most important SEO element)
 *   - <meta name="description">
 *   - <meta name="keywords">
 *   - <link rel="canonical">
 *   - <link rel="alternate" hreflang="...">
 *   - Open Graph tags (for social sharing)
 *   - Twitter Card tags
 *
 * Per-locale and per-investigation targeting.
 */

const BASE_URL = 'https://behstory.netlify.app';

const SEO_DATA: Record<string, {
  title: string;
  titleFr: string;
  titleDe: string;
  titleAr: string;
  desc: string;
  descFr: string;
  descDe: string;
  descAr: string;
  keywords: string;
}> = {
  home: {
    title: 'The True History of Science — Who Really Discovered Gravity, Optics, Calculus & More',
    titleFr: "La véritable histoire des sciences — Qui a vraiment découvert la gravité, l'optique, le calcul et plus",
    titleDe: 'Die wahre Geschichte der Wissenschaft — Wer wirklich Schwerkraft, Optik, Analysis und mehr entdeckte',
    titleAr: 'التاريخ الحقيقي للعلم — من اكتشف حقًّا الجاذبية والبصريات والتفاضل والتكامل والمزيد',
    desc: "9 investigations revealing who really discovered gravity, optics, the scientific method, calculus, astronomy, navigation, universities, medicine, and algorithms. Real manuscripts. Real theorems. Documented colonial transmission.",
    descFr: "9 enquêtes révélant qui a vraiment découvert la gravité, l'optique, la méthode scientifique, le calcul, l'astronomie, la navigation, les universités, la médecine et les algorithmes. Manuscrits réels. Théorèmes réels.",
    descDe: "9 Untersuchungen, die aufdecken, wer wirklich Schwerkraft, Optik, wissenschaftliche Methode, Analysis, Astronomie, Navigation, Universitäten, Medizin und Algorithmen entdeckte. Echte Manuskripte. Echte Theoreme.",
    descAr: "٩ تحقيقات تكشف من اكتشف حقًّا الجاذبية والبصريات والمنهج العلمي والتفاضل والتكامل وعلم الفلك والملاحة والجامعات والطب والخوارزميات. مخطوطات حقيقية. نظريات حقيقية.",
    keywords: 'who discovered gravity, Ibn al-Haytham, al-Khwārizmī, algorithm etymology, history of science, Islamic Golden Age, scientific discovery attribution, al-Khāzini, al-Rāzī, Ibn Sīnā, Fatima al-Fihri, calculus history, optics history, scientific method origin',
  },
  gravity: {
    title: 'Who Really Discovered Gravity? Al-Khāzini (1121 CE) — 566 Years Before Newton',
    titleFr: "Qui a vraiment découvert la gravité ? Al-Khāzini (1121) — 566 ans avant Newton",
    titleDe: 'Wer entdeckte wirklich die Schwerkraft? Al-Khāzini (1121) — 566 Jahre vor Newton',
    titleAr: 'من اكتشف الجاذبية حقًّا؟ الخازني (١١٢١ م) — قبل نيوتن بـ٥٦٦ عامًا',
    desc: "Al-Khāzini proved gravity is a variable force directed toward Earth's center in 1121 CE — 566 years before Newton's Principia. Real manuscript evidence, hydrostatic balance proofs, documented transmission to Europe.",
    descFr: "Al-Khāzini a prouvé que la gravité est une force variable dirigée vers le centre de la Terre en 1121 — 566 ans avant Newton. Preuves par manuscrits réels, balances hydrostatiques, transmission documentée.",
    descDe: "Al-Khāzini bewies 1121, dass Schwerkraft eine variable, zum Erdmittelpunkt gerichtete Kraft ist — 566 Jahre vor Newton. Echte Manuskriptbeweise, hydrostatische Waagen, dokumentierte Übertragung.",
    descAr: "الخازني أثبت أن الجاذبية قوة متغيرة موجَّهة نحو مركز الأرض عام ١١٢١ م — قبل نيوتن بـ٥٦٦ عامًا. أدلة مخطوطات حقيقية، براهين الموازين الهيدروستاتيكية، نقل موثق.",
    keywords: 'who discovered gravity, al-Khāzini, Mīzān al-ḥikma, Newton gravity myth, history of gravitational theory, al-Bīrūnī, Islamic science, hydrostatic balance, weight varies with distance',
  },
  optics: {
    title: 'Who Really Discovered Optics & Photography? Ibn al-Haytham (1011 CE)',
    titleFr: "Qui a vraiment découvert l'optique et la photographie ? Ibn al-Haytham (1011)",
    titleDe: 'Wer entdeckte wirklich Optik und Fotografie? Ibn al-Haytham (1011)',
    titleAr: 'من اكتشف البصريات والتصوير حقًّا؟ ابن الهيثم (١٠١١ م)',
    desc: "Ibn al-Haytham proved the laws of reflection, refraction, and the camera obscura in 1011 CE — 637 years before Snell, 815 years before photography. Ibn Sahl discovered the sine law of refraction in 984 CE.",
    descFr: "Ibn al-Haytham a prouvé les lois de la réflexion, réfraction et la camera obscura en 1011 — 637 ans avant Snell. Ibn Sahl a découvert la loi des sinus de la réfraction en 984.",
    descDe: "Ibn al-Haytham bewies die Gesetze von Reflexion, Brechung und die Camera Obscura 1011 — 637 Jahre vor Snell. Ibn Sahl entdeckte das Sinusgesetz der Brechung 984.",
    descAr: "ابن الهيثم أثبت قوانين الانعكاس والانكسار وغرفة الظلمة عام ١٠١١ م — قبل سنيل بـ٦٣٧ عامًا. ابن سهل اكتشف قانون جيب الانكسار عام ٩٨٤ م.",
    keywords: 'who discovered optics, Ibn al-Haytham, Alhazen, camera obscura, history of optics, Ibn Sahl sine law, Snell law origin, Kitāb al-Manāẓir, photography invention',
  },
  method: {
    title: 'Who Really Invented the Scientific Method? Ibn al-Haytham (1025 CE)',
    titleFr: "Qui a vraiment inventé la méthode scientifique ? Ibn al-Haytham (1025)",
    titleDe: 'Wer erfand wirklich die wissenschaftliche Methode? Ibn al-Haytham (1025)',
    titleAr: 'من اخترع المنهج العلمي حقًّا؟ ابن الهيثم (١٠٢٥ م)',
    desc: "The experimental scientific method was explicitly stated by Ibn al-Haytham in 1025 CE — 600 years before Francis Bacon's Novum Organum. Seven steps: observe, hypothesize, experiment, verify, repeat, publish, question authority.",
    descFr: "La méthode scientifique expérimentale fut énoncée par Ibn al-Haytham en 1025 — 600 ans avant Francis Bacon. Sept étapes : observer, formuler, expérimenter, vérifier, répéter, publier.",
    descDe: "Die experimentelle wissenschaftliche Methode wurde 1025 von Ibn al-Haytham formuliert — 600 Jahre vor Francis Bacon. Sieben Schritte: beobachten, hypothetisieren, experimentieren, überprüfen, wiederholen, veröffentlichen.",
    descAr: "المنهج العلمي التجريبي صاغه ابن الهيثم عام ١٠٢٥ م — قبل فرانسيس بيكون بـ٦٠٠ عام. سبع خطوات: راقب، افترض، جرب، تحقق، كرر، انشر، شكّك.",
    keywords: 'who invented scientific method, Ibn al-Haytham, Francis Bacon myth, history of scientific method, experimental method origin, Novum Organum, Doubts Concerning Ptolemy',
  },
  calculus: {
    title: 'Who Really Invented Calculus? Ibn al-Haytham, al-Ṭūsī, Mādhava',
    titleFr: "Qui a vraiment inventé le calcul ? Ibn al-Haytham, al-Ṭūsī, Mādhava",
    titleDe: 'Wer erfand wirklich die Analysis? Ibn al-Haytham, al-Ṭūsī, Mādhava',
    titleAr: 'من اخترع التفاضل والتكامل حقًّا؟ ابن الهيثم والطوسي ومادهافا',
    desc: "Integration (Ibn al-Haytham, 1000 CE), differentiation (Sharaf al-Ṭūsī, 1170 CE), infinite series (Mādhava, 1400 CE) — 666, 496, and 276 years before Newton and Leibniz. Plus how manuscripts reached Europe by conquest.",
    descFr: "Intégration (Ibn al-Haytham, 1000), différenciation (Sharaf al-Ṭūsī, 1170), séries infinies (Mādhava, 1400) — 666, 496 et 276 ans avant Newton et Leibniz.",
    descDe: "Integration (Ibn al-Haytham, 1000), Differentiation (Sharaf al-Ṭūsī, 1170), unendliche Reihen (Mādhava, 1400) — 666, 496 und 276 Jahre vor Newton und Leibniz.",
    descAr: "التكامل (ابن الهيثم ١٠٠٠)، التفاضل (شرف الطوسي ١١٧٠)، المتسلسلات اللانهائية (مادهافا ١٤٠٠) — قبل نيوتن ولايبنيتس بـ٦٦٦ و٤٩٦ و٢٧٦ عامًا.",
    keywords: 'who invented calculus, Ibn al-Haytham integration, Sharaf al-Ṭūsī differentiation, Mādhava infinite series, Newton calculus myth, Kerala school, history of calculus',
  },
  astro: {
    title: 'Did Copernicus Copy Islamic Astronomy? Al-Sūfī, al-Ṭūsī, Ibn al-Shāṭir',
    titleFr: "Copernic a-t-il copié l'astronomie islamique ? Al-Sūfī, al-Ṭūsī, Ibn al-Shāṭir",
    titleDe: 'Hat Kopernikus islamische Astronomie kopiert? Al-Sūfī, al-Ṭūsī, Ibn al-Shāṭir',
    titleAr: 'هل نسخ كوبرنيكوس الفلك الإسلامي؟ الصوفي والطوسي وابن الشاطر',
    desc: "The Andromeda Galaxy (al-Sūfī, 964 CE), the Tusi Couple (al-Ṭūsī, 1247 CE), and Ibn al-Shāṭir's lunar model — mathematically identical to Copernicus's De Revolutionibus (1543). Copernicus cited al-Battānī 23 times.",
    descFr: "Galaxie d'Andromède (al-Sūfī, 964), Couple de Tusi (al-Ṭūsī, 1247), modèle lunaire d'Ibn al-Shāṭir — identiques au De Revolutionibus de Copernic (1543).",
    descDe: "Andromeda-Galaxie (al-Sūfī, 964), Tusi-Paar (al-Ṭūsī, 1247), Ibn al-Shāṭirs Mondmodell — identisch mit Kopernikus' De Revolutionibus (1543).",
    descAr: "مجرة أندروميدا (الصوفي ٩٦٤)، ثنائية الطوسي (الطوسي ١٢٤٧)، نموذج القمر لابن الشاطر — مطابق لكتاب كوبرنيكوس (١٥٤٣).",
    keywords: 'Copernicus copied, Islamic astronomy, al-Sūfī Andromeda, Tusi Couple, Ibn al-Shāṭir, Maragheh observatory, heliocentrism origin, history of astronomy',
  },
  nav: {
    title: 'Who Really Invented Navigation? Mariam al-Asturlābiyya, Ibn Mājid',
    titleFr: "Qui a vraiment inventé la navigation ? Mariam al-Asturlābiyya, Ibn Mājid",
    titleDe: 'Wer erfand wirklich die Navigation? Mariam al-Asturlābiyya, Ibn Mājid',
    titleAr: 'من اخترع الملاحة حقًّا؟ مريم الأسطرلابية وابن ماجد',
    desc: "The astrolabe (Mariam al-Asturlābiyya, 10th century), navigation manuals (Ibn Mājid, 1462), and spherical trigonometry (al-Bīrūnī, 1030). Vasco da Gama was guided by a Muslim navigator in 1497 — then erased him.",
    descFr: "L'astrolabe (Mariam al-Asturlābiyya, Xe siècle), manuels de navigation (Ibn Mājid, 1462), trigonométrie sphérique (al-Bīrūnī, 1030). Vasco de Gama fut guidé par un navigateur musulman en 1497.",
    descDe: "Astrolabium (Mariam al-Asturlābiyya, 10. Jh.), Navigationshandbücher (Ibn Mājid, 1462), sphärische Trigonometrie (al-Bīrūnī, 1030). Vasco da Gama wurde 1497 von einem muslimischen Navigator geführt.",
    descAr: "الأسطرلاب (مريم الأسطرلابية، القرن العاشر)، أدلة الملاحة (ابن ماجد ١٤٦٢)، حساب المثلثات الكروي (البيروني ١٠٣٠). فاسكو دا غاما أرشده ملاح مسلم عام ١٤٩٧.",
    keywords: 'who invented navigation, Mariam al-Asturlābiyya, Ibn Mājid, Vasco da Gama navigator, astrolabe history, kamal navigation, Islamic navigation',
  },
  uni: {
    title: 'Who Founded the First University? Fatima al-Fihri (859 CE)',
    titleFr: "Qui a fondé la première université ? Fatima al-Fihri (859)",
    titleDe: 'Wer gründete die erste Universität? Fatima al-Fihri (859)',
    titleAr: 'من أسس أول جامعة؟ فاطمة الفهري (٨٥٩ م)',
    desc: "The world's oldest continuously operating university was founded by Fatima al-Fihri in Fez, Morocco, in 859 CE — 229 years before Bologna. Lubna of Cordoba managed 500,000 books. Europe was burning women for reading.",
    descFr: "La plus ancienne université en activité fut fondée par Fatima al-Fihri à Fès en 859 — 229 ans avant Bologne. Lubna de Cordoue gérait 500 000 livres.",
    descDe: "Die älteste durchgehend betriebene Universität wurde von Fatima al-Fihri in Fès 859 gegründet — 229 Jahre vor Bologna. Lubna von Córdoba verwaltete 500.000 Bücher.",
    descAr: "أقدم جامعة عاملة أسستها فاطمة الفهري في فاس عام ٨٥٩ م — قبل بولونيا بـ٢٢٩ عامًا. لبنة القرطبية أدارت ٥٠٠ ألف كتاب.",
    keywords: 'oldest university world, Fatima al-Fihri, al-Qarawiyyin, first university, Bologna myth, Lubna of Cordoba, history of universities, women in Islamic education',
  },
  med: {
    title: 'Who Really Invented Modern Medicine? Al-Rāzī, Ibn Sīnā, Ibn al-Nafīs',
    titleFr: "Qui a vraiment inventé la médecine moderne ? Al-Rāzī, Ibn Sīnā, Ibn al-Nafīs",
    titleDe: 'Wer erfand wirklich die moderne Medizin? Al-Rāzī, Ibn Sīnā, Ibn al-Nafīs',
    titleAr: 'من اخترع الطب الحديث حقًّا؟ الرازي وابن سينا وابن النفيس',
    desc: "First clinical trial (al-Rāzī, 900 CE), Canon of Medicine (Ibn Sīnā, 1025 CE — Europe's textbook for 600 years), pulmonary circulation (Ibn al-Nafīs, 1242 CE — 386 years before Harvey). CES 19/21 — Irrefutable.",
    descFr: "Premier essai clinique (al-Rāzī, 900), Canon de la Médecine (Ibn Sīnā, 1025 — manuel européen pendant 600 ans), circulation pulmonaire (Ibn al-Nafīs, 1242 — 386 ans avant Harvey).",
    descDe: "Erste klinische Studie (al-Rāzī, 900), Kanon der Medizin (Ibn Sīnā, 1025 — 600 Jahre europäisches Lehrbuch), Lungenkreislauf (Ibn al-Nafīs, 1242 — 386 Jahre vor Harvey).",
    descAr: "أول تجربة سريرية (الرازي ٩٠٠)، القانون في الطب (ابن سينا ١٠٢٥ — كتاب أوروبا ٦٠٠ عام)، الدورة الدموية الصغرى (ابن النفيس ١٢٤٢ — قبل هارفي ٣٨٦ عامًا).",
    keywords: 'who invented medicine, Ibn Sīnā Canon, Avicenna, Ibn al-Nafīs pulmonary circulation, al-Rāzī clinical trial, Harvey circulation myth, history of medicine, Islamic medicine',
  },
  alg: {
    title: "Why Is It Called an Algorithm? Al-Khwārizmī (820 CE) — The Man Behind the Word",
    titleFr: "Pourquoi appelle-t-on ça un algorithme ? Al-Khwārizmī (820)",
    titleDe: 'Warum heißt es Algorithmus? Al-Khwārizmī (820)',
    titleAr: 'لماذا سُمِّيت خوارزمية؟ الخوارزمي (٨٢٠ م)',
    desc: "The word 'algorithm' IS al-Khwārizmī's name (Latinized as Algoritmi). The word 'algebra' IS his book title (al-Jabr). Fibonacci credited 'the Indians and the Arabs' in 1202. Turing formalized in 1936 without citing the etymology.",
    descFr: "Le mot « algorithme » EST le nom d'al-Khwārizmī. Le mot « algèbre » EST le titre de son livre. Fibonacci a crédité « les Indiens et les Arabes » en 1202.",
    descDe: 'Das Wort Algorithmus IST al-Khwārizmīs Name. Das Wort Algebra IST der Titel seines Buches. Fibonacci schrieb 1202 den Indern und den Arabern zu.',
    descAr: "كلمة «خوارزمية» هي اسم الخوارزمي. كلمة «جبر» هي عنوان كتابه. فيبوناتشي نسب «إلى الهنود والعرب» عام ١٢٠٢.",
    keywords: 'why called algorithm, algorithm etymology, al-Khwārizmī, who invented algebra, al-Jabr, Fibonacci Arabs, Turing algorithm, history of algorithms, House of Wisdom Baghdad',
  },
};

const LOCALE_MAP: Record<string, 'title' | 'titleFr' | 'titleDe' | 'titleAr'> = {
  en: 'title',
  fr: 'titleFr',
  de: 'titleDe',
  ar: 'titleAr',
};

const DESC_MAP: Record<string, 'desc' | 'descFr' | 'descDe' | 'descAr'> = {
  en: 'desc',
  fr: 'descFr',
  de: 'descDe',
  ar: 'descAr',
};

interface SEOHeadProps {
  investigation?: string;
}

export default function SEOHead({ investigation }: SEOHeadProps) {
  const locale = useLocale();

  useEffect(() => {
    const key = investigation || 'home';
    const seo = SEO_DATA[key];
    if (!seo) return;

    const titleKey = LOCALE_MAP[locale] || 'title';
    const descKey = DESC_MAP[locale] || 'desc';
    const title = seo[titleKey];
    const description = seo[descKey];
    const url = investigation
      ? `${BASE_URL}/${locale}?v=${investigation}`
      : `${BASE_URL}/${locale}`;

    // Update title
    document.title = title;

    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', seo.keywords);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Add hreflang alternate links
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    const locales = ['en', 'fr', 'de', 'ar'];
    for (const loc of locales) {
      const altUrl = investigation
        ? `${BASE_URL}/${loc}?v=${investigation}`
        : `${BASE_URL}/${loc}`;
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', loc);
      link.setAttribute('href', altUrl);
      document.head.appendChild(link);
    }
    // x-default
    const xDefault = document.createElement('link');
    xDefault.setAttribute('rel', 'alternate');
    xDefault.setAttribute('hreflang', 'x-default');
    xDefault.setAttribute('href', `${BASE_URL}/en${investigation ? `?v=${investigation}` : ''}`);
    document.head.appendChild(xDefault);

    // Open Graph tags
    const ogTags: Record<string, string> = {
      'og:title': title,
      'og:description': description,
      'og:url': url,
      'og:type': 'article',
      'og:site_name': 'The SDAM Collection',
      'og:locale': locale === 'en' ? 'en_US' : locale === 'fr' ? 'fr_FR' : locale === 'de' ? 'de_DE' : 'ar_AR',
    };
    for (const [property, content] of Object.entries(ogTags)) {
      let og = document.querySelector(`meta[property="${property}"]`);
      if (!og) {
        og = document.createElement('meta');
        og.setAttribute('property', property);
        document.head.appendChild(og);
      }
      og.setAttribute('content', content);
    }

    // Twitter Card tags
    const twitterTags: Record<string, string> = {
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
    };
    for (const [name, content] of Object.entries(twitterTags)) {
      let tw = document.querySelector(`meta[name="${name}"]`);
      if (!tw) {
        tw = document.createElement('meta');
        tw.setAttribute('name', name);
        document.head.appendChild(tw);
      }
      tw.setAttribute('content', content);
    }
  }, [locale, investigation]);

  return null;
}
