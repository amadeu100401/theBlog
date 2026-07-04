import { findPublicPostBySlugCached } from '@/application/Queries/posts/public';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PostDate } from '../Posts/PostDate';
import { SafeMarkdown } from '../SafeMarkdown';
import { PostHeading } from '../Posts/PostHeading';

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPublicPostBySlugCached(slug).catch(() => undefined);

  if (!post) return notFound();

  return (
    <article className='mb-16'>
      <header className='group flex flex-col gap-4 mb-4'>
        <Image
          className='rounded-xl'
          src={post.coverImageUrl}
          width={1200}
          height={720}
          alt={post.title}
        />

        <PostHeading url={`/post/${post.slug}`}>{post.title}</PostHeading>

        <p>
          {post.author} | <PostDate createdAt={post.createdAt} />
        </p>

        <p className='text-xl mb-4 text-slate-600'>{post.excerpt}</p>

        <SafeMarkdown markdown={post.content} />
      </header>
    </article>
  );
}
