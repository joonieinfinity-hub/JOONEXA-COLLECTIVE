import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, Building, DollarSign, MessageSquare, Send, ChevronDown, Target } from 'lucide-react';

const Contact: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [siteData, setSiteData] = useState<any>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  React.useEffect(() => {
    fetch('/api/site')
      .then(res => res.json())
      .then(data => setSiteData(data))
      .catch(err => console.error("Error fetching site data:", err));
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-32 px-6 bg-bg-soft">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <span className="text-accent-teal text-xs font-bold uppercase tracking-widest mb-4 inline-block">Contact Us</span>
            <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight text-charcoal mb-8 leading-tight">
              Let's build something <br />
              <span className="text-accent-rose italic">powerful.</span>
            </h2>
            <p className="text-lg text-muted max-w-md mb-8 leading-relaxed font-sans">
              Ready to scale your brand? Tell us about your project and we'll get back to you within 24 hours.
            </p>

            <button 
              onClick={scrollToForm}
              className="lg:hidden flex items-center gap-2 text-accent-rose font-bold text-sm uppercase tracking-widest mb-12 hover:text-deep-teal hover:scale-[1.05] transition-all font-sans"
            >
              Scroll to Form
              <ChevronDown size={16} />
            </button>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white border border-accent-rose/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent-rose" />
                </div>
                <div>
                  <p className="text-muted/40 text-xs font-bold uppercase tracking-widest mb-1 font-sans">Business Email</p>
                  <p className="text-charcoal font-medium font-sans">{siteData?.contactEmail || 'hello@joonexa-collective.com'}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white border border-accent-rose/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-accent-rose" />
                </div>
                <div>
                  <p className="text-muted/40 text-xs font-bold uppercase tracking-widest mb-1 font-sans">Founder Contact</p>
                  <p className="text-charcoal font-medium font-sans">{siteData?.founder || 'Rimi'} – Founder, {siteData?.name || 'Joonexa Collective'}</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            ref={formRef}
            id="contact-form"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-[2.5rem] border border-accent-rose/10 bg-white shadow-2xl shadow-accent-rose/5"
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-20 h-20 rounded-full bg-accent-rose/20 flex items-center justify-center mb-8">
                  <Send className="w-10 h-10 text-accent-rose" />
                </div>
                <h3 className="text-3xl font-display font-bold text-charcoal mb-4 tracking-tight">Message Sent!</h3>
                <p className="text-muted font-sans">Thank you for reaching out. We'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted/40 ml-2 font-sans">Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/20" />
                    <motion.input 
                      required
                      type="text" 
                      placeholder="Your Name"
                      whileFocus={{ 
                        scale: 1.01, 
                        borderColor: 'var(--color-accent-teal)',
                        boxShadow: '0 0 20px rgba(47, 127, 127, 0.1)'
                      }}
                      className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 pl-12 pr-4 text-charcoal focus:outline-none transition-all font-sans"
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted/40 ml-2 font-sans">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/20" />
                    <motion.input 
                      required
                      type="email" 
                      placeholder="Your Email"
                      whileFocus={{ 
                        scale: 1.01, 
                        borderColor: 'var(--color-accent-teal)',
                        boxShadow: '0 0 20px rgba(47, 127, 127, 0.1)'
                      }}
                      className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 pl-12 pr-4 text-charcoal focus:outline-none transition-all font-sans"
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted/40 ml-2 font-sans">Subject</label>
                  <div className="relative">
                    <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/20" />
                    <motion.input 
                      required
                      type="text" 
                      placeholder="Subject"
                      whileFocus={{ 
                        scale: 1.01, 
                        borderColor: 'var(--color-accent-teal)',
                        boxShadow: '0 0 20px rgba(47, 127, 127, 0.1)'
                      }}
                      className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 pl-12 pr-4 text-charcoal focus:outline-none transition-all font-sans"
                      value={formState.subject}
                      onChange={(e) => setFormState({...formState, subject: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted/40 ml-2 font-sans">Message</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-6 w-4 h-4 text-muted/20" />
                    <motion.textarea 
                      required
                      rows={4}
                      placeholder="Your message..."
                      whileFocus={{ 
                        scale: 1.01, 
                        borderColor: 'var(--color-accent-teal)',
                        boxShadow: '0 0 20px rgba(47, 127, 127, 0.1)'
                      }}
                      className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 pl-12 pr-4 text-charcoal focus:outline-none transition-all resize-none font-sans"
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                    />
                  </div>
                </div>

                <motion.button 
                  type="submit"
                  className="w-full btn-primary"
                >
                  Send Message
                  <Send className="w-5 h-5" />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
