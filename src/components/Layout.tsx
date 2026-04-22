import { motion } from 'motion/react';
import { Menu, X, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-theme-bg font-sans text-theme-ink selection:bg-theme-accent/20 selection:text-theme-ink flex flex-col">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-theme-bg/90 backdrop-blur-md border-b border-[#eee] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <Link to="/" onClick={handleNavClick} className="flex items-center gap-2">
              <span className="font-serif text-[24px] font-bold text-theme-primary tracking-[-0.5px] uppercase">Enshi Escapes</span>
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/enshi-tours" className="uppercase text-[14px] font-medium tracking-[1px] text-theme-ink hover:text-theme-primary transition-colors">Tours</Link>
              <Link to="/enshi-travel-guide" className="uppercase text-[14px] font-medium tracking-[1px] text-theme-ink hover:text-theme-primary transition-colors">Travel Guide</Link>
              <Link to="/guestbook" className="uppercase text-[14px] font-medium tracking-[1px] text-theme-ink hover:text-theme-primary transition-colors">Reviews</Link>
              <Link to="/contact" className="bg-theme-primary text-white px-6 py-2.5 rounded-[4px] font-semibold transition-all hover:shadow-[0_4px_12px_rgba(74,93,78,0.3)] shadow-[0_4px_12px_rgba(74,93,78,0.15)] uppercase text-[12px] tracking-[1px]">
                Plan Your Trip
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-theme-ink hover:text-theme-primary"
                aria-label="Toggle Menu"
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
              <Link to="/enshi-tours" onClick={handleNavClick} className="uppercase text-[13px] tracking-[1px] text-theme-ink hover:text-theme-primary font-medium py-2">Tours</Link>
              <Link to="/enshi-travel-guide" onClick={handleNavClick} className="uppercase text-[13px] tracking-[1px] text-theme-ink hover:text-theme-primary font-medium py-2">Travel Guide</Link>
              <Link to="/guestbook" onClick={handleNavClick} className="uppercase text-[13px] tracking-[1px] text-theme-ink hover:text-theme-primary font-medium py-2">Reviews</Link>
              <Link to="/contact" onClick={handleNavClick} className="bg-theme-primary text-white px-4 py-3 rounded-[4px] font-semibold text-center uppercase text-[12px] tracking-[1px]">
                Plan Your Trip
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col pt-24">
        <Outlet />
      </main>

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
                <li><Link to="/enshi-tours" className="hover:text-theme-accent transition-colors">Enshi Tours</Link></li>
                <li><Link to="/enshi-travel-guide" className="hover:text-theme-accent transition-colors">Travel Guide</Link></li>
                <li><Link to="/about" className="hover:text-theme-accent transition-colors">About Us</Link></li>
                <li><Link to="/faq" className="hover:text-theme-accent transition-colors">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-sans font-bold text-white mb-6 uppercase text-[12px] tracking-[1px] opacity-80">Contact</h4>
              <ul className="space-y-4 text-[#aaa] text-[14px]">
                <li>victoryang0605@gmail.com</li>
                <li>Enshi City, Hubei Province</li>
                <li>China</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-[#666]">
            <p>© {new Date().getFullYear()} Enshi Escapes Travel Co. | Specialist in Hubei Region</p>
            <div className="flex gap-6">
              <span className="opacity-60">Licensed Inbound Travel Operator #ES-0822</span>
              <Link to="#" className="hover:text-theme-accent transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
