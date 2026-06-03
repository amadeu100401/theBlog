import clsx from 'clsx';

export type ButtonComponentProps = {
  icon?: React.ReactNode;
  buttonType: 'confirm' | 'cancel' | 'default';
  text?: string;
} & React.ComponentProps<'button'>;

export function ButtonComponent({
  icon,
  buttonType = 'default',
  text,
  ...props
}: ButtonComponentProps) {
  const commonStyle = clsx(
    'felx items-center justify-center py-2 px-4',
    'cursor-pointer rounded-lg',
    'disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-default',
  );

  const style = {
    confirm: clsx('bg-blue-500 text-blue-50', 'hover:bg-blue-600 transition'),
    cancel: clsx(
      'bg-slate-300 text-slate-950',
      'hover:bg-slate-400 transition',
    ),
    default: '',
  };

  return (
    <button className={clsx(`${style[buttonType]}`, commonStyle)} {...props}>
      {icon == null ? text : icon}
    </button>
  );
}
