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
  const [activeTab, setActiveTab] = useState<'line' | 'setup' | 'ledger' | 'security'>('line');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium'>('premium');

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsDemo(true);
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
    window.location.href = '/login';
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
        SYNCING CONTROL MATRIX...
      </div>
    );
  }

  const isPremiumActive = !isDemo && user?.user_metadata?.subscription_status === 'Premium Active';
  const streamToken = isDemo ? 'ST_PREVIEW_MOCK_DATA' : (user?.user_metadata?.stream_token || 'PENDING_INITIALIZATION');

  return (
    <div className="min-h-screen bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#060608] dark:text-[#f4f4f7] p-4 md:p-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* GUEST MODE ALIGNMENT NOTIFICATION ACCENT */}
        {isDemo && (
          <div className="bg-gradient-to-r from-violet-600 to-blue-600 p-4 rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
            <div>
              <h4 className="text-sm font-black tracking-tight">{lang === 'es' ? 'Modo de Demostración Activo' : 'Guest Simulator View Active'}</h4>
              <p className="text-[10px] text-white/80 font-medium mt-0.5">{lang === 'es' ? 'Este es un reflejo interactivo de la consola premium. Regístrese gratis para activar funciones reales.' : 'This dashboard serves as an interactive mockup simulation. Create an account to claim real streaming nodes.'}</p>
            </div>
            <Link href="/register" className="bg-white text-gray-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-gray-100 transition shrink-0 self-center">
              {lang === 'es' ? 'Crear Cuenta Gratis' : 'Register Free'}
            </Link>
          </div>
        )}

        {/* TOP META ROW */}
        <div className="bg-white dark:bg-[#0c0c10] border border-black/5 dark:border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div>
            <h1 className="text-lg font-black tracking-tight">{lang === 'es' ? 'Consola Workspace de AuraTV' : 'AuraTV System Command Workspace'}</h1>
            <p className="text-xs text-gray-400 mt-0.5 font-medium">
              {lang === 'es' ? 'Identidad de conexión:' : 'Secure route fingerprint:'}{' '}
              <span className="text-violet-500 font-bold font-mono">{isDemo ? 'guest_terminal@aura.protocol' : user?.email}</span>
            </p>
          </div>
          {!isDemo && (
            <button onClick={handleSignOut} className="text-[10px] font-black uppercase bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 px-4 py-2 border border-red-500/20 rounded-xl transition cursor-pointer">
              {lang === 'es' ? 'Cerrar Sesión' : 'Sign Out'}
            </button>
          )}
        </div>

        {/* WORKSPACE LAYOUT GRID CONTROLLER */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          
          {/* SIDEBAR NAVIGATION CONTROL MENU */}
          <nav className="bg-white dark:bg-[#0c0c10] border border-black/5 dark:border-white/5 p-3 rounded-2xl flex flex-col gap-1 shadow-sm md:col-span-1">
            {[
              { id: 'line', label: lang === 'es' ? '📡 Mi Línea TV' : '📡 My Stream Line', badge: isPremiumActive ? 'ONLINE' : 'OFFLINE' },
              { id: 'setup', label: lang === 'es' ? '🔥 Guías Multimedia' : '🔥 Device Setup', badge: null },
              { id: 'ledger', label: lang === 'es' ? '💳 Facturación' : '💳 Billing Ledger', badge: null },
              { id: 'security', label: lang === 'es' ? '🔒 Configuración' : '🔒 Account Security', badge: null }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                  activeTab === tab.id 
                    ? 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-l-4 border-violet-500' 
                    : 'text-gray-400 hover:bg-black/5 dark:hover:bg-white/[0.02]'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded ${
                    isPremiumActive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* DYNAMIC VIEW SCREEN CONTENT GATEWAY */}
          <div className="md:col-span-3">
            
            {/* SUB-TAB 1: STREAM LINE SETTING */}
            {activeTab === 'line' && (
              <div className="space-y-6">
                {!isPremiumActive ? (
                  <div className="bg-white dark:bg-[#0c0c10] border border-black/5 dark:border-white/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                    <div className="text-center max-w-md mx-auto space-y-2">
                      <span className="text-[9px] font-black tracking-widest uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-3 py-1 rounded-md">
                        {lang === 'es' ? 'Línea de Transmisión Inactiva' : 'Connection Core Gated'}
                      </span>
                      <h3 className="text-lg font-black tracking-tight">{lang === 'es' ? 'Active su Entrada de Red' : 'Activate Network Endpoint Routing'}</h3>
                      <p className="text-xs text-gray-400 font-medium leading-relaxed">{lang === 'es' ? 'Elija la cobertura de red preferida para aprovisionar su cadena M3U nativa en tiempo real.' : 'Select a subscription deployment packet below to map live unencrypted television segments onto your hardware.'}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                      <button
                        type="button" onClick={() => setSelectedPlan('basic')}
                        className={`p-4 rounded-xl text-left border transition cursor-pointer ${selectedPlan === 'basic' ? 'border-violet-500 bg-violet-500/10' : 'border-black/5 dark:border-white/5'}`}
                      >
                        <div className="flex items-center justify-between font-black text-xs">
                          <span>🌟 Basic Stream Tier</span>
                          <span className="font-mono text-violet-500">{formatPrice('basic')}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1">5,000+ localized HD content loops.</p>
                      </button>

                      <button
                        type="button" onClick={() => setSelectedPlan('premium')}
                        className={`p-4 rounded-xl text-left border transition cursor-pointer ${selectedPlan === 'premium' ? 'border-violet-500 bg-violet-500/10' : 'border-black/5 dark:border-white/5'}`}
                      >
                        <div className="flex items-center justify-between font-black text-xs">
                          <span>👑 Premium Ultra Suite</span>
                          <span className="font-mono text-violet-500">{formatPrice('premium')}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1">15,000+ global channels & 4K streams.</p>
                      </button>
                    </div>

                    <div className="max-w-xs mx-auto text-center pt-2">
                      <button onClick={handleDashboardCheckout} disabled={processingPayment} className="glow-btn w-full py-3.5 text-xs font-black text-white rounded-xl shadow-lg cursor-pointer">
                        {isDemo ? (lang === 'es' ? 'Registrarse Para Activar' : 'Create Account to Unlock') : (processingPayment ? 'CONNECTING GATEWAY...' : 'Complete Secure Activation')}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white dark:bg-[#0c0c10] border border-black/5 dark:border-white/5 p-6 rounded-3xl space-y-4 shadow-sm animate-fadeIn">
                    <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">Your Personalized M3U Streaming Token URL</h3>
                    <div className="bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/5 p-4 rounded-xl flex items-center justify-between font-mono text-xs text-violet-500 font-bold select-all overflow-x-auto">
                      <span>https://auratv.vercel.app/api/streams/download?token={streamToken}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SUB-TAB 2: HARDWARE DEVICE MANAGEMENT LAYOUT */}
            {activeTab === 'setup' && (
              <div className="bg-white dark:bg-[#0c0c10] border border-black/5 dark:border-white/5 rounded-3xl p-6 space-y-6 shadow-sm animate-fadeIn">
                <div>
                  <h2 className="text-base font-black tracking-tight">{lang === 'es' ? 'Terminales de Sincronización de Dispositivos' : 'Universal Integration Guide Framework'}</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{lang === 'es' ? 'Conecte su cadena de tokens a cualquier decodificador o software multimedia.' : 'Map connection configuration indices across standard operating system players.'}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-black/5 dark:bg-white/[0.01] border border-black/5 dark:border-white/5 p-4 rounded-xl">
                    <span className="text-xl">🔥</span>
                    <h4 className="text-xs font-black mt-2">Amazon Fire Stick</h4>
                    <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">Side-load application containers utilizing custom standard IPTV Smarters configuration strings.</p>
                  </div>
                  <div className="bg-black/5 dark:bg-white/[0.01] border border-black/5 dark:border-white/5 p-4 rounded-xl">
                    <span className="text-xl">🍏</span>
                    <h4 className="text-xs font-black mt-2">Apple TV / iOS</h4>
                    <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">Input your server playlist definition URL parameter index cleanly into native Snappy IPTV application buffers.</p>
                  </div>
                  <div className="bg-black/5 dark:bg-white/[0.01] border border-black/5 dark:border-white/5 p-4 rounded-xl">
                    <span className="text-xl">📺</span>
                    <h4 className="text-xs font-black mt-2">Smart TV Client</h4>
                    <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">Upload playlists to remote portal targets using active IBO Player, SET IPTV, or Nanomid server handles.</p>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 3: BILLING LEDGER HISTORY */}
            {activeTab === 'ledger' && (
              <div className="bg-white dark:bg-[#0c0c10] border border-black/5 dark:border-white/5 rounded-3xl p-6 space-y-6 shadow-sm animate-fadeIn">
                <div>
                  <h2 className="text-base font-black tracking-tight">{lang === 'es' ? 'Historial de Facturación y Transacciones' : 'Financial Ledger Statement'}</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{lang === 'es' ? 'Administre sus comprobantes o invoque el portal de Stripe.' : 'Review settlement invoices and manage continuous automated membership states.'}</p>
                </div>
                <div className="border border-black/5 dark:border-white/5 rounded-xl overflow-hidden text-xs">
                  <div className="bg-black/5 dark:bg-white/[0.02] p-3 font-black text-gray-400 grid grid-cols-3 text-center">
                    <span>Date</span>
                    <span>Description</span>
                    <span>Amount Status</span>
                  </div>
                  <div className="p-4 text-center text-gray-400 font-medium text-[11px] bg-white dark:bg-transparent">
                    {isPremiumActive ? (
                      <div className="grid grid-cols-3 text-gray-900 dark:text-white font-mono font-bold">
                        <span>{new Date().toLocaleDateString()}</span>
                        <span>Premium Monthly Suite Activation</span>
                        <span className="text-emerald-500">PAID</span>
                      </div>
                    ) : (
                      lang === 'es' ? 'No se registran transacciones liquidadas en este perfil de nodo.' : 'No finalized commercial operations mapped to this credential identity.'
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 4: ACCOUNT PROFILE CONFIGURATION SECURITY */}
            {activeTab === 'security' && (
              <div className="bg-white dark:bg-[#0c0c10] border border-black/5 dark:border-white/5 rounded-3xl p-6 space-y-6 shadow-sm animate-fadeIn">
                <div>
                  <h2 className="text-base font-black tracking-tight">{lang === 'es' ? 'Seguridad del Nodo de Usuario' : 'Cryptographic Security Variables'}</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{lang === 'es' ? 'Actualice las claves o genere un nuevo token de transmisión.' : 'Modify password authentication variables or rotate active network streaming tokens.'}</p>
                </div>
                <div className="space-y-4 max-w-sm">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase">Streaming Token Sequence Reference</label>
                    <input type="text" disabled value={streamToken} className="w-full bg-black/5 dark:bg-white/[0.01] border border-black/5 dark:border-white/5 rounded-xl p-3 text-xs font-mono font-bold text-gray-400" />
                  </div>
                  <button disabled className="bg-black/5 dark:bg-white/5 text-xs font-bold px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-inherit opacity-50">
                    {lang === 'es' ? 'Rotar Clave Token de Streaming' : 'Rotate Streaming Token Reference'}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}