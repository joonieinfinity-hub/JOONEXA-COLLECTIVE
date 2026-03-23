import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Testimonial } from '../../types';
import { getSiteSettings } from '../../services/cmsService';

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: "Joonexa Collective transformed our digital presence. Their creator partnerships brought an authenticity we couldn't find elsewhere.",
    name: "Sarah Jenkins",
    title: "Marketing Director",
    company: "Aura Skincare",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: '2',
    quote: "The strategic approach Rimi and her team took for our launch was flawless. Our ROI exceeded all expectations.",
    name: "Marcus Thorne",
    title: "CEO",
    company: "Velo Tech",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: '3',
    quote: "Elegant design meets data-driven growth. Joonexa is the only agency we trust with our brand identity.",
    name: "Elena Rossi",
    title: "Founder",
    company: "Luxe Living",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop"
  }
];

const About: React.FC = () => {
  const [siteData, setSiteData] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSiteSettings();
      if (data) {
        setSiteData(data);
      }
    };
    fetchData();

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="about" className="py-32 px-6 bg-bg-soft">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-[3rem] overflow-hidden border border-accent-rose/10 shadow-2xl shadow-accent-rose/5"
          >
            <img 
              src={siteData?.aboutImage || siteData?.heroImage || "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop"} 
              alt={siteData?.agencyName || "Joonexa Office"}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-soft via-transparent to-transparent" />
          </motion.div>

          <div>
            <span className="text-accent-teal text-xs font-bold uppercase tracking-widest mb-4 inline-block">About Us</span>
            <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight text-charcoal mb-8 leading-tight">
              Creative Growth <br />
              for <span className="text-accent-rose italic">Modern</span> Brands.
            </h2>
            <p className="text-lg text-muted mb-8 leading-relaxed font-sans">
              {siteData?.aboutText || siteData?.tagline || 'Joonexa Collective is a modern marketing and creative agency focused on helping digital brands grow with strategy, design and creator collaborations.'}
            </p>
            <p className="text-lg text-muted mb-12 leading-relaxed font-sans">
              We believe in the power of authentic storytelling and data-driven strategy. Our mission is to bridge the gap between brands and their audiences through innovative digital experiences.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-4xl font-display font-bold text-charcoal mb-2">{siteData?.analytics?.brands || '50+'}</h4>
                <p className="text-muted/40 text-xs font-bold uppercase tracking-widest font-sans">Brands Scaled</p>
              </div>
              <div>
                <h4 className="text-4xl font-display font-bold text-charcoal mb-2">{siteData?.analytics?.reach || '10M+'}</h4>
                <p className="text-muted/40 text-xs font-bold uppercase tracking-widest font-sans">Reach Generated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Founder Section */}
        <div className="bg-white/40 backdrop-blur-sm border border-accent-rose/10 rounded-[3rem] p-12 md:p-20 shadow-xl shadow-accent-rose/5 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center">
            <div className="md:col-span-1">
              <div className="aspect-square rounded-full overflow-hidden border-4 border-accent-rose/20 p-2">
                <img 
                  src={siteData?.founderImage || "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=1000&auto=format&fit=crop"} 
                  alt={`${siteData?.founderName || 'Rimi'} - Founder`}
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <span className="text-accent-teal text-xs font-bold uppercase tracking-widest mb-4 inline-block">The Founder</span>
              <h3 className="text-3xl md:text-5xl font-display font-bold text-charcoal mb-6">{siteData?.founderName || 'Rimi'}</h3>
              <p className="text-xl text-muted font-medium mb-8 italic">
                "{siteData?.founderName || 'Rimi'} founded {siteData?.agencyName || 'Joonexa Collective'} to help modern brands scale with powerful design, smart marketing, and authentic creator partnerships."
              </p>
              <p className="text-muted/60 leading-relaxed font-sans">
                With a background in digital strategy and high-end design, {siteData?.founderName || 'Rimi'} has spent the last decade working with startups and established brands to redefine their digital presence. {siteData?.agencyName || 'Joonexa'} is the culmination of that experience—a collective of creators dedicated to excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="pt-12">
          <div className="text-center mb-16">
            <span className="text-accent-teal text-xs font-bold uppercase tracking-widest mb-4 inline-block">Testimonials</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-charcoal">
              What Our <span className="text-accent-rose italic">Clients</span> Say
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden px-4 py-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="bg-white p-12 md:p-20 rounded-[3rem] border border-accent-rose/10 shadow-2xl shadow-accent-rose/5 text-center"
                >
                  <div className="flex justify-center gap-1 mb-10">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-accent-rose fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <blockquote className="text-2xl md:text-3xl text-charcoal leading-relaxed font-display italic mb-12">
                    "{TESTIMONIALS[currentIndex].quote}"
                  </blockquote>
                  
                  <div className="flex flex-col items-center">
                    {TESTIMONIALS[currentIndex].image && (
                      <img 
                        src={TESTIMONIALS[currentIndex].image} 
                        alt={TESTIMONIALS[currentIndex].name}
                        className="w-20 h-20 rounded-full object-cover mb-6 border-4 border-accent-rose/10"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <h4 className="text-charcoal font-bold text-xl tracking-tight mb-1">{TESTIMONIALS[currentIndex].name}</h4>
                    <p className="text-muted/60 text-xs font-bold uppercase tracking-widest">
                      {TESTIMONIALS[currentIndex].title}, {TESTIMONIALS[currentIndex].company}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-8 mt-12">
              <button 
                onClick={prevTestimonial}
                className="w-14 h-14 rounded-full border border-accent-rose/20 flex items-center justify-center text-accent-rose hover:bg-accent-rose hover:text-white transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-accent-rose w-8' : 'bg-accent-rose/20'}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={nextTestimonial}
                className="w-14 h-14 rounded-full border border-accent-rose/20 flex items-center justify-center text-accent-rose hover:bg-accent-rose hover:text-white transition-all duration-300"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
