import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, Loader2 } from 'lucide-react';
import { auth } from '../../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      // Check if it's the founder email
      if (user.email === "propeciodraws@gmail.com" || user.email === "rimi@joonexa-collective.com") {
        navigate('/founder/dashboard');
      } else {
        setError('Unauthorized access. Only the founder can log in.');
        await auth.signOut();
      }
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('Google Sign-In is not enabled in the Firebase Console. Please enable it under Authentication > Sign-in method.');
      } else {
        setError('Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
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

        <div className="space-y-6">
          <p className="text-center text-muted text-sm font-sans mb-6">
            Please sign in with your authorized Google account to access the dashboard.
          </p>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-accent-rose text-xs font-bold text-center font-sans p-4 bg-accent-rose/5 rounded-xl border border-accent-rose/10"
            >
              {error}
            </motion.p>
          )}

          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center gap-3"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                Sign In with Google <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
