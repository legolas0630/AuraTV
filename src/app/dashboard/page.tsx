'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // No active session? Boot them back to login page
        router.push('/login');
        return;
      }

      setUser(session.user);
      setMetadata(session.user.user_metadata);
      setLoading(false);
    };

    fetchUserSession();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center font-medium text-sm">
        Loading AuraTV Control Panel...
      </div>
    );
  }

  const productionUrl = typeof window !== 'undefined' ? window.location.origin : 'https://auratv.stream';
  const customM3uLink = `${productionUrl}/api/playlist?token=${metadata?.stream_token}`;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f4f4f7] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white/[0.01] border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-col justify-between">
        <div className="space-y-8">
          <div className="text-xl font-black tracking-wider bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
            AURA<span className="text-white">TV</span>
          </div>
          <nav className="space-y-2 text-sm font-medium">
            <div className="px-4 py-2.5 bg-violet-500/10 text-violet-400 rounded-xl border border-violet-500/20">My Line Status</div>
            <div className="px-4 py-2.5 text-gray-400 hover:text-white transition rounded-xl cursor-not-allowed opacity-50">Setup Tutorials (Coming Soon)</div>
            <div className="px-4 py-2.5 text-gray-400 hover:text-white transition rounded-xl cursor-not-allowed opacity-50">Billing History</div>
          </nav>
        </div>
        <button onClick={handleLogout} className="mt-8 text-left text-xs text-gray-500 hover:text-red-400 transition font-semibold px-4 cursor-pointer">
          Sign Out of Control Dashboard
        </button>
      </aside>

      {/* Main Panel Space */}
      <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full space-y-8">
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-white/5 pb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Streaming Account Credentials</h1>
            <p className="text-gray-400 text-xs mt-1">Logged in as: <span className="text-gray-200 font-medium">{user?.email}</span></p>
          </div>
          <div className="flex items-center gap-2 self-start">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              {metadata?.subscription_status || 'Trial Active'}
            </span>
          </div>
        </header>

        {/* Credentials Display Cards */}
        <section className="grid grid-cols-1 gap-6">
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Your Personalized M3U Playlist URL</h3>
            <p className="text-xs text-gray-400 leading-relaxed">Copy this complete address configuration string and paste it directly into your preferred IPTV application player.</p>
            <div className="flex gap-2 items-center mt-2">
              <input 
                type="text" 
                readOnly 
                value={customM3uLink}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-violet-300 font-mono focus:outline-none"
              />
              <button 
                onClick={() => { navigator.clipboard.writeText(customM3uLink); alert("M3U string copied to clipboard!"); }}
                className="bg-white/5 hover:bg-white/10 text-white font-semibold px-4 py-3 rounded-xl text-xs border border-white/10 cursor-pointer transition whitespace-nowrap"
              >
                Copy URL
              </button>
            </div>
          </div>

          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">Alternative: Xtream Codes Connection</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black/20 border border-white/5 p-4 rounded-xl">
                <span className="block text-[10px] uppercase font-bold text-gray-500">Host Server URL</span>
                <span className="text-xs font-mono text-white select-all block mt-1">{productionUrl}</span>
              </div>
              <div className="bg-black/20 border border-white/5 p-4 rounded-xl">
                <span className="block text-[10px] uppercase font-bold text-gray-500">Account Username</span>
                <span className="text-xs font-mono text-white select-all block mt-1">{user?.email?.split('@')[0]}</span>
              </div>
              <div className="bg-black/20 border border-white/5 p-4 rounded-xl">
                <span className="block text-[10px] uppercase font-bold text-gray-500">Server API Token Password</span>
                <span className="text-xs font-mono text-cyan-400 select-all block mt-1 truncate">{metadata?.stream_token}</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}