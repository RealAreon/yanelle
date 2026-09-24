import type { LocalizedString } from "./products";

export interface LookbookEntry {
  id: string;
  slug: string;
  title: LocalizedString;
  image: string;
  productIds: string[];
}

const L = (
  uk: string,
  en: string,
  pl: string,
  fr: string,
  de: string,
  es: string,
): LocalizedString => ({ uk, en, pl, fr, de, es });

export const lookbook: LookbookEntry[] = [
  {
    id: "look-01",
    slug: "morning-light",
    title: L(
      "Ранкове світло",
      "Morning Light",
      "Poranne światło",
      "Lumière du matin",
      "Morgenlicht",
      "Luz de la mañana",
    ),
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80",
    productIds: ["yn-009", "yn-012", "yn-019", "yn-014"],
  },
  {
    id: "look-02",
    slug: "city-calm",
    title: L(
      "Міський спокій",
      "City Calm",
      "Miejski spokój",
      "Calme urbain",
      "Städtische Ruhe",
      "Calma urbana",
    ),
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80",
    productIds: ["yn-004", "yn-010", "yn-016", "yn-021"],
  },
  {
    id: "look-03",
    slug: "soft-structure",
    title: L(
      "М'яка структура",
      "Soft Structure",
      "Miękka struktura",
      "Structure douce",
      "Weiche Struktur",
      "Estructura suave",
    ),
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=80",
    productIds: ["yn-006", "yn-015", "yn-023"],
  },
  {
    id: "look-04",
    slug: "evening-line",
    title: L(
      "Вечірня лінія",
      "Evening Line",
      "Linia wieczorowa",
      "Ligne du soir",
      "Abendlinie",
      "Línea nocturna",
    ),
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1400&q=80",
    productIds: ["yn-003", "yn-017", "yn-020", "yn-024"],
  },
  {
    id: "look-05",
    slug: "gallery-hour",
    title: L(
      "Година галереї",
      "Gallery Hour",
      "Godzina galerii",
      "Heure de galerie",
      "Galerie-Stunde",
      "Hora de galería",
    ),
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=80",
    productIds: ["yn-005", "yn-013", "yn-018"],
  },
  {
    id: "look-06",
    slug: "atelier-quiet",
    title: L(
      "Тиша ательє",
      "Atelier Quiet",
      "Cisza atelier",
      "Silence d'atelier",
      "Atelier-Stille",
      "Quietud de atelier",
    ),
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1400&q=80",
    productIds: ["yn-007", "yn-011", "yn-022", "yn-008"],
  },
  {
    id: "look-07",
    slug: "linen-hour",
    title: L(
      "Година льону",
      "Linen Hour",
      "Godzina lnu",
      "Heure de lin",
      "Leinenstunde",
      "Hora de lino",
    ),
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=80",
    productIds: ["yn-001", "yn-014", "yn-019"],
  },
  {
    id: "look-08",
    slug: "stone-and-silk",
    title: L(
      "Камінь і шовк",
      "Stone & Silk",
      "Kamień i jedwab",
      "Pierre et soie",
      "Stein & Seide",
      "Piedra y seda",
    ),
    image:
      "https://images.unsplash.com/photo-1529139576470-58578d8c0c2a?auto=format&fit=crop&w=1400&q=80",
    productIds: ["yn-002", "yn-016", "yn-021"],
  },
  {
    id: "look-09",
    slug: "weekend-edit",
    title: L(
      "Вікенд-едіт",
      "Weekend Edit",
      "Weekendowa edycja",
      "Édition week-end",
      "Wochenend-Edit",
      "Edición de fin de semana",
    ),
    image:
      "https://images.unsplash.com/photo-1487222477894-8943e31effd6?auto=format&fit=crop&w=1400&q=80",
    productIds: ["yn-008", "yn-012", "yn-015", "yn-023"],
  },
  {
    id: "look-10",
    slug: "ivory-frame",
    title: L(
      "Рамка зі слонової кістки",
      "Ivory Frame",
      "Ramka z kości słoniowej",
      "Cadre ivoire",
      "Elfenbeinrahmen",
      "Marco marfil",
    ),
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80",
    productIds: ["yn-003", "yn-010", "yn-024"],
  },
  {
    id: "look-11",
    slug: "coat-weather",
    title: L(
      "Погода для пальта",
      "Coat Weather",
      "Pogoda na płaszcz",
      "Temps de manteau",
      "Mantelwetter",
      "Tiempo de abrigo",
    ),
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=80",
    productIds: ["yn-007", "yn-017", "yn-020"],
  },
  {
    id: "look-12",
    slug: "quiet-dinner",
    title: L(
      "Тиха вечеря",
      "Quiet Dinner",
      "Cicha kolacja",
      "Dîner tranquille",
      "Ruhiges Abendessen",
      "Cena tranquila",
    ),
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80",
    productIds: ["yn-005", "yn-018", "yn-022", "yn-011"],
  },
];

export function getLookbook(): LookbookEntry[] {
  return lookbook;
}

export function getLookBySlug(slug: string): LookbookEntry | undefined {
  return lookbook.find((l) => l.slug === slug);
}
