import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0a0a0c] text-[#f4f4f7]">
      {/* Navbar */}
      <header className="px-6 py-6 flex justify-between items-center border-b border-white/10 max-w-7xl mx-auto w-full">
        <div className="text-2xl font-black tracking-wider bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
          AURA<span className="text-white">TV</span>
        </div>
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
          <a href="features" className="hover:text-white transition">Features</a>
          <a href="channels" className="hover:text-white transition">Global Channels</a>
          <a href="pricing" className="hover:text-white transition">Pricing</a>
        </nav>
        <Link href="/login" className="text-sm font-semibold border border-white/20 px-5 py-2 rounded-full hover:bg-white/5 transition">
          Sign In
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-5xl mx-auto px-6 pt-24 pb-16 text-center flex flex-col items-center justify-center">
        <span className="text-xs font-bold uppercase tracking-widest bg-violet-500/10 text-violet-400 px-4 py-1.5 rounded-full border border-violet-500/20">
          Global TV & VOD Optimization Portal
        </span>
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mt-6 mb-8 max-w-4xl mx-auto leading-tight">
          Stream Live TV from <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">Every Corner</span> of the Globe.
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          The ultimate control hub for public Free-to-Air broadcasts and VOD classics. Curated, optimized, and ready for your Fire Stick, Smart TV, or mobile device.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <Link href="/register" className="glow-btn text-white font-bold px-8 py-4 rounded-full text-lg w-full sm:w-auto shadow-lg">
            Start Your 24-Hour Free Trial
          </Link>
          <span className="text-xs text-gray-500 max-w-md">
            💳 Credit card info required upfront to prevent spam. Cancel in 1-click before trial ends to avoid charges.
          </span>
        </div>
      </main>

      {/* Feature Section */}
      <section id="features" className="border-t border-white/5 bg-white/[0.01] py-20 w-full">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl text-left">
            <div className="text-xl font-bold mb-2 text-white">100+ Countries</div>
            <p className="text-gray-400 text-sm leading-relaxed">Instantly sync lists from North America, Europe, LatAm, Asia, and more.</p>
          </div>
          <div className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl text-left">
            <div className="text-xl font-bold mb-2 text-white">All Devices Supported</div>
            <p className="text-gray-400 text-sm leading-relaxed">Detailed tutorials for Fire Stick, Android TV, Apple TV, iOS, and PC setups.</p>
          </div>
          <div className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl text-left">
            <div className="text-xl font-bold mb-2 text-white">Dynamic M3U / Xtream</div>
            <p className="text-gray-400 text-sm leading-relaxed">Your unique portal access token updates automatically behind the scenes.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} AuraTV.stream. Not affiliated with any broadcast networks. All listed channels are publicly accessible, Free-to-Air signals.
      </footer>
    </div>
  );
}