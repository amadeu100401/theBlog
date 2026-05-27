import { findBySlugCached } from '@/lib/post/queries';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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

  const post = await findBySlugCached(slug).catch(() => undefined);

  if (!post) notFound();

  return (
    <div>
      <p>{post.title}</p>
      <p>{post.conten}</p>
    </div>
  );
}
