import { postRepository } from '@/infrastructure/dependencyInjection/post.container';
import { ALL_ADMIN_POSTS_CACHE_TAG } from '@/lib/cache/Consts/cache-tag';
import { PostCacheTagBuilder } from '@/lib/cache/utils/cahce-tag-builder';
import { cacheLife, cacheTag } from 'next/cache';
import { notFound } from 'next/navigation';

export const findPostByIdAdmin = async (id: string) => {
  'use cache';
  cacheLife('seconds');
  const post = await postRepository.findById(id);

  if (!post || post === undefined) return notFound();

  cacheTag(PostCacheTagBuilder(post.slug, true));

  return post;
};

export const findAllPostsAdmin = async () => {
  'use cache';
  cacheLife('seconds');
  cacheTag(ALL_ADMIN_POSTS_CACHE_TAG);

  return await postRepository.findAll();
};

export const findPostBySlugAdmin = async (slug: string) => {
  'use cache';
  cacheLife('seconds');

  const post = await postRepository
    .findBySlugPublic(slug)
    .catch(() => undefined);

  if (!post || post === undefined) notFound();

  cacheTag(PostCacheTagBuilder(post.slug, true));

  return post;
};
