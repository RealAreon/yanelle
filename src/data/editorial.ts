import type { LocalizedString } from "./products";

const L = (
  uk: string,
  en: string,
  pl: string,
  fr: string,
  de: string,
  es: string,
): LocalizedString => ({ uk, en, pl, fr, de, es });

export type Testimonial = {
  id: string;
  quote: LocalizedString;
  name: string;
  role: LocalizedString;
};

export type JournalPost = {
  id: string;
  slug: string;
  category: LocalizedString;
  title: LocalizedString;
  excerpt: LocalizedString;
  image: string;
  date: string;
};

export type ArrivalNote = {
  id: string;
  label: LocalizedString;
  title: LocalizedString;
  body: LocalizedString;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: L(
      "Речі сидять тихо і точно — ніби їх збирали саме під мій ритм. Це рідкісне відчуття в онлайн-магазині.",
      "The pieces sit quietly and precisely — as if assembled for my own rhythm. A rare feeling in an online store.",
      "Rzeczy leżą cicho i precyzyjnie — jakby złożone pod mój rytm. Rzadkie uczucie w sklepie online.",
      "Les pièces tombent juste, sans bruit — comme assemblées pour mon rythme. Une sensation rare en ligne.",
      "Die Teile sitzen ruhig und präzise — als wären sie für meinen Rhythmus gemacht. Selten online.",
      "Las piezas caen en silencio y con precisión — como hechas a mi ritmo. Algo raro en una tienda online.",
    ),
    name: "Olena M.",
    role: L("Київ", "Kyiv", "Kijów", "Kyiv", "Kiew", "Kyiv"),
  },
  {
    id: "t2",
    quote: L(
      "Сумка прийшла в ідеальному стані. Тканина, фурнітура, пропорції — все відчувається «дорогим» без крику.",
      "The bag arrived immaculate. Fabric, hardware, proportion — everything feels expensive without shouting.",
      "Torebka przyszła w idealnym stanie. Tkanina, okucia, proporcje — wszystko czuje się „drogie” bez krzyku.",
      "Le sac est arrivé impeccable. Tissu, ferrures, proportions — tout paraît précieux sans crier.",
      "Die Tasche kam makellos an. Stoff, Beschläge, Proportion — teuer wirkend, ohne zu schreien.",
      "El bolso llegó impecable. Tejido, herrajes, proporción — se siente caro sin gritar.",
    ),
    name: "Maria K.",
    role: L("Варшава", "Warsaw", "Warszawa", "Varsovie", "Warschau", "Varsovia"),
  },
  {
    id: "t3",
    quote: L(
      "Доставка швидка, пакування спокійне. Повернення з відео розпакування пройшло без зайвих питань.",
      "Fast delivery, calm packaging. The return with an unboxing video went through without fuss.",
      "Szybka dostawa, spokojne pakowanie. Zwrot z wideo rozpakowania przebiegł bez zbędnych pytań.",
      "Livraison rapide, emballage sobre. Le retour avec la vidéo de déballage s'est fait sans friction.",
      "Schnelle Lieferung, ruhige Verpackung. Die Rückgabe mit Unboxing-Video verlief ohne Umstände.",
      "Entrega rápida, embalaje sereno. La devolución con vídeo de unboxing fue sencilla.",
    ),
    name: "Anastasiia R.",
    role: L("Львів", "Lviv", "Lwów", "Lviv", "Lwiw", "Leópolis"),
  },
];

