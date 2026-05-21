'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// 1. Setup Translation Dictionaries
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

// 2. Setup Currency Exchange Format Defaults
const currencySymbols = { USD: '$', EUR: '€', GBP: '£', MXN: '$' };
const basePrices = { trial: 0, monthly: 9.99 };
const currencyRates = { USD: 1, EUR: 0.92, GBP: 0.78, MXN: 17.5 };

const AppContext = createContext<any>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('en');
  const [currency, setCurrency] = useState('USD');

  // Sync Tailwind class list on theme switch
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const t = (key: string) => translations[lang as 'en' | 'es'][key as keyof typeof translations['en']] || key;

  const formatPrice = (type: 'trial' | 'monthly') => {
    const computedPrice = (basePrices[type] * currencyRates[currency as 'USD']).toFixed(2);
    return `${currencySymbols[currency as 'USD' | 'EUR' | 'GBP' | 'MXN']}${computedPrice} ${currency}`;
  };

  return (
    <AppContext.Provider value={{ theme, setTheme, lang, setLang, currency, setCurrency, t, formatPrice }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);