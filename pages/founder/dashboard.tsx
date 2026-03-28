import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Sparkles, 
  Briefcase, 
  CreditCard, 
  BarChart3,
  User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { Toaster } from 'react-hot-toast';

// Dashboard Sections
import ContentEditor from '../../components/admin/dashboard/ContentEditor';
import PortfolioManager from '../../components/admin/dashboard/PortfolioManager';
import PricingSettings from '../../components/admin/dashboard/PricingSettings';
import AnalyticsEditor from '../../components/admin/dashboard/AnalyticsEditor';

type Section = 'content' | 'portfolio' | 'pricing' | 'analytics';

const FounderDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('content');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email === "rimi@joonexa-collective.com") {
        setUser(currentUser);
      } else {
        navigate('/login');
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-soft flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent-rose/20 border-t-accent-rose rounded-full animate-spin" />
      </div>
    );
  }

  const navItems = [
    { id: 'content', label: 'Content Editor', icon: Settings, color: 'text-accent-rose', bg: 'bg-accent-rose/5' },
    { id: 'portfolio', label: 'Portfolio Manager', icon: Briefcase, color: 'text-accent-teal', bg: 'bg-accent-teal/5' },
    { id: 'pricing', label: 'Pricing Settings', icon: CreditCard, color: 'text-charcoal', bg: 'bg-charcoal/5' },
    { id: 'analytics', label: 'Analytics Editor', icon: BarChart3, color: 'text-accent-rose', bg: 'bg-accent-rose/5' },
  ];

  return (
    <div className="min-h-screen bg-bg-soft flex">
      <Toaster position="bottom-right" />
      
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
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveSection(item.id as Section)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${
                activeSection === item.id 
                  ? `${item.bg} ${item.color}` 
                  : 'text-muted hover:bg-bg-soft hover:text-charcoal'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-charcoal/5 space-y-4">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 bg-bg-soft rounded-full flex items-center justify-center border border-charcoal/5">
              <User className="w-4 h-4 text-muted" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] font-bold text-charcoal truncate">{user?.email}</p>
              <p className="text-[8px] text-muted uppercase tracking-widest">Founder Account</p>
            </div>
          </div>
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
              <h2 className="text-5xl font-display font-bold text-charcoal tracking-tight">
                {navItems.find(i => i.id === activeSection)?.label}
              </h2>
              <p className="text-muted mt-4 max-w-xl text-lg font-sans">
                {activeSection === 'content' && "Manage your agency's identity, contact information, and visual assets."}
                {activeSection === 'portfolio' && "Add, edit, or remove projects from your featured work collection."}
                {activeSection === 'pricing' && "Update your service tiers, pricing, and feature lists."}
                {activeSection === 'analytics' && "Keep your agency's performance numbers up to date."}
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

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeSection === 'content' && <ContentEditor />}
                {activeSection === 'portfolio' && <PortfolioManager />}
                {activeSection === 'pricing' && <PricingSettings />}
                {activeSection === 'analytics' && <AnalyticsEditor />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FounderDashboard;
