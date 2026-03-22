import { useState } from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapPin, Wind, Thermometer, Sun, CloudRain, AlertTriangle, ArrowRight, Star, Quote, Info } from 'lucide-react';
import { Modal } from './Modal';

const SNOWFALL_DATA = [
  { day: 'Mon', snow: 12 },
  { day: 'Tue', snow: 24 },
  { day: 'Wed', snow: 18 },
  { day: 'Thu', snow: 32 },
  { day: 'Fri', snow: 45 },
  { day: 'Sat', snow: 28 },
  { day: 'Sun', snow: 15 },
];

interface ResortDetailPageProps {
  resortId: string;
  onBack: () => void;
}

export function ResortDetailPage({ resortId, onBack }: ResortDetailPageProps) {
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://picsum.photos/seed/chamonix-hero/1920/1080" 
          alt="Chamonix Hero" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/60 text-sm font-bold tracking-[0.4em] uppercase mb-4"
          >
            HAUTE-SAVOIE, FRANCE
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-8xl md:text-9xl font-extrabold text-white tracking-tighter mb-8"
          >
            CHAMONIX
          </motion.h1>
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={onBack}
            className="btn-secondary bg-white/10 border-white/20 text-white backdrop-blur-md hover:bg-white/20"
          >
            Return to Resorts
          </motion.button>
        </div>
      </section>

      {/* Daily Mountain Report */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200 p-8 lg:p-12 border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Stats Grid */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-alpine-dark">Daily Mountain Report</h2>
                <div className="flex items-center gap-2 text-rose-600 bg-rose-50 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                  <AlertTriangle className="w-3 h-3" />
                  High Wind Warning
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: 'Open Trails', value: '142/150', icon: MapPin, color: 'text-emerald-600' },
                  { label: 'Base Depth', value: '240cm', icon: CloudRain, color: 'text-alpine-blue' },
                  { label: 'Temperature', value: '-12°C', icon: Thermometer, color: 'text-rose-600' },
                  { label: 'Wind Speed', value: '45km/h', icon: Wind, color: 'text-amber-600' },
                  { label: 'Visibility', value: 'GOOD', icon: Sun, color: 'text-emerald-600' },
                  { label: 'UV Index', value: 'MODERATE', icon: Sun, color: 'text-amber-600' },
                  { label: 'Lifts Open', value: '42/45', icon: MapPin, color: 'text-alpine-blue' },
                  { label: 'Last Snow', value: '12h ago', icon: CloudRain, color: 'text-sky-600' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{stat.label}</p>
                    </div>
                    <p className="text-xl font-bold text-alpine-dark">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Snowfall Chart */}
            <div className="bg-slate-50 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-alpine-dark mb-6 tracking-widest uppercase">Recent Snowfall (cm)</h3>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={SNOWFALL_DATA}>
                    <defs>
                      <linearGradient id="colorSnow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0066A1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0066A1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 700 }} 
                    />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      labelStyle={{ fontWeight: 700, color: '#0F172A' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="snow" 
                      stroke="#0066A1" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorSnow)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Perspectives (Map Section Placeholder) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-alpine-dark mb-6 tracking-tight">VERTICAL PERSPECTIVES</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Explore the intricate network of glacial runs and high-altitude couloirs. Our interactive map provides real-time tracking of groomers and avalanche-controlled zones.
            </p>
            <div className="space-y-6">
              {[
                { title: 'Glacier d\'Argentière', desc: 'Expert only. 2,000m vertical drop through pristine glacial terrain.', difficulty: 'PRO' },
                { title: 'Vallée Blanche', desc: 'The legendary 20km off-piste run. Requires a professional guide.', difficulty: 'EXPERT' },
                { title: 'Le Brévent', desc: 'South-facing slopes with the best panoramic views of Mont Blanc.', difficulty: 'INTERMEDIATE' },
              ].map((run) => (
                <div key={run.title} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:border-alpine-blue transition-colors">
                    <MapPin className="w-5 h-5 text-alpine-blue" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-bold text-alpine-dark">{run.title}</h4>
                      <span className="text-[10px] font-bold text-white bg-alpine-dark px-2 py-0.5 rounded tracking-widest uppercase">
                        {run.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">{run.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[600px]">
            <img 
              src="https://picsum.photos/seed/chamonix-map/1000/1200" 
              alt="Chamonix Map" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-lg">Interactive Trail Map</p>
                  <p className="text-white/60 text-xs">Real-time lift status & GPS tracking</p>
                </div>
                <button 
                  onClick={() => setIsComingSoonOpen(true)}
                  className="btn-primary bg-white text-alpine-dark hover:bg-slate-100"
                >
                  Open Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alpine Elite (Guides) */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-alpine-dark mb-4">ALPINE ELITE</h2>
              <p className="text-slate-500">Professional UIAGM guides specializing in Chamonix's extreme terrain.</p>
            </div>
            <button 
              onClick={() => setIsComingSoonOpen(true)}
              className="text-alpine-blue font-semibold flex items-center gap-2 hover:underline"
            >
              View all 24 guides
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: 'Marcus Von Stein', role: 'Lead Guide', rating: 4.9, reviews: 124, img: 'https://picsum.photos/seed/guide1/400/500' },
              { name: 'Elena Rossi', role: 'Glacier Specialist', rating: 5.0, reviews: 86, img: 'https://picsum.photos/seed/guide2/400/500' },
              { name: 'Jean-Pierre Blanc', role: 'Steep Skiing', rating: 4.8, reviews: 210, img: 'https://picsum.photos/seed/guide3/400/500' },
              { name: 'Sarah Jenkins', role: 'Backcountry Safety', rating: 4.9, reviews: 95, img: 'https://picsum.photos/seed/guide4/400/500' },
            ].map((guide) => (
              <div key={guide.name} className="card group cursor-pointer">
                <div className="relative h-72 overflow-hidden">
                  <img src={guide.img} alt={guide.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-current" />
                      <span className="text-white text-xs font-bold">{guide.rating}</span>
                    </div>
                    <span className="text-white/60 text-[10px] font-bold tracking-widest uppercase">{guide.reviews} Reviews</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-alpine-dark mb-1">{guide.name}</h3>
                  <p className="text-xs text-slate-500 mb-4 font-medium">{guide.role}</p>
                  <button 
                    onClick={() => setIsComingSoonOpen(true)}
                    className="w-full py-2 border border-slate-200 rounded-lg text-xs font-bold tracking-widest uppercase hover:bg-slate-50 transition-colors"
                  >
                    Book Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond Expectations (Quotes) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img src="https://picsum.photos/seed/beyond1/600/800" alt="Alpine 1" className="rounded-2xl w-full h-80 object-cover" referrerPolicy="no-referrer" />
            <img src="https://picsum.photos/seed/beyond2/600/800" alt="Alpine 2" className="rounded-2xl w-full h-80 object-cover mt-8" referrerPolicy="no-referrer" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-alpine-dark mb-8 tracking-tight">BEYOND<br />EXPECTATIONS.</h2>
            <div className="space-y-12">
              <div className="relative">
                <Quote className="w-12 h-12 text-alpine-blue/10 absolute -top-6 -left-6" />
                <p className="text-xl text-slate-600 italic leading-relaxed mb-6">
                  "Chamonix isn't just a resort; it's a rite of passage. The verticality here is unmatched anywhere else in the world. Alpine Perspective made finding the right lines effortless."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                    <img src="https://picsum.photos/seed/user1/100/100" alt="User" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <p className="font-bold text-alpine-dark">Erik Bergson</p>
                    <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">Pro Skier</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Quote className="w-12 h-12 text-alpine-blue/10 absolute -top-6 -left-6" />
                <p className="text-xl text-slate-600 italic leading-relaxed mb-6">
                  "The data accuracy is what sets this platform apart. When they say high wind warning, they mean it. It's saved our group from several dangerous situations."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                    <img src="https://picsum.photos/seed/user2/100/100" alt="User" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <p className="font-bold text-alpine-dark">Sarah Miller</p>
                    <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">Mountaineer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={isComingSoonOpen} onClose={() => setIsComingSoonOpen(false)} title="Feature Coming Soon">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-alpine-blue/10 rounded-full flex items-center justify-center mx-auto">
            <Info className="w-10 h-10 text-alpine-blue" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-alpine-dark mb-2">Work in Progress</h4>
            <p className="text-slate-500">This feature is currently being mapped by our team. Check back soon for full integration.</p>
          </div>
          <button 
            onClick={() => setIsComingSoonOpen(false)}
            className="w-full btn-primary py-4"
          >
            Got it
          </button>
        </div>
      </Modal>
    </div>
  );
}
