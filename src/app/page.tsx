import { Suspense } from 'react';
import { PostsList } from './components/PostLists';
import { SpinLoader } from './components/SpinLoader';
import { Container } from './components/Container';
import { Header } from './components/Header';
import { PostHeading } from './components/PostHeading';
import { PostCoverImage } from './components/PostCoverImage';

export default async function Home() {
  return (
    <Container>
      <Header />

      <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
        <PostCoverImage
          linkProps={{
            href: '',
            children: '',
          }}
          imageProps={{
            width: 1200,
            height: 82,
            alt: 'Alt da imagem',
            src: '/Images/bryen_0.png',
            priority: true,
          }}
        />
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
