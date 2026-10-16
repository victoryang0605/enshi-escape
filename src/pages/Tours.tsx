import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { PRICING, formatTourPrice, formatCarPrice, formatGuidePrice } from '../data/pricing';
import { BreadcrumbJsonLd, TouristTripsJsonLd } from '../components/Seo';

// A sub-component to handle the image carousel state for each individual card
function TourCard({ tour, index }: { tour: any, index: number }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [showItinerary, setShowItinerary] = useState(false);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % tour.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + tour.images.length) % tour.images.length);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white border border-[#eee] rounded-[4px] shadow-[8px_8px_0px_rgba(74,93,78,0.05)] overflow-hidden flex flex-col"
    >
      <div className="relative h-[260px] overflow-hidden group">
        {/* Dynamic Image */}
        <img 
          src={tour.images[currentImage]} 
          alt={tour.title} 
          className="w-full h-full object-cover transition-all duration-500" 
        />
        
        {/* Image Overlay Navigation Controls */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={prevImage}
            className="p-1.5 bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white rounded-full transition-colors flex items-center justify-center"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextImage}
            className="p-1.5 bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white rounded-full transition-colors flex items-center justify-center"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {tour.images.map((_: any, i: number) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === currentImage ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-1">
        <div className="text-[11px] font-bold uppercase tracking-[1px] text-theme-accent mb-3">{tour.duration}</div>
        <h3 className="font-serif text-[24px] text-theme-primary mb-3">{tour.title}</h3>
        <p className="text-theme-primary font-bold text-[16px] mb-3">
          {formatTourPrice(PRICING.tours[tour.priceKey])}
          <span className="block text-[12px] font-normal text-[#888] mt-1">{PRICING.tours[tour.priceKey].note}</span>
        </p>
        <p className="text-[#666] text-[14px] leading-[1.6] mb-6 flex-1">
          {tour.description}
        </p>
        <div className="mb-8">
          <h4 className="text-[12px] font-bold text-theme-ink uppercase mb-2">Highlights:</h4>
          <ul className="text-[14px] text-[#555] font-serif list-disc pl-4 space-y-1">
            {tour.highlights.map((h: string, i: number) => <li key={i}>{h}</li>)}
          </ul>
        </div>
        {tour.itinerary && tour.itinerary.length > 0 && (
          <div className="mb-8 border-t border-[#eee] pt-6">
            <button
              onClick={() => setShowItinerary(!showItinerary)}
              aria-expanded={showItinerary}
              className="flex items-center justify-between w-full text-left group"
            >
              <span className="text-[12px] font-bold text-theme-ink uppercase group-hover:text-theme-primary transition-colors">
                Day-by-day itinerary
              </span>
              <ChevronDown className={`w-4 h-4 text-theme-primary transition-transform ${showItinerary ? 'rotate-180' : ''}`} />
            </button>
            {showItinerary && (
              <ol className="mt-4 space-y-3">
                {tour.itinerary.map((day: string, i: number) => (
                  <li key={i} className="flex gap-3 text-[14px] text-[#555] leading-[1.6]">
                    <span className="shrink-0 font-bold text-theme-accent text-[12px] uppercase tracking-[1px] pt-[3px]">
                      Day {i + 1}
                    </span>
                    <span className="font-serif">{day}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}
        <Link to="/contact" className="text-center bg-theme-primary text-white py-3 rounded-[4px] font-bold uppercase text-[12px] tracking-[1px] hover:bg-[#3a4a3e] transition-colors w-full">
          Customize This Tour
        </Link>
      </div>
    </motion.div>
  );
}

export default function Tours() {
  // Enhanced to 6 tours with multiple images per tour
  const tours = [
    {
      priceKey: "classic",
      title: "The Classic Route: Canyon & Waters",
      duration: "3 Days / 2 Nights",
      highlights: ["Enshi Grand Canyon", "Pingshan Canyon", "Tusi City"],
      images: ["/enshi-2.jpg", "/pinshan-1.jpg", "/tusi-1.jpg"],
      description: "Our most popular introductory tour for first-time visitors, hitting all the iconic natural and cultural landmarks in a smooth, unhurried pace.",
      itinerary: [
        "Arrive in Enshi — free airport or railway pickup. Settle into your hotel, then explore Tusi City in the afternoon: Tujia architecture, folk performances, and traditional crafts.",
        "Full day at Enshi Grand Canyon. Walk the cliffside plank roads, marvel at the 'One Incense Pillar' karst tower, and ride the cable car above the sea of clouds.",
        "Morning boat ride through Pingshan Canyon, where the crystal-clear water makes wooden boats look like they are floating on air. Afternoon transfer to the airport or railway station."
      ]
    },
    {
      priceKey: "deep",
      title: "Deep Exploration: Caves & Forests",
      duration: "4 Days / 3 Nights",
      highlights: ["Tenglong Cave", "Suobuya Stone Forest", "Tea Plantations"],
      images: ["/tenglong-3.jpg", "/shilin-2.jpg", "/enshi-3.jpg"],
      description: "Venture deeper into the geological wonders of Enshi, exploring colossal cave networks, ancient sea floors, and lush alpine tea fields.",
      itinerary: [
        "Arrive in Enshi, free pickup, and an easy evening stroll through the old town to acclimatize.",
        "Explore Tenglong Cave, one of the world's largest cave systems — the giant entrance hall, the underground river, and the evening light-and-music show.",
        "Wander the 460-million-year-old Suobuya Stone Forest maze in the morning; visit alpine tea plantations in the afternoon and taste freshly picked Enshi Yulu green tea.",
        "Leisurely morning — optional Tusi City visit or local market walk before your departure transfer."
      ]
    },
    {
      priceKey: "cultural",
      title: "Cultural Immersion: Villages & Valleys",
      duration: "5 Days / 4 Nights",
      highlights: ["Xuan'en Night Views", "Tujia Villages", "Gongshui River"],
      images: ["/xuanen-4.jpg", "/enshi-4.jpg", "/pinshan-2.jpg"],
      description: "A slower-paced journey focusing on local gastronomy, indigenous minority heritage, and experiencing the romantic riverside architecture at night.",
      itinerary: [
        "Arrive in Enshi, free pickup, and a welcome dinner featuring Tujia specialties like he'zha and cured pork.",
        "Visit a traditional Tujia village — watch the 'crying marriage' folk performance, try hand-weaving, and share a family-style lunch with local hosts.",
        "Day trip along the Gongshui River valley: riverside villages, stilted wooden houses, and a riverside lunch.",
        "Free morning at leisure. In the evening, head to Xuan'en for the famous illuminated riverfront — night market snacks and cultural shows along the Gongshui River.",
        "Morning tea and souvenir shopping in Enshi city before your departure transfer."
      ]
    },
    {
      priceKey: "photography",
      title: "Enshi Photography Expedition",
      duration: "5 Days / 4 Nights",
      highlights: ["Sunrise at Karst Peaks", "Clear Water Boats", "Golden Hour at Stones"],
      images: ["/enshi-1.jpg", "/pinshan-3.jpg", "/enshi-5.jpg"],
      description: "Designed for shutterbugs. We chase the best light, arriving at vantage points early, avoiding crowds, and hunting for Enshi's iconic sea of clouds.",
      itinerary: [
        "Arrive in Enshi, free pickup, and a sunset scouting session at a canyon viewpoint with your guide.",
        "Sunrise shoot over the karst peaks of Enshi Grand Canyon, midday rest, then afternoon cliff-trail compositions in soft light.",
        "Early morning at Pingshan Canyon to capture the 'floating boats' on mirror-clear water before the crowds arrive.",
        "Golden-hour session at Suobuya Stone Forest — long shadows through the ancient stone maze; optional night-sky shoot if weather allows.",
        "Final sunrise shoot at a handpicked vantage point, then departure transfer."
      ]
    },
    {
      priceKey: "hiking",
      title: "Hidden Trails & Remote Hiking",
      duration: "4 Days / 3 Nights",
      highlights: ["Vertical Cliff Trails", "Uncharted Gorges", "Local Farm Meals"],
      images: ["/enshi-6.jpg", "/enshi-7.jpg", "/pinshan-4.jpg"],
      description: "Leave the boardwalks behind. A physically engaging itinerary for hiking enthusiasts who want to trek along sheer cliffs and untouched paths.",
      itinerary: [
        "Arrive in Enshi, free pickup, gear check with your guide, and an early night.",
        "Trek the Grand Canyon's upper cliff trails — steep stone stairways, hanging plank roads, and panoramic gorge lookouts (about 6 hours on trail).",
        "Off-the-beaten-path gorge hike along a remote tributary valley; picnic lunch and a home-cooked farm dinner with a local family.",
        "Recovery morning — gentle riverside walk or tea tasting before your departure transfer."
      ]
    },
    {
      priceKey: "grandLoop",
      title: "The Ultimate Enshi Grand Loop",
      duration: "7 Days / 6 Nights",
      highlights: ["Everything Enshi", "All Major Canyons", "In-depth Culture"],
      images: ["/enshi-8.jpg", "/enshi-2.jpg", "/tenglong-3.jpg"],
      description: "The complete, uncompromising experience. See every corner of the prefecture with premium transport, deep insights, and maximum flexibility.",
      itinerary: [
        "Arrive in Enshi, free pickup, welcome dinner, and a full trip briefing with your guide.",
        "Enshi Grand Canyon — cliff plank roads, the One Incense Pillar, and a cable-car ride above the clouds.",
        "Pingshan Canyon floating-boat ride in the morning; Tusi City cultural deep-dive in the afternoon.",
        "Tenglong Cave — the giant entrance, the underground river, and the evening light show.",
        "Suobuya Stone Forest maze in the morning, plus an alpine tea plantation visit and tasting in the afternoon.",
        "Tujia village immersion — folk customs and a family lunch, then an evening in Xuan'en for the illuminated Gongshui riverfront.",
        "Leisurely morning and souvenir shopping before your departure transfer."
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Enshi Tours | Private Nature, Culture & Hiking Experiences (3–7 Days)</title>
        <meta name="description" content="Handcrafted 3 to 7-day Enshi itineraries: Grand Canyon, hidden waters, Tujia culture. See starting prices and customize your private tour with English-speaking guides." />
      </Helmet>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Enshi Tours", path: "/enshi-tours" }]} />
      <TouristTripsJsonLd trips={tours.map((t: any) => ({
        title: t.title,
        description: t.description,
        duration: t.duration,
        priceRange: PRICING.tours[t.priceKey].range,
        priceMin: 500,
        priceMax: 800,
        itinerary: t.itinerary || [],
      }))} />

      <section className="pt-20 pb-24 bg-theme-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block uppercase tracking-[2px] text-[11px] text-theme-accent font-bold mb-4">Curated Experiences</span>
            <h1 className="text-4xl lg:text-[56px] font-serif leading-[1.1] text-theme-primary mb-6">
              Enshi Tours: Private Nature, Culture &amp; Hiking Experiences
            </h1>
            <p className="text-[18px] text-[#666] max-w-2xl mx-auto leading-[1.6]">
              All our itineraries are fully customizable. Select a foundation below, and our English-speaking experts will tailor the pace, hotels, and dining to your exact preferences.
            </p>
            <p className="mt-4 text-[14px] text-[#888] font-serif italic">
              No payment until your itinerary is confirmed · Private tours $500–800/person
            </p>
          </div>

          {/* Grid Layout upgraded to support more cards cleanly */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
            {tours.map((tour, index) => (
              <TourCard key={index} tour={tour} index={index} />
            ))}
          </div>

          {/* À la carte services pricing */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="font-serif text-[28px] text-theme-primary text-center mb-8">
              À La Carte Services
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 border-l-[1px] border-theme-accent bg-[#fff]">
                <h3 className="font-serif text-[20px] text-theme-primary mb-2">Private Car Charter</h3>
                <p className="text-[14px] text-[#777] leading-[1.6] mb-3">
                  {PRICING.privateCar.vehicles}, {PRICING.privateCar.seats}, {PRICING.privateCar.mileage}. {PRICING.privateCar.airportPickup}.
                </p>
                <p className="text-[18px] font-semibold text-theme-accent">{formatCarPrice()}</p>
              </div>
              <div className="p-8 border-l-[1px] border-theme-accent bg-[#fff]">
                <h3 className="font-serif text-[20px] text-theme-primary mb-2">English-Speaking Guide</h3>
                <p className="text-[14px] text-[#777] leading-[1.6] mb-3">
                  Fluent local guides with deep Tujia culture insights. {PRICING.guide.note}.
                </p>
                <p className="text-[18px] font-semibold text-theme-accent">{formatGuidePrice()}</p>
              </div>
            </div>
            <p className="text-center text-[13px] text-[#999] mt-6">{PRICING.currencyNote}</p>
          </div>
        </div>
      </section>
    </>
  );
}
