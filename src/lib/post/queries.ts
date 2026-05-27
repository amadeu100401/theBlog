import { postRepository } from '@/repositories/post/json-post-repository';
import { cache } from 'react';

export const findAllPublishedPosts = cache(
  async () => await postRepository.findAllPublished(),
);

export const findByIdCached = cache(
  async (id: string) => await postRepository.findById(id),
);

export const findBySlugCached = cache(
  async (slug: string) => await postRepository.findBySlug(slug),
);
