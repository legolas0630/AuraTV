'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function FeaturesPage() {
  const { lang } = useApp();

  const content = {
    en: {
      title: 'Engineered for Infinite Streaming',
      subtitle: 'Discover the next-generation backend architecture powering AuraTV’s global distribution loop.',
      cta: 'Secure Your Premium Token',
      cards: [
        { title: 'Anti-Freeze 6.0 Protocol', desc: 'Our edge routing buffer maps channel segments before your media player reads them, eliminating traditional stuttering.', icon: '🛡️' },
        { title: 'True 4K HDR Infrastructure', desc: 'Raw, uncompressed high bit-rate streams map directly from host capture nodes right down to your screen.', icon: '💎' },
        { title: 'Electronic Guide (EPG)', desc: 'Realtime data pipes feed complete interactive channel mapping structures instantly into all compatible IPTV hardware interfaces.', icon: '📅' },
        { title: '99.9% Uptime SLA Guarantee', desc: 'Distributed fallback clusters auto-balance load requests instantly across fallback server architectures.', icon: '⚡' },
        { title: 'Universal Account Syncing', desc: 'A single credentials configuration string links flawlessly across Fire Stick, iOS, Android, and Smart TV operating systems.', icon: '🔗' },
        { title: '24/7 Priority DevOps Support', desc: 'Dedicated engineering staff continuously monitor live server endpoints to ensure instant line updates.', icon: '👨‍💻' }
      ]
    },
    es: {
      title: 'Ingeniería para Transmisión Infinita',
      subtitle: 'Descubra la arquitectura backend de próxima generación que impulsa el bucle de distribución de AuraTV.',
      cta: 'Asegurar su Token Premium',
      cards: [
        { title: 'Protocolo Anti-Congelamiento 6.0', desc: 'Nuestro búfer de enrutamiento mapea segmentos de canales antes de que su reproductor los lea, eliminando cortes tradicionales.', icon: '🛡️' },
        { title: 'Infraestructura Real 4K HDR', desc: 'Flujos de datos crudos sin compresión se transmiten directamente desde los nodos de captura hasta su pantalla.', icon: '💎' },
        { title: 'Guía de Programación (EPG)', desc: 'Canales de datos en tiempo real alimentan estructuras de mapeo interactivo directamente en cualquier interfaz de hardware IPTV.', icon: '📅' },
        { title: 'Garantía del 99.9% de Actividad', desc: 'Los clústeres distribuidos equilibran las solicitudes de carga de forma instantánea entre arquitecturas de servidores redundantes.', icon: '⚡' },
        { title: 'Sincronización Universal', desc: 'Una única cadena de configuración de credenciales se conecta sin fallas en los sistemas operativos Fire Stick, iOS, Android y Smart TV.', icon: '🔗' },
        { title: 'Soporte DevOps Prioritario 24/7', desc: 'Personal técnico monitorea continuamente los puntos de enlace del servidor en vivo para garantizar actualizaciones instantáneas.', icon: '👨‍💻' }
      ]
    }
  };

  const t = content[lang as 'en' | 'es'] || content.en;

  return (
    <div className="w-full">
      <main className="max-w-6xl mx-auto w-full px-6 py-12 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">{t.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{t.subtitle}</p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.cards.map((card, idx) => (
            <div key={idx} className="bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 p-8 rounded-3xl space-y-4 shadow-sm flex flex-col justify-start">
              <span className="text-3xl block w-fit p-3 bg-black/5 dark:bg-white/5 rounded-2xl">{card.icon}</span>
              <div className="space-y-1.5">
                <h3 className="text-sm font-black tracking-tight">{card.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/pricing" className="glow-btn px-8 py-4 rounded-xl text-xs font-bold text-white shadow-lg inline-block">
            {t.cta}
          </Link>
        </div>
      </main>
    </div>
  );
}