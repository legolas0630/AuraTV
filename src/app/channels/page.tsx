'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function ChannelsPage() {
  const { lang } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeRegion, setActiveRegion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const content = {
    en: {
      heroBadge: 'GLOBAL SPECTRUM INDEX',
      title: 'Explore 15,000+ Native Streams.',
      subtitle: 'Filter our global network array by region or broadcast package. Realtime edge nodes map high-bitrate feeds effortlessly to your player configuration.',
      searchPlaceholder: 'Search channels, networks, or countries...',
      allCats: 'All Categories',
      catSports: 'Sports Pack',
      catEnt: 'Entertainment & Movies',
      catNews: 'News Networks',
      catDocs: 'Documentaries & Science',
      allRegions: 'All Regions',
      ctaTitle: 'Ready to Unlock the Full Global Broadcast Grid?',
      ctaSubtitle: 'Instantly clear restrictions and map all 15,000+ live premium signals directly into your server token profile.',
      ctaBtn: 'Secure Instant Access Now'
    },
    es: {
      heroBadge: 'ÍNDICE DE ESPECTRO GLOBAL',
      title: 'Explore más de 15,000 Señales Nativas.',
      subtitle: 'Filtre nuestra matriz de transmisión global por región o paquete de programación. Los nodos perimetrales mapean transmisiones de alta tasa de bits sin esfuerzo.',
      searchPlaceholder: 'Buscar canales, redes o países...',
      allCats: 'Todas las Categorías',
      catSports: 'Paquete Deportes',
      catEnt: 'Entretenimiento y Cine',
      catNews: 'Redes de Noticias',
      catDocs: 'Documentales y Ciencia',
      allRegions: 'Todas las Regiones',
      ctaTitle: '¿Listo para Desbloquear la Parrilla de Canales Global?',
      ctaSubtitle: 'Elimine las restricciones al instante y mapee más de 15,000 señales premium en vivo directamente en su perfil.',
      ctaBtn: 'Obtener Acceso Instantáneo'
    }
  };

  const t = content[lang as 'en' | 'es'] || content.en;

  // Master Highly Structured Global Channel Array
  const masterChannels = [
    // --- USA ---
    { name: 'ESPN 1 & 2 Ultra HD', category: 'sports', region: 'usa', flag: '🇺🇸', quality: '4K' },
    { name: 'HBO Premium East', category: 'entertainment', region: 'usa', flag: '🇺🇸', quality: '4K' },
    { name: 'Discovery Channel HD', category: 'documentaries', region: 'usa', flag: '🇺🇸', quality: '1080p' },
    { name: 'CNN International Live', category: 'news', region: 'usa', flag: '🇺🇸', quality: '1080p' },
    
    // --- UK ---
    { name: 'Sky Sports Main Event HD', category: 'sports', region: 'uk', flag: '🇬🇧', quality: '4K' },
    { name: 'BBC One HD London', category: 'entertainment', region: 'uk', flag: '🇬🇧', quality: '1080p' },
    { name: 'Sky News UK Live', category: 'news', region: 'uk', flag: '🇬🇧', quality: '1080p' },
    
    // --- MEXICO ---
    { name: 'TUDN Selecciones Premium', category: 'sports', region: 'mexico', flag: '🇲🇽', quality: '1080p' },
    { name: 'Las Estrellas Internacional', category: 'entertainment', region: 'mexico', flag: '🇲🇽', quality: '1080p' },
    { name: 'Azteca Uno HD', category: 'entertainment', region: 'mexico', flag: '🇲🇽', quality: '1080p' },
    
    // --- EL SALVADOR ---
    { name: 'Canal 4 El Salvador (Deportes)', category: 'sports', region: 'salvador', flag: '🇸🇻', quality: '720p' },
    { name: 'TCS Canal 2 HD', category: 'entertainment', region: 'salvador', flag: '🇸🇻', quality: '1080p' },
    { name: 'Canal 21 Edición Central', category: 'news', region: 'salvador', flag: '🇸🇻', quality: '720p' },
    
    // --- BRAZIL ---
    { name: 'TV Globo Premium', category: 'entertainment', region: 'brazil', flag: '🇧🇷', quality: '1080p' },
    { name: 'SporTV Brazil HD', category: 'sports', region: 'brazil', flag: '🇧🇷', quality: '1080p' },
    { name: 'GloboNews Ao Vivo', category: 'news', region: 'brazil', flag: '🇧🇷', quality: '720p' },
    
    // --- FRANCE ---
    { name: 'Canal+ France Premium', category: 'entertainment', region: 'france', flag: '🇫🇷', quality: '1080p' },
    { name: 'RMC Sport 1 HD', category: 'sports', region: 'france', flag: '🇫🇷', quality: '1080p' },
    { name: 'France 24 Info Live', category: 'news', region: 'france', flag: '🇫🇷', quality: '1080p' },
    
    // --- MIDDLE EAST ---
    { name: 'beIN Sports 1 Premium', category: 'sports', region: 'me', flag: '🇶🇦', quality: '4K' },
    { name: 'MBC1 HD Premium', category: 'entertainment', region: 'me', flag: '🇦🇪', quality: '1080p' },
    { name: 'Al Jazeera Arabic Live', category: 'news', region: 'me', flag: '🇶🇦', quality: '1080p' },
    { name: 'National Geographic Abu Dhabi', category: 'documentaries', region: 'me', flag: '🇦🇪', quality: '1080p' },
    
    // --- ASIA ---
    { name: 'NHK World Premium Tokyo', category: 'news', region: 'asia', flag: '🇯🇵', quality: '1080p' },
    { name: 'Sony TEN 1 HD', category: 'sports', region: 'asia', flag: '🇮🇳', quality: '1080p' },
    { name: 'CCTV News Mandarin', category: 'news', region: 'asia', flag: '🇨🇳', quality: '720p' },
    
    // --- AFRICA ---
    { name: 'SuperSport Grandstand Africa', category: 'sports', region: 'africa', flag: '🇿🇦', quality: '1080p' },
    { name: 'AfricaNews Live Network', category: 'news', region: 'africa', flag: '🇨🇬', quality: '720p' },
    { name: 'CGTN Africa Feeds', category: 'documentaries', region: 'africa', flag: '🇰🇪', quality: '1080p' }
  ];

  const categories = [
    { id: 'all', label: t.allCats },
    { id: 'sports', label: t.catSports },
    { id: 'entertainment', label: t.catEnt },
    { id: 'news', label: t.catNews },
    { id: 'documentaries', label: t.catDocs }
  ];

  const regions = [
    { id: 'all', label: t.allRegions },
    { id: 'usa', label: '🇺🇸 USA' },
    { id: 'uk', label: '🇬🇧 United Kingdom' },
    { id: 'mexico', label: '🇲🇽 México' },
    { id: 'salvador', label: '🇸🇻 El Salvador' },
    { id: 'brazil', label: '🇧🇷 Brazil' },
    { id: 'france', label: '🇫🇷 France' },
    { id: 'me', label: '🕌 Middle East' },
    { id: 'asia', label: '🌏 Asia Pack' },
    { id: 'africa', label: '🌍 Africa Feeds' }
  ];

  // Pipeline Filter Logic
  const filteredChannels = masterChannels.filter((chan) => {
    const matchesCategory = activeCategory === 'all' || chan.category === activeCategory;
    const matchesRegion = activeRegion === 'all' || chan.region === activeRegion;
    const matchesSearch = chan.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesRegion && matchesSearch;
  });

  return (
    <div className="bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#060608] dark:text-[#f4f4f7] min-h-screen transition-colors duration-300 pb-1">
      
      {/* HEADER HERO COVER */}
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

      {/* SEARCH AND DOUBLE FILTER RADAR CONTROLLER */}
      <section className="max-w-7xl mx-auto px-6 space-y-6">
        
        {/* Dynamic Glassmorphic Search Terminal Input */}
        <div className="max-w-xl mx-auto relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 text-sm">🔍</span>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-white/60 dark:bg-white/[0.01] backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold shadow-sm focus:outline-none focus:border-violet-500/50 transition-all text-inherit"
          />
        </div>

        {/* 1. Category Filter Pill Deck */}
        <div className="flex flex-wrap justify-center gap-1.5 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-[11px] font-black tracking-wide rounded-xl transition-all cursor-pointer border ${
                activeCategory === cat.id 
                  ? 'bg-violet-600 text-white border-violet-600 shadow-md' 
                  : 'bg-white/50 dark:bg-white/[0.02] border-black/5 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:text-inherit'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 2. Country/Region Dynamic Tray (Apple Style Horizontal Wrap) */}
        <div className="w-full overflow-x-auto pb-2 scrollbar-none flex items-center justify-start md:justify-center gap-2 max-w-5xl mx-auto px-2">
          {regions.map((reg) => (
            <button
              key={reg.id}
              onClick={() => setActiveRegion(reg.id)}
              className={`whitespace-nowrap px-3.5 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer border ${
                activeRegion === reg.id 
                  ? 'border-violet-500/50 bg-violet-500/10 text-violet-600 dark:text-violet-400 font-extrabold shadow-sm' 
                  : 'border-black/5 dark:border-white/5 bg-white/30 dark:bg-white/[0.005] text-gray-400 hover:text-inherit'
              }`}
            >
              {reg.label}
            </button>
          ))}
        </div>

      </section>

      {/* CHANNELS GRID */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredChannels.map((chan, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-[#0c0c10] border border-black/5 dark:border-white/5 p-4 rounded-2xl flex items-center justify-between shadow-sm hover:border-violet-500/30 transition duration-200 group animate-fadeIn"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="text-xl p-2 bg-black/5 dark:bg-white/5 rounded-xl block shrink-0 group-hover:scale-105 transition-transform">
                  {chan.flag}
                </span>
                <span className="text-xs font-black tracking-tight text-gray-900 dark:text-white truncate">
                  {chan.name}
                </span>
              </div>
              <span className="text-[9px] font-black bg-violet-500/10 text-violet-600 dark:text-violet-400 px-2 py-0.5 border border-violet-500/20 rounded-md shrink-0 ml-2">
                {chan.quality}
              </span>
            </div>
          ))}
        </div>

        {/* Empty Search Fallback State */}
        {filteredChannels.length === 0 && (
          <div className="text-center py-20 text-xs font-bold text-gray-400">
            No matching global feeds found inside chosen signal matrix parameters.
          </div>
        )}
      </section>

      {/* MOVIELIKE HIGH-CONVERTING BOTTOM CTABOX ZONE */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="relative w-full bg-gradient-to-br from-violet-600 to-blue-600 rounded-3xl p-8 md:p-14 text-center text-white space-y-6 shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          <div className="max-w-xl mx-auto space-y-3.5 z-10 relative">
            <h2 className="text-xl md:text-4xl font-black tracking-tight leading-none">
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