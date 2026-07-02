'use client';

import clsx from 'clsx';
import { PasswordRule } from '../registeForm';
import { CheckIcon } from 'lucide-react';

type PasswordStrengthProps = {
  strength: number;
  passwordRule: PasswordRule[];
  password: string;
};

export function PasswordStrength({
  strength,
  passwordRule,
  password,
}: PasswordStrengthProps) {
  const strengthLabel =
    ['Muito fraca', 'Fraca', 'Razoável', 'Boa', 'Forte'][strength] ?? '';
  const strengthColor = [
    'bg-slate-200',
    'bg-red-400',
    'bg-amber-400',
    'bg-sky-500',
    'bg-emerald-500',
  ][strength];

  return (
    <div className={clsx('space-y-3')} aria-live='polite'>
      <div className={clsx('flex items-center gap-2')}>
        <div className={clsx('flex h-1.5 flex-1 gap-1')}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={clsx(
                'h-full flex-1 rounded-full transition-colors',
                `${i < strength ? strengthColor : 'bg-slate-200'}`,
              )}
            ></div>
          ))}
        </div>
        <span className='w-20 text-right text-xs font-medium text-slate-500'>
          {strengthLabel ? strengthLabel : ''}
        </span>
      </div>
      <ul className='grid grid-cols-2 gap-x-3 gap-y-1.5'>
        {passwordRule.map(rule => {
          const ok = rule.test(password);
          return (
            <li
              key={rule.label}
              className={clsx(
                'flex items-center gap-2 text-xs transition-colors',
                `${ok ? 'text-emerald-500' : 'text-slate-400'}`,
              )}
            >
              <span
                className={`grid h-3.5 w-3.5 place-items-center rounded-full ring-1 transition ${
                  ok
                    ? 'bg-emerald-500 ring-emerald-500 text-white'
                    : 'bg-white ring-slate-300'
                }`}
              >
                <CheckIcon className='h-2.5 w-2.5' strokeWidth={3} />
              </span>
              {rule.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
