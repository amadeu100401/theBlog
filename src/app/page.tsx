import { Suspense } from 'react';
import { PostsList } from './components/PostLists';
import { SpinLoader } from './components/SpinLoader';
import { Container } from './components/Container';
import { Header } from './components/Header';
import { PostFeatured } from './components/PostFeatured';

export default async function Home() {
  return (
    <Container>
      <Header />

      <PostFeatured />

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer>
        <h1 className='text-6xl font-bold text-center py-8'>Aqui é a FOOTER</h1>
      </footer>
    </Container>
  );
}
