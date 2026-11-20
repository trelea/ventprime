import { articlePaths, routing, type LocalizedPath } from "@/i18n/routing";

export type Locale = (typeof routing.locales)[number];

export type BlogTranslation = {
  /** SEO title (<title>). */
  metaTitle: string;
  metaDescription: string;
  /** Card title, also translated. */
  title: string;
  /** Full description; the card renders a truncated snippet of it. */
  excerpt: string;
};

export type BlogPost = {
  /** Internal pathname (key from `routing.pathnames`). */
  path: (typeof articlePaths)[number];
  /** Cover image path under /public. */
  image: string;
  /** Display date, e.g. "14.11.2026". */
  date: string;
  /** Reading time in minutes. */
  readMinutes: number;
  /** Vertical crop focus for the cover image. */
  imagePosition: "top" | "center" | "bottom";
  translations: Record<Locale, BlogTranslation>;
};

/** Static content for the 4 articles — no API, no CMS. */
export const blogPosts: BlogPost[] = [
  {
    path: "/blogs/natural-ventilation-or-recuperator",
    image: "/blogs/natural-ventilation-or-recuperator.png",
    date: "14.11.2026",
    readMinutes: 5,
    imagePosition: "center",
    translations: {
      en: {
        metaTitle: "Natural Ventilation or a Recuperator? Choosing in Moldova",
        metaDescription:
          "Natural ventilation vs. a heat recovery unit for a home in Moldova: comfort, heat loss, humidity and running costs, explained simply.",
        title:
          "Natural Ventilation or a Heat Recovery Unit? What to Choose for a Home in Moldova",
        excerpt:
          "If your windows fog up in winter, the room feels damp, or you want to air the bedroom more often with the windows closed, start with how air will enter and leave the room. For bedrooms, living rooms, kitchens, hallways and attic spaces with outdoor access, we at VentPrime usually recommend natural ventilation. We install two valves per room: one brings in fresh air, the other removes humid air from the room.",
      },
      ro: {
        metaTitle: "Ventilație naturală sau recuperator? Ce alegeți în Moldova",
        metaDescription:
          "Comparăm ventilația naturală cu recuperatorul pentru o casă în Moldova: confort, pierderi de căldură, umiditate și costuri de exploatare.",
        title:
          "Ventilație naturală sau recuperator? Ce să alegeți pentru o casă în Moldova",
        excerpt:
          "Dacă iarna se aburesc ferestrele, în cameră este umiditate sau doriți să aerisiți mai des dormitorul cu ferestrele închise, începeți prin a vedea cum va intra aerul în cameră și va ieși din ea. Pentru dormitoare, sufragerii, bucătării, coridoare și mansarde cu ieșire la exterior, noi la VentPrime recomandăm de obicei ventilația naturală. Pentru o cameră instalăm două valve: una aduce aer proaspăt, cealaltă elimină aerul umed din încăpere.",
      },
      ru: {
        metaTitle: "Естественная вентиляция или рекуператор? Выбор в Молдове",
        metaDescription:
          "Сравниваем естественную вентиляцию и рекуператор для дома в Молдове: комфорт, потери тепла, влажность и расходы на эксплуатацию.",
        title:
          "Естественная вентиляция или рекуператор? Что выбрать для дома в Молдове",
        excerpt:
          "Если зимой запотевают окна, в комнате сыро или хочется чаще проветривать спальню с закрытыми окнами, стоит начать с того, как воздух будет входить в комнату и выходить из неё. Для спален, гостиных, кухонь, коридоров и чердачных помещений с выходом наружу мы в VentPrime обычно рекомендуем естественную вентиляцию. На одну комнату ставим два клапана. Один подаёт свежий воздух, второй выводит влажный воздух из помещения.",
      },
    },
  },
  {
    path: "/blogs/why-windows-fog-up-in-winter",
    image: "/blogs/why-windows-fog-up-in-winter.png",
    date: "14.11.2026",
    readMinutes: 3,
    imagePosition: "center",
    translations: {
      en: {
        metaTitle: "Why Windows Fog Up in Winter — and How Ventilation Helps",
        metaDescription:
          "Condensation on windows in winter is a humidity problem. Learn why it happens and how proper ventilation solves it.",
        title: "Why Windows Fog Up in Winter and How Ventilation Helps",
        excerpt:
          "In winter the radiator warms the room, but the glass and window reveals stay colder. When warm, humid air from the room touches the cold glass, it cools and droplets appear on the pane. With weak air exchange, moisture builds up, so windows fog up more often.",
      },
      ro: {
        metaTitle: "De ce se aburesc ferestrele iarna și cum ajută ventilația",
        metaDescription:
          "Condensul pe ferestre iarna înseamnă umiditate prea mare. Aflați de ce apare și cum îl rezolvă ventilația corectă.",
        title: "De ce se aburesc ferestrele iarna și cum ajută ventilația",
        excerpt:
          "Iarna caloriferele încălzesc camera, dar geamul și pervazurile rămân mai reci. Când aerul cald și umed din cameră atinge sticla rece, se răcește și pe geam apar picături de apă. La un schimb de aer slab, umezeala se acumulează, de aceea ferestrele se aburesc mai des.",
      },
      ru: {
        metaTitle: "Почему окна запотевают зимой и как помогает вентиляция",
        metaDescription:
          "Конденсат на окнах зимой — это проблема влажности. Узнайте, почему он возникает и как его решает правильная вентиляция.",
        title: "Почему окна запотевают зимой и как помогает вентиляция?",
        excerpt:
          "Зимой батареи прогревают комнату, а стёкла и оконные откосы остаются холоднее. Когда тёплый влажный воздух из комнаты соприкасается с холодным стеклом, он охлаждается, и на стекле появляются капли воды. При слабом воздухообмене влага накапливается, поэтому окна запотевают чаще.",
      },
    },
  },
  {
    path: "/blogs/ozone-treatment-when-it-helps",
    image: "/blogs/ozone-treatment-when-it-helps.png",
    date: "14.11.2026",
    readMinutes: 2,
    imagePosition: "center",
    translations: {
      en: {
        metaTitle: "Ozone Treatment: When It Helps and How the Process Works",
        metaDescription:
          "What ozone treatment does, when it is useful after renovation or odour problems, and how a room is prepared and ventilated.",
        title: "Ozone Treatment: When It Helps and How the Process Works",
        excerpt:
          "After cleaning, the room still smells of smoke? Or a musty smell remains after the dampness is fixed? In such cases, professional ozone treatment can be considered. It is an additional treatment of an empty room, used to reduce certain stubborn odours. Under controlled conditions, ozone can also reduce the number of some microorganisms on open surfaces.",
      },
      ro: {
        metaTitle:
          "Ozonizarea încăperilor: când ajută și cum decurge tratamentul",
        metaDescription:
          "Ce face ozonizarea, când este utilă după renovare sau pentru mirosuri persistente și cum se pregătește încăperea.",
        title: "Ozonizarea încăperilor. Când ajută și cum decurge tratamentul?",
        excerpt:
          "După curățenie, în cameră încă miroase a fum? Sau a rămas un miros de mucegai după eliminarea umezelii? În astfel de cazuri se poate lua în calcul ozonizarea profesională. Aceasta este un tratament suplimentar al unei încăperi goale, folosit pentru a reduce anumite mirosuri persistente. În condiții controlate, ozonul poate reduce și numărul unor microorganismuri de pe suprafețele deschise.",
      },
      ru: {
        metaTitle:
          "Озонирование помещений: когда помогает и как проходит обработка",
        metaDescription:
          "Что делает озон, когда он полезен после ремонта или при запахах и как готовят помещение к обработке.",
        title:
          "Озонирование помещений. Когда оно помогает и как проходит обработка?",
        excerpt:
          "После уборки в комнате всё ещё пахнет дымом? Или после устранения сырости остался затхлый запах? В таких случаях можно рассмотреть профессиональное озонирование. Это дополнительная обработка пустого помещения, которую применяют для уменьшения некоторых стойких запахов. В контролируемых условиях озон также способен снизить количество отдельных микроорганизмов на открытых поверхностях.",
      },
    },
  },
  {
    path: "/blogs/fresh-air-with-closed-windows",
    image: "/blogs/fresh-air-with-closed-windows.png",
    date: "14.11.2026",
    readMinutes: 3,
    imagePosition: "top",
    translations: {
      en: {
        metaTitle: "Fresh Air with Closed Windows: Ventilating in Winter",
        metaDescription:
          "How to keep a home supplied with fresh air in winter without opening the windows and losing heat.",
        title:
          "Fresh Air with the Windows Closed: How to Ventilate Your Home in Winter",
        excerpt:
          "A familiar situation: in the evening the bedroom is warm, you don't want to open the window, but by morning the room feels stuffy and droplets appear on the glass. To keep the air fresh even with the window closed, you can set up natural air intake and exhaust in the room.",
      },
      ro: {
        metaTitle: "Aer proaspăt cu ferestrele închise: ventilația iarna",
        metaDescription:
          "Cum asigurați aer proaspăt în casă iarna, fără să deschideți ferestrele și fără să pierdeți căldură.",
        title:
          "Aer proaspăt cu ferestrele închise. Cum să ventilați casa iarna",
        excerpt:
          "Situație cunoscută: seara în dormitor este cald, nu vrei să deschizi fereastra, iar dimineața camera este închisă și pe geam apar picături. Ca aerul să se reînnoiască chiar și cu fereastra închisă, în cameră se poate organiza un aport natural și o evacuare.",
      },
      ru: {
        metaTitle: "Свежий воздух при закрытых окнах: как проветривать зимой",
        metaDescription:
          "Как круглый год обеспечивать дом свежим воздухом зимой, не открывая окна и не теряя тепло.",
        title:
          "Свежий воздух при закрытых окнах. Как проветривать дом зимой?",
        excerpt:
          "Знакомая ситуация: вечером в спальне тепло, открывать окно не хочется, а к утру в комнате душно и на стекле появляются капли. Чтобы воздух обновлялся даже при закрытом окне, в комнате можно организовать естественный приток и вытяжку.",
      },
    },
  },
];

export const blogIndexPath: LocalizedPath = "/blogs";

export function getPostByPath(path: LocalizedPath): BlogPost | undefined {
  return blogPosts.find((post) => post.path === path);
}

/** Shorten a description to a card snippet, breaking on a word boundary. */
export function truncateExcerpt(text: string, max = 160): string {
  if (text.length <= max) return text;

  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  const end = lastSpace > 0 ? lastSpace : max;

  return `${cut.slice(0, end).trimEnd()}…`;
}

/** Shorten a title for breadcrumbs, breaking on a word boundary. */
export function truncateTitle(text: string, max = 60): string {
  if (text.length <= max) return text;

  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  const end = lastSpace > 0 ? lastSpace : max;

  return `${cut.slice(0, end).trimEnd()}...`;
}
