'use server';
import { makePartialPublicPost, PublicPost } from '@/DTOs/post/dtos';
import { revalidateCache } from '@/lib/cache/utils/cache-revalidates';
import { PostUpdateSchema } from '@/lib/validates/validations';
import { PostModel } from '@/models/posts/post-model';
import { postRepository } from '@/repositories/post';
import { getZodErrorMessages } from '@/util/get-zod-error-messages';
import { logColor } from '@/util/log-color';

type UpdatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: boolean;
};

export async function UpdatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  //TODO: Verificar se o uuário está logado

  if (!(formData instanceof FormData)) {
    BuildGenericResultError(prevState.formState);
  }

  const id = formData.get('id')?.toString();

  if (!id || typeof id !== 'string' || id === undefined) {
    BuildGenericResultError(prevState.formState);
  }

  const raw = Object.fromEntries(formData.entries());
  const zodFormated = await PostUpdateSchema.safeParseAsync(raw);

  if (!zodFormated.success) {
    const errors = getZodErrorMessages(zodFormated.error.format());
    return BuildGenericResultError(prevState.formState, errors);
  }

  const validPostData = zodFormated.data;
  const safePost: PostModel = {
    ...validPostData,
    createdAt: prevState.formState.createdAt,
    updatedAt: '',
  };

  let post;
  try {
    post = await postRepository.updatePost(safePost.id, safePost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return BuildGenericResultError(prevState.formState, [`${e.message}`]);
    }

    return BuildGenericResultError(prevState.formState, ['Erro desconhecido']);
  }

  revalidateCache(post.slug, 'all');

  return {
    formState: makePartialPublicPost(post),
    errors: [],
    success: true,
  };
}

function BuildGenericResultError(
  prevState: PublicPost,
  errors: string[] = ['Dados inválidos'],
) {
  return {
    formState: makePartialPublicPost(prevState),
    errors: errors,
    success: false,
  };
}
