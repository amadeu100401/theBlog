// src/presentation/components/NavMenu/MobileNav/index.tsx
'use client';

import { useState } from 'react';
import {
  Search,
  Menu,
  X,
  User,
  FileText,
  LayoutGridIcon,
  FileTextIcon,
  PenSquareIcon,
} from 'lucide-react';
import Link from 'next/link';
import { userSession } from '../../AccountMenu';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import { SearchInput } from '../SearchHeader';

interface MobileNavProps {
  user?: userSession; // Substitua pelo tipo real do seu usuário se tiver
}

export function MobileNav({ user }: MobileNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const nav = [
    { to: '/', label: 'Início', icon: LayoutGridIcon },
    { to: '/', label: 'Categorias', icon: FileTextIcon },
    { to: '/', label: 'Sobre', icon: PenSquareIcon },
  ];

  return (
    <div className='w-full md:hidden'>
      <div className='flex items-center gap-2'>
        <button
          type='button'
          onClick={() => setSearchOpen(true)}
          aria-label='Buscar'
          className='hidden h-9 w-9 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 md:inline-flex lg:hidden'
        >
          <Search className='h-4 w-4' />
        </button>

        <button
          type='button'
          aria-label='Abrir menu'
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(v => !v)}
          className='inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none'
        >
          {mobileOpen ? (
            <X className='h-5 w-5' />
          ) : (
            <Menu className='h-5 w-5' />
          )}
        </button>
      </div>

      {/* Componente de Busca (Modal/Command) */}
      <SearchInput />

      <div
        className={clsx(
          'absolute left-0 right-0 top-16 z-50 grid overflow-hidden border-b border-slate-200 bg-white transition-[grid-template-rows] duration-300 ease-in-out md:hidden',
          mobileOpen
            ? 'grid-rows-[1fr] shadow-lg'
            : 'grid-rows-[0fr] border-transparent',
        )}
      >
        <div className='min-h-0'>
          <nav className='flex flex-col gap-1 px-4 py-4'>
            <button
              type='button'
              onClick={() => {
                setMobileOpen(false);
                setSearchOpen(true);
              }}
              className='mb-2 flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-500 hover:bg-white transition-colors text-left w-full'
            >
              <Search className='h-4 w-4' />
              Buscar no blog...
            </button>

            {nav.map(item => (
              <Link
                key={item.label}
                href={item.to} // No Next.js usamos 'href' em vez de 'to'
                onClick={() => setMobileOpen(false)}
                className='flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors'
              >
                <item.icon className='h-4 w-4 text-slate-500' />
                {item.label}
              </Link>
            ))}

            <div className='my-2 h-px bg-slate-200' />

            {user ? (
              <>
                <Link
                  href='/perfil'
                  onClick={() => setMobileOpen(false)}
                  className='flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors'
                >
                  <User className='h-4 w-4 text-slate-500' /> Meu perfil
                </Link>
                <Link
                  href='/admin/posts'
                  onClick={() => setMobileOpen(false)}
                  className='flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors'
                >
                  <FileText className='h-4 w-4 text-slate-500' /> Meus posts
                </Link>
              </>
            ) : (
              <div className='flex flex-col gap-2 pt-1'>
                <Link href='/login' onClick={() => setMobileOpen(false)}>
                  <Button variant='outline' className='w-full justify-center'>
                    Entrar
                  </Button>
                </Link>
                <Link href='/register' onClick={() => setMobileOpen(false)}>
                  <Button className='w-full justify-center bg-slate-900 text-white hover:bg-slate-800'>
                    Criar conta
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
