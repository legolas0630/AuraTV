'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      alert(`Login Failed: ${error.message}`);
      return;
    }

    // Success! Push them straight into their streaming control panel
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f4f4f7] flex flex-col justify-between">
      <header className="px-6 py-6 border-b border-white/10 max-w-7xl mx-auto w-full">
        <Link href="/" className="text-xl font-black tracking-wider bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
          AURA<span className="text-white">TV</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 my-8">
        <div className="w-full max-w-md bg-white/[0.02] border border-white/5 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold mb-2">Welcome Back</h2>
            <p className="text-gray-400 text-sm">Log in to manage your IPTV lines.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Email</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" 
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition text-sm"
              />
            </div>

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

            <button type="submit" disabled={loading} className="glow-btn w-full text-white font-bold py-4 rounded-xl text-sm shadow-lg cursor-pointer disabled:opacity-50">
              {loading ? 'Verifying...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center mt-6 text-xs text-gray-500">
            Don't have an active line? <Link href="/register" className="text-violet-400 hover:underline">Start free trial</Link>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-white/5 text-center text-xs text-gray-600">
        🔒 Encrypted authentication session interface
      </footer>
    </div>
  );
}