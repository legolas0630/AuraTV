'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();
  if (pathname === '/') return null;

  const pathSegments = pathname.split('/').filter((item) => item);

  return (
    <div className="w-full bg-[#f4f4f7] dark:bg-[#060608] transition-colors duration-200">
      <nav className="max-w-7xl mx-auto px-6 pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
        <Link href="/" className="hover:text-violet-500 transition">INDEX</Link>
        
        {pathSegments.map((segment, idx) => {
          const pathUrl = `/${pathSegments.slice(0, idx + 1).join('/')}`;
          const isLast = idx === pathSegments.length - 1;

          return (
            <div key={idx} className="flex items-center gap-2">
              <span className="opacity-40">/</span>
              {isLast ? (
                <span className="text-violet-600 dark:text-violet-400 font-black">{segment}</span>
              ) : (
                <Link href={pathUrl} className="hover:text-violet-500 transition">{segment}</Link>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}