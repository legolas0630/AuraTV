'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function ChannelsPage() {
  const { theme, setTheme, lang, setLang, currency, setCurrency } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');

  const content = {
    en: {
      title: 'Live Global Channel Index',
      subtitle: 'Browse our massive network directory. Filter by category to see what is currently broadcasting live.',
      searchPlaceholder: 'Search from 15,000+ networks...',
      all: 'All Networks',
      sports: 'Sports Pack',
      entertainment: 'Entertainment',
      latam: 'LATAM Networks',
      cta: 'Unlock Every Channel Now',
      categories: {
        sports: [
          { name: 'Sky Sports Main Event Ultra HD', logo: '⚽', quality: '4K' },
          { name: 'ESPN 1 & 2 HD', logo: '🏀', quality: '1080p' },
          { name: 'Fox Sports Premium', logo: '🏎️', quality: '1080p' },
          { name: 'DAZN Live Arena', logo: '🥊', quality: '720p' },
          { name: 'TNT Sports Network', logo: '🏆', quality: '1080p' }
        ],
        entertainment: [
          { name: 'HBO Premium East/West', logo: '🎬', quality: '4K' },
          { name: 'Discovery Channel HD', logo: '🌍', quality: '1080p' },
          { name: 'National Geographic Global', logo: '🦁', quality: '1080p' },
          { name: 'Warner Bros TV', logo: '🎭', quality: '1080p' },
          { name: 'Disney Channel Plus', logo: '🏰', quality: '720p' }
        ],
        latam: [
          { name: 'TUDN Premium', logo: '🇲🇽', quality: '1080p' },
          { name: 'Caracol TV Internacional', logo: '🇨🇴', quality: '1080p' },
          { name: 'Telefe Federal', logo: '🇦🇷', quality: '720p' },
          { name: 'Las Estrellas HD', logo: '📺', quality: '1080p' },
          { name: 'TV Globo Premium', logo: '🇧🇷', quality: '1080p' }
        ]
      }
    },
    es: {
      title: 'Índice Global de Canales',
      subtitle: 'Explore nuestro enorme directorio de señales de transmisión. Filtre por categoría para ver la parrilla en vivo.',
      searchPlaceholder: 'Buscar entre más de 15,000 señales...',
      all: 'Todos los Canales',
      sports: 'Paquete Deportes',
      entertainment: 'Entretenimiento',
      latam: 'Señales LATAM',
      cta: 'Desbloquear Todos los Canales',
      categories: {
        sports: [
          { name: 'Sky Sports Main Event Ultra HD', logo: '⚽', quality: '4K' },
          { name: 'ESPN 1 y 2 HD', logo: '🏀', quality: '1080p' },
          { name: 'Fox Sports Premium', logo: '🏎️', quality: '1080p' },
          { name: 'DAZN Live Arena', logo: '🥊', quality: '720p' },
          { name: 'TNT Sports Network', logo: '🏆', quality: '1080p' }
        ],
        entertainment: [
          { name: 'HBO Premium Este/Oeste', logo: '🎬', quality: '4K' },
          { name: 'Discovery Channel HD', logo: '🌍', quality: '1080p' },
          { name: 'National Geographic Global', logo: '🦁', quality: '1080p' },
          { name: 'Warner Bros TV', logo: '🎭', quality: '1080p' },
          { name: 'Disney Channel Plus', logo: '🏰', quality: '720p' }
        ],
        latam: [
          { name: 'TUDN Premium', logo: '🇲🇽', quality: '1080p' },
          { name: 'Caracol TV Internacional', logo: '🇨🇴', quality: '1080p' },
          { name: 'Telefe Federal', logo: '🇦🇷', quality: '720p' },
          { name: 'Las Estrellas HD', logo: '📺', quality: '1080p' },
          { name: 'TV Globo Premium', logo: '🇧🇷', quality: '1080p' }
        ]
      }
    }
  };

  const t = content[lang as 'en' | 'es'];

  // Flatten filter layout maps
  const displayedChannels = [
    ...(activeCategory === 'all' || activeCategory === 'sports' ? t.categories.sports : []),
    ...(activeCategory === 'all' || activeCategory === 'entertainment' ? t.categories.entertainment : []),
    ...(activeCategory === 'all' || activeCategory === 'latam' ? t.categories.latam : [])
  ];

  return (
    <div className="min-h-screen bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#0a0a0c] dark:text-[#f4f4f7] flex flex-col justify-between transition-colors duration-200">
      
      {/* Header Dock Controls */}
      <header className="px-6 py-6 border-b border-black/5 dark:border-white/10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link href="/" className="text-xl font-black tracking-wider bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
          AURA<span className="text-gray-900 dark:text-white">TV</span>
        </Link>
        <div className="flex items-center gap-3">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-black/5 dark:bg-white/5 text-xs font-bold rounded-lg px-2 py-1.5 focus:outline-none border border-black/10 dark:border-white/10 text-inherit">
            <option value="en">🇺🇸 EN</option>
            <option value="es">🇲🇽 ES</option>
          </select>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="bg-black/5 dark:bg-white/5 text-xs font-bold rounded-lg px-2 py-1.5 focus:outline-none border border-black/10 dark:border-white/10 text-inherit">
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="MXN">MXN ($)</option>
          </select>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-1.5 bg-black/5 dark:bg-white/5 rounded-lg border border-black/10 dark:border-white/10 text-xs cursor-pointer text-inherit">
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      {/* Main Core Layout Grid */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">{t.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{t.subtitle}</p>
        </div>

        {/* Categories Tab Dock */}
        <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto bg-black/5 dark:bg-white/5 p-1 rounded-xl">
          {['all', 'sports', 'entertainment', 'latam'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeCategory === cat 
                  ? 'bg-white dark:bg-white/10 text-violet-600 dark:text-white shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-inherit'
              }`}
            >
              {t[cat as keyof typeof t] as string}
            </button>
          ))}
        </div>

        {/* Dynamic Interactive Channel Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {displayedChannels.map((chan, idx) => (
            <div key={idx} className="bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 p-4 rounded-2xl flex items-center justify-between shadow-sm hover:border-violet-500/30 transition duration-150">
              <div className="flex items-center gap-4">
                <span className="text-2xl p-2.5 bg-black/5 dark:bg-white/5 rounded-xl">{chan.logo}</span>
                <span className="text-xs font-bold tracking-tight">{chan.name}</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-violet-500/10 text-violet-600 dark:text-violet-400 px-2.5 py-1 border border-violet-500/20 rounded-md">
                {chan.quality}
              </span>
            </div>
          ))}
        </div>

        {/* Prompt Gateway Card */}
        <div className="text-center pt-8">
          <Link href="/pricing" className="glow-btn px-8 py-4 rounded-xl text-xs font-bold text-white shadow-lg inline-block">
            {t.cta}
          </Link>
        </div>
      </main>

      <footer className="py-8 border-t border-black/5 dark:border-white/5 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} AURA TV Matrix Protocol. Realtime Sync Core.
      </footer>
    </div>
  );
}