import clsx from 'clsx';
import { BookOpenIcon } from 'lucide-react';
import { SearchInput } from './SearchHeader';
import { HeaderAuth } from './HeaderAuth';
import { DesktopNav } from './DesktopNav';
import { HeaderShell } from './HeaderShell';
import Link from 'next/link';

export async function SiteHeader() {
  return (
    <HeaderShell>
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

        <DesktopNav />

        {/* Right cluster */}
        <div className='flex items-center gap-2'>
          <SearchInput />

          <HeaderAuth />
        </div>
      </div>
    </HeaderShell>
  );
}
