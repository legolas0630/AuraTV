'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { useApp } from '@/context/AppContext';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardPage() {
  const { lang, formatPrice } = useApp();
  const router = useRouter();
  
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'trial' | 'monthly'>('monthly');

  useEffect(() => {
    async function getSession() {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        router.push('/login');
        return;
      }
      setUser(session.user);
      setLoading(false);
    }
    getSession();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleDashboardCheckout = async () => {
    setProcessingPayment(true);
    try {
      const res = await fetch('/api/checkout/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          priceType: selectedPlan,
          streamToken: user.user_metadata?.stream_token || 'ST_' + Math.random().toString(36).substr(2, 9)
        })
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(lang === 'es' ? 'Error al redireccionar a la pasarela.' : 'Redirection failure to payment gateway.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f4f7] dark:bg-[#060608] flex items-center justify-center text-xs font-bold tracking-widest animate-pulse">
        LOADING SIGNAL MATRIX...
      </div>
    );
  }

  const isPremiumActive = user?.user_metadata?.subscription_status === 'Premium Active';
  const streamToken = user?.user_metadata?.stream_token || 'Not Generated';

  return (
    <div className="min-h-screen bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#060608] dark:text-[#f4f4f7] transition-colors duration-200 p-6">
      <div className="max-w-4xl mx-auto space-y-8 py-8">
        
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 dark:border-white/5 pb-6">
          <div>
            <h1 className="text-xl font-black tracking-tight">
              {lang === 'es' ? 'Panel de Control AuraTV' : 'AuraTV Command Console'}
            </h1>
            <p className="text-xs text-gray-400 mt-1 font-medium">
              {lang === 'es' ? 'Sesión activa:' : 'Active session profile:'} <span className="text-violet-500 font-bold">{user?.email}</span>
            </p>
          </div>
          
          <button 
            onClick={handleSignOut}
            className="text-[10px] font-black uppercase tracking-widest bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 px-4 py-2 border border-red-500/20 rounded-xl transition cursor-pointer self-start sm:self-center"
          >
            {lang === 'es' ? 'Cerrar Sesión' : 'Sign Out'}
          </button>
        </header>

        {!isPremiumActive ? (
          <section className="bg-white dark:bg-[#0c0c10] border border-black/10 dark:border-white/5 rounded-3xl p-6 md:p-10 shadow-xl space-y-8 animate-fadeIn">
            
            <div className="space-y-2 text-center max-w-xl mx-auto">
              <span className="text-[10px] font-black tracking-widest uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-3 py-1 rounded-md animate-pulse">
                {lang === 'es' ? 'Activación Requerida' : 'Activation Required'}
              </span>
              <h2 className="text-xl md:text-3xl font-black tracking-tight">
                {lang === 'es' ? 'Su línea de transmisión está inactiva' : 'Your streaming line is currently inactive'}
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed font-medium">
                {lang === 'es' 
                  ? 'Su cuenta se ha creado con éxito. Para activar sus credenciales multimedia globales y generar su enlace M3U personalizado, elija una opción a continuación.' 
                  : 'Your core account was successfully registered. To activate your global multimedia credentials and deploy your unique M3U mapping link, choose a connection tier below.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <button
                type="button"
                onClick={() => setSelectedPlan('trial')}
                className={`p-5 rounded-2xl text-left border transition cursor-pointer ${
                  selectedPlan === 'trial' ? 'border-violet-500 bg-violet-500/10' : 'border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.005]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black">{lang === 'es' ? 'Prueba de 24 Horas' : '24-Hour Trial'}</span>
                  <span className="text-xs font-mono font-bold text-violet-500">{formatPrice('trial')}</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">
                  {lang === 'es' ? 'Acceso de prueba completo instantáneo.' : 'Full system environment layout access.'}
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPlan('monthly')}
                className={`p-5 rounded-2xl text-left border transition cursor-pointer ${
                  selectedPlan === 'monthly' ? 'border-violet-500 bg-violet-500/10' : 'border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.005]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black">{lang === 'es' ? 'Membresía Mensual' : 'Monthly Membership'}</span>
                  <span className="text-xs font-mono font-bold text-violet-500">{formatPrice('monthly')}</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">
                  {lang === 'es' ? 'Acceso continuo sin interrupciones.' : 'Continuous streaming connection.'}
                </p>
              </button>
            </div>

            <div className="max-w-xs mx-auto pt-2">
              <button
                type="button"
                disabled={processingPayment}
                onClick={handleDashboardCheckout}
                className="glow-btn w-full text-center text-xs font-black py-4 rounded-xl text-white shadow-xl cursor-pointer disabled:opacity-50 transition"
              >
                {processingPayment 
                  ? (lang === 'es' ? 'PROCESANDO CONEXIÓN SEGURA...' : 'CONNECTING SECURE ENDPOINT...') 
                  : (lang === 'es' ? 'Completar Activación Segura' : 'Complete Secure Activation')}
              </button>
            </div>

          </section>
        ) : (
          
          <section className="space-y-6 animate-fadeIn">
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {lang === 'es' ? 'LÍNEA ACTIVADA: Protocolo Premium AuraTV en funcionamiento.' : 'LINE ACTIVATED: AuraTV Premium protocol stream loop operational.'}
              </p>
            </div>

            <div className="bg-white dark:bg-[#0c0c10] border border-black/5 dark:border-white/5 p-6 rounded-3xl space-y-4 shadow-sm">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-gray-400">{lang === 'es' ? 'Su URL de Lista M3U Personalizada' : 'Your Custom M3U Playlist Link'}</h3>
                <p className="text-xs text-gray-500 mt-1">{lang === 'es' ? 'Copie este enlace e ingréselo directamente en su reproductor IPTV.' : 'Copy this playlist path string directly into your IPTV software application interface.'}</p>
              </div>
              <div className="bg-black/5 dark:bg-black/40 border border-black/10 dark:border-white/5 p-3.5 rounded-xl flex items-center justify-between gap-4 font-mono text-xs select-all overflow-x-auto text-violet-600 dark:text-violet-400 font-bold">
                <span>https://auratv.vercel.app/api/streams/download?token={streamToken}</span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`https://auratv.vercel.app/api/streams/download?token=${streamToken}`);
                    alert(lang === 'es' ? '¡Copiado al portapapeles!' : 'Copied link parameters to clipboard!');
                  }}
                  className="bg-white dark:bg-white/5 text-gray-900 dark:text-white px-2.5 py-1 rounded-md text-[10px] font-sans font-black border border-black/10 dark:border-white/10 uppercase cursor-pointer tracking-wider hover:bg-black/5"
                >
                  {lang === 'es' ? 'Copiar' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0c0c10] border border-black/5 dark:border-white/5 p-6 rounded-3xl space-y-4 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-400">{lang === 'es' ? 'Alternativa: Credenciales Xtream Codes' : 'Alternative: Xtream Codes API Protocol'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-black/5 dark:bg-black/20 p-3.5 rounded-xl border border-black/5 dark:border-white/5">
                  <span className="block text-[10px] uppercase font-bold text-gray-400">{lang === 'es' ? 'Servidor Host' : 'Host URL'}</span>
                  <span className="text-xs font-mono font-bold block mt-1 truncate">https://auratv.vercel.app:8080</span>
                </div>
                <div className="bg-black/5 dark:bg-black/20 p-3.5 rounded-xl border border-black/5 dark:border-white/5">
                  <span className="block text-[10px] uppercase font-bold text-gray-400">{lang === 'es' ? 'Usuario' : 'Username'}</span>
                  <span className="text-xs font-mono font-bold block mt-1 truncate">{user?.email?.split('@')[0]}</span>
                </div>
                <div className="bg-black/5 dark:bg-black/20 p-3.5 rounded-xl border border-black/5 dark:border-white/5">
                  <span className="block text-[10px] uppercase font-bold text-gray-400">{lang === 'es' ? 'Token / Contraseña' : 'Token Password'}</span>
                  <span className="text-xs font-mono font-bold block mt-1 text-violet-500 truncate">{streamToken.substring(0, 8)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-[#0c0c10] border border-black/5 dark:border-white/5 p-5 rounded-2xl space-y-1">
                <span className="text-xl block">🔥</span>
                <h4 className="text-xs font-black">{lang === 'es' ? 'Guía Fire Stick / Android' : 'Fire Stick Setup Guide'}</h4>
                <p className="text-[10px] text-gray-400 leading-normal">{lang === 'es' ? 'Configure a través de la aplicación Downloader e IPTV Smarters.' : 'Install via custom side-loading using stable IPTV Smarters terminal inputs.'}</p>
              </div>
              <div className="bg-white dark:bg-[#0c0c10] border border-black/5 dark:border-white/5 p-5 rounded-2xl space-y-1">
                <span className="text-xl block">🍏</span>
                <h4 className="text-xs font-black">{lang === 'es' ? 'Guía Apple TV / iOS' : 'Apple TV & iOS Setup'}</h4>
                <p className="text-[10px] text-gray-400 leading-normal">{lang === 'es' ? 'Utilice Snappy IPTV o GSE Player ingresando la URL M3U.' : 'Map connection fields directly into native Snappy IPTV stream buffers.'}</p>
              </div>
              <div className="bg-white dark:bg-[#0c0c10] border border-black/5 dark:border-white/5 p-5 rounded-2xl space-y-1">
                <span className="text-xl block">📺</span>
                <h4 className="text-xs font-black">{lang === 'es' ? 'Guía Smart TV' : 'Smart TV Sync Protocol'}</h4>
                <p className="text-[10px] text-gray-400 leading-normal">{lang === 'es' ? 'Cargue su lista utilizando la aplicación ibo Player o SET IPTV.' : 'Sync playlist index variables directly using custom remote portal uploads.'}</p>
              </div>
            </div>

          </section>
        )}

      </div>
    </div>
  );
}