import { ALL_PUBLIC_POSTS_CACHE_TAG } from '@/lib/cache/Consts/cache-tag';
import { PostCacheTagBuilder } from '@/lib/cache/utils/cahce-tag-builder';
import { postRepository } from '@/infrastructure/db/repositories/post/index';
import { cacheLife, cacheTag } from 'next/cache';
import { notFound } from 'next/navigation';

export const findAllPublishedPostsCached = async () => {
  'use cache';
  cacheLife('seconds');
  cacheTag(ALL_PUBLIC_POSTS_CACHE_TAG);

  return await postRepository.findAllPublishedPublic();
};

export const findPublicPostByIdCached = async (id: string) => {
  'use cache';
  cacheLife('seconds');
  const post = await postRepository.findById(id);

  if (!post || post === undefined) return notFound();

  cacheTag(PostCacheTagBuilder(post.slug));

  return post;
};

export const findPublicPostBySlugCached = async (slug: string) => {
  'use cache';
  cacheLife('seconds');

  const post = await postRepository
    .findBySlugPublic(slug)
    .catch(() => undefined);

  if (!post || post === undefined) notFound();

  cacheTag(PostCacheTagBuilder(post.slug));

  return post;
};
