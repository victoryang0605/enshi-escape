/**
 * Team members (guides) for the About page "Meet the Team" section.
 *
 * TODO(Victor): add real team members here — name, role, photo, bio.
 * Put portrait photos under public/team/ (e.g. public/team/guide-anna.jpg)
 * and reference them as "/team/guide-anna.jpg".
 *
 * IMPORTANT: never invent people — only publish real team members with
 * their consent. The section renders only when this array is non-empty,
 * so leaving it empty is safe.
 */
export interface TeamMember {
  /** Real name */
  name: string;
  /** e.g. "English-speaking guide" */
  role: string;
  /** Photo path under public/, e.g. "/team/guide-anna.jpg" */
  photo: string;
  /** 1–2 sentence bio */
  bio: string;
  /** e.g. ["English", "Chinese"] */
  languages: string[];
  /** e.g. ["Grand Canyon hikes", "Tujia culture"] */
  specialties: string[];
}

export const TEAM: TeamMember[] = [];
