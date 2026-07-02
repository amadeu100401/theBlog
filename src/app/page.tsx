import { Suspense } from 'react';
import { PostsList } from '../presentation/components/PostLists';
import { SpinLoader } from '../presentation/components/SpinLoader';
import { PostFeatured } from '../presentation/components/PostFeatured';

export default async function Home() {
  return (
    <>
      <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
        <PostFeatured />

        <PostsList />
      </Suspense>
    </>
  );
}
