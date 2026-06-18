import { SinglePost } from '@/components/SinglePost';
import { SpinLoader } from '@/components/SpinLoader';
import { findPublicPostBySlugCached } from '@/lib/post/queries/public';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type postSlugPageProps = {
  //O next 16 transforma isso em assincrono
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: postSlugPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const post = await findPublicPostBySlugCached(slug).catch(() => undefined);

  if (!post) notFound();

  return {
    title: post.title,
    description: post.excerpt,
  };
}

async function PostContent({ params }: postSlugPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  return <SinglePost slug={slug} />;
}

export default function PostSlugPage({ params }: postSlugPageProps) {
  return (
    <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
      <PostContent params={params} />
    </Suspense>
  );
}
