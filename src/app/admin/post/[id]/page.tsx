import { ManagePostForm } from '@/components/Admin/managePostForm';
import { SpinLoader } from '@/components/SpinLoader';
import { makePartialPublicPost } from '@/DTOs/post/dtos';
import { findPostByIdAdmin } from '@/lib/post/queries/admin';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Editar post',
};

type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};

async function PageContent({ params }: AdminPostIdPageProps) {
  const { id } = await params;

  const post = await findPostByIdAdmin(id).catch();

  if (!post) return notFound();

  const publicPost = makePartialPublicPost(post);

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-xl font-extrabold'>Editar posts</h1>
      <ManagePostForm mode={'update'} publicPost={publicPost} />
    </div>
  );
}

export default function AdminPostIdPage({ params }: AdminPostIdPageProps) {
  return (
    <Suspense fallback={<SpinLoader />}>
      <PageContent params={params} />
    </Suspense>
  );
}
