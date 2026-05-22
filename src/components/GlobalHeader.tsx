'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { useApp } from '@/context/AppContext';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function GlobalHeader() {
  const { lang } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  // Listen to the live authentication stream to dynamically adjust buttons
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const content = {
    en: {
      navFeatures: 'Features',
      navChannels: 'Channels',
      navPricing: 'Pricing',
      navSignIn: 'Sign In',
      navStartTrial: 'Start Free Trial',
      navDashboard: 'Console Dashboard',
    },
    es: {
      navFeatures: 'Características',
      navChannels: 'Canales',
      navPricing: 'Precios',
      navSignIn: 'Iniciar Sesión',
      navStartTrial: 'Prueba Gratuita',
      navDashboard: 'Panel de Control',
    }
  };

  const t = content[lang as 'en' | 'es'] || content.en;

  return (
    <nav className="relative w-full bg-[#f4f4f7]/80 dark:bg-[#0a0a0c]/80 backdrop-blur-md border-b border-black/5 dark:border-white/10 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link href="/" className="text-xl font-black tracking-wider bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
          AURA<span className="text-gray-900 dark:text-white">TV</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          <Link href="/features" className="hover:text-violet-500 transition">{t.navFeatures}</Link>
          <Link href="/channels" className="hover:text-violet-500 transition">{t.navChannels}</Link>
          <Link href="/pricing" className="hover:text-violet-500 transition">{t.navPricing}</Link>
        </div>

        {/* Dynamic Auth Gates Action Trigger Group */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Link href="/dashboard" className="bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-black px-5 py-2.5 rounded-xl shadow-md transition transform hover:scale-[1.02]">
              {t.navDashboard}
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-violet-500 px-3 py-2 transition">{t.navSignIn}</Link>
              <Link href="/register" className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition">{t.navStartTrial}</Link>
            </>
          )}
        </div>

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

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#f4f4f7] dark:bg-[#0c0c10] border-b border-black/10 dark:border-white/10 p-6 flex flex-col gap-4 md:hidden shadow-2xl z-50">
          <Link onClick={() => setMobileMenuOpen(false)} href="/features" className="text-sm font-bold border-b border-black/5 dark:border-white/5 pb-2 text-gray-600 dark:text-gray-300">{t.navFeatures}</Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="/channels" className="text-sm font-bold border-b border-black/5 dark:border-white/5 pb-2 text-gray-600 dark:text-gray-300">{t.navChannels}</Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="/pricing" className="text-sm font-bold border-b border-black/5 dark:border-white/5 pb-2 text-gray-600 dark:text-gray-300">{t.navPricing}</Link>
          
          <div className="flex flex-col gap-2 pt-2">
            {user ? (
              <Link onClick={() => setMobileMenuOpen(false)} href="/dashboard" className="w-full text-center font-bold text-sm py-3 bg-violet-600 text-white rounded-xl shadow-md">{t.navDashboard}</Link>
            ) : (
              <>
                <Link onClick={() => setMobileMenuOpen(false)} href="/login" className="w-full text-center font-bold text-sm py-3 border border-black/10 dark:border-white/10 rounded-xl text-inherit">{t.navSignIn}</Link>
                <Link onClick={() => setMobileMenuOpen(false)} href="/register" className="w-full text-center font-bold text-sm py-3 bg-violet-600 text-white rounded-xl shadow-md">{t.navStartTrial}</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}