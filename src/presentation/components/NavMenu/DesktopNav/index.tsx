import clsx from 'clsx';
import { FileTextIcon, LayoutGridIcon, PenSquareIcon } from 'lucide-react';
import Link from 'next/link';

const nav = [
  { to: '/', label: 'Início', icon: LayoutGridIcon },
  { to: '/', label: 'Categorias', icon: FileTextIcon },
  { to: '/', label: 'Sobre', icon: PenSquareIcon },
] as const;

export function DesktopNav() {
  return (
    <>
      <nav className='hidden items-center gap-1 md:flex'>
        {nav.map(item => (
          <Link
            key={item.label}
            href={item.to}
            className={clsx(
              'rounded-md px-3 py-2 text-sm font-medium',
              ' text-slate-600 transition-all duration-200 hover:scale-[1.00]',
              ' hover:text-slate-900 active:scale-[0.99]',
              'underline-offset-4 hover:underline',
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
