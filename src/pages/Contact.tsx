import { Helmet } from 'react-helmet-async';
import BookingSystem from '../components/BookingSystem';
import { BreadcrumbJsonLd } from '../components/Seo';

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Enshi Escapes | Get a Free Custom Itinerary Quote</title>
        <meta name="description" content="Get in touch with Enshi Escapes to plan your custom itinerary. Book transfers, private cars, or English-speaking guides — no payment until your itinerary is confirmed." />
      </Helmet>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />

      {/* Booking Form Integration */}
      <div className="bg-theme-bg pt-12">
        <BookingSystem />
      </div>
      
      {/* General Contact Info */}
      <section className="py-20 bg-theme-bg pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-[32px] text-theme-primary mb-6">Other Inquiries</h2>
          <p className="text-[16px] text-[#666] leading-[1.6] mb-8 max-w-2xl mx-auto">
            Have a question that doesn't fit the booking form? Press inquiries, partnership opportunities, or general travel advice—we are always happy to connect.
          </p>
          <div className="inline-block border border-[#eee] bg-white p-8 rounded-[4px] shadow-[8px_8px_0px_rgba(74,93,78,0.05)] text-left">
            <h3 className="uppercase tracking-[1px] text-[12px] font-bold text-theme-ink mb-4">Direct Contact</h3>
            <ul className="space-y-3 text-[#555] font-serif">
              <li><strong>Email:</strong> <a href="mailto:zuhua.yang@slipstream.com.cn" className="text-theme-primary hover:text-theme-accent transition-colors">zuhua.yang@slipstream.com.cn</a></li>
              <li><strong>Office:</strong> Enshi City, Hubei Province, China</li>
              <li><strong>Hours:</strong> Mon-Sun, 9:00 AM - 6:00 PM (Beijing Time)</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
