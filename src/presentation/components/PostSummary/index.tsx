import { PostDate } from '../Posts/PostDate';
import { PostHeading } from '../Posts/PostHeading';

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
      {createdAt && <PostDate createdAt={createdAt} />}
      <PostHeading url={url} as={as}>
        {title}
      </PostHeading>
      <p>{excerpt}</p>
    </div>
  );
}
