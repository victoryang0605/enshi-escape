/** YouTube videos embedded on guide pages, keyed by guide slug.
 *  One entry per video — add a line here when a guide gets its video.
 *  Rendered in both places a guide can appear: the static crawler page
 *  (server.ts) and the SPA article page (pages/Article.tsx). */
export interface GuideVideo {
  videoId: string;
  kind: "video" | "short";
  title: string;
  caption: string;
  uploadDate: string; // YYYY-MM-DD
  duration: string; // ISO 8601, e.g. PT5M30S
}

export const guideVideos: Record<string, GuideVideo> = {
  "enshi-vs-zhangjiajie": {
    videoId: "WSqJK81sznY",
    kind: "video",
    title: "Enshi vs Zhangjiajie: Which One Should You Visit?",
    caption:
      "Our video comparison — watch the two destinations side by side before you decide.",
    uploadDate: "2026-11-13",
    duration: "PT5M30S",
  },
  "pingshan-canyon-floating-boat-guide": {
    videoId: "CQjOuuqAAkg",
    kind: "short",
    title:
      "A Boat That Looks Like It's Floating in Mid-Air — Pingshan Canyon, Enshi, China",
    caption:
      "The floating boats of Pingshan Canyon — the water is so clear the boats look like they're floating in mid-air.",
    uploadDate: "2026-11-25",
    duration: "PT13S",
  },
};
