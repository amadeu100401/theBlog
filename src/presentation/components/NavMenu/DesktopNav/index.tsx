import {
  BookOpenIcon,
  FileTextIcon,
  LayoutGridIcon,
  PenSquareIcon,
} from 'lucide-react';
import Link from 'next/link';

const nav = [
  { to: '/', label: 'Início', icon: LayoutGridIcon },
  { to: '/', label: 'Blog', icon: BookOpenIcon },
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
            className='rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900'
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
