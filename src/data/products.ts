export type Locale = "uk" | "en" | "pl" | "fr" | "de" | "es";
export type Currency = "UAH" | "USD" | "EUR";
export type Category =
  | "dresses"
  | "suits"
  | "outerwear"
  | "blouses"
  | "skirts"
  | "bags"
  | "belts"
  | "scarves"
  | "wallets"
  | "eyewear";

export interface LocalizedString {
  uk: string;
  en: string;
  pl: string;
  fr: string;
  de: string;
  es: string;
}

export interface ProductVariant {
  id: string;
  size?: string;
  color: LocalizedString;
  colorHex: string;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  category: Category;
  collectionIds: string[];
  priceUAH: number;
  compareAtUAH?: number;
  images: string[];
  materials: LocalizedString;
  care: LocalizedString;
  sizes?: string[];
  colors: { name: LocalizedString; hex: string }[];
  variants: ProductVariant[];
  tags: ("new" | "sale" | "limited")[];
  featured?: boolean;
  limited?: boolean;
}

export type ProductFilters = {
  category?: Category | Category[];
  collectionId?: string;
  tags?: ("new" | "sale" | "limited")[];
  featured?: boolean;
  limited?: boolean;
  minPriceUAH?: number;
  maxPriceUAH?: number;
  search?: string;
};

const L = (
  uk: string,
  en: string,
  pl: string,
  fr: string,
  de: string,
  es: string,
): LocalizedString => ({ uk, en, pl, fr, de, es });

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const ivory = L("Слонова кістка", "Ivory", "Kość słoniowa", "Ivoire", "Elfenbein", "Marfil");
const black = L("Чорний", "Black", "Czarny", "Noir", "Schwarz", "Negro");
const camel = L("Верблюд", "Camel", "Wielbłądzi", "Camel", "Kamel", "Camel");
const stone = L("Камінь", "Stone", "Kamień", "Pierre", "Stein", "Piedra");
const espresso = L("Еспресо", "Espresso", "Espresso", "Espresso", "Espresso", "Espresso");
const softWhite = L("М'який білий", "Soft White", "Miękka biel", "Blanc doux", "Weiches Weiß", "Blanco suave");
const taupe = L("Тауп", "Taupe", "Taupe", "Taupe", "Taupe", "Topo");
const sand = L("Пісок", "Sand", "Piasek", "Sable", "Sand", "Arena");
const champagne = L("Шампань", "Champagne", "Szampan", "Champagne", "Champagner", "Champán");
const navy = L("Темно-синій", "Navy", "Granatowy", "Marine", "Navy", "Azul marino");
const cognac = L("Коньяк", "Cognac", "Koniak", "Cognac", "Cognac", "Coñac");
const olive = L("Олива", "Olive", "Oliwkowy", "Olive", "Oliv", "Oliva");
const tortoise = L(
  "Черепаховий",
  "Tortoise",
  "Żółwiowy",
  "Écaille",
  "Schildpatt",
  "Carey",
);

const dryClean = L(
  "Лише хімчистка. Зберігати на плічках у чохлі.",
  "Dry clean only. Store on a hanger in a garment bag.",
  "Tylko pranie chemiczne. Przechowywać na wieszaku w pokrowcu.",
  "Nettoyage à sec uniquement. Ranger sur cintre dans une housse.",
  "Nur chemische Reinigung. Auf Bügel in einer Hülle aufbewahren.",
  "Solo limpieza en seco. Guardar en percha con funda.",
);

const leatherCare = L(
  "Протирати м'якою сухою тканиною. Уникати вологи та прямого сонця.",
  "Wipe with a soft dry cloth. Avoid moisture and direct sunlight.",
  "Przecierać miękką suchą ściereczką. Unikać wilgoci i bezpośredniego słońca.",
  "Essuyer avec un chiffon doux et sec. Éviter l'humidité et le soleil direct.",
  "Mit weichem trockenem Tuch abwischen. Feuchtigkeit und direkte Sonne meiden.",
  "Limpiar con un paño suave y seco. Evitar humedad y sol directo.",
);

const gentleWash = L(
  "Делікатне прання вручну в холодній воді. Сушити горизонтально.",
  "Hand wash cold, delicate. Dry flat.",
  "Prać ręcznie w zimnej wodzie. Suszyć na płasko.",
  "Lavage à la main à l'eau froide. Sécher à plat.",
  "Kalt von Hand waschen. Flach trocknen.",
  "Lavar a mano con agua fría. Secar en plano.",
);

function variantsFor(
  productId: string,
  colors: { name: LocalizedString; hex: string }[],
  sizes: string[] | undefined,
  stockBase: number,
): ProductVariant[] {
  const list: ProductVariant[] = [];
  for (const color of colors) {
    if (sizes && sizes.length > 0) {
      for (const size of sizes) {
        list.push({
          id: `${productId}-${color.hex.replace("#", "")}-${size.toLowerCase().replace(/\s+/g, "")}`,
          size,
          color: color.name,
          colorHex: color.hex,
          stock: stockBase + (size === "M" || size === "One Size" ? 2 : 0),
        });
      }
    } else {
      list.push({
        id: `${productId}-${color.hex.replace("#", "")}`,
        color: color.name,
        colorHex: color.hex,
        stock: stockBase,
      });
    }
  }
  return list;
}

const clothingSizes = ["XS", "S", "M", "L", "XL"];
const oneSize = ["One Size"];

