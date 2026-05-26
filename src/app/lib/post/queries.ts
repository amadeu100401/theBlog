import { postRepository } from '@/repositories/post/json-post-repository';
import { cache } from 'react';

export const findAllPublishedPosts = cache(
  async () => await postRepository.findAllPublished(),
);
