import { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, Github, Mail, Lock, ArrowRight, CheckCircle2, Info, Loader2 } from 'lucide-react';
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '../firebase';
import { Modal } from './Modal';

export function LoginPage() {
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleComingSoon = (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsComingSoonOpen(true);
  };

  const handleInviteRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInviteOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    setError(null);
    try {
      if (mode === 'signin') {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left Side: Branding & Content */}
      <section className="relative w-full lg:w-1/2 h-[40vh] lg:h-screen flex items-center overflow-hidden">
        <img 
          src="https://picsum.photos/seed/login-alpine/1200/1600" 
          alt="Alpine Login" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        
        <div className="relative max-w-xl mx-auto px-8 lg:px-16 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-[1.1]">
              The summit is<br />just the beginning.
            </h1>
            <p className="text-xl text-white/80 mb-12 leading-relaxed">
              Join the world's most exclusive community of alpine enthusiasts. Access real-time peak data and professional guide networks.
            </p>
            
            <div className="space-y-4">
              {[
                'Real-time snow & avalanche data',
                'Professional UIAGM guide network',
                'Exclusive resort access & perks',
                'High-altitude community forums'
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-white/90 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  {feature}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Right Side: Login Form */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-alpine-dark mb-2">
              {mode === 'signin' ? 'Welcome Back' : 'Join the Range'}
            </h2>
            <p className="text-slate-500">
              {mode === 'signin' ? 'Please enter your details to access the range.' : 'Create your account to start your alpine journey.'}
            </p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="flex items-center justify-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm group disabled:opacity-50"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Google
            </button>
            <button 
              onClick={() => handleComingSoon()}
              disabled={isLoading}
              className="flex items-center justify-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm group disabled:opacity-50"
            >
              <Github className="w-5 h-5" />
              GitHub
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-50 text-slate-400 font-bold tracking-widest uppercase">Or continue with email</span>
            </div>
          </div>

          {/* Email Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-sm text-rose-600 font-medium">
                {error}
              </div>
            )}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alpine.enthusiast@outlook.com" 
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-alpine-blue focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[10px] font-bold text-slate-400 tracking-widest uppercase">Password</label>
                {mode === 'signin' && (
                  <button 
                    type="button"
                    onClick={() => setIsForgotOpen(true)}
                    className="text-[10px] font-bold text-alpine-blue tracking-widest uppercase hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-alpine-blue focus:border-transparent transition-all"
                />
              </div>
            </div>

            {mode === 'signin' && (
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-alpine-blue focus:ring-alpine-blue" id="remember" />
                <label htmlFor="remember" className="text-sm text-slate-600 font-medium cursor-pointer">Stay signed in for 30 days</label>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {mode === 'signin' ? 'Sign In to Alpine' : 'Create Alpine Account'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            {mode === 'signin' ? (
              <>
                Don't have an account? <button onClick={() => setMode('signup')} className="text-alpine-blue font-bold hover:underline">Sign up now</button>
              </>
            ) : (
              <>
                Already have an account? <button onClick={() => setMode('signin')} className="text-alpine-blue font-bold hover:underline">Sign in instead</button>
              </>
            )}
          </p>
        </motion.div>
      </section>

      {/* Modals */}
      <Modal isOpen={isForgotOpen} onClose={() => setIsForgotOpen(false)} title="Reset Password">
        <div className="space-y-6">
          <p className="text-slate-500">Enter your email address and we'll send you a link to reset your password.</p>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="alpine.enthusiast@outlook.com" 
              className="w-full px-4 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-alpine-blue"
            />
          </div>
          <button 
            onClick={() => setIsForgotOpen(false)}
            className="w-full btn-primary py-4"
          >
            Send Reset Link
          </button>
        </div>
      </Modal>

      <Modal isOpen={isComingSoonOpen} onClose={() => setIsComingSoonOpen(false)} title="Feature Coming Soon">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-alpine-blue/10 rounded-full flex items-center justify-center mx-auto">
            <Info className="w-10 h-10 text-alpine-blue" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-alpine-dark mb-2">Work in Progress</h4>
            <p className="text-slate-500">This authentication method is currently being mapped. For now, please use Google Sign-In or Email/Password to access the range.</p>
          </div>
          <button 
            onClick={() => setIsComingSoonOpen(false)}
            className="w-full btn-primary py-4"
          >
            Got it
          </button>
        </div>
      </Modal>

      <Modal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} title="Invitation Requested">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-alpine-dark mb-2">You're on the list!</h4>
            <p className="text-slate-500">We've received your request. Our team will review your application and send an invitation shortly.</p>
          </div>
          <button 
            onClick={() => setIsInviteOpen(false)}
            className="w-full btn-primary py-4"
          >
            Got it
          </button>
        </div>
      </Modal>
    </div>
  );
}
