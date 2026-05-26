import { PostHeading } from '../PostHeading';

type PostFeaturedProps = {
  dateTime?: string;
  url: string;
  as: 'h1' | 'h2';
  heading: string;
  content: string;
};

export function PostSummary({
  dateTime = '',
  url,
  as,
  heading,
  content,
}: PostFeaturedProps) {
  return (
    <div className='flex flex-col gap-4 sm:justify-center'>
      <time className='text-slate-600 block text-sm' dateTime={dateTime}>
        {dateTime}
      </time>
      <PostHeading url={url} as={as}>
        {heading}
      </PostHeading>
      <p>{content}</p>
    </div>
  );
}
