/**
 * Moldova localities for the request-form locality field
 * (Customer Requirements §11 + "COMPLETARE ULTERIOARĂ" §3).
 *
 * Covers municipalities, cities/towns, raion centers AND villages.
 * Every entry carries RO/RU/EN names plus the raion (district) so that
 * same-name localities can be disambiguated in the dropdown
 * ("Dacă există localități cu aceeași denumire, afișați raionul").
 *
 * Labels are resolved via `getLocalityLabel` / `getLocalityRaion` so this
 * list does not bloat the `messages/*.json` catalogs.
 *
 * `oneWayKm` is the one-way ROAD distance from the Chișinău departure point.
 * Static table — no routing API. Edit the value in this file to correct a
 * distance; the calculator picks it up without any form changes.
 * - The 14 customer-table localities use their FIXED sums (see
 *   `FIXED_TRANSPORT_FEES` in `lib/transport-config.ts`) — their `oneWayKm`
 *   matches the customer's approximate table and only explains the math.
 * - Every other locality uses the formula (round trip × 6 lei/km, rounded
 *   up to 50 lei, min 150 lei).
 * - `null` means no locality selected / unknown value: the UI shows the
 *   fallback "Costul transportului va fi confirmat la validarea
 *   solicitării" and suppresses the preliminary total (§3).
 */

export interface Locality {
  /** Stable ASCII identifier, also the form field value. */
  value: string;
  ro: string;
  ru: string;
  en: string;
  /** Raion (district) for disambiguation — localized. */
  raionRo: string;
  raionRu: string;
  raionEn: string;
  /**
   * One-way road distance from Chișinău in km (static table, no API).
   * `null` = no locality selected / unknown value (shows the §3 fallback).
   */
  oneWayKm: number | null;
}

