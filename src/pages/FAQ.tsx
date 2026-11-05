import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { faqs } from '../data/faq';
import { BreadcrumbJsonLd, FaqJsonLd } from '../components/Seo';

export default function FAQ() {


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
