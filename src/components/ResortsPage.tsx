import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Filter, ChevronDown, MapPin, Wind, Thermometer, ArrowRight } from 'lucide-react';

interface Resort {
  id: string;
  name: string;
  location: string;
  country: string;
  snowDepth: string;
  temp: string;
  wind: string;
  difficulty: string[];
  amenities: string[];
  img: string;
  featured?: boolean;
}

const MOCK_RESORTS: Resort[] = [
  {
    id: 'courchevel',
    name: 'Courchevel 1850',
    location: 'Les Trois Vallées',
    country: 'FRANCE',
    snowDepth: '210cm',
    temp: '-4°C',
    wind: '12km/h',
    difficulty: ['Expert', 'Intermediate'],
    amenities: ['Spa', 'Fine Dining', 'Heli-ski'],
    img: 'https://picsum.photos/seed/courchevel/1200/600',
    featured: true
  },
  {
    id: 'st-anton',
    name: 'St. Anton am Arlberg',
    location: 'Tyrol',
    country: 'AUSTRIA',
    snowDepth: '310cm',
    temp: '-8°C',
    wind: '25km/h',
    difficulty: ['Expert'],
    amenities: ['Apres Ski', 'Night Skiing'],
    img: 'https://picsum.photos/seed/stanton/600/400'
  },
  {
    id: 'chamonix',
    name: 'Chamonix-Mont-Blanc',
    location: 'Haute-Savoie',
    country: 'FRANCE',
    snowDepth: '240cm',
    temp: '-12°C',
    wind: '45km/h',
    difficulty: ['Expert', 'Pro'],
    amenities: ['Glacier Skiing', 'Guide Service'],
    img: 'https://picsum.photos/seed/chamonix-resort/600/400'
  },
  {
    id: 'st-moritz',
    name: 'St. Moritz',
    location: 'Engadin',
    country: 'SWITZERLAND',
    snowDepth: '150cm',
    temp: '-2°C',
    wind: '8km/h',
    difficulty: ['Intermediate', 'Beginner'],
    amenities: ['Luxury Shopping', 'Polo on Ice'],
    img: 'https://picsum.photos/seed/stmoritz/600/400'
  }
];

interface ResortsPageProps {
  onSelectResort: (id: string) => void;
  initialSearch?: string;
}

