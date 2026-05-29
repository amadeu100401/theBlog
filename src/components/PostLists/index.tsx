import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';
import clsx from 'clsx';
import { findAllPublishedPostsCached } from '@/lib/post/queries/public';

export async function PostsList() {
  const posts = await findAllPublishedPostsCached();

  return (
    <div
      className={clsx(
        'grid grid-cols-1 mb-16 gap-8',
        'sm:grid-cols-2',
        'lg:grid-cols-3',
      )}
    >
      {posts.slice(1).map(post => {
        const postLink = `/post/${post.slug}`;
        return (
          <div className='flex flex-col group gap-4' key={post.id}>
            <PostCoverImage
              linkProps={{
                href: postLink,
                children: '',
              }}
              imageProps={{
                width: 1200,
                height: 82,
                alt: post.title,
                src: post.coverImageUrl,
                priority: false,
              }}
            />
            <PostSummary
              as='h2'
              createdAt={post.createdAt}
              url={postLink}
              title={post.title}
              excerpt={post.excerpt}
            />
          </div>
        );
      })}
    </div>
  );
}
