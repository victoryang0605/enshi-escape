import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

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
    }
  ];

  return (
    <>
      <Helmet>
        <title>Enshi Travel FAQ | Weather, Transport, Hotels & Travel Tips</title>
        <meta name="description" content="Answers to common questions about traveling to Enshi, China, including language barriers, payment methods, best seasons, and transportation." />
      </Helmet>

      <section className="pt-20 pb-24 bg-theme-bg min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-[56px] font-serif leading-[1.1] text-theme-primary mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-[18px] text-[#666] leading-[1.6]">
              Everything you need to know before packing your bags for the mountains of Hubei.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
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
