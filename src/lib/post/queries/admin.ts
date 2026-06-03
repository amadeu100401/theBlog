import { ADMIN_POSTS_CACHE_TAG } from '@/lib/Consts/cache-tag';
import { postRepository } from '@/repositories/post';
import { cacheLife, cacheTag } from 'next/cache';
import { notFound } from 'next/navigation';

export const findPostByIdAdmin = async (id: string) => {
  'use cache';
  cacheLife('seconds');
  const post = await postRepository.findById(id);

  if (!post || post === undefined) return notFound();

  cacheTag(`${ADMIN_POSTS_CACHE_TAG}${post.id}`);

  return post;
};

export const findAllPostsAdmin = async () => {
  'use cache';
  cacheLife('seconds');
  cacheTag('ADMIN-POSTS');

  return await postRepository.findAll();
};

export const findPostBySlugAdmin = async (slug: string) => {
  'use cache';
  cacheLife('seconds');

  const post = await postRepository
    .findBySlugPublic(slug)
    .catch(() => undefined);

  if (!post || post === undefined) notFound();

  cacheTag(`${ADMIN_POSTS_CACHE_TAG}${post.id}`);

  return post;
};
