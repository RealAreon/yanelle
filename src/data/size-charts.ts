import type { LocalizedString } from "./products";

export interface ClothingSizeRow {
  label: string;
  eu: string;
  ua: string;
  bustCm: string;
  waistCm: string;
  hipsCm: string;
}

export interface BagDimension {
  id: string;
  productSlug?: string;
  name: LocalizedString;
  heightCm: number;
  widthCm: number;
  depthCm: number;
  strapDropCm?: number;
}

const L = (
  uk: string,
  en: string,
  pl: string,
  fr: string,
  de: string,
  es: string,
): LocalizedString => ({ uk, en, pl, fr, de, es });

/** Women's clothing size chart (EU / UA). */
export const clothingSizeChart: ClothingSizeRow[] = [
  {
    label: "XS",
    eu: "34",
    ua: "40",
    bustCm: "80–84",
    waistCm: "60–64",
    hipsCm: "86–90",
  },
  {
    label: "S",
    eu: "36",
    ua: "42",
    bustCm: "84–88",
    waistCm: "64–68",
    hipsCm: "90–94",
  },
  {
    label: "M",
    eu: "38",
    ua: "44",
    bustCm: "88–92",
    waistCm: "68–72",
    hipsCm: "94–98",
  },
  {
    label: "L",
    eu: "40",
    ua: "46",
    bustCm: "92–96",
    waistCm: "72–76",
    hipsCm: "98–102",
  },
  {
    label: "XL",
    eu: "42",
    ua: "48",
    bustCm: "96–100",
    waistCm: "76–80",
    hipsCm: "102–106",
  },
];

export const clothingSizeNotes: LocalizedString = L(
  "Розміри орієнтовні. Якщо ви між двома розмірами, оберіть більший для вільного силуету.",
  "Sizes are approximate. If between sizes, choose the larger for a relaxed fit.",
  "Rozmiary orientacyjne. Jeśli jesteś między rozmiarami, wybierz większy dla luźniejszego kroju.",
  "Tailles indicatives. Entre deux tailles, choisissez la plus grande pour une coupe détendue.",
  "Größen sind Richtwerte. Zwischen zwei Größen die größere für eine entspannte Passform wählen.",
  "Tallas orientativas. Entre dos tallas, elija la mayor para un corte relajado.",
);

export const beltSizeChart: { label: string; waistCm: string }[] = [
  { label: "70", waistCm: "66–70" },
  { label: "75", waistCm: "71–75" },
  { label: "80", waistCm: "76–80" },
  { label: "85", waistCm: "81–85" },
  { label: "90", waistCm: "86–90" },
];

/** Bag dimensions in centimetres. */
export const bagDimensions: BagDimension[] = [
  {
    id: "bag-structured-tote",
    productSlug: "structured-tote",
    name: L(
      "Структурована тоут-сумка",
      "Structured Tote",
      "Strukturalna torba tote",
      "Cabas structuré",
      "Strukturierte Tote",
      "Tote estructurado",
    ),
    heightCm: 32,
    widthCm: 38,
    depthCm: 14,
    strapDropCm: 24,
  },
  {
    id: "bag-soft-hobo",
    productSlug: "soft-hobo-bag",
    name: L(
      "М'яка сумка-хобо",
      "Soft Hobo Bag",
      "Miękka torba hobo",
      "Sac hobo souple",
      "Weiche Hobo-Tasche",
      "Bolso hobo suave",
    ),
    heightCm: 28,
    widthCm: 36,
    depthCm: 12,
    strapDropCm: 32,
  },
  {
    id: "bag-mini-crossbody",
    productSlug: "mini-crossbody",
    name: L(
      "Міні-кросбоді",
      "Mini Crossbody",
      "Mini crossbody",
      "Mini sac bandoulière",
      "Mini-Umhängetasche",
      "Mini bandolera",
    ),
    heightCm: 16,
    widthCm: 22,
    depthCm: 7,
    strapDropCm: 50,
  },
  {
    id: "bag-evening-clutch",
    productSlug: "evening-clutch",
    name: L(
      "Вечірній клатч",
      "Evening Clutch",
      "Kopertówka wieczorowa",
      "Pochette de soirée",
      "Abendclutch",
      "Clutch de noche",
    ),
    heightCm: 14,
    widthCm: 26,
    depthCm: 4,
  },
  {
    id: "bag-classic-shoulder",
    productSlug: "classic-shoulder-bag",
    name: L(
      "Класична сумка на плече",
      "Classic Shoulder Bag",
      "Klasyczna torba na ramię",
      "Sac porté épaule classique",
      "Klassische Schultertasche",
      "Bolso de hombro clásico",
    ),
    heightCm: 24,
    widthCm: 30,
    depthCm: 10,
    strapDropCm: 26,
  },
];

export const bagSizeNotes: LocalizedString = L(
  "Розміри вказані у сантиметрах. Довжина ременя — від плеча до верхнього краю сумки.",
  "Dimensions are in centimetres. Strap drop is measured from shoulder to top edge.",
  "Wymiary podane w centymetrach. Długość paska mierzona od ramienia do górnej krawędzi.",
  "Dimensions en centimètres. La longueur de bandoulière va de l'épaule au bord supérieur.",
  "Maße in Zentimetern. Die Riemenlänge wird von der Schulter zur Oberkante gemessen.",
  "Dimensiones en centímetros. La caída de la correa se mide del hombro al borde superior.",
);
