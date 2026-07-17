import clsx from 'clsx';
import { LayersIcon, PaperclipIcon, StarIcon, UserIcon } from 'lucide-react';

export function AboutStatus() {
  const statusList = [
    {
      title: '250+',
      subTitle: 'Artigos publicados',
      logo: <PaperclipIcon className='h-5 w-5' />,
    },
    {
      title: '50K+',
      subTitle: 'Leitores mensais',
      logo: <UserIcon className='h-5 w-5' />,
    },
    {
      title: '12',
      subTitle: 'Categorias de conteúdos',
      logo: <LayersIcon className='h-5 w-5' />,
    },
    {
      title: '4.9',
      subTitle: 'Avaliação média dos leitores',
      logo: <StarIcon className='h-5 w-5' />,
    },
  ];
  return (
    <section className={clsx('py-2')}>
      <div className={clsx('grid gap-6 sm:grid-cols-2 lg:grid-cols-4')}>
        {statusList.map((status, index) => (
          <div
            className={clsx(
              'border border-slate-200 bg-white',
              'text-center shadow rounded-2xl p-6',
            )}
            key={index}
          >
            <div
              className={clsx(
                'flex flex-row justify-center items-center',
                'text-2xl font-bold tracking-tight gap-2 text-slate-900',
              )}
            >
              {status.logo}
              {status.title}
            </div>
            <div className='mt-1 text-sm font-medium text-slate-600'>
              {status.subTitle}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
