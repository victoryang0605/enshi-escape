import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { articles } from '../data/articles';

export default function Article() {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    // Redirect back to guide if article doesn't exist
    return <Navigate to="/enshi-travel-guide" />;
  }

  return (
    <>
      <Helmet>
        <title>{article.title} | Enshi Travel Guide</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

      <article className="pt-20 pb-24 bg-theme-bg min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link to="/enshi-travel-guide" className="inline-flex items-center gap-2 text-theme-primary opacity-80 hover:opacity-100 hover:text-theme-accent transition-colors mb-10 text-[13px] font-bold uppercase tracking-[1px]">
            <ArrowLeft className="w-4 h-4" /> Back to Travel Guide
          </Link>

          <header className="mb-12 border-b border-[#eee] pb-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[11px] uppercase tracking-[1px] font-bold text-theme-accent bg-white shadow-sm border border-[#eee] px-3 py-1 rounded-[4px]">
                {article.category}
              </span>
              <span className="text-[#999] text-[13px] font-serif italic">
                {article.date}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif text-theme-primary leading-[1.2] mb-6">
              {article.title}
            </h1>
            
            <p className="text-[18px] text-[#666] leading-[1.6]">
              {article.excerpt}
            </p>
          </header>

          <div className="markdown-body prose prose-lg prose-headings:font-serif prose-headings:text-theme-primary prose-a:text-theme-accent prose-p:text-[#444] leading-[1.8]">
            <ReactMarkdown>
              {article.content}
            </ReactMarkdown>
          </div>

          <div className="mt-20 pt-10 border-t border-[#eee] flex justify-between items-center bg-[#F8F7F2] p-8 rounded-[4px]">
            <div>
              <h4 className="font-serif text-[22px] text-theme-primary mb-2">Need local assistance?</h4>
              <p className="text-[#666] text-[15px]">We assist international travelers with exact logistics and certified drivers.</p>
            </div>
            <Link to="/contact" className="bg-theme-primary text-white font-bold uppercase tracking-[1px] text-[12px] px-8 py-3 rounded-[4px] hover:bg-[#3a4a3e] transition-colors shrink-0">
              Get in Touch
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
