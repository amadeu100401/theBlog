import { findAllPostsAdmin } from '@/lib/post/queries/admin';
import { LinkWrapper } from '../../LinkWrapper';
import clsx from 'clsx';
import { DeletePostButton } from '../deletePostButton';
import { Dialog } from '@/components/Dialog';

export default async function PostListAdmin() {
  const posts = await findAllPostsAdmin();

  return (
    <div className='mb-16'>
      {posts.map(post => (
        <div
          className={clsx(
            'py-2',
            'px-2',
            !post.published && 'bg-slate-300',
            'flex gap-2 items-center justify-between',
          )}
          key={post.id}
        >
          <LinkWrapper href={`/admin/post/${post.id}`}>
            {post.title}
          </LinkWrapper>
          {!post.published && (
            <span className='text-xs text-slate-600 italic'>
              [NÃO PUBLICADO]
            </span>
          )}

          <DeletePostButton id={post.id} title={post.title} />
        </div>
      ))}
    </div>
  );
}
