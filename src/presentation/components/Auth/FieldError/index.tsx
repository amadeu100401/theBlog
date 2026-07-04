import clsx from 'clsx';

type FieldErrorProps = {
  errors?: string[];
};

export function FieldError({ errors }: FieldErrorProps) {
  // Se não houver erros para o campo, não renderiza nada no DOM
  if (!errors || errors.length === 0) return null;

  return (
    <span
      className={clsx(
        'text-xs font-medium text-red-500 mt-1 animate-in fade-in duration-200',
      )}
    >
      {errors[0]}
    </span>
  );
}
