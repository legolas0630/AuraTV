'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function FeaturesPage() {
  const { lang } = useApp();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const content = {
    en: {
      heroBadge: 'CINEMATIC BACKEND ARCHITECTURE',
      heroTitle: 'Engineered Without Compromise.',
      heroSubtitle: 'Discover the hyper-optimized network loop powering AuraTV. We dismantled traditional streaming friction to engineer absolute visual stability.',
      ctaMain: 'Secure Instant Premium Access',
      ctaSub: 'Start 24h Free Trial',
      sectionTitle: 'Core Architecture Specifications',
      sectionSubtitle: 'Military-grade distribution nodes built to outperform legacy cable arrays.',
      ctaBoxTitle: 'Ready to Experience True Infinite Streaming?',
      ctaBoxSubtitle: 'Join thousands of global cord-cutters utilizing the AuraTV protocol tool right now.',
      cards: [
        { 
          title: 'Anti-Freeze 6.0 Protocol', 
          desc: 'Our intelligent edge-routing system maps and renders incoming channel fragments 3 seconds before your player requests them, completely eliminating standard buffering.',
          tag: 'STABILITY',
          img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
        },
        { 
          title: 'True 4K HDR Direct Feeds', 
          desc: 'Zero bit-rate modification loops. Experience uncompressed, raw content streams piped directly from our capture infrastructure straight down to your living room.',
          tag: 'VISUALS',
          img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=80'
        },
        { 
          title: 'Realtime EPG Guide Pipes', 
          desc: 'A synchronized electronic program array feeds continuous channel mapping structures directly into any custom IPTV media player app ecosystem.',
          tag: 'INTERFACE',
          img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80'
        },
        { 
          title: '99.9% Uptime SLA Topology', 
          desc: 'Distributed server fallback arrays balance requests globally. If a local signal center experiences a drop, secondary loops instantly take over the pipeline.',
          tag: 'REDUNDANCY',
          img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
        },
        { 
          title: 'Universal Device Credentialing', 
          desc: 'One account string maps cleanly across Fire Sticks, iOS profiles, Android TV environments, and standard smart televisions simultaneously.',
          tag: 'HARDWARE',
          img: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'
        },
        { 
          title: '24/7 DevOps Command Support', 
          desc: 'Dedicated engineering staff continuously monitor line states and refresh playlist definitions on the fly to guarantee stream preservation.',
          tag: 'INFRASTRUCTURE',
          img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
        }
      ]
    },
    es: {
      heroBadge: 'ARQUITECTURA DE TRANSMISIÓN CINEMÁTICA',
      heroTitle: 'Ingeniería Diseñada Sin Concesiones.',
      heroSubtitle: 'Descubra el bucle de red hiperoptimizado de AuraTV. Desmantelamos la fricción de transmisión tradicional para diseñar una estabilidad visual absoluta.',
      ctaMain: 'Asegurar Acceso Premium Instantáneo',
      ctaSub: 'Iniciar Prueba de 24h Gratis',
      sectionTitle: 'Especificaciones Principales del Núcleo',
      sectionSubtitle: 'Nodos de distribución de grado tecnológico construidos para superar las conexiones de cable heredadas.',
      ctaBoxTitle: '¿Listo para Experimentar la Transmisión Infinita?',
      ctaBoxSubtitle: 'Únase a miles de usuarios globales que utilizan el protocolo AuraTV en este momento.',
      cards: [
        { 
          title: 'Protocolo Anti-Congelamiento 6.0', 
          desc: 'Nuestro sistema inteligente de enrutamiento perimetral mapea y procesa los fragmentos de canales 3 segundos antes de que su reproductor los solicite, eliminando los cortes.',
          tag: 'ESTABILIDAD',
          img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
        },
        { 
          title: 'Señales Directas en 4K HDR Real', 
          desc: 'Sin bucles de modificación de tasa de bits. Experimente flujos de contenido puros transmitidos directamente desde nuestra infraestructura de captura hasta su pantalla.',
          tag: 'VISUALES',
          img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=80'
        },
        { 
          title: 'Guías de Programación en Tiempo Real', 
          desc: 'Una matriz de datos sincronizada alimenta de forma continua las estructuras de programación interactiva en cualquier ecosistema de reproducción IPTV.',
          tag: 'INTERFAZ',
          img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80'
        },
        { 
          title: 'Garantía de Actividad del 99.9% SLA', 
          desc: 'Los clústeres de servidores balancean las cargas a nivel global. Si un centro regional experimenta una caída, las rutas secundarias toman el control de forma inmediata.',
          tag: 'REDUNDANCIA',
          img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
        },
        { 
          title: 'Credenciales de Dispositivo Universal', 
          desc: 'Una sola cadena de configuración de cuenta se conecta sin problemas en Fire Sticks, perfiles de iOS, entornos de Android TV y televisores inteligentes.',
          tag: 'HARDWARE',
          img: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'
        },
        { 
          title: 'Soporte DevOps de Comando 24/7', 
          desc: 'Personal técnico de ingeniería monitorea de forma continua los puntos de enlace para garantizar la preservación de cada señal en vivo.',
          tag: 'INFRASTRUCTURE',
          img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
        }
      ]
    }
  };

  const t = content[lang as 'en' | 'es'] || content.en;

  return (
    <div className="bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#060608] dark:text-[#f4f4f7] transition-colors duration-300 overflow-x-hidden">
      
      {/* CINEMATIC HERO HEADER */}
      <section className="relative w-full min-h-[75vh] flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b from-black/5 via-transparent to-transparent dark:from-violet-950/20 dark:via-transparent">
        
        {/* Animated Background Ambient Glow Bloom (Apple Style) */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-gradient-to-r from-violet-600/20 to-blue-600/20 rounded-full filter blur-[120px] pointer-events-none dark:opacity-70"></div>

        <div className="max-w-4xl mx-auto space-y-6 z-10">
          <span className="text-[10px] font-black tracking-widest uppercase bg-violet-600/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 px-4 py-1.5 rounded-full shadow-sm">
            {t.heroBadge}
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-500 bg-clip-text text-transparent">
            {t.heroTitle}
          </h1>
          <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/register" className="glow-btn w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-bold text-white shadow-lg text-center">
              {t.ctaMain}
            </Link>
            <Link href="/pricing" className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-bold bg-white/60 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 text-inherit border border-black/10 dark:border-white/10 transition text-center">
              {t.ctaSub}
            </Link>
          </div>
        </div>
      </section>

      {/* RE-ENGINEERED BENTO GRID SHOWCASE */}
      <section className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight">{t.sectionTitle}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t.sectionSubtitle}</p>
        </div>

        {/* Cinematic Media Grid Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.cards.map((card, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative h-[380px] bg-white dark:bg-[#0c0c10] border border-black/5 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-end p-6 group transition-all duration-300 hover:border-violet-500/40"
            >
              {/* Backing Image Layer with Apple Zoom Overlay Handlers */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={card.img} 
                  alt={card.title}
                  className="w-full h-full object-cover grayscale opacity-25 group-hover:grayscale-0 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 ease-out" 
                />
                {/* Netflix Gradient Shade Bleed Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#f4f4f7] via-[#f4f4f7]/80 to-transparent dark:from-[#0c0c10] dark:via-[#0c0c10]/70"></div>
              </div>

              {/* Dynamic Content Cards Foreground Info */}
              <div className="relative z-10 space-y-3 transform transition-transform duration-300">
                <span className="text-[9px] font-black tracking-widest text-violet-600 dark:text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded-md uppercase block w-fit">
                  {card.tag}
                </span>
                <h3 className="text-lg font-black tracking-tight text-gray-900 dark:text-white group-hover:text-violet-500 dark:group-hover:text-violet-400 transition">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-300 leading-relaxed font-medium">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NETFLIX-STYLE CONVERSION FINALE ZONE */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-32">
        <div className="relative w-full bg-gradient-to-br from-violet-600 to-blue-600 rounded-3xl p-8 md:p-16 text-center text-white space-y-6 shadow-2xl overflow-hidden group">
          
          {/* Decorative Lighting Layer */}
          <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          
          <div className="max-w-2xl mx-auto space-y-4 z-10 relative">
            <h2 className="text-2xl md:text-5xl font-black tracking-tight leading-none">
              {t.ctaBoxTitle}
            </h2>
            <p className="text-xs md:text-sm text-white/80 font-medium">
              {t.ctaBoxSubtitle}
            </p>
            <div className="pt-4">
              <Link href="/register" className="inline-block bg-white text-gray-900 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-200">
                {t.ctaMain}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}