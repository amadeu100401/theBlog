import { PostMapper } from '@/infrastructure/db/mappers/post.mapper';
import { postRepository } from '@/infrastructure/di/Post';
import { ALL_ADMIN_POSTS_CACHE_TAG } from '@/infrastructure/cache/Consts/cache-tag';
import { PostCacheTagBuilder } from '@/infrastructure/cache/utils/cahce-tag-builder';
import { cacheLife, cacheTag } from 'next/cache';
import { notFound } from 'next/navigation';

export const findPostByIdAdmin = async (id: string) => {
  'use cache';
  cacheLife('seconds');
  const post = await postRepository.findById(id);

  if (!post || post === undefined) return notFound();

  cacheTag(PostCacheTagBuilder(post.slug, true));

  return PostMapper.toDTO(post);
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
