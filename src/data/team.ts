/**
 * Team members (partner guides) for the About page "Meet the Team" section.
 *
 * Source: Victor's guide profiles (2026-10-16), compiled from official
 * Hubei/Enshi tourism bureau award announcements. Photos pending —
 * members with an empty `photo` field render an initials placeholder.
 * Put portrait photos under public/team/ (e.g. "/team/xiang-hongxin.jpg").
 */
export interface TeamMember {
  /** Real name */
  name: string;
  /** e.g. "Partner Guide · Enshi Grand Canyon" */
  role: string;
  /** Photo path under public/, e.g. "/team/xiang-hongxin.jpg"; "" = initials placeholder */
  photo: string;
  /** 2–3 sentence bio */
  bio: string;
  /** e.g. ["Chinese (Mandarin)"] */
  languages: string[];
  /** e.g. ["Grand Canyon hikes", "Tujia culture"] */
  specialties: string[];
}

export const TEAM: TeamMember[] = [
  {
    name: "Xiang Hongxin",
    role: "Partner Guide · Enshi Grand Canyon",
    photo: "/team/xianghongxin1.png",
    bio: "A Grand Canyon local born in 1991, Xiang became known as Enshi's first travel livestreamer and now has over a million followers. She won both the Enshi and Hubei provincial guide competitions in 2023 and was named to Hubei's first 'Zhiyin Famous Guide' talent pool.",
    languages: ["Chinese (Mandarin)"],
    specialties: ["Full-region tours", "Tujia culture", "Livestream guiding"],
  },
  {
    name: "Tan Guiying",
    role: "Partner Guide · Enshi Grand Canyon",
    photo: "/team/tanguiying.png",
    bio: "Born in the Grand Canyon in 1982, Tan earned her national guide license in 2011 and is now a gold-medal guide leading an 11-woman Tujia guide team. She was named a National Model Worker in China's tourism system and has appeared on CCTV News.",
    languages: ["Chinese (Mandarin)"],
    specialties: ["Seven Star Village", "Yunlong Fissure", "Cliff walkways"],
  },
  {
    name: "Wang Huaxin",
    role: "Partner Guide · Senior Guide",
    photo: "",
    bio: "A post-2000s Tujia guide who earned senior guide certification in 2025 and joined Hubei's first 'Zhiyin Famous Guide' talent pool. He tailors his narration to each audience — folk legends for seniors, karst geology for study groups.",
    languages: ["Chinese (Mandarin)"],
    specialties: ["Karst geology study tours", "Family groups", "Youth groups"],
  },
  {
    name: "Wang Dandan",
    role: "Partner Guide · Shennong Stream",
    photo: "/team/wangdandan.jpg",
    bio: "Guiding for 23 years, Wang is beloved for her stories of the Three Gorges migration — the submerged riverside land was once her childhood village. She took silver at the 2025 Hubei provincial guide competition.",
    languages: ["Chinese (Mandarin)"],
    specialties: ["Shennong Stream", "Trackers' culture", "Migration narratives"],
  },
  {
    name: "Li Tianya",
    role: "Partner Guide · Gold-Medal Guide",
    photo: "",
    bio: "An Enshi gold-medal guide with over a decade of experience and zero valid complaints on record. He serves as vice-chair of the Enshi guide association and famously bought 60 earpiece audio-guide sets for his guests to use free of charge.",
    languages: ["Chinese (Mandarin)"],
    specialties: ["Tenglong Cave", "Xuan'en slow travel", "Selenium culture"],
  },
  {
    name: "Wen Hongping",
    role: "Partner Guide · Tenglong Cave",
    photo: "",
    bio: "A core guide at the Tenglong Cave scenic area and a member of Hubei's first 'Zhiyin Famous Guide' talent pool. She won Best Image at the 2024 Enshi guide competition and specializes in cave narration.",
    languages: ["Chinese (Mandarin)"],
    specialties: ["Dry cave & water cave", "Light-show narration"],
  },
];
