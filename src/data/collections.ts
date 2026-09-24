import type { LocalizedString } from "./products";

export interface Collection {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  productIds: string[];
  image: string;
}

const L = (
  uk: string,
  en: string,
  pl: string,
  fr: string,
  de: string,
  es: string,
): LocalizedString => ({ uk, en, pl, fr, de, es });

export const collections: Collection[] = [
  {
    id: "capsule-essentials",
    slug: "capsule-essentials",
    name: L(
      "Капсульні основи",
      "Capsule Essentials",
      "Kapsułowe podstawy",
      "Essentiels capsule",
      "Kapsel-Essentials",
      "Esenciales cápsula",
    ),
    description: L(
      "Тихі форми, які повертаються щосезону. Вовна, шовк, шкіра — без шуму.",
      "Quiet forms that return each season. Wool, silk, leather — without noise.",
      "Ciche formy, które wracają co sezon. Wełna, jedwab, skóra — bez hałasu.",
      "Formes tranquilles qui reviennent chaque saison. Laine, soie, cuir — sans bruit.",
      "Ruhige Formen, die jede Saison wiederkehren. Wolle, Seide, Leder — ohne Lärm.",
      "Formas tranquilas que regresan cada temporada. Lana, seda, cuero — sin ruido.",
    ),
    productIds: [
      "yn-001",
      "yn-002",
      "yn-004",
      "yn-005",
      "yn-006",
      "yn-009",
      "yn-010",
      "yn-012",
      "yn-014",
      "yn-015",
      "yn-016",
      "yn-018",
      "yn-019",
      "yn-021",
      "yn-023",
    ],
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "evening-edit",
    slug: "evening-edit",
    name: L(
      "Вечірня редакція",
      "Evening Edit",
      "Edycja wieczorowa",
      "Édition du soir",
      "Abend-Edition",
      "Edición nocturna",
    ),
    description: L(
      "М'яке світло, атлас і стримана драма. Для вечорів, що не потребують доказів.",
      "Soft light, satin, and restrained drama. For evenings that need no proof.",
      "Miękkie światło, satyna i powściągliwa dramaturgia. Na wieczory, które nie potrzebują dowodów.",
      "Lumière douce, satin et drame retenu. Pour les soirs qui n'ont rien à prouver.",
      "Weiches Licht, Satin und zurückhaltendes Drama. Für Abende, die nichts beweisen müssen.",
      "Luz suave, satén y drama contenido. Para noches que no necesitan pruebas.",
    ),
    productIds: [
      "yn-001",
      "yn-003",
      "yn-005",
      "yn-007",
      "yn-011",
      "yn-013",
      "yn-016",
      "yn-017",
      "yn-020",
      "yn-022",
      "yn-024",
    ],
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "limited-atelier",
    slug: "limited-atelier",
    name: L(
      "Обмежене ательє",
      "Limited Atelier",
      "Limitowane atelier",
      "Atelier limité",
      "Limitiertes Atelier",
      "Atelier limitado",
    ),
    description: L(
      "Малі тиражі й особливі матеріали. Речі, які не повторюються.",
      "Small runs and singular materials. Pieces that do not repeat.",
      "Małe nakłady i wyjątkowe materiały. Rzeczy, które się nie powtarzają.",
      "Petites séries et matières singulières. Des pièces qui ne se répètent pas.",
      "Kleine Auflagen und besondere Materialien. Stücke, die sich nicht wiederholen.",
      "Tiradas pequeñas y materiales singulares. Piezas que no se repiten.",
    ),
    productIds: [
      "yn-003",
      "yn-006",
      "yn-008",
      "yn-013",
      "yn-017",
      "yn-020",
      "yn-022",
      "yn-024",
    ],
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=80",
  },
];

export function getCollections(): Collection[] {
  return collections;
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getCollectionById(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}
