'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useApp } from '@/context/AppContext'; // Import settings hooks

export default function DashboardPage() {
  const { theme, setTheme, lang, setLang, currency, setCurrency, t } = useApp();
  const [user, setUser] = useState<any>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Navigation tabs state
  const [activeMenu, setActiveMenu] = useState('status'); 
  const [tutorialTab, setTutorialTab] = useState('firestick');

  const router = useRouter();

  useEffect(() => {
    const fetchUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
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
      <div className="min-h-screen bg-[#0a0a0c] dark:bg-[#0a0a0c] text-white flex items-center justify-center text-sm">
        Loading AuraTV Control Panel...
      </div>
    );
  }

  const productionUrl = typeof window !== 'undefined' ? window.location.origin : 'https://auratv.stream';
  const customM3uLink = `${productionUrl}/api/playlist?token=${metadata?.stream_token}`;

  return (
    <div className="min-h-screen bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#0a0a0c] dark:text-[#f4f4f7] flex flex-col md:flex-row transition-colors duration-200">
      
      {/* Sidebar Section */}
      <aside className="w-full md:w-64 bg-white dark:bg-white/[0.01] border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10 p-6 flex flex-col justify-between">
        <div className="space-y-8">
          <div className="text-xl font-black tracking-wider bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
            AURA<span className="text-gray-900 dark:text-white">TV</span>
          </div>
          <nav className="space-y-2 text-sm font-medium">
            <button 
              onClick={() => setActiveMenu('status')}
              className={`w-full text-left px-4 py-2.5 rounded-xl border transition ${
                activeMenu === 'status' 
                  ? 'bg-violet-500/10 text-violet-500 dark:text-violet-400 border-violet-500/20' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-violet-500'
              }`}
            >
              {t('lineStatus')}
            </button>
            <button 
              onClick={() => setActiveMenu('tutorials')}
              className={`w-full text-left px-4 py-2.5 rounded-xl border transition ${
                activeMenu === 'tutorials' 
                  ? 'bg-violet-500/10 text-violet-500 dark:text-violet-400 border-violet-500/20' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-violet-500'
              }`}
            >
              {t('tutorials')}
            </button>
          </nav>
        </div>
        <button onClick={handleLogout} className="mt-8 text-left text-xs text-gray-400 hover:text-red-400 transition font-semibold px-4 cursor-pointer">
          {t('signOut')}
        </button>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full space-y-8">
        
        {/* Global Settings Dock & Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 p-4 rounded-2xl shadow-sm">
          <div className="text-xs font-semibold text-gray-500">
            {t('loggedAs')}: <span className="text-gray-900 dark:text-gray-200 font-bold">{user?.email}</span>
          </div>
          
          {/* Controllers */}
          <div className="flex items-center gap-3">
            {/* Language Selection */}
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              className="bg-black/5 dark:bg-white/5 text-xs font-bold rounded-lg px-2 py-1.5 focus:outline-none border border-black/10 dark:border-white/10"
            >
              <option value="en">🇺🇸 EN</option>
              <option value="es">🇲🇽 ES</option>
            </select>

            {/* Currency Selection */}
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-black/5 dark:bg-white/5 text-xs font-bold rounded-lg px-2 py-1.5 focus:outline-none border border-black/10 dark:border-white/10"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="MXN">MXN ($)</option>
            </select>

            {/* Light/Dark Toggle Button */}
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 bg-black/5 dark:bg-white/5 rounded-lg border border-black/10 dark:border-white/10 text-xs cursor-pointer"
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>

        {/* VIEW A: LINE MANAGEMENT PANELS */}
        {activeMenu === 'status' && (
          <div className="space-y-6 animate-fadeIn">
            <header className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-4">
              <h1 className="text-2xl font-black tracking-tight">{t('dashboardTitle')}</h1>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                {t('trialActive')}
              </span>
            </header>

            {/* M3U Link Display */}
            <div className="p-6 bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-2xl space-y-3 shadow-sm">
              <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">{t('m3uTitle')}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{t('m3uDesc')}</p>
              <div className="flex gap-2 items-center mt-2">
                <input 
                  type="text" 
                  readOnly 
                  value={customM3uLink}
                  className="w-full bg-black/5 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-xs text-violet-600 dark:text-violet-300 font-mono focus:outline-none"
                />
                <button 
                  onClick={() => { navigator.clipboard.writeText(customM3uLink); alert(t('copiedAlert')); }}
                  className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-4 py-3 rounded-xl text-xs cursor-pointer transition whitespace-nowrap shadow-sm"
                >
                  {t('copyBtn')}
                </button>
              </div>
            </div>

            {/* Xtream Codes Panel Layout */}
            <div className="p-6 bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-2xl shadow-sm">
              <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-4">{t('xtreamTitle')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/5 dark:bg-black/20 border border-black/5 dark:border-white/5 p-4 rounded-xl">
                  <span className="block text-[10px] uppercase font-bold text-gray-400">{t('host')}</span>
                  <span className="text-xs font-mono text-gray-900 dark:text-white select-all block mt-1">{productionUrl}</span>
                </div>
                <div className="bg-black/5 dark:bg-black/20 border border-black/5 dark:border-white/5 p-4 rounded-xl">
                  <span className="block text-[10px] uppercase font-bold text-gray-400">{t('user')}</span>
                  <span className="text-xs font-mono text-gray-900 dark:text-white select-all block mt-1">{user?.email?.split('@')[0]}</span>
                </div>
                <div className="bg-black/5 dark:bg-black/20 border border-black/5 dark:border-white/5 p-4 rounded-xl">
                  <span className="block text-[10px] uppercase font-bold text-gray-400">{t('pass')}</span>
                  <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 select-all block mt-1 truncate">{metadata?.stream_token || 'Aura_Token_Missing'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW B: STEP BY STEP INSTALLATION TUTORIALS (PATH B) */}
        {activeMenu === 'tutorials' && (
          <div className="space-y-6 animate-fadeIn">
            <header className="border-b border-black/5 dark:border-white/5 pb-4">
              <h1 className="text-2xl font-black tracking-tight">{t('tutorials')}</h1>
              <p className="text-xs text-gray-400 mt-1">Select your preferred streaming hardware option below.</p>
            </header>

            {/* Hardware Select Tabs */}
            <div className="grid grid-cols-3 gap-2 bg-black/5 dark:bg-white/5 p-1 rounded-xl">
              <button 
                onClick={() => setTutorialTab('firestick')}
                className={`py-2.5 text-xs font-bold rounded-lg transition ${tutorialTab === 'firestick' ? 'bg-white dark:bg-white/10 text-violet-500 dark:text-white shadow-sm' : 'text-gray-400'}`}
              >
                {t('firestick')}
              </button>
              <button 
                onClick={() => setTutorialTab('apple')}
                className={`py-2.5 text-xs font-bold rounded-lg transition ${tutorialTab === 'apple' ? 'bg-white dark:bg-white/10 text-violet-500 dark:text-white shadow-sm' : 'text-gray-400'}`}
              >
                {t('apple')}
              </button>
              <button 
                onClick={() => setTutorialTab('smartv')}
                className={`py-2.5 text-xs font-bold rounded-lg transition ${tutorialTab === 'smartv' ? 'bg-white dark:bg-white/10 text-violet-500 dark:text-white shadow-sm' : 'text-gray-400'}`}
              >
                {t('smartTv')}
              </button>
            </div>

            {/* Dynamic Content Rendering */}
            <div className="p-6 bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-2xl space-y-4 shadow-sm text-sm leading-relaxed">
              {tutorialTab === 'firestick' && (
                <div className="space-y-3">
                  <h2 className="text-base font-bold text-orange-500">🔥 Fire Stick / Android TV Guide</h2>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300 text-xs">
                    <li>Go to the Firestick home screen, navigate to the Search box, type in <strong className="text-black dark:text-white">Downloader</strong>, and install it.</li>
                    <li>Open Downloader, type code <strong className="text-black dark:text-white">250931</strong> (or search for TiviMate / IPTV Smarters APK) to download and run the installer.</li>
                    <li>Open your new IPTV Player app and choose <strong className="text-black dark:text-white">Add M3U Playlist</strong>.</li>
                    <li>Copy your personalized M3U URL from the line status tab and input it directly. Your custom programming will initialize instantly!</li>
                  </ol>
                </div>
              )}

              {tutorialTab === 'apple' && (
                <div className="space-y-3">
                  <h2 className="text-base font-bold text-blue-500">🍏 Apple TV / iOS Device Setup</h2>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300 text-xs">
                    <li>Open the official Apple App Store on your device.</li>
                    <li>Search for the premium client app <strong className="text-black dark:text-white">IPTVX</strong> or <strong className="text-black dark:text-white">GSE Smart IPTV</strong> and download it.</li>
                    <li>Select the option to add a remote connection playlist.</li>
                    <li>Paste your personalized AuraTV M3U address string or copy-paste your custom Xtream Codes coordinates. Click activate.</li>
                  </ol>
                </div>
              )}

              {tutorialTab === 'smartv' && (
                <div className="space-y-3">
                  <h2 className="text-base font-bold text-emerald-500">📺 Smart TV (Samsung & LG) Direct Setup</h2>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300 text-xs">
                    <li>Press the Home button on your TV remote to go to the app store content area (Samsung Smart Hub or LG Content Store).</li>
                    <li>Search for the application named <strong className="text-black dark:text-white">IPTV Smarters Pro</strong> or <strong className="text-black dark:text-white">IBO Player</strong>. Install it.</li>
                    <li>Open the application and select <strong className="text-black dark:text-white">Log in with Xtream Codes API</strong>.</li>
                    <li>Input your credentials exactly as mapped out in your AuraTV Status Control Dashboard panel above. Click login!</li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}