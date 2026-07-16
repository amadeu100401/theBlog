'use client';

import { ArrowRightIcon, LockIcon } from 'lucide-react';
import { InputText } from '../../InputText';
import { PasswordStrength } from '../passwordStrength';
import { useMemo, useState } from 'react';
import { PasswordRule } from '../registeForm';
import clsx from 'clsx';
import { ButtonComponent } from '../../DefaultButton';

type ResetPasswordProps = {
  token: string;
  outOfTime: boolean;
};

export function ResetPassword({ token, outOfTime }: ResetPasswordProps) {
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isCheckTouched, setIsCheckTouched] = useState(false);

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

  const allRulesPassed = strength === passwordRules.length;
  const passwordsMatch = password === checkPassword;
  const canSendRequest = allRulesPassed && passwordsMatch && !outOfTime;

  const passwordHasError = isPasswordTouched && !allRulesPassed;
  const checkPasswordHasError =
    isCheckTouched && (!passwordsMatch || !allRulesPassed);

  return (
    <form className='w-full mb-8'>
      <div className='flex w-full flex-col gap-6'>
        <InputText
          labelText='Senha'
          name='password'
          placeholder='Crie uma senha segura'
          type='password'
          icon={LockIcon}
          onChange={e => {
            setPassword(e.target.value);
            setIsPasswordTouched(true);
          }}
          className={clsx(
            'bg-white h-11 rounded-xl',
            passwordHasError && 'border border-red-400 focus:ring-red-400',
          )}
          disabled={canSendRequest}
        />
      </div>

      <div className='mt-6'>
        <PasswordStrength
          strength={strength}
          passwordRule={passwordRules}
          password={password}
        />
      </div>

      <div className='mt-6'>
        <InputText
          labelText='Confirme a senha'
          name='confirmPassword'
          placeholder='repita a senha'
          type='password'
          icon={LockIcon}
          onChange={e => {
            setCheckPassword(e.target.value);
            setIsCheckTouched(true);
          }}
          className={clsx(
            'bg-white h-11 rounded-xl',
            checkPasswordHasError && 'border border-red-400 focus:ring-red-400',
          )}
          disabled={canSendRequest}
        />
      </div>

      <div className='mt-6'>
        <ButtonComponent
          styleType='custom'
          className={clsx(
            'flex justify-center items-center group',
            'flex-1 h-11 w-full gap-2 px-4 py-2 overflow-hidden',
            '[&_svg]:w-5 [&_svg]:h-5 rounded-xl',
            'text-white font-medium transition',
            'border border-slate-200 bg-slate-950 shadow-sm',
            'cursor-pointer hover:bg-slate-900',
            'disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500',
          )}
          rightIcon={
            <ArrowRightIcon className='transition-transform group-hover:translate-x-0.5' />
          }
          disabled={canSendRequest}
        >
          Redefinir senha
        </ButtonComponent>
      </div>
    </form>
  );
}
