import { motion } from 'motion/react';
import { Plane, Car, Users, Map, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Etiquette from '../components/Etiquette';
import ItineraryPlanner from '../components/ItineraryPlanner';
import Testimonials from '../components/Testimonials';
import { BreadcrumbJsonLd, TouristAttractionsJsonLd } from '../components/Seo';
import { PRICING, formatCarPrice, formatGuidePrice, formatTourPrice } from '../data/pricing';

export default function Home() {
  const services = [
    {
      icon: <Plane className="w-8 h-8 text-theme-primary" />,
      title: "Airport & Station Transfers",
      description: "Seamless arrivals. We monitor your flight/train and greet you with English signage right at the arrivals hall.",
      price: "Free with private car charter"
    },
    {
      icon: <Car className="w-8 h-8 text-theme-primary" />,
      title: "Private Chartered Vehicles",
      description: "Travel comfortably through mountain roads in clean, modern vehicles with experienced professional drivers.",
      price: `${formatCarPrice()} (${PRICING.privateCar.vehicles}, ${PRICING.privateCar.seats})`
    },
    {
      icon: <Users className="w-8 h-8 text-theme-primary" />,
      title: "Bilingual Cultural Guides",
      description: "Break the language barrier. Our fluent English-speaking locals offer deep insights into Tujia culture and history.",
      price: `${formatGuidePrice()} · ${PRICING.guide.note}`
    },
    {
      icon: <Map className="w-8 h-8 text-theme-primary" />,
      title: "Custom Itineraries",
      description: "From tickets to hotels, we pre-arrange everything based on your pace so you can just relax and enjoy.",
      price: `${formatTourPrice(PRICING.tours.classic)} starting`
    }
  ];

  const destinations = [
    {
      image: "/enshi-2.jpg",
      name: "Enshi Grand Canyon",
      description: "A stunning geological wonder featuring karst landforms, deep gorges, and the iconic 'One Incense Pillar' rock."
    },
    {
      image: "/pinshan-1.jpg",
      name: "Pingshan Canyon",
      description: "Famous for its crystal-clear waters where wooden boats appear to be floating on air within narrow gorges."
    },
    {
      image: "/tusi-1.jpg",
      name: "Enshi Tusi City",
      description: "Immerse yourself in the architecture and heritage of the indigenous Tujia people in this ancient tribal domain."
    },
    {
      image: "/tenglong-3.jpg",
      name: "Tenglong Cave",
      description: "Explore one of the world's largest cave systems, featuring a massive entrance, underground rivers, and spectacular geological wonders."
    },
    {
      image: "/shilin-2.jpg",
      name: "Suobuya Stone Forest",
      description: "Wander through a 460-million-year-old Ordovician stone forest, forming a breathtaking natural maze carved by ancient seas."
    },
    {
      image: "/xuanen-4.jpg",
      name: "Xuan'en Riverfront",
      description: "Experience vibrant night views, romantic riverside architecture, and authentic Tujia cultural performances along the Gongshui River."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Enshi Escapes | Private Enshi Tours for International Travelers</title>
        <meta name="description" content="Experience the breathtaking landscapes and rich Tujia culture of Enshi with zero stress. English-speaking guides, private transport, custom itineraries. Get a free quote today." />
      </Helmet>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }]} />
      <TouristAttractionsJsonLd attractions={destinations} />

      {/* Hero Section */}
      <section className="pt-8 pb-20 lg:pt-16 lg:pb-24 bg-theme-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="inline-block uppercase tracking-[2px] text-[11px] text-theme-accent font-bold mb-4">
                Tailored for International Travelers
              </div>
              <h1 className="text-5xl lg:text-[64px] font-serif leading-[1.1] text-theme-primary mb-6">
                Discover China's <br/>Hidden Paradise.
              </h1>
              <p className="text-[18px] text-[#666] mb-8 leading-[1.6] max-w-[480px]">
                Experience the breathtaking landscapes and rich Tujia culture of Enshi with zero stress. Leave the noise behind. Step into cliffs, rivers, caves, and quiet wonder. We provide English-speaking guides, private transport, and end-to-end support for foreigners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 lg:items-center">
                <Link to="/contact" className="inline-flex justify-center items-center gap-2 bg-theme-primary text-white px-10 py-4 rounded-[4px] font-semibold hover:opacity-90 transition-all shadow-[0_4px_12px_rgba(74,93,78,0.2)] hover:shadow-[0_4px_16px_rgba(74,93,78,0.3)]">
                   Start Planning
                </Link>
                <Link to="/enshi-tours" className="inline-flex justify-center items-center gap-2 text-theme-primary px-8 py-4 font-semibold hover:text-theme-accent transition-colors">
                  View Tours <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative h-[480px] bg-[#e0e0e0] rounded-[8px] overflow-hidden shadow-[20px_20px_0px_var(--color-theme-accent)]">
                <img 
                  src="/enshi-1.jpg" 
                  alt="Misty mountains in Enshi Grand Canyon" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-8 text-white h-1/2">
                  <div className="font-serif italic opacity-90 text-lg">Enshi Grand Canyon, "The Karst Wonder of the World"</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cinematic Video Section */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden bg-black">
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
        
        {/* YouTube Background Video */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <iframe 
            className="w-screen h-[56.25vw] min-h-full min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/kuYavmbwblk?autoplay=1&mute=1&loop=1&playlist=kuYavmbwblk&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3" 
            title="Enshi Cinematic Background"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-white font-serif text-4xl md:text-5xl lg:text-7xl mb-6 drop-shadow-lg leading-tight">
              Mist, Mountains, <br className="hidden md:block" />and Eternal Peace.
            </h2>
            <p className="text-white/90 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto drop-shadow-md">
              Witness the raw beauty of the Hubei highlands. No crowds, just the whisper of the wind and the echo of the gorge.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white border-t border-[#eee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-serif text-[36px] text-theme-primary mb-4">Travel, Uncomplicated.</h2>
            <p className="text-[16px] text-[#666] max-w-2xl leading-[1.6]">
              Navigating a new country can be daunting. We handle the logistics so you can focus on the adventure, focusing exclusively on the Enshi region to provide unmatched local expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 border-l-[1px] border-theme-accent bg-[#fff] hover:bg-[#F8F7F2]/50 transition-colors"
              >
                <div className="mb-4 text-theme-primary opacity-80">
                  {service.icon}
                </div>
                <h3 className="font-serif text-[20px] text-theme-primary mb-2">{service.title}</h3>
                <p className="text-[14px] text-[#777] leading-[1.5]">{service.description}</p>
                <p className="mt-3 text-[15px] font-semibold text-theme-accent">{service.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-24 bg-theme-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="inline-block uppercase tracking-[2px] text-[11px] text-theme-accent font-bold mb-4">Exclusively Enshi</span>
              <h2 className="font-serif text-[36px] text-theme-primary mb-4">Wonders of Enshi</h2>
              <p className="text-[16px] text-[#666] leading-[1.6]">
                Often compared to Avatar's floating mountains and America's Grand Canyon, Enshi offers dramatic landscapes untouched by mass international tourism.
              </p>
            </div>
            <Link to="/enshi-tours" className="group inline-flex items-center gap-2 uppercase text-[12px] tracking-[1px] text-theme-primary font-bold hover:text-theme-accent transition-colors">
              View All Tours & Itineraries
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {destinations.map((dest, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col"
              >
                <div className="relative h-[320px] bg-[#e0e0e0] rounded-[8px] overflow-hidden mb-6 shadow-[10px_10px_0px_rgba(176,141,87,0.2)] group-hover:shadow-[15px_15px_0px_var(--color-theme-accent)] transition-all duration-300">
                  <img 
                    src={dest.image} 
                    alt={dest.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-[24px] text-theme-primary mb-3">{dest.name}</h3>
                  <p className="text-[14px] text-[#777] leading-[1.5] mb-4">{dest.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Etiquette />
      <ItineraryPlanner />
      <Testimonials />
    </>
  );
}
