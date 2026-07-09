'use client';

import { ForgetPasswordAction } from '@/presentation/actions/auth/ForgetPassword';
import { ButtonComponent } from '@/presentation/components/DefaultButton';
import { InputText } from '@/presentation/components/InputText';
import clsx from 'clsx';
import { ArrowRightIcon, KeyRoundIcon, MailIcon } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';

type NoSendedEmailFormProps = {
  onValueChenge: (userEmail: string) => void;
};

export function NoSendedEmailForm({ onValueChenge }: NoSendedEmailFormProps) {
  const [state, formAction, isPending] = useActionState(
    ForgetPasswordAction,
    null,
  );

  const textInputClasses = clsx('bg-white h-11 rounded-xl');

  useEffect(() => {
    if (state !== null && state.success) {
      onValueChenge(state.email!);
    }
  }, [onValueChenge, state]);

  return (
    <>
      <header className='mb-8'>
        <div className='mb-4 grid h-11 w-11 place-items-center rounded-xl bg-slate-900 text-white shadow-sm'>
          <KeyRoundIcon className='h-5 w-5' />
        </div>
        <h1 className='text-2xl font-medium'>Recuperar Senha</h1>
        <p className='mt-2 text-sm text-slate-500'>
          Informe o e-mail da sua conta. Se ele estiver cadastrado, enviaremos
          um link seguro para você criar uma nova senha.
        </p>

        <form action={formAction} className='space-y-5' noValidate>
          <div className={clsx('flex flex-col mt-8 gap-6')}>
            <div>
              <InputText
                name='email'
                type='email'
                required
                labelText='Email'
                placeholder='seuemail@exemplo.com'
                className={textInputClasses}
                icon={MailIcon}
              />
            </div>

            <div>
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
                type='submit'
                rightIcon={
                  <ArrowRightIcon
                    className={clsx(
                      'transition-transform group-hover:translate-x-0.5',
                    )}
                  />
                }
                disabled={isPending}
              >
                Acessar conta
              </ButtonComponent>
            </div>

            <div className='text-sm font-light'>
              <p className='text-center text-xs text-slate-600'>
                Lembrou da senha?{' '}
                <Link
                  href={'/login'}
                  className='font-medium text-slate-900 underline-offset-4 hover:underline'
                >
                  Entrar
                </Link>
              </p>
            </div>
          </div>
        </form>
      </header>
    </>
  );
}
