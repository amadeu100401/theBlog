import PostListAdmin from '@/presentation/components/Admin/postListAdmin';
import { SpinLoader } from '@/presentation/components/SpinLoader';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Post Admin',
};

export default function AdminPostPage() {
  return (
    <Suspense fallback={<SpinLoader className='mb-16' />}>
      <PostListAdmin />
    </Suspense>
  );
}
