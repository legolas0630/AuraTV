'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { useApp } from '@/context/AppContext';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const { lang } = useApp();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const content = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to access your secure streaming workspace terminal and download your active M3U lines.',
      emailLabel: 'EMAIL ADDRESS',
      passLabel: 'PASSWORD',
      cta: 'Sign In to Console',
      divider: 'OR ACCESS WITH',
      noAccount: "Don't have an account?",
      signUp: 'Register here'
    },
    es: {
      title: 'Bienvenido de Nuevo',
      subtitle: 'Inicie sesión para acceder a su terminal de transmisión y descargar sus líneas M3U activas.',
      emailLabel: 'CORREO ELECTRÓNICO',
      passLabel: 'CONTRASEÑA',
      cta: 'Iniciar Sesión en Consola',
      divider: 'O ACCEDE CON',
      noAccount: '¿No tienes una cuenta?',
      signUp: 'Regístrate aquí'
    }
  };

  const t = content[lang as 'en' | 'es'] || content.en;

  // Handles Traditional Email/Password Login Handshake
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    // Direct routing path straight to the gated control matrix dashboard
    router.push('/dashboard');
  };

  // Handles Social Provider Sign-In Loops
  const handleSocialLogin = async (provider: 'google' | 'apple' | 'facebook') => {
    setErrorMessage('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#060608] dark:text-[#f4f4f7] flex items-center justify-center p-6 transition-colors duration-200">
      <div className="w-full max-w-md bg-white dark:bg-[#0c0c10] border border-black/10 dark:border-white/5 rounded-3xl p-8 shadow-xl space-y-6">
        
        {/* Headings */}
        <div className="space-y-1.5 text-center">
          <h1 className="text-2xl font-black tracking-tight">{t.title}</h1>
          <p className="text-xs text-gray-400 font-medium leading-relaxed">{t.subtitle}</p>
        </div>

        {/* Credentials Authentication Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black tracking-wider text-gray-400 uppercase">{t.emailLabel}</label>
            <input 
              type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-black/5 dark:bg-white/[0.01] border border-black/10 dark:border-white/10 rounded-xl p-3.5 text-xs font-bold focus:outline-none focus:border-violet-500/50 text-inherit transition"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black tracking-wider text-gray-400 uppercase">{t.passLabel}</label>
            <input 
              type="password" required value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-black/5 dark:bg-white/[0.01] border border-black/10 dark:border-white/10 rounded-xl p-3.5 text-xs font-bold focus:outline-none focus:border-violet-500/50 text-inherit transition"
            />
          </div>

          {/* Error Banner Injection */}
          {errorMessage && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-[11px] font-bold rounded-xl animate-shake">
              ⚠️ {errorMessage}
            </div>
          )}

          <button
            type="submit" disabled={loading}
            className="glow-btn w-full py-4 text-xs font-black text-white uppercase tracking-widest rounded-xl shadow-xl transition cursor-pointer disabled:opacity-50"
          >
            {loading ? 'AUTHENTICATING SECURE ROUTE...' : t.cta}
          </button>
        </form>

        {/* Decorative Structural Divider */}
        <div className="relative w-full flex items-center justify-center my-2">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-black/5 dark:border-white/5"></div></div>
          <span className="relative bg-white dark:bg-[#0c0c10] px-3 text-[9px] font-black tracking-widest text-gray-400 uppercase">{t.divider}</span>
        </div>

        {/* Frosted Glass OAuth Button Deck */}
        <div className="grid grid-cols-3 gap-2.5">
          
          {/* Google */}
          <button
            type="button" onClick={() => handleSocialLogin('google')}
            className="flex items-center justify-center py-3 rounded-xl bg-black/5 dark:bg-white/[0.02] border border-black/5 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/5 font-bold text-xs transition cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
          </button>

          {/* Apple */}
          <button
            type="button" onClick={() => handleSocialLogin('apple')}
            className="flex items-center justify-center py-3 rounded-xl bg-black/5 dark:bg-white/[0.02] border border-black/5 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/5 font-bold text-xs transition cursor-pointer"
          >
            <svg className="w-4 h-4 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.58 2.95-1.39z"/>
            </svg>
          </button>

          {/* Facebook */}
          <button
            type="button" onClick={() => handleSocialLogin('facebook')}
            className="flex items-center justify-center py-3 rounded-xl bg-black/5 dark:bg-white/[0.02] border border-black/5 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/5 font-bold text-xs transition cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>

        </div>

        {/* Registration Alternative Route Footer Switcher */}
        <div className="text-center pt-2 border-t border-black/5 dark:border-white/5 text-[11px] font-semibold text-gray-400">
          {t.noAccount}{' '}
          <Link href="/register" className="text-violet-500 font-bold hover:underline">
            {t.signUp}
          </Link>
        </div>

      </div>
    </div>
  );
}