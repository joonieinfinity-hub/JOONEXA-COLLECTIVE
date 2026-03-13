import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Settings, LogOut, ExternalLink, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SiteSettingsForm from '../../components/admin/SiteSettingsForm';
import { SiteSettings } from '../../types';

const FounderDashboard: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if logged in (simple check for now, could be improved with real auth)
    const isAuth = localStorage.getItem('founderAuth') === 'true';
    if (!isAuth) {
      navigate('/');
      return;
    }

    fetchSettings();
  }, [navigate]);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async (newSettings: SiteSettings) => {
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSettings),
      });

      if (response.ok) {
        setSettings(newSettings);
        // Refresh the page or update global state if needed
        window.location.reload(); // Simple way to ensure all components get new data
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('founderAuth');
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-soft flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent-rose/20 border-t-accent-rose rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-soft flex">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-charcoal/5 flex flex-col fixed h-full z-20">
        <div className="p-8 border-b border-charcoal/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-accent-rose rounded-xl flex items-center justify-center shadow-lg shadow-accent-rose/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-charcoal leading-none">Joonexa</h1>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted mt-1">Studio Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <button className="w-full flex items-center gap-4 px-6 py-4 bg-accent-rose/5 text-accent-rose rounded-2xl font-bold text-sm transition-all">
            <Settings className="w-5 h-5" />
            Site Settings
          </button>
          <button 
            onClick={() => navigate('/work')}
            className="w-full flex items-center gap-4 px-6 py-4 text-muted hover:bg-bg-soft hover:text-charcoal rounded-2xl font-bold text-sm transition-all"
          >
            <LayoutDashboard className="w-5 h-5" />
            Portfolio
          </button>
        </nav>

        <div className="p-6 border-t border-charcoal/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 text-accent-rose hover:bg-accent-rose/5 rounded-2xl font-bold text-sm transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-80 p-12">
        <div className="max-w-5xl mx-auto">
          <header className="flex justify-between items-end mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-accent-rose/10 text-accent-rose px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-accent-rose/20">
                  Dashboard
                </span>
              </div>
              <h2 className="text-5xl font-display font-bold text-charcoal tracking-tight">Site Settings</h2>
              <p className="text-muted mt-4 max-w-xl text-lg font-sans">
                Manage your agency's identity, contact information, and visual assets across the entire platform.
              </p>
            </div>
            <a 
              href="/" 
              target="_blank" 
              className="flex items-center gap-2 text-charcoal/60 hover:text-accent-rose transition-colors text-sm font-bold uppercase tracking-widest"
            >
              View Live Site
              <ExternalLink className="w-4 h-4" />
            </a>
          </header>

          {settings && (
            <SiteSettingsForm 
              initialSettings={settings} 
              onSave={handleSaveSettings} 
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default FounderDashboard;
