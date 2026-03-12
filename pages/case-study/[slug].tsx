import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Project } from '../../types';
import { ArrowLeft, ArrowRight, ExternalLink, Award, Loader2, CheckCircle2, Target, Zap } from 'lucide-react';
import SEO from '../../components/SEO';

const CaseStudy: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        const found = data.projects.find((p: Project) => p.slug === slug);
        if (found) setProject(found);
        else navigate('/work');
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching project:", err);
        setLoading(false);
      });
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-soft">
        <Loader2 className="w-12 h-12 text-deep-teal animate-spin" />
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="bg-bg-soft min-h-screen">
      <SEO 
        title={`${project.projectName} | Case Study`}
        description={project.description}
      />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-accent-rose z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section className="relative h-[85vh] overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img 
            src={project.image} 
            alt={project.projectName}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-bg-soft" />
        </motion.div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link 
              to="/work" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-12 group font-sans uppercase tracking-widest text-xs font-black transition-all"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Portfolio
            </Link>
          </motion.div>

          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <span className="bg-accent-rose text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                {project.category}
              </span>
              <span className="bg-white/20 backdrop-blur-xl text-white border border-white/20 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                {project.type}
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-6xl md:text-9xl font-display font-bold text-white tracking-tighter leading-[0.85] mb-8"
            >
              {project.projectName}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="text-deep-teal text-xl md:text-2xl font-black uppercase tracking-[0.3em] font-sans"
            >
              {project.brandName}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-accent-rose text-xs font-black uppercase tracking-[0.3em] mb-6 inline-block font-sans">The Challenge</span>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-charcoal mb-10 tracking-tight leading-tight">
                  Strategic <span className="text-accent-teal italic">Overview</span>
                </h2>
                <p className="text-xl text-muted leading-relaxed font-sans mb-12 opacity-80">
                  {project.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="p-8 rounded-[2.5rem] bg-white border border-charcoal/5 shadow-xl shadow-charcoal/5">
                    <Target className="w-8 h-8 text-accent-rose mb-6" />
                    <h4 className="text-xl font-display font-bold text-charcoal mb-4">The Objective</h4>
                    <p className="text-muted text-sm leading-relaxed font-sans">
                      To establish a dominant market presence and drive meaningful engagement through authentic storytelling and strategic influencer alignment.
                    </p>
                  </div>
                  <div className="p-8 rounded-[2.5rem] bg-white border border-charcoal/5 shadow-xl shadow-charcoal/5">
                    <Zap className="w-8 h-8 text-accent-teal mb-6" />
                    <h4 className="text-xl font-display font-bold text-charcoal mb-4">Our Approach</h4>
                    <p className="text-muted text-sm leading-relaxed font-sans">
                      Leveraging data-driven insights to identify high-affinity creator networks and crafting immersive digital experiences that convert.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-charcoal rounded-[3rem] p-12 text-white sticky top-32"
              >
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent-rose mb-10 font-sans">Project Details</h4>
                <div className="space-y-10">
                  <div>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2 font-sans">Client</p>
                    <p className="text-2xl font-display font-bold">{project.brandName}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2 font-sans">Services</p>
                    <p className="text-2xl font-display font-bold">{project.category}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2 font-sans">Impact</p>
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-accent-teal" />
                      <p className="text-2xl font-display font-bold text-accent-teal">{project.result}</p>
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-12 py-5 bg-white text-charcoal rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-accent-rose hover:text-white transition-all duration-500 font-sans flex items-center justify-center gap-3 group">
                  Visit Website <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Execution Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-accent-teal text-xs font-black uppercase tracking-[0.3em] mb-6 inline-block font-sans"
            >
              The Process
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-display font-bold text-charcoal tracking-tight"
            >
              Execution & <span className="text-accent-rose italic">Craft</span>
            </motion.h2>
          </div>

          <div className="space-y-40">
            {[1, 2, 3].map((step, i) => (
              <div key={step} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-20 items-center`}>
                <motion.div 
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex-1"
                >
                  <div className="flex items-center gap-6 mb-8">
                    <span className="text-8xl font-display font-bold text-accent-rose/10 leading-none">0{step}</span>
                    <h3 className="text-3xl md:text-5xl font-display font-bold text-charcoal tracking-tight">
                      {i === 0 ? 'Creative Direction' : i === 1 ? 'Influencer Strategy' : 'Digital Deployment'}
                    </h3>
                  </div>
                  <p className="text-xl text-muted leading-relaxed font-sans opacity-80 mb-8">
                    {i === 0 
                      ? 'We developed a unique visual language that resonates with the target demographic, ensuring every touchpoint feels premium and authentic.'
                      : i === 1
                      ? 'By identifying high-impact creators who genuinely align with the brand values, we generated organic buzz and trust.'
                      : 'The final deployment focused on high-conversion landing pages and seamless user journeys that turn interest into action.'}
                  </p>
                  <ul className="space-y-4">
                    {['Strategic Alignment', 'Visual Storytelling', 'Performance Tracking'].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-charcoal font-bold font-sans text-sm">
                        <CheckCircle2 className="w-5 h-5 text-accent-teal" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex-1 w-full"
                >
                  <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl group">
                    <img 
                      src={`https://images.unsplash.com/photo-${1550000000000 + (step * 1000)}?q=80&w=1200&auto=format&fit=crop`}
                      alt="Process"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-charcoal rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-rose/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 text-center max-w-3xl mx-auto mb-20">
              <span className="text-accent-teal text-xs font-black uppercase tracking-[0.3em] mb-6 inline-block font-sans">The Outcome</span>
              <h2 className="text-4xl md:text-7xl font-display font-bold mb-8 tracking-tighter">
                Measurable <span className="text-accent-rose italic">Impact</span>
              </h2>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { label: 'Growth', value: project.result, desc: 'Increase in brand visibility' },
                { label: 'Engagement', value: '42%', desc: 'Average interaction rate' },
                { label: 'Conversion', value: '18.5%', desc: 'Direct sales attribution' }
              ].map((stat, i) => (
                <div key={i} className="text-center p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl">
                  <p className="text-accent-teal text-[10px] font-black uppercase tracking-widest mb-4 font-sans">{stat.label}</p>
                  <p className="text-5xl md:text-7xl font-display font-bold mb-4 tracking-tighter">{stat.value}</p>
                  <p className="text-white/40 text-sm font-sans">{stat.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Next Project CTA */}
      <section className="py-32 px-6 border-t border-charcoal/5">
        <div className="max-w-7xl mx-auto text-center">
          <Link to="/work" className="group inline-block">
            <span className="text-muted text-xs font-black uppercase tracking-[0.3em] mb-8 inline-block font-sans group-hover:text-accent-rose transition-colors">Next Project</span>
            <div className="flex items-center justify-center gap-8">
              <h2 className="text-5xl md:text-9xl font-display font-bold text-charcoal tracking-tighter group-hover:text-accent-rose transition-all duration-500">
                View All <span className="italic">Work</span>
              </h2>
              <ArrowRight className="w-12 h-12 md:w-24 md:h-24 text-accent-rose group-hover:translate-x-4 transition-transform duration-500" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CaseStudy;
