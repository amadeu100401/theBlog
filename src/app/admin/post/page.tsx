import { SpinLoader } from '@/components/SpinLoader';
import { findAllPostsAdmin } from '@/lib/post/queries/admin';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Post Admin',
};

async function PostList() {
  const posts = await findAllPostsAdmin();

  return (
    <div className='py-16 text-xl'>
      {posts.map(post => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}

export default function AdminPostPage() {
  return (
    <Suspense fallback={<SpinLoader />}>
      <PostList />
    </Suspense>
  );
}
