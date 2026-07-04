'use client';

import clsx from 'clsx';
import {
  BookOpenIcon,
  FileTextIcon,
  LayoutGridIcon,
  PenSquareIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AccountMenu } from '../AccountMenu';
import { AuthButtons } from '../AuthButtons';
import { SearchInput } from '../SearchHeader';

export type userSession = {
  name: string;
  email: string;
  avatarUrl: string | undefined | null;
} | null;

interface SiteHeaderProps {
  initialUser: userSession;
}

const nav = [
  { to: '/', label: 'Início', icon: LayoutGridIcon },
  { to: '/', label: 'Blog', icon: BookOpenIcon },
  { to: '/', label: 'Categorias', icon: FileTextIcon },
  { to: '/', label: 'Sobre', icon: PenSquareIcon },
] as const;

export function SiteHeader({ initialUser }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user] = useState<userSession>(initialUser); //TODO: Pegar da session atual
  // const [user] = useState<userSession>({
  //   name: 'Amadeu Martim',
  //   email: 'amadeumartim@gmail.com',
  //   avatarUrl:
  //     'https://img.magnific.com/vetores-premium/uma-pessoa-com-uma-camisa-azul-que-diz-o-nome-da-pessoa_1029948-7040.jpg?semt=ais_hybrid&w=740&q=80',
  // });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 w-full transition-all duration-500',
        scrolled
          ? 'border-b border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-sm'
          : 'border-b border-slate-200/50 bg-white/90 backdrop-blur-md',
      )}
    >
      <div
        className={clsx(
          'mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 sm:px-6 lg:px-8',
        )}
      >
        <Link href={'/'} className='group flex items-center gap-2'>
          <span className='grid h-8 w-8 place-items-center rounded-lg bg-slate-900 text-white shadow-sm ring-1 ring-slate-900/10 transition-transform group-hover:scale-105'>
            <BookOpenIcon className='h-4 w-4' />
          </span>
          <span className='text-base font-semibold tracking-tight text-slate-900'>
            The Blog
          </span>
        </Link>

        {/* Desktop nav */}
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

        {/* Right cluster */}
        <div className='flex items-center gap-2'>
          <SearchInput />

          {user ? <AccountMenu user={user} /> : <AuthButtons />}
        </div>
      </div>
    </header>
  );
}
