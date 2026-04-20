import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Enshi Escape | Curated Nature & Culture Travel in Enshi</title>
        <meta name="description" content="Learn why we started Enshi Escape. Our mission is to bridge the gap for international travelers wanting to explore the untouched beauty of Enshi." />
      </Helmet>

      <section className="py-20 bg-theme-bg flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block uppercase tracking-[2px] text-[11px] text-theme-accent font-bold mb-4">Our Story</span>
            <h1 className="text-4xl lg:text-[56px] font-serif leading-[1.1] text-theme-primary mb-8">
              Why Enshi Escapes?
            </h1>
            
            <div className="prose prose-lg text-[#555] font-serif leading-[1.8]">
              <p className="mb-6">
                Enshi is one of China's best-kept secrets. For years, domestic travelers have marveled at its towering karsts, emerald rivers, and the rich heritage of the Tujia people. Yet, for the international traveler, exploring this mountainous region has remained daunting due to language barriers, lack of English information, and complex local logistics.
              </p>
              
              <figure className="my-12">
                <div className="relative h-[400px] bg-[#e0e0e0] rounded-[8px] overflow-hidden shadow-[15px_15px_0px_rgba(176,141,87,0.2)]">
                  <img src="/enshi-2.jpg" alt="Enshi Escapes Landscape" className="w-full h-full object-cover" />
                </div>
              </figure>

              <h2 className="text-2xl font-serif text-theme-primary mb-4 mt-12">Bridging the Gap</h2>
              <p className="mb-6">
                We founded <strong>Enshi Escapes</strong> to change that. We are a team of passionate locals and bilingual experts dedicated exclusively to the Enshi region. We don't just sell tours; we curate experiences that allow you to step deep into the culture and nature with absolute peace of mind.
              </p>

              <p className="mb-6">
                Whether it's arranging a private vehicle to navigate the winding roads of the Grand Canyon, pairing you with a knowledgeable English-speaking guide to explain ancient tribal customs, or simply ensuring your dietary needs are met in a local village, we handle the friction so you can focus on the wonder.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
