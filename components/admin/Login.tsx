import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulated login based on user requirements
    if (email === 'rimi@joonexa-collective.com' && password === 'RimiK@21839') {
      setTimeout(() => {
        localStorage.setItem('isFounderAuthenticated', 'true');
        navigate('/studio-edit');
        setLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setError('Invalid credentials. Please try again.');
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-soft px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-12 rounded-[3rem] shadow-2xl shadow-black/5 border border-charcoal/5"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-deep-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-deep-teal" />
          </div>
          <h1 className="text-3xl font-display font-bold text-charcoal mb-2">Founder Login</h1>
          <p className="text-muted font-sans text-sm">Access the Joonexa Collective Studio</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/30" />
              <input 
                type="email" 
                className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-deep-teal transition-all font-sans"
                placeholder="rimi@joonexa-collective.com"
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
                className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-deep-teal transition-all font-sans"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-accent-rose text-xs font-bold text-center font-sans"
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full btn-primary"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>Sign In <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
