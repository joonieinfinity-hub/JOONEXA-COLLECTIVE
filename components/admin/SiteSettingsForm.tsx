import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, Globe, Mail, Phone, MapPin, Instagram, Linkedin, Link as LinkIcon, User, Building2, Quote } from 'lucide-react';
import { SiteSettings } from '../../types';

interface SiteSettingsFormProps {
  initialSettings: SiteSettings;
  onSave: (settings: SiteSettings) => Promise<void>;
}

const SiteSettingsForm: React.FC<SiteSettingsFormProps> = ({ initialSettings, onSave }) => {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('social.')) {
      const socialKey = name.split('.')[1];
      setSettings(prev => ({
        ...prev,
        social: {
          ...prev.social,
          [socialKey]: value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus('idle');
    try {
      await onSave(settings);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings(prev => ({
          ...prev,
          logo: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Basic Information */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-5 h-5 text-accent-rose" />
            <h3 className="text-xl font-display font-bold text-charcoal">Agency Identity</h3>
          </div>
          
          <div className="space-y-6 bg-white p-8 rounded-3xl border border-charcoal/5 shadow-sm">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-2 font-sans">Agency Name</label>
              <input 
                type="text" 
                name="agencyName"
                value={settings.agencyName}
                onChange={handleChange}
                className="w-full bg-bg-soft border border-charcoal/5 rounded-xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-2 font-sans">Founder Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
                <input 
                  type="text" 
                  name="founderName"
                  value={settings.founderName}
                  onChange={handleChange}
                  className="w-full bg-bg-soft border border-charcoal/5 rounded-xl py-4 pl-12 pr-6 focus:outline-none focus:border-accent-rose transition-all font-sans"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-2 font-sans">Company Tagline</label>
              <textarea 
                name="tagline"
                value={settings.tagline}
                onChange={handleChange}
                rows={3}
                className="w-full bg-bg-soft border border-charcoal/5 rounded-xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans resize-none"
              />
            </div>
          </div>
        </div>

        {/* Logo & Visuals */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-5 h-5 text-accent-rose" />
            <h3 className="text-xl font-display font-bold text-charcoal">Visual Assets</h3>
          </div>
          
          <div className="bg-white p-8 rounded-3xl border border-charcoal/5 shadow-sm space-y-8">
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 rounded-full overflow-hidden border border-accent-rose/20 bg-bg-soft p-1 flex-shrink-0">
                <img src={settings.logo} alt="Logo Preview" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-3 font-sans">Agency Logo</label>
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden" 
                    id="logo-upload" 
                  />
                  <label 
                    htmlFor="logo-upload"
                    className="flex items-center justify-center gap-2 py-3 px-6 bg-bg-soft border border-dashed border-charcoal/20 rounded-xl cursor-pointer hover:border-accent-rose hover:bg-accent-rose/5 transition-all font-sans text-sm font-bold text-charcoal"
                  >
                    <Upload className="w-4 h-4" />
                    Upload New Logo
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-2 font-sans">Hero Image URL</label>
              <input 
                type="text" 
                name="heroImage"
                value={settings.heroImage}
                onChange={handleChange}
                className="w-full bg-bg-soft border border-charcoal/5 rounded-xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans text-xs"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-5 h-5 text-accent-rose" />
            <h3 className="text-xl font-display font-bold text-charcoal">Contact Details</h3>
          </div>
          
          <div className="space-y-6 bg-white p-8 rounded-3xl border border-charcoal/5 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-2 font-sans">Contact Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
                  <input 
                    type="email" 
                    name="contactEmail"
                    value={settings.contactEmail}
                    onChange={handleChange}
                    className="w-full bg-bg-soft border border-charcoal/5 rounded-xl py-4 pl-12 pr-6 focus:outline-none focus:border-accent-rose transition-all font-sans"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-2 font-sans">Contact Phone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
                  <input 
                    type="text" 
                    name="contactPhone"
                    value={settings.contactPhone}
                    onChange={handleChange}
                    className="w-full bg-bg-soft border border-charcoal/5 rounded-xl py-4 pl-12 pr-6 focus:outline-none focus:border-accent-rose transition-all font-sans"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-2 font-sans">Business Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 w-4 h-4 text-muted/40" />
                <textarea 
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  rows={2}
                  className="w-full bg-bg-soft border border-charcoal/5 rounded-xl py-4 pl-12 pr-6 focus:outline-none focus:border-accent-rose transition-all font-sans resize-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-2 font-sans">Brand Partnership Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
                <input 
                  type="email" 
                  name="brandPartnershipEmail"
                  value={settings.brandPartnershipEmail}
                  onChange={handleChange}
                  className="w-full bg-bg-soft border border-charcoal/5 rounded-xl py-4 pl-12 pr-6 focus:outline-none focus:border-accent-rose transition-all font-sans"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Links & Social */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <Instagram className="w-5 h-5 text-accent-rose" />
            <h3 className="text-xl font-display font-bold text-charcoal">Links & Social</h3>
          </div>
          
          <div className="space-y-6 bg-white p-8 rounded-3xl border border-charcoal/5 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-2 font-sans">Instagram URL</label>
                <div className="relative">
                  <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
                  <input 
                    type="text" 
                    name="social.instagram"
                    value={settings.social.instagram}
                    onChange={handleChange}
                    className="w-full bg-bg-soft border border-charcoal/5 rounded-xl py-4 pl-12 pr-6 focus:outline-none focus:border-accent-rose transition-all font-sans"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-2 font-sans">LinkedIn URL</label>
                <div className="relative">
                  <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
                  <input 
                    type="text" 
                    name="social.linkedin"
                    value={settings.social.linkedin}
                    onChange={handleChange}
                    className="w-full bg-bg-soft border border-charcoal/5 rounded-xl py-4 pl-12 pr-6 focus:outline-none focus:border-accent-rose transition-all font-sans"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-2 font-sans">Creator Onboarding Link</label>
              <div className="relative">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
                <input 
                  type="text" 
                  name="creatorOnboardingLink"
                  value={settings.creatorOnboardingLink}
                  onChange={handleChange}
                  className="w-full bg-bg-soft border border-charcoal/5 rounded-xl py-4 pl-12 pr-6 focus:outline-none focus:border-accent-rose transition-all font-sans"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-8 border-t border-charcoal/5">
        <div className="flex items-center gap-4">
          {saveStatus === 'success' && (
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-accent-teal font-bold text-xs uppercase tracking-widest"
            >
              Changes saved successfully!
            </motion.p>
          )}
          {saveStatus === 'error' && (
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-accent-rose font-bold text-xs uppercase tracking-widest"
            >
              Failed to save changes.
            </motion.p>
          )}
        </div>
        
        <button 
          type="submit"
          disabled={isSaving}
          className={`btn-primary flex items-center gap-3 px-12 py-5 rounded-2xl shadow-xl shadow-accent-rose/20 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          <span className="uppercase tracking-widest text-xs font-bold">Save All Changes</span>
        </button>
      </div>
    </form>
  );
};

export default SiteSettingsForm;
