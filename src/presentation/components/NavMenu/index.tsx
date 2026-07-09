import clsx from 'clsx';
import { BookOpenIcon } from 'lucide-react';
import { SearchInput } from './SearchHeader';
import { HeaderAuth } from './HeaderAuth';
import { DesktopNav } from './DesktopNav';
import { HeaderShell } from './HeaderShell';
import Link from 'next/link';
import { MobileNav } from './MobileNav';

export async function SiteHeader() {
  return (
    <HeaderShell>
      <div
        className={clsx(
          'px-4 mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 sm:px-6 lg:px-8',
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

        <div className='hidden md:flex flex-1 justify-center'>
          <DesktopNav />
        </div>

        {/* Right cluster */}
        <div className='flex items-center gap-2 sm:gap-4'>
          {/* A busca fica oculta em telas muito pequenas para dar espaço e surge em 'sm' */}
          <div className='hidden sm:block'>
            <SearchInput />
          </div>

          <HeaderAuth />

          {/* Menu Hamburguer (Aparece apenas abaixo de 'md') */}
          <MobileNav />
        </div>
      </div>
    </HeaderShell>
  );
}
