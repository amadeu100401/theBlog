import clsx from 'clsx';
import Link from 'next/link';

export function Header() {
  return (
    <header>
      <div className={clsx('pb-8', 'sm:pb-10', 'md:pb-11', 'lg:pb-12')}>
        <h1
          className={clsx(
            'text-4xl/normal font-extrabold',
            'sm:text-5xl/normal ', //640px
            'md:text-6xl/normal ', //768px
            'lg:text-7xl/normal ', //1024px
          )}
        >
          <Link href='/'>The Blog</Link>
        </h1>
        <p className='max-w-xl text-base text-slate-600'>
          Ideias, histórias e conhecimento sobre tecnologia, produtividade e
          carreira.
        </p>
      </div>
    </header>
  );
}
