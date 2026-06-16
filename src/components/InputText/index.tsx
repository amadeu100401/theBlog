import clsx from 'clsx';
import { useId } from 'react';

type InputTextProps = {
  labelText?: string;
} & React.ComponentProps<'input'>;

export function InputText({ labelText = '', ...props }: InputTextProps) {
  const id = useId();

  const validInputTypes = [
    'text',
    'password',
    'email',
    'tel',
    'search',
    'url',
    'number',
  ] as const;

  const inputFieldClasses = clsx(
    'bg-white outline-none text-base/tight',
    'ring-2 ring-slate-400 rounded',
    'p-2 transition focus:ring-blue-600',
    'placeholder:text-slate-300',
    'disabled:bg-slate-200 disabled:text-slate-400 disabled:placeholder-slate-300',
    'read-only:bg-slate-100',
    props.className,
  );

  type InputType = (typeof validInputTypes)[number];

  const inputType: InputType =
    props.type &&
    (validInputTypes as readonly InputType[]).includes(props.type as InputType)
      ? (props.type as InputType)
      : validInputTypes[0];

  const showLabel = labelText && !props.hidden;

  return (
    <div className='flex flex-col gap-2'>
      {showLabel && (
        <label className='text-sm' htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        id={id}
        {...props}
        className={inputFieldClasses}
        type={inputType}
      />
    </div>
  );
}
