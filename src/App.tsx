import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebase';
import { doc, getDocFromServer } from 'firebase/firestore';
import { Navbar } from './components/Navbar';
import { Landing } from './components/Landing';
import { ResortsPage } from './components/ResortsPage';
import { ResortDetailPage } from './components/ResortDetailPage';
import { ProfilePage } from './components/ProfilePage';
import { LoginPage } from './components/LoginPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Twitter, Linkedin, Github, Mail, MapPin, Phone, Loader2 } from 'lucide-react';

function AppContent() {
  const [user, loading, error] = useAuthState(auth);
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedResortId, setSelectedResortId] = useState<string | null>(null);

  // Test Firestore connection
  useEffect(() => {
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (err) {
        if (err instanceof Error && err.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    };
    testConnection();
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedResortId(null);
    window.scrollTo(0, 0);
  };

  const handleSelectResort = (id: string) => {
    setSelectedResortId(id);
    setCurrentPage('resort-detail');
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-alpine-bg">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-alpine-blue animate-spin" />
          <p className="text-sm font-bold text-alpine-blue tracking-widest uppercase animate-pulse">Ascending to Peak...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-alpine-bg p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-rose-100 text-center">
          <h2 className="text-2xl font-bold text-rose-600 mb-4">Authentication Error</h2>
          <p className="text-slate-500 mb-6">{error.message}</p>
          <button onClick={() => window.location.reload()} className="btn-primary bg-rose-600">Retry Connection</button>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    if (!user && currentPage !== 'landing') {
      return <LoginPage />;
    }

    switch (currentPage) {
      case 'landing':
        return <Landing onNavigate={handleNavigate} />;
      case 'resorts':
        return <ResortsPage onSelectResort={handleSelectResort} />;
      case 'resort-detail':
        return selectedResortId ? (
          <ResortDetailPage resortId={selectedResortId} onBack={() => handleNavigate('resorts')} />
        ) : (
          <ResortsPage onSelectResort={handleSelectResort} />
        );
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} />;
      case 'guides':
      case 'community':
      case 'weather':
        return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
            <h2 className="text-4xl font-bold text-alpine-dark mb-4 uppercase tracking-tight">{currentPage}</h2>
            <p className="text-slate-500 max-w-md">This section is currently under development. Our guides are mapping the terrain as we speak.</p>
            <button onClick={() => handleNavigate('landing')} className="mt-8 btn-secondary">Return to Base</button>
          </div>
        );
      default:
        return <Landing onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {currentPage !== 'login' && (
        <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      )}
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + (selectedResortId || '')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {currentPage !== 'login' && (
        <footer className="bg-alpine-dark text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-2xl font-bold mb-6 tracking-tight">Alpine Perspective</h3>
                <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
                  The definitive platform for high-altitude enthusiasts. Real-time peak data, professional guide networks, and exclusive resort access.
                </p>
                <div className="flex gap-4">
                  {[Instagram, Twitter, Linkedin, Github].map((Icon, i) => (
                    <button key={i} className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-alpine-blue hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-6">Explore</h4>
                <ul className="space-y-4 text-sm font-medium text-slate-400">
                  <li><button onClick={() => handleNavigate('resorts')} className="hover:text-white transition-colors">Peak Resorts</button></li>
                  <li><button className="hover:text-white transition-colors">Guide Network</button></li>
                  <li><button className="hover:text-white transition-colors">Expeditions</button></li>
                  <li><button className="hover:text-white transition-colors">Gear Reviews</button></li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-6">Contact</h4>
                <ul className="space-y-4 text-sm font-medium text-slate-400">
                  <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-alpine-blue" /> Chamonix, France</li>
                  <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-alpine-blue" /> +33 4 50 53 00 24</li>
                  <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-alpine-blue" /> hello@alpineperspective.com</li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-500 tracking-widest uppercase">
              <p>© 2026 Alpine Perspective. All rights reserved.</p>
              <div className="flex gap-8">
                <button className="hover:text-white transition-colors">Privacy Policy</button>
                <button className="hover:text-white transition-colors">Terms of Service</button>
                <button className="hover:text-white transition-colors">Cookie Settings</button>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}
