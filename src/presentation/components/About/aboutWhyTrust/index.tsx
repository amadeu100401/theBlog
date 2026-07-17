import clsx from 'clsx';
import { ShieldCheckIcon } from 'lucide-react';
import Image from 'next/image';

export function AboutWhyTrust() {
  const tips = [
    'Artigos revisados antes de serem publicados',
    'Fontes citadas e verificáveis',
    'Atualização periódica de conteúdos desatualizados',
    'Comentários moderados para manter o respeito',
    'Zero publicidade enganosa ou patrocínio oculto',
  ];
  return (
    <section
      className={clsx(
        'mb-20 rounded-3xl bg-white p-8',
        'border border-slate-200 sm:p-12',
      )}
    >
      <div className={clsx('grid gap-10 lg:grid-cols-2')}>
        <div>
          <h2 className={clsx('text-3xl font-bold text-slate-900')}>
            Por que confiar no The Blog?
          </h2>

          <p className='mt-5 text-md font-light text-slate-700'>
            Em um mar de informações, escolhemos ser um porto seguro. Nosso
            processo editorial exige revisão, fontes verificáveis e atualização
            constante dos artigos.
          </p>

          <ul className='mt-6 space-y-3'>
            {tips.map(item => (
              <li
                key={item}
                className='flex items-start gap-3 text-sm text-slate-700'
              >
                <ShieldCheckIcon className='mt-0.5 h-4 w-4 shrink-0 text-emerald-500' />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={clsx('flex items-center justify-center')}>
          <div className='relative w-full max-w-md overflow-hidden rounded-2xl'>
            <Image
              src={
                'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80'
              }
              alt={'Equipe colaborando em um ambiente de trabalho moderno'}
              className='h-full w-full object-cover'
              width={900}
              height={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
