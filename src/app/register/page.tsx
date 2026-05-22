'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useApp } from '@/context/AppContext';

export default function RegisterPage() {
  const { lang } = useApp();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const content = {
    en: {
      title: 'Create Your Account',
      subtitle: 'Sign up for free instantly. You can choose to activate your streaming line directly from your dashboard inside.',
      emailLabel: 'EMAIL ADDRESS',
      passLabel: 'PASSWORD',
      cta: 'Create Free Account',
      haveAccount: 'Already have an account?',
      signIn: 'Sign In here'
    },
    es: {
      title: 'Crear tu Cuenta',
      subtitle: 'Regístrate gratis al instante. Podrás elegir activar tu línea de transmisión directamente desde tu panel de control interior.',
      emailLabel: 'CORREO ELECTRÓNICO',
      passLabel: 'CONTRASEÑA',
      cta: 'Crear Cuenta Gratis',
      haveAccount: '¿Ya tienes una cuenta?',
      signIn: 'Inicia Sesión aquí'
    }
  };

  const t = content[lang as 'en' | 'es'] || content.en;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    // Generate a unique stream token identifying string upfront for their future playlist 
    const generatedToken = 'ST_' + Math.random().toString(36).substr(2, 9).toUpperCase();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Embed the base metadata variables directly in the account schema profile
        data: {
          stream_token: generatedToken,
          subscription_status: 'Pending Activation'
        }
      }
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    // Auto-login or push straight to the dynamic gateway console dashboard
    router.push('/dashboard');
  };

  return (
    <div className="min-h-[85vh] bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#060608] dark:text-[#f4f4f7] flex items-center justify-center p-6 transition-colors duration-200">
      <div className="w-full max-w-md bg-white dark:bg-[#0c0c10] border border-black/10 dark:border-white/5 rounded-3xl p-8 shadow-xl space-y-6">
        
        {/* Descriptive Headings */}
        <div className="space-y-1.5 text-center">
          <h1 className="text-2xl font-black tracking-tight">{t.title}</h1>
          <p className="text-xs text-gray-400 font-medium leading-relaxed">{t.subtitle}</p>
        </div>

        {/* Form Entry Fieldsets */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black tracking-wider text-gray-400 uppercase">{t.emailLabel}</label>
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-black/5 dark:bg-white/[0.01] border border-black/10 dark:border-white/10 rounded-xl p-3.5 text-xs font-bold focus:outline-none focus:border-violet-500/50 text-inherit transition"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black tracking-wider text-gray-400 uppercase">{t.passLabel}</label>
            <input 
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-black/5 dark:bg-white/[0.01] border border-black/10 dark:border-white/10 rounded-xl p-3.5 text-xs font-bold focus:outline-none focus:border-violet-500/50 text-inherit transition"
            />
          </div>

          {/* Error Message Anchor Banner */}
          {errorMessage && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-[11px] font-bold rounded-xl">
              ⚠️ {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="glow-btn w-full py-4 text-xs font-black text-white uppercase tracking-widest rounded-xl shadow-xl transition cursor-pointer disabled:opacity-50"
          >
            {loading ? 'CREATING PROFILE ENVIRONMENT...' : t.cta}
          </button>
        </form>

        {/* Redirect Switch Footer Link */}
        <div className="text-center pt-2 border-t border-black/5 dark:border-white/5 text-[11px] font-semibold text-gray-400">
          {t.haveAccount}{' '}
          <Link href="/login" className="text-violet-500 font-bold hover:underline">
            {t.signIn}
          </Link>
        </div>

      </div>
    </div>
  );
}