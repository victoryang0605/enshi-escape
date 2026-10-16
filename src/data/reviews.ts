/**
 * Curated traveler reviews for the Testimonials section.
 *
 * TODO(Victor): paste real traveler reviews here once collected
 * (name, country, which tour they took, star rating, date, title, text).
 *
 * IMPORTANT: never invent reviews — only publish genuine guest feedback.
 * The Testimonials section and its Review JSON-LD render only when this
 * array is non-empty, so leaving it empty is safe.
 */
export interface Review {
  /** Guest name (or "Anonymous" if they prefer) */
  name: string;
  /** Guest country, e.g. "Germany" */
  country: string;
  /** Which tour/service they booked, e.g. "The Classic Route" */
  tour: string;
  /** Star rating 1–5 */
  rating: number;
  /** e.g. "2026-09" */
  date: string;
  /** Short headline */
  title: string;
  /** Review text */
  text: string;
}

export const REVIEWS: Review[] = [];
