import { Search, User as UserIcon, LogOut } from 'lucide-react';
import { auth, logout, signInWithGoogle } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const [user] = useAuthState(auth);

  const navLinks = [
    { name: 'Resorts', id: 'resorts' },
    { name: 'Guides', id: 'guides' },
    { name: 'Community', id: 'community' },
    { name: 'Weather', id: 'weather' },
  ];

  return (
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
          <div className="hidden lg:flex items-center bg-slate-100 rounded-lg px-3 py-2 w-64">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search peak destinations..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder-slate-400"
            />
          </div>
          
          <button className="hidden sm:block btn-primary text-sm">
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
  );
}
