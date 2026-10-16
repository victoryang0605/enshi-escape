import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { PRICING, formatCarPrice, formatGuidePrice } from '../data/pricing';
import { BreadcrumbJsonLd, FaqJsonLd } from '../components/Seo';

export default function FAQ() {
  const faqs = [
    {
      q: "Do people speak English in Enshi?",
      a: "Outside of major international hotels, English is rarely spoken in Enshi. Navigating transportation, buying tickets, and ordering food can be a significant challenge for foreigners. This is why our services—providing bilingual drivers and guides—are essential for a stress-free trip."
    },
    {
      q: "When is the best time to visit?",
      a: "April to June and September to November are ideal. The weather is mild, and the skies are generally clear. Summer (July-August) can be hot and humid with sudden rain, while winter brings cold temperatures but beautiful snow-capped mountains."
    },
    {
      q: "How do I get to Enshi?",
      a: "Enshi Xujiaping Airport (ENH) has direct flights from major Chinese cities like Beijing, Shanghai, Guangzhou, and Wuhan. Alternatively, Enshi Railway Station is very well connected to the high-speed rail network (e.g., 2 hours from Wuhan, 4 hours from Chengdu)."
    },
    {
      q: "Can I use foreign credit cards?",
      a: "Direct use of Visa or Mastercard is almost impossible at local shops and restaurants. You MUST download Alipay or WeChat and bind your international credit card before arriving. We highly recommend carrying a small amount of RMB cash as a backup for remote villages."
    },
    {
      q: "Are the hiking trails safe?",
      a: "Yes, the main scenic areas like the Grand Canyon have well-maintained boardwalks and stairs. However, they involve significant vertical climbing (sometimes thousands of steps). We will assess your fitness level and recommend appropriate routes or cable car alternatives."
    },
    {
      q: "How much does a trip to Enshi cost?",
      a: `Our private tours are ${PRICING.tours.classic.range} per person, depending on season, group size and hotel class. The final quote is customized to your itinerary — every quote lists inclusions line by line, with no hidden costs. No payment is required until your itinerary is confirmed.`
    },
    {
      q: "What is included in the tour price?",
      a: "Typically: private chartered vehicle with driver, English-speaking guide, scenic spot tickets, and hotel bookings arranged to your standard. International/domestic flights to Enshi, personal expenses and travel insurance are not included. Your final quote lists every inclusion line by line — no hidden costs."
    },
    {
      q: "How do I book a tour?",
      a: "Simply fill in the inquiry form on our Contact page with your dates, group size and interests. We reply within 12 hours with a tailored itinerary and quote. Once you confirm the plan, we handle all bookings — tickets, hotels and transport."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept international bank transfer, Alipay and WeChat Pay. A deposit secures your dates; the balance is due before the trip starts. No payment is required until your itinerary strategy is confirmed."
    },
    {
      q: "What is your cancellation policy?",
      a: "Life happens — we get it. Cancellations made 14+ days before departure receive a full refund of the deposit. Within 14 days, we refund everything except costs already paid to hotels and ticket offices, which we document for you transparently."
    },
    {
      q: "Do I need a visa to visit Enshi?",
      a: "Enshi follows China's national visa policy. Many nationalities can enter China visa-free for short stays — check the latest policy for your passport before booking. If you need an invitation letter for a visa application, we are happy to provide one for confirmed bookings."
    },
    {
      q: "How does mobile payment work in China for foreigners?",
      a: "Download Alipay before you arrive and bind your international Visa/Mastercard — this covers almost every shop, restaurant and taxi in Enshi. WeChat Pay works too. Your guide will also help you get set up on day one, and we recommend keeping some RMB cash for remote villages."
    },
    {
      q: "How big are your tour groups?",
      a: "We specialize in private tours — just you and your travel companions, never mixed with strangers. Whether you are a solo traveler, a couple or a family of six, the vehicle, guide and pace are arranged around you."
    },
    {
      q: "Will our guide speak fluent English?",
      a: "Yes. Every guide we assign is a local who speaks fluent English and knows Enshi's geology, Tujia culture and hidden spots inside out. Many of our travelers tell us the guide was the highlight of their trip."
    },
    {
      q: "Can you accommodate dietary restrictions?",
      a: "Absolutely — tell us in advance and we will plan around it. Vegetarian, halal-friendly and allergy-aware arrangements are all doable; Tujia cuisine is flexible, and Enshi city has restaurants covering most needs."
    },
    {
      q: "Is Enshi suitable for kids or older travelers?",
      a: "Yes, with the right pacing. We design gentler routes with cable cars and shorter walks for families and seniors, and more challenging hikes for the adventurous. Tell us everyone's age and fitness level and we will tailor accordingly."
    },
    {
      q: "How far in advance should I book?",
      a: "2–4 weeks ahead is ideal, especially for April–June and September–November. Last-minute requests are welcome too — if guides and hotels are available, we can often arrange a trip within a few days."
    },
    {
      q: "How much does a private car with driver cost?",
      a: `Private charters are ${formatCarPrice()} (${PRICING.privateCar.vehicles}, ${PRICING.privateCar.seats}). Our local drivers know every mountain curve in Enshi, so you travel safely and comfortably.`
    },
    {
      q: "How much is an English-speaking guide?",
      a: `English-speaking guides are ${formatGuidePrice()}. ${PRICING.guide.note} — handy for chatting with locals in remote villages.`
    },
    {
      q: "Do you offer airport pickup?",
      a: "Yes. We monitor your flight or train and greet you with English signage right at the arrivals hall — at Enshi Xujiaping Airport (ENH) or Enshi Railway Station. Airport transfers can also be booked as a standalone service; contact us for a quote based on your group size."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Enshi Travel FAQ | Prices, Booking, Visa & Travel Tips</title>
        <meta name="description" content="Answers about traveling to Enshi, China: tour prices, how to book, payment, cancellation, visa, mobile payment and best seasons. Free consultation available." />
      </Helmet>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]} />
      <FaqJsonLd faqs={faqs} />

      <section className="pt-20 pb-24 bg-theme-bg min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-[56px] font-serif leading-[1.1] text-theme-primary mb-6">
              Enshi Travel FAQ
            </h1>
            <p className="text-[18px] text-[#666] leading-[1.6]">
              Everything international visitors ask us — prices, booking, payments, visas and practical tips for the mountains of Hubei.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
                className="bg-white border-l-4 border-theme-accent p-6 shadow-sm"
              >
                <h3 className="font-serif text-[20px] text-theme-primary mb-3">{faq.q}</h3>
                <p className="text-[#555] text-[15px] leading-[1.6]">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 bg-[#F8F7F2] border border-[#e8e6dc] p-8 text-center rounded-[4px]">
            <h4 className="font-serif text-[22px] text-theme-primary mb-3">Still have questions?</h4>
            <p className="text-[#666] mb-6">We provide free remote consultations for international travelers.</p>
            <Link to="/contact" className="inline-block border-2 border-theme-primary text-theme-primary font-bold uppercase tracking-[1px] text-[12px] px-8 py-3 rounded-[4px] hover:bg-theme-primary hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
