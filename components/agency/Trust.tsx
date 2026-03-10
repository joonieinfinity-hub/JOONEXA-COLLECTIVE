import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, TrendingUp, Users, MessageSquare, Heart } from 'lucide-react';

const Trust: React.FC = () => {
  const brands = [
    'Brand Alpha', 'Beta Dynamics', 'Gamma Studio', 'Delta Tech', 'Epsilon Media'
  ];

  return (
    <section className="py-32 border-y border-accent-rose/10 bg-bg-soft overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-24">
          <div>
            <span className="text-accent-teal text-xs font-bold uppercase tracking-widest mb-4 inline-block">Trusted by Leaders</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-charcoal mb-8">
              Proven results for <br />
              <span className="text-accent-rose italic">modern</span> enterprises.
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-12 font-sans">
              We've helped over 50+ brands redefine their digital presence and achieve sustainable growth through data-driven creativity and influencer partnerships.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-display font-bold text-charcoal mb-2">98%</div>
                <p className="text-muted/40 text-xs font-bold uppercase tracking-widest font-sans">Client Satisfaction</p>
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-charcoal mb-2">250%</div>
                <p className="text-muted/40 text-xs font-bold uppercase tracking-widest font-sans">Avg. Growth ROI</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 bg-white p-4 rounded-3xl shadow-2xl shadow-accent-rose/10 border border-black/5 aspect-[4/3.8]"
            >
                <div className="flex items-center justify-between px-2 pt-2 pb-4">
                    <div>
                        <h3 className="font-bold text-charcoal text-lg">Influencer Campaign Dashboard</h3>
                        <p className="text-xs text-muted">Project: <span className="font-semibold text-accent-rose">"Aura Launch"</span></p>
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted/60">Live</div>
                </div>

                <div className="grid grid-cols-3 gap-3 h-[calc(100%-4rem)]">
                    {/* KPIs */}
                    <div className="col-span-1 space-y-3">
                        <motion.div initial={{opacity: 0, x: -20}} whileInView={{opacity: 1, x: 0}} transition={{delay: 0.3}} className="bg-gray-50 p-3 rounded-xl border border-black/5">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-accent-teal"/>
                                <p className="text-[10px] text-muted font-bold uppercase tracking-wider">ROI</p>
                            </div>
                            <p className="text-2xl font-semibold text-charcoal mt-1">6.2x</p>
                        </motion.div>
                        <motion.div initial={{opacity: 0, x: -20}} whileInView={{opacity: 1, x: 0}} transition={{delay: 0.4}} className="bg-gray-50 p-3 rounded-xl border border-black/5">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-accent-rose"/>
                                <p className="text-[10px] text-muted font-bold uppercase tracking-wider">Impressions</p>
                            </div>
                            <p className="text-2xl font-semibold text-charcoal mt-1">12.7M</p>
                        </motion.div>
                        <motion.div initial={{opacity: 0, x: -20}} whileInView={{opacity: 1, x: 0}} transition={{delay: 0.5}} className="bg-gray-50 p-3 rounded-xl border border-black/5">
                            <div className="flex items-center gap-2">
                                <Heart className="w-4 h-4 text-accent-teal"/>
                                <p className="text-[10px] text-muted font-bold uppercase tracking-wider">Eng. Rate</p>
                            </div>
                            <p className="text-2xl font-semibold text-charcoal mt-1">8.9%</p>
                        </motion.div>
                    </div>
                    
                    {/* Top Influencers */}
                    <div className="col-span-2 bg-gray-50 rounded-2xl p-4 border border-black/5">
                        <p className="text-sm font-bold text-charcoal mb-3">Top Performers</p>
                        <div className="space-y-3">
                            {[
                                { name: 'Elena Rodriguez', img: 'influencer1', metric: '1.2x ROI' },
                                { name: 'Sam Chen', img: 'influencer2', metric: '1.5M Reach' },
                                { name: 'Aisha Khan', img: 'influencer3', metric: '12.3% Eng.' },
                                { name: 'Marcus Cole', img: 'influencer4', metric: '98k Likes' },
                            ].map((p, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 + i * 0.15 }}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <img src={`https://picsum.photos/seed/${p.img}/40/40`} alt={p.name} className="w-8 h-8 rounded-full object-cover border-2 border-white" referrerPolicy="no-referrer" />
                                        <p className="text-sm font-medium text-charcoal">{p.name}</p>
                                    </div>
                                    <p className={`text-xs font-bold ${i % 2 === 0 ? 'text-accent-teal' : 'text-accent-rose'}`}>{p.metric}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Content Section */}
                     <div className="col-span-full bg-gray-50 rounded-2xl p-4 border border-black/5">
                        <p className="text-sm font-bold text-charcoal mb-3">Campaign Content</p>
                        <div className="grid grid-cols-3 gap-3">
                            {[ 'post1', 'post2', 'post3' ].map((post, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{opacity: 0, y: 20}} 
                                    whileInView={{opacity: 1, y: 0}} 
                                    transition={{delay: 1 + i * 0.15}}
                                    className="aspect-square bg-gray-200 rounded-lg relative overflow-hidden"
                                >
                                    <img src={`https://picsum.photos/seed/${post}/200/200`} className="absolute inset-0 w-full h-full object-cover" alt={`Post ${i+1}`} referrerPolicy="no-referrer" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                                        <div className="flex items-center justify-end gap-2 text-white">
                                            <div className="flex items-center gap-1"><Heart className="w-3 h-3"/><p className="text-xs font-bold">{Math.floor(Math.random() * 8 + 2)}k</p></div>
                                            <div className="flex items-center gap-1"><MessageSquare className="w-3 h-3"/><p className="text-xs font-bold">{Math.floor(Math.random() * 400 + 50)}</p></div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, y: 50, x: 50 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                className="absolute -top-12 -right-12 w-48 h-48 bg-accent-rose/10 blur-3xl rounded-full -z-10" 
            />
            <motion.div 
                initial={{ opacity: 0, y: -50, x: -50 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                className="absolute -bottom-16 -left-16 w-64 h-64 bg-accent-teal/10 blur-3xl rounded-full -z-10" 
            />
          </div>
        </div>

        <div className="pt-12 border-t border-charcoal/5">
          <p className="text-center text-muted/40 text-[10px] font-bold uppercase tracking-[0.4em] mb-12 font-sans">
            Featured Partners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            {brands.map((brand, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-xl md:text-2xl font-display font-bold tracking-tight text-charcoal hover:text-accent-rose transition-colors cursor-default"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trust;
