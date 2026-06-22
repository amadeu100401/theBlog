'use client';

import { ButtonComponent } from '@/components/DefaultButton';
import { InputCheckbox } from '@/components/InputCheckbox';
import { InputText } from '@/components/InputText';
import clsx from 'clsx';
import {
  ArrowRightIcon,
  FingerprintIcon,
  LockIcon,
  MailIcon,
} from 'lucide-react';
import Link from 'next/link';

export function LoginForm() {
  const textInputClasses = clsx('bg-white h-11 rounded-xl');
  return (
    <form action='' className='w-full mb-8'>
      <div className='flex w-full flex-col gap-6'>
        <InputText
          labelText='Email completo'
          name='email'
          placeholder='voce@exemplo.com'
          type='email'
          // disabled={isPending}
          icon={MailIcon}
          className={textInputClasses}
          // onChange={e => setEmail(e.target.value)}
        />

        <div className='flex flex-col gap-1.5'>
          <div className='flex flex-row justify-between items-center'>
            <label className='text-sm font-normal'>Senha</label>
            <Link
              href='/recuperar-senha'
              className={clsx(
                'text-xs font-medium text-slate-500 hover:text-slate-700 underline-offset-4',
                'hover:underline transition',
              )}
            >
              Esqueceu a senha?
            </Link>
          </div>
          <InputText
            type='password'
            placeholder='Sua senha'
            icon={LockIcon}
            className={textInputClasses}
          />
        </div>

        <div className='flex w-full flex-row items-center justify-between'>
          <label
            className={clsx(
              'flex justify-center items-start cursor pointer transition',
              'gap-3',
            )}
          >
            <InputCheckbox name='stillConnected' type='checkbox' />
            <span className='text-xs text-slate-600'>Manter-me conectado</span>
          </label>

          <ButtonComponent
            styleType={'custom'}
            className={clsx(
              'flex flex-row items-center p-0 gap-1.5',
              'text-xs font-medium text-slate-500 transition hover:text-slate-900',
            )}
          >
            <FingerprintIcon className='h-3.5 w-3.5' />
            Entrar com Passkey
          </ButtonComponent>
        </div>
      </div>
      <div className='mt-6'>
        <ButtonComponent
          styleType='custom'
          className={clsx(
            'flex justify-center items-center group',
            'flex-1 h-11 w-full gap-2 px-4 py-2 overflow-hidden',
            '[&_svg]:w-5 [&_svg]:h-5 rounded-xl',
            'text-white font-medium transition',
            'boder border-slate-200 bg-slate-950 shadow-sm',
            'cursor-pointer hover:bg-slate-900',
            'disabled:cursor-not-allowed disabled:bg-slate-300',
          )}
          rightIcon={
            <ArrowRightIcon
              className={clsx(
                'transition-transform group-hover:translate-x-0.5',
              )}
            />
          }
          disabled={!true}
        >
          Acessar conta
        </ButtonComponent>
      </div>
    </form>
  );
}
