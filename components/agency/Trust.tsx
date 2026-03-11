import React from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, Users, Zap, ArrowUpRight } from 'lucide-react';

const data = [
  { name: 'Jan', value: 400, reach: 2400 },
  { name: 'Feb', value: 300, reach: 1398 },
  { name: 'Mar', value: 600, reach: 9800 },
  { name: 'Apr', value: 800, reach: 3908 },
  { name: 'May', value: 500, reach: 4800 },
  { name: 'Jun', value: 900, reach: 3800 },
  { name: 'Jul', value: 1100, reach: 4300 },
];

const Trust: React.FC = () => {
  const brands = [
    'Brand Alpha', 'Beta Dynamics', 'Gamma Studio', 'Delta Tech', 'Epsilon Media'
  ];

  return (
    <section className="relative py-32 border-y border-accent-rose/10 bg-bg-soft overflow-hidden">
      {/* Background High-Res Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
          alt="Data Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-teal/10 text-accent-teal text-[10px] font-bold uppercase tracking-widest mb-6 font-sans">
              <Zap className="w-3 h-3" /> Trusted by Global Leaders
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-charcoal mb-8 leading-[1.1]">
              Proven results for <br />
              <span className="text-accent-rose italic">modern</span> enterprises.
            </h2>
            <p className="text-xl text-muted leading-relaxed mb-12 font-sans max-w-xl">
              We've helped over 50+ brands redefine their digital presence and achieve sustainable growth through data-driven creativity and influencer partnerships.
            </p>
            
            <div className="grid grid-cols-2 gap-12">
              <div className="relative">
                <div className="text-5xl font-display font-bold text-charcoal mb-2">98%</div>
                <p className="text-muted/60 text-xs font-bold uppercase tracking-widest font-sans">Client Satisfaction</p>
                <div className="absolute -left-4 top-0 w-1 h-full bg-accent-rose/20 rounded-full" />
              </div>
              <div className="relative">
                <div className="text-5xl font-display font-bold text-charcoal mb-2">250%</div>
                <p className="text-muted/60 text-xs font-bold uppercase tracking-widest font-sans">Avg. Growth ROI</p>
                <div className="absolute -left-4 top-0 w-1 h-full bg-accent-teal/20 rounded-full" />
              </div>
            </div>
          </motion.div>

          <div className="relative">
            {/* Main Dashboard Card with Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[3.5rem] border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden"
            >
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="h-4 w-px bg-charcoal/10 mx-2" />
                  <div className="text-[11px] font-bold uppercase tracking-widest text-charcoal/60 font-sans">Analytics Engine v2.0</div>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Live Sync</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="p-6 rounded-[2rem] bg-gradient-to-br from-white to-bg-soft border border-charcoal/5 relative overflow-hidden group shadow-sm">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Users className="w-12 h-12 text-accent-teal" />
                  </div>
                  <p className="text-[11px] font-bold text-muted/50 uppercase tracking-widest mb-2 font-sans">Total Reach</p>
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-3xl font-display font-bold text-charcoal">1,248,392</h4>
                    <span className="text-xs font-bold text-emerald-500 flex items-center bg-emerald-500/10 px-2 py-0.5 rounded-lg">
                      <ArrowUpRight className="w-3 h-3 mr-0.5" /> 12.4%
                    </span>
                  </div>
                </div>
                <div className="p-6 rounded-[2rem] bg-gradient-to-br from-white to-bg-soft border border-charcoal/5 relative overflow-hidden group shadow-sm">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Zap className="w-12 h-12 text-accent-rose" />
                  </div>
                  <p className="text-[11px] font-bold text-muted/50 uppercase tracking-widest mb-2 font-sans">Conversion</p>
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-3xl font-display font-bold text-charcoal">8.42%</h4>
                    <span className="text-xs font-bold text-accent-rose flex items-center bg-accent-rose/10 px-2 py-0.5 rounded-lg">
                      <ArrowUpRight className="w-3 h-3 mr-0.5" /> 4.2%
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Chart with Enhanced Visuals */}
              <div className="h-56 w-full mb-10 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-soft/20 pointer-events-none" />
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2F7F7F" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#2F7F7F" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E8A9A9" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#E8A9A9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#999', fontWeight: 600 }} 
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip 
                      cursor={{ stroke: '#2F7F7F', strokeWidth: 1, strokeDasharray: '5 5' }}
                      contentStyle={{ 
                        borderRadius: '20px', 
                        border: '1px solid rgba(0,0,0,0.05)', 
                        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.1)',
                        fontSize: '11px',
                        fontFamily: 'Inter',
                        padding: '12px 16px'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#2F7F7F" 
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                      animationDuration={2000}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="reach" 
                      stroke="#E8A9A9" 
                      strokeWidth={2}
                      strokeDasharray="6 6"
                      fillOpacity={1} 
                      fill="url(#colorReach)" 
                      animationDuration={2500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Bottom Row with High-Res Avatars */}
              <div className="flex items-center justify-between pt-8 border-t border-charcoal/5">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ y: -5, zIndex: 50 }}
                        className="w-9 h-9 rounded-full border-2 border-white bg-bg-soft overflow-hidden shadow-sm cursor-pointer"
                      >
                        <img src={`https://picsum.photos/seed/user${i+10}/100/100`} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </motion.div>
                    ))}
                    <div className="w-9 h-9 rounded-full border-2 border-white bg-charcoal text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                      +24
                    </div>
                  </div>
                  <div className="h-6 w-px bg-charcoal/10" />
                  <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Active Creators</span>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 bg-charcoal text-white px-6 py-3 rounded-2xl shadow-xl shadow-charcoal/20"
                >
                  <span className="text-xs font-bold tracking-wider uppercase">Full Report</span>
                  <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
            
            {/* Decorative Elements - High Res Image Floating */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1 }}
              className="absolute -right-12 -bottom-12 z-20 w-64 h-64 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl hidden xl:block"
            >
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop" 
                alt="High Res Analytics" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-accent-teal/20 mix-blend-overlay" />
            </motion.div>

            {/* Floating Optimization Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="absolute -left-12 top-1/3 z-20 bg-white p-5 rounded-3xl shadow-2xl border border-charcoal/5 hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-accent-rose text-white flex items-center justify-center shadow-lg shadow-accent-rose/20">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[9px] font-bold text-muted/50 uppercase tracking-widest">Growth Index</div>
                  <div className="text-sm font-bold text-charcoal">94.2 / 100</div>
                </div>
              </div>
            </motion.div>

            {/* Background Glows */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-accent-rose/15 blur-[100px] rounded-full animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent-teal/15 blur-[100px] rounded-full" />
          </div>
        </div>

        {/* Partners Section */}
        <div className="pt-20 border-t border-charcoal/5">
          <p className="text-center text-muted/40 text-[11px] font-bold uppercase tracking-[0.5em] mb-16 font-sans">
            Global Enterprise Partners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 opacity-40 grayscale hover:grayscale-0 transition-all duration-1000">
            {brands.map((brand, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-2xl md:text-3xl font-display font-bold tracking-tighter text-charcoal hover:text-accent-teal transition-all cursor-default hover:scale-110"
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
