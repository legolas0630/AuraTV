'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function HomePage() {
  const { lang } = useApp();
  const [activeStream, setActiveStream] = useState('sports');
  const [liveUsers, setLiveUsers] = useState(14582);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const content = {
    en: {
      heroTag: 'GLOBAL TV & VOD OPTIMIZATION PORTAL',
      heroTitle: 'Stream Live TV from Every Corner of the Globe',
      heroSubtitle: 'The ultimate control hub for public Free-to-Air broadcasts and VOD classics. Curated, optimized, and ready for your Fire Stick, Smart TV, or mobile device.',
      ctaPrimary: 'Start Your 24-Hour Free Trial',
      ctaSecondary: 'Explore Channel List',
      terminalTitle: 'AuraTV Live Signal Matrix',
      serverStatus: 'Network Core: Operational',
      latency: 'Avg Edge Latency',
      streamsOnline: 'Channels Routed',
      liveViewers: 'Active Stream Sessions',
      sportsTitle: 'UEFA Champions League Live',
      sportsDesc: 'Streaming live in 4K Ultra HD at 60 FPS with zero buffering algorithms.',
      moviesTitle: 'Premium Cinema Premiere',
      moviesDesc: 'On-demand Hollywood box office blockbusters with raw multi-channel audio tracks.',
      latamTitle: 'LATAM Regional Broadcast Network',
      latamDesc: 'Local programming feeds serving high bit-rate native streams across South America.',
      footerDesc: 'Next generation live television protocol network distribution platform.'
    },
    es: {
      heroTag: 'PORTAL DE OPTIMIZACIÓN GLOBAL DE TV Y VOD',
      heroTitle: 'Transmita TV en Vivo desde Cualquier Rincón del Mundo',
      heroSubtitle: 'El centro de control definitivo para transmisiones públicas en señal abierta y clásicos de VOD. Curado, optimizado y listo para su Fire Stick, Smart TV o dispositivo móvil.',
      ctaPrimary: 'Iniciar Prueba de 24 Horas Gratis',
      ctaSecondary: 'Explorar Lista de Canales',
      terminalTitle: 'Matriz de Señal en Vivo AuraTV',
      serverStatus: 'Núcleo de Red: Operacional',
      latency: 'Latencia Promedio',
      streamsOnline: 'Canales Enrutados',
      liveViewers: 'Sesiones de Streaming Activas',
      sportsTitle: 'UEFA Champions League En Vivo',
      sportsDesc: 'Transmitiendo en vivo en 4K Ultra HD a 60 FPS con algoritmos anti-congelamiento.',
      moviesTitle: 'Estrenos de Cine Premium',
      moviesDesc: 'Películas de taquilla de Hollywood bajo demanda con pistas de audio multicanal crudas.',
      latamTitle: 'Red de Transmisión Regional LATAM',
      latamDesc: 'Señales de programación local sirviendo transmisiones nativas de alta tasa de bits.',
      footerDesc: 'Plataforma de distribución de red de protocolo de televisión en vivo de próxima generación.'
    }
  };

  const t = content[lang as 'en' | 'es'] || content.en;

  return (
    <div className="min-h-screen bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#0a0a0c] dark:text-[#f4f4f7] flex flex-col justify-between transition-colors duration-200">
      
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 flex flex-col items-center justify-center text-center py-12 md:py-24 space-y-12">
        
        <span className="text-[10px] md:text-xs font-black tracking-widest uppercase bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 px-4 py-1.5 rounded-full shadow-sm animate-pulse">
          {t.heroTag}
        </span>

        <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-none max-w-4xl text-gray-900 dark:text-white">
          {t.heroTitle}
        </h1>

        <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
          {t.heroSubtitle}
        </p>

        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link href="/register" className="glow-btn w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-bold text-white shadow-lg text-center">
            {t.ctaPrimary}
          </Link>
          <Link href="/channels" className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-bold bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-900 dark:text-white border border-black/10 dark:border-white/10 text-center transition">
            {t.ctaSecondary}
          </Link>
        </div>

        {/* GLASSMORPHISM SIGNAL MATRIX BOX */}
        <section className="w-full max-w-4xl bg-white/40 dark:bg-white/[0.01] backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl p-4 md:p-6 shadow-2xl text-left space-y-6 transition-all duration-300">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/10 dark:border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <h2 className="text-sm font-black uppercase tracking-wider">{t.terminalTitle}</h2>
            </div>
            <div className="text-[10px] font-black tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
              {t.serverStatus}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
            <div className="bg-white/50 dark:bg-black/30 border border-black/5 dark:border-white/5 p-3 rounded-xl shadow-sm">
              <span className="block text-[10px] uppercase font-bold text-gray-400">{t.latency}</span>
              <span className="text-xs md:text-base font-mono font-bold text-violet-600 dark:text-violet-400">14ms</span>
            </div>
            <div className="bg-white/50 dark:bg-black/30 border border-black/5 dark:border-white/5 p-3 rounded-xl shadow-sm">
              <span className="block text-[10px] uppercase font-bold text-gray-400">{t.streamsOnline}</span>
              <span className="text-xs md:text-base font-mono font-bold text-cyan-600 dark:text-cyan-400">15,412+</span>
            </div>
            <div className="bg-white/50 dark:bg-black/30 border border-black/5 dark:border-white/5 p-3 rounded-xl shadow-sm">
              <span className="block text-[10px] uppercase font-bold text-gray-400">{t.liveViewers}</span>
              <span className="text-xs md:text-base font-mono font-bold text-amber-600 dark:text-amber-400">{liveUsers.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            
            <div className="flex flex-col gap-2">
              <button 
                type="button"
                onClick={() => setActiveStream('sports')}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  activeStream === 'sports' 
                    ? 'border-violet-500 bg-violet-500/10 shadow-sm' 
                    : 'border-black/5 dark:border-white/5 bg-white/30 dark:bg-white/[0.01] hover:bg-white/60 dark:hover:bg-white/[0.03]'
                }`}
              >
                <span className="block text-xs font-black">⚽ Sports Pack</span>
                <span className="text-[10px] text-gray-400 mt-0.5">4K HDR Live Signal</span>
              </button>

              <button 
                type="button"
                onClick={() => setActiveStream('movies')}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  activeStream === 'movies' 
                    ? 'border-violet-500 bg-violet-500/10 shadow-sm' 
                    : 'border-black/5 dark:border-white/5 bg-white/30 dark:bg-white/[0.01] hover:bg-white/60 dark:hover:bg-white/[0.03]'
                }`}
              >
                <span className="block text-xs font-black">🎬 Premium VOD</span>
                <span className="text-[10px] text-gray-400 mt-0.5">Hollywood Library</span>
              </button>

              <button 
                type="button"
                onClick={() => setActiveStream('latam')}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  activeStream === 'latam' 
                    ? 'border-violet-500 bg-violet-500/10 shadow-sm' 
                    : 'border-black/5 dark:border-white/5 bg-white/30 dark:bg-white/[0.01] hover:bg-white/60 dark:hover:bg-white/[0.03]'
                }`}
              >
                <span className="block text-xs font-black">🇲🇽 LATAM Networks</span>
                <span className="text-[10px] text-gray-400 mt-0.5">Regional Node Feeds</span>
              </button>
            </div>

            <div className="md:col-span-2 bg-gradient-to-br from-violet-600/20 to-blue-600/20 border border-violet-500/20 rounded-2xl p-6 flex flex-col justify-between min-h-[180px] relative overflow-hidden group shadow-inner">
              <div className="absolute inset-0 bg-radial-gradient from-violet-500/10 to-transparent pointer-events-none group-hover:scale-110 transition duration-700"></div>
              
              <div className="flex items-center justify-between z-10">
                <span className="text-[9px] font-black uppercase tracking-widest bg-red-600 text-white px-2 py-0.5 rounded-md flex items-center gap-1.5 shadow-sm animate-pulse">
                  <span className="h-1 w-1 rounded-full bg-white"></span> LIVE
                </span>
                <span className="text-[10px] font-mono font-bold text-gray-400 bg-black/40 px-2 py-0.5 rounded border border-white/5 backdrop-blur-md">
                  HEVC Main 10
                </span>
              </div>

              <div className="space-y-1.5 z-10 pt-8 md:pt-0">
                <h3 className="text-sm md:text-base font-black tracking-tight">
                  {activeStream === 'sports' && t.sportsTitle}
                  {activeStream === 'movies' && t.moviesTitle}
                  {activeStream === 'latam' && t.latamTitle}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-300 max-w-md leading-relaxed font-medium">
                  {activeStream === 'sports' && t.sportsDesc}
                  {activeStream === 'movies' && t.moviesDesc}
                  {activeStream === 'latam' && t.latamDesc}
                </p>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-8 border-t border-black/5 dark:border-white/5 px-6 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span className="font-bold text-gray-600 dark:text-gray-300">© {new Date().getFullYear()} AURA TV Ecosystem</span>
          <span>{t.footerDesc}</span>
        </div>
        <div className="flex gap-6 font-semibold text-gray-500">
          <Link href="/features" className="hover:text-violet-500">System</Link>
          <Link href="/channels" className="hover:text-violet-500">Grid</Link>
          <Link href="/pricing" className="hover:text-violet-500">SLA</Link>
        </div>
      </footer>
    </div>
  );
}