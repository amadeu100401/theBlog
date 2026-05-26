import { Suspense } from 'react';
import { PostsList } from './components/PostLists';
import { SpinLoader } from './components/SpinLoader';
import { Container } from './components/Container';
import { Header } from './components/Header';
import Link from 'next/link';
import Image from 'next/image';
import { PostHeading } from './components/PostHeading';

export default async function Home() {
  return (
    <Container>
      <Header />

      <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
        <Link href='#' className='w-full h-full overflow-hidden rounded-xl'>
          <Image
            className='w-full h-full group-hover:scale-105 transition object-cover object-center'
            src='/Images/bryen_0.png'
            width={1200}
            height={768}
            alt='Titulo do post'
            priority
          ></Image>
        </Link>
        <div className='flex flex-col gap-4 sm:justify-center'>
          <time className='text-slate-600 block text-sm' dateTime='2026-05-26'>
            26/05/2026 10:00
          </time>
          <PostHeading url='#' as='h1'>
            Lorem ipsum dolor sit amet.
          </PostHeading>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            ipsam hic minima cumque explicabo sunt, cupiditate, dolore rem
            excepturi nostrum mollitia natus suscipit neque perferendis. Est
            sunt nobis libero corporis? Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Accusantium fugit consectetur harum eveniet
            provident est velit ab, totam consequuntur beatae similique neque
            mollitia porro et enim autem ullam quo officiis!
          </p>
        </div>
      </section>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer>
        <h1 className='text-6xl font-bold text-center py-8'>Aqui é a FOOTER</h1>
      </footer>
    </Container>
  );
}
