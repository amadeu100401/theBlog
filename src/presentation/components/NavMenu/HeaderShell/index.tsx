'use client';

import clsx from 'clsx';
import { PropsWithChildren, useEffect, useState } from 'react';

export function HeaderShell({ children }: PropsWithChildren) {
  const [scrolled, setScrolled] = useState(false);

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
      {children}
    </header>
  );
}