export const products: Product[] = [
  {
    id: "yn-001",
    slug: "silk-column-dress",
    name: L(
      "Шовкова колона",
      "Silk Column Dress",
      "Jedwabna kolumna",
      "Robe colonne en soie",
      "Seidene Säulenrobe",
      "Vestido columna de seda",
    ),
    description: L(
      "Довга колона з важкого шовку з чистою лінією та прихованою застібкою. Тиха розкіш для вечора та дня.",
      "A floor-length column in heavy silk with a clean line and hidden closure. Quiet luxury for evening and day.",
      "Długa kolumna z ciężkiego jedwabiu o czystej linii i ukrytym zapięciu. Cicha luksusowość na wieczór i dzień.",
      "Colonne longue en soie lourde, ligne pure et fermeture dissimulée. Luxe discret pour le soir et le jour.",
      "Bodenlange Säule aus schwerer Seide mit klarer Linie und verstecktem Verschluss. Ruhiger Luxus für Abend und Tag.",
      "Columna larga de seda pesada con línea limpia y cierre oculto. Lujo silencioso para noche y día.",
    ),
    category: "dresses",
    collectionIds: ["evening-edit", "capsule-essentials"],
    priceUAH: 14500,
    images: [
      img("photo-1595777457583-95e059d581b8"),
      img("photo-1566174053879-31528523f8ae"),
    ],
    materials: L(
      "100% шовк. Підкладка: 100% віскоза.",
      "100% silk. Lining: 100% viscose.",
      "100% jedwab. Podszewka: 100% wiskoza.",
      "100 % soie. Doublure : 100 % viscose.",
      "100 % Seide. Futter: 100 % Viskose.",
      "100 % seda. Forro: 100 % viscosa.",
    ),
    care: dryClean,
    sizes: clothingSizes,
    colors: [
      { name: black, hex: "#1A1A1A" },
      { name: ivory, hex: "#F5F0E8" },
    ],
    variants: [],
    tags: ["new"],
    featured: true,
  },
  {
    id: "yn-002",
    slug: "cashmere-wrap-dress",
    name: L(
      "Кашемірова сукня-обгортка",
      "Cashmere Wrap Dress",
      "Sukienka kopertowa z kaszmiru",
      "Robes cache-cœur en cachemire",
      "Kaschmir-Wickelkleid",
      "Vestido envolvente de cachemir",
    ),
    description: L(
      "М'яка обгортка з кашеміру з поясом. Силует, що повторює тіло без зайвого.",
      "A soft cashmere wrap with a self-tie belt. A silhouette that follows the body without excess.",
      "Miękka kopertówka z kaszmiru z paskiem. Sylwetka, która podąża za ciałem bez nadmiaru.",
      "Cache-cœur souple en cachemire avec ceinture. Une silhouette qui épouse le corps sans superflu.",
      "Weiches Kaschmir-Wickelkleid mit Gürtel. Eine Silhouette, die dem Körper folgt – ohne Überfluss.",
      "Envolvente suave de cachemir con cinturón. Una silueta que sigue el cuerpo sin exceso.",
    ),
    category: "dresses",
    collectionIds: ["capsule-essentials"],
    priceUAH: 16800,
    images: [
      img("photo-1572804013309-59a88b7e92f1"),
      img("photo-1496747611176-843222e1e57c"),
    ],
    materials: L(
      "90% кашемір, 10% шовк.",
      "90% cashmere, 10% silk.",
      "90% kaszmir, 10% jedwab.",
      "90 % cachemire, 10 % soie.",
      "90 % Kaschmir, 10 % Seide.",
      "90 % cachemir, 10 % seda.",
    ),
    care: dryClean,
    sizes: clothingSizes,
    colors: [
      { name: camel, hex: "#C4A484" },
      { name: stone, hex: "#A8A29E" },
    ],
    variants: [],
    tags: ["new"],
    featured: true,
  },
  {
    id: "yn-003",
    slug: "bias-cut-satin-dress",
    name: L(
      "Атласна сукня по косій",
      "Bias-Cut Satin Dress",
      "Sukienka satynowa cięta na skos",
      "Robe satin biais",
      "Satin-Kleid im Schrägschnitt",
      "Vestido satén corte al bies",
    ),
    description: L(
      "Легка атласна сукня, зрізана по косій. Обмежена серія ательє.",
      "A fluid satin dress cut on the bias. Limited atelier edition.",
      "Płynna satynowa sukienka cięta na skos. Limitowana edycja atelier.",
      "Robe fluide en satin coupée en biais. Édition atelier limitée.",
      "Fließendes Satinkleid im Schrägschnitt. Limitierte Atelier-Edition.",
      "Vestido fluido de satén cortado al bies. Edición limitada de atelier.",
    ),
    category: "dresses",
    collectionIds: ["evening-edit", "limited-atelier"],
    priceUAH: 15200,
    images: [
      img("photo-1566174053879-31528523f8ae"),
      img("photo-1515372039744-b8f02a3ae446"),
    ],
    materials: L(
      "100% ацетатний атлас.",
      "100% acetate satin.",
      "100% satyna acetatowa.",
      "100 % satin acétate.",
      "100 % Acetat-Satin.",
      "100 % satén de acetato.",
    ),
    care: dryClean,
    sizes: clothingSizes,
    colors: [
      { name: champagne, hex: "#E8D5B7" },
      { name: black, hex: "#1A1A1A" },
    ],
    variants: [],
    tags: ["limited"],
    featured: true,
    limited: true,
  },
  {
    id: "yn-004",
    slug: "tailored-wool-suit",
    name: L(
      "Вовняний костюм",
      "Tailored Wool Suit",
      "Wełniany garnitur",
      "Tailleur laine",
      "Wollanzug",
      "Traje de lana",
    ),
    description: L(
      "Двокомпонентний костюм з італійської вовни. Жакет з м'яким плечем і прямі штани.",
      "A two-piece suit in Italian wool. Soft-shoulder jacket and straight trousers.",
      "Dwuczęściowy garnitur z włoskiej wełny. Żakiet z miękkim barkiem i proste spodnie.",
      "Tailleur deux pièces en laine italienne. Veste à épaule douce et pantalon droit.",
      "Zweiteiliger Anzug aus italienischer Wolle. Jacke mit weicher Schulter und gerade Hose.",
      "Traje de dos piezas en lana italiana. Chaqueta de hombro suave y pantalón recto.",
    ),
    category: "suits",
    collectionIds: ["capsule-essentials"],
    priceUAH: 18900,
    images: [
      img("photo-1594938298603-c8148c4dae35"),
      img("photo-1507679799987-c73779587ccf"),
    ],
    materials: L(
      "100% вовна. Підкладка: 100% купро.",
      "100% wool. Lining: 100% cupro.",
      "100% wełna. Podszewka: 100% cupro.",
      "100 % laine. Doublure : 100 % cupro.",
      "100 % Wolle. Futter: 100 % Cupro.",
      "100 % lana. Forro: 100 % cupro.",
    ),
    care: dryClean,
    sizes: clothingSizes,
    colors: [
      { name: black, hex: "#1A1A1A" },
      { name: stone, hex: "#A8A29E" },
      { name: navy, hex: "#1E2A44" },
    ],
    variants: [],
    tags: [],
    featured: true,
  },
  {
    id: "yn-005",
    slug: "fluid-trouser-suit",
    name: L(
      "Рідкий брючний костюм",
      "Fluid Trouser Suit",
      "Płynny garnitur spodniowy",
      "Tailleur pantalon fluide",
      "Fließender Hosenanzug",
      "Traje pantalón fluido",
    ),
    description: L(
      "Костюм з крепу з розслабленим кроєм. Для днів, коли структура стає м'якшою.",
      "A crepe suit with a relaxed cut. For days when structure softens.",
      "Garnitur z krepy o luźnym kroju. Na dni, gdy struktura staje się miększa.",
      "Tailleur en crêpe à coupe détendue. Pour les jours où la structure s'assouplit.",
      "Anzug aus Crêpe mit entschnittener Form. Für Tage, an denen Struktur weicher wird.",
      "Traje de crepé de corte relajado. Para días en que la estructura se suaviza.",
    ),
    category: "suits",
    collectionIds: ["evening-edit", "capsule-essentials"],
    priceUAH: 16200,
    compareAtUAH: 19800,
    images: [
      img("photo-1552374196-1ab2a1c593e8"),
      img("photo-1487222477894-8943e31ef7b2"),
    ],
    materials: L(
      "97% віскоза, 3% еластан.",
      "97% viscose, 3% elastane.",
      "97% wiskoza, 3% elastan.",
      "97 % viscose, 3 % élasthanne.",
      "97 % Viskose, 3 % Elasthan.",
      "97 % viscosa, 3 % elastano.",
    ),
    care: dryClean,
    sizes: clothingSizes,
    colors: [
      { name: taupe, hex: "#8B7E74" },
      { name: black, hex: "#1A1A1A" },
    ],
    variants: [],
    tags: ["sale"],
  },
  {
    id: "yn-006",
    slug: "double-face-coat",
    name: L(
      "Двостороннє пальто",
      "Double-Face Coat",
      "Płaszcz dwustronny",
      "Manteau double face",
      "Wendbarer Mantel",
      "Abrigo reversible",
    ),
    description: L(
      "Двостороннє пальто з кашеміру без зайвих швів. Архітектура спокою.",
      "A reversible cashmere coat with minimal seams. Architecture of calm.",
      "Odwracalny płaszcz z kaszmiru z minimalnymi szwami. Architektura spokoju.",
      "Manteau réversible en cachemire aux coutures minimales. Architecture du calme.",
      "Wendbarer Kaschmirmantel mit minimalen Nähten. Architektur der Ruhe.",
      "Abrigo reversible de cachemir con costuras mínimas. Arquitectura de la calma.",
    ),
    category: "outerwear",
    collectionIds: ["capsule-essentials", "limited-atelier"],
    priceUAH: 24500,
    images: [
      img("photo-1539533018447-63fcce2678e3"),
      img("photo-1544022613-e87ca75a784a"),
    ],
    materials: L(
      "100% кашемір, двостороння тканина.",
      "100% cashmere, double-face cloth.",
      "100% kaszmir, tkanina dwustronna.",
      "100 % cachemire, tissu double face.",
      "100 % Kaschmir, beidseitiger Stoff.",
      "100 % cachemir, tejido reversible.",
    ),
    care: dryClean,
    sizes: clothingSizes,
    colors: [
      { name: camel, hex: "#C4A484" },
      { name: black, hex: "#1A1A1A" },
    ],
    variants: [],
    tags: ["limited"],
    featured: true,
    limited: true,
  },
  {
    id: "yn-007",
    slug: "soft-leather-trench",
    name: L(
      "Шкіряний тренч",
      "Soft Leather Trench",
      "Skórzany trencz",
      "Trench cuir souple",
      "Weicher Ledermantel",
      "Gabardina de cuero suave",
    ),
    description: L(
      "Тренч з м'якої шкіри наппа з поясом. Силует класики без шуму.",
      "A nappa leather trench with belt. Classic silhouette without noise.",
      "Trencz z miękkiej skóry nappa z paskiem. Klasyczna sylwetka bez hałasu.",
      "Trench en cuir nappa souple avec ceinture. Silhouette classique sans bruit.",
      "Trench aus weichem Nappaleder mit Gürtel. Klassische Silhouette ohne Lärm.",
      "Gabardina de napa suave con cinturón. Silueta clásica sin ruido.",
    ),
    category: "outerwear",
    collectionIds: ["evening-edit"],
    priceUAH: 22800,
    images: [
      img("photo-1551028719-00167b16eac5"),
      img("photo-1521223890158-f9f7c3d5d504"),
    ],
    materials: L(
      "100% шкіра наппа. Підкладка: 100% віскоза.",
      "100% nappa leather. Lining: 100% viscose.",
      "100% skóra nappa. Podszewka: 100% wiskoza.",
      "100 % cuir nappa. Doublure : 100 % viscose.",
      "100 % Nappaleder. Futter: 100 % Viskose.",
      "100 % cuero napa. Forro: 100 % viscosa.",
    ),
    care: leatherCare,
    sizes: clothingSizes,
    colors: [
      { name: black, hex: "#1A1A1A" },
      { name: cognac, hex: "#8B4513" },
    ],
    variants: [],
    tags: ["new"],
  },
  {
    id: "yn-008",
    slug: "wool-cape-coat",
    name: L(
      "Вовняне пальто-накидка",
      "Wool Cape Coat",
      "Wełniane ponczo-płaszcz",
      "Manteau cape en laine",
      "Woll-Cape-Mantel",
      "Abrigo capa de lana",
    ),
    description: L(
      "Пальто-накидка з щільної вовни. Об'єм без ваги.",
      "A cape coat in dense wool. Volume without weight.",
      "Płaszcz-cape z gęstej wełny. Objętość bez ciężaru.",
      "Manteau cape en laine dense. Volume sans poids.",
      "Cape-Mantel aus dichter Wolle. Volumen ohne Gewicht.",
      "Abrigo capa en lana densa. Volumen sin peso.",
    ),
    category: "outerwear",
    collectionIds: ["limited-atelier"],
    priceUAH: 17500,
    images: [
      img("photo-1483985988355-763728e1935b"),
      img("photo-1469334031218-e382a71b716b"),
    ],
    materials: L(
      "80% вовна, 20% кашемір.",
      "80% wool, 20% cashmere.",
      "80% wełna, 20% kaszmir.",
      "80 % laine, 20 % cachemire.",
      "80 % Wolle, 20 % Kaschmir.",
      "80 % lana, 20 % cachemir.",
    ),
    care: dryClean,
    sizes: clothingSizes,
    colors: [
      { name: stone, hex: "#A8A29E" },
      { name: olive, hex: "#6B705C" },
    ],
    variants: [],
    tags: ["limited"],
    limited: true,
  },
  {
    id: "yn-009",
    slug: "silk-charmeuse-blouse",
    name: L(
      "Блуза з шовкового шармезу",
      "Silk Charmeuse Blouse",
      "Bluzka z jedwabnego charmeuse",
      "Chemisier charmeuse soie",
      "Seiden-Charmeuse-Bluse",
      "Blusa de charmeuse de seda",
    ),
    description: L(
      "Блуза з шовкового шармезу з прихованими ґудзиками та м'яким коміром.",
      "A silk charmeuse blouse with hidden buttons and a soft collar.",
      "Bluzka z jedwabnego charmeuse z ukrytymi guzikami i miękkim kołnierzykiem.",
      "Chemisier en charmeuse de soie à boutons dissimulés et col doux.",
      "Bluse aus Seiden-Charmeuse mit versteckten Knöpfen und weichem Kragen.",
      "Blusa de charmeuse de seda con botones ocultos y cuello suave.",
    ),
    category: "blouses",
    collectionIds: ["capsule-essentials"],
    priceUAH: 7200,
    images: [
      img("photo-1564257631407-4deb1f99d992"),
      img("photo-1434389677669-e08b4cac3105"),
    ],
    materials: L("100% шовк.", "100% silk.", "100% jedwab.", "100 % soie.", "100 % Seide.", "100 % seda."),
    care: dryClean,
    sizes: clothingSizes,
    colors: [
      { name: softWhite, hex: "#FAF8F5" },
      { name: ivory, hex: "#F5F0E8" },
      { name: black, hex: "#1A1A1A" },
    ],
    variants: [],
    tags: ["new"],
    featured: true,
  },
  {
    id: "yn-010",
    slug: "cotton-poplin-shirt",
    name: L(
      "Бавовняна сорочка поплін",
      "Cotton Poplin Shirt",
      "Bawełniana koszula popelina",
      "Chemise popeline coton",
      "Baumwoll-Popeline-Hemd",
      "Camisa de popelín de algodón",
    ),
    description: L(
      "Чистокроєна сорочка з єгипетської бавовни. Основа капсули.",
      "A clean-cut shirt in Egyptian cotton. Capsule foundation.",
      "Czysto skrojona koszula z egipskiej bawełny. Fundament kapsuły.",
      "Chemise au coupe nette en coton égyptien. Fondement de la capsule.",
      "Klar geschnittenes Hemd aus ägyptischer Baumwolle. Kapsel-Fundament.",
      "Camisa de corte limpio en algodón egipcio. Base de la cápsula.",
    ),
    category: "blouses",
    collectionIds: ["capsule-essentials"],
    priceUAH: 5400,
    images: [
      img("photo-1596755094514-f87e34085b2c"),
      img("photo-1583743814966-8936f5b7be1a"),
    ],
    materials: L(
      "100% єгипетська бавовна.",
      "100% Egyptian cotton.",
      "100% bawełna egipska.",
      "100 % coton égyptien.",
      "100 % ägyptische Baumwolle.",
      "100 % algodón egipcio.",
    ),
    care: gentleWash,
    sizes: clothingSizes,
    colors: [
      { name: softWhite, hex: "#FAF8F5" },
      { name: sand, hex: "#D4C4A8" },
    ],
    variants: [],
    tags: [],
  },
  {
    id: "yn-011",
    slug: "draped-crepe-blouse",
    name: L(
      "Драпірована крепова блуза",
      "Draped Crepe Blouse",
      "Drapowana bluzka z krepy",
      "Chemisier crêpe drapé",
      "Drapierte Crêpe-Bluse",
      "Blusa de crepé drapeada",
    ),
    description: L(
      "Блуза з крепу з асиметричним драпіруванням. М'який об'єм біля шиї.",
      "A crepe blouse with asymmetric draping. Soft volume at the neck.",
      "Bluzka z krepy z asymetrycznym drapowaniem. Miękka objętość przy szyi.",
      "Chemisier en crêpe au drapé asymétrique. Volume doux au cou.",
      "Crêpe-Bluse mit asymmetrischem Drapé. Weiches Volumen am Hals.",
      "Blusa de crepé con drapeado asimétrico. Volumen suave en el cuello.",
    ),
    category: "blouses",
    collectionIds: ["evening-edit"],
    priceUAH: 6100,
    compareAtUAH: 7800,
    images: [
      img("photo-1554568218-0f1715e72254"),
      img("photo-1434389677669-e08b4cac3105"),
    ],
    materials: L(
      "100% віскозний креп.",
      "100% viscose crepe.",
      "100% krepa wiskozowa.",
      "100 % crêpe viscose.",
      "100 % Viskose-Crêpe.",
      "100 % crepé de viscosa.",
    ),
    care: dryClean,
    sizes: clothingSizes,
    colors: [
      { name: champagne, hex: "#E8D5B7" },
      { name: black, hex: "#1A1A1A" },
    ],
    variants: [],
    tags: ["sale"],
  },
  {
    id: "yn-012",
    slug: "a-line-wool-skirt",
    name: L(
      "Вовняна спідниця А-силуету",
      "A-Line Wool Skirt",
      "Wełniana spódnica A-line",
      "Jupe laine trapèze",
      "Wollrock A-Linie",
      "Falda de lana en A",
    ),
    description: L(
      "Спідниця А-силуету з тонкої вовни до міді. Чиста лінія та прихована блискавка.",
      "An A-line midi skirt in fine wool. Clean line and hidden zip.",
      "Spódnica A-line midi z cienkiej wełny. Czysta linia i ukryty zamek.",
      "Jupe trapèze midi en laine fine. Ligne pure et zip dissimulé.",
      "A-Linien-Midi-Rock aus feiner Wolle. Klare Linie und versteckter Reißverschluss.",
      "Falda midi en A de lana fina. Línea limpia y cremallera oculta.",
    ),
    category: "skirts",
    collectionIds: ["capsule-essentials"],
    priceUAH: 6800,
    images: [
      img("photo-1583496661160-fb5886a0aaaa"),
      img("photo-1572804013427-4d7ca7268217"),
    ],
    materials: L(
      "100% вовна.",
      "100% wool.",
      "100% wełna.",
      "100 % laine.",
      "100 % Wolle.",
      "100 % lana.",
    ),
    care: dryClean,
    sizes: clothingSizes,
    colors: [
      { name: black, hex: "#1A1A1A" },
      { name: camel, hex: "#C4A484" },
    ],
    variants: [],
    tags: [],
  },
  {
    id: "yn-013",
    slug: "midi-leather-skirt",
    name: L(
      "Шкіряна міді-спідниця",
      "Midi Leather Skirt",
      "Skórzana spódnica midi",
      "Jupe cuir midi",
      "Leder-Midi-Rock",
      "Falda midi de cuero",
    ),
    description: L(
      "Пряма міді-спідниця з м'якої шкіри. Легка вага, точна довжина.",
      "A straight midi skirt in soft leather. Light weight, precise length.",
      "Prosta spódnica midi z miękkiej skóry. Lekka waga, precyzyjna długość.",
      "Jupe midi droite en cuir souple. Léger, longueur précise.",
      "Gerader Midi-Rock aus weichem Leder. Leicht, präzise Länge.",
      "Falda midi recta de cuero suave. Ligera, longitud precisa.",
    ),
    category: "skirts",
    collectionIds: ["evening-edit", "limited-atelier"],
    priceUAH: 9800,
    images: [
      img("photo-1515886657613-9f3515b0c78f"),
      img("photo-1509631179647-0177331693ae"),
    ],
    materials: L(
      "100% шкіра ягняти.",
      "100% lamb leather.",
      "100% skóra jagnięca.",
      "100 % cuir d'agneau.",
      "100 % Lammleder.",
      "100 % cuero de cordero.",
    ),
    care: leatherCare,
    sizes: clothingSizes,
    colors: [
      { name: black, hex: "#1A1A1A" },
      { name: espresso, hex: "#3C2415" },
    ],
    variants: [],
    tags: ["new", "limited"],
    limited: true,
  },
  {
    id: "yn-014",
    slug: "structured-tote",
    name: L(
      "Структурована тоут-сумка",
      "Structured Tote",
      "Strukturalna torba tote",
      "Cabas structuré",
      "Strukturierte Tote",
      "Tote estructurado",
    ),
    description: L(
      "Тоут з жорсткою формою з італійської шкіри. Вміщує день без компромісів.",
      "A structured tote in Italian leather. Holds the day without compromise.",
      "Strukturalna torba tote z włoskiej skóry. Mieści dzień bez kompromisów.",
      "Cabas structuré en cuir italien. Contient la journée sans compromis.",
      "Strukturierte Tote aus italienischem Leder. Trägt den Tag ohne Kompromisse.",
      "Tote estructurado en cuero italiano. Contiene el día sin compromisos.",
    ),
    category: "bags",
    collectionIds: ["capsule-essentials"],
    priceUAH: 18500,
    images: [
      img("photo-1584917865442-de89df76afd3"),
      img("photo-1590874103328-eac38a67429a"),
    ],
    materials: L(
      "100% італійська шкіра. Фурнітура з палладію.",
      "100% Italian leather. Palladium hardware.",
      "100% włoska skóra. Okucia palladowe.",
      "100 % cuir italien. Quincaillerie palladium.",
      "100 % italienisches Leder. Palladium-Beschläge.",
      "100 % cuero italiano. Herrajes de paladio.",
    ),
    care: leatherCare,
    sizes: oneSize,
    colors: [
      { name: black, hex: "#1A1A1A" },
      { name: camel, hex: "#C4A484" },
      { name: stone, hex: "#A8A29E" },
    ],
    variants: [],
    tags: [],
    featured: true,
  },
  {
    id: "yn-015",
    slug: "soft-hobo-bag",
    name: L(
      "М'яка сумка-хобо",
      "Soft Hobo Bag",
      "Miękka torba hobo",
      "Sac hobo souple",
      "Weiche Hobo-Tasche",
      "Bolso hobo suave",
    ),
    description: L(
      "М'який хобо з зернистої шкіри. Спадний силует і довгий ремінь.",
      "A soft hobo in grained leather. Slouch silhouette and long strap.",
      "Miękki hobo ze skóry ziarnistej. Opadająca sylwetka i długi pasek.",
      "Hobo souple en cuir grainé. Silhouette tombante et longue bandoulière.",
      "Weicher Hobo aus genarbtem Leder. Fallende Silhouette und langer Riemen.",
      "Hobo suave de cuero graneado. Silueta caída y correa larga.",
    ),
    category: "bags",
    collectionIds: ["capsule-essentials"],
    priceUAH: 14200,
    images: [
      img("photo-1584917865442-de89df76afd3"),
      img("photo-1566150905458-1bf1fc113f0d"),
    ],
    materials: L(
      "100% зерниста шкіра теляти.",
      "100% grained calf leather.",
      "100% ziarnista skóra cielęca.",
      "100 % cuir de veau grainé.",
      "100 % genarbtes Kalbsleder.",
      "100 % cuero de ternera graneado.",
    ),
    care: leatherCare,
    sizes: oneSize,
    colors: [
      { name: espresso, hex: "#3C2415" },
      { name: black, hex: "#1A1A1A" },
    ],
    variants: [],
    tags: ["new"],
  },
  {
    id: "yn-016",
    slug: "mini-crossbody",
    name: L(
      "Міні-кросбоді",
      "Mini Crossbody",
      "Mini crossbody",
      "Mini sac bandoulière",
      "Mini-Umhängetasche",
      "Mini bandolera",
    ),
    description: L(
      "Компактна кросбоді з регульованим ременем. Для рук, що залишаються вільними.",
      "A compact crossbody with adjustable strap. For hands that stay free.",
      "Kompaktowa crossbody z regulowanym paskiem. Dla rąk, które pozostają wolne.",
      "Bandoulière compacte à sangle réglable. Pour les mains qui restent libres.",
      "Kompakte Umhängetasche mit verstellbarem Riemen. Für Hände, die frei bleiben.",
      "Bandolera compacta con correa ajustable. Para manos que permanecen libres.",
    ),
    category: "bags",
    collectionIds: ["capsule-essentials", "evening-edit"],
    priceUAH: 9800,
    images: [
      img("photo-1591561954557-26941169b49e"),
      img("photo-1584917865442-de89df76afd3"),
    ],
    materials: L(
      "100% гладка шкіра теляти.",
      "100% smooth calf leather.",
      "100% gładka skóra cielęca.",
      "100 % cuir de veau lisse.",
      "100 % glattes Kalbsleder.",
      "100 % cuero de ternera liso.",
    ),
    care: leatherCare,
    sizes: oneSize,
    colors: [
      { name: black, hex: "#1A1A1A" },
      { name: cognac, hex: "#8B4513" },
      { name: sand, hex: "#D4C4A8" },
    ],
    variants: [],
    tags: ["new"],
    featured: true,
  },
  {
    id: "yn-017",
    slug: "evening-clutch",
    name: L(
      "Вечірній клатч",
      "Evening Clutch",
      "Kopertówka wieczorowa",
      "Pochette de soirée",
      "Abendclutch",
      "Clutch de noche",
    ),
    description: L(
      "Плоский клатч з сатиновою підкладкою. Обмежена серія ательє.",
      "A flat clutch with satin lining. Limited atelier edition.",
      "Płaska kopertówka z satynową podszewką. Limitowana edycja atelier.",
      "Pochette plate doublée de satin. Édition atelier limitée.",
      "Flacher Clutch mit Satin-Futter. Limitierte Atelier-Edition.",
      "Clutch plano con forro de satén. Edición limitada de atelier.",
    ),
    category: "bags",
    collectionIds: ["evening-edit", "limited-atelier"],
    priceUAH: 11200,
    images: [
      img("photo-1590874103328-eac38a683ce7"),
      img("photo-1590874103328-eac38a67429a"),
    ],
    materials: L(
      "100% шкіра. Підкладка: шовковий сатин.",
      "100% leather. Lining: silk satin.",
      "100% skóra. Podszewka: jedwabny satyna.",
      "100 % cuir. Doublure : satin de soie.",
      "100 % Leder. Futter: Seidensatin.",
      "100 % cuero. Forro: satén de seda.",
    ),
    care: leatherCare,
    sizes: oneSize,
    colors: [
      { name: black, hex: "#1A1A1A" },
      { name: champagne, hex: "#E8D5B7" },
    ],
    variants: [],
    tags: ["limited"],
    limited: true,
  },
  {
    id: "yn-018",
    slug: "classic-shoulder-bag",
    name: L(
      "Класична сумка на плече",
      "Classic Shoulder Bag",
      "Klasyczna torba na ramię",
      "Sac porté épaule classique",
      "Klassische Schultertasche",
      "Bolso de hombro clásico",
    ),
    description: L(
      "Сумка середнього розміру з коротким ременем. Вічна форма.",
      "A mid-size shoulder bag with short strap. Timeless form.",
      "Torba średniej wielkości z krótkim paskiem. Ponadczasowa forma.",
      "Sac d'épaule moyen à courte bandoulière. Forme intemporelle.",
      "Mittelgroße Schultertasche mit kurzem Riemen. Zeitlose Form.",
      "Bolso de hombro mediano con correa corta. Forma atemporal.",
    ),
    category: "bags",
    collectionIds: ["capsule-essentials"],
    priceUAH: 12800,
    compareAtUAH: 15900,
    images: [
      img("photo-1594633312681-425c7b97ccd1"),
      img("photo-1584917865442-de89df76afd3"),
    ],
    materials: L(
      "100% італійська шкіра.",
      "100% Italian leather.",
      "100% włoska skóra.",
      "100 % cuir italien.",
      "100 % italienisches Leder.",
      "100 % cuero italiano.",
    ),
    care: leatherCare,
    sizes: oneSize,
    colors: [
      { name: taupe, hex: "#8B7E74" },
      { name: black, hex: "#1A1A1A" },
    ],
    variants: [],
    tags: ["sale"],
  },
  {
    id: "yn-019",
    slug: "slim-leather-belt",
    name: L(
      "Тонкий шкіряний ремінь",
      "Slim Leather Belt",
      "Wąski skórzany pasek",
      "Ceinture cuir fine",
      "Schmaler Ledergürtel",
      "Cinturón de cuero fino",
    ),
    description: L(
      "Тонкий ремінь з гладкої шкіри з мінімалістичною пряжкою.",
      "A slim belt in smooth leather with a minimal buckle.",
      "Wąski pasek z gładkiej skóry z minimalistyczną klamrą.",
      "Ceinture fine en cuir lisse à boucle minimale.",
      "Schmaler Gürtel aus glattem Leder mit minimaler Schnalle.",
      "Cinturón fino de cuero liso con hebilla mínima.",
    ),
    category: "belts",
    collectionIds: ["capsule-essentials"],
    priceUAH: 4200,
    images: [
      img("photo-1553062407-98eeb64c6a62"),
      img("photo-1624222247344-550fb60583fd"),
    ],
    materials: L(
      "100% шкіра теляти. Пряжка: латунь з покриттям.",
      "100% calf leather. Buckle: coated brass.",
      "100% skóra cielęca. Klamra: mosiądz pokryty.",
      "100 % cuir de veau. Boucle : laiton enduit.",
      "100 % Kalbsleder. Schnalle: beschichtetes Messing.",
      "100 % cuero de ternera. Hebilla: latón revestido.",
    ),
    care: leatherCare,
    sizes: ["70", "75", "80", "85", "90"],
    colors: [
      { name: black, hex: "#1A1A1A" },
      { name: cognac, hex: "#8B4513" },
    ],
    variants: [],
    tags: [],
  },
  {
    id: "yn-020",
    slug: "sculptural-buckle-belt",
    name: L(
      "Ремінь зі скульптурною пряжкою",
      "Sculptural Buckle Belt",
      "Pasek z rzeźbiarską klamrą",
      "Ceinture boucle sculpturale",
      "Gürtel mit skulpturaler Schnalle",
      "Cinturón con hebilla escultural",
    ),
    description: L(
      "Широкий ремінь зі скульптурною пряжкою. Обмежена серія.",
      "A wide belt with a sculptural buckle. Limited edition.",
      "Szeroki pasek z rzeźbiarską klamrą. Edycja limitowana.",
      "Ceinture large à boucle sculpturale. Édition limitée.",
      "Breiter Gürtel mit skulpturaler Schnalle. Limitierte Edition.",
      "Cinturón ancho con hebilla escultural. Edición limitada.",
    ),
    category: "belts",
    collectionIds: ["limited-atelier", "evening-edit"],
    priceUAH: 5800,
    images: [
      img("photo-1624222247344-550fb60583fd"),
      img("photo-1553062407-98eeb64c6a62"),
    ],
    materials: L(
      "100% шкіра. Пряжка: полірований палладій.",
      "100% leather. Buckle: polished palladium.",
      "100% skóra. Klamra: polerowany pallad.",
      "100 % cuir. Boucle : palladium poli.",
      "100 % Leder. Schnalle: poliertes Palladium.",
      "100 % cuero. Hebilla: paladio pulido.",
    ),
    care: leatherCare,
    sizes: ["70", "75", "80", "85", "90"],
    colors: [
      { name: black, hex: "#1A1A1A" },
      { name: espresso, hex: "#3C2415" },
    ],
    variants: [],
    tags: ["limited"],
    limited: true,
  },
  {
    id: "yn-021",
    slug: "cashmere-scarf",
    name: L(
      "Кашеміровий шарф",
      "Cashmere Scarf",
      "Szalik kaszmirowy",
      "Écharpe cachemire",
      "Kaschmirschal",
      "Bufanda de cachemir",
    ),
    description: L(
      "Великий шарф з монгольського кашеміру. Легкість і тепло без ваги.",
      "An oversized scarf in Mongolian cashmere. Warmth without weight.",
      "Duży szalik z mongolskiego kaszmiru. Ciepło bez ciężaru.",
      "Grande écharpe en cachemire mongol. Chaleur sans poids.",
      "Übergroßer Schal aus mongolischem Kaschmir. Wärme ohne Gewicht.",
      "Bufanda oversized de cachemir mongol. Calor sin peso.",
    ),
    category: "scarves",
    collectionIds: ["capsule-essentials"],
    priceUAH: 6500,
    images: [
      img("photo-1553062407-98eeb64c6a62"),
      img("photo-1601924994987-69e26d50dc26"),
    ],
    materials: L(
      "100% монгольський кашемір.",
      "100% Mongolian cashmere.",
      "100% kaszmir mongolski.",
      "100 % cachemire mongol.",
      "100 % mongolischer Kaschmir.",
      "100 % cachemir mongol.",
    ),
    care: gentleWash,
    sizes: oneSize,
    colors: [
      { name: camel, hex: "#C4A484" },
      { name: softWhite, hex: "#FAF8F5" },
      { name: stone, hex: "#A8A29E" },
    ],
    variants: [],
    tags: ["new"],
    featured: true,
  },
  {
    id: "yn-022",
    slug: "silk-square-scarf",
    name: L(
      "Шовкова хустка",
      "Silk Square Scarf",
      "Jedwabna chusta",
      "Carré de soie",
      "Seidenes Tuch",
      "Pañuelo de seda",
    ),
    description: L(
      "Квадратна хустка з друкованого шовку. Абстрактний мотив у стриманих тонах.",
      "A square scarf in printed silk. Abstract motif in restrained tones.",
      "Kwadratowa chusta z drukowanego jedwabiu. Abstrakcyjny motyw w stonowanych tonach.",
      "Carré en soie imprimée. Motif abstrait en tons retenus.",
      "Quadratisches Tuch aus bedruckter Seide. Abstraktes Motiv in zurückhaltenden Tönen.",
      "Pañuelo cuadrado de seda estampada. Motivo abstracto en tonos contenidos.",
    ),
    category: "scarves",
    collectionIds: ["evening-edit", "limited-atelier"],
    priceUAH: 4800,
    images: [
      img("photo-1601924994987-69e26d50dc26"),
      img("photo-1553062407-98eeb64c6a62"),
    ],
    materials: L("100% шовк.", "100% silk.", "100% jedwab.", "100 % soie.", "100 % Seide.", "100 % seda."),
    care: dryClean,
    sizes: oneSize,
    colors: [
      { name: champagne, hex: "#E8D5B7" },
      { name: olive, hex: "#6B705C" },
    ],
    variants: [],
    tags: ["limited"],
    limited: true,
  },
  {
    id: "yn-023",
    slug: "bifold-wallet",
    name: L(
      "Гаманець біфолд",
      "Bifold Wallet",
      "Portfel bifold",
      "Portefeuille bifold",
      "Bifold-Geldbörse",
      "Cartera bifold",
    ),
    description: L(
      "Компактний біфолд з італійської шкіри. Тонкий профіль, точні кишені.",
      "A compact bifold in Italian leather. Slim profile, precise pockets.",
      "Kompaktowy bifold z włoskiej skóry. Smukły profil, precyzyjne kieszenie.",
      "Bifold compact en cuir italien. Profil mince, poches précises.",
      "Kompaktes Bifold aus italienischem Leder. Schlankes Profil, präzise Fächer.",
      "Bifold compacto de cuero italiano. Perfil delgado, bolsillos precisos.",
    ),
    category: "wallets",
    collectionIds: ["capsule-essentials"],
    priceUAH: 5200,
    images: [
      img("photo-1627123424574-724758594e93"),
      img("photo-1553062407-98eeb64c6a62"),
    ],
    materials: L(
      "100% італійська шкіра.",
      "100% Italian leather.",
      "100% włoska skóra.",
      "100 % cuir italien.",
      "100 % italienisches Leder.",
      "100 % cuero italiano.",
    ),
    care: leatherCare,
    sizes: oneSize,
    colors: [
      { name: black, hex: "#1A1A1A" },
      { name: cognac, hex: "#8B4513" },
    ],
    variants: [],
    tags: [],
  },
  {
    id: "yn-024",
    slug: "architectural-sunglasses",
    name: L(
      "Архітектурні окуляри",
      "Architectural Sunglasses",
      "Okulary architektoniczne",
      "Lunettes architecturales",
      "Architektonische Sonnenbrille",
      "Gafas arquitectónicas",
    ),
    description: L(
      "Окуляри з ацетату з мінімалістичною формою. UV400, обмежена серія.",
      "Acetate sunglasses with a minimal form. UV400, limited edition.",
      "Okulary z acetatu o minimalistycznej formie. UV400, edycja limitowana.",
      "Lunettes en acétate à forme minimale. UV400, édition limitée.",
      "Sonnenbrille aus Acetat mit minimaler Form. UV400, limitierte Edition.",
      "Gafas de acetato de forma mínima. UV400, edición limitada.",
    ),
    category: "eyewear",
    collectionIds: ["limited-atelier", "evening-edit"],
    priceUAH: 7200,
    images: [
      img("photo-1572635196237-14b3f281503f"),
      img("photo-1572635196237-14b3f281503f"),
    ],
    materials: L(
      "Італійський ацетат. Лінзи: мінеральне скло з UV400.",
      "Italian acetate. Lenses: mineral glass with UV400.",
      "Włoski acetat. Soczewki: szkło mineralne z UV400.",
      "Acétate italien. Verres : verre minéral UV400.",
      "Italienisches Acetat. Gläser: Mineralglas mit UV400.",
      "Acetato italiano. Lentes: cristal mineral con UV400.",
    ),
    care: L(
      "Зберігати у футлярі. Чистити м'якою тканиною.",
      "Store in case. Clean with a soft cloth.",
      "Przechowywać w etui. Czyścić miękką ściereczką.",
      "Ranger dans l'étui. Nettoyer avec un chiffon doux.",
      "Im Etui aufbewahren. Mit weichem Tuch reinigen.",
      "Guardar en el estuche. Limpiar con un paño suave.",
    ),
    sizes: oneSize,
    colors: [
      { name: black, hex: "#1A1A1A" },
      { name: tortoise, hex: "#8B5A2B" },
    ],
    variants: [],
    tags: ["limited", "new"],
    featured: true,
    limited: true,
  },
];

