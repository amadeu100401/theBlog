type DefaultDivProps = {
  fieldErrors: string | undefined;
  children: React.ReactNode;
};

export function DefaultDiv({ fieldErrors, children }: DefaultDivProps) {
  const hasFieldErrors = fieldErrors !== null && fieldErrors !== undefined;
  return (
    <div className='flex flex-col gap-1'>
      {children}
      {hasFieldErrors && <p className='text-sm text-red-500'>{fieldErrors}</p>}
    </div>
  );
}
