import { SinglePost } from '@/components/SinglePost';
import { SpinLoader } from '@/components/SpinLoader';
import { findBySlugCached } from '@/lib/post/queries';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type postSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: postSlugPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await findBySlugCached(slug).catch(() => undefined);

  if (!post) notFound();

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostSlugPage({ params }: postSlugPageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
      <SinglePost slug={slug} />
    </Suspense>
  );
}
