'use server';

import { drizzleDb } from '@/infrastructure/db/drizzle';
import { PostsTable } from '@/infrastructure/db/drizzle/schemas';
import { RevalidateCache } from '@/lib/cache/utils/cache-revalidates';
import { postRepository } from '@/repositories/post';
import { logColor } from '@/util/log-color';
import { eq } from 'drizzle-orm';

export async function deletePostAction(id: string) {
  // TODO: confirmar login do usuario

  // TODO: REMOVER LINHAS ABAIXO
  // await simulateAwait('deletePostAction', false, 0);

  logColor('' + id);

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dados inválidos',
    };
  }

  const post = await postRepository.findById(id).catch(() => undefined);

  if (!post) {
    return {
      error: 'Post não encontrado na base de dados',
    };
  }

  //TODO: Mover esse método para o repositório
  await drizzleDb.delete(PostsTable).where(eq(PostsTable.id, id));

  RevalidateCache(post.slug, 'all');

  return {
    error: '',
  };
}
