'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Generar token único para el reproductor IPTV del usuario
    const generatedStreamToken = 'aura_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // 2. Registrar usuario en la base de datos de Supabase Auth
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          stream_token: generatedStreamToken,
          subscription_status: 'pending_payment', // Inicia retenido hasta que pague
        }
      }
    });

    if (error) {
      alert(`Registration Error: ${error.message}`);
      setLoading(false);
      return;
    }

    // 3. ENRUTADOR DINÁMICO DE PASARELAS DE PAGO
    if (paymentMethod === 'mercadopago') {
      try {
        const res = await fetch('/api/checkout/mercadopago', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, streamToken: generatedStreamToken, currency: 'USD' })
        });
        const paymentData = await res.json();
        if (paymentData.init_point) window.location.href = paymentData.init_point;
        else alert('Error en Mercado Pago.');
      } catch (err) {
        alert('Fallo de conexión en Mercado Pago.');
      } finally { setLoading(false); }
      
    } else if (paymentMethod === 'stripe') {
      try {
        const res = await fetch('/api/checkout/stripe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, streamToken: generatedStreamToken })
        });
        const paymentData = await res.json();
        if (paymentData.url) window.location.href = paymentData.url; // Redirección a Stripe
        else alert('Error al inicializar Stripe Checkout.');
      } catch (err) {
        alert('Fallo de conexión con el servidor de Stripe.');
      } finally { setLoading(false); }
      
    } else {
      // Flujo alternativo para Criptomonedas (Simulado de momento)
      setLoading(false);
      alert(`Cuenta creada! Token provisional: ${generatedStreamToken}. Envía tu pago a la wallet para activar.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f4f4f7] flex flex-col justify-between">
      <header className="px-6 py-6 border-b border-white/10 max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-wider bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
          AURA<span className="text-white">TV</span>
        </Link>
        <span className="text-xs text-gray-500">Paso 1 de 2: Credenciales e Inicialización</span>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 my-8">
        <div className="w-full max-w-xl bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Activar Membresía Premium</h2>
            <p className="text-gray-400 text-sm">Crea tus credenciales de acceso para la playlist global.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Correo Electrónico</label>
              <input 
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" 
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Contraseña</label>
              <input 
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" 
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Selecciona tu Proveedor de Pago Seguro</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button" onClick={() => setPaymentMethod('stripe')}
                  className={`p-4 border rounded-xl text-left flex flex-col justify-between transition cursor-pointer ${paymentMethod === 'stripe' ? 'border-violet-500 bg-violet-500/10' : 'border-white/10 bg-white/[0.01]------------- hover:bg-white/[0.03]'}`}
                >
                  <span className="text-xs font-bold block text-white">Tarjetas</span>
                  <span className="text-[10px] text-gray-400 mt-1">Stripe Global</span>
                </button>

                <button
                  type="button" onClick={() => setPaymentMethod('crypto')}
                  className={`p-4 border rounded-xl text-left flex flex-col justify-between transition cursor-pointer ${paymentMethod === 'crypto' ? 'border-amber-500 bg-amber-500/10' : 'border-white/10 bg-white/[0.01] hover:bg-white/[0.03]'}`}
                >
                  <span className="text-xs font-bold block text-white font-medium">Criptomonedas</span>
                  <span className="text-[10px] text-gray-400 mt-1">BTC, USDT, ETH</span>
                </button>

                <button
                  type="button" onClick={() => setPaymentMethod('mercadopago')}
                  className={`p-4 border rounded-xl text-left flex flex-col justify-between transition cursor-pointer ${paymentMethod === 'mercadopago' ? 'border-cyan-500 bg-cyan-500/10' : 'border-white/10 bg-white/[0.01] hover:bg-white/[0.03]'}`}
                >
                  <span className="text-xs font-bold block text-white">Mercado Pago</span>
                  <span className="text-[10px] text-gray-400 mt-1">LATAM & Pix</span>
                </button>
              </div>
            </div>

            <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl text-xs text-gray-400 leading-relaxed">
              💡 <span className="text-white font-medium">Término de Servicio:</span> Al proceder estás autorizando una orden de facturación por un monto mensual de $9.99 USD (o equivalente local) cancelable en cualquier momento sin recargos adicionales desde tu panel.
            </div>

            <button type="submit" disabled={loading} className="glow-btn w-full text-white font-bold py-4 rounded-xl text-sm shadow-lg cursor-pointer disabled:opacity-50">
              {loading ? 'Procesando Conexión Segura...' : 'Proceder al Pago Seguro'}
            </button>
          </form>
        </div>
      </main>

      <footer className="py-6 border-t border-white/5 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-2">
        <span>🔒 Conexión Encriptada SSL de 256 Bits</span>
        <span className="hidden sm:inline">•</span>
        <span>Normativa de Estándar de Seguridad PCI-DSS</span>
      </footer>
    </div>
  );
}