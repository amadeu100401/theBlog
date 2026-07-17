import clsx from 'clsx';

export function AboutTimeLine() {
  const timeline = [
    {
      Year: '2021',
      Title: 'O início',
      Content:
        'The Blog nasceu de um caderno de anotações e a vontade de transformar ideias em textos que realmente ajudassem pessoas.',
    },
    {
      Year: '2022',
      Title: 'Primeira comunidade',
      Content:
        'Começamos a publicar semanalmente e conquistamos nossos primeiros mil leitores fiéis em tecnologia e produtividade.',
    },
    {
      Year: '2023',
      Title: 'Expansão de categorias',
      Content:
        'De blog técnico, evoluímos para um espaço editorial completo: carreira, bem-estar, comunicação e criatividade.',
    },
    {
      Year: '2024',
      Title: 'Plataforma moderna',
      Content:
        'Reconstruímos a experiência do zero com foco em velocidade, busca inteligente, segurança e acessibilidade.',
    },
  ];
  return (
    <section className='my-20'>
      <div className='mb-10 max-w-2xl'>
        <h2 className='text-3xl font-bold tracking-tight text-slate-900'>
          Nossa trajetória
        </h2>
        <p className='mt-3 text-slate-600'>
          De um simples caderno de ideias até uma plataforma com milhares de
          leitores. Cada etapa nos ensinou algo importante.
        </p>
      </div>

      <div className='relative'>
        <div className='absolute left-4 top-0 h-full w-px bg-slate-200 md:left-1/2 md:-translate-x-1/2' />
        <div className={clsx('space-y-10')}>
          {timeline.map((item, index) => (
            <div
              key={item.Year}
              className={clsx(
                'relative flex flex-col gap-4 md:flex-row md:items-center',
                `${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`,
              )}
            >
              <div className='flex-1 md:text-right'>
                <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
                  <span className='text-emerald-600 text-sm font-semibold'>
                    {item.Year}
                  </span>
                  <h3 className='mt-1 text-xl font-bold text-slate-900'>
                    {item.Title}
                  </h3>
                  <p className='mt-2 text-sm leading-relaxed text-slate-600'>
                    {item.Content}
                  </p>
                </div>
              </div>
              <div className='hidden absolute left-4 top-6 z-10 h-4 w-4 rounded-full border-4 border-white bg-emerald-500 shadow-sm md:block md:left-1/2 md:-translate-x-1/2' />
              <div className='flex-1' />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
