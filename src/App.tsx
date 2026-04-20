import { motion } from 'motion/react';
import { 
  Plane, 
  Car, 
  Map, 
  Users, 
  MapPin, 
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import Etiquette from './components/Etiquette';
import ItineraryPlanner from './components/ItineraryPlanner';
import BookingSystem from './components/BookingSystem';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const services = [
    {
      icon: <Plane className="w-8 h-8 text-theme-primary" />,
      title: "Airport & Station Transfers",
      description: "Seamless arrivals. We monitor your flight/train and greet you with English signage right at the arrivals hall."
    },
    {
      icon: <Car className="w-8 h-8 text-theme-primary" />,
      title: "Private Chartered Vehicles",
      description: "Travel comfortably through mountain roads in clean, modern vehicles with experienced professional drivers."
    },
    {
      icon: <Users className="w-8 h-8 text-theme-primary" />,
      title: "Bilingual Cultural Guides",
      description: "Break the language barrier. Our fluent English-speaking locals offer deep insights into Tujia culture and history."
    },
    {
      icon: <Map className="w-8 h-8 text-theme-primary" />,
      title: "Custom Itineraries",
      description: "From tickets to hotels, we pre-arrange everything based on your pace so you can just relax and enjoy."
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
    <div className="min-h-screen bg-theme-bg font-sans text-theme-ink selection:bg-theme-accent/20 selection:text-theme-ink">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-theme-bg/90 backdrop-blur-md border-b border-[#eee] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center gap-2">
              <span className="font-serif text-[24px] font-bold text-theme-primary tracking-[-0.5px] uppercase">Enshi Escapes</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="uppercase text-[14px] font-medium tracking-[1px] text-theme-ink hover:text-theme-primary transition-colors">Services</a>
              <a href="#destinations" className="uppercase text-[14px] font-medium tracking-[1px] text-theme-ink hover:text-theme-primary transition-colors">Destinations</a>
              <a href="#itineraries" className="uppercase text-[14px] font-medium tracking-[1px] text-theme-ink hover:text-theme-primary transition-colors">Itineraries</a>
              <a href="#book" className="bg-theme-primary text-white px-6 py-2.5 rounded-[4px] font-semibold transition-all hover:shadow-[0_4px_12px_rgba(74,93,78,0.3)] shadow-[0_4px_12px_rgba(74,93,78,0.15)] uppercase text-[12px] tracking-[1px]">
                Plan Your Trip
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-theme-ink hover:text-theme-primary"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-theme-bg border-t border-[#eee] absolute w-full shadow-[0_8px_24px_rgba(0,0,0,0.05)] text-center">
            <div className="px-4 py-4 space-y-4 flex flex-col">
              <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="uppercase text-[13px] tracking-[1px] text-theme-ink hover:text-theme-primary font-medium py-2">Services</a>
              <a href="#destinations" onClick={() => setIsMobileMenuOpen(false)} className="uppercase text-[13px] tracking-[1px] text-theme-ink hover:text-theme-primary font-medium py-2">Destinations</a>
              <a href="#itineraries" onClick={() => setIsMobileMenuOpen(false)} className="uppercase text-[13px] tracking-[1px] text-theme-ink hover:text-theme-primary font-medium py-2">Itineraries</a>
              <a href="#book" onClick={() => setIsMobileMenuOpen(false)} className="bg-theme-primary text-white px-4 py-3 rounded-[4px] font-semibold text-center uppercase text-[12px] tracking-[1px]">
                Plan Your Trip
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 bg-theme-bg">
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
                Experience the breathtaking landscapes and rich Tujia culture of Enshi with zero stress. We provide English-speaking guides, private transport, and end-to-end support for foreigners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 lg:items-center">
                <a href="#book" className="inline-flex justify-center items-center gap-2 bg-theme-primary text-white px-10 py-4 rounded-[4px] font-semibold hover:opacity-90 transition-all shadow-[0_4px_12px_rgba(74,93,78,0.2)] hover:shadow-[0_4px_16px_rgba(74,93,78,0.3)]">
                  Start Planning
                </a>
                <a href="#services" className="inline-flex justify-center items-center gap-2 text-theme-primary px-8 py-4 font-semibold hover:text-theme-accent transition-colors">
                  How We Help <ArrowRight className="w-5 h-5" />
                </a>
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
                  alt="Misty mountains in Enshi" 
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

      {/* Services Section */}
      <section id="services" className="py-20 bg-white border-t border-[#eee]">
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-24 bg-theme-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="inline-block uppercase tracking-[2px] text-[11px] text-theme-accent font-bold mb-4">Exclusively Enshi</span>
              <h2 className="font-serif text-[36px] text-theme-primary mb-4">Wonders of Enshi</h2>
              <p className="text-[16px] text-[#666] leading-[1.6]">
                Often compared to Avatar's floating mountains and America's Grand Canyon, Enshi offers dramatic landscapes untouched by mass international tourism.
              </p>
            </div>
            <a href="#itineraries" className="group inline-flex items-center gap-2 uppercase text-[12px] tracking-[1px] text-theme-primary font-bold hover:text-theme-accent transition-colors">
              View Sample Itineraries
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
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

      {/* New Interactive Sections */}
      <Etiquette />
      <ItineraryPlanner />
      <BookingSystem />

      {/* Footer */}
      <footer className="bg-theme-ink text-white pt-16 pb-8 border-t-[4px] border-theme-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2 text-white">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-6 h-6 text-theme-accent" />
                <span className="font-serif text-[24px] font-bold text-white tracking-[-0.5px] uppercase">Enshi Escapes</span>
              </div>
              <p className="text-[#aaa] max-w-sm leading-[1.6]">
                Your reliable local partner for unforgettable, culturally immersive travel in the Enshi region, Hubei, China.
              </p>
            </div>
            
            <div>
              <h4 className="font-sans font-bold text-white mb-6 uppercase text-[12px] tracking-[1px] opacity-80">Quick Links</h4>
              <ul className="space-y-4 text-[#aaa] text-[14px]">
                <li><a href="#services" className="hover:text-theme-accent transition-colors">Our Services</a></li>
                <li><a href="#destinations" className="hover:text-theme-accent transition-colors">Destinations</a></li>
                <li><a href="#etiquette" className="hover:text-theme-accent transition-colors">Traveler Etiquette</a></li>
                <li><a href="#itineraries" className="hover:text-theme-accent transition-colors">Itinerary Planner</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-sans font-bold text-white mb-6 uppercase text-[12px] tracking-[1px] opacity-80">Contact</h4>
              <ul className="space-y-4 text-[#aaa] text-[14px]">
                <li>hello@enshiescapes.com</li>
                <li>Enshi City, Hubei Province</li>
                <li>China</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-[#666]">
            <p>© {new Date().getFullYear()} Enshi Escapes Travel Co. | Specialist in Hubei Region</p>
            <div className="flex gap-6">
              <span className="opacity-60">Licensed Inbound Travel Operator #ES-0822</span>
              <a href="#" className="hover:text-theme-accent transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
