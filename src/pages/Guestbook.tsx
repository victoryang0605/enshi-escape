import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Star, MessageSquare, Loader2, CheckCircle, ImagePlus, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { BreadcrumbJsonLd } from '../components/Seo';

export default function Guestbook() {
  const [showForm, setShowForm] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    country: '',
    title: '',
    review: '',
    rating: 5
  });
  
  // Image handling
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          console.error('Invalid reviews response:', data);
          setReviews([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching reviews:', err);
        setReviews([]);
        setLoading(false);
      });
  }, []);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = Array.from(e.target.files || []);
    
    // Limits
    const newPhotosCount = selectedPhotos.length + files.length;
    if (newPhotosCount > 3) {
      alert("You can only upload a maximum of 3 photos.");
      return;
    }

    files.forEach(file => {
      // 5MB limit
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is larger than 5MB. Please choose a smaller file.`);
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setSelectedPhotos(prev => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
    
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removePhoto = (indexToRemove: number) => {
    setSelectedPhotos(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        photos: selectedPhotos
      };
      
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', country: '', title: '', review: '', rating: 5 });
        setSelectedPhotos([]);
        setTimeout(() => {
          setShowForm(false);
          setSubmitSuccess(false);
        }, 3000);
      } else {
        const errorData = await res.json();
        console.error("Backend Error Data:", errorData);
        alert(`Failed to submit: ${errorData.details || errorData.error}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 bg-theme-bg">
      <Helmet>
        <title>Traveler Stories & Reviews | Enshi Escapes</title>
        <meta name="description" content="Read reviews and stories from international travelers who have explored the Enshi Grand Canyon and Pingshan with Enshi Escapes." />
        {reviews.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Enshi Escapes Private Tours",
              "description": "Premium guided tours and logistics for the Enshi Grand Canyon and western Hubei regions.",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1),
                "reviewCount": reviews.length,
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": reviews.slice(0, 5).map(r => ({
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": r.name
                },
                "datePublished": new Date(r.date).toISOString().split('T')[0],
                "reviewBody": r.content,
                "name": r.title,
                "reviewRating": {
                  "@type": "Rating",
                  "bestRating": "5",
                  "ratingValue": r.rating,
                  "worstRating": "1"
                }
              }))
            })}
          </script>
        )}
      </Helmet>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Reviews", path: "/guestbook" }]} />

      {/* Header */}
      <section className="bg-theme-secondary/20 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-[42px] md:text-[56px] text-theme-ink tracking-tight mb-6"
          >
            Traveler Stories &amp; Reviews
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[18px] text-theme-ink/70 leading-[1.6] max-w-2xl mx-auto mb-8"
          >
            Read about the adventures, hikes, and cultural experiences of our guests from around the world.
          </motion.p>
          
          {!showForm && !submitSuccess && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={() => setShowForm(true)}
              className="mt-8 flex items-center gap-2 mx-auto bg-theme-primary text-white px-6 py-3 rounded uppercase tracking-widest text-sm font-semibold hover:shadow-[0_4px_12px_rgba(74,93,78,0.3)] transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Share Your Experience
            </motion.button>
          )}
        </div>
      </section>

      {/* Write Review Form */}
      {showForm && (
        <section className="py-12 px-4 bg-white border-b border-[#eee]">
          <div className="max-w-2xl mx-auto">
            {submitSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-theme-primary" />
                <h3 className="text-2xl font-serif text-theme-ink mb-2">Thank you for sharing!</h3>
                <p className="text-theme-ink/70">Your review has been submitted and is pending approval.</p>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-serif text-[24px] text-theme-ink">Write a Review</h3>
                  <button onClick={() => setShowForm(false)} className="text-theme-ink/50 hover:text-theme-ink text-sm uppercase tracking-widest">
                    Cancel
                  </button>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2 text-theme-ink/70">Name</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full border border-[#eee] p-3 rounded bg-[#fcfcfc] focus:outline-none focus:border-theme-primary transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2 text-theme-ink/70">Country</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.country}
                        onChange={e => setFormData({...formData, country: e.target.value})}
                        className="w-full border border-[#eee] p-3 rounded bg-[#fcfcfc] focus:outline-none focus:border-theme-primary transition-colors" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2 text-theme-ink/70">Rating</label>
                      <select 
                        value={formData.rating}
                        onChange={e => setFormData({...formData, rating: Number(e.target.value)})}
                        className="w-full border border-[#eee] p-3 rounded bg-[#fcfcfc] focus:outline-none focus:border-theme-primary transition-colors"
                      >
                        <option value="5">5 Stars - Excellent</option>
                        <option value="4">4 Stars - Very Good</option>
                        <option value="3">3 Stars - Average</option>
                        <option value="2">2 Stars - Poor</option>
                        <option value="1">1 Star - Terrible</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm mb-2 text-theme-ink/70">Review Title</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        className="w-full border border-[#eee] p-3 rounded bg-[#fcfcfc] focus:outline-none focus:border-theme-primary transition-colors" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-theme-ink/70">Your Story</label>
                    <textarea 
                      rows={5} 
                      required 
                      value={formData.review}
                      onChange={e => setFormData({...formData, review: e.target.value})}
                      className="w-full border border-[#eee] p-3 rounded bg-[#fcfcfc] focus:outline-none focus:border-theme-primary transition-colors"
                    ></textarea>
                  </div>
                  
                  {/* Photo Upload Section */}
                  <div>
                    <label className="block text-sm mb-2 text-theme-ink/70">Add Photos (Max 3, up to 5MB each)</label>
                    
                    {/* Previews */}
                    {selectedPhotos.length > 0 && (
                      <div className="flex gap-3 mb-4 flex-wrap">
                        {selectedPhotos.map((photoStr, index) => (
                          <div key={index} className="relative w-24 h-24 rounded border border-[#eee] overflow-hidden group">
                            <img src={photoStr} alt="thumbnail" className="w-full h-full object-cover" />
                            <button 
                              type="button"
                              onClick={() => removePhoto(index)}
                              className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Add Button */}
                    {selectedPhotos.length < 3 && (
                      <div>
                        <input 
                          type="file" 
                          accept="image/*" 
                          multiple 
                          className="hidden" 
                          ref={fileInputRef}
                          onChange={handlePhotoSelect}
                        />
                        <button 
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-2 border border-dashed border-[#ccc] text-theme-ink/60 px-4 py-3 rounded hover:bg-[#fafafa] hover:text-theme-ink transition-colors text-sm"
                        >
                          <ImagePlus className="w-4 h-4" />
                          Select Photos
                        </button>
                      </div>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="bg-theme-ink text-white px-8 py-3 rounded uppercase tracking-widest text-sm font-semibold hover:bg-theme-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Reviews List */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-theme-ink/50">
              <Loader2 className="w-8 h-8 animate-spin mb-4" />
              <p className="uppercase tracking-widest text-sm">Loading traveler stories...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12 text-theme-ink/50 border border-dashed border-[#ddd] p-8">
              <p>No published reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            reviews.map((review, index) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 md:p-12 border border-[#eee] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-theme-accent text-theme-accent" />
                      ))}
                      {[...Array(5 - review.rating)].map((_, i) => (
                        <Star key={i + review.rating} className="w-5 h-5 fill-[#eee] text-[#eee]" />
                      ))}
                    </div>
                    <h3 className="font-serif text-[24px] text-theme-ink mb-4 leading-tight">{review.title}</h3>
                    <p className="text-theme-ink/70 leading-[1.8] mb-6 italic whitespace-pre-wrap">"{review.content}"</p>
                    
                    <div className="text-[13px] uppercase tracking-widest">
                      <span className="font-semibold text-theme-ink">{review.name}</span>
                      <span className="text-theme-ink/30 mx-3">|</span>
                      <span className="text-theme-ink/60">{review.country}</span>
                      <span className="text-theme-ink/30 mx-3">•</span>
                      <span className="text-theme-ink/60">{review.date}</span>
                    </div>
                  </div>
                  
                  {review.photos && review.photos.length > 0 && (
                    <div className="w-full md:w-[280px] shrink-0 grid grid-cols-2 gap-2 mt-6 md:mt-0">
                      {review.photos.map((photo: string, i: number) => (
                        <img 
                          key={i} 
                          src={photo} 
                          alt={review.photoAlt || `Review photo by ${review.name} - Enshi Escapes`}
                          className={`w-full object-cover rounded-xl border border-[#eee] ${
                            (i === 0 && review.photos.length === 3) || review.photos.length === 1 
                              ? 'col-span-2 aspect-video' 
                              : 'aspect-square'
                          }`} 
                          referrerPolicy="no-referrer" 
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
