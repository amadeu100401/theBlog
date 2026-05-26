import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';

export function PostFeatured() {
  return (
    <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
      <PostCoverImage
        linkProps={{
          href: '',
          children: '',
        }}
        imageProps={{
          width: 1200,
          height: 82,
          alt: 'Alt da imagem',
          src: '/Images/bryen_0.png',
          priority: true,
        }}
      />
      <PostSummary
        as='h1'
        heading={'Lorem ipsum dolor sit amet.'}
        content='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus veniam,
      ex officiis porro, nesciunt veritatis dolor quis molestiae cum assumenda
      iure magni quasi doloremque animi autem, et nam sit asperiores!'
        url='#'
        dateTime='26/05/2026 10:00'
      />
    </section>
  );
}
