import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowRight, Loader2, Mail, Key, Eye, EyeOff, ArrowLeft, Sparkles } from 'lucide-react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import siteSettings from '../../data/siteSettings.json';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [greeting, setGreeting] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Strict check for the specified founder email
    if (email !== "rimi@joonexa-collective.com") {
      setError('Unauthorized access. Only the founder can log in.');
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/founder/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password login is not enabled in the Firebase Console. Please enable it under Authentication > Sign-in method.');
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please check your credentials.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else {
        setError('Authentication failed. Please ensure your account is set up in Firebase.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }
    
    setResetLoading(true);
    setError('');
    setSuccess('');

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Password reset email sent! Please check your inbox.');
      setTimeout(() => setIsResetMode(false), 3000);
    } catch (err: any) {
      console.error('Reset error:', err);
      setError('Failed to send reset email. Please try again.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-charcoal selection:bg-accent-rose selection:text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-rose/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent-teal/10 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        {siteSettings.heroImage && (
          <div className="absolute inset-0 opacity-10 mix-blend-overlay grayscale">
            <img 
              src={siteSettings.heroImage} 
              alt="Background" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
      </div>

      <div className="relative z-10 w-full max-w-xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-14 shadow-3xl shadow-black/80 overflow-hidden relative"
        >
          {/* Reactive Security Indicator */}
          <motion.div 
            animate={{ 
              scale: isPasswordFocused ? 1.2 : 1,
              opacity: isPasswordFocused ? 1 : 0.2,
              color: isPasswordFocused ? "#E8A9A9" : "#FFFFFF"
            }}
            className="absolute top-8 right-8 transition-colors duration-500"
          >
            <Lock className="w-10 h-10" />
            {isPasswordFocused && (
              <motion.div 
                layoutId="pulse"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-accent-rose/20 blur-xl"
              />
            )}
          </motion.div>

          <div className="text-center mb-12">
            <Link to="/" className="inline-block mb-8 group">
              <div className="flex items-center justify-center gap-3">
                {siteSettings.logo ? (
                  <img src={siteSettings.logo} alt={siteSettings.agencyName} className="h-12 w-auto brightness-200" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-14 h-14 bg-accent-rose rounded-2xl flex items-center justify-center shadow-2xl shadow-accent-rose/50">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                )}
              </div>
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 tracking-tight">
              {isResetMode ? 'Security Reset' : `${greeting}, Rimi`}
            </h1>
            <p className="text-white/30 font-sans text-[10px] tracking-[0.4em] uppercase font-black">
              {isResetMode ? 'Account Recovery Protocol' : 'Authorized Access Only'}
            </p>
          </div>

          <form onSubmit={isResetMode ? handleForgotPassword : handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 ml-5 font-sans">Authorized Email</label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-accent-teal transition-colors flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <input 
                  required
                  type="email" 
                  placeholder="name@agency.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-white placeholder:text-white/10 focus:outline-none focus:border-accent-teal/50 focus:bg-white/10 transition-all font-sans text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {!isResetMode && (
              <div className="space-y-2">
                <div className="flex justify-between items-center px-5">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 font-sans">Security Key</label>
                  <button 
                    type="button"
                    onClick={() => setIsResetMode(true)}
                    className="text-[9px] font-black uppercase tracking-[0.2em] text-accent-rose/60 hover:text-accent-rose transition-colors font-sans"
                  >
                    Lost Key?
                  </button>
                </div>
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-accent-teal transition-colors flex items-center justify-center">
                    <Key className="w-4 h-4" />
                  </div>
                  <input 
                    required
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-16 text-white placeholder:text-white/10 focus:outline-none focus:border-accent-teal/50 focus:bg-white/10 transition-all font-sans text-base"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {(error || success) && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`p-4 rounded-2xl border font-sans text-xs font-bold text-center ${
                    error 
                      ? 'bg-accent-rose/10 border-accent-rose/20 text-accent-rose' 
                      : 'bg-accent-teal/10 border-accent-teal/20 text-accent-teal'
                  }`}
                >
                  {error || success}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              <button 
                type="submit"
                disabled={loading || resetLoading}
                className="w-full bg-white text-charcoal py-5 rounded-2xl font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-accent-rose hover:text-white transition-all duration-500 group shadow-lg shadow-black/20"
              >
                {loading || resetLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {isResetMode ? 'Verify Recovery' : 'Enter Studio'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {isResetMode && (
                <button 
                  type="button"
                  onClick={() => setIsResetMode(false)}
                  className="w-full text-white/40 hover:text-white transition-colors font-sans text-xs font-bold flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Exit Recovery Protocol
                </button>
              )}

              {/* Status Indicator */}
              <div className="pt-4 flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/20 font-sans">System Secure</span>
                </div>
                <div className="w-px h-3 bg-white/10" />
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/20 font-sans">Identity: Verified</span>
                </div>
              </div>
            </div>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/10 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 text-[10px] font-black uppercase tracking-[0.4em] font-sans group"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Return to Collective
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
