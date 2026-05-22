'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function PricingPage() {
  const { lang, formatPrice } = useApp();

  const pricingText = {
    en: {
      title: 'Simple, Transparent Pricing',
      subtitle: 'Unlock instant access to thousands of live international channels and VOD classics.',
      popular: 'Most Popular',
      featuresTitle: 'Core network features:',
      ctaBuy: 'Get Instant Access',
      plans: [
        { 
          name: 'Basic Stream Membership', 
          desc: 'Essential streaming arrays covering regional feeds in clear high definition quality.', 
          type: 'basic', 
          billing: 'Billed monthly',
          features: ['Over 5,000+ Live Channels', 'HD / 1080p Stream Feeds', 'Standard Loading Buffers', 'Single Device Connection', '24/7 Server Access']
        },
        { 
          name: 'Premium Ultra Suite', 
          desc: 'Uncompromised performance tier including 4K feeds and our complete global catalog loop.', 
          type: 'premium', 
          billing: 'Billed monthly',
          features: ['Over 15,000+ Global Channels', '4K Ultra HD Streaming Profiles', 'Anti-Freeze 6.0 Optimization', 'Multi-device Concurrent Syncing', 'Priority DevOps Queue Support']
        }
      ]
    },
    es: {
      title: 'Precios Simples y Transparentes',
      subtitle: 'Desbloquee acceso instantáneo a miles de canales internacionales en vivo y clásicos de VOD.',
      popular: 'Más Popular',
      featuresTitle: 'Características de red:',
      ctaBuy: 'Obtener Acceso Instantáneo',
      plans: [
        { 
          name: 'Membresía Stream Básica', 
          desc: 'Señales esenciales que cubren transmisiones regionales en alta definición nítida.', 
          type: 'basic', 
          billing: 'Facturado mensualmente',
          features: ['Más de 5,000 Canales en Vivo', 'Transmisiones en HD / 1080p', 'Búfer de Carga Estándar', 'Conexión para Un Dispositivo', 'Acceso al Servidor 24/7']
        },
        { 
          name: 'Suite Premium Ultra', 
          desc: 'El nivel de máximo rendimiento que incluye señales 4K y todo el catálogo global.', 
          type: 'premium', 
          billing: 'Facturado mensualmente',
          features: ['Más de 15,000 Canales Globales', 'Perfiles de Transmisión 4K Ultra HD', 'Optimización Anti-Freeze 6.0', 'Sincronización de Múltiples Dispositivos', 'Soporte DevOps de Cola Prioritaria']
        }
      ]
    }
  };

  const currentText = pricingText[lang as 'en' | 'es'] || pricingText.en;

  return (
    <div className="w-full bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#060608] dark:text-[#f4f4f7] min-h-screen transition-colors duration-300">
      <main className="max-w-6xl mx-auto w-full px-6 py-12 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">{currentText.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm font-medium">{currentText.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {currentText.plans.map((plan: any, idx: number) => {
            const isPremium = plan.type === 'premium';
            return (
              <div 
                key={idx}
                className={`relative bg-white dark:bg-[#0c0c10] border rounded-3xl p-8 shadow-sm flex flex-col justify-between transition-all duration-200 transform hover:scale-[1.01] ${
                  isPremium ? 'border-violet-500 ring-4 ring-violet-500/10' : 'border-black/5 dark:border-white/5'
                }`}
              >
                {isPremium && (
                  <span className="absolute -top-3 right-6 bg-violet-600 text-white text-[9px] uppercase font-black tracking-widest px-3 py-1 rounded-full shadow-md">
                    {currentText.popular}
                  </span>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black tracking-tight">{plan.name}</h3>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed font-medium">{plan.desc}</p>
                  </div>

                  <div className="border-b border-black/5 dark:border-white/5 pb-6">
                    <span className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">{formatPrice(plan.type)}</span>
                    <span className="text-gray-400 text-[10px] font-black uppercase ml-2 tracking-wider">/ {plan.billing}</span>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">{currentText.featuresTitle}</p>
                    <ul className="space-y-2.5">
                      {plan.features.map((feat: string, fIdx: number) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-600 dark:text-gray-300 font-medium">
                          <span className="text-violet-500 font-bold">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <Link 
                    href="/register"
                    className={`block w-full text-center font-black py-4 rounded-xl text-xs uppercase tracking-widest transition cursor-pointer shadow-sm ${
                      isPremium 
                        ? 'bg-violet-600 hover:bg-violet-700 text-white' 
                        : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-900 dark:text-white border border-black/10 dark:border-white/10'
                    }`}
                  >
                    {currentText.ctaBuy}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}