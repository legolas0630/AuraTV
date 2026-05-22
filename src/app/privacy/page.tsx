'use client';

import { useApp } from '@/context/AppContext';

export default function PrivacyPage() {
  const { lang } = useApp();

  const content = {
    en: {
      title: 'Privacy & Security Protocol',
      updated: 'Last updated: May 2026',
      intro: 'We treat your digital identity with maximum confidentiality. This profile statement details how user information parameters are processed and safeguarded within the AuraTV software environment loops.',
      sections: [
        { title: '1. Data Collection Scopes', text: 'We do not capture, log, monitor, or maintain visibility over the specific audio/visual programming feeds you access through your media player interface. Information parsed is restricted strictly to account authentication variables: your email address, securely hashed login passwords, and payment token validation stamps.' },
        { title: '2. Cryptographic Security', text: 'All transaction pipelines initiated through our secure upgrade dashboard utilize direct end-to-end cryptographic token exchanges provided directly by Stripe and Mercado Pago. AuraTV never stores raw credit card details, CVV codes, or full banking numbers on our storage grids.' },
        { title: '3. Metadata Encryption', text: 'Your personalized streaming connection configuration token is generated using secure automated random string allocations to guarantee your private connection parameters remain fully private.' }
      ]
    },
    es: {
      title: 'Protocolo de Privacidad y Seguridad',
      updated: 'Últina actualización: Mayo 2026',
      intro: 'Tratamos su identidad digital con la máxima confidencialidad. Esta declaración detalla cómo se procesan y salvaguardan los parámetros de información dentro de AuraTV.',
      sections: [
        { title: '1. Alcance de Recopilación de Datos', text: 'No capturamos, registramos ni mantenemos visibilidad sobre las señales específicas a las que accede a través de su interfaz. La información procesada se restringe estrictamente a variables de autenticación: dirección de correo electrónico, contraseñas encriptadas y marcas de validación de pago.' },
        { title: '2. Seguridad Criptográfica', text: 'Todos los flujos de transacciones iniciados a través de nuestro panel utilizan intercambios criptográficos directos proporcionados por Stripe y Mercado Pago. AuraTV nunca almacena detalles de tarjetas de crédito o códigos CVV en nuestros sistemas.' },
        { title: '3. Encriptación de Metadatos', text: 'Su token de configuración de transmisión personalizado se genera mediante asignaciones seguras automatizadas para garantizar que sus parámetros de conexión permanezcan privados.' }
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