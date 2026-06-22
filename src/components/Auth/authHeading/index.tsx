'use client';

import clsx from 'clsx';
import Link from 'next/link';

type AuthHeading = {
  type: 'create' | 'login';
};

export function AuthHeading({ type }: AuthHeading) {
  const authContent = {
    create: {
      title: 'Criar sua conta',
      label: 'Já possui uma conta? ',
      href: '/login',
      linkLabel: 'Entrar',
    },
    login: {
      title: 'Fazer login',
      label: 'Ainda não possui uma conta? ',
      href: '/register',
      linkLabel: 'Criar conta',
    },
  } as const;

  const content = authContent[type];

  return (
    <header className='mb-6 space-y-1'>
      <h1 className='text-2xl sm:text-3xl font-bold tracking-tight items-start'>
        {content.title}
      </h1>
      <p className='text-sm text-slate-500'>
        {content.label}
        <Link
          href={content.href}
          className={clsx(
            'font-medium text-slate-700',
            'hover:underline hover:underline-offset-3 hover:text-slate-900',
          )}
        >
          {content.linkLabel}
        </Link>
      </p>
    </header>
  );
}
