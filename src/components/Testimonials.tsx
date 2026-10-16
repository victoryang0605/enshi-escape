import { Helmet } from "react-helmet-async";
import { Star } from "lucide-react";
import { REVIEWS } from "../data/reviews";

const SITE_URL = "https://www.enshiescape.com";

/**
 * Testimonials section. Renders nothing (no placeholder content) until
 * Victor adds real reviews to src/data/reviews.ts. Review / AggregateRating
 * JSON-LD is emitted only when review data exists.
 */
export default function Testimonials() {
  if (REVIEWS.length === 0) return null;

  const avg = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#organization`,
    name: "Enshi Escapes",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg,
      reviewCount: REVIEWS.length,
      bestRating: "5",
    },
    review: REVIEWS.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.date,
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.rating),
        bestRating: "5",
      },
      name: r.title,
      reviewBody: r.text,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <section className="py-20 bg-white border-t border-[#eee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block uppercase tracking-[2px] text-[11px] text-theme-accent font-bold mb-4">
              Traveler Stories
            </span>
            <h2 className="font-serif text-[36px] text-theme-primary">
              What Our Guests Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className="p-8 border border-[#eee] rounded-[4px] bg-theme-bg flex flex-col"
              >
                <div className="flex gap-1 mb-4" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s < r.rating ? "text-theme-accent fill-theme-accent" : "text-[#ddd]"
                      }`}
                    />
                  ))}
                </div>
                <h3 className="font-serif text-[18px] text-theme-primary mb-2">{r.title}</h3>
                <p className="text-[14px] text-[#555] leading-[1.7] flex-1">“{r.text}”</p>
                <p className="mt-6 text-[13px] text-[#888]">
                  <span className="font-semibold text-theme-ink">{r.name}</span> · {r.country}
                  <span className="block mt-1">
                    {r.tour} · {r.date}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
