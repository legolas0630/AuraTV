'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function ChannelsPage() {
  const { lang } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedCountries, setExpandedCountries] = useState<Record<string, boolean>>({
    usa: true, // Default open the first one for visual guidance
  });

  const content = {
    en: {
      heroBadge: 'LIVE STREAM GRID LAYER',
      title: 'Global Broadcast Directory',
      subtitle: 'Browse thousands of live Free-to-Air index feeds synchronized directly from open-source network infrastructure pipelines.',
      searchPlaceholder: 'Search channels, networks, or countries...',
      allCats: 'All Categories',
      catSports: 'Sports Pack',
      catEnt: 'Entertainment & Movies',
      catNews: 'News Networks',
      catDocs: 'Documentaries',
      ctaTitle: 'Unlock the Entire 15,000+ Signal Matrix',
      ctaSubtitle: 'Get automated M3U provisioning links and Xtream protocol credentials assigned directly to your private profile.',
      ctaBtn: 'Secure My Subscription Node',
      channelsLabel: 'channels online',
    },
    es: {
      heroBadge: 'CAPA DE PARRILLA DE TRANSMISIÓN GLOBAL',
      title: 'Directorio de Señales Globales',
      subtitle: 'Explore miles de transmisiones de señal abierta (FTA) sincronizadas directamente desde canales de infraestructura de código abierto.',
      searchPlaceholder: 'Buscar canales, redes o países...',
      allCats: 'Todas las Categorías',
      catSports: 'Paquete Deportes',
      catEnt: 'Entretenimiento y Cine',
      catNews: 'Redes de Noticias',
      catDocs: 'Documentales',
      ctaTitle: 'Desbloquee la Matriz Completa de 15,000+ Señales',
      ctaSubtitle: 'Obtenga enlaces automáticos de aprovisionamiento M3U y credenciales de protocolo Xtream directamente en su perfil.',
      ctaBtn: 'Asegurar Mi Nodo de Suscripción',
      channelsLabel: 'canales en línea',
    }
  };

  const t = content[lang as 'en' | 'es'] || content.en;

  // Premium Multi-Country Directory Dataset Model (Vetted against iptv-org parameters)
  const countryDirectory = [
    {
      id: 'usa',
      name: 'United States',
      flag: '🇺🇸',
      channels: [
        { name: 'ESPN Ultra HD', cat: 'sports', quality: '4K' },
        { name: 'ABC News Live', cat: 'news', quality: '1080p' },
        { name: 'HBO East Premium', cat: 'entertainment', quality: '4K' },
        { name: 'CBS Sports Network', cat: 'sports', quality: '1080p' },
        { name: 'Fox News Channel', cat: 'news', quality: '1080p' },
        { name: 'Discovery Channel HD', cat: 'documentaries', quality: '1080p' },
        { name: 'NBC News NOW', cat: 'news', quality: '1080p' },
        { name: 'National Geographic HD', cat: 'documentaries', quality: '1080p' }
      ]
    },
    {
      id: 'uk',
      name: 'United Kingdom',
      flag: '🇬🇧',
      channels: [
        { name: 'Sky Sports Main Event', cat: 'sports', quality: '4K' },
        { name: 'BBC One London HD', cat: 'entertainment', quality: '1080p' },
        { name: 'Sky News UK', cat: 'news', quality: '1080p' },
        { name: 'BBC News International', cat: 'news', quality: '1080p' },
        { name: 'TNT Sports 1', cat: 'sports', quality: '1080p' },
        { name: 'ITV 1 HD', cat: 'entertainment', quality: '1080p' }
      ]
    },
    {
      id: 'mexico',
      name: 'México',
      flag: '🇲🇽',
      channels: [
        { name: 'TUDN Premium México', cat: 'sports', quality: '1080p' },
        { name: 'Las Estrellas HD', cat: 'entertainment', quality: '1080p' },
        { name: 'Azteca Uno', cat: 'entertainment', quality: '1080p' },
        { name: 'Foro TV Info', cat: 'news', quality: '720p' },
        { name: 'Canal 5 HD', cat: 'entertainment', quality: '1080p' },
        { name: 'Fox Sports Cono Norte', cat: 'sports', quality: '1080p' }
      ]
    },
    {
      id: 'salvador',
      name: 'El Salvador',
      flag: '🇸🇻',
      channels: [
        { name: 'Canal 4 El Salvador', cat: 'sports', quality: '720p' },
        { name: 'TCS Canal 2 HD', cat: 'entertainment', quality: '1080p' },
        { name: 'Canal 21 Telenoticias', cat: 'news', quality: '720p' },
        { name: 'Canal 12 SV', cat: 'entertainment', quality: '720p' },
        { name: 'Noticiero Hechos 12', cat: 'news', quality: '720p' }
      ]
    },
    {
      id: 'brazil',
      name: 'Brazil',
      flag: '🇧🇷',
      channels: [
        { name: 'TV Globo RJ HD', cat: 'entertainment', quality: '1080p' },
        { name: 'SporTV Brazil Ultra', cat: 'sports', quality: '4K' },
        { name: 'GloboNews Ao Vivo', cat: 'news', quality: '1080p' },
        { name: 'Band Sports BR', cat: 'sports', quality: '1080p' },
        { name: 'SBT HD Regional', cat: 'entertainment', quality: '1080p' }
      ]
    },
    {
      id: 'france',
      name: 'France',
      flag: '🇫🇷',
      channels: [
        { name: 'Canal+ France HD', cat: 'entertainment', quality: '1080p' },
        { name: 'RMC Sport 1', cat: 'sports', quality: '1080p' },
        { name: 'France 24 Info', cat: 'news', quality: '1080p' },
        { name: 'TF1 Full HD', cat: 'entertainment', quality: '1080p' },
        { name: 'BFM TV Live', cat: 'news', quality: '720p' }
      ]
    },
    {
      id: 'spain',
      name: 'España',
      flag: '🇪🇸',
      channels: [
        { name: 'La 1 HD RTVE', cat: 'entertainment', quality: '1080p' },
        { name: 'Antena 3 Premium', cat: 'entertainment', quality: '1080p' },
        { name: 'Movistar+ LaLiga', cat: 'sports', quality: '4K' },
        { name: '24 Horas TVE', cat: 'news', quality: '720p' }
      ]
    },
    {
      id: 'me',
      name: 'Middle East Network',
      flag: '🇶🇦',
      channels: [
        { name: 'beIN Sports 1 Premium', cat: 'sports', quality: '4K' },
        { name: 'Al Jazeera Arabic Live', cat: 'news', quality: '1080p' },
        { name: 'MBC 1 HD Dubai', cat: 'entertainment', quality: '1080p' },
        { name: 'Al Arabiya News', cat: 'news', quality: '1080p' },
        { name: 'AD Sports 1 Premium', cat: 'sports', quality: '1080p' }
      ]
    },
    {
      id: 'asia',
      name: 'Asia Collective (JP/IN/CN)',
      flag: '🇯🇵',
      channels: [
        { name: 'NHK World Tokyo Premium', cat: 'news', quality: '1080p' },
        { name: 'Sony TEN 1 HD India', cat: 'sports', quality: '1080p' },
        { name: 'CCTV News Mandarin', cat: 'news', quality: '720p' },
        { name: 'KBS World South Korea', cat: 'entertainment', quality: '1080p' }
      ]
    },
    {
      id: 'africa',
      name: 'Africa Unified Feeds',
      flag: '🇿🇦',
      channels: [
        { name: 'SuperSport Grandstand Africa', cat: 'sports', quality: '1080p' },
        { name: 'AfricaNews Live Network', cat: 'news', quality: '720p' },
        { name: 'SABC 1 HD South Africa', cat: 'entertainment', quality: '1080p' },
        { name: 'Channels TV Nigeria', cat: 'news', quality: '720p' }
      ]
    }
  ];

  const categories = [
    { id: 'all', label: t.allCats },
    { id: 'sports', label: t.catSports },
    { id: 'entertainment', label: t.catEnt },
    { id: 'news', label: t.catNews },
    { id: 'documentaries', label: t.catDocs }
  ];

  const toggleCountry = (id: string) => {
    setExpandedCountries((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // High-performance search and category filtering pipeline loop
  const filteredDirectory = useMemo(() => {
    return countryDirectory
      .map((country) => {
        const matchingChannels = country.channels.filter((chan) => {
          const matchesCategory = activeCategory === 'all' || chan.cat === activeCategory;
          const matchesSearch = chan.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                country.name.toLowerCase().includes(searchQuery.toLowerCase());
          return matchesCategory && matchesSearch;
        });

        return { ...country, channels: matchingChannels };
      })
      .filter((country) => country.channels.length > 0);
  }, [searchQuery, activeCategory]);

  return (
    <div className="bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#060608] dark:text-[#f4f4f7] min-h-screen transition-colors duration-300 pb-1">
      
      {/* CINEMATIC HERO COVER GRAPHIC */}
      <section className="relative w-full text-center px-6 pt-16 pb-12 bg-gradient-to-b from-black/5 via-transparent to-transparent dark:from-violet-950/10 dark:via-transparent">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-r from-violet-600/10 to-blue-600/10 rounded-full filter blur-[100px] pointer-events-none dark:opacity-60"></div>
        
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <span className="text-[10px] font-black tracking-widest uppercase bg-violet-600/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 px-4 py-1.5 rounded-full shadow-sm">
            {t.heroBadge}
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-gray-900 dark:text-white">
            {t.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed font-medium">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* FILTER RADAR TOOLBAR CONTROL SYSTEM */}
      <section className="max-w-5xl mx-auto px-6 space-y-6">
        
        {/* Apple Style Floating Search Terminal Input */}
        <div className="relative group max-w-2xl mx-auto">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 text-sm">🔍</span>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-white/60 dark:bg-white/[0.01] backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold shadow-sm focus:outline-none focus:border-violet-500/50 text-inherit transition"
          />
        </div>

        {/* Content Category Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-1.5 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-[11px] font-black tracking-wide rounded-xl transition-all cursor-pointer border ${
                activeCategory === cat.id 
                  ? 'bg-violet-600 text-white border-violet-600 shadow-md' 
                  : 'bg-white/50 dark:bg-white/[0.02] border-black/5 dark:border-white/5 text-gray-400 hover:text-inherit'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </section>

      {/* NESTED COUNTRY DROPDOWN ACCORDION ARRAY LAYOUT */}
      <section className="max-w-4xl mx-auto px-6 py-10 space-y-4">
        {filteredDirectory.map((country) => {
          const isOpen = !!expandedCountries[country.id];
          return (
            <div 
              key={country.id} 
              className="bg-white dark:bg-[#0c0c10] border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm transition-all duration-200"
            >
              {/* Country Accordion Header Node Header */}
              <button
                onClick={() => toggleCountry(country.id)}
                className="w-full flex items-center justify-between p-5 text-left font-black text-xs md:text-sm tracking-tight cursor-pointer hover:bg-black/[0.01] dark:hover:bg-white/[0.01] text-inherit transition select-none"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl p-1 bg-black/5 dark:bg-white/5 rounded-lg block">{country.flag}</span>
                  <span>{country.name}</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                  <span className="text-[10px] font-bold lowercase opacity-70 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-md">
                    {country.channels.length} {t.channelsLabel}
                  </span>
                  <span className={`text-[10px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>

              {/* Inner Expanded Channel Drawer Grid */}
              {isOpen && (
                <div className="border-t border-black/5 dark:border-white/5 p-4 bg-black/[0.005] dark:bg-black/20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 animate-fadeIn">
                  {country.channels.map((chan, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white dark:bg-[#111116] border border-black/5 dark:border-white/5 p-3.5 rounded-xl flex items-center justify-between shadow-xs"
                    >
                      <span className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate pr-2">
                        {chan.name}
                      </span>
                      <span className="text-[8px] font-black bg-violet-500/10 text-violet-600 dark:text-violet-400 px-2 py-0.5 border border-violet-500/20 rounded-md shrink-0">
                        {chan.quality}
                      </span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          );
        })}

        {/* Empty Search Filter State Fallback */}
        {filteredDirectory.length === 0 && (
          <div className="text-center py-16 text-xs font-bold text-gray-400">
            No global channels match your targeted filter criteria.
          </div>
        )}
      </section>

      {/* CINEMATIC SUBSCRIPTION UPGRADE CTA BOX FOOTER ROW */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="relative w-full bg-gradient-to-br from-violet-600 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white space-y-6 shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          <div className="max-w-xl mx-auto space-y-4 z-10 relative">
            <h2 className="text-xl md:text-3xl font-black tracking-tight leading-none">
              {t.ctaTitle}
            </h2>
            <p className="text-[11px] md:text-xs text-white/80 font-medium leading-relaxed">
              {t.ctaSubtitle}
            </p>
            <div className="pt-2">
              <Link href="/pricing" className="inline-block bg-white text-gray-900 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-200">
                {t.ctaBtn}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}