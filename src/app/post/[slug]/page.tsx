import { findBySlugCached } from '@/lib/post/queries';
import { notFound } from 'next/navigation';

type postSlugPageProps = {
  params: Promise<{ slug: string }>;
};

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
