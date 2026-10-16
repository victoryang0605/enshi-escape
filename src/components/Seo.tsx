import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.enshiescape.com";

/** Organization (TravelAgency) JSON-LD — rendered once in Layout. */
export function OrgJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#organization`,
    name: "Enshi Escapes",
    url: SITE_URL,
    description:
      "Enshi Escapes is a local travel agency crafting private, English-guided tours of Enshi, Hubei, China — Grand Canyon, Pingshan Canyon, Tujia culture and more.",
    email: "zuhua.yang@slipstream.com.cn",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Enshi City",
      addressRegion: "Hubei Province",
      addressCountry: "CN",
    },
    areaServed: "Enshi Tujia and Miao Autonomous Prefecture, Hubei, China",
    contactPoint: {
      "@type": "ContactPoint",
      email: "zuhua.yang@slipstream.com.cn",
      contactType: "reservations",
      availableLanguage: ["English", "Chinese"],
    },
    sameAs: [],
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

export interface Crumb {
  name: string;
  path: string;
}

/** BreadcrumbList JSON-LD for sub-pages. */
export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

export interface FaqItem {
  q: string;
  a: string;
}

/** FAQPage JSON-LD. */
export function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

export interface Attraction {
  name: string;
  description: string;
  image: string;
}

/** TouristAttraction JSON-LD (ItemList) for the homepage destinations. */
export function TouristAttractionsJsonLd({ attractions }: { attractions: Attraction[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top attractions in Enshi",
    itemListElement: attractions.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        image: `${SITE_URL}${a.image}`,
        touristType: "International travelers",
        isAccessibleForFree: false,
        address: {
          "@type": "PostalAddress",
          addressRegion: "Hubei Province",
          addressCountry: "CN",
        },
      },
    })),
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

export interface Trip {
  title: string;
  description: string;
  duration: string;
  priceRange: string;
  priceMin: number;
  priceMax: number;
  itinerary: string[];
}

/** TouristTrip JSON-LD (ItemList) for the tours page. */
export function TouristTripsJsonLd({ trips }: { trips: Trip[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Enshi private tours",
    itemListElement: trips.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "TouristTrip",
        name: t.title,
        description: t.description,
        touristType: "International travelers",
        provider: { "@id": `${SITE_URL}/#organization` },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: t.priceMin,
            maxPrice: t.priceMax,
            priceCurrency: "USD",
          },
          availability: "https://schema.org/InStock",
        },
        itinerary: {
          "@type": "ItemList",
          numberOfItems: t.itinerary.length,
          itemListElement: t.itinerary.map((d, j) => ({
            "@type": "ListItem",
            position: j + 1,
            name: `Day ${j + 1}`,
            description: d,
          })),
        },
      },
    })),
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}
