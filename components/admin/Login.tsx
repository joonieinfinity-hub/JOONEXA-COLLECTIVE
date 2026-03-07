import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { auth } from '../../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const FOUNDER_EMAIL = 'rimi@joonexa-collective.com';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!auth) {
      setError('Firebase configuration is missing. Please set VITE_FIREBASE_API_KEY in the environment variables.');
      return;
    }

    if (email !== FOUNDER_EMAIL) {
      setError('Access restricted to founder only.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-soft px-6 pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl shadow-black/5 border border-charcoal/5"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-accent-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-accent-teal" />
          </div>
          <h1 className="text-3xl font-display font-bold text-charcoal mb-2">Founder Login</h1>
          <p className="text-muted text-sm font-sans">Secure access for Rimi only.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/30" />
              <input 
                type="email" 
                placeholder="rimi@joonexa-collective.com"
                className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 pl-12 pr-4 text-charcoal focus:outline-none focus:border-accent-teal transition-all font-sans"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/30" />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 pl-12 pr-4 text-charcoal focus:outline-none focus:border-accent-teal transition-all font-sans"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-accent-rose text-xs font-bold font-sans text-center"
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-charcoal text-white py-5 rounded-2xl font-bold hover:bg-accent-teal transition-all duration-500 flex items-center justify-center gap-2 group disabled:opacity-50 font-sans"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                Login to Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-muted/40 text-[10px] uppercase tracking-widest font-bold font-sans">
            Protected by Joonexa Security
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
