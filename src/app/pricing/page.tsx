'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function PricingPage() {
  const { theme, setTheme, lang, setLang, currency, setCurrency, formatPrice } = useApp();

  // Localized string dictionary for the pricing storefront
  const pricingText = {
    en: {
      title: 'Simple, Transparent Pricing',
      subtitle: 'Unlock instant access to thousands of live international channels and VOD classics.',
      currencyLabel: 'Currency',
      langLabel: 'Language',
      popular: 'Most Popular',
      featuresTitle: 'Every plan includes:',
      ctaTrial: 'Start 24h Free Trial',
      ctaBuy: 'Get Instant Access',
      features: [
        'Over 15,000+ Premium Live TV Channels',
        '4K / Ultra HD / HD Streaming Quality',
        'Anti-Freeze Technology 6.0 Protocol',
        '99.9% Server Uptime Guarantee',
        '24/7 Dedicated Technical Support',
        'Compatible with Fire Stick, iOS, Smart TVs'
      ],
      plans: [
        {
          name: '24-Hour Trial',
          desc: 'Test our entire stream ecosystem with absolutely zero financial commitments.',
          type: 'trial',
          billing: 'One-time access'
        },
        {
          name: 'Monthly Premium',
          desc: 'Full uninterrupted access to the complete global protocol suite.',
          type: 'monthly',
          billing: 'Billed monthly'
        }
      ]
    },
    es: {
      title: 'Precios Simples y Transparentes',
      subtitle: 'Desbloquee acceso instantáneo a miles de canales internacionales en vivo y clásicos de VOD.',
      currencyLabel: 'Moneda',
      langLabel: 'Idioma',
      popular: 'Más Popular',
      featuresTitle: 'Cada plan incluye:',
      ctaTrial: 'Iniciar Prueba de 24h Gratis',
      ctaBuy: 'Obtener Acceso Instantáneo',
      features: [
        'Más de 15,000+ Canales de TV en Vivo Premium',
        'Calidad de Transmisión 4K / Ultra HD / HD',
        'Protocolo de Tecnología Anti-Congelamiento 6.0',
        'Garantía de Tiempo de Actividad del Servidor del 99.9%',
        'Soporte Técnico Dedicado 24/7',
        'Compatible con Fire Stick, iOS, Smart TVs'
      ],
      plans: [
        {
          name: 'Prueba de 24 Horas',
          desc: 'Pruebe todo nuestro ecosistema de transmisión sin ningún compromiso financiero.',
          type: 'trial',
          billing: 'Acceso por única vez'
        },
        {
          name: 'Premium Mensual',
          desc: 'Acceso completo e ininterrumpido a la suite completa del protocolo global.',
          type: 'monthly',
          billing: 'Facturado mensualmente'
        }
      ]
    }
  };

  const currentText = pricingText[lang as 'en' | 'es'];

  return (
    <div className="min-h-screen bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#0a0a0c] dark:text-[#f4f4f7] flex flex-col justify-between transition-colors duration-200">
      
      {/* Top Navbar Menu */}
      <header className="px-6 py-6 border-b border-black/5 dark:border-white/10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link href="/" className="text-xl font-black tracking-wider bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
          AURA<span className="text-gray-900 dark:text-white">TV</span>
        </Link>

        {/* Global Controls Dock */}
        <div className="flex items-center gap-3">
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            className="bg-black/5 dark:bg-white/5 text-xs font-bold rounded-lg px-2 py-1.5 focus:outline-none border border-black/10 dark:border-white/10 text-inherit"
          >
            <option value="en">🇺🇸 EN</option>
            <option value="es">🇲🇽 ES</option>
          </select>

          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-black/5 dark:bg-white/5 text-xs font-bold rounded-lg px-2 py-1.5 focus:outline-none border border-black/10 dark:border-white/10 text-inherit"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="MXN">MXN ($)</option>
          </select>

          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 bg-black/5 dark:bg-white/5 rounded-lg border border-black/10 dark:border-white/10 text-xs cursor-pointer text-inherit"
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      {/* Pricing Header Text Section */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 md:py-20 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">{currentText.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
            {currentText.subtitle}
          </p>
        </div>

        {/* Multi-Currency Price Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {currentText.plans.map((plan: any, idx: number) => {
            const isMonthly = plan.type === 'monthly';
            return (
              <div 
                key={idx}
                className={`relative bg-white dark:bg-white/[0.02] border rounded-3xl p-8 shadow-sm flex flex-col justify-between transition-all duration-200 transform hover:scale-[1.01] ${
                  isMonthly 
                    ? 'border-violet-500 ring-2 ring-violet-500/20' 
                    : 'border-black/5 dark:border-white/5'
                }`}
              >
                {isMonthly && (
                  <span className="absolute -top-3 right-6 bg-violet-600 text-white text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full shadow-md">
                    {currentText.popular}
                  </span>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-extrabold">{plan.name}</h3>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">{plan.desc}</p>
                  </div>

                  {/* Dynamic Computed Rates Hook */}
                  <div className="border-b border-black/5 dark:border-white/5 pb-6">
                    <span className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
                      {formatPrice(plan.type)}
                    </span>
                    <span className="text-gray-400 text-xs font-semibold ml-2">/ {plan.billing}</span>
                  </div>

                  {/* Core Inclusions List */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{currentText.featuresTitle}</p>
                    <ul className="space-y-2.5">
                      {currentText.features.map((feat: string, fIdx: number) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-600 dark:text-gray-300">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Secure Web Form Portal Redirection */}
                <div className="mt-8">
                  <Link 
                    href="/register"
                    className={`block w-full text-center font-bold py-3.5 rounded-xl text-xs transition cursor-pointer shadow-sm ${
                      isMonthly 
                        ? 'bg-violet-600 hover:bg-violet-700 text-white' 
                        : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-900 dark:text-white border border-black/10 dark:border-white/10'
                    }`}
                  >
                    {isMonthly ? currentText.ctaBuy : currentText.ctaTrial}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-black/5 dark:border-white/5 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} AURA TV Protocol. All Rights Reserved. Securing multi-currency localized frameworks.
      </footer>
    </div>
  );
}