import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Save, Loader2, Eye, Edit3, Globe, Layout, User, Phone, Mail, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import ImageUploader from './ImageUploader';
import { handleFirestoreError, OperationType } from '../../../services/errorService';

const ContentEditor: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [data, setData] = useState({
    siteName: '',
    heroHeadline: '',
    heroSubtext: '',
    contactEmail: '',
    founderEmail: '',
    phone: '',
    aboutHeadline: '',
    aboutDescription: '',
    heroImage: '',
    aboutImage: '',
    founderName: '',
    founderImage: '',
    tagline: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const path = 'siteSettings/main';
      try {
        const docRef = doc(db, 'siteSettings', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(prev => ({ ...prev, ...docSnap.data() }));
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, path);
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const path = 'siteSettings/main';
    try {
      const docRef = doc(db, 'siteSettings', 'main');
      await setDoc(docRef, data, { merge: true });
      toast.success('Content updated successfully');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
      toast.error('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-accent-rose" /></div>;

  return (
    <div className="space-y-8">
      {/* Tab Switcher */}
      <div className="flex p-1 bg-charcoal/5 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('edit')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'edit' ? 'bg-white text-charcoal shadow-sm' : 'text-muted hover:text-charcoal'}`}
        >
          <Edit3 className="w-4 h-4" />
          Edit Content
        </button>
        <button 
          onClick={() => setActiveTab('preview')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'preview' ? 'bg-white text-charcoal shadow-sm' : 'text-muted hover:text-charcoal'}`}
        >
          <Eye className="w-4 h-4" />
          Live Preview
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'edit' ? (
          <motion.form 
            key="edit"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSave} 
            className="space-y-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Hero Section */}
              <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-charcoal/5 shadow-xl shadow-black/5 space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-accent-rose/10 text-accent-rose rounded-2xl flex items-center justify-center">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-charcoal">Hero Section</h3>
                    <p className="text-xs text-muted font-sans font-medium uppercase tracking-widest">Main Landing Area</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted/40 ml-4 font-sans">Hero Headline</label>
                    <input 
                      type="text" 
                      className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans text-charcoal"
                      value={data.heroHeadline}
                      onChange={(e) => setData({...data, heroHeadline: e.target.value})}
                      placeholder="e.g. Connecting Brands with Authentic Creators"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted/40 ml-4 font-sans">Hero Subtext</label>
                    <textarea 
                      rows={3}
                      className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans resize-none text-charcoal"
                      value={data.heroSubtext}
                      onChange={(e) => setData({...data, heroSubtext: e.target.value})}
                      placeholder="Describe your agency's value proposition..."
                    />
                  </div>

                  <ImageUploader 
                    label="Hero Background Image"
                    currentImageUrl={data.heroImage}
                    onUploadSuccess={(url) => setData({...data, heroImage: url})}
                    folder="site"
                  />
                </div>
              </div>

              {/* About Section */}
              <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-charcoal/5 shadow-xl shadow-black/5 space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-accent-teal/10 text-accent-teal rounded-2xl flex items-center justify-center">
                    <Layout className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-charcoal">About Section</h3>
                    <p className="text-xs text-muted font-sans font-medium uppercase tracking-widest">Agency Story & Mission</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted/40 ml-4 font-sans">About Headline</label>
                    <input 
                      type="text" 
                      className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans text-charcoal"
                      value={data.aboutHeadline}
                      onChange={(e) => setData({...data, aboutHeadline: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted/40 ml-4 font-sans">About Description</label>
                    <textarea 
                      rows={6}
                      className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans resize-none text-charcoal"
                      value={data.aboutDescription}
                      onChange={(e) => setData({...data, aboutDescription: e.target.value})}
                    />
                  </div>

                  <ImageUploader 
                    label="About Section Image"
                    currentImageUrl={data.aboutImage}
                    onUploadSuccess={(url) => setData({...data, aboutImage: url})}
                    folder="site"
                  />
                </div>
              </div>
            </div>

            {/* Founder & Contact */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-[3rem] border border-charcoal/5 shadow-xl shadow-black/5 space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-charcoal/5 text-charcoal/40 rounded-2xl flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-charcoal">Contact Details</h3>
                    <p className="text-xs text-muted font-sans font-medium uppercase tracking-widest">Public Information</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted/40 ml-4 font-sans">Agency Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans text-charcoal"
                      value={data.siteName}
                      onChange={(e) => setData({...data, siteName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted/40 ml-4 font-sans">Contact Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans text-charcoal"
                      value={data.contactEmail}
                      onChange={(e) => setData({...data, contactEmail: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted/40 ml-4 font-sans">Founder Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans text-charcoal"
                      value={data.founderEmail}
                      onChange={(e) => setData({...data, founderEmail: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted/40 ml-4 font-sans">Phone Number</label>
                    <input 
                      type="text" 
                      className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans text-charcoal"
                      value={data.phone}
                      onChange={(e) => setData({...data, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-charcoal/5 shadow-xl shadow-black/5 space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-accent-teal/10 text-accent-teal rounded-2xl flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-charcoal">Founder Profile</h3>
                    <p className="text-xs text-muted font-sans font-medium uppercase tracking-widest">Personal Branding</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted/40 ml-4 font-sans">Founder Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans text-charcoal"
                      value={data.founderName}
                      onChange={(e) => setData({...data, founderName: e.target.value})}
                    />
                  </div>
                  <ImageUploader 
                    label="Founder Portrait"
                    currentImageUrl={data.founderImage}
                    onUploadSuccess={(url) => setData({...data, founderImage: url})}
                    folder="founder"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-8">
              <button 
                type="submit"
                disabled={saving}
                className="btn-primary px-12 py-5 flex items-center gap-3 shadow-xl shadow-accent-rose/20 group"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                Save All Changes
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div 
            key="preview"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-12"
          >
            <div className="bg-charcoal p-4 rounded-[3rem] border border-white/10 overflow-hidden shadow-3xl shadow-black/50">
              <div className="flex items-center gap-2 mb-4 px-6 py-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-rose/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-teal/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <div className="mx-auto text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Live Preview Mode</div>
              </div>

              {/* Simplified Hero Preview */}
              <div className="relative min-h-[500px] flex flex-col items-center justify-center text-center p-12 overflow-hidden rounded-[2.5rem]">
                <div className="absolute inset-0 z-0">
                  {data.heroImage ? (
                    <img src={data.heroImage} alt="Hero" className="w-full h-full object-cover opacity-30 grayscale" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full bg-charcoal/20" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/40 to-charcoal" />
                </div>
                <div className="relative z-10 max-w-3xl">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-white/60 bg-white/5 text-[10px] font-bold uppercase tracking-widest mb-6">
                    <Sparkles className="w-3 h-3 text-accent-rose" />
                    Previewing Site Content
                  </span>
                  <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                    {data.heroHeadline || 'Your Hero Headline Here'}
                  </h1>
                  <p className="text-lg text-white/60 font-sans max-w-2xl mx-auto mb-10">
                    {data.heroSubtext || 'Your hero subtext will appear here to describe your agency.'}
                  </p>
                  <div className="flex gap-4 justify-center">
                    <div className="px-8 py-4 bg-accent-teal text-white rounded-full font-bold text-sm">Start Your Project</div>
                    <div className="px-8 py-4 border border-white/10 text-white rounded-full font-bold text-sm">View Our Work</div>
                  </div>
                </div>
              </div>

              {/* Simplified About Preview */}
              <div className="bg-white rounded-[2.5rem] mt-4 p-12 md:p-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl shadow-accent-rose/10">
                    {data.aboutImage ? (
                      <img src={data.aboutImage} alt="About" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full bg-charcoal/5 flex items-center justify-center">
                        <Layout className="w-12 h-12 text-charcoal/10" />
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="text-accent-teal text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block">About Us</span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-charcoal mb-6 leading-tight">
                      {data.aboutHeadline || 'Creative Growth for Modern Brands'}
                    </h2>
                    <p className="text-lg text-muted leading-relaxed font-sans mb-8">
                      {data.aboutDescription || 'Your agency story and mission will be displayed here.'}
                    </p>
                    <div className="flex items-center gap-6 p-6 bg-bg-soft rounded-3xl border border-charcoal/5">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent-rose/20">
                        {data.founderImage ? (
                          <img src={data.founderImage} alt="Founder" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="w-full h-full bg-charcoal/10 flex items-center justify-center">
                            <User className="w-6 h-6 text-charcoal/20" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-display font-bold text-charcoal">{data.founderName || 'Founder Name'}</div>
                        <div className="text-xs text-muted font-sans">Founder & Creative Director</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentEditor;
