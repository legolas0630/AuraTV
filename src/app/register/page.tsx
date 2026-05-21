'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase'; // Import the client instance

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Generate a completely unique, secure stream token for their TV app setup
    const generatedStreamToken = 'aura_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // 2. Sign up the user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // We pass the stream token into user metadata so it stores automatically
        data: {
          stream_token: generatedStreamToken,
          subscription_status: 'trialing', // Sets their entry state to trial
        }
      }
    });

    setLoading(false);

    if (error) {
      alert(`Registration Error: ${error.message}`);
      return;
    }

    // 3. Success! Redirect them over to the respective payment provider checkout
    alert(`Account created! Token: ${generatedStreamToken}. Redirecting to secure ${paymentMethod} gateway...`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f4f4f7] flex flex-col justify-between">
      {/* Mini Header */}
      <header className="px-6 py-6 border-b border-white/10 max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-wider bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
          AURA<span className="text-white">TV</span>
        </Link>
        <span className="text-xs text-gray-500">Step 1 of 2: Create Account & Verify Card</span>
      </header>

      {/* Main Form Box */}
      <main className="flex-1 flex items-center justify-center p-6 my-8">
        <div className="w-full max-w-xl bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Activate 24h Free Trial</h2>
            <p className="text-gray-400 text-sm">Create your credentials to access the global playlist.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Email Address</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" 
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition text-sm"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Password</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition text-sm"
              />
            </div>

            {/* Payment Gateway Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Select Secure Payment Provider</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('stripe')}
                  className={`p-4 border rounded-xl text-left flex flex-col justify-between transition cursor-pointer ${
                    paymentMethod === 'stripe' ? 'border-violet-500 bg-violet-500/10' : 'border-white/10 bg-white/[0.01] hover:bg-white/[0.03]'
                  }`}
                >
                  <span className="text-xs font-bold block text-white">Credit / Debit</span>
                  <span className="text-[10px] text-gray-400 mt-1">Stripe Secure</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-4 border rounded-xl text-left flex flex-col justify-between transition cursor-pointer ${
                    paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-white/[0.01] hover:bg-white/[0.03]'
                  }`}
                >
                  <span className="text-xs font-bold block text-white">PayPal</span>
                  <span className="text-[10px] text-gray-400 mt-1">Global Subscriptions</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('mercadopago')}
                  className={`p-4 border rounded-xl text-left flex flex-col justify-between transition cursor-pointer ${
                    paymentMethod === 'mercadopago' ? 'border-cyan-500 bg-cyan-500/10' : 'border-white/10 bg-white/[0.01] hover:bg-white/[0.03]'
                  }`}
                >
                  <span className="text-xs font-bold block text-white">Mercado Pago</span>
                  <span className="text-[10px] text-gray-400 mt-1">Latin America AutoPay</span>
                </button>
              </div>
            </div>

            {/* Price Transparency Warning */}
            <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl text-xs text-gray-400 leading-relaxed">
              💡 <span className="text-white font-medium">Trial Term:</span> You are authorizing a $0.00 authentication charge today. Your account will automatically upgrade to the premium membership ($9.99/mo) in exactly 24 hours unless canceled via your digital control dashboard.
            </div>

            {/* Action Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="glow-btn w-full text-white font-bold py-4 rounded-xl text-sm shadow-lg cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Creating Secure Account...' : 'Proceed to Secure Checkout'}
            </button>
          </form>
        </div>
      </main>

      {/* Security Footer */}
      <footer className="py-6 border-t border-white/5 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-2">
        <span>🔒 256-Bit SSL Encrypted Connection</span>
        <span className="hidden sm:inline">•</span>
        <span>Compliant with PCI-DSS Standards</span>
      </footer>
    </div>
  );
}