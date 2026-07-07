'use client';

import { DoLogoutAction } from '@/presentation/actions/auth/DoLogout';
import clsx from 'clsx';
import { LogOutIcon } from 'lucide-react';

export function LogoutButton() {
  return (
    <form action={DoLogoutAction}>
      <button
        type='submit'
        className={clsx(
          'px-2 gap-2 flex w-full items-center m-1.5',
          'hover:cursor-pointer',
        )}
      >
        <LogOutIcon className='h-4 w-4' />
        Sair
      </button>
    </form>
  );
}
