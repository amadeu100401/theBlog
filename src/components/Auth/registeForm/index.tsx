'use client';

import { InputText } from '@/components/InputText';
import { ArrowRightIcon, LockIcon, MailIcon, UserIcon } from 'lucide-react';
import { PasswordStrength } from '../passwordStrength';
import { useMemo, useState } from 'react';
import { ButtonComponent } from '@/components/DefaultButton';
import clsx from 'clsx';
import { InputCheckbox } from '@/components/InputCheckbox';
import Link from 'next/link';

export type PasswordRule = { label: string; test: (v: string) => boolean };

export function RegisterUserForm() {
  const [password, setPassword] = useState('');

  const passwordRules: PasswordRule[] = useMemo(
    () => [
      { label: 'Pelo menos 8 caracteres', test: v => v.length >= 8 },
      { label: 'Uma letra maiúscula', test: v => /[A-Z]/.test(v) },
      { label: 'Um número', test: v => /\d/.test(v) },
      { label: 'Um caractere especial', test: v => /[^A-Za-z0-9]/.test(v) },
    ],
    [],
  );

  const strength = useMemo(
    () => passwordRules.filter(r => r.test(password)).length,
    [password, passwordRules],
  );

  const textInputClasses = clsx('bg-white');
  const linkClasses = clsx('hover:underline font-medium');

  return (
    <form className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText
          labelText='Nome completo'
          name='name'
          placeholder='Como devemos te chamar?'
          type='text'
          // defaultValue={formState.title}
          // disabled={isPending}
          icon={UserIcon}
          className={textInputClasses}
        />
        <InputText
          labelText='Email completo'
          name='email'
          placeholder='voce@exemplo.com'
          type='email'
          // defaultValue={formState.title}
          // disabled={isPending}
          icon={MailIcon}
          className={textInputClasses}
        />
        <InputText
          labelText='Senha'
          name='password'
          placeholder='Crie uma senha segura'
          type='password'
          // defaultValue={formState.title}
          // disabled={isPending}
          icon={LockIcon}
          onChange={e => setPassword(e.target.value)}
          className={textInputClasses}
        />
      </div>
      <div className='mt-6'>
        <PasswordStrength
          strength={strength}
          passwordRule={passwordRules}
          password={password}
        />
      </div>
      <div className='mt-5 flex flex-col justify-center'>
        <label
          className={clsx(
            'flex items-start cursor-pointer transition',
            'border border-slate-200',
            'bg-white ring-slate-300',
            'p-3 gap-3 ',
            'shadow-sm rounded-xl',
          )}
        >
          <InputCheckbox
            name='acceptTerms'
            type='checkbox'
            // defaultChecked={}
            disabled={false}
          />
          <span className='text-sm/tight font-light'>
            Eu li e concordo os{' '}
            <Link href='#' className={linkClasses}>
              Termos de Uso
            </Link>{' '}
            e a{' '}
            <Link href='#' className={linkClasses}>
              Política de Privacidade
            </Link>
          </span>
        </label>
      </div>
      <div className='mt-6 flex flex-row justify-center'>
        <ButtonComponent
          styleType='custom'
          className={clsx(
            'flex justify-center items-center group',
            'h-11 w-full gap-2 px-4 py-2 overflow-hidden',
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
        >
          Cria conta
        </ButtonComponent>
      </div>
    </form>
  );
}
