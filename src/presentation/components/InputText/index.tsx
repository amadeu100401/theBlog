'use client';

import clsx from 'clsx';
import { ComponentProps, ComponentType, useId, useState } from 'react';
import { ButtonComponent } from '../DefaultButton';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

type InputTextProps = {
  labelText?: string;
  hasError?: boolean;
  icon?: ComponentType<ComponentProps<'svg'>>;
} & React.ComponentProps<'input'>;

export function InputText({
  labelText = '',
  hasError = false,
  icon: Icon,
  ...props
}: InputTextProps) {
  const validInputTypes = [
    'text',
    'password',
    'email',
    'tel',
    'search',
    'url',
    'number',
  ] as const;

  type InputType = (typeof validInputTypes)[number];

  const isPasswordType = props.type === 'password';

  const inputType: InputType =
    props.type &&
    (validInputTypes as readonly InputType[]).includes(props.type as InputType)
      ? (props.type as InputType)
      : validInputTypes[0];

  const [showPassword, setShowPassword] = useState(false);

  const computedInputType = isPasswordType && showPassword ? 'text' : inputType;

  const id = useId();

  const inputFieldClasses = clsx(
    'flex h-9 w-full border border-slate-200 bg-transparent outline-none text-base/tight',
    'rounded-md p-2 shadow-sm transition-colors',
    'ring-offset-background focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring',
    'placeholder:text-slate-400',
    'disabled:bg-slate-200 disabled:text-slate-400 disabled:placeholder-slate-300 disabled:cursor-not-allowed',
    'read-only:bg-slate-100 read-only:text-slate-400 md:text-sm',

    Icon ? 'pl-10' : 'pl-3',

    isPasswordType ? 'pr-10' : 'pr-3',

    props.className,
    hasError
      ? ' ring-red-500 focus:ring-red-600'
      : ' ring-slate-300 focus:ring-[1.5px] focus:ring-[oklch(0.704_0.04_256.788)]',
  );

  const showLabel = labelText && !props.hidden;

  return (
    <div className='flex flex-col gap-2'>
      {showLabel && (
        <label className='text-sm font-semibold' htmlFor={id}>
          {labelText}
        </label>
      )}
      <div className='relative w-full flex items-center'>
        {Icon && (
          <div className='pointer-events-none absolute left-3 flex items-center text-center text-slate-400'>
            <Icon className='h-4 w-4' aria-hidden='true' />
          </div>
        )}
        <input
          id={id}
          {...props}
          className={inputFieldClasses}
          type={computedInputType}
          suppressHydrationWarning={true}
        />
        {isPasswordType && (
          <ButtonComponent
            type='button'
            styleType={'custom'}
            onClick={() => setShowPassword(!showPassword)}
            className={clsx(
              'absolute right-3 flex items-center',
              'bg-transparent text-slate-400 focus:outline-none',
              'hover:text-slate-600 hover:cursor-pointer transition-colors',
            )}
            title={showPassword ? 'Esconder senha' : 'Mostrar senha'}
          >
            {showPassword ? (
              <EyeOffIcon className='h-4 w-4' aria-hidden='true' />
            ) : (
              <EyeIcon className='h-4 w-4' aria-hidden='true' />
            )}
          </ButtonComponent>
        )}
      </div>
    </div>
  );
}
