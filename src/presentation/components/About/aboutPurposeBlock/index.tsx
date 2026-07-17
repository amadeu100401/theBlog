import clsx from 'clsx';
import { GlobeIcon, TargetIcon } from 'lucide-react';

export function AboutPurposeBlock() {
  const iconClasses = clsx('h-6 w-6');
  const blocks = [
    {
      Icon: <TargetIcon className={iconClasses} />,
      Title: 'Missão',
      Subtitle:
        'Democratizar o acesso a ideias valiosas. Queremos que qualquer pessoa, em qualquer lugar, encontre conteúdo de qualidade que a ajude a aprender algo novo, resolver um problema ou enxergar o mundo sob outra perspectiva.',
    },
    {
      Icon: <GlobeIcon className={iconClasses} />,
      Title: 'Visão',
      Subtitle:
        'Ser referência em conteúdo editorial na internet brasileira: um lugar onde leitores se sentem em casa, autores são reconhecidos e a qualidade sempre vence a quantidade.',
    },
  ];
  return (
    <section className='py-16'>
      <div className={clsx('grid gap-6 sm:grid-cols-1 lg:grid-cols-2')}>
        {blocks.map((block, index) => (
          <div
            key={index}
            className={clsx(
              'flex flex-col justify-start gap-2',
              'bg-white border border-slate-200 rounded-2xl',
              'p-6',
            )}
          >
            <div className='flex flex-row gap-2 items-center'>
              <div className='rounded  text-slate-900 p-2'>{block.Icon}</div>
              <div className='text-2xl font-bold'>{block.Title}</div>
            </div>
            <div className='text-slate-700 text-justify'>{block.Subtitle}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
