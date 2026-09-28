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
  rating: 4 | 5;
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
    rating: 5,
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
    rating: 5,
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
    rating: 5,
  },
  {
    id: "t4",
    quote: L(
      "Купила кашемірове плаття — сідає м'яко, без зайвого блиску. Саме той тихий люкс, якого шукала.",
      "Bought the cashmere dress — soft fit, no unnecessary shine. Exactly the quiet luxury I was looking for.",
      "Kupiłam sukienkę z kaszmiru — miękkie dopasowanie, bez zbędnego blasku. Dokładnie ten cichy luksus.",
      "J'ai pris la robe en cachemire — tombé doux, sans éclat inutile. Exactement le luxe discret voulu.",
      "Das Kaschmirkleid sitzt weich, ohne unnötigen Glanz. Genau der ruhige Luxus, den ich suchte.",
      "El vestido de cachemira cae suave, sin brillo innecesario. Exactamente el lujo silencioso que buscaba.",
    ),
    name: "Iryna S.",
    role: L("Одеса", "Odesa", "Odessa", "Odessa", "Odessa", "Odesa"),
    rating: 5,
  },
  {
    id: "t5",
    quote: L(
      "Сервіс уважний, консультація по розміру допомогла. Віднімаю зірку лише за довше очікування доставки.",
      "Attentive service, the size advice helped. One star less only for a slightly longer delivery wait.",
      "Uważna obsługa, konsultacja rozmiaru pomogła. Jedną gwiazdkę mniej tylko za dłuższe czekanie.",
      "Service attentif, le conseil taille a aidé. Une étoile en moins seulement pour l'attente livraison.",
      "Aufmerksamer Service, die Größenberatung half. Ein Stern weniger nur wegen längerer Lieferung.",
      "Servicio atento, el consejo de talla ayudó. Una estrella menos solo por una entrega más lenta.",
    ),
    name: "Sofiia P.",
    role: L("Харків", "Kharkiv", "Charków", "Kharkiv", "Charkiw", "Járkov"),
    rating: 4,
  },
  {
    id: "t6",
    quote: L(
      "Пальто тримає форму другий сезон. Шов і підкладка — без претензій, просто якісно.",
      "The coat still holds its shape in the second season. Seams and lining — unshowy, simply well made.",
      "Płaszcz trzyma formę drugi sezon. Szwy i podszewka — bez pretensji, po prostu solidnie.",
      "Le manteau tient la forme au second saison. Coutures et doublure — sans ostentation, juste bien faits.",
      "Der Mantel hält die Form in der zweiten Saison. Nähte und Futter — schlicht und gut gemacht.",
      "El abrigo mantiene la forma en la segunda temporada. Costuras y forro — sin alarde, bien hechos.",
    ),
    name: "Kateryna L.",
    role: L("Дніпро", "Dnipro", "Dniepr", "Dnipro", "Dnipro", "Dnipró"),
    rating: 5,
  },
  {
    id: "t7",
    quote: L(
      "Lookbook і сайт — спокійні. Замовлення прийшло акуратно, але колір сумки трохи тепліший за фото.",
      "Lookbook and site feel calm. The order arrived neatly, though the bag color is a touch warmer than the photo.",
      "Lookbook i strona — spokojne. Zamówienie przyszło starannie, kolor torebki trochę cieplejszy niż na zdjęciu.",
      "Lookbook et site apaisants. Commande soignée, la couleur du sac un peu plus chaude que sur la photo.",
      "Lookbook und Seite wirken ruhig. Bestellung sauber, Taschenfarbe etwas wärmer als auf dem Foto.",
      "Lookbook y sitio serenos. Pedido cuidado; el color del bolso un poco más cálido que en la foto.",
    ),
    name: "Yuliia N.",
    role: L("Вінниця", "Vinnytsia", "Winnica", "Vinnytsia", "Winnyzja", "Vínnitsa"),
    rating: 4,
  },
  {
    id: "t8",
    quote: L(
      "Подарунок для мами: пакування без зайвого шуму, річ відчувається зібраною з увагою. Дякую.",
      "A gift for my mother: quiet packaging, a piece that feels assembled with care. Thank you.",
      "Prezent dla mamy: spokojne pakowanie, rzecz złożona z uwagą. Dziękuję.",
      "Cadeau pour ma mère : emballage discret, pièce assemblée avec soin. Merci.",
      "Geschenk für meine Mutter: ruhige Verpackung, mit Sorgfalt gemacht. Danke.",
      "Regalo para mi madre: embalaje sereno, pieza hecha con cuidado. Gracias.",
    ),
    name: "Daryna V.",
    role: L("Чернівці", "Chernivtsi", "Czerniowce", "Tchernivtsi", "Tscherniwzi", "Chernivtsí"),
    rating: 5,
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
