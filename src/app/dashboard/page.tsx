'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
  const [isDemo, setIsDemo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium'>('premium');

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsDemo(true); // Fallback to Guest View rather than routing away
        setLoading(false);
        return;
      }
      setUser(session.user);
      setIsDemo(false);
      setLoading(false);
    }
    getSession();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const handleDashboardCheckout = async () => {
    if (isDemo) {
      router.push('/register');
      return;
    }
    setProcessingPayment(true);
    try {
      const res = await fetch('/api/checkout/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          priceType: selectedPlan,
          streamToken: user?.user_metadata?.stream_token || 'ST_PREVIEW'
        })
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f4f7] dark:bg-[#060608] flex items-center justify-center text-xs font-black tracking-widest animate-pulse">
        SYNCING MATRIX LAYOUT...
      </div>
    );
  }

  const isPremiumActive = !isDemo && user?.user_metadata?.subscription_status === 'Premium Active';
  const streamToken = isDemo ? 'ST_PREVIEW_MOCK_DATA_HIDDEN' : (user?.user_metadata?.stream_token || 'PENDING');

  return (
    <div className="min-h-screen bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#060608] dark:text-[#f4f4f7] p-6 transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-8 py-4">
        
        {/* BANNER FOR UNREGISTERED USERS */}
        {isDemo && (
          <div className="bg-gradient-to-r from-violet-600 to-blue-600 p-4 rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg text-center sm:text-left">
            <div>
              <h4 className="text-sm font-black tracking-tight">{lang === 'es' ? 'Visualización de Invitado / Modo Demo' : 'Guest Preview Mode Active'}</h4>
              <p className="text-[10px] text-white/80 font-medium mt-0.5">{lang === 'es' ? 'Explore el panel. Regístrese gratis para inicializar su terminal de transmisión.' : 'Review your control setup interface. Register your profile to deploy live tokens.'}</p>
            </div>
            <Link href="/register" className="bg-white text-gray-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-md hover:bg-gray-100 block transition shrink-0 self-center">
              {lang === 'es' ? 'Crear Cuenta Gratis' : 'Sign Up Free'}
            </Link>
          </div>
        )}

        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 dark:border-white/5 pb-6">
          <div>
            <h1 className="text-xl font-black tracking-tight">{lang === 'es' ? 'Consola de Comando AuraTV' : 'AuraTV Workspace Console'}</h1>
            <p className="text-xs text-gray-400 mt-1 font-medium">
              {lang === 'es' ? 'Perfil asignado:' : 'Active configuration identity:'}{' '}
              <span className="text-violet-500 font-bold">{isDemo ? 'guest_visitor@node.matrix' : user?.email}</span>
            </p>
          </div>
          {!isDemo && (
            <button onClick={handleSignOut} className="text-[10px] font-black uppercase bg-red-500/10 text-red-600 dark:text-red-400 px-4 py-2 border border-red-500/20 rounded-xl cursor-pointer">
              {lang === 'es' ? 'Cerrar Sesión' : 'Sign Out'}
            </button>
          )}
        </header>

        {!isPremiumActive ? (
          <section className="bg-white dark:bg-[#0c0c10] border border-black/10 dark:border-white/5 rounded-3xl p-6 md:p-10 shadow-xl space-y-8">
            
            <div className="space-y-2 text-center max-w-xl mx-auto">
              <span className="text-[10px] font-black bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-3 py-1 rounded-md uppercase">
                {lang === 'es' ? 'Suscripción Inactiva' : 'Line Status: Offline'}
              </span>
              <h2 className="text-xl md:text-3xl font-black tracking-tight">
                {lang === 'es' ? 'Seleccione su Nivel de Cobertura' : 'Activate Broadcast Gateway Network'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <button
                type="button" onClick={() => setSelectedPlan('basic')}
                className={`p-5 rounded-2xl text-left border transition cursor-pointer ${selectedPlan === 'basic' ? 'border-violet-500 bg-violet-500/10' : 'border-black/5 dark:border-white/5 bg-black/[0.01]'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black">🌟 Basic Stream Tier</span>
                  <span className="text-xs font-mono font-bold text-violet-500">{formatPrice('basic')}</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">
                  {lang === 'es' ? 'Acceso a 5,000+ canales en calidad HD estándar.' : 'Access to 5,000+ live regional channels in standard crisp HD.'}
                </p>
              </button>

              <button
                type="button" onClick={() => setSelectedPlan('premium')}
                className={`p-5 rounded-2xl text-left border transition cursor-pointer ${selectedPlan === 'premium' ? 'border-violet-500 bg-violet-500/10' : 'border-black/5 dark:border-white/5 bg-black/[0.01]'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black">👑 Premium Ultra Suite</span>
                  <span className="text-xs font-mono font-bold text-violet-500">{formatPrice('premium')}</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">
                  {lang === 'es' ? '15,000+ canales, 4K Ultra HD y protección Anti-Freeze 6.0.' : 'Complete 15,000+ directory, 4K UHD playback loops, and Anti-Freeze protection.'}
                </p>
              </button>
            </div>

            <div className="max-w-xs mx-auto pt-2">
              <button
                type="button" onClick={handleDashboardCheckout} disabled={processingPayment}
                className="glow-btn w-full text-center text-xs font-black py-4 rounded-xl text-white shadow-xl cursor-pointer"
              >
                {isDemo ? (lang === 'es' ? 'Registrarse Para Comprar' : 'Sign Up To Activate') : (processingPayment ? 'CONNECTING...' : 'Complete Secure Activation')}
              </button>
            </div>

            {/* MOCK PREVIEW WORKSPACE PANEL CONTAINER */}
            <div className="border-t border-black/5 dark:border-white/5 pt-8 opacity-40 select-none pointer-events-none filter blur-[2px] space-y-4">
              <div className="h-4 w-1/4 bg-gray-400 rounded"></div>
              <div className="h-12 bg-gray-300 dark:bg-gray-800 rounded-xl"></div>
              <div className="h-24 bg-gray-300 dark:bg-gray-800 rounded-xl"></div>
            </div>

          </section>
        ) : (
          <section className="space-y-6 animate-fadeIn">
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">LINE OPERATIONAL: Connection mapped via active webhook token rules.</p>
            </div>
            <div className="bg-white dark:bg-[#0c0c10] border p-6 rounded-3xl space-y-2">
              <h3 className="text-xs font-black text-gray-400 uppercase">M3U Connection Gateway Link</h3>
              <div className="font-mono text-xs text-violet-500 font-bold break-all">https://auratv.vercel.app/api/streams/download?token={streamToken}</div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}