import {
  ADMIN_POST_CACHE_TAG,
  PUBLIC_POST_CACHE_TAG,
} from '../Consts/cache-tag';

export function PostCacheTagBuilder(sulfix: string, isAdmin = false) {
  const prefix = isAdmin ? ADMIN_POST_CACHE_TAG : PUBLIC_POST_CACHE_TAG;

  const tag = `${prefix}${sulfix}`;
  return tag;
}
