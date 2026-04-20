import { useState } from 'react';
import { Compass, CalendarDays, DollarSign, Clock } from 'lucide-react';
import { motion } from 'motion/react';

type Durations = '3' | '5' | '7';
type Interests = 'nature' | 'culture' | 'balanced';

export default function ItineraryPlanner() {
  const [duration, setDuration] = useState<Durations>('5');
  const [interest, setInterest] = useState<Interests>('balanced');
  const [budget, setBudget] = useState('moderate');
  const [itinerary, setItinerary] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateItinerary = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const plans: Record<Durations, any> = {
        '3': {
          title: "Enshi Essence Weekend",
          cost: budget === 'luxury' ? '$600 - $800' : '$250 - $400',
          days: [
            { day: 1, title: "Arrival & Tusi City", desc: "Settle into your hotel. In the afternoon, explore the magnificent architecture of Enshi Tusi City, the ancient heart of the Tujia empire.", transport: "Airport Pickup" },
            { day: 2, title: "The Grand Canyon", desc: "A full day trekking the Enshi Grand Canyon. Marvel at the 'One Incense Pillar' and navigate the stunning cliffside walkways.", transport: "Private Car (Full Day)" },
            { day: 3, title: "Pingshan Gorge & Departure", desc: "Morning boat ride in the crystal-clear waters of Pingshan Canyon (the 'Floating Boat'). Afternoon transfer to the airport.", transport: "Private Car & Drop-off" }
          ]
        },
        '5': {
          title: "Deep Enshi Exploration",
          cost: budget === 'luxury' ? '$1100 - $1500' : '$450 - $700',
          days: [
            { day: 1, title: "Arrival & City Walk", desc: "Check-in and acclimatize. Evening food tour in Enshi city.", transport: "Airport Pickup" },
            { day: 2, title: "Enshi Grand Canyon Trek", desc: "Conquer the 'Karst Wonder of the World'.", transport: "Private Car" },
            { day: 3, title: interest === 'nature' ? "Suobuya Stone Forest" : "Pengjiazhai Village", desc: interest === 'nature' ? "Explore the Ordovician remnants." : "Visit a 200-year-old preserved Tujia village.", transport: "Private Car" },
            { day: 4, title: "Pingshan Canyon", desc: "Boat through narrow gorges over water so clear it looks like air.", transport: "Private Car" },
            { day: 5, title: "Tusi City & Departure", desc: "Morning visit to Enshi Tusi City for architectural wonders. Afternoon departure.", transport: "Transfer to Airport" }
          ]
        },
        '7': {
          title: "The Ultimate Hubei West Tour",
          cost: budget === 'luxury' ? '$1600 - $2200' : '$700 - $1000',
          days: [
            { day: 1, title: "Welcome to Enshi", desc: "Arrival and Tujia welcome dinner.", transport: "Airport Pickup" },
            { day: 2, title: "Enshi Grand Canyon: Yunlong Fissure", desc: "Focus entirely on the bottom fissure of the canyon.", transport: "Private Car" },
            { day: 3, title: "Enshi Grand Canyon: Cliffs", desc: "Trek the upper ledges and the famous Incense Pillar.", transport: "Private Car" },
            { day: 4, title: "Suobuya Stone Forest", desc: "Navigate the maze-like formations.", transport: "Private Car" },
            { day: 5, title: "Tenglong Cave", desc: "Explore one of China's largest cave systems.", transport: "Private Car" },
            { day: 6, title: "Pingshan Canyon Floating Boats", desc: "The iconic suspended boat experience in deep gorges.", transport: "Private Car" },
            { day: 7, title: "Cultural Farewell", desc: "Visit Tusi City and transfer out.", transport: "Airport Drop-off" }
          ]
        }
      };
      
      setItinerary(plans[duration]);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <section className="py-24 bg-theme-bg border-t border-[#eee]" id="itineraries">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="inline-block uppercase tracking-[2px] text-[11px] text-theme-accent font-bold mb-4">Design Your Experience</span>
          <h2 className="font-serif text-[36px] text-theme-primary mb-4">Interactive Itinerary Planner</h2>
          <p className="text-[16px] text-[#666] max-w-2xl mx-auto leading-[1.6]">
            Every traveler is unique. Use our builder to generate a suggested route based on your pace and preferences. Note that custom routes can be further refined with our planners.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
          
          <div className="bg-white p-8 border border-[#eee] rounded-[4px] shadow-[4px_4px_0px_var(--color-theme-accent)]">
            <h3 className="font-serif text-[24px] text-theme-primary mb-6 border-b border-[#eee] pb-4">Trip Parameters</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block uppercase tracking-[1px] text-[11px] font-bold text-theme-ink mb-3"><CalendarDays className="inline w-4 h-4 mr-1 mb-0.5 text-theme-accent"/> Trip Duration</label>
                <div className="grid grid-cols-3 gap-2">
                  {['3', '5', '7'].map((d) => (
                    <button 
                      key={d} 
                      onClick={() => setDuration(d as Durations)}
                      className={`py-2 border text-[13px] font-bold rounded-[3px] transition-colors ${duration === d ? 'border-theme-primary bg-theme-primary text-white' : 'border-[#ddd] text-theme-ink hover:border-theme-accent'}`}
                    >
                      {d} Days
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-[1px] text-[11px] font-bold text-theme-ink mb-3"><Compass className="inline w-4 h-4 mr-1 mb-0.5 text-theme-accent"/> Primary Interest</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    {id: 'nature', label: 'Nature & Hiking'},
                    {id: 'culture', label: 'Culture & History'},
                    {id: 'balanced', label: 'Balanced Mix'}
                  ].map((int) => (
                    <button 
                      key={int.id} 
                      onClick={() => setInterest(int.id as Interests)}
                      className={`py-2 px-3 text-left border text-[13px] font-bold rounded-[3px] transition-colors ${interest === int.id ? 'border-theme-primary bg-theme-bg text-theme-primary' : 'border-[#ddd] text-theme-ink hover:border-theme-accent'}`}
                    >
                      {int.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-[1px] text-[11px] font-bold text-theme-ink mb-3"><DollarSign className="inline w-4 h-4 mr-1 mb-0.5 text-theme-accent"/> Style / Budget (Est.)</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {id: 'moderate', label: 'Moderate'},
                    {id: 'luxury', label: 'Luxury (4/5 Star)'}
                  ].map((b) => (
                    <button 
                      key={b.id} 
                      onClick={() => setBudget(b.id)}
                      className={`py-2 border text-[13px] font-bold rounded-[3px] transition-colors ${budget === b.id ? 'border-theme-primary bg-theme-bg text-theme-primary' : 'border-[#ddd] text-theme-ink hover:border-theme-accent'}`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={generateItinerary}
                disabled={isGenerating}
                className="w-full bg-theme-primary text-white py-4 uppercase text-[12px] tracking-[1px] font-bold rounded-[4px] mt-4 hover:bg-[#3a4a3e] transition-colors shadow-sm disabled:opacity-50"
              >
                {isGenerating ? 'Drafting Plan...' : 'Generate Itinerary'}
              </button>
            </div>
          </div>

          <div className="min-h-[400px]">
             {itinerary ? (
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="bg-white border border-[#eee] p-8 lg:p-10 rounded-[4px] shadow-[8px_8px_0px_rgba(74,93,78,0.05)]"
               >
                 <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 border-b border-[#eee] pb-6">
                   <div className="mb-4 md:mb-0">
                     <span className="inline-block uppercase tracking-[2px] text-[10px] text-white bg-theme-primary px-3 py-1 rounded-[2px] font-bold mb-3">Suggested Route</span>
                     <h3 className="font-serif text-[28px] text-theme-primary leading-tight">{itinerary.title}</h3>
                   </div>
                   <div className="text-right">
                     <div className="text-[12px] uppercase tracking-[1px] text-[#777] font-bold mb-1">Estimated Cost Per Person</div>
                     <div className="font-serif text-[24px] text-theme-accent">{itinerary.cost}</div>
                   </div>
                 </div>

                 <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[17px] before:w-[2px] before:bg-theme-bg">
                   {itinerary.days.map((day: any, i: number) => (
                     <div key={i} className="relative pl-12">
                       <span className="absolute left-0 top-1 w-9 h-9 bg-theme-bg border border-[#ddd] rounded-full flex items-center justify-center font-bold text-theme-primary text-[14px]">
                         D{day.day}
                       </span>
                       <h4 className="font-serif text-[20px] text-theme-primary mb-2 pt-1.5">{day.title}</h4>
                       <p className="text-[#666] text-[14px] leading-[1.6] mb-3">{day.desc}</p>
                       <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[1px] text-theme-accent bg-[#F8F7F2] px-3 py-1.5 rounded-[2px]">
                         <Clock className="w-3.5 h-3.5" /> {day.transport}
                       </div>
                     </div>
                   ))}
                 </div>
                 
               </motion.div>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-center p-12 border border-dashed border-[#ddd] rounded-[4px] bg-[#fdfdfd]">
                  <Compass className="w-16 h-16 text-[#ddd] mb-6" />
                  <h3 className="font-serif text-[24px] text-[#aaa] mb-2">Ready to explore?</h3>
                  <p className="text-[#999] text-[14px]">Adjust the parameters on the left and click "Generate Itinerary" to see your customized travel plan.</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </section>
  );
}
