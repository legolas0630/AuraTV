'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function ChannelsPage() {
  const { lang } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');

  const content = {
    en: {
      title: 'Live Global Channel Index',
      subtitle: 'Browse our massive network directory. Filter by category to see what is currently broadcasting live.',
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

  const t = content[lang as 'en' | 'es'] || content.en;

  const displayedChannels = [
    ...(activeCategory === 'all' || activeCategory === 'sports' ? t.categories.sports : []),
    ...(activeCategory === 'all' || activeCategory === 'entertainment' ? t.categories.entertainment : []),
    ...(activeCategory === 'all' || activeCategory === 'latam' ? t.categories.latam : [])
  ];

  return (
    <div className="w-full">
      <main className="max-w-6xl mx-auto w-full px-6 py-12 space-y-12">
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

        {/* Channel Cards Grid */}
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

        <div className="text-center pt-8">
          <Link href="/pricing" className="glow-btn px-8 py-4 rounded-xl text-xs font-bold text-white shadow-lg inline-block">
            {t.cta}
          </Link>
        </div>
      </main>
    </div>
  );
}