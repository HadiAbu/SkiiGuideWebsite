import { motion } from 'motion/react';
import { ArrowRight, Play, Users, FileText, Map, ShieldCheck } from 'lucide-react';

interface LandingProps {
  onNavigate: (page: string) => void;
}

export function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <img 
          src="https://picsum.photos/seed/alpine-hero/1920/1080" 
          alt="Alpine Hero" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
              ELEVATE YOUR<br />PERSPECTIVE.
            </h1>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Experience the Alps through the lens of local legends. From hidden couloirs to sun-drenched terraces, we define the peak performance.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onNavigate('resorts')}
                className="btn-primary px-8 py-4 text-lg flex items-center gap-2"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn-secondary bg-white/10 border-white/20 text-white backdrop-blur-md px-8 py-4 text-lg flex items-center gap-2 hover:bg-white/20">
                <Play className="w-5 h-5 fill-current" />
                View The Range
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Legendary Terrains */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-alpine-dark mb-4">LEGENDARY TERRAINS</h2>
            <p className="text-slate-500 max-w-xl">
              Curated destinations for those who seek the extraordinary. Real-time conditions from the highest peaks in Europe.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('resorts')}
            className="text-alpine-blue font-semibold flex items-center gap-2 hover:underline"
          >
            Explore all 42 resorts
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Chamonix', country: 'FRANCE', depth: '240cm', status: 'EXTREME', focus: 'OFF-PISTE FOCUS', img: 'https://picsum.photos/seed/chamonix/600/800' },
            { name: 'Zermatt', country: 'SWITZERLAND', depth: '185cm', status: 'OPTIMAL', focus: 'HIGH ALTITUDE', img: 'https://picsum.photos/seed/zermatt/600/800' },
            { name: 'St. Anton', country: 'AUSTRIA', depth: '310cm', status: 'OPTIMAL', focus: 'APRES SKI', img: 'https://picsum.photos/seed/st-anton/600/800' },
          ].map((resort, i) => (
            <motion.div 
              key={resort.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[500px] rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => onNavigate('resorts')}
            >
              <img 
                src={resort.img} 
                alt={resort.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <p className="text-xs font-bold text-white/60 tracking-widest mb-1">{resort.country}</p>
                <div className="flex items-end justify-between mb-4">
                  <h3 className="text-3xl font-bold text-white">{resort.name}</h3>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{resort.depth}</p>
                    <p className="text-[10px] font-bold text-white/60 tracking-widest uppercase">Snow Depth</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-widest ${resort.status === 'EXTREME' ? 'bg-rose-600 text-white' : 'bg-alpine-blue text-white'}`}>
                    {resort.status}
                  </span>
                  <span className="px-2 py-1 rounded bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-widest">
                    {resort.focus}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="bg-white p-12 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <h2 className="text-3xl font-bold text-alpine-dark mb-4">Join the Community</h2>
            <p className="text-slate-500 mb-8">
              Unlock exclusive access to live trail reports, guide-led forums, and priority booking for winter expeditions. Be part of the conversation at 3,000 meters.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="alpine.enthusiast@outlook.com" 
                  className="w-full px-4 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-alpine-blue"
                />
              </div>
              <button className="w-full btn-primary py-4 text-lg">
                Request Invitation
              </button>
              <p className="text-center text-xs text-slate-400">
                Already a member? <button className="text-alpine-blue font-semibold hover:underline">Sign in here</button>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: Users, title: '12k+ Members', desc: 'Global network of professional skiers and adventurers.', color: 'bg-indigo-50 text-indigo-600' },
              { icon: FileText, title: 'Daily Reports', desc: 'Granular snow and stability data from the summit.', color: 'bg-sky-50 text-sky-600' },
              { icon: Map, title: 'Secret Spots', desc: 'Access user-generated maps of ungroomed glacial runs.', color: 'bg-emerald-50 text-emerald-600' },
              { icon: ShieldCheck, title: 'Pro Perks', desc: 'Exclusive discounts on high-end equipment brands.', color: 'bg-amber-50 text-amber-600' },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guide of the Month */}
      <section className="py-24 bg-alpine-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-alpine-blue/20 blur-3xl rounded-full" />
            <img 
              src="https://picsum.photos/seed/guide-marcus/800/1000" 
              alt="Marcus Von Stein" 
              className="relative rounded-3xl w-full max-w-md mx-auto shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <p className="text-xs font-bold text-alpine-blue tracking-[0.2em] uppercase mb-4">Guide of the Month</p>
            <h2 className="text-6xl font-bold mb-8 tracking-tight">MARCUS<br />VON STEIN</h2>
            <div className="w-20 h-1 bg-alpine-blue mb-8" />
            <blockquote className="text-2xl italic text-slate-300 mb-12 leading-relaxed">
              "The mountain doesn't care about your skill level; it cares about your respect. My job is to bridge that gap and find the flow in the ice."
            </blockquote>
            
            <div className="grid grid-cols-3 gap-8 mb-12">
              <div>
                <p className="text-3xl font-bold mb-1">15</p>
                <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Years Exp</p>
              </div>
              <div>
                <p className="text-3xl font-bold mb-1">UIAGM</p>
                <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Certified</p>
              </div>
              <div>
                <p className="text-3xl font-bold mb-1">800+</p>
                <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Summits</p>
              </div>
            </div>

            <button className="btn-secondary bg-transparent border-slate-700 text-white hover:bg-white/10 px-8 py-4">
              Meet Our Guides
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
