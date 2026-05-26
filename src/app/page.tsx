import { Suspense } from 'react';
import { PostsList } from './components/PostLists';
import { SpinLoader } from './components/SpinLoader';

export default async function Home() {
  return (
    <div>
      <header>
        <h1 className='text-6xl font-bold text-center py-8'>Aqui é a HEADER</h1>
      </header>
      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
      <footer>
        <h1 className='text-6xl font-bold text-center py-8'>Aqui é a FOOTER</h1>
      </footer>
    </div>
  );
}
