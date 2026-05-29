import { findAllPublishedPostsCached } from '@/lib/post/queries/public';
import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';

export async function PostFeatured() {
  const posts = await findAllPublishedPostsCached();
  const post = posts[0];

  const postUrl = `/post/${post.slug}`;

  return (
    <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
      <PostCoverImage
        linkProps={{
          href: postUrl,
          children: '',
        }}
        imageProps={{
          width: 1200,
          height: 82,
          alt: post.title,
          src: post.coverImageUrl,
          priority: true,
        }}
      />
      <PostSummary
        as='h1'
        title={post.title}
        excerpt={post.excerpt}
        url={postUrl}
        createdAt={post.createdAt}
      />
    </section>
  );
}
