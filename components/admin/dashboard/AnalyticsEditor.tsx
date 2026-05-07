import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Save, Loader2, Users, Building2, Rocket, Globe, Sparkles, Eye, Edit3, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const AnalyticsEditor: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [data, setData] = useState({
    creators: 0,
    brands: 0,
    campaigns: 0,
    reach: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'siteSettings', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const d = docSnap.data();
          setData({
            creators: d.creators || 0,
            brands: d.brands || 0,
            campaigns: d.campaigns || 0,
            reach: d.reach || ''
          });
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
        toast.error('Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const docRef = doc(db, 'siteSettings', 'main');
      await setDoc(docRef, data, { merge: true });
      toast.success('Analytics updated successfully');
    } catch (error) {
      console.error('Error saving analytics:', error);
      toast.error('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-accent-rose" /></div>;

  const StatInput = ({ label, icon: Icon, value, onChange, type = 'number', color = 'rose', placeholder = '' }: any) => (
    <div className="bg-white p-8 rounded-[3rem] border border-charcoal/5 shadow-xl shadow-black/5 space-y-6">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color === 'rose' ? 'bg-accent-rose/10 text-accent-rose' : 'bg-accent-teal/10 text-accent-teal'}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted/40 ml-4 font-sans">{label}</label>
        <input 
          type={type} 
          className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans text-charcoal font-bold text-lg"
          value={value}
          onChange={(e) => onChange(type === 'number' ? parseInt(e.target.value) || 0 : e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Tab Switcher */}
      <div className="flex p-1 bg-charcoal/5 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('edit')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'edit' ? 'bg-white text-charcoal shadow-sm' : 'text-muted hover:text-charcoal'}`}
        >
          <Edit3 className="w-4 h-4" />
          Edit Stats
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatInput label="Creators" icon={Users} value={data.creators} onChange={(v: any) => setData({...data, creators: v})} color="rose" />
              <StatInput label="Brands" icon={Building2} value={data.brands} onChange={(v: any) => setData({...data, brands: v})} color="teal" />
              <StatInput label="Campaigns" icon={Rocket} value={data.campaigns} onChange={(v: any) => setData({...data, campaigns: v})} color="teal" />
              <StatInput label="Total Reach" icon={Globe} value={data.reach} onChange={(v: any) => setData({...data, reach: v})} type="text" color="rose" placeholder="e.g. 500M+" />
            </div>

            <div className="flex justify-end pt-8">
              <button 
                type="submit"
                disabled={saving}
                className="btn-primary px-12 py-5 flex items-center gap-3 shadow-xl shadow-accent-rose/20 group"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                Update Analytics
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div 
            key="preview"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-charcoal p-12 md:p-20 rounded-[4rem] border border-white/10 shadow-3xl shadow-black/50"
          >
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-white/60 bg-white/5 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-3 h-3 text-accent-rose" />
                Live Analytics Preview
              </span>
              <h2 className="text-4xl font-display font-bold text-white">Our Impact in Numbers</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                { label: 'Creators', value: `${data.creators}+`, icon: Users, color: 'rose' },
                { label: 'Brands Scaled', value: `${data.brands}+`, icon: Building2, color: 'teal' },
                { label: 'Campaigns', value: `${data.campaigns}+`, icon: Rocket, color: 'teal' },
                { label: 'Total Reach', value: data.reach || '0', icon: Globe, color: 'rose' }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[3rem] text-center group hover:bg-white/10 transition-all duration-500">
                  <div className={`w-12 h-12 mx-auto mb-6 rounded-2xl flex items-center justify-center ${stat.color === 'rose' ? 'bg-accent-rose/20 text-accent-rose' : 'bg-accent-teal/20 text-accent-teal'}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-display font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-[10px] text-white/40 font-black uppercase tracking-widest">{stat.label}</div>
                  
                  <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-accent-teal">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-[10px] font-bold">Growing Daily</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnalyticsEditor;
