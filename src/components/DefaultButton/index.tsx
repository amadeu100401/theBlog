import clsx from 'clsx';

export type ButtonComponentProps = {
  icon?: React.ReactNode;
  buttonType?: 'confirm' | 'cancel' | 'default';
  text?: string;
} & React.ComponentProps<'button'>;

export function ButtonComponent({
  icon,
  buttonType = 'default',
  text,
  className,
  children,
  ...props
}: ButtonComponentProps) {
  const commonStyle = clsx(
    'flex items-center justify-center gap-2',
    'py-2 px-4 rounded-lg cursor-pointer',
    'disabled:bg-slate-200',
    'disabled:text-slate-400',
    'disabled:cursor-default',
  );

  const style = {
    confirm: 'bg-blue-500 text-blue-50 hover:bg-blue-600 transition-colors',

    cancel: 'bg-slate-300 text-slate-950 hover:bg-slate-400 transition-colors',

    default: '',
  };

  return (
    <button
      className={clsx(commonStyle, style[buttonType], className)}
      {...props}
    >
      {icon}
      {text}
      {children}
    </button>
  );
}