export function ResortsPage({ onSelectResort, initialSearch = '' }: ResortsPageProps) {
  const [activeFilters, setActiveFilters] = useState({
    difficulty: [] as string[],
    amenities: [] as string[]
  });
  const [snowBase, setSnowBase] = useState(150);
  const [currentPage, setCurrentPage] = useState(2);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  useEffect(() => {
    if (initialSearch) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch]);

  const toggleFilter = (type: 'difficulty' | 'amenities', value: string) => {
    setActiveFilters(prev => {
      const current = prev[type];
      const next = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [type]: next };
    });
  };

  const clearFilters = () => {
    setActiveFilters({ difficulty: [], amenities: [] });
    setSnowBase(0);
  };

  const filteredResorts = MOCK_RESORTS.filter(resort => {
    const searchMatch = !searchQuery || 
      resort.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resort.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const difficultyMatch = activeFilters.difficulty.length === 0 || 
      resort.difficulty.some(d => activeFilters.difficulty.includes(d));
    
    const amenityMatch = activeFilters.amenities.length === 0 || 
      resort.amenities.some(a => activeFilters.amenities.includes(a));
    
    const snowMatch = parseInt(resort.snowDepth) >= snowBase;

    return searchMatch && difficultyMatch && amenityMatch && snowMatch;
  });

  const featuredResort = filteredResorts.find(r => r.featured) || filteredResorts[0];
  const otherResorts = filteredResorts.filter(r => r.id !== featuredResort?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-32 space-y-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </h3>
              <button 
                onClick={clearFilters}
                className="text-xs text-alpine-blue font-semibold hover:underline"
              >
                Clear all
              </button>
            </div>

            {/* Terrain Difficulty */}
            <div>
              <button className="w-full flex items-center justify-between font-bold text-xs tracking-widest uppercase text-slate-400 mb-4">
                Terrain Difficulty
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="space-y-3">
                {['Beginner', 'Intermediate', 'Expert', 'Pro'].map((level) => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={activeFilters.difficulty.includes(level)}
                      onChange={() => toggleFilter('difficulty', level)}
                      className="w-4 h-4 rounded border-slate-300 text-alpine-blue focus:ring-alpine-blue" 
                    />
                    <span className={`text-sm group-hover:text-alpine-dark ${activeFilters.difficulty.includes(level) ? 'text-alpine-dark font-bold' : 'text-slate-600'}`}>
                      {level}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <button className="w-full flex items-center justify-between font-bold text-xs tracking-widest uppercase text-slate-400 mb-4">
                Amenities
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="space-y-3">
                {['Spa', 'Fine Dining', 'Heli-ski', 'Apres Ski', 'Night Skiing'].map((item) => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={activeFilters.amenities.includes(item)}
                      onChange={() => toggleFilter('amenities', item)}
                      className="w-4 h-4 rounded border-slate-300 text-alpine-blue focus:ring-alpine-blue" 
                    />
                    <span className={`text-sm group-hover:text-alpine-dark ${activeFilters.amenities.includes(item) ? 'text-alpine-dark font-bold' : 'text-slate-600'}`}>
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Snow Base Slider */}
            <div>
              <button className="w-full flex items-center justify-between font-bold text-xs tracking-widest uppercase text-slate-400 mb-4">
                Min Snow Base: {snowBase}cm
                <ChevronDown className="w-4 h-4" />
              </button>
              <input 
                type="range" 
                min="0" 
                max="500" 
                value={snowBase}
                onChange={(e) => setSnowBase(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-alpine-blue" 
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2">
                <span>0CM</span>
                <span>500CM</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Featured Resort */}
          {featuredResort && (
            <motion.div 
              key={featuredResort.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-3xl overflow-hidden mb-12 group cursor-pointer"
              onClick={() => onSelectResort(featuredResort.id)}
            >
              <img src={featuredResort.img} alt={featuredResort.name} className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-10 w-full">
                <div className="flex items-center gap-2 text-white/60 text-xs font-bold tracking-widest mb-2">
                  <MapPin className="w-3 h-3" />
                  {featuredResort.country} • {featuredResort.location}
                </div>
                <h2 className="text-5xl font-bold text-white mb-6">{featuredResort.name}</h2>
                <div className="flex flex-wrap gap-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg">
                      <Wind className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold">{featuredResort.snowDepth}</p>
                      <p className="text-[10px] font-bold text-white/60 tracking-widest uppercase">Base Depth</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg">
                      <Thermometer className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold">{featuredResort.temp}</p>
                      <p className="text-[10px] font-bold text-white/60 tracking-widest uppercase">Temperature</p>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectResort(featuredResort.id);
                    }}
                    className="ml-auto btn-primary bg-white text-alpine-dark hover:bg-slate-100"
                  >
                    View Resort
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Resort Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherResorts.map((resort, i) => (
              <motion.div 
                key={resort.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card group cursor-pointer"
                onClick={() => onSelectResort(resort.id)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={resort.img} alt={resort.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {resort.difficulty.map(d => (
                      <span key={d} className="px-2 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold tracking-widest rounded uppercase">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-alpine-dark mb-1">{resort.name}</h3>
                      <p className="text-xs text-slate-500 font-medium">{resort.location}, {resort.country}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-alpine-blue">{resort.snowDepth}</p>
                      <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Snow Base</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex gap-1">
                      {resort.amenities.slice(0, 2).map(a => (
                        <span key={a} className="text-[10px] font-bold text-slate-400 border border-slate-200 px-2 py-1 rounded uppercase">
                          {a}
                        </span>
                      ))}
                      {resort.amenities.length > 2 && (
                        <span className="text-[10px] font-bold text-slate-400 px-2 py-1">+{resort.amenities.length - 2}</span>
                      )}
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-alpine-blue transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredResorts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">No resorts match your current filters.</p>
              <button 
                onClick={clearFilters}
                className="mt-4 text-alpine-blue font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-16 flex items-center justify-center gap-2">
            {[1, 2, 3].map(page => (
              <button 
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg border transition-all flex items-center justify-center font-bold ${
                  currentPage === page 
                    ? 'bg-alpine-blue text-white border-alpine-blue shadow-lg shadow-alpine-blue/20' 
                    : 'border-slate-200 text-slate-400 hover:border-alpine-blue hover:text-alpine-blue'
                }`}
              >
                {page}
              </button>
            ))}
            <span className="mx-2 text-slate-300">...</span>
            <button 
              onClick={() => setCurrentPage(12)}
              className={`w-10 h-10 rounded-lg border transition-all flex items-center justify-center font-bold ${
                currentPage === 12 
                  ? 'bg-alpine-blue text-white border-alpine-blue shadow-lg shadow-alpine-blue/20' 
                  : 'border-slate-200 text-slate-400 hover:border-alpine-blue hover:text-alpine-blue'
              }`}
            >
              12
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
