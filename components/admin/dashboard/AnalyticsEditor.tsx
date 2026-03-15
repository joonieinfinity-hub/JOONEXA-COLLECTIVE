import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Save, Loader2, Users, Building2, Rocket, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

const AnalyticsEditor: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  return (
    <form onSubmit={handleSave} className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-charcoal/5 space-y-4">
          <div className="w-12 h-12 bg-accent-rose/10 rounded-2xl flex items-center justify-center">
            <Users className="w-6 h-6 text-accent-rose" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Creators</label>
            <input 
              type="number" 
              className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans"
              value={data.creators}
              onChange={(e) => setData({...data, creators: parseInt(e.target.value) || 0})}
            />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-charcoal/5 space-y-4">
          <div className="w-12 h-12 bg-accent-teal/10 rounded-2xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-accent-teal" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Brands</label>
            <input 
              type="number" 
              className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans"
              value={data.brands}
              onChange={(e) => setData({...data, brands: parseInt(e.target.value) || 0})}
            />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-charcoal/5 space-y-4">
          <div className="w-12 h-12 bg-charcoal/5 rounded-2xl flex items-center justify-center">
            <Rocket className="w-6 h-6 text-charcoal/40" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Campaigns</label>
            <input 
              type="number" 
              className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans"
              value={data.campaigns}
              onChange={(e) => setData({...data, campaigns: parseInt(e.target.value) || 0})}
            />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-charcoal/5 space-y-4">
          <div className="w-12 h-12 bg-accent-rose/10 rounded-2xl flex items-center justify-center">
            <Globe className="w-6 h-6 text-accent-rose" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Total Reach</label>
            <input 
              type="text" 
              className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans"
              value={data.reach}
              onChange={(e) => setData({...data, reach: e.target.value})}
              placeholder="e.g. 500M+"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-8">
        <button 
          type="submit"
          disabled={saving}
          className="btn-primary px-12 py-5 flex items-center gap-3 shadow-xl shadow-accent-rose/20"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Update Analytics
        </button>
      </div>
    </form>
  );
};

export default AnalyticsEditor;
