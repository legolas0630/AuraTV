'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function Header() {
  const { lang, setLang, currency, setCurrency } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Guard Clause: If the user is inside their secure workspace panel, hide the public navbar
  if (pathname.startsWith('/dashboard')) return null;

  const content = {
    en: {
      navFeatures: 'Features',
      navChannels: 'Channels',
      navPricing: 'Pricing',
      navSignIn: 'Sign In',
      navStartTrial: 'Start Free Trial',
    },
    es: {
      navFeatures: 'Características',
      navChannels: 'Canales',
      navPricing: 'Precios',
      navSignIn: 'Iniciar Sesión',
      navStartTrial: 'Prueba Gratuita',
    }
  };

  const t = content[lang as 'en' | 'es'] || content.en;

  return (
    <nav className="relative w-full bg-[#f4f4f7]/80 dark:bg-[#0a0a0c]/80 backdrop-blur-md border-b border-black/5 dark:border-white/10 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="text-xl font-black tracking-wider bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
          AURA<span className="text-gray-900 dark:text-white">TV</span>
        </Link>

        {/* Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          <Link href="/features" className="hover:text-violet-500 transition">{t.navFeatures}</Link>
          <Link href="/channels" className="hover:text-violet-500 transition">{t.navChannels}</Link>
          <Link href="/pricing" className="hover:text-violet-500 transition">{t.navPricing}</Link>
        </div>

        {/* Configuration Utilities (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-black/5 dark:bg-white/5 text-xs font-bold rounded-lg px-2 py-1.5 focus:outline-none border border-black/10 dark:border-white/10 text-inherit cursor-pointer">
            <option value="en">🇺🇸 EN</option>
            <option value="es">🇲🇽 ES</option>
          </select>

          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="bg-black/5 dark:bg-white/5 text-xs font-bold rounded-lg px-2 py-1.5 focus:outline-none border border-black/10 dark:border-white/10 text-inherit cursor-pointer">
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="MXN">MXN ($)</option>
          </select>

          <Link href="/login" className="text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-violet-500 px-3 py-2 transition">{t.navSignIn}</Link>
          <Link href="/register" className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition">{t.navStartTrial}</Link>
        </div>

        {/* Hamburger Toggle (Mobile) */}
        <div className="flex md:hidden items-center">
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
      </div>

      {/* Mobile Drawer Overlay Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#f4f4f7] dark:bg-[#0c0c0e] border-b border-black/10 dark:border-white/10 p-6 flex flex-col gap-4 md:hidden shadow-2xl z-50">
          <Link onClick={() => setMobileMenuOpen(false)} href="/features" className="text-sm font-bold border-b border-black/5 dark:border-white/5 pb-2 text-gray-600 dark:text-gray-300">{t.navFeatures}</Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="/channels" className="text-sm font-bold border-b border-black/5 dark:border-white/5 pb-2 text-gray-600 dark:text-gray-300">{t.navChannels}</Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="/pricing" className="text-sm font-bold border-b border-black/5 dark:border-white/5 pb-2 text-gray-600 dark:text-gray-300">{t.navPricing}</Link>
          
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
  );
}