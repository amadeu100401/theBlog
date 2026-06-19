'use client';

import { InputText } from '@/components/InputText';
import { MailIcon, UserIcon } from 'lucide-react';
import { PasswordStrength } from '../passwordStrength';
import { useMemo, useState } from 'react';

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
        />
        <InputText
          labelText='Email completo'
          name='email'
          placeholder='voce@exemplo.com'
          type='email'
          // defaultValue={formState.title}
          // disabled={isPending}
          icon={MailIcon}
        />
        <InputText
          labelText='Senha'
          name='password'
          placeholder='Crie uma senha segura'
          type='password'
          // defaultValue={formState.title}
          // disabled={isPending}
          icon={MailIcon}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className='mt-6'>
        <PasswordStrength
          strength={strength}
          passwordRule={passwordRules}
          password={password}
        />
      </div>
    </form>
  );
}
