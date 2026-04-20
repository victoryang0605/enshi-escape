import { useState } from 'react';
import { Plane, Car, Users, CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

// Set to the deployed Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwds8rFCkTv_DO5FVDaoSQTv1FyWEto4Z3rRn_lEhMFzRURo1Ew528KW_Kkb74WQjo/exec";

export default function BookingSystem() {
  const [activeTab, setActiveTab] = useState<'transfer' | 'car' | 'guide'>('transfer');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Extract all input data from the form
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.serviceType = activeTab; // add the currently selected tab info

    try {
      if (GOOGLE_SCRIPT_URL) {
        // Send to Google Sheets via Apps Script
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Prevents CORS blocking in the browser
          headers: {
            'Content-Type': 'text/plain', 
          },
          body: JSON.stringify(data),
        });
      } else {
        // Mock delay to demonstrate UI if URL is not yet configured
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Mock Submission (Add GOOGLE_SCRIPT_URL to connect to sheets):", data);
      }
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit. Please try again or contact us via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-24 bg-white border-t border-[#eee]" id="book">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 border border-theme-accent bg-theme-bg shadow-[8px_8px_0px_rgba(176,141,87,0.2)]">
          <CheckCircle2 className="w-16 h-16 text-theme-primary mx-auto mb-6" />
          <h2 className="font-serif text-[32px] text-theme-primary mb-4">Reservation Request Received</h2>
          <p className="text-[16px] text-[#666] leading-[1.6] mb-8">
            Thank you for choosing Enshi Escapes. An automated confirmation has been sent to your email. Our bilingual team will review your request and follow up shortly.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="uppercase text-[12px] tracking-[1px] font-bold text-theme-primary border-b border-theme-primary hover:text-theme-accent hover:border-theme-accent transition-colors pb-1"
          >
            Submit Another Request
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white border-t border-[#eee]" id="book">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block uppercase tracking-[2px] text-[11px] text-theme-accent font-bold mb-4">Secure Your Journey</span>
          <h2 className="font-serif text-[36px] text-theme-primary mb-4">Book Essential Services</h2>
          <p className="text-[16px] text-[#666] max-w-2xl mx-auto leading-[1.6]">
            Reserve dedicated transportation and expert cultural guides. All reservations include 24/7 English-speaking remote support during your time in Enshi.
          </p>
        </div>

        <div className="bg-theme-bg border border-[#eee] rounded-[4px] shadow-[12px_12px_0px_rgba(74,93,78,0.05)] overflow-hidden">
          <div className="flex border-b border-[#eee] bg-white">
            <button 
              type="button"
              onClick={() => setActiveTab('transfer')}
              className={`flex-1 flex items-center justify-center gap-2 py-5 font-bold uppercase text-[12px] tracking-[1px] transition-colors ${activeTab === 'transfer' ? 'text-theme-primary border-b-2 border-theme-primary bg-theme-bg' : 'text-[#999] hover:text-theme-ink hover:bg-gray-50'}`}
            >
              <Plane className="w-4 h-4" /> Transfers
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab('car')}
              className={`flex-1 flex items-center justify-center gap-2 py-5 font-bold uppercase text-[12px] tracking-[1px] transition-colors ${activeTab === 'car' ? 'text-theme-primary border-b-2 border-theme-primary bg-theme-bg' : 'text-[#999] hover:text-theme-ink hover:bg-gray-50'}`}
            >
              <Car className="w-4 h-4" /> Private Car
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab('guide')}
              className={`flex-1 flex items-center justify-center gap-2 py-5 font-bold uppercase text-[12px] tracking-[1px] transition-colors ${activeTab === 'guide' ? 'text-theme-primary border-b-2 border-theme-primary bg-theme-bg' : 'text-[#999] hover:text-theme-ink hover:bg-gray-50'}`}
            >
              <Users className="w-4 h-4" /> Cultural Guide
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block uppercase tracking-[1px] text-[11px] font-bold text-theme-ink mb-2">Guest Name</label>
                <input required name="guestName" type="text" className="w-full px-4 py-3 rounded-[4px] border border-[#ddd] focus:border-theme-primary outline-none transition-colors text-theme-ink bg-white" placeholder="Name on Passport" />
              </div>
              <div>
                <label className="block uppercase tracking-[1px] text-[11px] font-bold text-theme-ink mb-2">Email Address</label>
                <input required name="email" type="email" className="w-full px-4 py-3 rounded-[4px] border border-[#ddd] focus:border-theme-primary outline-none transition-colors text-theme-ink bg-white" placeholder="you@example.com" />
              </div>
            </div>

            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {activeTab === 'transfer' && (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block uppercase tracking-[1px] text-[11px] font-bold text-theme-ink mb-2">Arrival Date</label>
                      <input required name="arrivalDate" type="date" className="w-full px-4 py-3 rounded-[4px] border border-[#ddd] focus:border-theme-primary outline-none transition-colors text-theme-ink bg-white" />
                    </div>
                    <div>
                      <label className="block uppercase tracking-[1px] text-[11px] font-bold text-theme-ink mb-2">Passenger Count</label>
                      <input required name="passengerCount" type="number" min="1" max="15" className="w-full px-4 py-3 rounded-[4px] border border-[#ddd] focus:border-theme-primary outline-none transition-colors text-theme-ink bg-white" placeholder="2" />
                    </div>
                  </div>
                  <div>
                    <label className="block uppercase tracking-[1px] text-[11px] font-bold text-theme-ink mb-2">Flight / Train Number</label>
                    <input required name="flightNumber" type="text" className="w-full px-4 py-3 rounded-[4px] border border-[#ddd] focus:border-theme-primary outline-none transition-colors text-theme-ink bg-white" placeholder="e.g. MU5372 or D2244" />
                  </div>
                  <div>
                    <label className="block uppercase tracking-[1px] text-[11px] font-bold text-theme-ink mb-2">Destination Hotel in Enshi</label>
                    <input required name="hotel" type="text" className="w-full px-4 py-3 rounded-[4px] border border-[#ddd] focus:border-theme-primary outline-none transition-colors text-theme-ink bg-white" placeholder="Hotel Name / Address" />
                  </div>
                </>
              )}

              {activeTab === 'car' && (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block uppercase tracking-[1px] text-[11px] font-bold text-theme-ink mb-2">Start Date</label>
                      <input required name="startDate" type="date" className="w-full px-4 py-3 rounded-[4px] border border-[#ddd] focus:border-theme-primary outline-none transition-colors text-theme-ink bg-white" />
                    </div>
                    <div>
                      <label className="block uppercase tracking-[1px] text-[11px] font-bold text-theme-ink mb-2">Duration</label>
                      <select required name="duration" className="w-full px-4 py-3 rounded-[4px] border border-[#ddd] focus:border-theme-primary outline-none transition-colors text-theme-ink bg-white">
                        <option>1 Day</option>
                        <option>2 Days</option>
                        <option>3 Days</option>
                        <option>4-7 Days</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block uppercase tracking-[1px] text-[11px] font-bold text-theme-ink mb-2">Vehicle Type</label>
                    <select required name="vehicleType" className="w-full px-4 py-3 rounded-[4px] border border-[#ddd] focus:border-theme-primary outline-none transition-colors text-theme-ink bg-white">
                      <option>Sedan (1-3 Pax) - Comfortable</option>
                      <option>Business MPV (4-6 Pax) - Spacious</option>
                      <option>Minibus (7-15 Pax) - Best for Groups</option>
                    </select>
                  </div>
                  <div>
                    <label className="block uppercase tracking-[1px] text-[11px] font-bold text-theme-ink mb-2">Planned Route / Destinations</label>
                    <textarea required name="route" rows={3} className="w-full px-4 py-3 rounded-[4px] border border-[#ddd] focus:border-theme-primary outline-none transition-colors text-theme-ink bg-white" placeholder="Grand Canyon on Day 1, Pingshan on Day 2..."></textarea>
                  </div>
                </>
              )}

              {activeTab === 'guide' && (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block uppercase tracking-[1px] text-[11px] font-bold text-theme-ink mb-2">Language Required</label>
                      <select required name="language" className="w-full px-4 py-3 rounded-[4px] border border-[#ddd] focus:border-theme-primary outline-none transition-colors text-theme-ink bg-white">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>Russian</option>
                      </select>
                    </div>
                    <div>
                      <label className="block uppercase tracking-[1px] text-[11px] font-bold text-theme-ink mb-2">Tour Theme</label>
                      <select required name="tourTheme" className="w-full px-4 py-3 rounded-[4px] border border-[#ddd] focus:border-theme-primary outline-none transition-colors text-theme-ink bg-white">
                        <option>General Highlights</option>
                        <option>Tujia Culture & Architecture</option>
                        <option>Gastronomy & Local Food</option>
                        <option>Hiking & Adventure</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block uppercase tracking-[1px] text-[11px] font-bold text-theme-ink mb-2">Tour Dates</label>
                      <input required name="tourDates" type="text" className="w-full px-4 py-3 rounded-[4px] border border-[#ddd] focus:border-theme-primary outline-none transition-colors text-theme-ink bg-white" placeholder="e.g. May 10 - May 12" />
                    </div>
                    <div>
                      <label className="block uppercase tracking-[1px] text-[11px] font-bold text-theme-ink mb-2">Group Size</label>
                      <input required name="groupSize" type="number" min="1" max="20" className="w-full px-4 py-3 rounded-[4px] border border-[#ddd] focus:border-theme-primary outline-none transition-colors text-theme-ink bg-white" placeholder="2" />
                    </div>
                  </div>
                  <div>
                    <label className="block uppercase tracking-[1px] text-[11px] font-bold text-theme-ink mb-2">Special Interests or Requirements</label>
                    <textarea name="requirements" rows={2} className="w-full px-4 py-3 rounded-[4px] border border-[#ddd] focus:border-theme-primary outline-none transition-colors text-theme-ink bg-white" placeholder="We love local history and slow walking..."></textarea>
                  </div>
                </>
              )}
            </motion.div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex justify-center items-center gap-2 w-full bg-theme-primary hover:bg-[#3a4a3e] disabled:bg-[#889d8c] text-white font-bold uppercase text-[13px] tracking-[1px] py-5 rounded-[4px] transition-colors shadow-[0_4px_12px_rgba(74,93,78,0.2)] mt-8"
            >
              {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : "Submit Request"}
            </button>
            <p className="text-[12px] text-center text-[#777] mt-4 font-serif italic">No payment required until itinerary strategy is confirmed.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
