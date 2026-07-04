'use server';

import { revalidateCache } from '@/infrastructure/cache/utils/cache-revalidates';
import { container } from '@/infrastructure/di/Index';

export async function deletePostAction(id: string) {
  // TODO: confirmar login do usuario

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dados inválidos',
    };
  }

  try {
    const result = await container.deletePostUseCase.execute(id);

    if (result.success) {
      const slug = result.slug;
      revalidateCache(slug, 'all');
    }
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
