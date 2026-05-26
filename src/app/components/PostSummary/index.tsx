import { formatRelativeDateTime } from '@/util/format-datetime';
import { PostHeading } from '../PostHeading';

type PostFeaturedProps = {
  createdAt: string;
  url: string;
  as: 'h1' | 'h2';
  title: string;
  excerpt: string;
};

export function PostSummary({
  createdAt = '',
  url,
  as,
  title,
  excerpt,
}: PostFeaturedProps) {
  return (
    <div className='flex flex-col gap-4 sm:justify-center'>
      {createdAt && (
        <time className='text-slate-600 block text-sm' dateTime={createdAt}>
          {formatRelativeDateTime(createdAt)}
        </time>
      )}
      <PostHeading url={url} as={as}>
        {title}
      </PostHeading>
      <p>{excerpt}</p>
    </div>
  );
}
