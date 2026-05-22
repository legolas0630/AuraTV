'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function HomePage() {
  const { lang } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: 'NEXT-GENERATION TV PROTOCOL',
      title: 'The Future of Global Streaming.',
      desc: 'Ditch legacy cable restrictions. AuraTV implements direct edge-routing distribution lines to map native unencrypted high-bitrate broadcasts straight down to any device interface.',
    },
    {
      badge: 'BORDERLESS BROADCAST ARRAYS',
      title: 'Watch Your Favorite Content Anywhere in the World.',
      desc: 'Our network loop completely bypasses geographic restrictions. Whether traveling abroad or streaming from your living room, your media synchronization token flows smoothly without friction.',
    },
    {
      badge: 'ANTI-FREEZE 6.0 ARCHITECTURE',
      title: 'Zero Buffering. Zero Friction. Pure Visual Fluidity.',
      desc: 'Engineered for absolute visual stability. Our custom backend buffer pre-renders channel fragments 3 seconds ahead of requests, eliminating standard drops and pixelations entirely.',
    }
  ];

  // Automatic slide loop advancing every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#060608] dark:text-[#f4f4f7] min-h-[88vh] flex flex-col justify-center items-center transition-colors duration-300 relative px-6 overflow-hidden">
      
      {/* Background Glow Ring */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-violet-600/15 to-blue-600/15 rounded-full filter blur-[130px] pointer-events-none"></div>

      {/* DYNAMIC CAROUSEL SECTION CONTAINER */}
      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10 py-12">
        
        {slides.map((slide, idx) => {
          if (idx !== currentSlide) return null;
          return (
            <div key={idx} className="space-y-6 transition-all duration-700 ease-out animate-fadeIn">
              
              <span className="inline-block text-[10px] font-black tracking-widest uppercase bg-violet-600/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 px-4 py-1.5 rounded-full shadow-xs">
                {slide.badge}
              </span>

              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-500 bg-clip-text text-transparent max-w-4xl mx-auto px-2">
                {slide.title}
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
                {slide.desc}
              </p>

            </div>
          );
        })}

        {/* ACTION LINKS ROW */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/register" className="glow-btn w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-black text-white shadow-xl text-center uppercase tracking-wider">
            {lang === 'es' ? 'Comenzar Prueba Gratis' : 'Start Free Trial Access'}
          </Link>
          <Link href="/pricing" className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-black bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 text-inherit transition text-center uppercase tracking-wider">
            {lang === 'es' ? 'Ver Planes' : 'Explore Packages'}
          </Link>
        </div>

        {/* PAGINATION DOTS SLIDER NAVIGATION */}
        <div className="flex items-center justify-center gap-2.5 pt-6">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide ? 'w-8 bg-violet-600' : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}