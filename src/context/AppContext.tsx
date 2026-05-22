'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    welcome: 'Welcome Back',
    dashboardTitle: 'Streaming Account Credentials',
    loggedAs: 'Logged in as',
    m3uTitle: 'Your Personalized M3U Playlist URL',
    m3uDesc: 'Copy this complete address configuration string and paste it directly into your preferred IPTV application player.',
    copyBtn: 'Copy URL',
    copiedAlert: 'M3U string copied to clipboard!',
    xtreamTitle: 'Alternative: Xtream Codes Connection',
    host: 'Host Server URL',
    user: 'Account Username',
    pass: 'Server API Token Password',
    tutorials: 'Setup Tutorials',
    lineStatus: 'My Line Status',
    billing: 'Billing History',
    signOut: 'Sign Out of Control Dashboard',
    trialActive: 'Trial Active',
    firestick: 'Fire Stick / Android TV',
    apple: 'Apple TV / iOS',
    smartTv: 'Smart TV (Samsung/LG)',
    priceNotice: 'Trial Term: You are authorizing a 0.00 authentication charge today.',
  },
  es: {
    welcome: 'Bienvenido de nuevo',
    dashboardTitle: 'Credenciales de Transmisión de la Cuenta',
    loggedAs: 'Sesión iniciada como',
    m3uTitle: 'Su URL de Lista de Reproducción M3U Personalizada',
    m3uDesc: 'Copie esta cadena de configuración de dirección completa y péguela directamente en su reproductor de aplicaciones IPTV preferido.',
    copyBtn: 'Copiar URL',
    copiedAlert: '¡Enlace M3U copiado al portapapeles!',
    xtreamTitle: 'Alternativa: Conexión Xtream Codes',
    host: 'URL del Servidor Host',
    user: 'Usuario de la Cuenta',
    pass: 'Contraseña de Token API de Servidor',
    tutorials: 'Tutoriales de Instalación',
    lineStatus: 'Estado de mi Línea',
    billing: 'Historial de Facturación',
    signOut: 'Cerrar Sesión del Panel de Control',
    trialActive: 'Prueba Activa',
    firestick: 'Fire Stick / Android TV',
    apple: 'Apple TV / iOS',
    smartTv: 'Smart TV (Samsung/LG)',
    priceNotice: 'Término de la prueba: Hoy está autorizando un cargo de autenticación de 0.00.',
  }
};

const currencySymbols = { USD: '$', EUR: '€', GBP: '£', MXN: '$' };
const basePrices = { trial: 0, monthly: 9.99 };
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
  const t = (key: string) => translations[lang as 'en' | 'es'][key as keyof typeof translations['en']] || key;

  const formatPrice = (type: 'trial' | 'monthly') => {
    const computedPrice = (basePrices[type] * currencyRates[currency as 'USD']).toFixed(2);
    return `${currencySymbols[currency as 'USD' | 'EUR' | 'GBP' | 'MXN']}${computedPrice} ${currency}`;
  };

  return (
    <AppContext.Provider value={{ theme, setTheme, lang, setLang, currency, setCurrency, t, formatPrice }}>
      {/* This wrapper div forces Tailwind to recognize the theme class locally 
        bypassing any missing configuration fields on the host system!
      */}
      <div className={theme}>
        {children}

        {/* FLOATING APPLE GLASSMORPHISM THEME TOGGLE CONTROLLER */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] hover:scale-110 active:scale-95 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 cursor-pointer group flex items-center justify-center"
        >
          {theme === 'dark' ? (
            // Elegant Minimalist Sun Vector Icon
            <svg className="w-5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] transition-transform duration-500 group-hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="5" fill="currentColor" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42m12.72-12.72l1.42-1.42" />
            </svg>
          ) : (
            // Elegant Minimalist Crescent Moon Vector Icon
            <svg className="w-5 h-5 text-indigo-900 transition-transform duration-500 group-hover:-rotate-12" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);