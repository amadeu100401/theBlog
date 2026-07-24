'use client';

import { maskedEmail } from '@/shared/util/mask-email';
import { ResetPassword } from '..';
import { RootErrorPage } from '../ResetPasswordFail';
import { HomeIcon, RefreshCwIcon } from 'lucide-react';
import Link from 'next/link';

interface ResetPasswordContentProps {
  isFail?: boolean;
  isTokenExpired: boolean;
  email: string | undefined;
}

export function ResetPasswordContent({
  isFail = false,
  isTokenExpired,
  email,
}: ResetPasswordContentProps) {
  const isExpired = isTokenExpired;

  const userEmail = email ?? '';

  return (
    <>
      <p className='mt-2 text-sm text-slate-500'>
        {userEmail.trim() !== '' ? (
          <>
            Redefinindo o acesso de{' '}
            <span className='font-medium text-slate-900'>
              {maskedEmail(userEmail)}
            </span>
            .{' '}
          </>
        ) : null}
      </p>

      <div className='mt-2 text-sm text-slate-500'>
        {isFail ? (
          <RootErrorPage
            message={
              isExpired
                ? 'O link de redefinição expirou. Solicite um novo link.'
                : 'Ocorreu um erro ao validar os dados.'
            }
          />
        ) : (
          'Escolha uma senha forte que você ainda não tenha usado.'
        )}
      </div>

      {!isFail ? (
        <ResetPassword email={userEmail} isTimeout={isExpired} />
      ) : (
        <div className='w-full flex flex-col sm:flex-row gap-3 mt-6'>
          <Link
            href='/'
            className='flex-1 inline-flex items-center justify-center gap-2 h-11 px-4 
            rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 
            hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] 
            transition-all duration-200 shadow-sm'
          >
            <HomeIcon className='h-4 w-4 text-slate-400' />
            Home
          </Link>

          <Link
            href='/forgot-password'
            className='grow-[1.5] inline-flex items-center justify-center gap-2 h-11 px-5 
            rounded-xl bg-slate-900 text-sm font-medium text-white 
            hover:bg-slate-800 active:scale-[0.98] 
            transition-all duration-200 shadow-md shadow-slate-950/5'
          >
            <RefreshCwIcon className='h-4 w-4 text-slate-300' />
            Solicitar novo código
          </Link>
        </div>
      )}
    </>
  );
}
