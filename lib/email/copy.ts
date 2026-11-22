export type EmailLocale = "en" | "ro" | "ru";

export type EmailCopy = {
  confirmationSubject: string;
  confirmationHeading: string;
  confirmationIntro: string;
  confirmationBody: string;
  needHelp: string;

  footerSubject: string;
  contactsSubject: string;
  footerHeading: string;
  contactsHeading: string;
  notificationIntro: string;
  replyHint: string;

  name: string;
  phone: string;
  email: string;
  city: string;
  problems: string;
  services: string;
  locale: string;
  source: string;
  submittedAt: string;
  notProvided: string;

  footerForm: string;
  contactsForm: string;
  address: string;
  site: string;
  copyright: string;
};

const en: EmailCopy = {
  confirmationSubject: "We've received your request — VentPrime",
  confirmationHeading: "Thank you for reaching out",
  confirmationIntro: "Hello {name}, we've received your request and will get back to you shortly.",
  confirmationBody:
    "A VentPrime specialist will review your details and contact you within 60 minutes. If you need to add anything, just reply to this email.",
  needHelp: "Questions or need to change something?",

  footerSubject: "New footer request — {name}",
  contactsSubject: "New consultation request — {name}",
  footerHeading: "New footer form submission",
  contactsHeading: "New consultation request",
  notificationIntro: "A new request was submitted on ventprime.md. Details are below.",
  replyHint: "Reply to this email to contact the submitter directly.",

  name: "Name",
  phone: "Phone",
  email: "E-mail",
  city: "City",
  problems: "Problem(s)",
  services: "Service(s)",
  locale: "Locale",
  source: "Source",
  submittedAt: "Submitted at",
  notProvided: "—",

  footerForm: "Footer form",
  contactsForm: "Contacts page form",
  address: "33/2 Nicolae Zelinski St., Chișinău, Moldova",
  site: "ventprime.md",
  copyright: "© 2026 VentPrime. All rights reserved.",
};

const ro: EmailCopy = {
  confirmationSubject: "Am primit solicitarea ta — VentPrime",
  confirmationHeading: "Îți mulțumim că ne-ai scris",
  confirmationIntro: "Salut {name}, am primit solicitarea ta și îți vom răspunde în scurt timp.",
  confirmationBody:
    "Un specialist VentPrime va analiza detaliile și te va contacta în termen de 60 de minute. Dacă vrei să adaugi ceva, răspunde pur și simplu la acest e-mail.",
  needHelp: "Ai întrebări sau vrei să schimbi ceva?",

  footerSubject: "Solicitare nouă din footer — {name}",
  contactsSubject: "Solicitare nouă de consultanță — {name}",
  footerHeading: "Formular nou completat în footer",
  contactsHeading: "Solicitare nouă de consultanță",
  notificationIntro: "O solicitare nouă a fost trimisă pe ventprime.md. Detaliile sunt mai jos.",
  replyHint: "Răspunde la acest e-mail pentru a contacta direct persoana care a trimis solicitarea.",

  name: "Nume",
  phone: "Telefon",
  email: "E-mail",
  city: "Localitate",
  problems: "Problemă(e)",
  services: "Serviciu (servicii)",
  locale: "Limbă",
  source: "Sursă",
  submittedAt: "Trimis la",
  notProvided: "—",

  footerForm: "Formularul din footer",
  contactsForm: "Formularul de pe pagina Contacte",
  address: "Str. Nicolae Zelinski 33/2, Chișinău, Moldova",
  site: "ventprime.md",
  copyright: "© 2026 VentPrime. Toate drepturile rezervate.",
};

const ru: EmailCopy = {
  confirmationSubject: "Мы получили ваш запрос — VentPrime",
  confirmationHeading: "Спасибо за обращение",
  confirmationIntro: "Здравствуйте, {name}! Мы получили ваш запрос и скоро ответим.",
  confirmationBody:
    "Специалист VentPrime изучит детали и свяжется с вами в течение 60 минут. Если нужно что-то добавить, просто ответьте на это письмо.",
  needHelp: "Есть вопросы или нужно что-то изменить?",

  footerSubject: "Новая заявка из формы в подвале — {name}",
  contactsSubject: "Новая заявка на консультацию — {name}",
  footerHeading: "Новая заявка из формы в подвале",
  contactsHeading: "Новая заявка на консультацию",
  notificationIntro: "На сайте ventprime.md оставлена новая заявка. Детали ниже.",
  replyHint: "Ответьте на это письмо, чтобы связаться с отправителем напрямую.",

  name: "Имя",
  phone: "Телефон",
  email: "E-mail",
  city: "Населенный пункт",
  problems: "Проблема(ы)",
  services: "Услуга(и)",
  locale: "Язык",
  source: "Источник",
  submittedAt: "Отправлено",
  notProvided: "—",

  footerForm: "Форма в подвале сайта",
  contactsForm: "Форма на странице «Контакты»",
  address: "ул. Николая Зелинского, 33/2, Кишинёв, Молдова",
  site: "ventprime.md",
  copyright: "© 2026 VentPrime. Все права защищены.",
};

const copyByLocale: Record<EmailLocale, EmailCopy> = { en, ro, ru };

export function getEmailCopy(locale: string): EmailCopy {
  const normalized = locale.toLowerCase().split("-")[0] as EmailLocale;
  return normalized in copyByLocale ? copyByLocale[normalized] : en;
}

export function normalizeEmailLocale(locale: string): EmailLocale {
  const normalized = locale.toLowerCase().split("-")[0] as EmailLocale;
  return normalized in copyByLocale ? normalized : "en";
}

/** Replace {placeholder} tokens with escaped values. */
export function interpolate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (token, key: string) => values[key] ?? token);
}
