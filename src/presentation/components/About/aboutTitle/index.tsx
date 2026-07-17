import clsx from 'clsx';
import { HeartIcon } from 'lucide-react';

export function AboutTitle() {
  return (
    <section
      className={clsx(
        'relative mb-20 overflow-hidden rounded-3xl',
        'bg-slate-900 px-6 py-16 text-white',
        'sm:px-12 sm:py-24',
        'lg:px-16',
      )}
    >
      <div className='absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/5 blur-3xl' />
      <div className='absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl' />

      <div className={clsx('relative z-10 max-w-3xl')}>
        <span className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300'>
          <HeartIcon className='h-3.5 w-3.5 text-emerald-400' />
          Nossa história
        </span>
        <h1
          className={clsx(
            'mt-5 text-4xl font-bold tracking-tight',
            'sm:text-5xl lg:text-6xl',
          )}
        >
          Um blog feito para quem quer ir além do óbvio.
        </h1>
        <p
          className={clsx(
            'mt-5 max-w-2xl text-lg leading-relaxed text-slate-300',
          )}
        >
          The Blog é um espaço editorial independente onde tecnologia,
          produtividade, carreira e bem-estar se encontram. Nossa missão é
          publicar conteúdo que informa, inspira e empodera leitores a tomarem
          decisões melhores.
        </p>
      </div>
    </section>
  );
}
