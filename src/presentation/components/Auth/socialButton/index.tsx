'use client';

import { ButtonComponent } from '@/presentation/components/DefaultButton';
import clsx from 'clsx';

type SocialButtonProps = {
  provider: 'google' | 'github';
};

export function SocialButton({ provider }: SocialButtonProps) {
  const providers = {
    google: {
      label: 'Google',
      icon: <GoogleIcon />,
    },
    github: {
      label: 'GitHub',
      icon: <GithubIcon />,
    },
  } as const;

  const { label, icon } = providers[provider];

  const buttonClasses = clsx(
    'flex h-11 items-center justify-center',
    'w-full py-5 cursor-pointer',
    'gap-2 rounded-xl border border-slate-200 bg-white',
    'text-sm font-medium text-slate-700 shadow-sm',
    'transition hover:border-slate-300 hover:bg-slate-50',
  );

  return (
    <ButtonComponent type='button' styleType='custom' className={buttonClasses}>
      {icon}
      {label}
    </ButtonComponent>
  );
}

function GoogleIcon() {
  return (
    <svg className='h-4 w-4' viewBox='0 0 48 48' aria-hidden>
      <path
        fill='#FFC107'
        d='M43.6 20.5H42V20H24v8h11.3C33.7 32.3 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.3 2.8l5.7-5.7C33.6 6.7 29 5 24 5 13.5 5 5 13.5 5 24s8.5 19 19 19 19-8.5 19-19c0-1.2-.1-2.3-.4-3.5z'
      />
      <path
        fill='#FF3D00'
        d='M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c2.8 0 5.3 1 7.3 2.8l5.7-5.7C33.6 6.7 29 5 24 5 16.3 5 9.7 9.3 6.3 14.7z'
      />
      <path
        fill='#4CAF50'
        d='M24 43c5 0 9.5-1.9 12.9-5l-6-5c-2 1.4-4.4 2.2-6.9 2.2-5.3 0-9.7-2.7-11.3-7l-6.5 5C9.5 38.6 16.2 43 24 43z'
      />
      <path
        fill='#1976D2'
        d='M43.6 20.5H42V20H24v8h11.3c-.7 2-2.1 3.7-3.9 4.9l6 5c-.4.4 6.6-4.8 6.6-13.9 0-1.2-.1-2.3-.4-3.5z'
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      className='h-4 w-4'
      viewBox='0 0 24 24'
      fill='currentColor'
      aria-hidden
    >
      <path d='M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z' />
    </svg>
  );
}
