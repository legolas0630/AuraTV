'use client';

import { useApp } from '@/context/AppContext';

export default function TermsPage() {
  const { lang } = useApp();

  const content = {
    en: {
      title: 'Terms of Service',
      updated: 'Last updated: May 2026',
      intro: 'Welcome to AuraTV. By accessing our platform, configuring user metadata profiles, or utilizing our streaming indexing protocols, you agree to comply with and be bound by the following comprehensive terms.',
      sections: [
        { title: '1. Core Nature of Protocol', text: 'AuraTV functions exclusively as a highly optimized, dynamic media client player indexing interface. We do not own, manage, host, capture, or alter any media stream signals. The tool strictly parses, formats, and handles unencrypted Free-to-Air (FTA) digital broadcasts already made openly accessible on the public internet by official broadcast networks.' },
        { title: '2. User Responsibility', text: 'Users are completely responsible for ensuring that their utilization of our translation matrix aligns with local, federal, and international communication guidelines. AuraTV grants a limited, non-transferable technical license to utilize our hardware optimization dashboard loops.' },
        { title: '3. Prohibited Exploitation', text: 'You may not reverse-engineer our secure backend token authorization scripts, execute malicious scrape bots across our live server infrastructure, or attempt to sell or distribute individual stream credentials mapped to your user profile.' }
      ]
    },
    es: {
      title: 'Términos del Servicio',
      updated: 'Última actualización: Mayo 2026',
      intro: 'Bienvenido a AuraTV. Al acceder a nuestra plataforma, configurar perfiles de metadatos de usuario o utilizar nuestros protocolos de indexación, acepta cumplir y quedar sujeto a los siguientes términos.',
      sections: [
        { title: '1. Naturaleza del Protocolo', text: 'AuraTV funciona exclusivamente como una interfaz de indexación de reproducción de medios dinámicos altamente optimizada. No poseemos, administramos, alojamos, capturamos ni alteramos ninguna señal de transmisión. La herramienta estrictamente procesa, formatea y maneja transmisiones digitales de Señal Abierta (Free-to-Air - FTA) no encriptadas que ya son accesibles públicamente en el internet abierto.' },
        { title: '2. Responsabilidad del Usuario', text: 'Los usuarios son totalmente responsables de garantizar que el uso de nuestra matriz de traducción se alinee con las pautas de comunicación locales e internacionales. AuraTV otorga una licencia técnica limitada y no transferible para utilizar nuestros bucles de optimización del panel de control.' },
        { title: '3. Explotación Prohibida', text: 'No puede realizar ingeniería inversa en nuestros scripts de autorización de tokens, ejecutar bots de extracción de datos maliciosos en nuestra infraestructura o intentar distribuir credenciales individuales mapeadas a su perfil.' }
      ]
    }
  };

  const t = content[lang as 'en' | 'es'] || content.en;

  return (
    <div className="bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#060608] dark:text-[#f4f4f7] min-h-screen py-16 px-6 transition-colors duration-300">
      <main className="max-w-3xl mx-auto space-y-8 bg-white dark:bg-[#0c0c10] border border-black/5 dark:border-white/5 p-8 md:p-12 rounded-3xl shadow-sm">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-4xl font-black tracking-tight">{t.title}</h1>
          <p className="text-xs text-gray-400 font-semibold">{t.updated}</p>
        </div>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{t.intro}</p>
        <div className="space-y-6 pt-4 border-t border-black/5 dark:border-white/5">
          {t.sections.map((sec, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="text-sm font-black text-violet-600 dark:text-violet-400">{sec.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-300 leading-relaxed text-justify font-medium">{sec.text}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}