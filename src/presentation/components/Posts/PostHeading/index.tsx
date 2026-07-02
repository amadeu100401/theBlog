import clsx from 'clsx';
import { LinkWrapper } from '../../LinkWrapper';

type PostHeadingProps = {
  children: React.ReactNode;
  url: string;
  as?: 'h1' | 'h2';
};

export function PostHeading({
  children = '',
  url,
  as: Tag = 'h2',
}: PostHeadingProps) {
  const headingClassesMap = {
    h1: 'text-2xl/tight font-extrabold sm:text-4xl',
    h2: 'text-2xl/tight font-bold',
  };

  return (
    <>
      <Tag className={clsx(headingClassesMap[Tag])}>
        <LinkWrapper href={url} className='hover:text-slate-600 transition'>
          {children}
        </LinkWrapper>
      </Tag>
    </>
  );
}
