import { useParams, Navigate, Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';
import { articles as localFallbackArticles } from '../data/articles';
import { fetchArticleContent, fetchArticles } from '../services/notionService';

export default function Article() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const pageId = searchParams.get('id');

  const [articleState, setArticleState] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // 1. If we have a Notion ID in the URL, fetch from Notion API
      if (pageId) {
        try {
           const allArticles = await fetchArticles();
           const meta = allArticles.find((a: any) => a.id === pageId);
           const mdbocy = await fetchArticleContent(pageId);
           
           if (meta) {
             setArticleState({ ...meta, content: mdbocy });
           } else {
             // Fallback if metadata not found
             setArticleState({ title: "Loading...", content: mdbocy });
           }
        } catch (e) {
          console.error(e);
        }
      } 
      // 2. Otherwise fall back to our local data file
      else {
        const local = localFallbackArticles.find(a => a.slug === slug);
        setArticleState(local);
      }
      setIsLoading(false);
    }
    loadData();
  }, [slug, pageId]);

  if (!isLoading && !articleState) {
    // Redirect back to guide if article doesn't exist
    return <Navigate to="/enshi-travel-guide" />;
  }

  return (
    <>
      <Helmet>
        <title>{articleState?.title ? `${articleState.title} | Enshi Escapes` : 'Enshi Travel Guide | Enshi Escapes'}</title>
        {articleState?.excerpt && <meta name="description" content={articleState.excerpt} />}
        <link rel="canonical" href={`https://www.enshiescape.com/enshi-travel-guide/${slug}${pageId ? `?id=${pageId}` : ''}`} />
        
        {/* OpenGraph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={articleState?.title || 'Enshi Travel Guide'} />
        {articleState?.excerpt && <meta property="og:description" content={articleState.excerpt} />}
        <meta property="og:url" content={`https://www.enshiescape.com/enshi-travel-guide/${slug}${pageId ? `?id=${pageId}` : ''}`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={articleState?.title || 'Enshi Travel Guide'} />
        {articleState?.excerpt && <meta name="twitter:description" content={articleState.excerpt} />}
      </Helmet>

      <article className="pt-20 pb-24 bg-theme-bg min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link to="/enshi-travel-guide" className="inline-flex items-center gap-2 text-theme-primary opacity-80 hover:opacity-100 hover:text-theme-accent transition-colors mb-10 text-[13px] font-bold uppercase tracking-[1px]">
            <ArrowLeft className="w-4 h-4" /> Back to Travel Guide
          </Link>

          {isLoading ? (
            <div className="text-center py-20 text-[#666]">
               Loading article content...
            </div>
          ) : (
            <>
              <header className="mb-12 border-b border-[#eee] pb-8">
                <div className="flex items-center gap-4 mb-6">
                  {articleState.category && (
                    <span className="text-[11px] uppercase tracking-[1px] font-bold text-theme-accent bg-white shadow-sm border border-[#eee] px-3 py-1 rounded-[4px]">
                      {articleState.category}
                    </span>
                  )}
                  {articleState.date && (
                    <span className="text-[#999] text-[13px] font-serif italic">
                      {articleState.date}
                    </span>
                  )}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-serif text-theme-primary leading-[1.2] mb-6">
                  {articleState.title}
                </h1>
                
                {articleState.excerpt && (
                  <p className="text-[18px] text-[#666] leading-[1.6]">
                    {articleState.excerpt}
                  </p>
                )}
              </header>

              <div className="markdown-body prose prose-lg prose-headings:font-serif prose-headings:text-theme-primary prose-a:text-theme-accent prose-p:text-[#444] leading-[1.8]">
                <ReactMarkdown>
                  {articleState.content}
                </ReactMarkdown>
              </div>
            </>
          )}

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
