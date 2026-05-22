'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    priceNotice: 'Billing Term: Cancel anytime securely from your control profile.',
  },
  es: {
    priceNotice: 'Término de facturación: Cancele en cualquier momento desde su perfil.',
  }
};

const currencySymbols = { USD: '$', EUR: '€', GBP: '£', MXN: '$' };
// Micro-adjusted to matching industry standard high-conversion fractions
const basePrices = { basic: 4.99, premium: 14.99 };
const currencyRates = { USD: 1, EUR: 0.92, GBP: 0.78, MXN: 17.5 };

const AppContext = createContext<any>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('auratv-theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = window.document.documentElement;
    localStorage.setItem('auratv-theme', theme);
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [theme, mounted]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const formatPrice = (type: 'basic' | 'premium') => {
    const computedPrice = (basePrices[type] * currencyRates[currency as 'USD']).toFixed(2);
    return `${currencySymbols[currency as 'USD' | 'EUR' | 'GBP' | 'MXN']}${computedPrice} ${currency}`;
  };

  return (
    <AppContext.Provider value={{ theme, setTheme, lang, setLang, currency, setCurrency, formatPrice, toggleTheme }}>
      <div className={theme}>
        {children}

        {/* UNIFIED FLOATING APPLE GLASSMORPHISM CONTROL DOCK */}
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-1.5 p-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/25 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.35)] text-[#0a0a0c] dark:text-[#f4f4f7]">
          
          <div className="relative flex items-center justify-center pl-2 rounded-full hover:bg-white/10 dark:hover:bg-white/5 transition-colors">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="appearance-none bg-transparent text-xs font-black py-1.5 pl-1.5 pr-5 focus:outline-none cursor-pointer text-inherit transition"
            >
              <option value="en" className="bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#0a0a0c] dark:text-[#f4f4f7] font-semibold">EN</option>
              <option value="es" className="bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#0a0a0c] dark:text-[#f4f4f7] font-semibold">ES</option>
            </select>
            <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[8px] pointer-events-none opacity-50">▼</span>
          </div>

          <div className="w-[1px] h-3.5 bg-black/10 dark:bg-white/10 mx-0.5" />

          <div className="relative flex items-center justify-center rounded-full hover:bg-white/10 dark:hover:bg-white/5 transition-colors">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="appearance-none bg-transparent text-xs font-black py-1.5 pl-3 pr-5 focus:outline-none cursor-pointer text-inherit transition"
            >
              <option value="USD" className="bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#0a0a0c] dark:text-[#f4f4f7] font-semibold">USD</option>
              <option value="EUR" className="bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#0a0a0c] dark:text-[#f4f4f7] font-semibold">EUR</option>
              <option value="GBP" className="bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#0a0a0c] dark:text-[#f4f4f7] font-semibold">GBP</option>
              <option value="MXN" className="bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#0a0a0c] dark:text-[#f4f4f7] font-semibold">MXN</option>
            </select>
            <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[8px] pointer-events-none opacity-50">▼</span>
          </div>

          <div className="w-[1px] h-3.5 bg-black/10 dark:bg-white/10 mx-0.5" />

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/15 dark:hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center group"
          >
            {theme === 'dark' ? (
              <svg className="w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <circle cx="12" cy="12" r="5" fill="currentColor" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42m12.72-12.72l1.42-1.42" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-indigo-950" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>

      </div>
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);