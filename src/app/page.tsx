'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function HomePage() {
  const { theme, setTheme, lang, setLang, currency, setCurrency } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Localized landing page dictionary
  const content = {
    en: {
      navFeatures: 'Features',
      navChannels: 'Channels',
      navPricing: 'Pricing',
      navSignIn: 'Sign In',
      navStartTrial: 'Start Free Trial',
      heroTag: 'GLOBAL TV & VOD OPTIMIZATION PORTAL',
      heroTitle: 'Stream Live TV from Every Corner of the Globe',
      heroSubtitle: 'The ultimate control hub for public Free-to-Air broadcasts and VOD classics. Curated, optimized, and ready for your Fire Stick, Smart TV, or mobile device.',
      ctaPrimary: 'Start Your 24-Hour Free Trial',
      ctaSecondary: 'Explore Channel List',
      footerDesc: 'Next generation live television protocol network distribution platform.'
    },
    es: {
      navFeatures: 'Características',
      navChannels: 'Canales',
      navPricing: 'Precios',
      navSignIn: 'Iniciar Sesión',
      navStartTrial: 'Prueba Gratuita',
      heroTag: 'PORTAL DE OPTIMIZACIÓN GLOBAL DE TV Y VOD',
      heroTitle: 'Transmita TV en Vivo desde Cualquier Rincón del Mundo',
      heroSubtitle: 'El centro de control definitivo para transmisiones públicas en señal abierta y clásicos de VOD. Curado, optimizado y listo para su Fire Stick, Smart TV o dispositivo móvil.',
      ctaPrimary: 'Iniciar Prueba de 24 Horas Gratis',
      ctaSecondary: 'Explorar Lista de Canales',
      footerDesc: 'Plataforma de distribución de red de protocolo de televisión en vivo de próxima generación.'
    }
  };

  const t = content[lang as 'en' | 'es'];

  return (
    <div className="min-h-screen bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#0a0a0c] dark:text-[#f4f4f7] flex flex-col justify-between transition-colors duration-200">
      
      {/* GLOBAL HEADER HEADER */}
      <nav className="relative w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-black/5 dark:border-white/10 z-50">
        
        {/* Brand Logo */}
        <Link href="/" className="text-xl font-black tracking-wider bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
          AURA<span className="text-gray-900 dark:text-white">TV</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          <Link href="/features" className="hover:text-violet-500 transition">{t.navFeatures}</Link>
          <Link href="/channels" className="hover:text-violet-500 transition">{t.navChannels}</Link>
          <Link href="/pricing" className="hover:text-violet-500 transition">{t.navPricing}</Link>
        </div>

        {/* Desktop Interface Control Dock */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language / Currency Context Selectors */}
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

          {/* Theme Switcher Toggle */}
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 bg-black/5 dark:bg-white/5 rounded-lg border border-black/10 dark:border-white/10 text-xs cursor-pointer text-inherit"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <Link href="/login" className="text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-violet-500 px-3 py-2 transition">{t.navSignIn}</Link>
          <Link href="/register" className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition">{t.navStartTrial}</Link>
        </div>

        {/* Responsive Mobile Layout Menu Row Buttons */}
        <div className="flex md:hidden items-center gap-3">
          {/* Quick theme toggle for mobile view directly available */}
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 bg-black/5 dark:bg-white/5 rounded-lg border border-black/10 dark:border-white/10 text-xs text-inherit"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Hamburger Bar Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-black/5 dark:bg-white/5 rounded-lg border border-black/10 dark:border-white/10 text-inherit focus:outline-none"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Animated Dropdown Drawer Overlay Menu (Mobile Only) */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#f4f4f7] dark:bg-[#0c0c0e] border-b border-black/10 dark:border-white/10 p-6 flex flex-col gap-4 md:hidden shadow-2xl z-50 animate-fadeIn">
            <Link onClick={() => setMobileMenuOpen(false)} href="/features" className="text-sm font-bold border-b border-black/5 dark:border-white/5 pb-2 text-gray-600 dark:text-gray-300">{t.navFeatures}</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/channels" className="text-sm font-bold border-b border-black/5 dark:border-white/5 pb-2 text-gray-600 dark:text-gray-300">{t.navChannels}</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/pricing" className="text-sm font-bold border-b border-black/5 dark:border-white/5 pb-2 text-gray-600 dark:text-gray-300">{t.navPricing}</Link>
            
            {/* Context Selectors on mobile drawer */}
            <div className="grid grid-cols-2 gap-2 my-2">
              <select value={lang} onChange={(e) => setLang(e.target.value)} className="w-full bg-black/5 dark:bg-white/5 text-xs font-bold rounded-xl p-3 border border-black/10 dark:border-white/10 text-inherit focus:outline-none">
                <option value="en">🇺🇸 EN</option>
                <option value="es">🇲🇽 ES</option>
              </select>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full bg-black/5 dark:bg-white/5 text-xs font-bold rounded-xl p-3 border border-black/10 dark:border-white/10 text-inherit focus:outline-none">
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="MXN">MXN ($)</option>
              </select>
            </div>

            <Link onClick={() => setMobileMenuOpen(false)} href="/login" className="w-full text-center font-bold text-sm py-3 border border-black/10 dark:border-white/10 rounded-xl text-inherit">{t.navSignIn}</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/register" className="w-full text-center font-bold text-sm py-3 bg-violet-600 text-white rounded-xl shadow-md">{t.navStartTrial}</Link>
          </div>
        )}
      </nav>

      {/* CORE HERO PRESENTATION BANNER */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 flex flex-col items-center justify-center text-center py-16 md:py-32 space-y-8">
        
        {/* Animated Badge */}
        <span className="text-[10px] md:text-xs font-black tracking-widest uppercase bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 px-4 py-1.5 rounded-full shadow-sm">
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
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/register" className="glow-btn w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-bold text-white shadow-lg text-center">
            {t.ctaPrimary}
          </Link>
          <Link href="/channels" className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-bold bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-900 dark:text-white border border-black/10 dark:border-white/10 text-center transition">
            {t.ctaSecondary}
          </Link>
        </div>
      </main>

      {/* FOOTER SECTION */}
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