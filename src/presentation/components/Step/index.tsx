import clsx from 'clsx';

type StepPorps = {
  number: number;
  title: string;
  desc: string;
};

export function Step({ number, title, desc }: StepPorps) {
  return (
    <div key={number} className='flex gap-3 items-center'>
      <div
        className={clsx(
          'grid h-6 w-6 shrink-0 place-items-center',
          'rounded-full bg-slate-900 text-[11px]',
          'font-semibold text-white',
        )}
      >
        {number}
      </div>
      <div>
        <div className='text-sm font-medium text-slate-900'>{title}</div>
        <div className='text-xs text-slate-500'>{desc}</div>
      </div>
    </div>
  );
}