export const LOCALITIES: Locality[] = [
  // --- Customer fixed-fee table (§"SUPLIMENTUL FIX") — km aligned to that table ---
  { value: "chisinau", ro: "Chișinău", ru: "Кишинёв", en: "Chisinau", raionRo: "mun. Chișinău", raionRu: "мун. Кишинёв", raionEn: "Chisinau municipality", oneWayKm: 0 },
  { value: "ialoveni", ro: "Ialoveni", ru: "Яловены", en: "Ialoveni", raionRo: "Ialoveni", raionRu: "Яловенский", raionEn: "Ialoveni", oneWayKm: 15 },
  { value: "scoreni", ro: "Scoreni", ru: "Скорены", en: "Scoreni", raionRo: "Strășeni", raionRu: "Страшенский", raionEn: "Straseni", oneWayKm: 25 },
  { value: "straseni", ro: "Strășeni", ru: "Страшены", en: "Straseni", raionRo: "Strășeni", raionRu: "Страшенский", raionEn: "Straseni", oneWayKm: 30 },
  { value: "hincesti", ro: "Hîncești", ru: "Хынчешты", en: "Hincesti", raionRo: "Hîncești", raionRu: "Хынчештский", raionEn: "Hincesti", oneWayKm: 35 },
  { value: "anenii-noi", ro: "Anenii Noi", ru: "Новые Анены", en: "Anenii Noi", raionRo: "Anenii Noi", raionRu: "Новоаненский", raionEn: "Anenii Noi", oneWayKm: 35 },
  { value: "orhei", ro: "Orhei", ru: "Оргеев", en: "Orhei", raionRo: "Orhei", raionRu: "Оргеевский", raionEn: "Orhei", oneWayKm: 50 },
  { value: "cimislia", ro: "Cimișlia", ru: "Чимишлия", en: "Cimislia", raionRo: "Cimișlia", raionRu: "Чимишлийский", raionEn: "Cimislia", oneWayKm: 65 },
  { value: "causeni", ro: "Căușeni", ru: "Каушаны", en: "Causeni", raionRo: "Căușeni", raionRu: "Каушанский", raionEn: "Causeni", oneWayKm: 75 },
  { value: "comrat", ro: "Comrat", ru: "Комрат", en: "Comrat", raionRo: "Găgăuzia", raionRu: "Гагаузия", raionEn: "Gagauzia", oneWayKm: 100 },
  { value: "stefan-voda", ro: "Ștefan Vodă", ru: "Штефан-Водэ", en: "Stefan Voda", raionRo: "Ștefan Vodă", raionRu: "Штефан-Водский", raionEn: "Stefan Voda", oneWayKm: 100 },
  { value: "ungheni", ro: "Ungheni", ru: "Унгены", en: "Ungheni", raionRo: "Ungheni", raionRu: "Унгенский", raionEn: "Ungheni", oneWayKm: 110 },
  { value: "balti", ro: "Bălți", ru: "Бельцы", en: "Balti", raionRo: "mun. Bălți", raionRu: "мун. Бельцы", raionEn: "Balti municipality", oneWayKm: 135 },
  { value: "cahul", ro: "Cahul", ru: "Кагул", en: "Cahul", raionRo: "Cahul", raionRu: "Кагульский", raionEn: "Cahul", oneWayKm: 165 },
  // --- Other cities / towns / raion centers (approximate road km, formula applies) ---
  { value: "basarabeasca", ro: "Basarabeasca", ru: "Бессарабка", en: "Basarabeasca", raionRo: "Basarabeasca", raionRu: "Бессарабский", raionEn: "Basarabeasca", oneWayKm: 90 },
  { value: "bender", ro: "Bender", ru: "Бендеры", en: "Bender", raionRo: "mun. Bender", raionRu: "мун. Бендеры", raionEn: "Bender municipality", oneWayKm: 61 },
  { value: "biruinta", ro: "Biruința", ru: "Бируинца", en: "Biruinta", raionRo: "Sîngerei", raionRu: "Сынжерейский", raionEn: "Singerei", oneWayKm: 125 },
  { value: "briceni", ro: "Briceni", ru: "Бричаны", en: "Briceni", raionRo: "Briceni", raionRu: "Бричанский", raionEn: "Briceni", oneWayKm: 235 },
  { value: "calarasi", ro: "Călărași", ru: "Калараш", en: "Calarasi", raionRo: "Călărași", raionRu: "Каларашский", raionEn: "Calarasi", oneWayKm: 53 },
  { value: "camenca", ro: "Camenca", ru: "Каменка", en: "Camenca", raionRo: "Camenca", raionRu: "Каменский", raionEn: "Camenca", oneWayKm: 150 },
  { value: "cantemir", ro: "Cantemir", ru: "Кантемир", en: "Cantemir", raionRo: "Cantemir", raionRu: "Кантемирский", raionEn: "Cantemir", oneWayKm: 119 },
  { value: "ceadir-lunga", ro: "Ceadîr-Lunga", ru: "Чадыр-Лунга", en: "Ceadir-Lunga", raionRo: "Găgăuzia", raionRu: "Гагаузия", raionEn: "Gagauzia", oneWayKm: 126 },
  { value: "codru", ro: "Codru", ru: "Кодру", en: "Codru", raionRo: "mun. Chișinău", raionRu: "мун. Кишинёв", raionEn: "Chisinau municipality", oneWayKm: 6 },
  { value: "cornesti", ro: "Cornești", ru: "Корнешты", en: "Cornesti", raionRo: "Ungheni", raionRu: "Унгенский", raionEn: "Ungheni", oneWayKm: 80 },
  { value: "costesti", ro: "Costești", ru: "Костешты", en: "Costesti", raionRo: "Rîșcani", raionRu: "Рышканский", raionEn: "Riscani", oneWayKm: 184 },
  { value: "cricova", ro: "Cricova", ru: "Криково", en: "Cricova", raionRo: "mun. Chișinău", raionRu: "мун. Кишинёв", raionEn: "Chisinau municipality", oneWayKm: 15 },
  { value: "criuleni", ro: "Criuleni", ru: "Криуляны", en: "Criuleni", raionRo: "Criuleni", raionRu: "Криулянский", raionEn: "Criuleni", oneWayKm: 41 },
  { value: "cupcini", ro: "Cupcini", ru: "Купчинь", en: "Cupcini", raionRo: "Edineț", raionRu: "Единецкий", raionEn: "Edinet", oneWayKm: 201 },
  { value: "dnestrovsc", ro: "Dnestrovsc", ru: "Днестровск", en: "Dnestrovsc", raionRo: "Slobozia", raionRu: "Слободзейский", raionEn: "Slobozia", oneWayKm: 114 },
  { value: "donduseni", ro: "Dondușeni", ru: "Дондюшаны", en: "Donduseni", raionRo: "Dondușeni", raionRu: "Дондюшанский", raionEn: "Donduseni", oneWayKm: 200 },
  { value: "drochia", ro: "Drochia", ru: "Дрокия", en: "Drochia", raionRo: "Drochia", raionRu: "Дрокиевский", raionEn: "Drochia", oneWayKm: 172 },
  { value: "dubasari", ro: "Dubăsari", ru: "Дубоссары", en: "Dubasari", raionRo: "Dubăsari", raionRu: "Дубоссарский", raionEn: "Dubasari", oneWayKm: 45 },
  { value: "durlesti", ro: "Durlești", ru: "Дурлешты", en: "Durlesti", raionRo: "mun. Chișinău", raionRu: "мун. Кишинёв", raionEn: "Chisinau municipality", oneWayKm: 7 },
  { value: "edinet", ro: "Edineț", ru: "Единец", en: "Edinet", raionRo: "Edineț", raionRu: "Единецкий", raionEn: "Edinet", oneWayKm: 210 },
  { value: "falesti", ro: "Fălești", ru: "Фалешты", en: "Falesti", raionRo: "Fălești", raionRu: "Фалештский", raionEn: "Falesti", oneWayKm: 138 },
  { value: "floresti", ro: "Florești", ru: "Флорешты", en: "Floresti", raionRo: "Florești", raionRu: "Флорештский", raionEn: "Floresti", oneWayKm: 128 },
  { value: "frunza", ro: "Frunză", ru: "Фрунзе", en: "Frunza", raionRo: "Ocnița", raionRu: "Окницкий", raionEn: "Ocnita", oneWayKm: 220 },
  { value: "ghindesti", ro: "Ghindești", ru: "Гиндешты", en: "Ghindesti", raionRo: "Florești", raionRu: "Флорештский", raionEn: "Floresti", oneWayKm: 130 },
  { value: "glodeni", ro: "Glodeni", ru: "Глодяны", en: "Glodeni", raionRo: "Glodeni", raionRu: "Глодянский", raionEn: "Glodeni", oneWayKm: 175 },
  { value: "grigoriopol", ro: "Grigoriopol", ru: "Григориополь", en: "Grigoriopol", raionRo: "Grigoriopol", raionRu: "Григориопольский", raionEn: "Grigoriopol", oneWayKm: 47 },
  { value: "iargara", ro: "Iargara", ru: "Яргара", en: "Iargara", raionRo: "Leova", raionRu: "Леовский", raionEn: "Leova", oneWayKm: 100 },
  { value: "leova", ro: "Leova", ru: "Леова", en: "Leova", raionRo: "Leova", raionRu: "Леовский", raionEn: "Leova", oneWayKm: 96 },
  { value: "lipcani", ro: "Lipcani", ru: "Липканы", en: "Lipcani", raionRo: "Briceni", raionRu: "Бричанский", raionEn: "Briceni", oneWayKm: 255 },
  { value: "marculesti", ro: "Mărculești", ru: "Маркулешты", en: "Marculesti", raionRo: "Florești", raionRu: "Флорештский", raionEn: "Floresti", oneWayKm: 136 },
  { value: "nisporeni", ro: "Nisporeni", ru: "Ниспорены", en: "Nisporeni", raionRo: "Nisporeni", raionRu: "Ниспоренский", raionEn: "Nisporeni", oneWayKm: 74 },
  { value: "ocnita", ro: "Ocnița", ru: "Окница", en: "Ocnita", raionRo: "Ocnița", raionRu: "Окницкий", raionEn: "Ocnita", oneWayKm: 230 },
  { value: "otaci", ro: "Otaci", ru: "Отачь", en: "Otaci", raionRo: "Ocnița", raionRu: "Окницкий", raionEn: "Ocnita", oneWayKm: 242 },
  { value: "rezina", ro: "Rezina", ru: "Резина", en: "Rezina", raionRo: "Rezina", raionRu: "Резинский", raionEn: "Rezina", oneWayKm: 100 },
  { value: "ribnita", ro: "Rîbnița", ru: "Рыбница", en: "Ribnita", raionRo: "Rîbnița", raionRu: "Рыбницкий", raionEn: "Ribnita", oneWayKm: 114 },
  { value: "riscani", ro: "Rîșcani", ru: "Рышканы", en: "Riscani", raionRo: "Rîșcani", raionRu: "Рышканский", raionEn: "Riscani", oneWayKm: 170 },
  { value: "singera", ro: "Sîngera", ru: "Сынджера", en: "Singera", raionRo: "mun. Chișinău", raionRu: "мун. Кишинёв", raionEn: "Chisinau municipality", oneWayKm: 15 },
  { value: "singerei", ro: "Sîngerei", ru: "Сынжерей", en: "Singerei", raionRo: "Sîngerei", raionRu: "Сынжерейский", raionEn: "Singerei", oneWayKm: 112 },
  { value: "slobozia", ro: "Slobozia", ru: "Слободзея", en: "Slobozia", raionRo: "Slobozia", raionRu: "Слободзейский", raionEn: "Slobozia", oneWayKm: 86 },
  { value: "soldanesti", ro: "Șoldănești", ru: "Шолданешты", en: "Soldanesti", raionRo: "Șoldănești", raionRu: "Шолданештский", raionEn: "Soldanesti", oneWayKm: 112 },
  { value: "soroca", ro: "Soroca", ru: "Сороки", en: "Soroca", raionRo: "Soroca", raionRu: "Сорокский", raionEn: "Soroca", oneWayKm: 145 },
  { value: "taraclia", ro: "Taraclia", ru: "Тараклия", en: "Taraclia", raionRo: "Taraclia", raionRu: "Тараклийский", raionEn: "Taraclia", oneWayKm: 154 },
  { value: "telenesti", ro: "Telenești", ru: "Теленешты", en: "Telenesti", raionRo: "Telenești", raionRu: "Теленештский", raionEn: "Telenesti", oneWayKm: 84 },
  { value: "tiraspol", ro: "Tiraspol", ru: "Тирасполь", en: "Tiraspol", raionRo: "mun. Tiraspol", raionRu: "мун. Тирасполь", raionEn: "Tiraspol municipality", oneWayKm: 76 },
  { value: "tvardita", ro: "Tvardița", ru: "Твардица", en: "Tvardita", raionRo: "Taraclia", raionRu: "Тараклийский", raionEn: "Taraclia", oneWayKm: 122 },
  { value: "vadul-lui-voda", ro: "Vadul lui Vodă", ru: "Вадул-луй-Водэ", en: "Vadul lui Voda", raionRo: "mun. Chișinău", raionRu: "мун. Кишинёв", raionEn: "Chisinau municipality", oneWayKm: 24 },
  { value: "vatra", ro: "Vatra", ru: "Ватра", en: "Vatra", raionRo: "mun. Chișinău", raionRu: "мун. Кишинёв", raionEn: "Chisinau municipality", oneWayKm: 13 },
  { value: "vulcanesti", ro: "Vulcănești", ru: "Вулканешты", en: "Vulcanesti", raionRo: "Găgăuzia", raionRu: "Гагаузия", raionEn: "Gagauzia", oneWayKm: 182 },
  // --- Urban localities missing from the first pass (formula applies) ---
  { value: "maiac", ro: "Maiac", ru: "Маяк", en: "Maiac", raionRo: "Grigoriopol", raionRu: "Григориопольский", raionEn: "Grigoriopol", oneWayKm: 62 },
  { value: "crasnoe", ro: "Crasnoe", ru: "Красное", en: "Crasnoe", raionRo: "Slobozia", raionRu: "Слободзейский", raionEn: "Slobozia", oneWayKm: 101 },
  { value: "tiraspolul-nou", ro: "Tiraspolul Nou", ru: "Ново-Тираспольск", en: "Tiraspolul Nou", raionRo: "mun. Tiraspol", raionRu: "мун. Тирасполь", raionEn: "Tiraspol municipality", oneWayKm: 74 },
  { value: "cocieri", ro: "Cocieri", ru: "Кочиеры", en: "Cocieri", raionRo: "Dubăsari", raionRu: "Дубоссарский", raionEn: "Dubasari", oneWayKm: 52 },
  // --- Villages (static approximate road km — no routing API) ---
  // Same-name pair: Costești appears in both Rîșcani (town above) and Ialoveni.
  { value: "costesti-ialoveni", ro: "Costești", ru: "Костешты", en: "Costesti", raionRo: "Ialoveni", raionRu: "Яловенский", raionEn: "Ialoveni", oneWayKm: 22 },
  // Same-name pair: Mălăiești appears in several raions.
  { value: "malaiesti-orhei", ro: "Mălăiești", ru: "Малаешты", en: "Malaiesti", raionRo: "Orhei", raionRu: "Оргеевский", raionEn: "Orhei", oneWayKm: 55 },
  { value: "malaiesti-riscani", ro: "Mălăiești", ru: "Малаешты", en: "Malaiesti", raionRo: "Rîșcani", raionRu: "Рышканский", raionEn: "Riscani", oneWayKm: 175 },
  // Chișinău suburbs & nearby villages.
  { value: "truseni", ro: "Trușeni", ru: "Трушены", en: "Truseni", raionRo: "mun. Chișinău", raionRu: "мун. Кишинёв", raionEn: "Chisinau municipality", oneWayKm: 14 },
  { value: "bacioi", ro: "Băcioi", ru: "Бачой", en: "Bacioi", raionRo: "mun. Chișinău", raionRu: "мун. Кишинёв", raionEn: "Chisinau municipality", oneWayKm: 10 },
  { value: "stauceni", ro: "Stăuceni", ru: "Ставчены", en: "Stauceni", raionRo: "mun. Chișinău", raionRu: "мун. Кишинёв", raionEn: "Chisinau municipality", oneWayKm: 12 },
  { value: "ciorescu", ro: "Ciorescu", ru: "Чореску", en: "Ciorescu", raionRo: "mun. Chișinău", raionRu: "мун. Кишинёв", raionEn: "Chisinau municipality", oneWayKm: 15 },
  { value: "gratiesti", ro: "Grătiești", ru: "Гратиешты", en: "Gratiesti", raionRo: "mun. Chișinău", raionRu: "мун. Кишинёв", raionEn: "Chisinau municipality", oneWayKm: 12 },
  { value: "bubuieci", ro: "Bubuieci", ru: "Бубуечь", en: "Bubuieci", raionRo: "mun. Chișinău", raionRu: "мун. Кишинёв", raionEn: "Chisinau municipality", oneWayKm: 10 },
  { value: "budesti", ro: "Budești", ru: "Будешты", en: "Budesti", raionRo: "mun. Chișinău", raionRu: "мун. Кишинёв", raionEn: "Chisinau municipality", oneWayKm: 12 },
  { value: "ghidighici", ro: "Ghidighici", ru: "Гидигич", en: "Ghidighici", raionRo: "mun. Chișinău", raionRu: "мун. Кишинёв", raionEn: "Chisinau municipality", oneWayKm: 12 },
  // Ialoveni raion villages.
  { value: "bardar", ro: "Bardar", ru: "Бардар", en: "Bardar", raionRo: "Ialoveni", raionRu: "Яловенский", raionEn: "Ialoveni", oneWayKm: 22 },
  { value: "danceni", ro: "Dănceni", ru: "Данчены", en: "Danceni", raionRo: "Ialoveni", raionRu: "Яловенский", raionEn: "Ialoveni", oneWayKm: 18 },
  { value: "horesti-ialoveni", ro: "Horești", ru: "Хорешты", en: "Horesti", raionRo: "Ialoveni", raionRu: "Яловенский", raionEn: "Ialoveni", oneWayKm: 28 },
  { value: "milestii-mici", ro: "Mileștii Mici", ru: "Милештий Мичь", en: "Milestii Mici", raionRo: "Ialoveni", raionRu: "Яловенский", raionEn: "Ialoveni", oneWayKm: 18 },
  { value: "puhoi", ro: "Puhoi", ru: "Пухой", en: "Puhoi", raionRo: "Ialoveni", raionRu: "Яловенский", raionEn: "Ialoveni", oneWayKm: 25 },
  { value: "rusestii-noi", ro: "Ruseștii Noi", ru: "Русештий Ной", en: "Rusestii Noi", raionRo: "Ialoveni", raionRu: "Яловенский", raionEn: "Ialoveni", oneWayKm: 25 },
  { value: "sociteni", ro: "Sociteni", ru: "Сочитены", en: "Sociteni", raionRo: "Ialoveni", raionRu: "Яловенский", raionEn: "Ialoveni", oneWayKm: 20 },
  { value: "tipala", ro: "Țipala", ru: "Ципала", en: "Tipala", raionRo: "Ialoveni", raionRu: "Яловенский", raionEn: "Ialoveni", oneWayKm: 30 },
  { value: "vasieni", ro: "Văsieni", ru: "Вэсиены", en: "Vasieni", raionRo: "Ialoveni", raionRu: "Яловенский", raionEn: "Ialoveni", oneWayKm: 28 },
  // Strășeni raion villages.
  { value: "cojusna", ro: "Cojușna", ru: "Кожушна", en: "Cojusna", raionRo: "Strășeni", raionRu: "Страшенский", raionEn: "Straseni", oneWayKm: 20 },
  { value: "lozova", ro: "Lozova", ru: "Лозова", en: "Lozova", raionRo: "Strășeni", raionRu: "Страшенский", raionEn: "Straseni", oneWayKm: 35 },
  { value: "micleuseni", ro: "Micleușeni", ru: "Миклеушены", en: "Micleuseni", raionRo: "Strășeni", raionRu: "Страшенский", raionEn: "Straseni", oneWayKm: 40 },
  { value: "panasesti", ro: "Pănășești", ru: "Пэнэшешты", en: "Panasesti", raionRo: "Strășeni", raionRu: "Страшенский", raionEn: "Straseni", oneWayKm: 32 },
  { value: "romanesti", ro: "Romănești", ru: "Романешты", en: "Romanesti", raionRo: "Strășeni", raionRu: "Страшенский", raionEn: "Straseni", oneWayKm: 28 },
  { value: "vorniceni-straseni", ro: "Vorniceni", ru: "Ворничены", en: "Vorniceni", raionRo: "Strășeni", raionRu: "Страшенский", raionEn: "Straseni", oneWayKm: 30 },
  // Orhei raion villages.
  { value: "branesti", ro: "Brănești", ru: "Брэнешты", en: "Branesti", raionRo: "Orhei", raionRu: "Оргеевский", raionEn: "Orhei", oneWayKm: 48 },
  { value: "chiperceni", ro: "Chiperceni", ru: "Киперчены", en: "Chiperceni", raionRo: "Orhei", raionRu: "Оргеевский", raionEn: "Orhei", oneWayKm: 65 },
  { value: "ivancea", ro: "Ivancea", ru: "Иванча", en: "Ivancea", raionRo: "Orhei", raionRu: "Оргеевский", raionEn: "Orhei", oneWayKm: 42 },
  { value: "peresecina", ro: "Peresecina", ru: "Пересечина", en: "Peresecina", raionRo: "Orhei", raionRu: "Оргеевский", raionEn: "Orhei", oneWayKm: 38 },
  { value: "seliste-orhei", ro: "Seliște", ru: "Селиште", en: "Seliste", raionRo: "Orhei", raionRu: "Оргеевский", raionEn: "Orhei", oneWayKm: 58 },
  { value: "trebujeni", ro: "Trebujeni", ru: "Требужены", en: "Trebujeni", raionRo: "Orhei", raionRu: "Оргеевский", raionEn: "Orhei", oneWayKm: 62 },
  // Hîncești raion villages.
  { value: "carpineni", ro: "Cărpineni", ru: "Карпинены", en: "Carpineni", raionRo: "Hîncești", raionRu: "Хынчештский", raionEn: "Hincesti", oneWayKm: 55 },
  { value: "ciuciuleni", ro: "Ciuciuleni", ru: "Чучулены", en: "Ciuciuleni", raionRo: "Hîncești", raionRu: "Хынчештский", raionEn: "Hincesti", oneWayKm: 60 },
  { value: "lapusna", ro: "Lăpușna", ru: "Лэпушна", en: "Lapusna", raionRo: "Hîncești", raionRu: "Хынчештский", raionEn: "Hincesti", oneWayKm: 70 },
  { value: "mingir", ro: "Mingir", ru: "Минжир", en: "Mingir", raionRo: "Hîncești", raionRu: "Хынчештский", raionEn: "Hincesti", oneWayKm: 75 },
  { value: "sarata-galbena", ro: "Sărata-Galbenă", ru: "Сарата-Галбенэ", en: "Sarata-Galbena", raionRo: "Hîncești", raionRu: "Хынчештский", raionEn: "Hincesti", oneWayKm: 65 },
  // Anenii Noi raion villages.
  { value: "bulboaca", ro: "Bulboaca", ru: "Бульбока", en: "Bulboaca", raionRo: "Anenii Noi", raionRu: "Новоаненский", raionEn: "Anenii Noi", oneWayKm: 40 },
  { value: "chetrosu", ro: "Chetrosu", ru: "Кетросу", en: "Chetrosu", raionRo: "Anenii Noi", raionRu: "Новоаненский", raionEn: "Anenii Noi", oneWayKm: 38 },
  { value: "floreni-anenii", ro: "Floreni", ru: "Флорены", en: "Floreni", raionRo: "Anenii Noi", raionRu: "Новоаненский", raionEn: "Anenii Noi", oneWayKm: 35 },
  { value: "mereni", ro: "Mereni", ru: "Мерены", en: "Mereni", raionRo: "Anenii Noi", raionRu: "Новоаненский", raionEn: "Anenii Noi", oneWayKm: 25 },
  { value: "speia", ro: "Speia", ru: "Спея", en: "Speia", raionRo: "Anenii Noi", raionRu: "Новоаненский", raionEn: "Anenii Noi", oneWayKm: 45 },
  { value: "tintareni", ro: "Țânțăreni", ru: "Цынцэрены", en: "Tintareni", raionRo: "Anenii Noi", raionRu: "Новоаненский", raionEn: "Anenii Noi", oneWayKm: 40 },
  { value: "varnita", ro: "Varnița", ru: "Варница", en: "Varnita", raionRo: "Anenii Noi", raionRu: "Новоаненский", raionEn: "Anenii Noi", oneWayKm: 65 },
];

/** Full record for a locality `value` (or `undefined` when unknown). */
export function getLocality(value: string): Locality | undefined {
  return LOCALITIES.find((locality) => locality.value === value);
}

/** Localized display name for a locality `value` (falls back to `ro`, then the raw value). */
export function getLocalityLabel(value: string, locale: string): string {
  const found = getLocality(value);
  if (!found) return value;
  if (locale === "ru") return found.ru;
  if (locale === "en") return found.en;
  return found.ro;
}

/** Localized raion (district) name for a locality `value` (empty string when unknown). */
export function getLocalityRaion(value: string, locale: string): string {
  const found = getLocality(value);
  if (!found) return "";
  if (locale === "ru") return found.raionRu;
  if (locale === "en") return found.raionEn;
  return found.raionRo;
}

/** Real one-way road distance from Chișinău in km, or `null` when unknown. */
export function getLocalityOneWayKm(value: string): number | null {
  return getLocality(value)?.oneWayKm ?? null;
}

/** `true` only for Chișinău — the single 0-lei-transport locality (§13). */
export function isChisinau(value: string): boolean {
  return value === "chisinau";
}
