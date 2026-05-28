import { postRepository } from '@/repositories/post/index';
import { cache } from 'react';

export const findAllPublishedPosts = cache(
  async () => await postRepository.findAllPublishedPublic(),
);

export const findByIdCached = cache(
  async (id: string) => await postRepository.findById(id),
);

export const findBySlugCached = cache(
  async (slug: string) => await postRepository.findBySlugPublic(slug),
);
