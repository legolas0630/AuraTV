'use client';

import { useApp } from '@/context/AppContext';

export default function DMCAPage() {
  const { lang } = useApp();

  const content = {
    en: {
      title: 'Intellectual Property Protection (DMCA)',
      updated: 'Last updated: May 2026',
      intro: 'AuraTV strictly respects intellectual property boundaries. We operate fully within international Safe Harbor statutory frameworks as an independent, neutral system index tool mapping unencrypted digital transmissions.',
      sections: [
        { title: '1. Zero Storage Safe Harbor', text: 'AuraTV does not contain, broadcast, host, cache, encode, or store actual video file bundles or multimedia streams anywhere on our servers. Our protocol simply organizes data arrays that point to public, unencrypted Free-to-Air (FTA) signals available across the open web.' },
        { title: '2. Takedown Procedures', text: 'If you represent an authorized broadcast network or legal rights holder and believe a specific network link indexed inside our platform interface infringes upon your copyright allocations, you can request immediate removal from our dynamic index.' },
        { title: '3. Request Formatting', text: 'All removal notices must include clear identification of the protected work, a direct verification of ownership rights, and contact variables. Upon parsing valid compliance documentation, our DevOps engineering team will erase the index mapping definition from our servers within 48 hours.' }
      ]
    },
    es: {
      title: 'Protección de Derechos de Autor (DMCA)',
      updated: 'Última actualización: Mayo 2026',
      intro: 'AuraTV respeta estrictamente los límites de la propiedad intelectual. Operamos plenamente dentro de los marcos del Puerto Seguro como una herramienta de indexación independiente y neutral.',
      sections: [
        { title: '1. Puerto Seguro sin Almacenamiento', text: 'AuraTV no contiene, transmite, aloja ni almacena archivos de video o flujos multimedia en sus servidores. Nuestro protocolo simplemente organiza cadenas de datos que apuntan a señales de Señal Abierta (FTA) accesibles en la web abierta.' },
        { title: '2. Procedimiento de Retirada', text: 'Si representa a una red de transmisión autorizada o titular de derechos legales y cree que un enlace indexado dentro de nuestra interfaz infringe sus derechos, puede solicitar su eliminación inmediata de nuestra matriz.' },
        { title: '3. Formato de Solicitud', text: 'Todos los avisos de eliminación deben incluir la identificación del trabajo protegido, verificación directa de la titularidad y datos de contacto. Tras procesar la documentación válida, nuestro equipo de ingeniería borrará el mapeo en un plazo de 48 horas.' }
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