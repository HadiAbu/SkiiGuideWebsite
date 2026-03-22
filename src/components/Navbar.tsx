import { useState } from 'react';
import { Search, User as UserIcon, LogOut, CheckCircle2 } from 'lucide-react';
import { auth, logout, signInWithGoogle } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Modal } from './Modal';

interface NavbarProps {
  onNavigate: (page: string, query?: string) => void;
  currentPage: string;
}

export function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const [user] = useAuthState(auth);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { name: 'Resorts', id: 'resorts' },
    { name: 'Guides', id: 'guides' },
    { name: 'Community', id: 'community' },
    { name: 'Weather', id: 'weather' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('resorts', searchQuery);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onNavigate('landing')}
          >
            <span className="text-2xl font-bold tracking-tight text-alpine-dark">Alpine Perspective</span>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`text-sm font-semibold transition-colors ${
                  currentPage === link.id 
                    ? 'text-alpine-blue border-b-2 border-alpine-blue py-1' 
                    : 'text-slate-500 hover:text-alpine-dark'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="hidden lg:flex items-center bg-slate-100 rounded-lg px-3 py-2 w-64">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search peak destinations..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder-slate-400"
              />
            </form>
            
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="hidden sm:block btn-primary text-sm"
            >
              Book Guide
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onNavigate('profile')}
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 hover:border-alpine-blue transition-colors"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <UserIcon className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="btn-secondary text-sm"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      <Modal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        title="Book Professional Guide"
      >
        <div className="space-y-6">
          <p className="text-slate-500">Select your destination and preferred date to match with a UIAGM certified guide.</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2">Destination</label>
              <select className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-alpine-blue">
                <option>Chamonix, FR</option>
                <option>Zermatt, CH</option>
                <option>St. Anton, AT</option>
                <option>Courchevel, FR</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2">Date</label>
              <input type="date" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-alpine-blue" />
            </div>
          </div>
          <button 
            onClick={() => setIsBookingOpen(false)}
            className="w-full btn-primary py-4 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Confirm Booking Request
          </button>
        </div>
      </Modal>
    </>
  );
}
