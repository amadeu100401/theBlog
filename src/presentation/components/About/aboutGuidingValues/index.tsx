import clsx from 'clsx';
import {
  PencilLineIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserRoundIcon,
} from 'lucide-react';

export function AboutGuidingValues() {
  const iconClasses = clsx(
    'h-10 w-10 rounded-xl',
    ' bg-slate-200 p-2',
    'text-slate-900',
  );

  const blocks = [
    {
      Icon: <PencilLineIcon className={iconClasses} />,
      Title: 'Conteúdo autentico',
      Content:
        'Cada artigo é escrito com cuidado, baseado em experiência real e fontes confiáveis. Rejeitamos clickbait e informação rasa.',
    },
    {
      Icon: <UserRoundIcon className={iconClasses} />,
      Title: 'Comunidade em primeiro lugar',
      Content:
        'Nossos leitores não são apenas números. Criamos espaços para troca, dúvidas e construção coletiva de conhecimento.',
    },
    {
      Icon: <ShieldCheckIcon className={iconClasses} />,
      Title: 'Privacidade e respeito',
      Content:
        'Seus dados são seus. Não vendemos informações, não usamos trackers abusivos e respeitamos o seu tempo de leitura.',
    },
    {
      Icon: <SparklesIcon className={iconClasses} />,
      Title: 'Experiência impecável',
      Content:
        'Design limpo, leitura fluida, busca inteligente e acesso rápido em qualquer dispositivo. Boa tecnologia deve sumir.',
    },
  ];

  return (
    <section className='py-2'>
      <div className={clsx('flex flex-col max-w-2xl')}>
        <h2 className='text-3xl font-bold'>O que nos guia</h2>
        <p className={clsx('mt-3 text-slate-600')}>
          Nossos valores são princípios de trabalho, não apenas palavras
          bonitas. Eles definem como escolhemos temas, tratamos leitores e
          construímos a plataforma.
        </p>
      </div>
      <div
        className={clsx('grid gap-6 sm:grid-cols-2 lg:grid-cols-4', 'mt-10')}
      >
        {blocks.map((block, index) => (
          <div
            key={index}
            className={clsx(
              'flex flex-col justify-center gap-3 p-6',
              'rounded-3xl bg-white',
            )}
          >
            <div className='flex flex-row justify-center'>{block.Icon}</div>
            <div
              className={clsx(
                'flex justify-center items-center',
                'text-md font-medium tracking-tight gap-2 text-slate-900',
              )}
            >
              {block.Title}
            </div>
            <div className='justify-start text-sm font-light'>
              {block.Content}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
