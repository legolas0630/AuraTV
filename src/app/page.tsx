'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function HomePage() {
  const { lang } = useApp();

  const content = {
    en: {
      heroTag: 'GLOBAL TV & VOD OPTIMIZATION PORTAL',
      heroTitle: 'Stream Live TV from Every Corner of the Globe',
      heroSubtitle: 'The ultimate control hub for public Free-to-Air broadcasts and VOD classics. Curated, optimized, and ready for your Fire Stick, Smart TV, or mobile device.',
      ctaPrimary: 'Start Your 24-Hour Free Trial',
      ctaSecondary: 'Explore Channel List',
      footerDesc: 'Next generation live television protocol network distribution platform.'
    },
    es: {
      heroTag: 'PORTAL DE OPTIMIZACIÓN GLOBAL DE TV Y VOD',
      heroTitle: 'Transmita TV en Vivo desde Cualquier Rincón del Mundo',
      heroSubtitle: 'El centro de control definitivo para transmisiones públicas en señal abierta y clásicos de VOD. Curado, optimizado y listo para su Fire Stick, Smart TV o dispositivo móvil.',
      ctaPrimary: 'Iniciar Prueba de 24 Horas Gratis',
      ctaSecondary: 'Explorar Lista de Canales',
      footerDesc: 'Plataforma de distribución de red de protocolo de televisión en vivo de próxima generación.'
    }
  };

  const t = content[lang as 'en' | 'es'] || content.en;

  return (
    <div className="min-h-screen bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#0a0a0c] dark:text-[#f4f4f7] flex flex-col justify-between transition-colors duration-200">
      
      {/* SECCIÓN HERO PRINCIPAL */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 flex flex-col items-center justify-center text-center py-16 md:py-32 space-y-8">
        <span className="text-[10px] md:text-xs font-black tracking-widest uppercase bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 px-4 py-1.5 rounded-full shadow-sm">
          {t.heroTag}
        </span>

        <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-none max-w-4xl text-gray-900 dark:text-white">
          {t.heroTitle}
        </h1>

        <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
          {t.heroSubtitle}
        </p>

        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/register" className="glow-btn w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-bold text-white shadow-lg text-center">
            {t.ctaPrimary}
          </Link>
          <Link href="/channels" className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-bold bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-900 dark:text-white border border-black/10 dark:border-white/10 text-center transition">
            {t.ctaSecondary}
          </Link>
        </div>
      </main>

      {/* PIE DE PÁGINA */}
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