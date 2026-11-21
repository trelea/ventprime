import { articlePaths, routing, type LocalizedPath } from "@/i18n/routing";

export type Locale = (typeof routing.locales)[number];

/** 2- or 3-value tuple used by localized tables. */
type BlogTableTuple<T> = [T, T] | [T, T, T];

/** Heading + body copy block shown inside an article. */
export type BlogTextBlockData = {
  title: string;
  description: string | string[];
  bullets?: string[];
};

/** Localized comparison table shown inside an article. */
export type BlogTableData = {
  title?: string;
  description?: string;
  caption?: string;
  columns: BlogTableTuple<string>;
  rows: Array<BlogTableTuple<string>>;
};

export type BlogTranslation = {
  /** SEO title (<title>). */
  metaTitle: string;
  metaDescription: string;
  /** Card title, also translated. */
  title: string;
  /** Full description; the card renders a truncated snippet of it. */
  excerpt: string;
  /** Optional localized comparison table. */
  table?: BlogTableData;
  /** Optional second table further down the article. */
  extraTable?: BlogTableData;
  /** Optional extra heading + copy blocks shown inside the article. */
  additional?: BlogTextBlockData[];
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
        table: {
          title:
            "Comparison of natural ventilation and a room heat recovery unit",
          columns: [
            "What we're comparing",
            "VentPrime natural ventilation",
            "Room heat recovery unit",
          ],
          rows: [
            [
              "Equipment per room",
              "Two valves on one exterior wall. One supplies air, the other extracts it.",
              "A single room unit handling both supply and extract.",
            ],
            [
              "Fresh air intake in winter",
              "We place the intake valve beside the radiator or above it if there is enough space under the windowsill. Cold air mixes with the warm flow from the radiator and is heated by your own heating system.",
              "A single recuperator with electric mini-heating costs roughly 11,000–15,500 lei based on verified models. The unit is usually mounted high on the wall, away from the radiator. In one verified example, the mini-heater can raise the supply air temperature by about 3–5 °C in night mode.",
            ],
            [
              "Micro-ventilation and air movement",
              "With the valves open and natural draft present, fresh air enters through one valve while humid air leaves through the other at the same time. This creates continuous micro-ventilation in the room. The valves can be slightly opened for gentle intake without a directed stream from a fan.",
              "With the valves open and natural draft present, fresh air enters through one valve while humid air leaves through the other at the same time. This creates continuous micro-ventilation in the room. The valves can be slightly opened for gentle intake without a directed stream from a fan.",
            ],
            [
              "Adjustment and closing",
              "The valve has five positions: 0 — closed, 1–3 — intermediate positions, 4 — fully open.",
              "After the fan is switched off, air may continue to pass through the open grille. Whether and how it can be closed depends on the model.",
            ],
            [
              "Night-time operation",
              "The valves can be left open overnight. They have no fan and no motor noise.",
              "A running fan creates noise that is more noticeable in the quiet of a bedroom. If the unit is switched off, forced ventilation stops.",
            ],
            [
              "Street noise",
              "Sound-absorbing material is installed along the entire length inside the tube, helping reduce noise from the street.",
              "How much street noise passes through the unit depends on the design of the channel, the grille and the sound insulation of the specific model.",
            ],
            [
              "Installation hole size",
              "Two Ø110 mm holes per room. We install a 100 mm diameter tube in each.",
              "Some wall-mounted models require a single hole of at least Ø162 mm. The exact diameter depends on the model.",
            ],
            [
              "Installation in a thin wall and appearance",
              "We install the valves even in a wall just 10 cm thick. The tube is matched to the wall thickness, so it is completely hidden inside. Only the valve cover protrudes on the room side.",
              "For verified standard models, the minimum module length is 44–49 cm, and 35 cm for the compact version. With a 20 cm wall, the standard module is 24–29 cm longer than the wall. Depending on the model and installation method, part of the housing may protrude into the room or outside the façade.",
            ],
            [
              "Maintenance",
              "The filter can be removed, cleaned, washed or replaced. Replacing the inner valve cover costs 300 lei.",
              "The unit requires maintenance. If it breaks down, the fan, electronics or other parts may need repair or replacement.",
            ],
            [
              "Cost per room",
              "Around 3,000 lei for two valves with standard installation. When two valves are installed, VentPrime gives a 50% discount on ozone treatment of that room to treat mould and bacteria.",
              "For comparison: 11,000–15,500 lei for one unit (installation not included). The exact price depends on the model.",
            ],
          ],
        },
        additional: [
          {
            title: "Why we install the intake valve next to the radiator",
            description: [
              "Picture a typical bedroom with a radiator under the window. We usually install the intake valve beside the radiator. If there is enough space between it and the windowsill, the valve can be installed above it. In winter, cold air passes through the wall and mixes with warm air from the working radiator at the outlet. This placement helps reduce the feeling of a cold draught and lets you ventilate the room with the window closed.",
              "The degree of valve opening can be adjusted. A small opening is enough for micro-ventilation. When you need a stronger air intake, the valves can be opened wider.",
            ],
          },
          {
            title: "When we recommend forced ventilation",
            description: [],
            bullets: [
              "In a bathroom, shower room or toilet. After a shower or bath, steam needs to be removed. A standard extractor fan is often enough for this.",
              "In an office, café or clinic. When many people pass through a room, the air needs refreshing faster. In such cases we consider forced ventilation with heat recovery.",
              "In a room with no direct access to the outside. If ventilation cannot be routed through an exterior wall or ceiling, the duct can be run through an adjacent room with access to the street. Such a setup may need a system with an adjustable fan.",
            ],
          },
          {
            title: "How VentPrime valves are designed",
            description: [
              "The supply and extract valves are identical in design. Their placement determines which one supplies air and which one extracts it. With standard installation, we drill a Ø110 mm hole, fit a Ø100 mm tube matched to the wall thickness and install an outdoor seal. The tube contains insulation and sound-absorbing material along its entire length. The valve itself has a filter, an anti-condensation membrane and a regulator with five positions.",
              "If your windows fog up, dampness or mould has appeared, or you want to ventilate a room in winter with the windows closed, tell us which rooms are causing concern. VentPrime will help choose the valve placement and calculate installation cost for each room.",
            ],
          },
        ],
        extraTable: {
          title: "How much ventilation costs in several rooms",
          description:
            "With standard installation in a wall made of material other than concrete or reinforced concrete, one VentPrime valve costs around 1,500 lei. If several separate rooms have fogged windows or dampness, we provide their own pair of valves for each.",
          caption:
            "By this calculation, natural ventilation in three rooms costs roughly 9,000 lei. For comparison, one of the verified room recuperators with mini-heating costs from 11,000 lei for the unit.",
          columns: ["What we install", "Number of rooms", "Room recuperator"],
          rows: [
            ["2 VentPrime valves", "1 room", "3,000 lei"],
            ["4 VentPrime valves", "2 rooms", "6,000 lei"],
            ["6 VentPrime valves", "3 rooms", "9,000 lei"],
            [
              "1 room recuperator with mini-heating",
              "1 room",
              "11,000–15,500 lei for the unit",
            ],
          ],
        },
      },
      ro: {
        metaTitle: "Ventilație naturală sau recuperator? Ce alegeți în Moldova",
        metaDescription:
          "Comparăm ventilația naturală cu recuperatorul pentru o casă în Moldova: confort, pierderi de căldură, umiditate și costuri de exploatare.",
        title:
          "Ventilație naturală sau recuperator? Ce să alegeți pentru o casă în Moldova",
        excerpt:
          "Dacă iarna se aburesc ferestrele, în cameră este umiditate sau doriți să aerisiți mai des dormitorul cu ferestrele închise, începeți prin a vedea cum va intra aerul în cameră și va ieși din ea. Pentru dormitoare, sufragerii, bucătării, coridoare și mansarde cu ieșire la exterior, noi la VentPrime recomandăm de obicei ventilația naturală. Pentru o cameră instalăm două valve: una aduce aer proaspăt, cealaltă elimină aerul umed din încăpere.",
        table: {
          title:
            "Comparația dintre ventilația naturală și un recuperator de cameră",
          columns: [
            "Ce comparăm",
            "Ventilația naturală VentPrime",
            "Recuperator de cameră",
          ],
          rows: [
            [
              "Echipamentul pentru o cameră",
              "Două valve pe același perete exterior. Una asigură aportul, cealaltă evacuarea.",
              "Un singur aparat de cameră pentru aport și evacuare.",
            ],
            [
              "Aportul de aer iarna",
              "Montăm valva de aport lateral de calorifer sau deasupra acestuia, dacă este suficient loc sub pervaz. Aerul rece se amestecă cu fluxul cald de la radiator și se încălzește cu ajutorul sistemului dumneavoastră de încălzire.",
              "Un recuperator cu mini-încălzire electrică costă aproximativ 11 000–15 500 de lei, conform modelelor verificate. Aparatul se montează de obicei sus pe perete, departe de calorifer. Într-un exemplu verificat, mini-încălzitorul poate crește temperatura aerului de aport cu aproximativ 3–5 °C în regim de noapte.",
            ],
            [
              "Micro-ventilația și circulația aerului",
              "Cu valvele deschise și cu tiraj natural, aerul proaspăt intră printr-o valvă, iar aerul umed iese în același timp prin cealaltă. Astfel, în cameră are loc o micro-ventilație continuă. Valvele pot fi întredeschise pentru un aport blând, fără un flux dirijat de la un ventilator.",
              "Cu valvele deschise și cu tiraj natural, aerul proaspăt intră printr-o valvă, iar aerul umed iese în același timp prin cealaltă. Astfel, în cameră are loc o micro-ventilație continuă. Valvele pot fi întredeschise pentru un aport blând, fără un flux dirijat de la un ventilator.",
            ],
            [
              "Reglarea și închiderea",
              "Valva are cinci poziții: 0 — închis, 1–3 — poziții intermediare, 4 — complet deschis.",
              "După oprirea ventilatorului, aerul poate continua să treacă prin gratarul deschis. Posibilitatea și modul de închidere depind de model.",
            ],
            [
              "Funcționarea pe timp de noapte",
              "Valvele pot fi lăsate deschise peste noapte. Nu au ventilator și nu produc zgomot de motor.",
              "Ventilatorul în funcțiune produce zgomot, care este mai vizibil în liniștea dormitorului. Dacă aparatul este oprit, ventilația forțată se oprește.",
            ],
            [
              "Zgomotul de la stradă",
              "În interiorul tubului, pe toată lungimea, este montat un material fonoabsorbant care ajută la reducerea zgomotului de la stradă.",
              "Cât zgomot de stradă trece prin aparat depinde de construcția canalului, a gratarului și de fonoabsorbția modelului respectiv.",
            ],
            [
              "Dimensiunea orificiului de montaj",
              "Două orificii de Ø110 mm pentru fiecare cameră. În fiecare montăm un tub cu diametrul de 100 mm.",
              "Unele modele de perete necesită un singur orificiu de cel puțin Ø162 mm. Diametrul exact depinde de model.",
            ],
            [
              "Montajul în perete subțire și aspectul",
              "Montăm valvele chiar și într-un perete de 10 cm grosime. Tubul este ales în funcție de grosimea peretelui, astfel încât este complet ascuns în interior. Dinspre cameră iese doar capacul valvei.",
              "La modelele standard verificate, lungimea minimă a modulului este de 44–49 cm, iar la versiunea compactă — 35 cm. La un perete de 20 cm, modulul standard este mai lung decât peretele cu 24–29 cm. În funcție de model și de modul de montaj, o parte din carcasă poate ieși în cameră sau în afara fațadei.",
            ],
            [
              "Întreținerea",
              "Filtrul poate fi scos, curățat, spălat sau înlocuit. Înlocuirea capacului interior al valvei costă 300 de lei.",
              "Aparatul necesită întreținere. În caz de defecțiune, poate fi nevoie de reparația sau înlocuirea ventilatorului, a electronicii sau a altor piese.",
            ],
            [
              "Costul pentru o cameră",
              "Aproximativ 3 000 de lei pentru două valve, cu montaj standard. La instalarea a două valve, VentPrime oferă o reducere de 50% la ozonizarea camerei respective pentru tratarea mucegaiului și a bacteriilor.",
              "Ca reper de comparație: 11 000–15 500 de lei pentru un aparat (fără montaj). Prețul exact depinde de model.",
            ],
          ],
        },
        additional: [
          {
            title: "De ce montăm valva de aport lângă calorifer",
            description: [
              "Imaginați-vă un dormitor obișnuit cu caloriferul sub fereastră. Cel mai adesea montăm valva de aport lateral de calorifer. Dacă între acesta și pervaz este suficient loc, valva poate fi montată deasupra lui. Iarna, aerul rece trece prin perete și la ieșire se amestecă cu aerul cald de la radiatorul în funcțiune. Această amplasare ajută la reducerea senzației de curent rece și permite ventilarea camerei cu fereastra închisă.",
              "Gradul de deschidere a valvelor poate fi schimbat. Pentru micro-ventilație este suficientă o deschidere mică. Când este nevoie de un aport mai intens, valvele pot fi deschise mai mult.",
            ],
          },
          {
            title: "Când recomandăm ventilația forțată",
            description: [],
            bullets: [
              "În baie, duș sau toaletă. După duș sau baie trebuie eliminați vaporii. Pentru aceasta este adesea suficient un ventilator de evacuare obișnuit.",
              "În birou, cafenea sau clinică. Când mulți oameni trec prin încăpere, aerul trebuie reînnoit mai repede. În astfel de cazuri luăm în calcul ventilația forțată cu recuperare.",
              "Într-o cameră fără ieșire directă în exterior. Dacă ventilația nu poate fi scoasă prin peretele exterior sau tavan, conducta poate trece printr-o încăpere învecinată cu ieșire la stradă. O astfel de schemă poate necesita un sistem cu ventilator reglabil.",
            ],
          },
          {
            title: "Cum sunt construite valvele VentPrime",
            description: [
              "Valva de aport și cea de evacuare au aceeași construcție. Prin amplasare, una lucrează la aport, iar cealaltă la evacuare. La montajul standard găurim un orificiu de Ø110 mm, alegem un tub de Ø100 mm potrivit grosimii peretelui și montăm o etanșare exterioară. În interiorul tubului, pe toată lungimea, sunt prevăzute izolație termică și material fonoabsorbant. În valvă sunt montate filtrul, membrana anti-condens și regulatorul cu cinci poziții.",
              "Dacă ferestrele vi se aburesc, apare umezeală sau mucegai ori doriți să ventilați camera iarna cu ferestrele închise, spuneți-ne ce încăperi vă îngrijorează. VentPrime vă va ajuta să alegeți amplasarea valvelor și să calculați costul montajului pentru fiecare cameră.",
            ],
          },
        ],
        extraTable: {
          title: "Cât costă ventilația în mai multe camere",
          description:
            "La montajul standard într-un perete din alt material decât betonul sau betonul armat, o valvă VentPrime costă aproximativ 1 500 de lei. Dacă mai multe camere separate au ferestre aburite sau umezeală, prevedem câte o pereche de valve pentru fiecare.",
          caption:
            "Conform acestui calcul, ventilația naturală în trei camere costă aproximativ 9 000 de lei. Pentru comparație, unul dintre recuperatoarele de cameră verificate cu mini-încălzire costă de la 11 000 de lei pentru aparat.",
          columns: ["Ce montăm", "Nr. de camere", "Recuperator de cameră"],
          rows: [
            ["2 valve VentPrime", "1 cameră", "3 000 de lei"],
            ["4 valve VentPrime", "2 camere", "6 000 de lei"],
            ["6 valve VentPrime", "3 camere", "9 000 de lei"],
            [
              "1 recuperator de cameră cu mini-încălzire",
              "1 cameră",
              "11 000–15 500 de lei pentru aparat",
            ],
          ],
        },
      },
      ru: {
        metaTitle: "Естественная вентиляция или рекуператор? Выбор в Молдове",
        metaDescription:
          "Сравниваем естественную вентиляцию и рекуператор для дома в Молдове: комфорт, потери тепла, влажность и расходы на эксплуатацию.",
        title:
          "Естественная вентиляция или рекуператор? Что выбрать для дома в Молдове",
        excerpt:
          "Если зимой запотевают окна, в комнате сыро или хочется чаще проветривать спальню с закрытыми окнами, стоит начать с того, как воздух будет входить в комнату и выходить из неё. Для спален, гостиных, кухонь, коридоров и чердачных помещений с выходом наружу мы в VentPrime обычно рекомендуем естественную вентиляцию. На одну комнату ставим два клапана. Один подаёт свежий воздух, второй выводит влажный воздух из помещения.",
        table: {
          title: "Сравнение естественной вентиляции и комнатного рекуператора",
          columns: [
            "Что сравниваем",
            "Естественная вентиляция VentPrime",
            "Комнатный рекуператор",
          ],
          rows: [
            [
              "Оборудование на одну комнату",
              "Два клапана на одной наружной стене. Один работает на приток, второй — на вытяжку.",
              "Один комнатный прибор для притока и вытяжки.",
            ],
            [
              "Приток воздуха зимой",
              "Приточный клапан ставим сбоку от батареи или над ней, если под подоконником достаточно места. Холодный воздух смешивается с тёплым потоком от радиатора и подогревается за счёт вашего отопления.",
              "Один рекуператор с электрическим мини-догревом стоит примерно 11 000–15 500 леев по ценам проверенных моделей. Прибор обычно ставят высоко на стене, вдали от батареи. В одном из проверенных примеров мини-догрев может добавить к температуре приточного воздуха примерно 3–5 °C в ночном режиме.",
            ],
            [
              "Микро-проветривание и движение воздуха",
              "При открытых клапанах и наличии естественной тяги свежий воздух входит через один клапан, а влажный одновременно выходит через второй. Так в комнате идёт непрерывное микропроветривание. Клапаны можно приоткрыть для мягкого притока без направленной струи от вентилятора.",
              "При открытых клапанах и наличии естественной тяги свежий воздух входит через один клапан, а влажный одновременно выходит через второй. Так в комнате идёт непрерывное микропроветривание. Клапаны можно приоткрыть для мягкого притока без направленной струи от вентилятора.",
            ],
            [
              "Регулировка и закрытие",
              "У клапана пять положений. 0 — закрыто, 1–3 — промежуточные положения, 4 — полностью открыто.",
              "После выключения вентилятора воздух может продолжать проходить через открытую решётку. Возможность и способ её закрытия зависят от модели.",
            ],
            [
              "Работа ночью",
              "Клапаны можно оставить открытыми на ночь. В них нет вентилятора и шума мотора.",
              "Работающий вентилятор создаёт шум, который в тишине спальни заметнее. Если выключить прибор, принудительное проветривание прекратится.",
            ],
            [
              "Уличный шум",
              "Внутри трубы по всей длине установлен шумопоглощающий материал, который помогает уменьшить шум с улицы.",
              "Сколько уличного шума проходит через прибор, зависит от конструкции канала, решётки и шумопоглощения конкретной модели.",
            ],
            [
              "Размер монтажного отверстия",
              "Два отверстия по Ø110 мм на комнату. В каждое устанавливаем трубу диаметром 100 мм.",
              "Для некоторых настенных моделей требуется одно отверстие от Ø162 мм. Точный диаметр зависит от модели.",
            ],
            [
              "Монтаж в тонкую стену и внешний вид",
              "Устанавливаем клапаны даже в стену толщиной 10 см. Трубу подбираем по толщине стены, поэтому она целиком скрыта внутри. Со стороны комнаты выступает только крышка клапана.",
              "У проверенных стандартных моделей минимальная длина модуля составляет 44–49 см, у компактной версии — 35 см. При стене толщиной 20 см стандартный модуль длиннее стены на 24–29 см. В зависимости от модели и способа монтажа часть корпуса может выступать внутрь комнаты или наружу за фасад.",
            ],
            [
              "Обслуживание",
              "Фильтр можно снять, почистить, промыть или заменить. Замена внутренней крышки клапана стоит 300 леев.",
              "Прибор требует обслуживания. При поломке может понадобиться ремонт или замена вентилятора, электроники или других деталей.",
            ],
            [
              "Стоимость на одну комнату",
              "Около 3 000 леев за два клапана при стандартном монтаже. При установке двух клапанов VentPrime даёт скидку 50% на озонирование этой комнаты для обработки от плесени и бактерий.",
              "Ориентир для сравнения — 11 000–15 500 леев за один прибор (без монтажа). Точная цена зависит от модели.",
            ],
          ],
        },
        additional: [
          {
            title: "Почему приточный клапан ставим рядом с батареей",
            description: [
              "Представьте обычную спальню с батареей под окном. Чаще всего мы ставим приточный клапан сбоку от батареи. Если между ней и подоконником достаточно места, клапан можно поставить над ней. Зимой холодный воздух проходит через стену и у выхода смешивается с тёплым воздухом от работающего радиатора. Такое расположение помогает уменьшить ощущение холодной струи и позволяет проветривать комнату с закрытым окном.",
              "Степень открытия клапанов можно менять. Для микропроветривания достаточно выбрать небольшое открытие. Когда нужен более интенсивный приток, клапаны можно открыть шире.",
            ],
          },
          {
            title: "Когда мы рекомендуем принудительную вентиляцию",
            description: [],
            bullets: [
              "В ванной, душевой или санузле. После душа или ванны нужно выводить пар. Для этой задачи часто достаточно обычного вытяжного вентилятора.",
              "В офисе, кафе или клинике. Когда через помещение проходит много людей, воздух нужно обновлять быстрее. В таких случаях мы рассматриваем принудительную вентиляцию с рекуперацией.",
              "В комнате без прямого выхода наружу. Если вентиляцию нельзя вывести через наружную стену или потолок, воздуховод можно провести через соседнее помещение с выходом на улицу. В такой схеме может понадобиться система с регулируемым вентилятором.",
            ],
          },
          {
            title: "Как устроены клапаны VentPrime",
            description: [
              "Приточный и вытяжной клапаны одинаковы по конструкции. За счёт расположения один работает на приток, второй — на вытяжку. При стандартном монтаже мы сверлим отверстие Ø110 мм, подбираем трубу Ø100 мм по толщине стены и устанавливаем наружный уплотнитель. Внутри трубы по всей длине предусмотрены теплоизоляция и шумопоглощающий материал. В самом клапане установлены фильтр, антиконденсационная мембрана и регулятор с пятью положениями.",
              "Если у вас запотевают окна, появилась сырость или плесень либо хочется проветривать комнату зимой с закрытыми окнами, расскажите нам, какие помещения вас беспокоят. VentPrime поможет подобрать расположение клапанов и рассчитать стоимость монтажа для каждой комнаты.",
            ],
          },
        ],
        extraTable: {
          title: "Сколько стоит вентиляция в нескольких комнатах",
          description:
            "При стандартном монтаже в стену из материала, отличного от бетона или железобетона, один клапан VentPrime стоит около 1 500 леев. Если запотевают окна или появляется сырость в нескольких отдельных комнатах, для каждой предусматриваем свою пару клапанов.",
          caption:
            "По этому расчёту естественная вентиляция в трёх комнатах обходится примерно в 9 000 леев. Для сравнения, один из проверенных комнатных рекуператоров с мини-догревом стоит от 11 000 леев за прибор.",
          columns: ["Что устанавливаем", "Кол-во комнат", "Комнатный рекуператор"],
          rows: [
            ["2 клапана VentPrime", "1 комната", "3 000 леев"],
            ["4 клапана VentPrime", "2 комнаты", "6 000 леев"],
            ["6 клапанов VentPrime", "3 комнаты", "9 000 леев"],
            [
              "1 комнатный рекуператор с мини-догревом",
              "1 комната",
              "11 000–15 500 леев за прибор",
            ],
          ],
        },
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
        table: {
          columns: [
            "What you notice",
            "Why it happens",
            "How ventilation helps",
          ],
          rows: [
            [
              "In the morning the glass is wet on the inside",
              "At night one or two people sleep in the bedroom with the window closed. Every exhalation releases water vapour into the air. Without micro-ventilation, moisture builds up overnight and settles on the cold glass.",
              "With the valves open and natural draft present, fresh air enters the bedroom and humid air leaves outside. The window can stay closed all night, and by morning there may be less condensation on the glass.",
            ],
            [
              "In freezing weather the windows fog up every day",
              "In winter windows are kept closed for long periods to retain heat and avoid a cold draught. With weak air exchange, moisture from breathing, cooking, showering and drying laundry stays in the house.",
              "Regular supply and extract help remove moisture throughout the day. If the windows fog up because of weak air exchange, adequate ventilation can make the condensation disappear.",
            ],
            [
              "Window reveals and corners become damp, mould appears",
              "Cold surfaces regularly get wet and take a long time to dry. Constant dampness creates conditions for mould growth.",
              "Lower humidity helps surfaces dry out and reduces the risk of mould returning after removal.",
            ],
            [
              "The kitchen window fogs up while cooking, even with the extractor on",
              "Cooking on the hob or in the oven releases steam into the air. An extractor vented outdoors removes humid air, and fresh air must take its place. If the windows are closed and there is little air intake, some moisture stays in the kitchen and settles on the cold glass.",
              "If the kitchen already has an extractor vented outdoors or a working ventilation shaft, it can be supplemented with one intake valve. Fresh air enters through the valve from outside, while humid air leaves through the extractor or shaft. This way the kitchen is ventilated while cooking without opening the window fully and letting in a cold draught.",
            ],
            [
              "Behind a wardrobe against an exterior wall there is a musty smell or dark patches",
              "Behind furniture placed flush against a cold wall, air moves poorly. Moisture in that spot takes longer to dry.",
              "Ventilation lowers humidity in the room. If you leave a gap behind the wardrobe, air can circulate better along the wall and the surface will dry faster.",
            ],
          ],
        },
        additional: [
          {
            title: "How VentPrime micro-ventilation works",
            description: [
              "With natural draft, fresh air enters the room through one valve while humid air leaves through the other at the same time. The valves can be left slightly open day and night to ventilate the room with the windows closed.",
              "If a window reveal freezes or a wall gets wet because of a leak, that cause also needs to be fixed. Any mould that has already appeared is removed separately.",
            ],
          },
        ],
      },
      ro: {
        metaTitle: "De ce se aburesc ferestrele iarna și cum ajută ventilația",
        metaDescription:
          "Condensul pe ferestre iarna înseamnă umiditate prea mare. Aflați de ce apare și cum îl rezolvă ventilația corectă.",
        title: "De ce se aburesc ferestrele iarna și cum ajută ventilația",
        excerpt:
          "Iarna caloriferele încălzesc camera, dar geamul și pervazurile rămân mai reci. Când aerul cald și umed din cameră atinge sticla rece, se răcește și pe geam apar picături de apă. La un schimb de aer slab, umezeala se acumulează, de aceea ferestrele se aburesc mai des.",
        table: {
          columns: [
            "Ce observați",
            "De ce se întâmplă",
            "Cum ajută ventilația",
          ],
          rows: [
            [
              "Dimineața geamul este ud pe interior",
              "Noaptea una sau două persoane dorm în dormitor cu fereastra închisă. La fiecare expirație, vaporii de apă ajung în aer. Dacă nu există micro-ventilație, umezeala se acumulează peste noapte și se depune pe sticla rece.",
              "Cu valvele deschise și cu tiraj natural, aerul proaspăt intră în dormitor, iar cel umed iese afară. Fereastra poate rămâne închisă toată noaptea, iar dimineața poate fi mai puțin condens pe geam.",
            ],
            [
              "La ger, ferestrele se aburesc în fiecare zi",
              "Iarna ferestrele sunt ținute închise mult timp pentru a păstra căldura și a evita curenții reci. La un schimb de aer slab, umezeala de la respirație, gătit, duș și uscarea rufelor rămâne în casă.",
              "Aportul și evacuarea regulate ajută la eliminarea umezelii pe parcursul zilei. Dacă ferestrele se aburesc din cauza schimbului de aer slab, o ventilație suficientă poate elimina condensul.",
            ],
            [
              "Pervazurile și colțurile se umezesc, apare mucegai",
              "Suprafețele reci se udă regulat și se usucă greu. Umezeala constantă creează condiții pentru dezvoltarea mucegaiului.",
              "Scăderea umidității ajută suprafețele să se usuce și reduce riscul reapariției mucegaiului după îndepărtarea acestuia.",
            ],
            [
              "Geamul de la bucătărie se aburește în timpul gătitului, chiar și cu hota pornită",
              "Gătitul pe plită sau în cuptor eliberează vapori în aer. O hotă cu evacuare în exterior elimină aerul umed, iar în locul lui trebuie să intre aer proaspăt. Dacă ferestrele sunt închise și aportul este redus, o parte din umezeală rămâne în bucătărie și se depune pe sticla rece.",
              "Dacă bucătăria are deja o hotă cu evacuare în exterior sau un canal de ventilație funcțional, aceasta poate fi completată cu o singură valvă de aport. Aerul proaspăt intră prin valvă din exterior, iar aerul umed iese prin hotă sau prin canal. Astfel, bucătăria se ventilează în timpul gătitului fără a deschide fereastra complet și fără a lăsa să intre un curent rece.",
            ],
            [
              "În spatele dulapului de lângă peretele exterior miroase a umezeală sau apar pete întunecate",
              "În spatele mobilierului lipit de peretele rece, aerul circulă slab. Umezeala din acel loc se usucă mai greu.",
              "Ventilația reduce umiditatea din cameră. Dacă lăsați un gol în spatele dulapului, aerul va putea circula mai bine de-a lungul peretelui, iar suprafața se va usca mai repede.",
            ],
          ],
        },
        additional: [
          {
            title: "Cum funcționează micro-ventilația VentPrime",
            description: [
              "Cu tiraj natural, aerul proaspăt intră în cameră printr-o valvă, iar aerul umed iese simultan prin cealaltă. Valvele pot fi lăsate întredeschise ziua și noaptea pentru a ventila încăperea cu ferestrele închise.",
              "Dacă pervazul îngheață sau peretele se udă din cauza unei scurgeri, trebuie eliminată și această cauză. Mucegaiul care a apărut deja se îndepărtează separat.",
            ],
          },
        ],
      },
      ru: {
        metaTitle: "Почему окна запотевают зимой и как помогает вентиляция",
        metaDescription:
          "Конденсат на окнах зимой — это проблема влажности. Узнайте, почему он возникает и как его решает правильная вентиляция.",
        title: "Почему окна запотевают зимой и как помогает вентиляция?",
        excerpt:
          "Зимой батареи прогревают комнату, а стёкла и оконные откосы остаются холоднее. Когда тёплый влажный воздух из комнаты соприкасается с холодным стеклом, он охлаждается, и на стекле появляются капли воды. При слабом воздухообмене влага накапливается, поэтому окна запотевают чаще.",
        table: {
          columns: [
            "Что вы замечаете",
            "Почему это происходит",
            "Как помогает вентиляция",
          ],
          rows: [
            [
              "Утром стёкла мокрые изнутри",
              "Ночью один или два человека спят в спальне с закрытым окном. С каждым выдохом в воздух попадает водяной пар. Если микропроветривания нет,влага накапливается за ночь и оседает на холодном стекле.",
              "При открытых клапанах и наличии тяги свежий воздух поступает в спальню, а влажный выходит наружу. Окно можно держать закрытым всю ночь, и к утру на стекле может быть меньше конденсата.",
            ],
            [
              "В мороз окна запотевают каждый день",
              "Зимой окна подолгу держат закрытыми, чтобы сохранить тепло и избежать холодного сквозняка. При слабом воздухообмене влага от дыхания, готовки, душа и сушки бельяостаётся в доме.",
              "Регулярный приток и вытяжка помогают выводить влагу в течение дня. Если окна запотевают из-за слабого воздухообмена, при достаточной вентиляции конденсат может исчезнуть.",
            ],
            [
              "Откосы и углы сыреют, появляется плесень",
              "Холодные поверхности регулярно намокают и долго не просыхают. Постоянная сырость создаёт условия для роста плесени.",
              "Снижение влажности помогает поверхностям просыхать и уменьшает риск повторного появления плесени после её удаления.",
            ],
            [
              "Окно на кухне запотевает во время готовки, даже когда вытяжка включена",
              "При готовке на плите или в духовке в воздух попадает пар. Вытяжка с выводом наружу удаляет влажный воздух, а на его место должен поступать свежий. Если окна закрыты и притока мало, часть влаги остаётся на кухне и оседает на холодном стекле.",
              "Если на кухне уже есть вытяжка с вызовом наружу или рабочая вентиляционная шахта, можно дополнить её одним приточным клапаном. Через клапан поступает свежий воздух с улицы, а через вытяжку или шахту уходит влажный воздух. Так кухня проветривается во время готовки без необходимости открывать окно настежь и впускать холодный сквозняк.",
            ],
            [
              "За шкафом у наружной стены пахнет сыростью или появляются тёмные пятна",
              "За мебелью, придвинутой вплотную к холодной стене, воздух движется слабо. Влага в этом месте дольше высыхает.",
              "Вентиляция снижает влажность в комнате. Если оставить за шкафом зазор, воздух сможет лучше циркулировать вдоль стены и поверхность будет быстрее просыхать.",
            ],
          ],
        },
        additional: [
          {
            title: "Как работает микропроветривание VentPrime",
            description: [
              "При наличии естественной тяги через один клапан свежий воздух входит в комнату, а через второй одновременно выходит влажный воздух. Клапаны можно оставить приоткрытыми днём и ночью, чтобы проветривать помещение с закрытыми окнами.",
              "Если откос промерзает или стена намокает из-за протечки, нужно устранить и эту причину. Плесень, которая уже появилась, удаляют отдельно.",
            ],
          },
        ],
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
        additional: [
          {
            title: "What an ozonator does",
            description:
              "An ozonator produces ozone — a gas that spreads through the air in the room and reacts with certain substances that cause odours. The result depends on what caused the smell and where its source is. For example, if the contamination has soaked deeply into a carpet, one treatment may not be enough. In that case, separate cleaning or replacement of the material may be needed.",
          },
          {
            title: "Why the room must be empty",
            description:
              "Isolating the room lets the specialist control where the ozone spreads and limit it from reaching neighbouring rooms. During treatment, no people or pets should be in the area, since inhaling ozone can irritate the respiratory tract. After the procedure the room is ventilated, and you can return once a measurement confirms a safe ozone level. This level cannot be determined by smell.",
          },
          {
            title: "What to choose if your home is damp and the windows fog up",
            description:
              "If droplets regularly collect on the glass, the window reveals stay damp, or mould keeps coming back, start with the cause of the moisture. With weak air exchange, supply and extract ventilation help remove humid air regularly. If the cause is a leak, fix it first and dry the damaged area. In this situation, ozone treatment is worth discussing separately — once the dampness is gone but a stubborn smell remains. Tell VentPrime what worries you: condensation on the windows, dampness or a persistent odour. We'll help you work out where to start in your home.",
          },
        ],
        table: {
          title: "When ozone treatment may help",
          columns: ["What you notice", "When ozone treatment makes sense"],
          rows: [
            [
              "A smell remains after smoke",
              "Soot is removed and surfaces are cleaned first. If the smell persists after cleaning, a specialist can assess whether ozone treatment is suitable as an additional treatment.",
            ],
            [
              "A musty smell remains after the dampness is fixed",
              "First the source of moisture is removed, the room is dried and mould is removed. If the smell remains, it is worth finding out where it comes from. Ozone treatment can be considered once the source has been found and eliminated.",
            ],
            [
              "Additional surface treatment is needed after cleaning",
              "In controlled tests, ozone reduced the number of some bacteria. In real rooms the effect varied, so thorough surface cleaning remains the foundation.",
            ],
          ],
        },
      },
      ro: {
        metaTitle:
          "Ozonizarea încăperilor: când ajută și cum decurge tratamentul",
        metaDescription:
          "Ce face ozonizarea, când este utilă după renovare sau pentru mirosuri persistente și cum se pregătește încăperea.",
        title: "Ozonizarea încăperilor. Când ajută și cum decurge tratamentul?",
        excerpt:
          "După curățenie, în cameră încă miroase a fum? Sau a rămas un miros de mucegai după eliminarea umezelii? În astfel de cazuri se poate lua în calcul ozonizarea profesională. Aceasta este un tratament suplimentar al unei încăperi goale, folosit pentru a reduce anumite mirosuri persistente. În condiții controlate, ozonul poate reduce și numărul unor microorganismuri de pe suprafețele deschise.",
        additional: [
          {
            title: "Ce face un ozonator",
            description:
              "Ozonatorul produce ozon — un gaz care se răspândește în aerul încăperii și reacționează cu anumite substanțe care provoacă mirosuri. Rezultatul depinde de cauza mirosului și de locul în care se află sursa acestuia. De exemplu, dacă murdăria a pătruns adânc în covor, o singură tratare poate fi insuficientă. În acest caz, poate fi nevoie de o curățare separată sau de înlocuirea materialului.",
          },
          {
            title: "De ce încăperea trebuie să fie goală",
            description:
              "Izolarea încăperii îi permite specialistului să controleze unde se răspândește ozonul și să limiteze pătrunderea acestuia în camerele învecinate. În timpul tratamentului, în zonă nu trebuie să fie oameni sau animale de companie, deoarece inhalarea ozonului poate irita căile respiratorii. După procedură, încăperea este ventilată, iar revenirea este posibilă după ce o măsurătoare confirmă un nivel sigur de ozon. Acest nivel nu poate fi determinat după miros.",
          },
          {
            title: "Ce să alegeți dacă în casă este umiditate și ferestrele se aburesc",
            description:
              "Dacă pe geam se adună regulat picături, pervazurile rămân umede sau mucegaiul revine, începeți cu cauza umidității. La un schimb de aer slab, aportul și evacuarea ajută la eliminarea regulată a aerului umed. Dacă cauza este o scurgere, remediați-o mai întâi și uscați zona afectată. În această situație, ozonizarea merită discutată separat, după ce umiditatea a fost eliminată, dar a rămas un miros persistent. Spuneți-i VentPrime ce vă îngrijorează: condens pe ferestre, umezeală sau un miros persistent. Vă vom ajuta să stabiliți de unde să începeți în încăperea dumneavoastră.",
          },
        ],
        table: {
          title: "În ce cazuri poate ajuta ozonizarea",
          columns: ["Ce observați", "Când are sens ozonizarea"],
          rows: [
            [
              "A rămas miros după fum",
              "Mai întâi se îndepărtează funinginea și se curăță suprafețele. Dacă mirosul persistă după curățenie, un specialist poate evalua dacă ozonizarea este potrivită ca tratament suplimentar.",
            ],
            [
              "A rămas miros de mucegai după eliminarea umezelii",
              "În primul rând se elimină sursa de umiditate, se usucă încăperea și se îndepărtează mucegaiul. Dacă mirosul rămâne, merită verificat de unde provine. Ozonizarea poate fi luată în calcul după ce sursa a fost găsită și eliminată.",
            ],
            [
              "Este nevoie de o tratare suplimentară a suprafețelor după curățenie",
              "În teste controlate, ozonul a redus numărul unor bacterii. În încăperi reale efectul a variat, prin urmare baza rămâne curățarea temeinică a suprafețelor.",
            ],
          ],
        },
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
        additional: [
          {
            title: "Что делает озонатор",
            description:
              "Озонатор вырабатывает озон — газ, который распространяется по воздуху в комнате и вступает в реакцию с некоторыми веществами, вызывающими запах. Результат зависит от того, чем вызван запах и где находится его источник. Например, если загрязнение глубоко впиталось в ковёр, одной обработки может быть недостаточно. В таком случае может понадобиться отдельная чистка или замена материала.",
          },
          {
            title: "Почему помещение должно быть пустым",
            description:
              "Изоляция помещения позволяет специалисту контролировать, куда распространяется озон, и ограничить его попадание в соседние комнаты. Во время обработки в этой зоне не должно быть людей и домашних животных, поскольку вдыхание озона может раздражать дыхательные пути. После процедуры помещение проветривают, а возвращаться можно после того, как замер подтвердит безопасный уровень озона. По запаху определить этот уровень нельзя.",
          },
          {
            title: "Что выбрать, если дома сыро и запотевают окна",
            description:
              "Если на стёклах регулярно собираются капли, откосы сыреют или плесень возвращается, начните с причины влажности. При слабом воздухообмене приток и вытяжка помогают регулярно выводить влажный воздух. Если причина в протечке, сначала устраняют её и просушивают повреждённый участок. Озонирование в такой ситуации имеет смысл обсуждать отдельно, когда сырость устранена, а стойкий запах ещё остался. Расскажите VentPrime, что вас беспокоит — конденсат на окнах, сырость или стойкий запах. Поможем определить, с чего начать в вашем помещении.",
          },
        ],
        table: {
          title: "В каких случаях озонирование может помочь",
          columns: [
            "Что вы замечаете",
            "Когда имеет смысл озонирование",
          ],
          rows: [
            [
              "После задымления остался запах",
              "Сначала удаляют сажу и очищают поверхности. Если после уборки запах сохраняется, специалист может оценить, подходит ли озонирование для дополнительной обработки.",
            ],
            [
              "После устранения сырости остался затхлый запах",
              "Сначала устраняют источник влаги, просушивают помещение и удаляют плесень. Если запах остаётся, стоит проверить, откуда он идёт. Озонирование можно рассмотреть после того, как источник найден и устранён.",
            ],
            [
              "Нужна дополнительная обработка поверхностей после уборки",
              "В контролируемых испытаниях озон снижал количество некоторых бактерий. В реальных помещениях эффект различался, поэтому основой остаётся тщательная уборка поверхностей.",
            ],
          ],
        },
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
        additional: [
          {
            title: "How natural ventilation works",
            description:
              "In a typical VentPrime setup, we install two wall valves per room. With natural draft, fresh air enters through one valve from outside while room air leaves through the other. The valves work without a fan or electricity. They can be left slightly open day and night, and the degree of opening can be adjusted.",
          },
          {
            title: "Where we install the intake valve",
            description:
              "We usually place it beside the radiator. If there is enough space under the windowsill, the valve can be installed above the radiator. The tube is hidden inside the wall, and only the valve cover with its regulator is visible from the room. For gentle ventilation you can choose a small opening, and open the valve wider when you need more fresh air.",
          },
          {
            title: "Want to ventilate a bedroom, living room or kitchen with the windows closed?",
            description:
              "Tell VentPrime which room you want to ventilate and whether it has a radiator or a working extractor. We'll advise where to place the valves and how much installation will cost.",
          },
        ],
        table: {
          title: "When ventilation helps",
          columns: ["Situation", "How ventilation helps"],
          rows: [
            [
              "The bedroom feels stuffy by morning",
              "Slightly open valves help refresh the air at night while the window stays closed.",
            ],
            [
              "In winter a cold stream is felt when the window is open",
              "We place the intake valve next to the radiator. Incoming air mixes with the warm flow from the working radiator.",
            ],
            [
              "Condensation appears on the windows",
              "Extract ventilation helps remove humid air. If the windows fog up because of weak air exchange, regular ventilation can reduce the amount of condensation.",
            ],
            [
              "There is already a working extractor in the kitchen",
              "If the extractor vents outdoors or there is a working ventilation shaft, a separate intake valve can supply fresh air while cooking.",
            ],
          ],
        },
      },
      ro: {
        metaTitle: "Aer proaspăt cu ferestrele închise: ventilația iarna",
        metaDescription:
          "Cum asigurați aer proaspăt în casă iarna, fără să deschideți ferestrele și fără să pierdeți căldură.",
        title:
          "Aer proaspăt cu ferestrele închise. Cum să ventilați casa iarna",
        excerpt:
          "Situație cunoscută: seara în dormitor este cald, nu vrei să deschizi fereastra, iar dimineața camera este închisă și pe geam apar picături. Ca aerul să se reînnoiască chiar și cu fereastra închisă, în cameră se poate organiza un aport natural și o evacuare.",
        additional: [
          {
            title: "Cum funcționează ventilația naturală",
            description:
              "Într-o schemă tip VentPrime, montăm două valve de perete pentru fiecare cameră. Cu tiraj natural, aerul proaspăt intră printr-o valvă din exterior, iar aerul din cameră iese prin cealaltă. Valvele funcționează fără ventilator și fără electricitate. Pot fi lăsate întredeschise ziua și noaptea, iar gradul de deschidere poate fi reglat.",
          },
          {
            title: "Unde montăm valva de aport",
            description:
              "De obicei o montăm lateral de calorifer. Dacă este suficient loc sub pervaz, valva poate fi instalată deasupra radiatorului. Tubul este ascuns în perete, iar dinspre cameră se vede doar capacul valvei cu regulatorul. Pentru o ventilație ușoară puteți alege o deschidere mică, iar când este nevoie de mai mult aer proaspăt, puteți deschide valva mai mult.",
          },
          {
            title: "Doriți să ventilați dormitorul, sufrageria sau bucătăria cu ferestrele închise?",
            description:
              "Spuneți-i VentPrime ce cameră doriți să ventilați și dacă are calorifer sau o evacuare funcțională. Vă vom spune unde să amplasăm valvele și cât va costa montajul.",
          },
        ],
        table: {
          title: "Când ajută ventilația",
          columns: ["Situația", "Cum ajută ventilația"],
          rows: [
            [
              "Dimineața în dormitor este închis",
              "Valvele întredeschise ajută la reînnoirea aerului noaptea, în timp ce fereastra rămâne închisă.",
            ],
            [
              "Iarna, la fereastra deschisă se simte un curent rece",
              "Montăm valva de aport lângă calorifer. Aerul care intră se amestecă cu fluxul cald de la radiatorul în funcțiune.",
            ],
            [
              "Pe ferestre apare condens",
              "Evacuarea ajută la eliminarea aerului umed. Dacă ferestrele se aburesc din cauza schimbului de aer slab, ventilația regulată poate reduce cantitatea de condens.",
            ],
            [
              "În bucătărie există deja o hotă funcțională",
              "Dacă hota evacuează aerul în exterior sau există un canal de ventilație funcțional, o valvă de aport separată poate asigura intrarea aerului proaspăt în timpul gătitului.",
            ],
          ],
        },
      },
      ru: {
        metaTitle: "Свежий воздух при закрытых окнах: как проветривать зимой",
        metaDescription:
          "Как круглый год обеспечивать дом свежим воздухом зимой, не открывая окна и не теряя тепло.",
        title: "Свежий воздух при закрытых окнах. Как проветривать дом зимой?",
        excerpt:
          "Знакомая ситуация: вечером в спальне тепло, открывать окно не хочется, а к утру в комнате душно и на стекле появляются капли. Чтобы воздух обновлялся даже при закрытом окне, в комнате можно организовать естественный приток и вытяжку.",
        additional: [
          {
            title: "Как работает естественное проветривание",
            description:
              "В типовой схеме VentPrime мы устанавливаем два настенных клапана на комнату. При наличии естественной тяги через один клапан поступает свежий воздух с улицы, а через второй выходит воздух из комнаты. Клапаны работают без вентилятора и электричества. Их можно оставить приоткрытыми днём и ночью и менять степень открытия.",
          },
          {
            title: "Где мы ставим приточный клапан",
            description:
              "Обычно мы размещаем его сбоку от батареи. Если под подоконником хватает места, клапан можно установить над радиатором. Труба скрыта внутри стены, а со стороны комнаты видна только крышка клапана с регулятором. Для лёгкого проветривания можно выбрать небольшое открытие, а когда нужен больший приток, открыть клапан шире.",
          },
          {
            title: "Хотите проветривать спальню, гостиную или кухню с закрытыми окнами?",
            description:
              "Расскажите VentPrime, какую комнату хотите проветривать и есть ли в ней батарея или действующая вытяжка. Подскажем, где разместить клапаны и сколько будет стоить монтаж.",
          },
        ],
        table: {
          title: "В каких случаях помогает вентиляция",
          columns: ["Ситуация", "Как помогает вентиляция"],
          rows: [
            [
              "В спальне душно к утру",
              "Приоткрытые клапаны помогают обновлять воздух ночью, пока окно закрыто.",
            ],
            [
              "Зимой при открытом окне чувствуется холодный поток",
              "Мы ставим приточный клапан рядом с батареей. Входящий воздух смешивается с тёплым потоком от работающего радиатора.",
            ],
            [
              "На окнах появляется конденсат",
              "Вытяжка помогает выводить влажный воздух. Если стёкла запотевают из-за слабого воздухообмена, регулярное проветривание может уменьшить количество конденсата.",
            ],
            [
              "На кухне уже есть рабочая вытяжка",
              "Если вытяжка выводит воздух наружу или есть рабочая вентиляционная шахта, отдельный приточный клапан может обеспечить поступление свежего воздуха во время готовки.",
            ],
          ],
        },
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
