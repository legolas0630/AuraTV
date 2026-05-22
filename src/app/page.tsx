'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function HomePage() {
  const { lang } = useApp();
  const [activeStream, setActiveStream] = useState('sports');
  const [liveUsers, setLiveUsers] = useState(14582);

  // Simulate a live ticking global user cluster count for behavioral proof
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
      
      {/* HERO SECTION */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 flex flex-col items-center justify-center text-center py-12 md:py-24 space-y-12">
        
        {/* Animated Badge */}
        <span className="text-[10px] md:text-xs font-black tracking-widest uppercase bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 px-4 py-1.5 rounded-full shadow-sm animate-pulse">
          {t.heroTag}
        </span>

        {/* Big Title */}
        <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-none max-w-4xl text-gray-900 dark:text-white">
          {t.heroTitle}
        </h1>

        {/* Informative Subtitle */}
        <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
          {t.heroSubtitle}
        </p>

        {/* CTA Button Actions Hub */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link href="/register" className="glow-btn w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-bold text-white shadow-lg text-center">
            {t.ctaPrimary}
          </Link>
          <Link href="/channels" className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-bold bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-900 dark:text-white border border-black/10 dark:border-white/10 text-center transition">
            {t.ctaSecondary}
          </Link>
        </div>

        {/* INTERACTIVE APPLE-STYLE GLASSMORPHISM STREAM TERMINAL */}
        <section className="w-full max-w-4xl bg-white/40 dark:bg-white/[0.01] backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl p-4 md:p-6 shadow-2xl text-left space-y-6 transition-all duration-300">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/10 dark:border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <h2 className="text-sm font-black uppercase tracking-wider">{t.terminalTitle}</h2>
            </div>
            <div className="text-[10px] font-black tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
              {t.serverStatus}
            </div>
          </div>

          {/* Telemetry Telecommunication Stats Dashboard */}
          <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
            <div className="bg-white/50 dark:bg-black/30 border border-black/5 dark:border-white/5 p-3 rounded-xl shadow-sm">