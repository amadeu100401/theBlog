'use server';

import { postRepository } from '@/infrastructure/dependencyInjection/container';
import { revalidateCache } from '@/lib/cache/utils/cache-revalidates';

export async function deletePostAction(id: string) {
  // TODO: confirmar login do usuario

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dados inválidos',
    };
  }

  try {
    const post = await postRepository.findById(id).catch(() => undefined);

    if (!post || post === undefined) {
      throw new Error('Post não encontrado na base de dados');
    }

    postRepository.deletePost(id);

    revalidateCache(post.slug, 'all');
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        error: e.message,
      };
    }

    return {
      error: 'Erro ao excluir post. Tente mais tarde.',
    };
  }

  return {
    error: '',
  };
}