for (const product of products) {
  product.variants = variantsFor(
    product.id,
    product.colors,
    product.sizes,
    product.limited ? 3 : 8,
  );
}

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function filterProducts(filters: ProductFilters = {}): Product[] {
  let result = [...products];

  if (filters.category) {
    const cats = Array.isArray(filters.category)
      ? filters.category
      : [filters.category];
    result = result.filter((p) => cats.includes(p.category));
  }

  if (filters.collectionId) {
    result = result.filter((p) =>
      p.collectionIds.includes(filters.collectionId!),
    );
  }

  if (filters.tags?.length) {
    result = result.filter((p) =>
      filters.tags!.some((t) => p.tags.includes(t)),
    );
  }

  if (filters.featured !== undefined) {
    result = result.filter((p) => Boolean(p.featured) === filters.featured);
  }

  if (filters.limited !== undefined) {
    result = result.filter((p) => Boolean(p.limited) === filters.limited);
  }

  if (filters.minPriceUAH !== undefined) {
    result = result.filter((p) => p.priceUAH >= filters.minPriceUAH!);
  }

  if (filters.maxPriceUAH !== undefined) {
    result = result.filter((p) => p.priceUAH <= filters.maxPriceUAH!);
  }

  if (filters.search?.trim()) {
    const q = filters.search.trim().toLowerCase();
    result = result.filter((p) => {
      const hay = [
        p.slug,
        ...Object.values(p.name),
        ...Object.values(p.description),
        p.category,
        ...p.tags,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }

  return result;
}
