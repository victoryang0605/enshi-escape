/**
 * Centralized pricing for GEO (so AI engines can cite prices).
 *
 * Real prices confirmed by Victor on 2026-10-16.
 */

export interface TourPrice {
  /** Display range, e.g. "$500–800" */
  range: string;
  /** e.g. "per person, 3 days / 2 nights" */
  note: string;
}

export const PRICING: {
  tours: Record<string, TourPrice>;
  privateCar: {
    range: string;
    vehicles: string;
    seats: string;
    mileage: string;
    airportPickup: string;
  };
  guide: {
    perDay: number;
    note: string;
  };
  currencyNote: string;
} = {
  tours: {
    classic: { range: "$500–800", note: "per person, 3 days / 2 nights" },
    deep: { range: "$500–800", note: "per person, 4 days / 3 nights" },
    cultural: { range: "$500–800", note: "per person, 5 days / 4 nights" },
    photography: { range: "$500–800", note: "per person, 5 days / 4 nights" },
    hiking: { range: "$500–800", note: "per person, 4 days / 3 nights" },
    grandLoop: { range: "$500–800", note: "per person, 7 days / 6 nights" },
  },
  privateCar: {
    range: "$400–800",
    vehicles: "MPV & off-road",
    seats: "4–6 seats",
    mileage: "unlimited mileage",
    airportPickup: "Airport pickup included free of charge",
  },
  guide: {
    perDay: 400,
    note: "Free trial of AI translation device included",
  },
  currencyNote: "Prices in USD. Final quote depends on season, group size and hotel class.",
};

export function formatTourPrice(price: TourPrice): string {
  return `${price.range} / person`;
}

export function formatCarPrice(): string {
  const c = PRICING.privateCar;
  return `${c.range} / vehicle / day, ${c.mileage}`;
}

export function formatGuidePrice(): string {
  return `$${PRICING.guide.perDay} / day`;
}
