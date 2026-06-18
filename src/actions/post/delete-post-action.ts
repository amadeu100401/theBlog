'use server';

import { revalidateCache } from '@/lib/cache/utils/cache-revalidates';
import { postRepository } from '@/repositories/post';

export async function deletePostAction(id: string) {
  // TODO: confirmar login do usuario

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dados inválidos',
    };
  }

  const post = await postRepository.findById(id).catch(() => undefined);

  if (!post || post === undefined) {
    return {
      error: 'Post não encontrado na base de dados',
    };
  }

  postRepository.deletePost(id);

  revalidateCache(post.slug, 'all');

  return {
    error: '',
  };
}
