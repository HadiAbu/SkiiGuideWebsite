import { motion } from 'motion/react';
import { LogIn, Github, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { signInWithGoogle } from '../firebase';

export function LoginPage() {
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
            <h2 className="text-3xl font-bold text-alpine-dark mb-2">Welcome Back</h2>
            <p className="text-slate-500">Please enter your details to access the range.</p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={signInWithGoogle}
              className="flex items-center justify-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm group"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Google
            </button>
            <button className="flex items-center justify-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm group">
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
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  placeholder="alpine.enthusiast@outlook.com" 
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-alpine-blue focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[10px] font-bold text-slate-400 tracking-widest uppercase">Password</label>
                <button className="text-[10px] font-bold text-alpine-blue tracking-widest uppercase hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-alpine-blue focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-alpine-blue focus:ring-alpine-blue" id="remember" />
              <label htmlFor="remember" className="text-sm text-slate-600 font-medium cursor-pointer">Stay signed in for 30 days</label>
            </div>

            <button className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 group">
              Sign In to Alpine
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account? <button className="text-alpine-blue font-bold hover:underline">Request an invitation</button>
          </p>
        </motion.div>
      </section>
    </div>
  );
}
