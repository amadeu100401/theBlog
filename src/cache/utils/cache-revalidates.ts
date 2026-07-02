import { revalidateTag } from 'next/cache';
import {
  ADMIN_POST_CACHE_TAG,
  ALL_ADMIN_POSTS_CACHE_TAG,
  ALL_PUBLIC_POSTS_CACHE_TAG,
  PUBLIC_POST_CACHE_TAG,
} from '../Consts/cache-tag';
import { PostCacheTagBuilder } from './cahce-tag-builder';

type CacheType = 'public' | 'admin' | 'all';

export function revalidateCache(slug: string, cacheType: CacheType): void {
  const tags = getTagsToRevalidate(slug, cacheType);

  tags.forEach(tag => {
    revalidateTag(tag, 'max');
  });
}

function getTagsToRevalidate(slug: string, cacheType: CacheType): string[] {
  const adminTags = [
    ADMIN_POST_CACHE_TAG,
    ALL_ADMIN_POSTS_CACHE_TAG,
    PostCacheTagBuilder(slug, true),
  ];

  const publicTags = [
    PUBLIC_POST_CACHE_TAG,
    ALL_PUBLIC_POSTS_CACHE_TAG,
    PostCacheTagBuilder(slug),
  ];

  switch (cacheType) {
    case 'admin':
      return adminTags;
    case 'public':
      return publicTags;
    case 'all':
      return [...adminTags, ...publicTags];
  }
}
