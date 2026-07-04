import { ManagePostForm } from '@/presentation/components/Admin/managePostForm';
import { SpinLoader } from '@/presentation/components/SpinLoader';
import { findPostByIdAdmin } from '@/application/Queries/posts/admin';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Editar post',
};

type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    created?: string;
  }>;
};

async function PageContent({ params, searchParams }: AdminPostIdPageProps) {
  const { id } = await params;

  const { created } = await searchParams;

  const post = await findPostByIdAdmin(id);

  if (!post || post === null || post === undefined) notFound();

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-xl font-extrabold'>Editar posts</h1>
      <ManagePostForm
        created={created === '1'}
        mode={'update'}
        publicPost={post}
      />
    </div>
  );
}

export default function AdminPostIdPage({
  params,
  searchParams,
}: AdminPostIdPageProps) {
  return (
    <Suspense fallback={<SpinLoader />}>
      <PageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}
