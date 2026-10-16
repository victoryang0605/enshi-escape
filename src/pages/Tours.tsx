import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { PRICING, formatFromPrice } from '../data/pricing';
import { BreadcrumbJsonLd } from '../components/Seo';

// A sub-component to handle the image carousel state for each individual card
function TourCard({ tour, index }: { tour: any, index: number }) {
  const [currentImage, setCurrentImage] = useState(0);

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
          {formatFromPrice(PRICING.tours[tour.priceKey])}
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
      description: "Our most popular introductory tour for first-time visitors, hitting all the iconic natural and cultural landmarks in a smooth, unhurried pace."
    },
    {
      priceKey: "deep",
      title: "Deep Exploration: Caves & Forests",
      duration: "4 Days / 3 Nights",
      highlights: ["Tenglong Cave", "Suobuya Stone Forest", "Tea Plantations"],
      images: ["/tenglong-3.jpg", "/shilin-2.jpg", "/enshi-3.jpg"],
      description: "Venture deeper into the geological wonders of Enshi, exploring colossal cave networks, ancient sea floors, and lush alpine tea fields."
    },
    {
      priceKey: "cultural",
      title: "Cultural Immersion: Villages & Valleys",
      duration: "5 Days / 4 Nights",
      highlights: ["Xuan'en Night Views", "Tujia Villages", "Gongshui River"],
      images: ["/xuanen-4.jpg", "/enshi-4.jpg", "/pinshan-2.jpg"],
      description: "A slower-paced journey focusing on local gastronomy, indigenous minority heritage, and experiencing the romantic riverside architecture at night."
    },
    {
      priceKey: "photography",
      title: "Enshi Photography Expedition",
      duration: "5 Days / 4 Nights",
      highlights: ["Sunrise at Karst Peaks", "Clear Water Boats", "Golden Hour at Stones"],
      images: ["/enshi-1.jpg", "/pinshan-3.jpg", "/enshi-5.jpg"],
      description: "Designed for shutterbugs. We chase the best light, arriving at vantage points early, avoiding crowds, and hunting for Enshi's iconic sea of clouds."
    },
    {
      priceKey: "hiking",
      title: "Hidden Trails & Remote Hiking",
      duration: "4 Days / 3 Nights",
      highlights: ["Vertical Cliff Trails", "Uncharted Gorges", "Local Farm Meals"],
      images: ["/enshi-6.jpg", "/enshi-7.jpg", "/pinshan-4.jpg"],
      description: "Leave the boardwalks behind. A physically engaging itinerary for hiking enthusiasts who want to trek along sheer cliffs and untouched paths."
    },
    {
      priceKey: "grandLoop",
      title: "The Ultimate Enshi Grand Loop",
      duration: "7 Days / 6 Nights",
      highlights: ["Everything Enshi", "All Major Canyons", "In-depth Culture"],
      images: ["/enshi-8.jpg", "/enshi-2.jpg", "/tenglong-3.jpg"],
      description: "The complete, uncompromising experience. See every corner of the prefecture with premium transport, deep insights, and maximum flexibility."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Enshi Tours | Private Nature, Culture & Hiking Experiences (3–7 Days)</title>
        <meta name="description" content="Handcrafted 3 to 7-day Enshi itineraries: Grand Canyon, hidden waters, Tujia culture. See starting prices and customize your private tour with English-speaking guides." />
      </Helmet>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Enshi Tours", path: "/enshi-tours" }]} />

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
          </div>

          {/* Grid Layout upgraded to support more cards cleanly */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
            {tours.map((tour, index) => (
              <TourCard key={index} tour={tour} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
