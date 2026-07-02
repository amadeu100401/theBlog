'use server';

import {
  CreatePostDTO,
  makePartialPublicPost,
  PublicPost,
} from '@/application/DTOs/post/dtos';
import { revalidateCache } from '@/infrastructure/cache/utils/cache-revalidates';
import { PostCreateSchema } from '@/shared/validators/post-validations';
import { getZodErrorMessages } from '@/shared/util/get-zod-error-messages';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { logColor } from '@/shared/util/log-color';
import { container } from '@/infrastructure/di/container';

type CreatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: boolean;
};

export async function CreatePostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  // TODO: verificar se o usuário tá logado
  const cookieToken = await cookies();
  const token = cookieToken.get('session_token')?.value;

  if (!token) {
    const message = 'Usuário não autenticado';
    return throwError(prevState.formState, message);
  }

  const rawFormObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostCreateSchema.safeParse(rawFormObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return {
      errors,
      formState: makePartialPublicPost(rawFormObj),
      success: false,
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost: CreatePostDTO = {
    ...validPostData,
    token: token,
  };

  let isSuccess = false;
  let post;

  try {
    const result = await container.createPostUseCase.execute(newPost);
    if (result.success) {
      isSuccess = true;
      post = result.post;
    }
  } catch (e: unknown) {
    logColor('Erro na criação do post: ', JSON.stringify(e));

    if (e instanceof Error) {
      return throwError(prevState.formState, e.message);
    }

    return throwError(prevState.formState);
  }

  if (isSuccess && post) {
    revalidateCache(post.slug, 'all');
    redirect(`${post.id}?created=1`);
  }

  return throwError(prevState.formState, 'Erro ao salvar post');
}

function throwError(post: PublicPost, message?: string) {
  return {
    formState: post,
    errors: [
      message ? message : 'Erro desconhecido, tente novamente mais tarde',
    ],
    success: false,
  };
}
