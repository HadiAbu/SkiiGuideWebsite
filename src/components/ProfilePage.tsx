import { motion } from 'motion/react';
import { Settings, MapPin, Calendar, ArrowRight, Star, Shield, CreditCard, Bell, LogOut, User as UserIcon } from 'lucide-react';
import { auth, logout } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [user] = useAuthState(auth);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Settings */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-32 space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-slate-100 overflow-hidden border-2 border-white shadow-lg">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <UserIcon className="w-8 h-8 text-slate-400 m-4" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-alpine-dark">{user.displayName}</h3>
                <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">Alpine Member</p>
              </div>
            </div>

            <nav className="space-y-1">
              {[
                { icon: UserIcon, label: 'Personal Info', active: true },
                { icon: Shield, label: 'Security' },
                { icon: CreditCard, label: 'Billing' },
                { icon: Bell, label: 'Notifications' },
                { icon: Settings, label: 'Preferences' },
              ].map((item) => (
                <button 
                  key={item.label}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    item.active ? 'bg-white text-alpine-blue shadow-sm border border-slate-100' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${item.active ? 'text-alpine-blue' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              ))}
              <button 
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-all mt-8"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </nav>

            {/* Level Up CTA */}
            <div className="bg-alpine-dark rounded-2xl p-6 text-white overflow-hidden relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-alpine-blue/20 blur-2xl rounded-full" />
              <h4 className="font-bold mb-2 relative z-10">Level Up Your Adventure</h4>
              <p className="text-xs text-white/60 mb-6 leading-relaxed relative z-10">Get unlimited access to pro guides and real-time avalanche data.</p>
              <button className="w-full py-2 bg-alpine-blue text-white rounded-lg text-xs font-bold tracking-widest uppercase hover:bg-opacity-90 transition-all relative z-10">
                Upgrade Pro
              </button>
            </div>
          </div>
        </aside>

        {/* Main Profile Content */}
        <main className="flex-1 space-y-12">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Total Runs', value: '142', unit: 'RUNS', color: 'bg-indigo-50 text-indigo-600' },
              { label: 'Favorite Peak', value: 'Aiguille', unit: 'PEAK', color: 'bg-emerald-50 text-emerald-600' },
              { label: 'Vertical M', value: '42.5k', unit: 'METERS', color: 'bg-alpine-blue/10 text-alpine-blue' },
            ].map((stat) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
              >
                <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-4">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-alpine-dark tracking-tight">{stat.value}</span>
                  <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{stat.unit}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Favorite Resorts */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-alpine-dark">Favorite Resorts</h2>
              <button className="text-alpine-blue font-semibold text-sm hover:underline">Manage all</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Chamonix', location: 'France', img: 'https://picsum.photos/seed/chamonix-fav/600/400', rating: 4.9 },
                { name: 'St. Anton', location: 'Austria', img: 'https://picsum.photos/seed/stanton-fav/600/400', rating: 4.8 },
              ].map((resort) => (
                <div key={resort.name} className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer shadow-sm">
                  <img src={resort.img} alt={resort.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 w-full flex items-end justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{resort.name}</h3>
                      <p className="text-xs text-white/60 font-medium">{resort.location}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/20 px-2 py-1 rounded-lg">
                      <Star className="w-3 h-3 text-amber-400 fill-current" />
                      <span className="text-white text-xs font-bold">{resort.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* My Trips History */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-alpine-dark">My Trips History</h2>
              <button className="text-alpine-blue font-semibold text-sm hover:underline">Export data</button>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-100">
                {[
                  { resort: 'Courchevel 1850', date: 'Jan 12 - Jan 18, 2026', guide: 'Marcus Von Stein', status: 'Completed', img: 'https://picsum.photos/seed/trip1/100/100' },
                  { resort: 'Zermatt Matterhorn', date: 'Feb 04 - Feb 10, 2026', guide: 'Elena Rossi', status: 'Completed', img: 'https://picsum.photos/seed/trip2/100/100' },
                  { resort: 'St. Moritz', date: 'Mar 15 - Mar 22, 2026', guide: 'Self Guided', status: 'Upcoming', img: 'https://picsum.photos/seed/trip3/100/100' },
                ].map((trip) => (
                  <div key={trip.resort} className="p-6 flex items-center gap-6 hover:bg-slate-50 transition-colors cursor-pointer group">
                    <img src={trip.img} alt={trip.resort} className="w-16 h-16 rounded-xl object-cover shadow-sm" referrerPolicy="no-referrer" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-alpine-dark">{trip.resort}</h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-widest uppercase ${
                          trip.status === 'Upcoming' ? 'bg-alpine-blue text-white' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {trip.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {trip.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <UserIcon className="w-3 h-3" />
                          {trip.guide}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-alpine-blue transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
