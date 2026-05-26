import { Suspense } from 'react';
import { PostsList } from '../components/PostLists';
import { SpinLoader } from '../components/SpinLoader';
import { PostFeatured } from '../components/PostFeatured';

export default async function Home() {
  return (
    <>
      <PostFeatured />
      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
    </>
  );
}
