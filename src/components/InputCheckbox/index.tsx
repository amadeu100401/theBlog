import clsx from 'clsx';
import { useId } from 'react';

type InputCheckboxProps = {
  labelText?: string;
  type?: 'checkbox';
} & React.ComponentProps<'input'>;

export function InputCheckbox({
  labelText = '',
  ...props
}: InputCheckboxProps) {
  const id = useId();

  return (
    <div className='flex items-center gap-3'>
      <input
        id={id}
        {...props}
        className={clsx(
          'w-4 h-4',
          'outline-none rounded-lg focus:ring-2 focus: ring-blue-500',
        )}
        type='checkbox'
      />

      {labelText && (
        <label className='text-base' htmlFor={id}>
          {labelText}
        </label>
      )}
    </div>
  );
}