export const journalPosts: JournalPost[] = [
  {
    id: "j1",
    slug: "quiet-fabrics",
    category: L("Журнал", "Journal", "Dziennik", "Journal", "Journal", "Diario"),
    title: L(
      "Тканини, що говорять пошепки",
      "Fabrics that speak in a whisper",
      "Tkaniny, które szepczą",
      "Des tissus qui murmurent",
      "Stoffe, die flüstern",
      "Tejidos que hablan en susurro",
    ),
    excerpt: L(
      "Чому тиха розкіш починається з дотику — і як ми обираємо матеріали для капсули сезону.",
      "Why quiet luxury begins with touch — and how we choose materials for the season capsule.",
      "Dlaczego cichy luksus zaczyna się od dotyku — i jak wybieramy materiały do kapsuły sezonu.",
      "Pourquoi le luxe discret commence au toucher — et comment nous choisissons les matières.",
      "Warum ruhiger Luxus mit dem Griff beginnt — und wie wir Materialien wählen.",
      "Por qué el lujo silencioso empieza en el tacto — y cómo elegimos materiales.",
    ),
    image:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=1200&q=80",
    date: "2026-08-01",
  },
  {
    id: "j2",
    slug: "proportion-notes",
    category: L("Стиль", "Style", "Styl", "Style", "Stil", "Estilo"),
    title: L(
      "Нотатки про пропорцію",
      "Notes on proportion",
      "Notatki o proporcji",
      "Notes sur la proportion",
      "Notizen zur Proportion",
      "Notas sobre la proporción",
    ),
    excerpt: L(
      "Довжина, плечі, баланс сумки — невеликі рішення, що змінюють весь силует.",
      "Length, shoulder, bag balance — small decisions that reshape an entire silhouette.",
      "Długość, ramię, balans torebki — małe decyzje, które zmieniają całą sylwetkę.",
      "Longueur, épaule, équilibre du sac — de petits choix qui redessinent la silhouette.",
      "Länge, Schulter, Taschenbalance — kleine Entscheidungen mit großer Wirkung.",
      "Largo, hombro, equilibrio del bolso — pequeñas decisiones que cambian la silueta.",
    ),
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80",
    date: "2026-07-18",
  },
  {
    id: "j3",
    slug: "packing-light",
    category: L("Подорож", "Travel", "Podróż", "Voyage", "Reisen", "Viaje"),
    title: L(
      "Легко пакувати, довго носити",
      "Pack light, wear long",
      "Pakuj lekko, noś długo",
      "Voyager léger, porter longtemps",
      "Leicht packen, lange tragen",
      "Empacar ligero, llevar mucho",
    ),
    excerpt: L(
      "Як зібрати капсулу з 6 речей для тижня між містами — без компромісу з естетикою.",
      "How to build a six-piece capsule for a week between cities — without aesthetic compromise.",
      "Jak złożyć 6-elementową kapsułę na tydzień między miastami — bez kompromisów estetycznych.",
      "Composer une capsule de six pièces pour une semaine entre villes — sans concession.",
      "Eine Sechs-Teile-Kapsel für eine Woche zwischen Städten — ohne ästhetischen Kompromiss.",
      "Cómo armar una cápsula de seis piezas para una semana entre ciudades.",
    ),
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    date: "2026-07-02",
  },
];

export const arrivalNotes: ArrivalNote[] = [
  {
    id: "a1",
    label: L("Новинка", "Just in", "Nowość", "Nouveauté", "Neu", "Novedad"),
    title: L(
      "Кашемірове плаття-обгортка",
      "Cashmere wrap dress",
      "Sukienka kopertowa z kaszmiru",
      "Robe portefeuille en cachemire",
      "Kaschmir-Wickelkleid",
      "Vestido cruzado de cachemira",
    ),
    body: L(
      "М'яка лінія для міжсезоння. Обмежена партія — вже в каталозі.",
      "A soft line for the in-between season. Limited batch — now in the shop.",
      "Miękka linia na międzysezonie. Limitowana partia — już w sklepie.",
      "Une ligne douce pour l'entre-saison. Lot limité — déjà en boutique.",
      "Eine weiche Linie für die Zwischensaison. Limitierte Partie — jetzt im Shop.",
      "Línea suave para la entreestación. Lote limitado — ya en la tienda.",
    ),
  },
  {
    id: "a2",
    label: L("Оновлення", "Update", "Aktualizacja", "Mise à jour", "Update", "Actualización"),
    title: L(
      "Сумки Structured Shoulder",
      "Structured Shoulder bags",
      "Torebki Structured Shoulder",
      "Sacs Structured Shoulder",
      "Structured-Shoulder-Taschen",
      "Bolsos Structured Shoulder",
    ),
    body: L(
      "Нові відтінки stone і cognac. Безкоштовна доставка по Україні.",
      "New stone and cognac tones. Complimentary shipping across Ukraine.",
      "Nowe odcienie stone i cognac. Darmowa dostawa w Ukrainie.",
      "Nouveaux tons stone et cognac. Livraison offerte en Ukraine.",
      "Neue Töne stone und cognac. Kostenloser Versand in der Ukraine.",
      "Nuevos tonos stone y cognac. Envío gratis en Ucrania.",
    ),
  },
  {
    id: "a3",
    label: L("Ательє", "Atelier", "Atelier", "Atelier", "Atelier", "Atelier"),
    title: L(
      "Limited Atelier — друга серія",
      "Limited Atelier — second series",
      "Limited Atelier — druga seria",
      "Limited Atelier — deuxième série",
      "Limited Atelier — zweite Serie",
      "Limited Atelier — segunda serie",
    ),
    body: L(
      "Малі тиражі, ручна перевірка швів. Preforder відкрито на 10 днів.",
      "Small runs, hand-checked seams. Preorder open for ten days.",
      "Małe nakłady, ręczna kontrola szwów. Preorder na 10 dni.",
      "Petites séries, coutures contrôlées à la main. Précommande 10 jours.",
      "Kleine Auflagen, handgeprüfte Nähte. Vorbestellung 10 Tage.",
      "Tiradas pequeñas, costuras revisadas a mano. Preventa 10 días.",
    ),
  },
];
