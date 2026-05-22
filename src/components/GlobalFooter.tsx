'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function GlobalFooter() {
  const { lang } = useApp();
  const pathname = usePathname();

  // Guard Clause: Completely hide the public footer inside the user dashboard panel workspace
  if (pathname.startsWith('/dashboard')) return null;

  const content = {
    en: {
      desc: 'Next generation live television protocol network distribution platform.',
      system: 'System Matrix',
      grid: 'Channel Grid',
      sla: 'SLA Status',
      legalTitle: 'Legal & Compliance',
      terms: 'Terms & Conditions',
      privacy: 'Privacy Policy',
      refunds: 'Refund Policy',
      dmca: 'Copyright Infringement (DMCA)',
      disclaimer: 'Disclaimer: AuraTV functions strictly as a dynamic media player optimization indexing protocol. We do not host, store, capture, stream, or rebroadcast any multimedia audio/visual content files on our infrastructure. All programming feeds and streams indexed within this digital gateway point to public, unencrypted Free-to-Air (FTA) digital broadcasts made freely accessible on the open internet by their respective official authorized networks. All product names, logos, trademarks, and brands are property of their respective legal owners.'
    },
    es: {
      desc: 'Plataforma de distribución de red de protocolo de televisión en vivo de próxima generación.',
      system: 'Matriz del Sistema',
      grid: 'Parrilla de Canales',
      sla: 'Estado del SLA',
      legalTitle: 'Legal y Cumplimiento',
      terms: 'Términos y Condiciones',
      privacy: 'Política de Privacidad',
      refunds: 'Política de Reembolsos',
      dmca: 'Infracción de Derechos de Autor (DMCA)',
      disclaimer: 'Aviso Legal: AuraTV funciona estrictamente como un protocolo de indexación y optimización para reproductores de medios dinámicos. No alojamos, almacenamos, capturamos, transmitimos ni retransmitimos ningún archivo de contenido de audio o video multimedia en nuestra infraestructura. Todas las transmisiones y señales indexadas dentro de este portal digital apuntan a emisiones públicas y no encriptadas de Señal Abierta (Free-to-Air - FTA) accesibles libremente en el internet abierto por sus respectivas redes oficiales autorizadas. Todos los nombres de productos, logotipos, marcas comerciales y marcas registradas pertenecen a sus respectivos dueños legales.'
    }
  };

  const t = content[lang as 'en' | 'es'] || content.en;

  return (
    <footer className="w-full bg-[#ebebef] dark:bg-[#060608] border-t border-black/5 dark:border-white/5 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
        
        {/* Upper Column Layout Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <Link href="/" className="text-lg font-black tracking-wider bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
              AURA<span className="text-gray-900 dark:text-white">TV</span>
            </Link>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
              {t.desc}
            </p>
          </div>

          {/* Navigation Directory Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Navigation</h4>
            <ul className="space-y-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
              <li><Link href="/features" className="hover:text-violet-500 transition">{t.system}</Link></li>
              <li><Link href="/channels" className="hover:text-violet-500 transition">{t.grid}</Link></li>
              <li><Link href="/pricing" className="hover:text-violet-500 transition">{t.sla}</Link></li>
            </ul>
          </div>

          {/* Legal Pages Operations Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">{t.legalTitle}</h4>
            <ul className="space-y-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
              <li><Link href="/terms" className="hover:text-violet-500 transition">{t.terms}</Link></li>
              <li><Link href="/privacy" className="hover:text-violet-500 transition">{t.privacy}</Link></li>
              <li><Link href="/refunds" className="hover:text-violet-500 transition">{t.refunds}</Link></li>
              <li><Link href="/dmca" className="hover:text-violet-500 transition">{t.dmca}</Link></li>
            </ul>
          </div>
        </div>

        {/* Core Regulatory Free-To-Air Protection Disclaimer */}
        <div className="bg-black/5 dark:bg-white/[0.01] border border-black/5 dark:border-white/5 p-5 rounded-2xl">
          <p className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500 leading-relaxed text-justify">
            {t.disclaimer}
          </p>
        </div>

        {/* Closing Intellectual Meta Row */}
        <div className="border-t border-black/5 dark:border-white/5 pt-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-medium text-gray-400 dark:text-gray-500">
          <span>© {new Date().getFullYear()} AURA TV Protocol Network. All Rights Reserved.</span>
          <span className="opacity-60 tracking-tight">Encryption Safeguards Powered by Secure Webhook Handshakes</span>
        </div>

      </div>
    </footer>
  );
}