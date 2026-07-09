'use server';

import {
  makePartialPublicPost,
  PublicPost,
  UpdatePostDTO,
} from '@/application/DTOs/post/dtos';
import { revalidateCache } from '@/infrastructure/cache/utils/cache-revalidates';
import { PostUpdateSchema } from '@/shared/validators/post-validations';
import { getZodErrorMessages } from '@/shared/util/get-zod-error-messages';
import { container } from '@/infrastructure/di/container';

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

  const id = formData.get('id')?.toString() as string;

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
  //TODO: Criar o UpdatePostModel
  const safePost: UpdatePostDTO = {
    postId: id,
    title: validPostData.title,
    slug: validPostData.slug,
    content: validPostData.content,
    excerpt: validPostData.excerpt,
    coverImageUrl: validPostData.coverImageUrl,
    published: validPostData.published,
  };

  try {
    const response = await container.updatePostUseCase.execute(safePost);

    if (response.success) {
      const post = response.post;
      revalidateCache(prevState.formState.slug, 'all');
      return {
        formState: makePartialPublicPost(post),
        errors: [],
        success: true,
      };
    } else {
      return BuildGenericResultError(prevState.formState, [
        'Erro desconhecido',
      ]);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      return BuildGenericResultError(prevState.formState, [`${e.message}`]);
    }

    return BuildGenericResultError(prevState.formState, ['Erro desconhecido']);
  }
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
