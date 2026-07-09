import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <div className='grow min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100'>
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>{children}</main>
    </div>
  );
}
