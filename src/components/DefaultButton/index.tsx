import { clsx } from 'clsx';

type ButtonVariants = 'default' | 'danger' | 'custom' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonComponentProps = {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  styleType: ButtonVariants;
  size?: ButtonSize;
} & React.ComponentProps<'button'>;

export function ButtonComponent({
  leftIcon,
  rightIcon,
  styleType: buttonType = 'default',
  size = 'md',
  ...props
}: ButtonComponentProps) {
  const commonStyle = clsx(
    'flex items-center justify-center',
    'transition',
    'py-2 px-4 cursor-pointer',
    'disabled:bg-slate-200',
    'disabled:text-slate-400',
    'disabled:cursor-default',
  );

  const style: Record<ButtonVariants, string> = {
    default: clsx(
      'bg-blue-500 text-blue-100 hover:bg-blue-600 transition',
      commonStyle,
    ),

    ghost: clsx(
      'bg-slate-300 text-slate-900 hover:bg-slate-400 transition',
      commonStyle,
    ),

    danger: clsx(
      'bg-red-600 hover:bg-red-800 text-red-100 transition',
      commonStyle,
    ),

    custom: '',
  };

  const buttonSizes: Record<ButtonSize, string> = {
    sm: clsx(
      'text-xs/tight py-1 px-1',
      'rounded-sm',
      '[&_svg]:w-3 [&_svg]:h-3',
      'gap-1',
    ),
    md: clsx(
      'text-base/tight py-2 px-4',
      'rounded-md',
      '[&_svg]:w-4 [&_svg]:h-4',
      'gap-2',
    ),
    lg: clsx(
      'text-lg/tight py-4 px-6',
      'rounded-lg',
      '[&_svg]:w-5 [&_svg]:h-5',
      'gap-3',
    ),
  };

  const buttonClasses = clsx(
    style[buttonType],
    buttonSizes[size],
    props.className,
  );

  return (
    <button className={buttonClasses} {...props}>
      {leftIcon}
      {props.children}
      {rightIcon}
    </button>
  );
}
