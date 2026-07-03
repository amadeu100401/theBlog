import { Suspense } from 'react';
import { SpinLoader } from '../../presentation/components/SpinLoader';
import { PostFeatured } from '@/presentation/components/Posts/PostFeatured';
import { PostsList } from '@/presentation/components/Posts/PostLists';

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
