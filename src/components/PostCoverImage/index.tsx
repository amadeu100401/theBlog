import clsx from 'clsx';
import { LinkWrapper } from '../LinkWrapper';
import Image from 'next/image';

type PostCoverImageProps = {
  imageProps: React.ComponentProps<typeof Image>;
  linkProps: React.ComponentProps<typeof LinkWrapper>;
};

export function PostCoverImage({ imageProps, linkProps }: PostCoverImageProps) {
  return (
    <>
      <LinkWrapper
        {...linkProps}
        className={clsx(
          'w-full h-full overflow-hidden rounded-xl',
          linkProps.className,
        )}
      >
        <Image
          {...imageProps}
          className={clsx(
            'w-full h-full group-hover:scale-105 transition object-cover object-center',
            imageProps.className,
          )}
          src='/Images/bryen_0.png'
          width={1200}
          height={768}
          alt={imageProps.alt}
        ></Image>
      </LinkWrapper>
    </>
  );
}
