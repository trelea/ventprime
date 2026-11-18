import { articlePaths, routing, type LocalizedPath } from "@/i18n/routing";

export type Locale = (typeof routing.locales)[number];

export type BlogTranslation = {
  /** SEO title (<title>). */
  metaTitle: string;
  metaDescription: string;
  /** Page heading, also translated. */
  title: string;
};

export type BlogPost = {
  /** Internal pathname (key from `routing.pathnames`). */
  path: (typeof articlePaths)[number];
  translations: Record<Locale, BlogTranslation>;
};

/** Static content for the 4 articles — no API, no CMS. */
export const blogPosts: BlogPost[] = [
  {
    path: "/blogs/natural-ventilation-or-recuperator",
    translations: {
      en: {
        metaTitle: "Natural Ventilation or a Recuperator? Choosing in Moldova",
        metaDescription:
          "Natural ventilation vs. a heat recovery unit for a home in Moldova: comfort, heat loss, humidity and running costs, explained simply.",
        title:
          "Natural Ventilation or a Heat Recovery Unit? What to Choose for a Home in Moldova",
      },
      ro: {
        metaTitle: "Ventilație naturală sau recuperator? Ce alegeți în Moldova",
        metaDescription:
          "Comparăm ventilația naturală cu recuperatorul pentru o casă în Moldova: confort, pierderi de căldură, umiditate și costuri de exploatare.",
        title:
          "Ventilație naturală sau recuperator? Ce să alegeți pentru o casă în Moldova",
      },
      ru: {
        metaTitle: "Естественная вентиляция или рекуператор? Выбор в Молдове",
        metaDescription:
          "Сравниваем естественную вентиляцию и рекуператор для дома в Молдове: комфорт, потери тепла, влажность и расходы на эксплуатацию.",
        title:
          "Естественная вентиляция или рекуператор? Что выбрать для дома в Молдове",
      },
    },
  },
  {
    path: "/blogs/why-windows-fog-up-in-winter",
    translations: {
      en: {
        metaTitle: "Why Windows Fog Up in Winter — and How Ventilation Helps",
        metaDescription:
          "Condensation on windows in winter is a humidity problem. Learn why it happens and how proper ventilation solves it.",
        title: "Why Windows Fog Up in Winter and How Ventilation Helps",
      },
      ro: {
        metaTitle: "De ce se aburesc ferestrele iarna și cum ajută ventilația",
        metaDescription:
          "Condensul pe ferestre iarna înseamnă umiditate prea mare. Aflați de ce apare și cum îl rezolvă ventilația corectă.",
        title: "De ce se aburesc ferestrele iarna și cum ajută ventilația",
      },
      ru: {
        metaTitle: "Почему окна запотевают зимой и как помогает вентиляция",
        metaDescription:
          "Конденсат на окнах зимой — это проблема влажности. Узнайте, почему он возникает и как его решает правильная вентиляция.",
        title: "Почему окна запотевают зимой и как помогает вентиляция?",
      },
    },
  },
  {
    path: "/blogs/ozone-treatment-when-it-helps",
    translations: {
      en: {
        metaTitle: "Ozone Treatment: When It Helps and How the Process Works",
        metaDescription:
          "What ozone treatment does, when it is useful after renovation or odour problems, and how a room is prepared and ventilated.",
        title: "Ozone Treatment: When It Helps and How the Process Works",
      },
      ro: {
        metaTitle:
          "Ozonizarea încăperilor: când ajută și cum decurge tratamentul",
        metaDescription:
          "Ce face ozonizarea, când este utilă după renovare sau pentru mirosuri persistente și cum se pregătește încăperea.",
        title: "Ozonizarea încăperilor. Când ajută și cum decurge tratamentul?",
      },
      ru: {
        metaTitle:
          "Озонирование помещений: когда помогает и как проходит обработка",
        metaDescription:
          "Что делает озон, когда он полезен после ремонта или при запахах и как готовят помещение к обработке.",
        title: "Озонирование помещений. Когда оно помогает и как проходит обработка?",
      },
    },
  },
  {
    path: "/blogs/fresh-air-with-closed-windows",
    translations: {
      en: {
        metaTitle: "Fresh Air with Closed Windows: Ventilating in Winter",
        metaDescription:
          "How to keep a home supplied with fresh air in winter without opening the windows and losing heat.",
        title: "Fresh Air with the Windows Closed: How to Ventilate Your Home in Winter",
      },
      ro: {
        metaTitle: "Aer proaspăt cu ferestrele închise: ventilația iarna",
        metaDescription:
          "Cum asigurați aer proaspăt în casă iarna, fără să deschideți ferestrele și fără să pierdeți căldură.",
        title: "Aer proaspăt cu ferestrele închise. Cum să ventilați casa iarna",
      },
      ru: {
        metaTitle: "Свежий воздух при закрытых окнах: как проветривать зимой",
        metaDescription:
          "Как круглый год обеспечивать дом свежим воздухом зимой, не открывая окна и не теряя тепло.",
        title: "Свежий воздух при закрытых окнах. Как проветривать дом зимой?",
      },
    },
  },
];

export const blogIndexPath: LocalizedPath = "/blogs";

export function getPostByPath(path: LocalizedPath): BlogPost | undefined {
  return blogPosts.find((post) => post.path === path);
}
