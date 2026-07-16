import { clsx } from 'clsx';
import { Slot } from '@radix-ui/react-slot';

type ButtonVariants = 'default' | 'danger' | 'custom' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonComponentProps = {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  styleType: ButtonVariants;
  size?: ButtonSize;
  asChild?: boolean;
} & React.ComponentProps<'button'>;

export function ButtonComponent({
  leftIcon,
  rightIcon,
  styleType: buttonType = 'default',
  size = 'md',
  asChild = false,
  children,
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
    default: clsx('bg-blue-500 text-blue-100 hover:bg-blue-600', commonStyle),
    ghost: clsx(
      'bg-transparent text-slate-700 hover:bg-slate-100',
      commonStyle,
    ),
    danger: clsx('bg-red-600 hover:bg-red-800 text-red-100', commonStyle),
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

  const Component = asChild ? Slot : 'button';

  return (
    <Component
      {...props}
      className={buttonType === 'custom' ? props.className : buttonClasses}
    >
      {leftIcon && (
        <span className='inline-flex shrink-0 items-center'>{leftIcon}</span>
      )}

      {children}

      {rightIcon && (
        <span className='inline-flex shrink-0 items-center'>{rightIcon}</span>
      )}
    </Component>
  );
}
