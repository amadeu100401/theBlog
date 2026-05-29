import { postRepository } from '@/repositories/post/index';
import { notFound } from 'next/navigation';

export const findAllPublishedPosts = async () =>
  await postRepository.findAllPublishedPublic();

export const findByIdCached = async (id: string) =>
  await postRepository.findById(id);

export const findBySlugCached = async (slug: string) => {
  const post = await postRepository
    .findBySlugPublic(slug)
    .catch(() => undefined);

  if (!post) notFound();

  return post;
};
