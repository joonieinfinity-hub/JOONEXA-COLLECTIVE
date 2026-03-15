import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageUploader from './ImageUploader';

const ContentEditor: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
    aboutImage: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'siteSettings', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data() as any);
        }
      } catch (error) {
        console.error('Error fetching site settings:', error);
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
    try {
      const docRef = doc(db, 'siteSettings', 'main');
      await setDoc(docRef, data, { merge: true });
      toast.success('Content updated successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-accent-rose" /></div>;

  return (
    <form onSubmit={handleSave} className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Hero Section */}
        <div className="space-y-8">
          <h3 className="text-xl font-display font-bold text-charcoal flex items-center gap-3">
            <span className="w-8 h-8 bg-accent-rose/10 text-accent-rose rounded-lg flex items-center justify-center text-sm">01</span>
            Hero Section
          </h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Hero Headline</label>
              <input 
                type="text" 
                className="w-full bg-white border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans"
                value={data.heroHeadline}
                onChange={(e) => setData({...data, heroHeadline: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Hero Subtext</label>
              <textarea 
                rows={3}
                className="w-full bg-white border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans resize-none"
                value={data.heroSubtext}
                onChange={(e) => setData({...data, heroSubtext: e.target.value})}
              />
            </div>

            <ImageUploader 
              label="Hero Image"
              currentImageUrl={data.heroImage}
              onUploadSuccess={(url) => setData({...data, heroImage: url})}
              folder="site"
            />
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-8">
          <h3 className="text-xl font-display font-bold text-charcoal flex items-center gap-3">
            <span className="w-8 h-8 bg-accent-teal/10 text-accent-teal rounded-lg flex items-center justify-center text-sm">02</span>
            About Section
          </h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">About Headline</label>
              <input 
                type="text" 
                className="w-full bg-white border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans"
                value={data.aboutHeadline}
                onChange={(e) => setData({...data, aboutHeadline: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">About Description</label>
              <textarea 
                rows={6}
                className="w-full bg-white border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans resize-none"
                value={data.aboutDescription}
                onChange={(e) => setData({...data, aboutDescription: e.target.value})}
              />
            </div>

            <ImageUploader 
              label="About Image"
              currentImageUrl={data.aboutImage}
              onUploadSuccess={(url) => setData({...data, aboutImage: url})}
              folder="site"
            />
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-8 pt-8 border-t border-charcoal/5">
        <h3 className="text-xl font-display font-bold text-charcoal flex items-center gap-3">
          <span className="w-8 h-8 bg-charcoal/5 text-charcoal/40 rounded-lg flex items-center justify-center text-sm">03</span>
          Contact Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Contact Email</label>
            <input 
              type="email" 
              className="w-full bg-white border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans"
              value={data.contactEmail}
              onChange={(e) => setData({...data, contactEmail: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Founder Email</label>
            <input 
              type="email" 
              className="w-full bg-white border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans"
              value={data.founderEmail}
              onChange={(e) => setData({...data, founderEmail: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Phone Number</label>
            <input 
              type="text" 
              className="w-full bg-white border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans"
              value={data.phone}
              onChange={(e) => setData({...data, phone: e.target.value})}
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
          Save All Changes
        </button>
      </div>
    </form>
  );
};

export default ContentEditor;
