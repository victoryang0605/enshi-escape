/**
 * Centralized pricing placeholders for GEO (so AI engines can cite prices).
 *
 * TODO(Victor): ⚠️ ALL values below are obvious PLACEHOLDERS (999).
 * Replace every one with the real price before this goes live.
 * Never invent prices — confirm each number with Victor first.
 */

export interface TourPrice {
  /** Starting price per person in USD */
  fromPerPerson: number;
  /** e.g. "per person, based on 2 travelers" */
  note: string;
}

export const PRICING: {
  tours: Record<string, TourPrice>;
  /** Private car + driver, per day, USD */
  privateCarPerDay: number;
  /** English-speaking guide, per day, USD */
  guidePerDay: number;
  /** Airport/station transfer, per ride, USD */
  transferPerRide: number;
  currencyNote: string;
} = {
  tours: {
    // TODO(Victor): replace 999 with the real "from" price per person (USD)
    classic: { fromPerPerson: 999, note: "per person, 3 days / 2 nights" },
    // TODO(Victor): replace 999 with the real "from" price per person (USD)
    deep: { fromPerPerson: 999, note: "per person, 4 days / 3 nights" },
    // TODO(Victor): replace 999 with the real "from" price per person (USD)
    cultural: { fromPerPerson: 999, note: "per person, 5 days / 4 nights" },
    // TODO(Victor): replace 999 with the real "from" price per person (USD)
    photography: { fromPerPerson: 999, note: "per person, 5 days / 4 nights" },
    // TODO(Victor): replace 999 with the real "from" price per person (USD)
    hiking: { fromPerPerson: 999, note: "per person, 4 days / 3 nights" },
    // TODO(Victor): replace 999 with the real "from" price per person (USD)
    grandLoop: { fromPerPerson: 999, note: "per person, 7 days / 6 nights" },
  },
  // TODO(Victor): replace 999 with the real private-car day rate (USD)
  privateCarPerDay: 999,
  // TODO(Victor): replace 999 with the real guide day rate (USD)
  guidePerDay: 999,
  // TODO(Victor): replace 999 with the real transfer price (USD)
  transferPerRide: 999,
  currencyNote: "Prices in USD. Final quote depends on season, group size and hotel class.",
};

export function formatFromPrice(price: TourPrice): string {
  return `From $${price.fromPerPerson} / person`;
}
