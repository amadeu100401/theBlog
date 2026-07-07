'use client';

import clsx from 'clsx';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

export function SearchInput() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className='flex items-center gap-2'>
      {' '}
      <button
        type='button'
        onClick={() => setSearchOpen(true)}
        aria-label='Buscar'
        className={clsx(
          'hidden h-9 items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80',
          'px-3 text-sm text-slate-500 shadow-sm transition-colors hover:border-slate-300 hover:bg-white hover:text-slate-700 lg:inline-flex lg:w-64',
        )}
      >
        <SearchIcon className='h-4 w-4 shrink-0' />
        <span className='flex-1 text-left'>Buscar no blog...</span>
        <kbd className='hidden select-none items-center gap-0.5 rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px] font-medium text-slate-500 lg:inline-flex'>
          ⌘K
        </kbd>
      </button>
    </div>
  );
}
