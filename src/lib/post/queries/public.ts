import { PUBLIC_POSTS_CACHE_TAG } from '@/lib/Consts/cache-tag';
import { postRepository } from '@/repositories/post/index';
import { cacheLife, cacheTag } from 'next/cache';
import { notFound } from 'next/navigation';

export const findAllPublishedPostsCached = async () => {
  'use cache';
  cacheLife('seconds');
  cacheTag('posts');

  return await postRepository.findAllPublishedPublic();
};

export const findPublicPostByIdCached = async (id: string) => {
  'use cache';
  cacheLife('seconds');
  const post = await postRepository.findById(id);

  if (!post || post === undefined) return notFound();

  cacheTag(`${PUBLIC_POSTS_CACHE_TAG}${post.id}`);

  return post;
};

export const findPublicPostBySlugCached = async (slug: string) => {
  'use cache';
  cacheLife('seconds');

  const post = await postRepository
    .findBySlugPublic(slug)
    .catch(() => undefined);

  if (!post || post === undefined) notFound();

  cacheTag(`${PUBLIC_POSTS_CACHE_TAG}${post.id}`);

  return post;
};
