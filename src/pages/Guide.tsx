import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';

export default function Guide() {
  return (
    <>
      <Helmet>
        <title>Enshi Travel Guide | Best Time, Things to Do, Where to Stay</title>
        <meta name="description" content="Read expert tips on traveling to Enshi, Hubei. Get insights on the best time to visit, top attractions, local food, and transportation." />
      </Helmet>

      <section className="pt-20 pb-24 bg-theme-bg min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-[56px] font-serif leading-[1.1] text-theme-primary mb-6">
              Enshi Travel Guide
            </h1>
            <p className="text-[18px] text-[#666] leading-[1.6]">
              Your essential resources for exploring China's hidden landscapes. 
              Written by local experts for international explorers.
            </p>
          </div>

          <div className="space-y-8">
            {articles.map((article, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white border border-[#eee] p-8 rounded-[4px] shadow-[4px_4px_0px_rgba(74,93,78,0.03)] hover:shadow-[8px_8px_0px_rgba(176,141,87,0.1)] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-[10px] uppercase tracking-[1px] font-bold text-theme-accent bg-theme-bg px-2 py-1 rounded">
                      {article.category}
                    </span>
                    <span className="text-[#999] text-[12px] font-serif italic">
                      {article.date}
                    </span>
                  </div>
                  <h3 className="font-serif text-[22px] text-theme-primary mb-2">{article.title}</h3>
                  <p className="text-[#666] text-[15px] leading-[1.6]">
                    {article.excerpt}
                  </p>
                </div>
                <div className="md:text-right shrink-0">
                  <Link to={`/enshi-travel-guide/${article.slug}`} className="inline-block border border-theme-primary text-theme-primary px-6 py-2 uppercase text-[11px] font-bold tracking-[1px] rounded-[4px] hover:bg-theme-primary hover:text-white transition-colors">
                    Read Article
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center border-t border-[#eee] pt-12">
            <h3 className="font-serif text-[24px] text-theme-primary mb-4">Want more specific advice?</h3>
            <Link to="/contact" className="inline-block bg-theme-primary text-white font-bold uppercase tracking-[1px] text-[12px] px-8 py-4 rounded-[4px] shadow-[0_4px_12px_rgba(74,93,78,0.2)] hover:bg-[#3a4a3e] transition-colors">
              Talk to Our Local Experts
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
